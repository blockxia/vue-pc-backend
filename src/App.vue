<template>
  <div id="app">
    <router-view/>
    <!--侧边导航-->
    <SlideBar v-show="$route.meta.isShow"/>
  </div>
</template>

<script>
import SlideBar from './components/SlideBar.vue'
export default {
  name: 'App',
  components: {
    SlideBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
