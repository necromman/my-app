<template>
  <!-- 카드영역 시작 -->
<div class="flex flex-col relative col gap-4 gr-panel">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <!-- 내용 시작 -->
          <div class="absolute copy-wrap">
            <CopyComp
              ref="H"
              class="code"
              :nameShow="false"
              :copy="true"
              :codeValue="$store.state.voListQuery"
              :key="$store.state.voListQuery"
            ></CopyComp>
          </div>
          <textarea data-testid="textbox" v-model="$store.state.voListQuery" class="w-full block gr-box gr-input gr-text-input mb-5" rows="8"></textarea>
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
      columns : '',
      columnsT : '',
    }
  },
  watch: {
  },
  methods: {
    generateQuery() {
      this.columnsT = this.$store.state.voListcolumns[0].content.map(column => column).filter(name => name !== '')
      this.$store.state.voListQuery = `package ${this.$store.state.packageName}.vo;\n`
      this.$store.state.voListQuery += `
import com.inswave.elfw.annotation.ElDto;
import com.inswave.elfw.annotation.ElDtoField;
import com.inswave.elfw.annotation.ElVoField;
import com.fasterxml.jackson.annotation.JsonFilter;
`
      this.$store.state.voListQuery += `
@JsonFilter("elExcludeFilter")
@ElDto(FldYn = "", delimeterYn = "", logicalName = "${this.$store.state.logicalName}")
public class ${this.$store.state.projectName}ListVo extends kr.re.kitech.biz.xom.base.model.BizCommVO {
  private static final long serialVersionUID = 1L;

  public ${this.$store.state.projectName}ListVo(){
  }
`
      this.columnsT.forEach((column, index) => {
        this.$store.state.voListQuery += `
  @ElDtoField(logicalName = "${column.logicalName}", physicalName = "${column.name}", type = "", typeKind = "${column.type}", fldYn = "", delimeterYn = "", cryptoGbn = "", cryptoKind = "", length = 0, dotLen = 0, baseValue = "", desc = "")
  `
if(column.type == "List"){
  this.$store.state.voListQuery += `private java.util.List<${column.link}> ${column.name};
  `
}else{
  this.$store.state.voListQuery += `private ${column.link} ${column.name};
  `
}
      })
      
      this.columnsT.forEach((column, index) => {
        this.$store.state.voListQuery += `
  @ElVoField(physicalName = "${column.name}")`
  if(column.type == "List"){
    this.$store.state.voListQuery += `
    public java.util.List<${column.link}> get${this.toUpperCaseFirst(column.name)}(){
      return ${column.name};
  }

  @ElVoField(physicalName = "${column.name}")
  public void set${this.toUpperCaseFirst(column.name)}(java.util.List<${column.link}> ${column.name}){
      this.${column.name} = ${column.name};
  }
`
  }else{

    this.$store.state.voListQuery += `
    public ${column.link} get${this.toUpperCaseFirst(column.name)}(){
      return ${column.name};
  }

  @ElVoField(physicalName = "${column.name}")
  public void set${this.toUpperCaseFirst(column.name)}(${column.link} ${column.name}){
      this.${column.name} = ${column.name};
  }
`
 }
      })
      this.$store.state.voListQuery += `
  @Override
  public String toString() {
      StringBuilder sb = new StringBuilder();
      sb.append("${this.$store.state.projectName}ListVo [");
`
      this.columnsT.forEach((column, index) => {
        if(index == this.columnsT.length-1){
          this.$store.state.voListQuery += 
`      sb.append("${column.name}").append("=").append(${column.name});
`      }else{
        this.$store.state.voListQuery += 
`      sb.append("${column.name}").append("=").append(${column.name}).append(",");
`      }
      })

      this.$store.state.voListQuery += 
`      sb.append("]");
      return sb.toString();
    }
`
      this.$store.state.voListQuery +=
`

  public boolean isFixedLengthVo() {
    return false;
  }

`


this.$store.state.voListQuery +=
`
  @Override
  public void _xStreamEnc() {
`
this.columnsT.forEach((column, index) => {
  if(column.type == "List"){
    this.$store.state.voListQuery +=
`    for( int i=0 ; ${column.name} != null && i < ${column.name}.size() ; i++ ) {
        ${column.link} vo = (${column.link})${column.name}.get(i);
        vo._xStreamEnc();	 
    }
`
  }else{
    this.$store.state.voListQuery +=
`    if( this.${column.name} != null ) this.${column.name}._xStreamEnc();
`
  }
})
this.$store.state.voListQuery +=
`
  }

`

this.$store.state.voListQuery +=
`
  @Override
  public void _xStreamDec() {
`
this.columnsT.forEach((column, index) => {
  if(column.type == "List"){
    this.$store.state.voListQuery +=
`    for( int i=0 ; ${column.name} != null && i < ${column.name}.size() ; i++ ) {
        ${column.link} vo = (${column.link})${column.name}.get(i);
        vo._xStreamDec();	 
    }
`
  }else{
    this.$store.state.voListQuery +=
`    if( this.${column.name} != null ) this.${column.name}._xStreamDec();
`
  }
})
this.$store.state.voListQuery +=
`
  }
  
}
`


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