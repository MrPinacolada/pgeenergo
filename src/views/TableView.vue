<template>
  <DataTable
    :value="notes"
    paginator
    :rows="5"
    :rowsPerPageOptions="[5, 8]"
    showGridlines
    :metaKeySelection="false"
    v-model:selection="selectedNote"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    selectionMode="multiple"
    tableStyle="min-width: 50rem"
    v-model:filters="store.$state.filter"
  >
    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
      <template #body="slotProps" v-if="col.field == 'important'">
        <Tag :value="slotProps.data.important" :severity="getSeverity(slotProps.data.important)" />
      </template>
    </Column>
  </DataTable>
  <checkNote v-if="showConf" @conf="confdata" />
</template>

<script setup lang="ts">
import { Store } from '@/stores/db'
import { onBeforeMount, watchEffect, ref, onMounted } from 'vue'
import { getSeverity } from '@/backfuncs/getSeverity'
import { checkedUnchecked } from '@/backfuncs/checkedNote'
import checkNote from '@/components/checkNote.vue'

const store = Store()
const notes = ref()

let confRes = ref()
let showConf = ref(false)
let selectedNote = ref()
let confdata = (event: any) => {
  confRes.value = event
}
let columns = [
  { field: 'date', header: 'Дата' },
  { field: 'important', header: 'Важность' },
  { field: 'equipment', header: 'Оборудование' },
  { field: 'message', header: 'Сообщение' },
  { field: 'user', header: 'Ответственный' }
]

const onRowSelect = async (event: any) => {
  showConf.value = true
  while (!confRes.value) {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  confRes.value = null
  showConf.value = false

  const selectedRow = event?.data
  if (selectedRow) {
    checkedUnchecked(
      selectedRow.date,
      selectedRow.important,
      selectedRow.equipment,
      selectedRow.message,
      selectedRow.user,
      true
    )
  }
}

const onRowUnselect = (event: any) => {
  const unselectedRow = event?.data

  if (unselectedRow) {
    checkedUnchecked(
      unselectedRow.date,
      unselectedRow.important,
      unselectedRow.equipment,
      unselectedRow.message,
      unselectedRow.user,
      false
    )
  }
}

onBeforeMount(() => {
  store.getNotes()
})
onMounted(async () => {
  await watchEffect(async () => {
    notes.value = await store.$state.firestoreData
    if (notes.value && notes.value.length > 0) {
      selectedNote.value = notes.value.filter((note: any) => note.checked === true)
    }
  })
})
</script>

<style scoped></style>
