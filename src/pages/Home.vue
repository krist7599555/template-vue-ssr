<template>
  <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab error perspiciatis hic. Provident optio adipisci fugit nobis earum magnam labore voluptatem ad fugiat. Itaque, in fuga ipsa cumque error soluta?</div>
  <button>
  <div class="center">hi</div>
  <div :class="{center: true, active: true}">hi2</div>
  </button>
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

<style scoped lang='scss'>
button {
  padding: 1rem 2rem;
  border: solid 1px blue;
  > .center {
    text-align: center;
  }
  &.active {
    background-color: burlywood;
    color: red;
  }
}
</style>