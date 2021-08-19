<template>
<div>
  <EventHub/>

  <Layout v-if="status == 1"/>
  <router-view v-else></router-view>
</div>
  
</template>

<script>
import Layout from './components/Layout.vue'
import EventHub from './components/EventHub.vue'

export default {
  components:{
    Layout,
    EventHub
  },
  data(){
    return{
      status: null
    }
  },
  watch: {
    $route: {
      handler() {
        this.isLoggedIn() ? this.status = 1 : this.status = 0;
      },
      immediate: true
    }
  },
  methods:{
    isLoggedIn() {
      return localStorage.getItem("auth");
    }
  },
  created(){
    this.isLoggedIn() ? this.status = 1 : this.status = 0;
  }
}

</script>

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

