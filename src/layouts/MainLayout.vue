<template>
  <q-layout
    view="lHh Lpr Fff"
    :class="{
      'gradient-bg': true,
      'gradient-bg-dark': isDark,
      'light-mode-text': !isDark,
    }"
  >
    <q-header :class="{ transparent: true, 'q-py-sm': true }">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
          :class="{ 'text-white': isDark }"
        />

        <q-space />

        <q-btn
          flat
          round
          :icon="isDark ? 'sym_o_dark_mode' : 'sym_o_light_mode'"
          @click="toggleDarkMode"
          :class="{ 'text-white': isDark }"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      bordered
      fixed
      :class="{ 'flat-drawer': true, 'flat-drawer-dark': isDark }"
    >
      <q-list class="q-mt-lg q-gutter-y-sm">
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="sym_o_home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home Page</q-item-label>
            <q-item-label caption>About project tech stack</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/blog-mock" exact>
          <q-item-section avatar>
            <q-icon name="sym_o_web_asset" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Blog Mock</q-item-label>
            <q-item-label caption>Frontend only</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/blog" exact>
          <q-item-section avatar>
            <q-icon name="sym_o_newsmode" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Blog</q-item-label>
            <q-item-label caption>Full Stack Integration</q-item-label>
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
import { ref, onMounted, watch, computed } from 'vue'
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

    const logoSrc = computed(() =>
      isDark.value
        ? 'https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg'
        : 'https://cdn.quasar.dev/logo-v2/svg/logo-mono-black.svg'
    )

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
      logoSrc,
    }
  },
}
</script>

<style lang="scss" scoped>
.gradient-bg {
  background: linear-gradient(135deg, #e0f7fa, #80deea, #4dd0e1);
  color: #0a192fce;
}

.gradient-bg-dark {
  background: linear-gradient(135deg, #141e30, #243b55);
  color: #ffffff;
}

.q-header.transparent {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: #0a192fce;

  .q-btn {
    color: inherit;
  }
}

body.body--light {
  .q-header,
  .q-drawer,
  .q-footer {
    color: #0a192fce;
  }
}

.q-item {
  .q-item__label {
    font-size: 1.1rem;
  }

  .q-item__label--caption {
    font-size: 0.85rem;
  }
}
</style>
