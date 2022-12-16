<template>
  <textarea v-model="$store.state.serviceQuery" style="height: 100px"></textarea>
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