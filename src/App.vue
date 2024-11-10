<template>
  <div>
    <!-- <nav>
      <router-link to="/">Persons</router-link>
      <router-link to="/products">Products</router-link>
      <router-link to="/result">Result</router-link>
    </nav> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import PersonsPage from './pages/PersonsPage.vue'
import ProductsPage from './pages/ProductsPage.vue';
import ResultPage from './pages/ResultPage.vue'

</script>

<style lang="scss">

</style>