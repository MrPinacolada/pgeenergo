<template>
  <ConfirmDialog
    acceptButton="Нажмите пробел для подверждения."
    :rejectButton="false"
  ></ConfirmDialog>
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { onMounted } from 'vue'

const toast = useToast()
const confirm = useConfirm()
const emit = defineEmits(['conf'])

const confirm1 = () => {
  confirm.require({
    message: 'Нажмите пробел для подтверждения.',
    header: 'Отметить прочитанным',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      toast.add({
        severity: 'info',
        summary: 'Прочитано!',
        detail: `Сообщение помечено как прочитанное!`,
        life: 1500
      })
      emit('conf', true)
    },
    reject: () => {
      emit('conf', false)
    }
  })
}
onMounted(() => {
  confirm1()
})
</script>

<style scoped></style>
