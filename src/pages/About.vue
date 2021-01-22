<template>
  <teleport to="head">
    <title>About</title>
    <meta property="og:description" content="aaabbbouttt">
  </teleport>
  <button @click='show = !show'>SHOW {{show}}</button>
  <button @click='count += 1'>COUNT {{count}}</button>
  <div v-if='show'>
    About {{count}} About About About About About About About About About About About About About About About About About 
  </div>
</template>

<script setup lang='ts'>
ref: count = 0
ref: show = false
</script>
