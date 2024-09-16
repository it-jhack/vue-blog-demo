<template>
  <q-layout
    view="lHh lpR fFf"
    :class="{ 'gradient-bg': true, 'gradient-bg-dark': isDark }"
  >
    <q-header :class="{ transparent: true, 'q-py-sm': true }">
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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      bordered
      :class="{ 'flat-drawer': true, 'flat-drawer-dark': isDark }"
    >
      <q-list class="q-mt-lg">
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
            <q-item-label>Blog (CRUD Example)</q-item-label>
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

<style lang="scss">
.gradient-bg {
  background: linear-gradient(135deg, #6dd5ed, #2193b0);
}

.gradient-bg-dark {
  background: linear-gradient(135deg, #141e30, #243b55);
}

.q-header.transparent {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.flat-drawer {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.flat-drawer-dark {
  background: rgba(0, 0, 0, 0.8);
}

// Add more custom styles here
</style>
