import { defineStore } from "pinia";
import { store } from "../store"
import axios from 'axios';
import { toHandlers } from "vue";

export const useCounterStoreLocal = defineStore({
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
                name: tempListSet[i], isChecked: true, logicalName: this.snakeToCamel2(tempListSet[i]),
                isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
              }
            )
          }
          this.getQueryText(index)
        })
        .catch(error => {
          console.log("에러 데이터 : " + error.data);
        })
        .finally(() => {

        })
      
    },
    getQueryText(index){

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
