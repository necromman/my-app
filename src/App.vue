<template>
  <!-- <MainComp/> -->
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import MainComp from '@/components/MainComp.vue'

export default {
  name: 'App',
  components: {
    MainComp
  }
}
</script>

<style>
* {
    font-size: 12px;
}
</style>
