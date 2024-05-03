<script setup lang="ts">
import { RouterLink } from "vue-router";
import HeaderComponent from "../components/HeaderComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import MainTitle from "../components/MainTitle.vue";
</script>

<template>
  <HeaderComponent></HeaderComponent>
  <section class="h-screen flex flex-col justify-center items-center">
    <MainTitle> Bienvenidos al<br />PENTATLON DE LOS HEROES </MainTitle>
    <ButtonComponent class="my-40">
      <RouterLink :to="{ name: 'heroes' }"> EMPEZAR </RouterLink>
    </ButtonComponent>
  </section>
</template>
