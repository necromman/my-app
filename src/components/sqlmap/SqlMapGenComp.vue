<template>
  <textarea v-model="$store.state.sqlmapQuery" style="height: 100px"></textarea>
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
      this.$store.state.sqlmapQuery = 
`<?xml version="1.0" encoding="UTF-8" ?>
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

  <select id="selectSingleItem" parameterType="${this.$store.state.packageName}.vo.${this.$store.state.projectName}Vo" resultType="${this.$store.state.packageName}.vo.${this.$store.state.projectName}Vo">
    SELECT   /* QueryID : ${this.$store.state.packageName}.selectSingleItem */
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

  <update id="updateItem" parameterType="${this.$store.state.packageName}.vo.${this.$store.state.projectName}Vo">
    UPDATE tableName SET        /* QueryID : ${this.$store.state.packageName}.updateItem */
    column1 = #{param1}
    WHERE column1=#{param1}
  </update>

  <delete id="deleteItem" parameterType="${this.$store.state.packageName}.vo.${this.$store.state.projectName}Vo">
    DELETE FROM tableName     /* QueryID : ${this.$store.state.packageName}.deleteItem */
    WHERE column1=#{param1}
  </delete>

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