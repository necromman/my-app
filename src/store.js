import { createStore } from 'vuex'

export const store = createStore ({
  state: {
    count : 100,
    token: '',
    // CgsCarUse_SQL_informix_MyBatis.xml
    basePath : 'C:\\InswaveTool\\workspace\\Bizwebapp\\src\\main\\',
    sqlMapPath : 'resources\\inswave\\sqlmap\\kr\\re\\kitech\\biz\\',
    javaPath : 'java\\kr\\re\\kitech\\biz\\',
    xmlPath : 'webapp\\ui\\',
    batchQuery : '',
    controllerQuery : '',
    voQuery : [],
    voListQuery : '',
    serviceQuery : '',
    serviceImplQuery : '',
    sqlmapQuery : '',
    daoQuery : '',
    selectedtaskClass: 'ccs',
    taskSubClass: 'cgs',
    packageName: '',
    projectName : 'CgsCarUse',
    logicalName: 'logicName',
    projectRoot : 'kr.re.kitech.biz.',
    tableName: 'tableName',    
    taskClassStatements : [
        {name: "ass", desc: "자산관리"},
        {name: "ccs", desc: "총무보안"},
        {name: "epu", desc: "구매조달"},
        {name: "fin", desc: "재무예산"},
        {name: "hum", desc: "인사급여"},
        {name: "kbk", desc: "도서관리"},
        {name: "pat", desc: "지재권 기술이전"},
        {name: "res", desc: "연구과제"},
        {name: "sup", desc: "기업지원"},
        {name: "xom", desc: "프레임워크 공통"},
        {name: "zam", desc: "샘플패키지"},
        {name: "com", desc: "업무공통"},
        {name: "api", desc: "API"},
        {name: "apr", desc: "전자결재"},        
        {name: "bpm", desc: "BPM연계"},        
    ],
    informixColumnType:[{name: "BIGINT", len: 0},{name: "BIGSERIAL", len: 0},{name: "BINARY18", len:0},{name: "BLOB", len:0},{name: "BOOLEAN", len:0},{name: "BSON", len:0},{name: "BYTE", len:0},{name: "CHAR", len:8},{name: "NCHAR", len:25},{name: "NODE", len:0},  {name: "CLOB", len:0},{name: "DATE", len:0},{name: "DATETIME", len:0},{name: "DECIMAL", len:0},{name: "FLOAT", len:0},{name: "INT", len:0},{name: "INT8", len:0},{name: "INTEGER", len:0},{name: "SERIAL", len:0},{name: "SERIAL8", len:0},{name: "SMALLFLOAT", len:0},{name: "SMALLINT", len:0},{name: "TEXT", len:0},{name: "MONEY", len:0},  {name: "LVARCHAR", len:2000},{name: "NVARCHAR", len:255},  {name: "VARCHAR", len:255}],
    voColumnType:["String","int","long","double","BigInteger","BigDecimal","boolean","Map","byte[]","MultipartFile"],
    columnsT: '',
    voCumns :[
        // {
        //     name: "",
        //     logicalName : "LogicalName",
        //     tableName : "tableName",
        //     columns :[
        //         {name: "column1", isChecked: false, logicalName: "컬럼설명", isPrimary: true, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"},
        //     ],
        // }
    ],
    voCumnsList:[],
    columns: [
        { name: "column1", isChecked: false, logicalName: "컬럼설명",
         isPrimary: true, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"},
        { name: "column2", isChecked: false, logicalName: "컬럼설명",
         isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"},
        { name: "column3", isChecked: false, logicalName: "컬럼설명",
         isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"},
        { name: "column4", isChecked: true, logicalName: "컬럼설명",
         isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"},
        { name: "column5", isChecked: true, logicalName: "컬럼설명",
         isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"},
      ],
    voListcolumns: [
        // {
        //     name : `${this.$store.state.projectName}ListVo`,
        //     content : [
        //     { name: `${this.$store.state.projectName}VoList`, logicalName: "List Vo", type: "List", link: link},
        //     { name: `${this.$store.state.projectName}2Vo`, logicalName: "Single Vo", type: "Vo", link: link},
        //     ]
        //   }      
    ],
    voListcolumnType: ["List", "Vo"],
  },
  getters: {
  },
  mutations: {
    a:(state, payload) => {
      console.log(payload)
    }
  },
  actions: {
    a:({commit}, payload) => {
      commit('a', payload)
    }
  },
})