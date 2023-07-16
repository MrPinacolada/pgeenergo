import { defineStore } from 'pinia'
import { collection, getDocs } from 'firebase/firestore'
import quickdealFIRESTORE from '@/firebase/config'
import { FilterMatchMode } from 'primevue/api'

export const Store = defineStore('db', {
  state: () => ({
    firestoreData: null,
    popUpvisible: false,
    filter: { message: { value: null, matchMode: FilterMatchMode.CONTAINS } }
  }),
  actions: {
    async getNotes() {
      const querySnapshot = await getDocs(collection(quickdealFIRESTORE, 'pgeenergo'))
      querySnapshot.forEach((doc) => {
        this.firestoreData = doc.data().data
      })
    }
  }
})
