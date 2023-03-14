<template>

<div id="CONTENT_LEFT" class="w-full">

  <!-- 카드영역 시작 -->
  <div class="flex flex-col relative col gap-4 gr-panel" style="display: none">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <!-- 내용 시작 -->
          <label class="block">
            <span class="h2 block p-2" @click="storeCounter.increment(5)">
              SPEC
            </span>
          </label>
          <textarea data-testid="textbox" class="block w-full gr-box gr-input gr-text-input" cols="30" rows="8">
            {{ storeCounter.counter }} {{ storeCounter.doubleCount }}
                프로젝트
                - front-end
                  - Vue.js
                - back-end
                  - Express
                - database
                  - MariaDB

                TO-DO
                  기능
                    - 라우팅
                    - xml 생성 컴포넌트
                    - DB 명세서 출력
                      ....

            </textarea>
          <!-- 내용 끝 -->
        </div>
      </div>
    </div>
  </div>
  <!-- 카드영역 끝 -->

  <!-- 카드영역 시작 -->
  <div class="flex flex-col relative col gap-4 gr-panel">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <!-- 내용 시작 -->
          <label class="block">
            <span class="h2 block p-2">
              Choose Task statement
            </span>
            <div class="flex row flex-wrap gap-4">
              <select class="gr-box gr-input disabled:cursor-not-allowed" v-model="$store.state.selectedtaskClass"
                @change="onChangeSelectTask()">
                <option v-for="task in $store.state.taskClassStatements" v-bind:key="task.name">{{ task.name }}</option>
              </select>
              <input type="text" v-model="$store.state.taskSubClass" placeholder="taskSubClass"
                class="block gr-box gr-input gr-text-input">
              <span class="gr-sample-textbox block gr-box gr-input gr-text-input">
                {{ $store.state.selectedtaskClass }} :
                {{ this.$store.state.taskClassStatements.
    find(type => type.name === $store.state.selectedtaskClass).desc
}}
              </span>
            </div>
          </label>
          <label class="block">
            <span class="h2 block p-2">
              Package & Class Name
            </span>
            <div class="flex row flex-wrap gap-4">
              <input type="text" v-model="$store.state.packageName" placeholder="package Name"
                class="block gr-box gr-input gr-text-input">
              <input type="text" v-model="$store.state.projectName" placeholder="project name"
                class="block gr-box gr-input gr-text-input">
            </div>
          </label>
          <!-- 내용 끝 -->
        </div>
      </div>
    </div>
  </div>
  <!-- 카드영역 끝 -->


  <!-- 카드영역 시작 -->
  <div class="flex flex-col relative col gap-4 gr-panel">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <!-- 내용 시작 -->
          <label class="block">
            <span class="h2 block p-2">
              VO List Generate
            </span>
          </label>
          <!-- 버튼 영역 -->
          <div class="flex row flex-wrap gap-4 mb-2">
            <button @click="addVoListColumn" style="flex-grow: 0.1;"
              class="gr-button gr-button-lg gr-button-primary">ADD</button>
          </div>
          <div class="flex row flex-wrap gap-4 mb-2">
            <span style="flex-grow: 0.1;" class="gr-sample-textbox block gr-box gr-input gr-text-input">
              FileName
            </span>
            <input type="text" v-model="$store.state.voListcolumns[0].name" placeholder="file name"
              class="block gr-box gr-input gr-text-input">
          </div>
          <div v-for="(column, index) in $store.state.voListcolumns[0].content" :key="index"
            class="flex row flex-wrap gap-4 mb-2">
            <label class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1;">{{ index
    + 1
}}</label>
            <input type="text" v-model="column.name" placeholder="Column name"
              class="block gr-box gr-input gr-text-input">
            <input type="text" v-model="column.logicalName" placeholder="logical Name"
              class="block gr-box gr-input gr-text-input">
            <input type="text" v-model="column.link" placeholder="link vo" class="block gr-box gr-input gr-text-input"
              style="flex-grow: 4;">
            <select v-model="$store.state.voListcolumns[0].content[index].type"
              class="gr-box gr-input disabled:cursor-not-allowed">
              <option v-for="type in $store.state.voListcolumnType" v-bind:key="type">{{ type }}</option>
            </select>
            <button type="button" style="flex-grow: 0.1;" tabindex="-1" @click="removeVoListColumn(index)"
              class="gr-button gr-button-lg gr-button-secondary">Remove</button>
          </div>
          <!-- 내용 끝 -->
        </div>
      </div>
    </div>
  </div>
  <!-- 카드영역 끝 -->


  <!-- 카드영역 시작 -->
  <div class="flex flex-col relative col gap-4 gr-panel">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <label class="block">
            <span class="h2 block p-2">
              VO Generate
            </span>
          </label>
          <!-- 버튼 영역 --> 
          <div class="flex row flex-wrap gap-4 mb-2" style="display:none">
            <button @click="addVoColumn" class="gr-button gr-button-lg gr-button-primary">ADD</button>
            <button @click="removeVoColumn" class="gr-button gr-button-lg gr-button-secondary">REMOVE</button>
          </div>

          <!-- 내용 시작 -->
          <div v-for="(column, index) in $store.state.voCumns" :key="index"
            style="border: 3px solid #374151;padding: 20px 13px;margin: 10px 0;">
            <div class="flex row flex-wrap gap-4 mb-2">
              <label class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1;">Vo
                name:</label>
              <input type="text" v-model="column.name" placeholder="vo Name"
                class="gr-sample-textbox block gr-box gr-input gr-text-input">
              <label class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1;">Logical
                name:</label>
              <input type="text" v-model="column.logicalName" placeholder="logical Name"
                class="gr-sample-textbox block gr-box gr-input gr-text-input">
              <!-- <label class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1;">Table
                name:</label>
              <input type="text" v-model="column.tableName" placeholder="Table name"
                class="gr-sample-textbox block gr-box gr-input gr-text-input"> -->
            </div>
            <div class="flex row flex-wrap gap-4 mb-2">
              <label class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1;">Xda
                name:</label>
              <input type="text" v-model="column.xdaName" placeholder="Xda name"
                class="gr-sample-textbox block gr-box gr-input gr-text-input"
                style="background-color: rgb(255 140 140);color: rgb(33 8 1);font-size: 1.5em;">
              <button @click="callXdaAllParameter(index)" class="gr-button gr-button-lg gr-button-primary"
                style="flex-grow: 0.1;">CALL</button>
            </div>
            <div class="flex row flex-wrap gap-4 mb-2">
              <label class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1;">request {{
    $store.state.voCumns[index].req.length
}}</label>
              <textarea type="text" v-model="this.voCumnsListReq[index]" placeholder="request"
                class="gr-sample-textbox block gr-box gr-input gr-text-input" rows="1" disabled></textarea>
            </div>
            <div class="flex row flex-wrap gap-4 mb-2">
              <label class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1;">response {{
    $store.state.voCumns[index].res.length
}}</label>
              <textarea type="text" v-model="this.voCumnsListRes[index]" placeholder="response"
                class="gr-sample-textbox block gr-box gr-input gr-text-input" rows="1" disabled></textarea>
            </div>
            <div class="flex row flex-wrap gap-4 mb-2">
              <label class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1;">columnList {{
    $store.state.voCumns[index].columns.length
}}</label>
              <textarea type="text" v-model="this.voCumnsList[index]" placeholder="columnList"
                class="gr-sample-textbox block gr-box gr-input gr-text-input" rows="1"></textarea>
              <!-- <button @click="pushColumns(index)" class="gr-button gr-button-lg gr-button-secondary"
                style="flex-grow: 0.1;">PUSH</button> -->
            </div>

            <div>
              <div class="flex row flex-wrap gap-4 mb-2">
                <button @click="addColumn(index)" class="gr-button gr-button-lg gr-button-primary"
                  style="flex-grow: 0.2;">ADD</button>
              </div>
              <div v-for="(column, sindex) in $store.state.voCumns[index].columns" :key="sindex"
                class="flex row flex-wrap gap-4 mb-1">
                <label class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1;">{{
    sindex + 1
}} </label>
                <input class="gr-sample-textbox block gr-box gr-input gr-text-input" type="text" v-model="column.name"
                  placeholder="Column name">
                <input class="gr-sample-textbox block gr-box gr-input gr-text-input" type="text"
                  v-model="column.logicalName" placeholder="logical Name">
                <!-- sql type -->
                <select v-model="$store.state.voCumns[index].columns[sindex].sqlType"
                  @change="onChangeTypeLen(index, sindex, $store.state.voCumns[index].columns[sindex].sqlType)"
                  class="gr-sample-textbox block gr-box gr-input gr-text-input" style="display: none;">
                  <option v-for="type in columnType" v-bind:key="type.name">{{ type.name }}</option>
                </select>
                <input type="text" v-model="$store.state.voCumns[index].columns[sindex].sqlLen" placeholder="Type len"
                  class="gr-sample-textbox block gr-box gr-input gr-text-input" style="display: none;">
                <!-- vo type -->
                <select v-model="$store.state.voCumns[index].columns[sindex].dataType"
                  class="gr-sample-textbox block gr-box gr-input gr-text-input">
                  <option v-for="type in $store.state.voColumnType" v-bind:key="type">{{ type }}</option>
                </select>
                <label class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1; display:none;">
                  null
                </label>
                <input type="checkbox" v-model="column.isChecked"
                  class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1; display:none;" />
                <label class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1; display:none;">
                  pk
                </label>
                <input type="checkbox" v-model="column.isPrimary"
                  class="gr-sample-textbox block gr-box gr-input gr-text-input" style="flex-grow: 0.1; display:none;" />
                <button @click="removeColumn(index, sindex)" class="gr-button gr-button-md gr-button-secondary"
                  style="flex-grow: 0.1;">REMOVE</button>
              </div>
            </div>
          </div>
          <!-- 내용 끝 -->

        </div>
      </div>
    </div>

  </div>
  <!-- 카드영역 끝 -->

