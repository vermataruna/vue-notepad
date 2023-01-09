import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

//adding plugin to use vue router in pinia store
//reference link: https://pinia.vuejs.org/core-concepts/plugins.html#adding-new-external-properties:~:text=secret%27%0A%7D)-,Adding%20new%20external%20properties,-%C2%B6

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router) //markRaw will make router non-reactive
  })

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
