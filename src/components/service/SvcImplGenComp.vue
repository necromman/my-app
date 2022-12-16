<template>
  <textarea v-model="$store.state.serviceImplQuery" style="height: 100px"></textarea>
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
      this.columnsT = this.$store.state.columns.map(column => column).filter(name => name !== '')
      this.$store.state.serviceImplQuery = `package ${this.$store.state.packageName}.service;\n`
      this.$store.state.serviceImplQuery += `
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.inswave.elfw.exception.ElException;
import com.inswave.elfw.util.ControllerContextUtil;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

import kr.re.kitech.biz.xom.base.enums.Business;
import kr.re.kitech.biz.xom.base.model.BizUserHeader;
import kr.re.kitech.biz.xom.core.model.BizMail;
import kr.re.kitech.biz.xom.core.util.MailSender;
import kr.re.kitech.biz.xom.core.vo.MailTemplateVo;

import ${this.$store.state.packageName}.dao.${this.$store.state.projectName}DAO;
import ${this.$store.state.packageName}.service.${this.$store.state.projectName}Service;
import ${this.$store.state.packageName}.vo.${this.$store.state.projectName}Vo;
`
      this.$store.state.serviceImplQuery += `
@Service("${this.$store.state.projectName}ServiceImpl")
public class ${this.$store.state.projectName}ServiceImpl  extends EgovAbstractServiceImpl implements ${this.$store.state.projectName}Service {
  @Resource(name="${this.$store.state.projectName}DAO")
  private ${this.$store.state.projectName}DAO ${this.$store.state.taskSubClass}DAO;
    
	@Resource(name="mailSender")
	private MailSender mailSender;

  @Override
  public List<${this.$store.state.projectName}Vo> selectList() throws ElException {
    List<${this.$store.state.projectName}Vo> list = ${this.$store.state.taskSubClass}DAO.selectList();
    return list;
  }

  @Override
  public List<${this.$store.state.projectName}Vo> selectListItem(${this.$store.state.projectName}Vo vo) throws ElException {
    List<${this.$store.state.projectName}Vo> list = ${this.$store.state.taskSubClass}DAO.selectListItem(vo);	
    return list;
  }

  @Override
  public ${this.$store.state.projectName}Vo selectSingleItem(${this.$store.state.projectName}Vo ${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo) throws ElException {
    ${this.$store.state.projectName}Vo resultVO = cgsDAO.selectCarAdmin(${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo);			
      return resultVO;
  }

  @Override
	public int insertItem(${this.$store.state.projectName}Vo vo) throws ElException, IOException {
    int result = ${this.$store.state.taskSubClass}DAO.insert${this.$store.state.projectName}(vo);
    return result;
	}

  @Override
	public int updateItem(${this.$store.state.projectName}Vo vo) throws Exception {
    int result = ${this.$store.state.taskSubClass}DAO.update${this.$store.state.projectName}(vo);
		return result;
	}

  @Override
	public int deleteItem(${this.$store.state.projectName}Vo ${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo) throws Exception {
		return ${this.$store.state.taskSubClass}DAO.delete${this.$store.state.projectName}(${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo);
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