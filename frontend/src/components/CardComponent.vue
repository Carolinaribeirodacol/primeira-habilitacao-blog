<template>
  <q-card class="card" @click="handleClick" flat>
    <q-img
      class="card__image"
      :src="image"
      alt="card-image"
    />
    <q-card-section class="card__header">
      <span class="card__category">{{ category }}</span>
      <span class="card__title">{{ title }}</span>
    </q-card-section>
    <q-card-section class="card__description">
      {{ description }}
    </q-card-section>
  </q-card>
</template>

<script setup>
defineOptions({
  name: 'CardComponent'
});

const props = defineProps({
  id: Number,
  image: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  onClick: Function
});

const handleClick = () => {
  props.onClick(props.id);
};
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 1rem;
  border: 1px solid #151F30;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4);
  }

  &__image {
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 0 !important;
    height: 110px;
  }

  &__header {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-bottom: 0.25rem;
  }

  &__category {
    font-weight: 800;
    color: #FF7A48;
    margin-bottom: 0.25rem;
  }

  &__title {
    font-weight: bold;
    color: #151F30;
  }

  &__description {
    color: gray;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding: 0;
  }
}
</style>
