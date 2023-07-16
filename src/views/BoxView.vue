<template>
  <DataView :value="filteredNotes" layout="grid" dataKey="id" :rows="6" paginator>
    <template #grid="slotProps">
      <div class="col-12 sm:col-6 lg:col-7 xl:col-4 p-1">
        <div class="p-0 border-2 surface-border surface-card border-round">
          <div class="card">
            <section class="arts">
              <span><strong>Дата:</strong> {{ slotProps.data.date }}</span>
              <span
                ><strong>Важность: </strong>
                <Tag
                  :value="slotProps.data.important"
                  :severity="getSeverity(slotProps.data.important)"
                />
              </span>
              <span><strong>Оборудование:</strong> {{ slotProps.data.equipment }}</span>
              <span><strong>Сообщение:</strong> </span>
              <Textarea v-model="slotProps.data.message" disabled autoResize />
              <ToggleButton
                onLabel="Прочитано"
                offLabel="Не прочитано"
                v-model="slotProps.data.checked"
                class="border-white"
                @click="
                  checkNotes(
                    slotProps.data.date,
                    slotProps.data.important,
                    slotProps.data.equipment,
                    slotProps.data.message,
                    slotProps.data.user,
                    slotProps.data.checked
                  )
                "
              />
            </section>
            <Divider layout="vertical" />
            <section class="userdata">
              <Avatar image="/icons8-user.svg" class="mr-2" size="xlarge" shape="circle" />
              <span>{{ slotProps.data.user }}</span>
            </section>
          </div>
        </div>
      </div>
    </template>
  </DataView>
  <checkNote v-if="showConf" @conf="confdata" />
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, computed } from 'vue'
import { Store } from '@/stores/db'
import { getSeverity } from '@/backfuncs/getSeverity'
import { checkedUnchecked } from '@/backfuncs/checkedNote'
import checkNote from '@/components/checkNote.vue'

const store = Store()

let notes = ref()
let confRes = ref()
let showConf = ref(false)
const confdata = (event: any) => {
  confRes.value = event
}
const filteredNotes = computed(() => {
  if (!store.$state.filter.message.value) {
    return notes.value
  } else {
    return notes.value.filter((note: any) =>
      note.message.includes(store.$state.filter.message.value)
    )
  }
})

const checkNotes = async (
  date: string,
  imp: string,
  eq: string,
  message: string,
  user: string,
  checked: boolean
) => {
  showConf.value = true
  while (!confRes.value) {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  showConf.value = false
  checkedUnchecked(date, imp, eq, message, user, checked)
}

onMounted(async () => {
  await watchEffect(async () => {
    notes.value = await store.$state.firestoreData
  })
})
</script>
<style scoped>

.card {
  display: grid;
  grid-template-columns: 1.5fr 0.1fr 1fr;
  padding: 10px;
  width: fit-content;
  gap: 10px;
}
.arts {
  display: grid;
  gap: 10px;
}
.userdata {
  display: grid;
  gap: 10px;
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-items: center;
}
</style>
