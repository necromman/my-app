import { createStore } from 'vuex'

export const store = createStore ({
  state: {
    count : 100,
    voQuery : '',
    voListQuery : '',
    serviceQuery : '',
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
    voListcolumns: [
        //{ name: "CgsCarUseListVo", logicalName: "리스트vo", type: "List", link: ""},
    ],
    voListcolumnType: ["List", "Vo"],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
})