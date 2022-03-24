<template>
  <div>
      <TypeNav/>
      <ListContainer/>
      <Recommend/>
      <Rank/>
      <Like/>
      <Floor v-for="floor in floors" :key="floor.id" :list='floor'/>
      <Brand/>
  </div>
</template>

<script>

import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
import Like from '@/pages/Home/Like'
import ListContainer from '@/pages/Home/ListContainer'
import Rank from '@/pages/Home/Rank'
import Recommend from '@/pages/Home/Recommend'

import {mapState} from 'vuex'

import { getToken } from '@/utils/token'

export default {
  name:'Home',
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    Recommend
  },

  //请求floor资源
  mounted(){
    this.$store.dispatch('getFloors')
    this.$store.dispatch('getUserInfo')
  },

  computed: {
    ...mapState({
      floors: (state)=>state.home.floors
    })
  }
}
</script>

<style>

</style>