<template>
  <div>
    <Header/>
    <router-view/>
    <Footer v-show="!$route.meta.hideFooter"/>
  </div>
</template>

<script>

import Footer from './components/Footer'
import Header from './components/Header'

export default {
  components:{
    Footer,
    Header,
  },

  mounted(){
    this.$store.dispatch('getbaseCategoryList')
  }
};
</script>