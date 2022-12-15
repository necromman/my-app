import { createStore } from 'vuex'

export const store = createStore ({
  state: {
    count : 100,
    packageName: 'kr.re.kitech.biz.xxx.xxx.vo',
    projectName : 'projectName',
    tableName: 'tableName',
    informixColumnType:[{name: "BIGINT", len: 0},{name: "BIGSERIAL", len: 0},{name: "BINARY18", len:0},{name: "BLOB", len:0},{name: "BOOLEAN", len:0},{name: "BSON", len:0},{name: "BYTE", len:0},{name: "CHAR", len:8},{name: "NCHAR", len:25},{name: "NODE", len:0},  {name: "CLOB", len:0},{name: "DATE", len:0},{name: "DATETIME", len:0},{name: "DECIMAL", len:0},{name: "FLOAT", len:0},{name: "INT", len:0},{name: "INT8", len:0},{name: "INTEGER", len:0},{name: "SERIAL", len:0},{name: "SERIAL8", len:0},{name: "SMALLFLOAT", len:0},{name: "SMALLINT", len:0},{name: "TEXT", len:0},{name: "MONEY", len:0},  {name: "LVARCHAR", len:2000},{name: "NVARCHAR", len:255},  {name: "VARCHAR", len:255}],
    voColumnType:["String","int","long","double","BigInteger","BigDecimal","boolean","Map","byte[]","MultipartFile"],
    columnsT: '',
    columns: [
        { name: "reqNo", isChecked: false, logicalName: "신청번호",
         isPrimary: true, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"},
        { name: "regst_syspayno", isChecked: false, logicalName: "신청자 사번",
         isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"},
        { name: "regst_daytm", isChecked: false, logicalName: "등록일시",
         isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"},
        { name: "updt_syspayno", isChecked: true, logicalName: "수정자 사번",
         isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"},
        { name: "updt_daytm", isChecked: true, logicalName: "수정일시",
         isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "int"},
      ],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
})