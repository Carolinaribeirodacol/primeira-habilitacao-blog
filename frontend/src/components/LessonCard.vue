<template>
  <div class="card" flat>
    <div @click="handleClick" class="card__content">
      <div class="card__actions">
        <q-btn @click="handleDeleteClick" flat color="negative" icon="delete" padding="xs" size="sm" />
        <q-btn @click="handleEditClick" flat color="primary" icon="edit" padding="xs" size="sm" />
      </div>

      <q-img class="card__image" :src="image" alt="card-image" />

      <div class="card__title">{{ title }}</div>
      <p class="card__description">
        {{ description }}
      </p>

      <div>
        <q-badge outline class="card__badge" color="blue">
          {{ category }}
        </q-badge>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'LessonCard'
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
  onEdit: Function,
  onDelete: Function,
  onClick: Function
});

const handleEditClick = (event) => {
  event.stopPropagation();
  props.onEdit(props.id);
};

const handleDeleteClick = (event) => {
  event.stopPropagation();
  props.onDelete(props.id);
};

const handleClick = () => {
  props.onClick(props.id);
};
</script>

<style lang="scss" scoped>
.card {
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 1rem;
  border: 1px solid #151F30;
  cursor: pointer;
  padding: 0.8rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }

  &__image {
    width: 100%;
    border-radius: 0.5rem;
    height: 120px;
  }

  &__title {
    font-weight: bold;
    color: #151F30;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__description {
    font-size: 0.6rem;
    height: 40px;
    color: gray;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
