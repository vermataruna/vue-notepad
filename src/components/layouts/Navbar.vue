<template>
    <nav class="navbar is-success" role="navigation" aria-label="main navigation">
        <div class="container is-max-desktop px-2">
            <div class="navbar-brand">
                <div class="navbar-item is-size-4 is-family-monospace">
                    VueNotes
                </div>
                <a role="button" 
                    class="navbar-burger"
                    :class="{'is-active' : showMobileNav }" 
                    aria-label="menu" 
                    aria-expanded="false" 
                    data-target="navbarBasicExample"
                    ref="navBarBurgerRef"
                    @click.prevent="showMobileNav = !showMobileNav"
                >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" 
                 class="navbar-menu"
                 :class="{'is-active' : showMobileNav }"
                 ref="navbarMenuRef"
            >
                <div class="navbar-start">
                    <button
                        v-if="storeAuth.user.id"
                        class="button is-small is-info mt-3 ml-3"
                        @click="signOutUser"
                    >
                        Log out {{ storeAuth.user.email }}
                    </button>
                </div>
                <div class="navbar-end">
                    <RouterLink
                        @click="showMobileNav = false"
                        to="/" 
                        class="navbar-item"
                        active-class="is-active">
                        Notes
                    </RouterLink>
                    <RouterLink
                        @click="showMobileNav = false"
                        to="/stats" 
                        class="navbar-item"
                        active-class="is-active">
                        Stats
                    </RouterLink>
                </div>
            </div>
        </div>    
    </nav>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '@/stores/storeAuth'

//mobile navbar
const showMobileNav = ref(false)

//click outside to close
const navbarMenuRef = ref('')
const navBarBurgerRef = ref('')
onClickOutside(navbarMenuRef, () => {
  showMobileNav.value = false
}, {
  ignore: [navBarBurgerRef]
})

const storeAuth = useStoreAuth()

const signOutUser = () => {
    showMobileNav.value = false
    storeAuth.signOutUser()
}
 
</script>

<style>

@media(max-width: 1023px) {
    .navbar-menu {
        position: absolute;
        width: 100%;
        left: 0;
    }
}

</style>
