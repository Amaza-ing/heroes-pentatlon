<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHeroStore } from "../stores/hero.ts";
import ButtonComponent from "./ButtonComponent.vue";

const props = defineProps<{ update?: boolean }>();

const emit = defineEmits(["herosubmit"]);

const router = useRouter();
const route = useRoute();
const heroStore = useHeroStore();

onMounted(async () => {
  if (!heroStore.token) {
    router.push({ name: "heroes" });
  }
  if (props.update) {
    const name = route.params.name as string;
    const data = await heroStore.getHero(name);
    hero.value = data;
  }
});

const hero: Ref = ref({
  name: "",
  img: null,
  agility: 0,
  strength: 0,
  weight: 0,
  resistance: 0,
  charm: 0,
});

const handleFileUpload = (e: any) => {
  hero.value.img = e.target.files[0];
};

const handleSubmit = () => {
  emit("herosubmit", hero.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col items-center gap-5">
    <fieldset class="flex gap-4">
      <label for="name" class="w-20">Nombre:</label>
      <input type="text" id="name" class="border w-40" v-model="hero.name" />
    </fieldset>
    <fieldset class="flex w-64">
      <label for="img" class="w-full flex gap-10"
        >Imagen:
        <p class="block border w-full">Seleccionar</p></label
      >
      <input
        type="file"
        id="img"
        class="hidden"
        placeholder="Imagen"
        @change="handleFileUpload($event)"
      />
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

    <ButtonComponent class="block mx-auto my-10">Aceptar</ButtonComponent>
  </form>
</template>
