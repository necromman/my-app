<script setup>
import hljs from 'highlight.js'
import CopyCode from './CopyCode.vue'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import TypeShow from './TypeShow.vue'
const props = defineProps({
  copy: {
    type: Boolean,
    default: true,
  },
  nameShow: {
    type: Boolean,
    default: true,
  },
  langName: {
    type: String,
    // default: '',
  },
  lang: {
    type: String,
    default: 'javascript',
    requied: true,
  },
  theme: {
    type: String,
    default: 'dark',
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '40px',
  },
  maxWidth: {
    type: String,
    default: '',
  },
  maxHeight: {
    type: String,
    default: '',
  },
  scrollStyleBool: {
    type: Boolean,
    default: true,
  },
  codeValue: {
    type: String,
    requied: true,
    default: '',
  },
  fontSize: {
    type: String,
    default: '18px',
  },
  codeLines: {
    type: Boolean,
    default: false,
  },
  borderRadius: {
    type: String,
    default: '0px',
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  textEditor: {
    type: Boolean,
    default: false,
  },
  spellcheck: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['getCodeValue'])

const langName = props.langName || props.lang
const font_size = props.fontSize
const languageClass = 'hljs language-' + props.lang

const textarea = ref(null)
const containerWidth = ref(0)
const border_radius = props.borderRadius
const withoutHeader = true
let arr = ref([])
const code = ref(null)
const textHeight = ref('0px')

const modelValue = ref(props.codeValue)
const top = ref(0)
const left = ref(0)

const vHighlight = {
  created(el, binding) {
    el.textContent = binding.value
    hljs.highlightElement(el)
  },
  updated(el, binding) {
    el.textContent = binding.value
    hljs.highlightElement(el)
  },
}

watch(
  () => modelValue.value,
  (value, oldValue) => {
    //console.log(111)
    emit('getCodeValue', modelValue.value)
  }
)
const resize = () => {
  const resize = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const obj = entry.contentRect
      containerWidth.value = obj.width + 40 // 40 is the padding
    }
  })
  // only the textarea is rendered the listener will run
  if (textarea.value) {
    resize.observe(textarea.value)
  }
}

const tab = () => {
  document.execCommand('insertText', false, '    ')
}

const calcContainerWidth = (event) => {
  containerWidth.value = event.target.clientWidth
}

const scroll = (event) => {
  top.value = -event.target.scrollTop
  left.value = -event.target.scrollLeft
}
const HighValue = computed(() => {
  return modelValue.value
})
onMounted(() => {
  resize()
})
defineExpose({
  modelValue,
})
</script>
<template>
  <div
    class="code hljs"
    :class="{
      atom_one_dark: props.theme == 'dark',
      atom_one_light: props.theme == 'light',
    }"
    :style="{
      width: '100px',
      height: props.height,
      padding: '5px 10px 0 0',
      borderRadius: props.borderRadius,
      zIndex: '700',
      maxWidth: props.maxwidth,
      // minWidth: '540px',
      maxHeight: props.maxHeight,
      // minHeight: '240px',
    }"
  >
    <div class="code_header">
      <TypeShow v-if="nameShow" :TL="langName"/>
      <CopyCode v-if="copy" :codeValue="modelValue"/>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.code {

  position: relative;

  &_header {
    min-height: 14px;
    position: relative;
  }
  &_area {
    position: relative;
    overflow: hidden;
    // padding: 20px;
    padding-left: 20px;
    // overflow: overlay;
    margin: 0;
    margin-top: 5px;
    // border-radius: 5px;
    display: flex;
    textarea {
      overflow-y: hidden;
      box-sizing: border-box;
      caret-color: rgba(127, 127, 127);
      -webkit-text-fill-color: transparent;
      white-space: pre;
      word-wrap: normal;
      border: 0;
      // color: #abb2bf;
      position: absolute;
      z-index: 1000;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: none;
      resize: none;
      border: none;
      outline: none;
      resize: none;
      padding: 15px 20px 20px 20px;
      line-height: 1.3;
      overflow: overlay;
      font-family: Consolas, Monaco, monospace;
      &::-webkit-scrollbar-track {
        background-color: #eee;
        // border-radius: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background: rgb(175, 171, 171);
        // border-radius: 5px;
      }
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-corner {
        background-color: #eee;
      }
    }
    &_link {
      position: absolute;
    }
    &.change_hight {
      height: calc(100% - 30px);
    }
    &.srollbar_style::-webkit-scrollbar-track {
      background-color: #eee;
      // border-radius: 5px;
    }
    &.srollbar_style::-webkit-scrollbar-thumb {
      background: rgb(175, 171, 171);
      // border-radius: 5px;
    }
    &.srollbar_style::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &.srollbar_style::-webkit-scrollbar-corner {
      background-color: #eee;
    }
    pre {
      position: relative;
      margin: 0;
      height: 100%;
      overflow: hidden;
      // margin: 14px 0px 0px 20px;
    }
  }
  &_header {
    position: relative;
    display: flex;
    justify-content: flex-start;
    // height: 30px;

    width: 100%;
  }
  pre code {
    // padding: 0px 20px 20px 20px;
    font-family: Consolas, Monaco, monospace;
    line-height: 1.3;
    // font-size: 16px;
    position: relative;
    overflow-x: visible;
    border-radius: 0;
    box-sizing: border-box;
    display: block;
    border: none;
    margin: 0;
  }
}

.wrapper-content::-webkit-scrollbar-track {
  background-color: #eee;
  border-radius: 5px;
}
.wrapper-content::-webkit-scrollbar-thumb {
  background: rgb(175, 171, 171);
  border-radius: 5px;
}
.wrapper-content::-webkit-scrollbar {
  width: 6px;
}

.code_area_lines {
  display: flex;
  flex-direction: column;
  width: 10px;
  // justify-content: center;
  // padding-top: 30px;
  align-items: center;
  position: absolute;
  transform: translateX(-18px);

  &_item {
    height: 24px;
    width: 10px;
    font-size: 12px;
    color: #adb5bd;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.6;
    &.dark {
      color: #adb5bd;
    }
    &.light {
      color: #212529;
    }
  }
}
</style>

<style>
</style>
