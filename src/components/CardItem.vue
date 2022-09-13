<template>
  <div class="card" :class="generateNumCard()">
    <div class="card__icon"><slot name="icon"></slot></div>
    <p class="card__exit"><slot name="exit"></slot></p>
    <h2 class="card__title"><slot name="title"></slot></h2>
    <p class="card__apply">
      <a class="card__link card__title--position"><slot name="additional"></slot
      ></a>
    </p>
  </div>
</template>
<script setup lang="ts">
const generateNumCard = (): string => {
  const cardNumber = Math.floor(Math.random() * 5);
  return `card-${cardNumber == 0 ? 1 : cardNumber}`;
};
</script>
<style>
.card__title--position {
  display: flex;
  flex-direction: row-reverse;
}
</style>
