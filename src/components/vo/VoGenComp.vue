<template>

<!-- 카드영역 시작 -->
<div v-for="(column, index) in this.$store.state.voCumns" :key="index" class="flex flex-col relative col gap-4 gr-panel">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <!-- VO 내용 시작 -->
          <label class="block relative">
            <span class="h2 block p-2">
              [ {{ $store.state.voCumns[index].name }}Vo ]
            </span>
          </label>
          <div class="absolute w-full right-6">
            <CopyComp
              ref="H"
              class="code"
              :nameShow="false"
              :copy="true"
              :codeValue="$store.state.voQuery[index]"
              :key="$store.state.voQuery[index]"
            ></CopyComp>
          </div>
          <textarea data-testid="textbox" v-model="$store.state.voQuery[index]" class="w-full block gr-box gr-input gr-text-input mb-5" rows="8"></textarea>
          <!-- 내용 끝 -->
          <!-- sqlMap 내용 시작 -->
          <div class="flex row flex-wrap gap-4">
            <label class="block relative">
              <span class="h2 block p-2">
                [ {{ $store.state.voCumns[index].name }}Vo sqlMap ]
              </span>
              <div class="absolute w-full right-6">
                <CopyComp
                  ref="H"
                  class="code"
                  :nameShow="false"
                  :copy="true"
                  :codeValue="$store.state.voCumns[index].sqlmapQueryListView"
                  :key="$store.state.voCumns[index].sqlmapQueryListView"
                ></CopyComp>
              </div>
          </label>
            <label class="block relative">
              <span class="h2 block p-2">
                [ {{ $store.state.voCumns[index].xdaName }} OriginalQuery ]
              </span>
              <div class="absolute w-full right-6">
              <CopyComp
                ref="H"
                class="code"
                :nameShow="false"
                :copy="true"
                :codeValue="$store.state.voCumns[index].sqlmapQueryListOriginal"
                :key="$store.state.voCumns[index].sqlmapQueryListOriginal"
              ></CopyComp>
              </div>
          </label>
          </div>
          <div class="flex row flex-wrap gap-4">
            <textarea data-testid="textbox" v-model="$store.state.voCumns[index].sqlmapQueryListView" class="w-full block gr-box gr-input gr-text-input mb-5" rows="8"></textarea>
            <textarea data-testid="textbox" v-model="$store.state.voCumns[index].sqlmapQueryListOriginal" class="w-full block gr-box gr-input gr-text-input mb-5" rows="8"></textarea>
            <!-- <HighCode
              ref="H"
              class="code"
              :codeValue="$store.state.voCumns[index].sqlmapQueryListView"
              :theme="this.dark"
              :fontSize="this.fontSize"
              :nameShow="false"
              :copy="true"
              :height="this.height"
              :width="this.width"
              :textEditor="true"
              :key="this.componentKey"
            ></HighCode>
            <HighCode
              ref="H"
              class="code"
              :codeValue="$store.state.voCumns[index].sqlmapQueryListOriginal"
              :theme="this.light"
              :fontSize="this.fontSize"
              :nameShow="false"
              :copy="true"
              :height="this.height"
              :width="this.width"
              :textEditor="true"
              :key="this.componentKey"
            ></HighCode> -->
          </div>
          <!-- 내용 끝 -->
        </div>
      </div>
    </div>
  </div>
  <!-- 카드영역 끝 -->
</template>

