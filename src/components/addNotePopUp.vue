<template>
  <Dialog
    v-model:visible="store.$state.popUpvisible"
    modal
    header="Добавить запись"
    :style="{ width: '50vw' }"
  >
    <form prevent.default="">
      <Dropdown
        v-model="selectedimp"
        :options="imps"
        optionLabel="name"
        placeholder="Выберете степень важности:"
      />
      <label>Укажите оборудования для работы: </label>
      <Textarea v-model="valueEQ" autoResize rows="3" cols="30" />
      <label>Введите ваше сообщение: </label>
      <Textarea v-model="valueMessage" autoResize rows="5" cols="30" />
      <label>Укажите ответственного: </label>
      <InputText type="text" v-model="valueUser" />
      <Button label="Добавить" @click="addNote()" />
    </form>
  </Dialog>
  <Toast />
</template>

<script setup lang="ts">
import { Store } from '@/stores/db'
import { ref } from 'vue'
import { addObjectToFirestoreArray } from '@/backfuncs/addNoteFirebase'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const store = Store()

let selectedimp = ref()
let valueEQ = ref('')
let valueMessage = ref('')
let valueUser = ref('')
const imps = ref([
  { name: 'Низкая', code: 'Низкая' },
  { name: 'Высокая', code: 'Высокая' },
  { name: 'Критическая', code: 'Критическая' }
])

const addNote = () => {
  if (
    selectedimp.value &&
    valueEQ.value.trim() != '' &&
    valueMessage.value.trim() != '' &&
    valueUser.value.trim() != ''
  ) {
    addObjectToFirestoreArray(
      selectedimp.value.name,
      valueEQ.value,
      valueMessage.value,
      valueUser.value
    )
    toast.add({ severity: 'success', summary: 'Success!', detail: 'Запись добавлена!', life: 3000 })
    setTimeout(() => {
      store.getNotes()
    }, 500)
    store.$state.popUpvisible = false
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error!',
      detail: 'Все поля должны быть заполненны!',
      life: 3000
    })
  }
}
</script>

<style scoped>
form {
  display: grid;
  gap: 10px;
}
</style>
