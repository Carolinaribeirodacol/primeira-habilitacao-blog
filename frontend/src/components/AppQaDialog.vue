<template>
  <q-dialog v-model="dialogStore.handleOpenDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-icon name="warning" color="warning" size="4rem" />
        <span class="q-ml-sm">Você realmente deseja deletar esta lição?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="dialogStore.cancelAction" />
        <q-btn flat label="Confirmar" color="negative" @click="dialogStore.confirmAction" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogStore } from 'src/stores/dialogStore'

defineOptions({
  name: 'AppQaDialog'
})

const dialogStore = useDialogStore()
</script>
