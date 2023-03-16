<template>
  <div class="flex flex-col relative col gap-4 gr-panel">
    <div class="flex flex-col relative col gap-4">
      <div class="gr-form flex border-solid border bg-gray-200 dark:bg-gray-700 gap-px rounded-lg flex-wrap">
        <div class="gr-block gr-box relative border-solid border border-gray-200 gr-padded">
          <textarea data-testid="textbox" v-model="$store.state.dataCollection"
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
    }
  },
  watch: {
  },
  methods: {
    generateQuery() {
this.$store.state.dataCollection = 
`
<w2:dataMap baseNode="map" id="dma_search">
  <w2:keyInfo>
`
for (let i = 0; i < this.$store.state.voCumns[0].req.length; i++) {
this.$store.state.dataCollection += 
`       <w2:key id="${this.$store.state.voCumns[0].req[i]}" name="${this.$store.state.voCumns[0].req[i]}" dataType="text"></w2:key>
`
}
this.$store.state.dataCollection += 
` </w2:keyInfo>
</w2:dataMap>


`
this.$store.state.dataCollection += 
`<w2:dataList baseNode="list" repeatNode="map" id="dlt_list" saveRemovedData="true">
  <w2:columnInfo>
`  
for (let i = 0; i < this.$store.state.voCumns[0].res.length; i++) {
this.$store.state.dataCollection += 
`       <w2:column id="${this.$store.state.voCumns[0].res[i]}" name="${this.$store.state.voCumns[0].res[i]}" dataType="text"></w2:column>
`
}
this.$store.state.dataCollection += 
`  </w2:columnInfo>
</w2:dataList>
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