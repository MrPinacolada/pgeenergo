<template>
  <header>
    <Button
      @click="store.$state.popUpvisible = !store.$state.popUpvisible"
      label="Добавить запись"
      severity="secondary"
      rounded
    />
    <SelectButton
      v-model="valueSwitch"
      :options="['TableMode', 'BoxMode']"
      :change="setPath()"
      aria-labelledby="basic"
    />
    <div class="flex justify-content-end">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          v-model="store.$state.filter['message'].value"
          placeholder="Поиск по сообщению"
        />
      </span>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
  <addNotePopUp />
  <Toast />
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { Store } from '@/stores/db'
import addNotePopUp from '@/components/addNotePopUp.vue'
import { ref } from 'vue'

const router = useRouter()
const store = Store()
const setPath = () => {
  if (valueSwitch.value == 'TableMode') {
    router.push('/')
  } else {
    router.push('/boxes')
  }
}
let valueSwitch = ref('TableMode')
</script>

<style>
body {
  margin: 0;
  padding: 0;
  border: none;
}
h1,
h2,
h3,
p,
span,
a,
link {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
header {
  height: 60px;
  width: 100%;
  display: flex;
  padding: 10px;
  gap: 30px;
}
main {
  padding: 10px;
}
</style>
