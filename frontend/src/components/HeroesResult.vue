<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useHeroStore } from "../stores/hero.ts";
import Hero from "../models/Hero.ts";
import MainTitle from "./MainTitle.vue";
import Results from "../models/Results.ts";

const heroStore = useHeroStore();

const resultsArr: [Results] | any = reactive([{}, {}, {}]);

const show = ref(false);

const setInfo = () => {
  heroStore.selectedHeroes.forEach((hero: Hero, index) => {
    resultsArr[index]["id"] = hero._id;
    resultsArr[index]["name"] = hero.name;
    resultsArr[index]["img"] = hero.img;
    resultsArr[index]["wins"] = 0;
    resultsArr[index]["second"] = 0;
    resultsArr[index]["last"] = 0;
  });
};

const setClassification = (trial: string) => {
  const sortedResults = resultsArr.toSorted((a: Results, b: Results) => {
    return b[trial as keyof Results] - a[trial as keyof Results];
  });

  const firstHeroId = sortedResults[0].id;
  const secondHeroId = sortedResults[1].id;
  const thirdHeroId = sortedResults[2].id;

  resultsArr.forEach((results: Results) => {
    if (firstHeroId === results.id) results.wins++;
    if (secondHeroId === results.id) results.second++;
    if (thirdHeroId === results.id) results.last++;
  });
};

const climbing = () => {
  heroStore.selectedHeroes.forEach((hero, index) => {
    const result = hero.strength * 4 - hero.weight * 2;
    resultsArr[index]["climbing"] = result;
  });

  setClassification("climbing");
};

const joking = () => {
  const totalCharm = heroStore.selectedHeroes.reduce((acc, curr) => {
    return acc + curr.charm;
  }, 0);

  heroStore.selectedHeroes.forEach((hero, index) => {
    const result = hero.charm ** 2 - (totalCharm - hero.charm);

    resultsArr[index]["joking"] = result;
  });

  setClassification("joking");
};

const shooting = () => {
  const sortedResults = resultsArr.toSorted((a: Results, b: Results) => {
    return a.climbing + a.joking - b.climbing - b.joking;
  });

  const lastHeroId = sortedResults[0].id;

  heroStore.selectedHeroes.forEach((hero, index) => {
    const isLast = hero._id === lastHeroId;

    const result = hero.agility + hero.strength + (isLast ? 5 : 0);
    resultsArr[index]["shooting"] = result;
  });

  setClassification("shooting");
};

const racing = () => {
  const sortedResults = resultsArr.toSorted((a: Results, b: Results) => {
    return b.shooting - a.shooting;
  });

  const firstHeroId = sortedResults[0].id;

  heroStore.selectedHeroes.forEach((hero, index) => {
    const isFirst = hero._id === firstHeroId;

    const result = hero.agility * 4 + hero.resistance * 2 + (isFirst ? 10 : -1);
    resultsArr[index]["racing"] = result;
  });

  setClassification("racing");
};

const rescuing = () => {
  heroStore.selectedHeroes.forEach((hero, index) => {
    const wins = resultsArr[index].wins;

    const result = hero.agility * 2 + (wins >= 2 ? 5 : 0);
    resultsArr[index]["rescuing"] = result;
  });

  setClassification("rescuing");
};

const calculateTotal = () => {
  resultsArr.forEach((results: Results) => {
    const total = results.wins * 5 + results.second * 3 + results.last;
    results.total = total;
  });
};

const showResults = () => {
  resultsArr.sort((a: Results, b: Results) => b.total - a.total);
  show.value = true;
};

onMounted(() => {
  setInfo();

  climbing();
  joking();
  shooting();
  racing();
  rescuing();

  calculateTotal();
  showResults();
});
</script>

<template>
  <MainTitle>RESULTADOS</MainTitle>
  <ul class="my-10 flex flex-col items-center">
    <li
      v-for="(result, index) in resultsArr"
      :key="result.id"
      class="mx-5 my-5 w-[300px] flex items-center gap-5"
    >
      <div
        class="w-20 h-20 rounded-full flex flex-col justify-center items-center"
        :class="{
          'bg-yellow-500': index === 0,
          'bg-gray-400': index === 1,
          'bg-orange-300': index === 2,
        }"
      >
        <p>{{ result.total }}</p>
        <p>Puntos</p>
      </div>
      <h3>{{ result.name }}</h3>
    </li>
  </ul>
</template>
