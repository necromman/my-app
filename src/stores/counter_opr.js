import { defineStore } from "pinia";
import { store } from "../store"
import axios from 'axios';
import { toHandlers } from "vue";

export const useCounterStoreOpr = defineStore({
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
                name: tempListSet[i], isChecked: true, logicalName: this.snakeToCamel2(tempListSet[i]),
                isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
              }
            )
          }

          // let tempReqSet = [...new Set(store.state.voCumns[index].req)];
          // store.state.voCumns[index].req = []
          // for (let i = 0; i < tempReqSet.length; i++) {
          //   store.state.voCumns[index].req.push(tempReqSet[i])
          // }
          // let tempResSet = [...new Set(store.state.voCumns[index].res)];
          // store.state.voCumns[index].res = []
          // for (let i = 0; i < tempResSet.length; i++) {
          //   store.state.voCumns[index].res.push(tempResSet[i])
          // }

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
        store.state.isLoading = false
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
        store.state.isLoading = false
      });
    },
    snakeToCamel2(snakeCase) {
      let words = snakeCase.split("_");
      for (let i = 1; i < words.length; i++) {
        let camelCaseWord = words[i].substr(0, 1).toUpperCase() + words[i].substr(1);
        words.splice(i, 1, camelCaseWord);
      }
      return words.join("");
    }

  },
});
