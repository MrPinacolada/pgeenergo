import moment from 'moment'
import quickdealFIRESTORE from '@/firebase/config'
import {
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore'

interface EventsSheet {
  date: any
  important: string
  equipment: string
  message: string
  user: string
  userphoto: string
  checked: boolean
}

export const addObjectToFirestoreArray = async (
  imp: string,
  eq: string,
  message: string,
  user: string
) => {
  const note: EventsSheet = {
    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    important: imp,
    equipment: eq,
    message: message,
    user: user,
    userphoto: '',
    checked: false
  }
  try {
    const docRef = doc(quickdealFIRESTORE, '/pgeenergo', 'eventssheet')
    const docSnap = await getDoc(docRef)
    const currentArray = docSnap.data()?.data
    const updatedArray = [...currentArray, note]
    await setDoc(doc(quickdealFIRESTORE, '/pgeenergo', 'eventssheet'), { data: updatedArray })
  } catch (error) {
    console.error(error)
  }
}
