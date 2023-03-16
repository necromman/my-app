import { defineStore } from "pinia";
import { store } from "../store"
import axios from 'axios';
import { toHandlers } from "vue";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment(num) {
      console.log(store.state.xmlPath)
      this.counter = this.counter + num
    },
    getAllParam(index){

      const headers = { 
        "authorization": store.state.token,
        "content-type": "application/json",
      }

      axios.get('https://authdev.kitech.re.kr/api/pcc/allParam/' + store.state.voCumns[index].xdaName, {
        headers: headers,
      })
      .then(response => {
        let tempList = []
        store.state.voCumns[index].req = []
        store.state.voCumns[index].res = []
        console.log("응답 데이터 파라미터: " + JSON.stringify(response.data));
        response.data.requests.forEach((column, sindex) => {
            tempList.push(column)
            store.state.voCumns[index].req.push(column)
          })
        response.data.responses.forEach((column, sindex) => {
            tempList.push(column)
            store.state.voCumns[index].res.push(column)
          })
          let tempListSet = [...new Set(tempList)];
          store.state.voCumns[index].columns = []
          for (let i = 0; i < tempListSet.length; i++) {
            store.state.voCumns[index].columns.push(
              {
                name: tempListSet[i], isChecked: true, logicalName: this.snakeToCamel(tempListSet[i]),
                isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
              }
            )
          }

          this.getQueryText(index)
      })
      .catch(error => {
        console.error(error);
      });
      
    },
    getQueryText(index){
      
      const headers = { 
        "authorization": store.state.token,
        "content-type": "application/json",
      }

      axios.get('https://authdev.kitech.re.kr/api/pcc/queryText/' + store.state.voCumns[index].xdaName, {
        headers: headers,
      })
      .then(response => {
        console.log("응답 데이터 쿼리: " + JSON.stringify(response.data));
        if (response.data.squeryText === '') {
          store.state.voCumns[index].sqlmapQueryListView = response.data.squery
          store.state.voCumns[index].sqlmapQueryListOriginal = response.data.squery
        }else{
          store.state.voCumns[index].sqlmapQueryListView = response.data.squeryText
          store.state.voCumns[index].sqlmapQueryListOriginal = response.data.squeryText
        }
      })
      .catch(error => {
        console.error(error);
      });
    }

  },
});
