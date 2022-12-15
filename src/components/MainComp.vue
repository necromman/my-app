<template>
  <div>
    <p>
      <label>Choosed database:</label>
      {{ changeDb }} {{$store.state.count}}
    </p>
  </div>
  <hr>
  <!-- <div>
    <label>Choose SQL database:</label>
    <select v-model="selectedDb" @change="onChangeSelectDb($event)">
      <option v-for="db in databases" v-bind:key="db">{{ db }}</option>
    </select>
  </div>
  <div>
    <label>Choose DML statement:</label>
    <select v-model="selectedDml">
      <option v-for="dml in dmlStatements" v-bind:key="dml">{{ dml }}</option>
    </select>
  </div>
  <div>
    <label>Choose DDL statement:</label>
    <select v-model="selectedDdl">
      <option v-for="ddl in ddlStatements" v-bind:key="ddl">{{ ddl }}</option>
    </select>
  </div> -->
  <div>
    <label>Choose Task statement:</label>
    <select v-model="$store.state.selectedtaskClass" @change="onChangeSelectTask()">
      <option v-for="task in $store.state.taskClassStatements" v-bind:key="task.name">{{ task.name }}</option>
    </select>
    <input type="text" v-model="$store.state.taskSubClass" placeholder="taskSubClass" style="width:50px">
    <span style="margin-left:10px">{{ $store.state.selectedtaskClass }} : {{ this.$store.state.taskClassStatements.find(type => type.name === $store.state.selectedtaskClass).desc }}</span>
  </div>
  <div>
    <p>
      <label>Package name:</label>
      <input type="text" v-model="$store.state.packageName" placeholder="package Name">
    </p>
    <p>
      <label>Project name:</label>
      <input type="text" v-model="$store.state.projectName" placeholder="project name">
    </p>
    <p>
      <label>Logical name:</label>
      <input type="text" v-model="$store.state.logicalName" placeholder="logical Name">
    </p>
    <p>
      <label>Table name:</label>
      <input type="text" v-model="$store.state.tableName" placeholder="Table name">
    </p>
    <label>Add columns:</label>
    <button type="button" @click="addColumn">Add</button>
    <div v-for="(column, index) in $store.state.columns" :key="index">
      <label style="width: 30px;display: inline-block;">{{index+1}} : </label>
      <input style="width:120px" type="text" v-model="column.name" placeholder="Column name">
      <input style="width:100px" type="text" v-model="column.logicalName" placeholder="logical Name">
      <!-- sql type -->
      <select v-model="$store.state.columns[index].sqlType"
              @change="onChangeTypeLen(index, $store.state.columns[index].sqlType)">
        <option v-for="type in columnType" v-bind:key="type.name">{{ type.name }}</option>
      </select>
      <input style="width:30px" type="text" v-model="$store.state.columns[index].sqlLen" placeholder="Type len">
      <!-- vo type -->
      <select v-model="$store.state.columns[index].dataType">
        <option v-for="type in $store.state.voColumnType" v-bind:key="type">{{ type }}</option>
      </select>
      <label>
        null :
        <input type="checkbox" v-model="column.isChecked" /> 
      </label>
      <label>
        pk :
        <input type="checkbox" v-model="column.isPrimary" /> 
      </label>
      <button type="button" tabindex="-1" @click="removeColumn(index)">Remove</button>
    </div>
  </div>
  <hr style="margin : 20px 0">
  <div>
    <button type="button" @click="generateSelectQuery">Create</button>
    <button type="button" @click="saveToFile">zip download</button>
  </div>
  <div>
    <span>Select Query</span>    
    <textarea v-model="selectQuery" @click="selectTextarea($event)"></textarea>
    <span>Create Query</span>
    <textarea v-model="createQuery" @click="selectTextarea($event)" style="height: 100px"></textarea>
    <!-- <span>vo File</span>
    <textarea v-model="voQuery" @click="selectTextarea($event)" style="height: 100px"></textarea> -->
    <VoGenComp ref="VoGenComp"/>
  </div>
</template>
<style>
  textarea {width:100%;}
  p{margin:5px}
  input{text-align:center}
</style>

<script>
import VoGenComp from './VoGenComp.vue'
import JSZip from 'jszip'

