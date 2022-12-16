<template>
  <textarea v-model="$store.state.voQuery" style="height: 100px"></textarea>
</template>

<script>
export default {
   /* eslint-disable */
  beforeCreate() {
  },
  data() {
    return {
      temp : this.$store.state.count,
      columns : '',
      columnsT : '',
    }
  },
  watch: {
  },
  methods: {
    generateQuery() {
      this.columnsT = this.$store.state.columns.map(column => column).filter(name => name !== '')
      this.$store.state.voQuery = `package ${this.$store.state.packageName}.vo;\n`
      this.$store.state.voQuery += `
import com.inswave.elfw.annotation.ElDto;
import com.inswave.elfw.annotation.ElDtoField;
import com.inswave.elfw.annotation.ElVoField;
import com.fasterxml.jackson.annotation.JsonFilter;
`
      this.$store.state.voQuery += `
@JsonFilter("elExcludeFilter")
@ElDto(FldYn = "", delimeterYn = "", logicalName = "${this.$store.state.logicalName}")
public class ${this.$store.state.projectName}Vo extends kr.re.kitech.biz.xom.base.model.BizCommVO {
  private static final long serialVersionUID = 1L;

  public ${this.$store.state.projectName}Vo(){
  }
`
      this.columnsT.forEach((column, index) => {
        this.$store.state.voQuery += `
  @ElDtoField(logicalName = "${column.logicalName}", physicalName = "${column.name}", type = "${column.dataType}", typeKind = "", fldYn = "", delimeterYn = "", cryptoGbn = "", cryptoKind = "", length = 0, dotLen = 0, baseValue = "", desc = "")
  private ${column.dataType} ${column.name};
`
      })
      
      this.columnsT.forEach((column, index) => {
        this.$store.state.voQuery += `
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
      this.$store.state.voQuery += `
  @Override
  public String toString() {
      StringBuilder sb = new StringBuilder();
      sb.append("${this.$store.state.projectName}Vo [");
`
      this.columnsT.forEach((column, index) => {
        if(index == this.columnsT.length-1){
          this.$store.state.voQuery += 
`      sb.append("${column.name}").append("=").append(${column.name});
`      }else{
        this.$store.state.voQuery += 
`      sb.append("${column.name}").append("=").append(${column.name}).append(",");
`      }
      })

      this.$store.state.voQuery += 
`      sb.append("]");
      return sb.toString();
    }
`
      this.$store.state.voQuery +=
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