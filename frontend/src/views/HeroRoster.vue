<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useHeroStore } from "../stores/hero.ts";
import HeaderComponent from "../components/HeaderComponent.vue";
import MainTitle from "../components/MainTitle.vue";
import HeroCard from "../components/HeroCard.vue";
import SelectedHeroes from "../components/SelectedHeroes.vue";
import ButtonComponent from "../components/ButtonComponent.vue";

const heroStore = useHeroStore();

onMounted(async () => {
  if (heroStore.token) await heroStore.getHeroes();
  if (heroStore.token) loading.value = false;
});

const loading = ref(true);

const login = async () => {
  await heroStore.getToken();
  loading.value = false;
}
</script>

<template>
  <HeaderComponent></HeaderComponent>
  <section>
    <SelectedHeroes></SelectedHeroes>
    <div>
      <MainTitle class="my-10">Elige tus heroes</MainTitle>

      <ul class="flex justify-center flex-wrap gap-10">
        <li v-for="hero in heroStore.heroes" :key="hero._id">
          <HeroCard :hero="hero"></HeroCard>
        </li>
      </ul>

      <h3 v-if="!heroStore.token" class="py-10 text-center">
        <p>Debes logarte para ver los heroes</p>
        <ButtonComponent class="my-4" @click="login">
          LogIn
        </ButtonComponent>
      </h3>
      <h3 v-else-if="loading" class="py-10 text-center">loading...</h3>
      <h3 v-else-if="!heroStore.heroes.length" class="py-10 text-center">
        <p>No tienes ningún heroe</p>
        <ButtonComponent class="my-4">
          <RouterLink
            :to="{ name: 'create' }"
            class="cursor-pointer text-2xl p-3"
          >
            Crear
          </RouterLink>
        </ButtonComponent>
      </h3>
      <h3
        v-else-if="heroStore.heroes.length >= 1 && heroStore.heroes.length <= 2"
        class="py-10 text-center"
      >
        <p>Necesitas al menos 3 héroes</p>
        <ButtonComponent class="my-4">
          <RouterLink
            :to="{ name: 'create' }"
            class="cursor-pointer text-2xl p-3"
          >
            Crear
          </RouterLink>
        </ButtonComponent>
      </h3>
    </div>
  </section>
</template>
