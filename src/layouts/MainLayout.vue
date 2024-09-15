<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
        </q-toolbar-title>

        <q-space />

        <q-btn
          flat
          round
          :icon="isDark ? 'sym_o_dark_mode' : 'light_mode'"
          @click="toggleDarkMode"
        />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="sym_o_home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home Page</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/blog" exact>
          <q-item-section avatar>
            <q-icon name="sym_o_newsmode" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Blog</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/about" exact>
          <q-item-section avatar>
            <q-icon name="sym_o_help" />
          </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)
    const isDark = ref(false)

    const toggleDarkMode = () => {
      isDark.value = !isDark.value
      $q.dark.set(isDark.value)
      localStorage.setItem('darkMode', isDark.value)
    }

    onMounted(() => {
      const storedDarkMode = localStorage.getItem('darkMode')
      if (storedDarkMode === null) {
        // Use browser preference if no stored preference
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      } else {
        isDark.value = storedDarkMode === 'true'
      }
      $q.dark.set(isDark.value)
    })

    watch(isDark, (newValue) => {
      $q.dark.set(newValue)
    })

    return {
      leftDrawerOpen,
      isDark,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleDarkMode,
    }
  },
}
</script>
