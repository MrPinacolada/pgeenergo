import quickdealFIRESTORE from '@/firebase/config'
import { doc, setDoc, getDoc } from 'firebase/firestore'

import { Store } from '@/stores/db'

export const checkedUnchecked = async (
  date: string,
  imp: string,
  eq: string,
  message: string,
  user: string,
  checked: boolean
) => {
  const note = {
    date: date,
    important: imp,
    equipment: eq,
    message: message,
    user: user,
    userphoto: '',
    checked: checked
  }

  try {
    const docRef = doc(quickdealFIRESTORE, '/pgeenergo', 'eventssheet')
    const docSnap = await getDoc(docRef)
    const currentArray = docSnap.data()?.data

    const updatedArray = currentArray.map((item: any) => {
      if (item.date === note.date) {
        return note
      }
      return item
    })
    Store().$state.firestoreData = updatedArray
   
    await setDoc(doc(quickdealFIRESTORE, '/pgeenergo', 'eventssheet'), { data: updatedArray })
  } catch (error) {
    console.error(error)
  }
}
