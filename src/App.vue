<template>
  <nav>nav</nav>
  <div>
    <router-link to='/'>home</router-link>
    <router-link to='/about'>about</router-link>
  </div>
  <router-view></router-view>
</template>

<script lang='ts'>
// import { toRaw } from "vue";
// import { ssrContextKey } from 'vue'
import "./app.scss"
export default {
  setup() {
    return {}
  }
}
</script>

<style lang='pcss' scoped>
nav {
  height: 5rem;
  padding: 1rem;
  background-color: aquamarine;
}
a {
  color: green;
  @apply rounded-2xl rounded-r-none;
  @apply rounded;
  @apply border;
  @apply bg-white;
  @apply px-4;
  @apply py-2;
}
</style>