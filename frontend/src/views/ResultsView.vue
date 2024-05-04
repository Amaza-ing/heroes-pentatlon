<script setup lang="ts">
import { useHeroStore } from "../stores/hero.ts";
import HeaderComponent from "../components/HeaderComponent.vue";
import HeroesResult from "../components/HeroesResult.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import MainTitle from "../components/MainTitle.vue";
import SelectedResults from "../components/SelectedResults.vue";

const heroStore = useHeroStore();
</script>

<template>
  <HeaderComponent></HeaderComponent>
  <section v-if="heroStore.token && heroStore.selectedHeroes.length">
    <SelectedResults></SelectedResults>
    <HeroesResult></HeroesResult>
  </section>
  <section v-else class="my-20">
    <MainTitle>Necesitas estar logado y seleccionar héroes para ver los resultados</MainTitle>
    <ButtonComponent class="block mx-auto my-20">
      <RouterLink :to="{ name: 'heroes' }" class="cursor-pointer">
        Seleccionar los Heroes
      </RouterLink>
    </ButtonComponent>
  </section>
</template>
