<template>
  <Navbar />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup>
import Navbar from '@/components/layouts/Navbar.vue'
import { useStoreAuth } from '@/stores/storeAuth.js'
import { onMounted } from 'vue'

const storeAuth = useStoreAuth()

onMounted(() => {
  storeAuth.init()
})

</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>
