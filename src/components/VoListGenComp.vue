<template>
  <textarea v-model="$store.state.voListQuery" style="height: 100px"></textarea>
</template>

<script>
export default {
   /* eslint-disable */
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
    generateVoQuery() {
      this.columnsT = this.$store.state.voListcolumns.map(column => column).filter(name => name !== '')
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
  public void set${this.toUpperCaseFirst(column.name)}(${column.link} ${column.name} ${column.name}){
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
`     if( this.${column.name} != null ) this.${column.name}._xStreamEnc();
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