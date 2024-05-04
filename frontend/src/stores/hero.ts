import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { alerts } from "../utils/alerts.ts";
import Hero from "../models/Hero.ts";

const API_URL = "http://localhost:3000/api/v1/heroes";

export const useHeroStore = defineStore("hero", () => {
  let token = ref("");
  const heroes: Ref<Hero[]> = ref([]);
  const selectedHeroes: Ref<Hero[]> = ref([]);

  const getToken = async () => {
    try {
      const response = await fetch(`${API_URL}/token`);
      token.value = await response.json();
      await getHeroes();
      alerts.success("Has hecho logIn");
    } catch (error) {
      alerts.error("No ha sido posible hacer logIn");
    }
  };

  const logout = () => {
    token.value = "";
    heroes.value = [];
    selectedHeroes.value = [];
    alerts.success("Has hecho logOut");
  };

  const getHeroes = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      heroes.value = await response.json();
    } catch (error) {
      alerts.error(
        "Algo ha ido mal al intentar recuperar los heroes de la base de datos."
      );
    }
  };

  const getHero = async (name: string) => {
    try {
      const response = await fetch(`${API_URL}/${name}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      const [data] = await response.json();
      return data;
    } catch (error) {
      alerts.error(
        "Algo ha ido mal al intentar recuperar el heroe de la base de datos."
      );
    }
  };

  const createHero = async (body: Hero) => {
    if (!token.value) {
      alerts.info("Necesitas hacer logIn para crear un heroe");
      return;
    }
    try {
      let formData = new FormData();
      Object.keys(body).forEach((key) => {
        formData.append(key, body[key as keyof Hero]);
      });

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: formData,
      });
      if (response.status >= 400 && response.status <= 600) {
        throw new Error("Bad response");
      }
      await getHeroes();
      alerts.success("Heroe creado");
    } catch (error) {
      console.log(error);

      alerts.error("No se ha podido crear");
    }
  };

  const updateHero = async (body: Hero, id: string) => {
    if (!token.value) {
      alerts.info("Necesitas hacer logIn para actualizar un heroe");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400 && response.status <= 600) {
        throw new Error("Bad response");
      }
      await getHeroes();
      alerts.success("Heroe actualizado");
    } catch (error) {
      console.log(error);

      alerts.error("No se ha podido actualizar");
    }
  };

  const deleteHero = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      await getHeroes();
      alerts.success("Heroe borrado");
    } catch (error) {
      alerts.error("No se ha podido borrar");
    }
  };

  const selectHero = (hero: Hero) => {
    const heroIndex = selectedHeroes.value.indexOf(hero);
    if (heroIndex === -1) selectedHeroes.value.push(hero);
    else selectedHeroes.value.splice(heroIndex, 1);
  };

  const resetSelect = () => {
    selectedHeroes.value = [];
  };

  return {
    token,
    heroes,
    getToken,
    logout,
    getHeroes,
    getHero,
    createHero,
    updateHero,
    deleteHero,
    selectHero,
    resetSelect,
    selectedHeroes,
  };
});
