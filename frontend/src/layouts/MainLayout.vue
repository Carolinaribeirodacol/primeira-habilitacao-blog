<template>
  <q-layout view="lHh Lpr lFf" class="layout-main">
    <q-header elevated class="layout-main__header bg-indigo-10">
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
      <q-list class="layout-main__list q-mt-md align-center">
        <div class="layout-main__logo flex justify-center">
          <router-link to="/">
            <img
              alt="logo"
              src="~assets/logo.svg"
              style="width: 100px; height: 100px"
              class="layout-main__logo m-0 p-0 block"
            >
          </router-link>
        </div>

        <router-link
          v-for="link in linkList"
          :key="link.title"
          :to="link.link"
          class="layout-main__router-link text-indigo-10"
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

    <q-page-container>
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

defineOptions({ name: 'MainLayout' })

const linkList = [
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

<style lang="scss">
.layout-main {
  &__router-link {
    text-decoration: none;
  }
}
</style>
