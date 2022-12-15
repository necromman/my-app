<template>
    <span>vo File</span>
    <textarea v-model="voQuery" style="height: 100px"></textarea>
</template>

<script>
export default {
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
      voQuery : '',
      columns : '',
      columnsT : '',
    }
  },
  watch: {
  },
  methods: {
    generateVoQuery() {
      this.columns = this.$store.state.columns
      this.columnsT = this.$store.state.columnsT
      this.voQuery = `package ${this.$store.state.packageName}.vo;\n`
      this.voQuery += `
import com.inswave.elfw.annotation.ElDto;
import com.inswave.elfw.annotation.ElDtoField;
import com.inswave.elfw.annotation.ElVoField;
import com.fasterxml.jackson.annotation.JsonFilter;
`
      this.voQuery += `
@JsonFilter("elExcludeFilter")
@ElDto(FldYn = "", delimeterYn = "", logicalName = " ${this.$store.state.projectName}")
public class ${this.$store.state.projectName} extends kr.re.kitech.biz.xom.base.model.BizCommVO {
  private static final long serialVersionUID = 1L;

  public ${this.$store.state.projectName}(){
  }
`
      this.columnsT.forEach((column, index) => {
        this.voQuery += `
  @ElDtoField(logicalName = "${column.logicalName}", physicalName = "${column.name}", type = "${column.dataType}", typeKind = "", fldYn = "", delimeterYn = "", cryptoGbn = "", cryptoKind = "", length = 0, dotLen = 0, baseValue = "", desc = "")
  private ${column.dataType} ${column.name};
`
      })
      
      this.columnsT.forEach((column, index) => {
        this.voQuery += `
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
      this.voQuery += `
  @Override
  public String toString() {
      StringBuilder sb = new StringBuilder();
      sb.append("${this.$store.state.projectName} [");
`
      this.columnsT.forEach((column, index) => {
        if(index == this.columnsT.length-1){
          this.voQuery += 
`      sb.append("${column.name}").append("=").append(${column.name});
`      }else{
        this.voQuery += 
`      sb.append("${column.name}").append("=").append(${column.name}).append(",");
`      }
      })

      this.voQuery += 
`      sb.append("]");
      return sb.toString();
    }
`
      this.voQuery +=
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