<script setup lang="ts">
import { useRouter } from "vue-router";
import { useHeroStore } from "../stores/hero.ts";
import HeaderComponent from "../components/HeaderComponent.vue";
import MainTitle from "../components/MainTitle.vue";
import HeroForm from "../components/HeroForm.vue";
import Hero from "../models/Hero.ts";

const router = useRouter();
const heroStore = useHeroStore();

const create = async (hero: Hero) => {
  await heroStore.createHero(hero);
  heroStore.resetSelect();
  router.push({ name: "heroes" });
};
</script>

<template>
  <HeaderComponent></HeaderComponent>
  <MainTitle class="my-10">Crea tu heroe</MainTitle>

  <HeroForm @herosubmit="create($event)"></HeroForm>
</template>
