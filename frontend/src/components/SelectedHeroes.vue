<script setup lang="ts">
import { ref } from "vue";
import { useHeroStore } from "../stores/hero.ts";
import { alerts } from "../utils/alerts.ts";
import { getBase64Img } from "../utils/images.ts";
import ButtonComponent from "./ButtonComponent.vue";

const heroStore = useHeroStore();

const areFighting = ref(false);

const emit = defineEmits(["fight"]);

const fight = () => {
  if (heroStore.selectedHeroes.length < 3) {
    alerts.info("Necesitas seleccionar 3 heroes");
    return;
  }

  areFighting.value = !areFighting.value;
  if (!areFighting.value) heroStore.resetSelect();
  emit("fight");
};
</script>

<template>
  <h2 class="mt-10 text-center text-2xl">Heroes Elegidos</h2>
  <p
    v-if="!heroStore.selectedHeroes.length"
    class="min-h-40 text-sm text-gray-400 flex justify-center items-center"
  >
    Aquí aparecerán tus heroes...
  </p>
  <div v-else>
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

    <ButtonComponent class="block mx-auto" @click="fight">
      <span v-if="!areFighting">Combatir</span>
      <span v-else>Seleccionar otros</span>
    </ButtonComponent>
  </div>
  <hr class="my-10" />
</template>
