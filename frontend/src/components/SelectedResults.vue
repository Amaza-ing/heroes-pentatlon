<script setup lang="ts">
import { useRouter } from "vue-router";
import { useHeroStore } from "../stores/hero.ts";
import { getBase64Img } from "../utils/images.ts";
import ButtonComponent from "./ButtonComponent.vue";

const router = useRouter();
const heroStore = useHeroStore();

const goToHeroes = () => {
  heroStore.resetSelect();
  router.push({ name: "heroes" });
};
</script>

<template>
  <h2 class="mt-10 text-center text-2xl">Heroes Elegidos</h2>
  <div>
    <ul class="flex justify-around">
      <li
        v-for="hero in heroStore.selectedHeroes"
        :key="hero._id"
        class="m-10 flex flex-col items-center"
      >
        <img
          :src="getBase64Img(hero.img)"
          :alt="`${hero.name} picture`"
          class="rounded-full w-16 h-16"
        />
        <h3>{{ hero.name }}</h3>
      </li>
    </ul>

    <ButtonComponent class="block mx-auto" @click="goToHeroes">
      Seleccionar heroes
    </ButtonComponent>
  </div>
  <hr class="my-10" />
</template>
