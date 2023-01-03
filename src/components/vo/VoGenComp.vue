<template>

<!-- 카드영역 시작 -->
<div v-for="(column, index) in this.$store.state.voCumns" :key="index" class="flex flex-col relative col gap-4 gr-panel">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <!-- 내용 시작 -->
          <label class="block">
            <span class="h2 block p-2">
              [ {{ $store.state.voCumns[index].name }} ]
            </span>
          </label>
          <textarea data-testid="textbox" v-model="$store.state.voQuery[index]" class="w-full block gr-box gr-input gr-text-input mb-5" rows="50"></textarea>
          <!-- 내용 끝 -->
        </div>
      </div>
    </div>
  </div>
  <!-- 카드영역 끝 -->
</template>

<script>
export default {
   /* eslint-disable */
  beforeCreate() {
  },
  data() {
    return {
      columnsT : [],
    }
  },
  watch: {
  },
  methods: {
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