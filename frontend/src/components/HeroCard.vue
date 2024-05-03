<script setup lang="ts">
import { ref } from "vue";
import { useHeroStore } from "../stores/hero.ts";
import { alerts } from "../utils/alerts.ts";
import { getBase64Img } from "../utils/images.ts";

const props = defineProps<{ hero: any }>();

const heroStore = useHeroStore();

const selected = ref(false);

const selectHero = () => {
  if (!selected.value && heroStore.selectedHeroes.length >= 3) {
    alerts.info("Sólo puedes seleccionar 3 heroes");
    return;
  }

  heroStore.selectHero(props.hero);
  selected.value = !selected.value;
};

const deleteHero = () => {
  heroStore.deleteHero(props.hero._id);
};
</script>

<template>
  <div
    @click="selectHero"
    class="card border-4 border-red-500 cursor-pointer relative overflow-hidden transition-all hover:rotate-12"
    :class="{ selected }"
  >
    <img
      :src="getBase64Img(hero.img)"
      :alt="`${hero.name} picture`"
      class="w-32 h-32"
    />
    <h3 class="p-4 text-center">{{ hero.name }}</h3>
    <ul
      class="stats text-xs text-end absolute top-0 right-0 translate-x-full bg-red-500 h-32 px-2 border-s-4 border-white flex flex-col justify-evenly transition-all duration-500"
    >
      <li>
        Agility: <span class="font-bold text-white">{{ hero.agility }}</span>
      </li>
      <li>
        Strength: <span class="font-bold text-white">{{ hero.strength }}</span>
      </li>
      <li>
        Resistance:
        <span class="font-bold text-white">{{ hero.resistance }}</span>
      </li>
      <li>
        Weight: <span class="font-bold text-white">{{ hero.weight }}</span>
      </li>
      <li>
        Charm: <span class="font-bold text-white">{{ hero.charm }}</span>
      </li>
    </ul>
  </div>

  <div class="flex">
    <img
      src="/trash.svg"
      alt="trash can"
      class="cursor-pointer bg-white w-5 h-5 m-1 rounded-full hover:scale-150 transition-all"
      @click="deleteHero"
    />
    <RouterLink :to="{ name: 'update', params: { name: hero.name } }">
      <img
        src="/pencil.svg"
        alt="trash can"
        class="cursor-pointer bg-white w-5 h-5 m-1 hover:scale-150 transition-all"
      />
    </RouterLink>
  </div>
</template>

<style>
.card:hover {
  .stats {
    transform: translateX(0);
  }
}
.card.selected {
  transform: rotate(5deg);
  background-color: red;
  color: white;
}
.card.selected:hover {
  transform: rotate(12deg);
}
</style>
