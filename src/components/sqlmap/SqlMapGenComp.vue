<template>
  <textarea v-model="$store.sqlmapQuery" style="height: 100px"></textarea>
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
      this.$store.sqlmapQuery += 
`
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper      
    PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"      
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="${this.$store.state.packageName}">

  <select id="selectListItem" parameterType="${this.$store.state.packageName}.vo.${this.$store.state.projectName}Vo" resultType="${this.$store.state.packageName}.vo.${this.$store.state.projectName}Vo">
    SELECT   /* QueryID : ${this.$store.state.packageName}.selectListItem */
      column1,
      column2
    FROM tableName
    WHERE column1 = #{param}
    <if test="param2 != null">
      AND column1 LIKE DECODE(#{param2}, '', '%', #{param2})
    </if>
    <if test="param3 != null">
      AND column1 = #{param3}
    </if>

  </select>

  <insert id="insertItem" parameterType="${this.$store.state.packageName}.vo.${this.$store.state.projectName}Vo">
    INSERT INTO tableName     /* QueryID : ${this.$store.state.packageName}.insertItem */
    (
      <if test="param1        != null and param1 != ''" >column1 ,</if>
      column2,
    ) VALUES (
      <if test="param1        != null and param1 != ''">#{param1} ,</if>
      param2
    )

  </insert>



</mapper>
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