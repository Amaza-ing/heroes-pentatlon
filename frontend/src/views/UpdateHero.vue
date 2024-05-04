<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useHeroStore } from "../stores/hero.ts";
import HeaderComponent from "../components/HeaderComponent.vue";
import MainTitle from "../components/MainTitle.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import Hero from "../models/Hero.ts";

const router = useRouter();
const heroStore = useHeroStore();

const route = useRoute();

const hero: Ref<Hero> = ref({
  _id: "",
  name: "",
  agility: 0,
  strength: 0,
  weight: 0,
  resistance: 0,
  charm: 0,
});

onMounted(async () => {
  const name = route.params.name as string;
  const data = await heroStore.getHero(name);
  hero.value = data;
  delete hero.value.img;
});

const update = async () => {
  await heroStore.updateHero(hero.value, hero.value._id as string);
  heroStore.resetSelect();
  router.push({ name: "heroes" });
};
</script>

<template>
  <HeaderComponent></HeaderComponent>
  <MainTitle class="my-10">Crea tu heroe</MainTitle>

  <form @submit.prevent="update" class="flex flex-col items-center gap-5">
    <fieldset class="flex gap-4">
      <label for="name" class="w-20">Nombre:</label>
      <input type="text" id="name" class="border w-40" v-model="hero.name" />
    </fieldset>
    <fieldset class="flex gap-4">
      <label for="agility" class="w-20">Agilidad:</label>
      <input
        type="number"
        min="0"
        max="10"
        id="agility"
        class="border w-40"
        v-model="hero.agility"
      />
    </fieldset>
    <fieldset class="flex gap-4">
      <label for="strength" class="w-20">Fuerza:</label>
      <input
        type="number"
        min="0"
        max="10"
        id="strength"
        class="border w-40"
        v-model="hero.strength"
      />
    </fieldset>
    <fieldset class="flex gap-4">
      <label for="resistance" class="w-20">Resistencia:</label>
      <input
        type="number"
        min="0"
        max="10"
        id="resistance"
        class="border w-40"
        v-model="hero.resistance"
      />
    </fieldset>
    <fieldset class="flex gap-4">
      <label for="weight" class="w-20">Peso:</label>
      <input
        type="number"
        min="0"
        max="10"
        id="weight"
        class="border w-40"
        v-model="hero.weight"
      />
    </fieldset>
    <fieldset class="flex gap-4">
      <label for="charm" class="w-20">Carisma:</label>
      <input
        type="number"
        min="0"
        max="10"
        id="charm"
        class="border w-40"
        v-model="hero.charm"
      />
    </fieldset>

    <ButtonComponent class="block mx-auto my-10">Actualizar</ButtonComponent>
  </form>
</template>