</div>

<div id="CONTENT_RIGHT" class="w-full">
  
  <!-- 카드영역 시작 -->
  <div class="flex flex-col relative col gap-4 gr-panel">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <!-- 내용 시작 -->
          <label class="block">
            <span class="h2 block p-2">
              Generate
            </span>
          </label>
          <div class="flex row flex-wrap gap-4">
            <button @click="generateSelectQuery" class="gr-button gr-button-lg gr-button-primary">CONVERT</button>
            <button @click="downloadZipFile" class="gr-button gr-button-lg gr-button-secondary">DOWNLOAD ZIP</button>
          </div>
          <!-- 내용 끝 -->
        </div>
      </div>
    </div>
  </div>
  <!-- 카드영역 끝 -->

  <div>
    <div class="flex row flex-wrap px-4 mb-1">
      <span style="" class="block gr-text-input h2 text-center">
        VO File
      </span>
      <button style="" @click="saveToFile($store.state.voQuery, 'Vo', 'java')"
        class="gr-button gr-button-lg">
        DOWNLOAD
      </button>
    </div>
    <div style="border: 5px solid dimgray;margin: 0 10px;">
      <VoGenComp ref="VoGenComp" />
    </div>
    <div class="flex row flex-wrap px-4 mb-1">
      <span style="" class="block gr-text-input h2 text-center">
        VO List File
      </span>
      <button style="" @click="saveToFile($store.state.voListQuery, 'ListVo', 'java')"
        class="gr-button gr-button-lg">
        DOWNLOAD
      </button>
    </div>
    <VoListGenComp ref="VoListGenComp" />
    <!-- <span>Select Query</span>
    <textarea v-model="selectQuery" @click="selectTextarea($event)"></textarea> -->
    <!-- <span>Create Query</span>
    <textarea v-model="createQuery" @click="selectTextarea($event)" style="height: 100px"></textarea> -->
    <!-- <span>vo File</span>
    <textarea v-model="voQuery" @click="selectTextarea($event)" style="height: 100px"></textarea> -->
    <!-- <span>FileCopyBatch File</span>
    <button type="button" @click="saveToFile(batchQuery, '', 'bat')">download</button>
    <textarea v-model="batchQuery" style="height: 100px"></textarea> -->
    <!-- <span>SqlMap File</span>
      <button type="button"
      @click="saveToFile($store.state.sqlmapQuery, '_SQL_informix_MyBatis', 'xml')">download</button>
      <SqlMapGenComp ref="SqlMapGenComp" /> -->
    <div class="flex row flex-wrap px-4 mb-1">
      <span style="" class="block gr-text-input h2 text-center">
        Controller File
      </span>
      <button style="" @click="saveToFile($store.state.controllerQuery, 'Controller', 'java')" class="gr-button gr-button-lg">
        DOWNLOAD
      </button>
    </div>
    <ControllerGenComp ref="ControllerGenComp" />
    <div class="flex row flex-wrap px-4 mb-1">
      <span style="" class="block gr-text-input h2 text-center">
        Service File
      </span>
      <button style="" @click="saveToFile($store.state.serviceQuery, 'Service', 'java')" class="gr-button gr-button-lg">
        DOWNLOAD
      </button>
    </div>
    <SvcGenComp ref="SvcGenComp" />
    <div class="flex row flex-wrap px-4 mb-1">
      <span style="" class="block gr-text-input h2 text-center">
        ServiceImpl File
      </span>
      <button style="" @click="saveToFile($store.state.serviceImplQuery, 'ServiceImpl', 'java')" class="gr-button gr-button-lg">
        DOWNLOAD
      </button>
    </div>
    <SvcImplGenComp ref="SvcImplGenComp" />
    <div class="flex row flex-wrap px-4 mb-1">
      <span style="" class="block gr-text-input h2 text-center">
        DAO File
      </span>
      <button style="" @click="saveToFile($store.state.daoQuery, 'DAO', 'java')" class="gr-button gr-button-lg">
        DOWNLOAD
      </button>
    </div>
    <DaoGenComp ref="DaoGenComp" />
  </div>
