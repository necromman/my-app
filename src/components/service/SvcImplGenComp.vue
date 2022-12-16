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
    generateQuery() {
      this.columnsT = this.$store.state.columns.map(column => column).filter(name => name !== '')
      this.$store.state.serviceImplQuery = `package ${this.$store.state.packageName}.service.impl;\n`
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
    ${this.$store.state.projectName}Vo resultVO = cgsDAO.selectSingleItem(${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo);			
      return resultVO;
  }

  @Override
	public int insertItem(${this.$store.state.projectName}Vo vo) throws ElException, IOException {
    int result = ${this.$store.state.taskSubClass}DAO.insertItem(vo);
    return result;
	}

  @Override
	public int updateItem(${this.$store.state.projectName}Vo vo) throws Exception {
    int result = ${this.$store.state.taskSubClass}DAO.updateItem(vo);
		return result;
	}

  @Override
	public int deleteItem(${this.$store.state.projectName}Vo ${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo) throws Exception {
		return ${this.$store.state.taskSubClass}DAO.deleteItem(${this.toUpperCaseFirst(this.$store.state.taskSubClass)}Vo);
	}

  @Override
	public void ${this.$store.state.taskSubClass}MailSend(${this.$store.state.projectName}Vo ${this.$store.state.taskSubClass}Vo) throws ElException {
		MailTemplateVo templateVo = new MailTemplateVo();
		Map<String, String> templateVar = new HashMap<String, String>();
		BizUserHeader siteUserHeader = (BizUserHeader)ControllerContextUtil.getUserHeader();
		
		
		templateVar.put("@data@", ${this.$store.state.taskSubClass}Vo.getDataName());
		
		String subject = "subject";
		String templatePath = "${this.$store.state.selectedtaskClass}/TemplateMailName";
		String syspayno = siteUserHeader.getSession().getSn();
		String toAddr = ${this.$store.state.taskSubClass}DAO.selectReqPsnEmail(${this.$store.state.taskSubClass}Vo).getEmail();
		String sender = siteUserHeader.getSession().getUid() + "@kitech.re.kr";
		
		templateVo.setContentVar(templateVar);
		List<MailTemplateVo> templateVars = new ArrayList<>();
		templateVars.add(templateVo);
		
		mailSender.sendMessage(
			// 비즈니스 타입, 행위자 시스템 사번, 개별발송여부는 고정 속성
			new BizMail.Builder(syspayno, Business.${this.$store.state.selectedtaskClass.toUpperCase()}, true)
				.senderEmail(sender.trim())
				.toAddr(toAddr.trim())
				//.ccAddr(ccAddress)
				.subject(subject)
				.savesent(false)	// 받은 편지함 저장 여부
				.logging(true)	// 로그 저장 여부
				.templatePath(templatePath)
				.templateVars(templateVars)
			.build());
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