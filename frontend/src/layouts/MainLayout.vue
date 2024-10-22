<template>
  <q-layout view="lHh Lpr lFf" class="layout">
    <q-header elevated class="layout__header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="220"
      :breakpoint="400"
    >
      <q-list class="layout__list">
        <div class="layout__logo">
          <router-link to="/">
            <img
              alt="logo"
              src="~assets/logo.svg"
              style="width: 100px; height: 100px"
            >
          </router-link>
        </div>
        <router-link
          v-for="link in linksList"
          :key="link.title"
          :to="link.link"
          class="layout__router-link"
        >
          <q-item clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-drawer>

    <q-page-container class="layout__page-container">
      <router-view />
      <img
        alt="achievement"
        src="~assets/wave.svg"
        width="100%"
        height="auto"
      >
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Página inicial',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Todas as aulas',
    icon: 'school',
    link: '/lessons'
  },
  {
    title: 'Entre em contato',
    icon: 'phone',
    link: '/contact'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss" scoped>
  .layout {
    &__logo {
      display: flex;
      justify-content: center;
    }

    &__list {
      padding-top: 1rem;
      align-items: center;
    }

    &__header {
      background-color: #103778;
    }

    &__router-link {
      text-decoration: none;
      color: #103778;
    }

    img {
      display: block;
      margin: 0;
      padding: 0;
    }
  }
</style>
