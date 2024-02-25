<script setup>
import { useUserStore } from '../stores/user';
import { RouterLink, RouterView } from "vue-router";
import Navbar from './components/Navbar.vue';
import { onMounted } from 'vue';

const userStore = useUserStore();
console.log(userStore.word);

</script>

<template>
  <Navbar></Navbar>
  <RouterView></RouterView>
</template>

<style scoped></style>
