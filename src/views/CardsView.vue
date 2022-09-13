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
let novo = ref<boolean>(false);

const updateList = (): void => {
  service.get<Array<ICard>>("cards").then((response) => {
    listCards.value = response.data;
  });
};

const handleNovo = (): void => {
  handleNovo();
  textCard.value = "";
};

const resetCard = (): void => {
  novo.value = !novo.value;
};

const addCard = () => {
  const card: ICard = {
    id: generateGuid(),
    title: textCard.value,
  };

  service.post("cards", card).then(() => {
    textCard.value = "";
    updateList();
    resetCard();
  });
};

const deleteCard = (id: string) => {
  service.delete(`cards/${id}`).then(() => {
    updateList();
  });
};

const editCard = (card: ICard) => {
  service.put(`cards/${card.id}`, card).then(() => {
    updateList();
  });
};

onMounted(() => {
  updateList();
});
</script>
<template>
  <Container>
    <button class="button__add" @click="addCard()" v-if="novo == true">
      Adicionar
    </button>
    <button class="button__remove" @click="resetCard()" v-if="novo == true">
      Cancelar
    </button>
    <button class="button__new" @click="novo = true" v-if="novo == false">
      Novo
    </button>
    <textarea
      class="card__new"
      v-if="novo == true"
      v-model="textCard"
    ></textarea>
    <ListCards>
      <CardItem v-for="card in listCards" :key="card.id">
        <template #title>
          <textarea class="card__textarea" v-model="card.title" cols="35" rows="2"></textarea>
        </template>
        <template #additional><p @click="editCard(card)">Editar</p></template>
        <template #exit><p @click="deleteCard(card.id)">X</p></template>
      </CardItem>
    </ListCards>
  </Container>
</template>

<style>
button {
  position: fixed;
  bottom: 2%;
  font-size: 20px;
  letter-spacing: 1px;
  padding: 10px;
  cursor: pointer;
  border-radius: 15px;
  border: 1px solid grey;
  z-index: 7;
  font-weight: 200;
}
.button__add {
  background-color: #abc9ff;
  left: 2%;
}

.button__remove {
  background-color: #eb4747;
  left: 40%;
}

.card__textarea {
  background: transparent;
  border-style: none;
}
.button__new {
  background-color: #f94892;
  left: 2%;
  color: #fff;
}

.card__new {
  position: fixed;
  width: 250px;
  height: 250px;
  left: 3%;
  bottom: 10%;
  z-index: 5;
}
</style>
