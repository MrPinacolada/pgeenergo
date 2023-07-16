/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import DataView from 'primevue/dataview'
import Divider from 'primevue/divider'
import ToggleButton from 'primevue/ToggleButton'
import Avatar from 'primevue/avatar'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
// import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primeflex/primeflex.css'
const app = createApp(App)
app.use(PrimeVue, {
  ripple: true,
  inputStyle: 'filled',
  zIndex: {
    modal: 1100,
    overlay: 1000,
    menu: 1000,
    tooltip: 1100
  }
})
app.use(createPinia())
app.use(router)
app.use( ConfirmationService)
app.use(ToastService)

app.component('Toast', Toast)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Button', Button)
app.component('Tag', Tag)
app.component('Dialog', Dialog)
app.component('Dropdown', Dropdown)
app.component('Textarea', Textarea)
app.component('InputText', InputText)
app.component('SelectButton', SelectButton)
app.component('DataView', DataView)
app.component('Divider', Divider)
app.component('ToggleButton', ToggleButton)
app.component('Avatar', Avatar)
app.component('ConfirmDialog', ConfirmDialog)

app.mount('#app')