export default {
  components: {
    VoGenComp
  },
   /* eslint-disable */
  /**
   * Creation 단계
   * 가장 먼저 실행되는 훅 data와 events가 세팅되지 않은 시점
   */
  beforeCreate() {
    console.log("beforeCreate");
  },
  data() {
    return {
      temp : this.$store.state.count,
      changeDb : 'INFORMIX',
      primaryKey : [],
      selectQuery : '',
      createQuery : '',
      voQuery : '',
      selectedDb: "INFORMIX",
      databases: ["INFORMIX", "ORACLE", "MySQL"],
      selectedDml: "SELECT",
      dmlStatements: ["INSERT", "SELECT", "UPDATE", "DELETE", "MERGE"],
      selectedDdl: "CREATE",
      ddlStatements: ["CREATE", "ALTER", "DROP"],
      columnsT : '',
      columnType:[],
      oracleColumnType:[],
      mySqlColumnType:[],
    }
  },
  watch: {
    '$store.state.taskSubClass': function() {
      this.onChangeSelectTask()
    }
  },
  methods: {
    saveToFile(){
      
      const zip = new JSZip();
      zip.file('file1.java', this.$store.state.voQuery)
      //zip.file('file2.txt', this.textareaContent2);
      const content = zip.generate({ type: 'blob' })

      const file = new File([content], 'myfile.zip', { type: 'application/zip' });

      // 생성된 파일을 다운로드
      const url = window.URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
    },
    onChangeTypeLen(index, name){
      const columnType = this.$store.state.informixColumnType.find(type => type.name === name)
      this.$store.state.columns[index].sqlLen = columnType.len
    },    
    addColumn(index) {
      this.$store.state.columns.unshift(
        { name: `column${this.$store.state.columns.length+1}`,
         isChecked: true,
         logicalName: "",
         isPrimary: false,
         sqlType: "VARCHAR",
         sqlLen: 255,
         dataType: "String"
        }
      )
    },
    removeColumn(index) {
      this.$store.state.columns.splice(index, 1)
    },
    generateSelectQuery() {
  			this.selectQuery = `SELECT `
  			this.$store.state.columnsT = this.$store.state.columns.map(column => column.name).filter(name => name !== '')
  			this.selectQuery += this.$store.state.columnsT.join(', ') + ' '
  			this.selectQuery += `FROM ${this.$store.state.tableName}`
        this.generateCreateQuery()
    },
    generateCreateQuery() {
        this.primaryKey = []
  			this.createQuery = `CREATE TABLE `
        this.createQuery += `${this.$store.state.tableName} (\n`
  			this.$store.state.columnsT = this.$store.state.columns.map(column => column).filter(name => name !== '')
      
        this.$store.state.columnsT.forEach((column, index) => {
          this.createQuery += '\t' + column.name + '\t' + this.$store.state.columns[index].sqlType
          if(this.$store.state.columns[index].sqlLen > 0) this.createQuery += '(' + this.$store.state.columns[index].sqlLen + ')'
          if(!column.isChecked) this.createQuery += '\tNOT NULL'
          if(column.isPrimary) this.primaryKey.push(column.name)
          this.createQuery += ',\n'
        });
        if(this.primaryKey.length > 0) this.createQuery += `\tPRIMARY KEY(${this.primaryKey.join(', ')})\n`
        this.createQuery += ')'
        this.$refs.VoGenComp.generateVoQuery();
    },
    toUpperCaseFirst(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    selectTextarea(event) {
      event.target.select()
    },
    onChangeSelectType(index){
      //
    },
    onChangeSelectDb(event){
      this.changeDb = event.target.value
      this.initializationDb()
    },
    onChangeSelectTask(){
      this.$store.state.packageName = this.$store.state.projectRoot + this.$store.state.selectedtaskClass + `.${this.$store.state.taskSubClass}`
    },
    initializationDb(){
      if(this.changeDb == 'INFORMIX') this.columnType = this.$store.state.informixColumnType
      if(this.changeDb == 'ORACLE') this.columnType = this.oracleColumnType
      if(this.changeDb == 'MySQL') this.columnType = this.mySqlColumnType
    },
  },
  /**
   * data와 events가 활성화되어 접근할 수 있는 단계
   * 메서드를 호출해보면 에러가 나오지 않는다.
   */
  created() {
    console.log("created")
    this.initializationDb()
    this.onChangeSelectTask()
  },
  /**
   * Mounting 단계
   *
   * 만약 초기 랜더링 직전에 돔을 변경하고자 한다면 이 단계를 활용하자,
   * 하지만 컴포넌트 초기에 세팅할 데이터들은 created 단계에서 이뤄져야한다.
   *
   * html 태그가 실행된 후 실행 => 즉, <template> 태그가 실행된 후 실행
   *
   * 템플릿과 렌더 함수들이 컴파일 된 후에 첫 렌더링이 일어나기 직전에 실행됨
   */
  beforeMount() {
    console.log("beforeMount");
  },
  /**
   * 여기서는 컴포넌트, 템플릿, 랜더링된 돔에 접근할 수 있는 단계이다.
   */
  mounted() {
    console.log("ButtonComponent Mounted");
  },
}
</script>