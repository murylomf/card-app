<script setup lang="ts">
import CardItem from "@/components/CardItem.vue";
import Container from "@/components/Container.vue";
import ListCards from "@/components/ListCards.vue";
import service from "@/services/axios";
import { generateGuid } from "@/util";
import { onMounted, ref } from "vue";
import type { ICard } from "../models/cards.model";

let listCards = ref<Array<ICard>>(new Array<ICard>());
let textCard = ref<string>("");

const updateList = (): void => {
  service.get<Array<ICard>>("cards").then((response) => {
    listCards.value = response.data;
  });
};

const addCard = () => {
  const card: ICard = {
    id: generateGuid(),
    title: textCard.value,
  };
  service.post("cards", card).then(() => {
    textCard.value = "";
    updateList();
  });
};

const deleteCard = (id: string) => {
  service.delete(`cards/${id}`).then(() => {
    updateList();
  });
};

onMounted(() => {
  updateList();
});
</script>
<template>
  <Container>
    <button @click="addCard()">Adicionar</button>
    <textarea v-model="textCard"></textarea>
    <ListCards>
      <CardItem v-for="card in listCards" :key="card.id">
        <template #title>{{ card.title }}</template>
        <template #additional><p>Editar</p></template>
        <template #exit><p @click="deleteCard(card.id)">X</p></template>
      </CardItem>
    </ListCards>
  </Container>
</template>
