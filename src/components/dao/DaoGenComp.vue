<template>
  <div class="flex flex-col relative col gap-4 gr-panel">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <textarea data-testid="textbox" v-model="$store.state.daoQuery"
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
      this.$store.state.daoQuery = `package ${this.$store.state.packageName}.dao;\n`
      this.$store.state.daoQuery += `
import java.util.List;
import org.springframework.stereotype.Repository;
import com.inswave.elfw.exception.ElException;
import ${this.$store.state.packageName}.vo.${this.$store.state.projectName}Vo;
import kr.re.kitech.biz.xom.base.dao.BizDefaultAbstractDAO;
`
      this.$store.state.daoQuery += `
@Repository("${this.$store.state.projectName}DAO")
public class ${this.$store.state.projectName}DAO extends BizDefaultAbstractDAO {
  
  public List<${this.$store.state.projectName}Vo> selectList() throws ElException {
    List<${this.$store.state.projectName}Vo> result = (List<${this.$store.state.projectName}Vo>)list("${this.$store.state.packageName}.selectList"); 
    return result;
  }

  public List<${this.$store.state.projectName}Vo> selectListItem(${this.$store.state.projectName}Vo vo) throws ElException {
    return (List<${this.$store.state.projectName}Vo>)list("${this.$store.state.packageName}.selectListItem", vo);
  }

  public ${this.$store.state.projectName}Vo selectSingleItem(${this.$store.state.projectName}Vo vo) throws ElException {
    return (${this.$store.state.projectName}Vo) selectByPk("${this.$store.state.packageName}.selectSingleItem", vo);
  }

  public int insertItem(${this.$store.state.projectName}Vo vo) throws ElException {
    return insert("${this.$store.state.packageName}.insertItem", vo);
  }

  public int updateItem(${this.$store.state.projectName}Vo vo) throws ElException {
    return update("${this.$store.state.packageName}.updateItem", vo);
  }

  public int deleteItem(${this.$store.state.projectName}Vo vo) throws ElException {
    return update("${this.$store.state.packageName}.deleteItem", vo);
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