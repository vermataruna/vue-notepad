import { createRouter, createWebHashHistory } from 'vue-router'
import ViewNotes from '@/views/ViewNotes.vue'
import EditNote from '@/views/EditNote.vue'
import ViewStats from '@/views/ViewStats.vue'
import AuthView from '@/views/AuthView.vue'
import { useStoreAuth } from '@/stores/storeAuth'

const routes = [
    {
        path: '/',
        name: 'notes',
        component: ViewNotes
    },
    {
        path: '/editNote/:id',
        name: 'edit-note',
        component: EditNote
    },
    {
        path: '/stats',
        name: 'stats',
        component: ViewStats
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//navigation guards
router.beforeEach(async (to, from) => {
    const storeAuth = useStoreAuth()
    if(!storeAuth.user.id && to.name !== 'auth'){
        return { name: 'auth' }
    }
    if(storeAuth.user.id && to.name === 'auth'){
        return false
    }    
})

export default router