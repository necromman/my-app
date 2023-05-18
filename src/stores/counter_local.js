import { defineStore } from "pinia";
import { store } from "../store"
import axios from 'axios';
import { toHandlers } from "vue";

export const useCounterStoreLocal = defineStore({
  id: "counter2",
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    getAllParamLocal(index){

      const data = { data: {
        xdaName: store.state.voCumns[index].xdaName
      }}

      const headers = { 
        "authorization": store.state.token,
        "content-type": "application/json",
      }

      axios.post("/api/getAllParameter", data, { headers })
        .then(res => {
          let tempList = []
          store.state.voCumns[index].req = []
          store.state.voCumns[index].res = []
          console.log("응답 데이터 : " + JSON.stringify(res.data))
          res.data.forEach((column, sindex) => {
            column.req.forEach((column, sindex) => {
              tempList.push(column)
              store.state.voCumns[index].req.push(column)
            })
            column.res.forEach((column, sindex) => {
              tempList.push(column)
              store.state.voCumns[index].res.push(column)
            })
          })
          let tempListSet = [...new Set(tempList)];
          store.state.voCumns[index].columns = []
          for (let i = 0; i < tempListSet.length; i++) {
            store.state.voCumns[index].columns.push(
              {
                name: tempListSet[i], isChecked: true, logicalName: this.snakeToCamelLocal(tempListSet[i]),
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
          
          this.getQueryTextLocal(index)
        })
        .catch(error => {
          console.log("에러 데이터 : " + error.data);
        })
        .finally(() => {

        })
      
    },
    getQueryTextLocal(index){

      const data = { data: {
        xdaName: store.state.voCumns[index].xdaName
      } }
      
      const headers = { 
        "authorization": store.state.token,
        "content-type": "application/json",
      }

      axios.post("/api/getSQueryText", data, { headers })
        .then(res => {
          console.log("응답 데이터 : " + JSON.stringify(res.data))
          console.log(res.data.length)
          store.state.isLoading = false
          res.data.forEach((column, sindex) => {
            if (column.sQueryText === '') {
              store.state.voCumns[index].sqlmapQueryListView = column.sQuery
              store.state.voCumns[index].sqlmapQueryListOriginal = column.sQuery
            }else{
              store.state.voCumns[index].sqlmapQueryListView = column.sQueryText
              store.state.voCumns[index].sqlmapQueryListOriginal = column.sQueryText
            }
          })
        })
        .catch(error => {
          console.log("에러 데이터 : " + error.data);
        })
        .finally(() => {

        })
    },
    snakeToCamelLocal(snakeCase) {
      let words = snakeCase.split("_");
      for (let i = 1; i < words.length; i++) {
        let camelCaseWord = words[i].substr(0, 1).toUpperCase() + words[i].substr(1);
        words.splice(i, 1, camelCaseWord);
      }
      return words.join("");
    }

  },
});