</div>
  


</template>
<style>
textarea {
  width: 65%;
  display: block;
}

p {
  margin: 5px
}

input {
  text-align: center
}
</style>

<script>
import { useCounterStore } from '@/stores/counter'
import VoGenComp from './vo/VoGenComp.vue'
import VoListGenComp from './vo/VoListGenComp.vue'
import SvcGenComp from './service/SvcGenComp.vue'
import SvcImplGenComp from './service/SvcImplGenComp.vue'
import DaoGenComp from './dao/DaoGenComp.vue'
import SqlMapGenComp from './sqlmap/SqlMapGenComp.vue'
import ControllerGenComp from './controller/ControllerGenComp.vue'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export default {
  components: {
    VoGenComp,
    VoListGenComp,
    SvcGenComp,
    SvcImplGenComp,
    DaoGenComp,
    SqlMapGenComp,
    ControllerGenComp
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
      storeCounter: useCounterStore(),
      token: '',
      batchQuery: `@echo off`,
      sqlmapPath: this.$store.state.basePath + this.$store.state.sqlMapPath + this.$store.state.selectedtaskClass + '\\' + this.$store.state.taskSubClass + '\\',
      javaPath: this.$store.state.basePath + this.$store.state.javaPath + this.$store.state.selectedtaskClass + '\\' + this.$store.state.taskSubClass + '\\',
      xmlPath: this.$store.state.basePath + this.$store.state.xmlPath + this.$store.state.selectedtaskClass + '\\' + this.$store.state.taskSubClass + '\\',
      temp: this.$store.state.count,
      changeDb: 'INFORMIX',
      primaryKey: [],
      selectQuery: '',
      createQuery: '',
      voQuery: '',
      selectedDb: "INFORMIX",
      databases: ["INFORMIX", "ORACLE", "MySQL"],
      selectedDml: "SELECT",
      dmlStatements: ["INSERT", "SELECT", "UPDATE", "DELETE", "MERGE"],
      selectedDdl: "CREATE",
      ddlStatements: ["CREATE", "ALTER", "DROP"],
      columnsT: '',
      columnType: [],
      oracleColumnType: [],
      mySqlColumnType: [],
      voCumnsList: [],
      voCumnsListReq: [],
      voCumnsListRes: [],
    }
  },
  watch: {
    '$store.state.taskSubClass': function () {
      this.onChangeSelectTask()
    },
    '$store.state.projectName': function () {
      this.onChangeSelectTask()
    },
    '$store.state.voCumns': {
      handler() {
        this.$store.state.voCumns.forEach((column, index) => {
          let temp = []
          let req = []
          let res = []
          column.columns.forEach((col, sindex) => {
            temp.push(col.name)
          })
          for (let i = 0; i < column.req.length; i++) {
            req.push(column.req[i])
          }
          for (let i = 0; i < column.res.length; i++) {
            res.push(column.res[i])
          }
          this.voCumnsList[index] = temp
          this.voCumnsListReq[index] = req
          this.voCumnsListRes[index] = res
        })
      },
      deep: true
    },
    'voCumnsList': {
      handler() {
        this.voCumnsList.forEach((col, index) => {
          if (!Array.isArray(col)) {
            this.voCumnsList[index] = col.split(',')
          }
        })
      },
      deep: true
    },
  },
  methods: {
    downloadZipFile() {
      const zip = new JSZip();
      zip.file(`${this.$store.state.projectName}.bat`, this.batchQuery);
      zip.file(`${this.$store.state.projectName}Controller.java`, this.$store.state.controllerQuery);
      zip.file(`${this.$store.state.projectName}DAO.java`, this.$store.state.daoQuery);
      zip.file(`${this.$store.state.projectName}ServiceImpl.java`, this.$store.state.serviceImplQuery);
      zip.file(`${this.$store.state.projectName}Service.java`, this.$store.state.serviceQuery);
      zip.file(`${this.$store.state.projectName}ListVo.java`, this.$store.state.voListQuery);
      zip.file(`${this.$store.state.projectName}_SQL_informix_MyBatis.xml`, this.$store.state.sqlmapQuery);
      for (let i = 0; i < this.$store.state.voCumns.length; i++) {
        zip.file(`${this.$store.state.voCumns[i].name}Vo.java`, this.$store.state.voQuery[i]);
      }

      // zip 파일을 생성합니다.
      zip.generateAsync({ type: 'blob' }).then(function (content) {
        // 생성된 zip 파일을 일괄 다운로드합니다.
        saveAs(content, 'queries.zip');
      });
    },
    saveToFile(param, tail = '', ext = 'txt') {
      if (Array.isArray(param)) {
        for (let i = 0; i < param.length; i++) {
          const column = param[i];
          const filename = tail === 'Vo' ? `${this.$store.state.voCumns[i].name}${tail}.${ext}` : `${this.$store.state.projectName}${tail}.${ext}`;
          this.downloadFile(column, filename);
        }
      } else {
        const filename = `${this.$store.state.projectName}${tail}.${ext}`;
        this.downloadFile(param, filename);
      }
    },
    downloadFile(content, filename) {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const file = new File([blob], filename, { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
    },
    onChangeTypeLen(index, sindex, name) {
      const columnType = this.$store.state.informixColumnType.find(type => type.name === name)
      this.$store.state.voCumns[index].columns[sindex].sqlLen = columnType.len
    },
    addVoColumn(index) {
      this.$store.state.voCumns.unshift(
        {
          name: `name${this.$store.state.voCumns.length + 1}`,
          logicalName: "LogicalName",
          tableName: "tableName",
          xdaName: "",
          sqlmapQueryListView: '',
          req: [],
          res: [],
          columns: [
            {
              name: "column1", isChecked: false, logicalName: "컬럼설명",
              isPrimary: true, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
            },
            {
              name: "column2", isChecked: false, logicalName: "컬럼설명",
              isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
            },
            {
              name: "column3", isChecked: false, logicalName: "컬럼설명",
              isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
            },
            {
              name: "column4", isChecked: true, logicalName: "컬럼설명",
              isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
            },
            {
              name: "column5", isChecked: true, logicalName: "컬럼설명",
              isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
            },
          ],
        }
      )
      //this.$refs.VoGenComp.forceRerender()
      //this.storeCounter.increment(1)
    },
    addColumn(index, $column) {
      let column = `column${this.$store.state.voCumns[index].columns.length + 1}`
      if($column != undefined) column = $column
       
      this.$store.state.voCumns[index].columns.unshift(
        {
          name: column,
          isChecked: true,
          logicalName: "",
          isPrimary: false,
          sqlType: "VARCHAR",
          sqlLen: 255,
          dataType: "String"
        }
      )
    },
    addVoListColumn(index) {
      let link = `${this.$store.state.projectRoot}${this.$store.state.selectedtaskClass}.${this.$store.state.taskSubClass}.vo.${this.$store.state.projectName}Vo`
      this.$store.state.voListcolumns[0].content.unshift(
        { name: "nameVoList", logicalName: "List Vo", type: "List", link: link },
      )
    },
    removeVoColumn(index, sindex) {
      this.$store.state.voCumns.splice(sindex, 1)
    },
    removeColumn(index, sindex) {
      this.$store.state.voCumns[index].columns.splice(sindex, 1)
    },
    removeVoListColumn(index) {
      this.$store.state.voListcolumns[0].content.splice(index, 1)
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
        if (this.$store.state.columns[index].sqlLen > 0) this.createQuery += '(' + this.$store.state.columns[index].sqlLen + ')'
        if (!column.isChecked) this.createQuery += '\tNOT NULL'
        if (column.isPrimary) this.primaryKey.push(column.name)
        this.createQuery += ',\n'
      });
      if (this.primaryKey.length > 0) this.createQuery += `\tPRIMARY KEY(${this.primaryKey.join(', ')})\n`
      this.createQuery += ')'

      this.$store.state.voCumns.forEach((column, index) => {
        this.$refs.VoGenComp.generateQuery(index)
        //this.$refs.VoGenComp.forceRerender()
        //this.storeCounter.increment(1)
      })

      this.$refs.VoListGenComp.generateQuery()
      this.$refs.SvcGenComp.generateQuery()
      this.$refs.SvcImplGenComp.generateQuery()
      this.$refs.DaoGenComp.generateQuery()
      this.$refs.ControllerGenComp.generateQuery()
      //this.$refs.SqlMapGenComp.generateQuery()
    },
    toUpperCaseFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    selectTextarea(event) {
      event.target.select()
    },
    onChangeSelectType(index) {
      //
    },
    onChangeSelectDb(event) {
      this.changeDb = event.target.value
      this.initializationDb()
    },
    onChangeSelectTask() {
      const path = this.$store.state.projectRoot + this.$store.state.selectedtaskClass + `.${this.$store.state.taskSubClass}`
      this.$store.state.packageName = path
      this.$store.state.voListcolumns.forEach((column, index) => {
        column.content.forEach((col, sindex) => {
          this.$store.state.voListcolumns[index].content[sindex].link = `${path}.vo.${this.$store.state.projectName}Vo`
        })
      })

      this.sqlmapPath = this.$store.state.basePath + this.$store.state.sqlMapPath + this.$store.state.selectedtaskClass + '\\' + this.$store.state.taskSubClass + '\\'
      this.javaPath = this.$store.state.basePath + this.$store.state.javaPath + this.$store.state.selectedtaskClass + '\\' + this.$store.state.taskSubClass + '\\'
      this.xmlPath = this.$store.state.basePath + this.$store.state.xmlPath + this.$store.state.selectedtaskClass + '\\' + this.$store.state.taskSubClass + '\\'

    },
    initializationDb() {
      if (this.changeDb == 'INFORMIX') this.columnType = this.$store.state.informixColumnType
      if (this.changeDb == 'ORACLE') this.columnType = this.oracleColumnType
      if (this.changeDb == 'MySQL') this.columnType = this.mySqlColumnType
    },
    pushColumns(index) {
      this.voCumnsList[index].forEach((col, sindex) => {
        this.$store.state.voCumns[index].columns[sindex].name = col
      })
    },
    callXdaAllParameter(index) {
      // ['kitech', 'com', 'sms', 'xda', 'MsgSendLogMS01']
      let xdaSplit = this.$store.state.voCumns[index].xdaName.split('.')
      this.$store.state.selectedtaskClass = xdaSplit[1]
      this.$store.state.taskSubClass = xdaSplit[2]
      this.$store.state.projectName = xdaSplit[xdaSplit.length-1]

      this.$store.state.voCumns[index].name = xdaSplit[xdaSplit.length-1]
      this.$store.state.voCumns[index].logicalName = `${xdaSplit[xdaSplit.length-1]}Exp`

      let link = `${this.$store.state.projectRoot}${this.$store.state.selectedtaskClass}.${this.$store.state.taskSubClass}.vo.${this.$store.state.projectName}Vo`
      this.$store.state.voListcolumns = [
      {
        name: `${this.$store.state.projectName}ListVo`,
        content: [
          { name: `${this.$store.state.projectName}VoList`, logicalName: "List Vo", type: "List", link: link },
          { name: `${this.$store.state.projectName}2Vo`, logicalName: "Single Vo", type: "Vo", link: link },
        ]
      }
    ]

      const data = { data: {
          xdaName: this.$store.state.voCumns[index].xdaName
        } }
      const headers = { 
        "authorization": this.$store.state.token,
        "content-type": "application/json",
      }
      this.axios.post("/api/getAllParameter", data, { headers })
        .then(res => {
          let tempList = []
          this.$store.state.voCumns[index].req = []
          this.$store.state.voCumns[index].res = []
          console.log("응답 데이터 : " + JSON.stringify(res.data))
          res.data.forEach((column, sindex) => {
            column.req.forEach((column, sindex) => {
              tempList.push(column)
              this.$store.state.voCumns[index].req.push(column)
            })
            column.res.forEach((column, sindex) => {
              tempList.push(column)
              this.$store.state.voCumns[index].res.push(column)
            })
          })
          let tempListSet = [...new Set(tempList)];
          this.$store.state.voCumns[index].columns = []
          for (let i = 0; i < tempListSet.length; i++) {
            this.$store.state.voCumns[index].columns.push(
              {
                name: tempListSet[i], isChecked: true, logicalName: this.snakeToCamel(tempListSet[i]),
                isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
              }
            )
          }

          this.callXdaSquery(index)
        })
        .catch(error => {
          console.log("에러 데이터 : " + error.data);
        })
        .finally(() => {

        })
    },
    callXdaSquery(index) {
      const data = { data: {
          xdaName: this.$store.state.voCumns[index].xdaName
        } }
      const headers = { 
        "authorization": this.$store.state.token,
        "content-type": "application/json; charset=utf-8",
      }
      this.axios.post("/api/getSQueryText", data, { headers })
        .then(res => {
          console.log("응답 데이터 : " + JSON.stringify(res.data))
          console.log(res.data.length)
          res.data.forEach((column, sindex) => {
            if (column.sQueryText === '') {
              this.$store.state.voCumns[index].sqlmapQueryListView = column.sQuery
              this.$store.state.voCumns[index].sqlmapQueryListOriginal = column.sQuery
            }else{
              this.$store.state.voCumns[index].sqlmapQueryListView = column.sQueryText
              this.$store.state.voCumns[index].sqlmapQueryListOriginal = column.sQueryText
            }
            //this.$refs.VoGenComp.forceRerender()
            //this.storeCounter.increment(1)
          })
        })
        .catch(error => {
          console.log("에러 데이터 : " + error.data);
        })
        .finally(() => {

        })
    },
    snakeToCamel(snakeCase) {
      let words = snakeCase.split("_");
      for (let i = 1; i < words.length; i++) {
        let camelCaseWord = words[i].substr(0, 1).toUpperCase() + words[i].substr(1);
        words.splice(i, 1, camelCaseWord);
      }
      return words.join("");
    },
  },
  /**
   * data와 events가 활성화되어 접근할 수 있는 단계
   * 메서드를 호출해보면 에러가 나오지 않는다.
   */
  created() {
    this.storeCounter.increment(5)
    const obj = { 'a': 'a' }
    this.$store.dispatch('a', obj)

    console.log("created")
    this.initializationDb()
    this.onChangeSelectTask()
    this.batchQuery += `
xcopy "%CD%\\${this.$store.state.projectName}Controller.java" "${this.javaPath}web" /y
xcopy "%CD%\\${this.$store.state.projectName}DAO.java" "${this.javaPath}dao" /y
xcopy "%CD%\\${this.$store.state.projectName}ServiceImpl.java" "${this.javaPath}service\\impl" /y
xcopy "%CD%\\${this.$store.state.projectName}Service.java" "${this.javaPath}service" /y
xcopy "%CD%\\${this.$store.state.projectName}Vo.java" "${this.javaPath}vo" /y
xcopy "%CD%\\${this.$store.state.projectName}ListVo.java" "${this.javaPath}vo" /y
xcopy "%CD%\\${this.$store.state.projectName}_SQL_informix_MyBatis.xml" "${this.sqlmapPath}" /y
`
    this.$store.state.voCumns = []
    this.$store.state.voCumns.unshift(
      {
        name: "",
        logicalName: "",
        tableName: "",
        xdaName: "kitech.com.sms.xda.MsgSendLogMS01",
        sqlmapQueryListView: '',
        req: [],
        res: [],
        columns: [
          {
            name: "column1", isChecked: false, logicalName: "컬럼설명",
            isPrimary: true, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
          },
          {
            name: "column2", isChecked: false, logicalName: "컬럼설명",
            isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
          },
          {
            name: "column3", isChecked: false, logicalName: "컬럼설명",
            isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
          },
          {
            name: "column4", isChecked: true, logicalName: "컬럼설명",
            isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
          },
          {
            name: "column5", isChecked: true, logicalName: "컬럼설명",
            isPrimary: false, sqlType: "VARCHAR", sqlLen: 255, dataType: "String"
          },
        ],
      }
    )
    this.callXdaAllParameter(0)
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
    //if(!this.$store.state.token) this.router.push('/login')
  },
  /**
   * 여기서는 컴포넌트, 템플릿, 랜더링된 돔에 접근할 수 있는 단계이다.
   */
  mounted() {
    console.log("ButtonComponent Mounted");
  },
}
</script>