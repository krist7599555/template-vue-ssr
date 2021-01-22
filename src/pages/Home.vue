<template>
  <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab error perspiciatis hic. Provident optio adipisci fugit nobis earum magnam labore voluptatem ad fugiat. Itaque, in fuga ipsa cumque error soluta?</div>
   <teleport to="head">
    <title>Home</title>
    <meta property="og:description" content="home home">
  </teleport>
</template>

<script lang='ts'>
export default {
  setup() {
    console.log('homee')
    return {}
  }
}
</script>