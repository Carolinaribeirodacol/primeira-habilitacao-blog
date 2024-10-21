import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDialogStore = defineStore('dialogStore', () => {
  const handleOpenDialog = ref(false);
  const confirmed = ref(false);

  const openDialog = () => {
    handleOpenDialog.value = true;
    confirmed.value = false;
  };

  const confirmAction = () => {
    confirmed.value = true;
    handleOpenDialog.value = false;
  };

  const cancelAction = () => {
    confirmed.value = false;
    handleOpenDialog.value = false;
  };

  return {
    handleOpenDialog,
    confirmed,
    openDialog,
    confirmAction,
    cancelAction
  };
});
