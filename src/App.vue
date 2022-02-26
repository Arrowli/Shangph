<template>
  <div>
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from './components/Footer/Footer.vue'
import Header from './components/Header/Header.vue'
export default {
  components:{
    Footer,
    Header,
  }
};
</script>