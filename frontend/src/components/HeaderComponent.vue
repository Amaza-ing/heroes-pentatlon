<script setup lang="ts">
import { useHeroStore } from "../stores/hero.ts";

const heroStore = useHeroStore();

const login = () => {
  heroStore.getToken();
}

const logout = () => {
  heroStore.logout();
}
</script>

<template>
  <header class="bg-red-500 text-white h-20 flex justify-end items-center">
    <RouterLink :to="{name: 'home'}" class="cursor-pointer text-2xl p-3">Home</RouterLink>
    <RouterLink :to="{name: 'heroes'}" class="cursor-pointer text-2xl p-3">Heroes</RouterLink>
    <RouterLink :to="{name: 'create'}" class="cursor-pointer text-2xl p-3">Crear</RouterLink>
    <p v-if="!heroStore.token" @click="login" class="cursor-pointer text-2xl p-3">LogIn</p>
    <p v-else @click="logout" class="cursor-pointer text-2xl p-3">LogOut</p>
  </header>
</template>