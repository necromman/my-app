<template>

  <div class="flex flex-col relative col gap-4 gr-panel">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <textarea data-testid="textbox" v-model="$store.state.controllerQuery"
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
      columns: '',
      columnsT: '',
      selectedtaskClass: '',
      taskSubClass: ''
    }
  },
  watch: {
  },
  methods: {
    generateQuery() {
      this.selectedtaskClass = this.$store.state.selectedtaskClass.toUpperCase()
      this.taskSubClass = this.$store.state.taskSubClass.toUpperCase()
      this.columnsT = this.$store.state.columns.map(column => column).filter(name => name !== '')
      this.$store.state.controllerQuery = `package ${this.$store.state.packageName}.web;\n`
      this.$store.state.controllerQuery += `
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.inswave.elfw.annotation.ElDescription;
import com.inswave.elfw.annotation.ElService;
import com.inswave.elfw.annotation.ElValidator;

import ${this.$store.state.packageName}.vo.${this.$store.state.projectName}Service;
import ${this.$store.state.packageName}.vo.${this.$store.state.projectName}Vo
`
      this.$store.state.controllerQuery += `
@Controller
public class ${this.$store.state.projectName}Controller {

  @Resource(name = "${this.$store.state.projectName}ServiceImpl")
  private ${this.$store.state.projectName}Service ${this.$store.state.taskSubClass}Service;

  @ElService(key="Svc${this.selectedtaskClass}${this.taskSubClass}COMR01")
  @RequestMapping(value="Svc${this.selectedtaskClass}${this.taskSubClass}COMR01")
  @ElDescription(sub="selectListItem",desc="selectListItem")
  public ${this.$store.state.packageName}Vo selectListItem(${this.$store.state.packageName}Vo ${this.taskSubClass}Vo) throws Exception {
      List<${this.$store.state.packageName}Vo> list = ${this.taskSubClass}Service.selectListItem(${this.taskSubClass}Vo);
      ${this.$store.state.packageName}Vo ${this.taskSubClass}VoList = new ${this.$store.state.packageName}Vo();
      ${this.taskSubClass}VoList.set${this.$store.state.packageName}VoList(list);
      return ${this.taskSubClass}VoList;
  }

  @ElService(key="Svc${this.selectedtaskClass}${this.taskSubClass}COMI01")
  @RequestMapping(value="Svc${this.selectedtaskClass}${this.taskSubClass}COMR01")
  @ElDescription(sub="insertItem",desc="insertItem")
  public void insertItem(${this.$store.state.packageName}Vo ${this.taskSubClass}Vo) throws Exception {
      ${this.taskSubClass}Service.insertItem(${this.taskSubClass}Vo);
  }
  
  

}
`
    },
    toUpperCaseFirst(str) {
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