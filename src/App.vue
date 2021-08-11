<template>

  <EventHub />

  <Layout />
  
</template>

<style>
*{
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import Layout from './components/Layout.vue'
import EventHub from './components/EventHub.vue'

export default {
  components:{
    Layout,
    EventHub
  }
}
</script>