<script>
import CopyComp from '@/components/highlight/CopyComp.vue'
export default {
   /* eslint-disable */
  components: {
    CopyComp
  },
  beforeCreate() {
  },
  data() {
    return {
      columnsT : [],
      sqlmapQueryList: [],
      dmlStr:'',
      light: 'light',
      vue: 'vue',
      dark: 'dark',
      borderRadius: '0px',
      fontSize: '12px',
      booltrue: true,
      boolfalse: false,
      componentKey: 0
    }
  },
  watch: {
  },
  methods: {
    forceRerender(){
      this.componentKey += 1
    },
    generateQuery(index) {
      
      this.columnsT = this.$store.state.voCumns[index].columns.map(column => column).filter(name => name !== '')
      this.$store.state.voQuery[index] = `package ${this.$store.state.packageName}.vo;\n`
      this.$store.state.voQuery[index] += `
import com.inswave.elfw.annotation.ElDto;
import com.inswave.elfw.annotation.ElDtoField;
import com.inswave.elfw.annotation.ElVoField;
import com.fasterxml.jackson.annotation.JsonFilter;
`
      this.$store.state.voQuery[index] += `
@JsonFilter("elExcludeFilter")
@ElDto(FldYn = "", delimeterYn = "", logicalName = "${this.$store.state.voCumns[index].logicalName}")
public class ${this.$store.state.voCumns[index].name}Vo extends kr.re.kitech.biz.xom.base.model.BizCommVO {
  private static final long serialVersionUID = 1L;

  public ${this.$store.state.voCumns[index].name}Vo(){
  }
`
      this.columnsT.forEach((column, sindex) => {
        this.$store.state.voQuery[index] += `
  @ElDtoField(logicalName = "${column.logicalName}", physicalName = "${column.name}", type = "${column.dataType}", typeKind = "", fldYn = "", delimeterYn = "", cryptoGbn = "", cryptoKind = "", length = 0, dotLen = 0, baseValue = "", desc = "")
  private ${column.dataType} ${column.name};
`
      })
      
      this.columnsT.forEach((column, sindex) => {
        this.$store.state.voQuery[index] += `
  @ElVoField(physicalName = "${column.name}")
  public ${column.dataType} get${this.toUpperCaseFirst(column.name)}(){
      return ${column.name};
  }

  @ElVoField(physicalName = "${column.name}")
  public void set${this.toUpperCaseFirst(column.name)}(${column.dataType} ${column.name}){
      this.${column.name} = ${column.name};
  }
`
      })
      this.$store.state.voQuery[index] += `
  @Override
  public String toString() {
      StringBuilder sb = new StringBuilder();
      sb.append("${this.$store.state.voCumns[index].name}Vo [");
`
      this.columnsT.forEach((column, sindex) => {
        if(sindex == this.columnsT.length-1){
          this.$store.state.voQuery[index] += 
`      sb.append("${column.name}").append("=").append(${column.name});
`      }else{
        this.$store.state.voQuery[index] += 
`      sb.append("${column.name}").append("=").append(${column.name}).append(",");
`      }
      })

      this.$store.state.voQuery[index] += 
`      sb.append("]");
      return sb.toString();
    }
`
      this.$store.state.voQuery[index] +=
`

  public boolean isFixedLengthVo() {
    return false;
  }

  @Override
  public void _xStreamEnc() {
  }

  @Override
  public void _xStreamDec() {
  }
}`
this.queryReplace(index)
    },
    queryReplace(index){
      const regex = /(?<!\?)\?(?!\?)|\?\?/gm
      const regex2 = new RegExp('(\\<isNotEmpty node=)("|\')(.*?)("|\')((.*?)(>)|)([\\s\\S]*?)(<\\/isNotEmpty>)', 'g')
      const regexChange = new RegExp('@@change@@', 'g')

            
      let m
      let reqIdx = 0
      let dmlStr
      let str = this.$store.state.voCumns[index].sqlmapQueryListOriginal
      let reqStr = this.$store.state.voCumns[index].req
      let strList = []
      let strListIdx = 0

      while ((m = regex.exec(str)) !== null) {
          const firstIndex = m.index
          const lastIndex = m.index + m[0].length - 1
          str = str.substring(0, firstIndex) + `#{${reqStr[reqIdx]}}` + str.substring(lastIndex + 1)
          reqIdx++
          if (m.index === regex.lastIndex) {
              regex.lastIndex++
          }
      }
      while ((m = regex2.exec(str)) !== null) {
          strList.push(`<if test="${m[3]} != null">\n\t AND ${m[8].replace(/\n/g, "").trim()}\n</if>`)
      }
      str = str.replace(regex2, "@@change@@");
      while ((m = regexChange.exec(str)) !== null) {
          const firstIndex = m.index
          const lastIndex = m.index + m[0].length - 1
          console.log(firstIndex + ' : ' + lastIndex)
          str = str.substring(0, firstIndex) + `${strList[strListIdx]}` + str.substring(lastIndex + 1)
          strListIdx++
      }
      if (str !== null && str !== undefined) {
        str = str.replaceAll('<sql>','').replaceAll('</sql>','')
        str = str.trim();
        dmlStr = str.split(' ')[0].toLowerCase()
        dmlStr = dmlStr.split('\n')[0]
        if(dmlStr.indexOf('--') > -1) dmlStr = 'select'

        const reg = new RegExp(/select|update|delete|insert|merge/, "i")
        let dmlTrans = str.match(reg).join("") + ` /* QueryID : ${this.$store.state.packageName}.${dmlStr}ListItem${this.$store.state.projectName} */ \n\t\t`
        str = str.replace(reg, dmlTrans)
      }
      this.$store.state.voCumns[index].sqlmapQueryListView= 
`<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper      
    PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"      
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="${this.$store.state.packageName}">

  <${dmlStr} id="${dmlStr}ListItem${this.$store.state.projectName}" parameterType="${this.$store.state.packageName}.vo.${this.$store.state.voCumns[index].name}Vo" resultType="${this.$store.state.packageName}.vo.${this.$store.state.voCumns[index].name}Vo">
    
    ${str}

  </${dmlStr}>

</mapper>
`
// this.forceRerender()
// this.storeCounter.increment(1)
    },
    toUpperCaseFirst(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    
  },
}
</script>