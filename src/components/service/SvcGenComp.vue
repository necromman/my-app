<template>
  <div class="flex flex-col relative col gap-4 gr-panel">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <textarea data-testid="textbox" v-model="$store.state.serviceQuery"
            class="w-full block gr-box gr-input gr-text-input mb-5" rows="8"></textarea>
          <!-- 내용 끝 -->
        </div>
      </div>
    </div>
  </div>
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
    generateQuery() {
      this.columnsT = this.$store.state.columns.map(column => column).filter(name => name !== '')
      this.$store.state.serviceQuery = `package ${this.$store.state.packageName}.service;\n`
      this.$store.state.serviceQuery += `
import java.util.List;
import com.inswave.elfw.exception.ElException;
import ${this.$store.state.packageName}.vo.${this.$store.state.projectName}Vo;
`
      this.$store.state.serviceQuery += `
public interface ${this.$store.state.projectName}Service {
  // List Select All
  public List<${this.$store.state.projectName}Vo> selectList() throws ElException;
  // List Select Param
  public List<${this.$store.state.projectName}Vo> selectListItem(${this.$store.state.projectName}Vo ${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo) throws ElException;
  // Single Select
  public ${this.$store.state.projectName}Vo selectSingleItem(${this.$store.state.projectName}Vo ${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo) throws ElException;
  // Insert
  public ${this.$store.state.projectName}Vo insertItem${this.$store.state.projectName}(${this.$store.state.projectName}Vo ${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo) throws ElException;
  // Update
  public ${this.$store.state.projectName}Vo updateItem${this.$store.state.projectName}(${this.$store.state.projectName}Vo ${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo) throws ElException;
  // Delete
  public ${this.$store.state.projectName}Vo deleteItem${this.$store.state.projectName}(${this.$store.state.projectName}Vo ${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo) throws ElException;
  // Mail
  public void ${this.$store.state.taskSubClass}MailSend(${this.$store.state.projectName}Vo ${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo) throws ElException;
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