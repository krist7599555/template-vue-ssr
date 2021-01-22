<template>
  <div>nav</div>
  <div>
    <router-link to='/'>home</router-link>
    <router-link to='/about'>about</router-link>
  </div>
  <router-view></router-view>
</template>

<script lang='ts'>
// import { toRaw } from "vue";
// import { ssrContextKey } from 'vue'
export default {
  setup() {
    return {}
  }
}
</script>