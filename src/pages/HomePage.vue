<template>
  <q-page padding>
    <div class="content-container">
      <h1 class="text-h2 q-mb-md text-center">Welcome!</h1>

      <p class="q-my-lg">
        This is an application built with Vue 3 and Quasar Framework. It was
        built with no end in mind, really. Just having some fun configuring the
        framework from scratch and showcasing some neat quasar components 😁
      </p>

      <q-list separator class="custom-list">
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="sym_o_dark_mode" />
          </q-item-section>
          <q-item-section>
            <q-item-label header class="custom-header"
              >Seamless Dark Mode</q-item-label
            >
            <q-item-label caption>
              Auto-detects browser preference and lets you switch themes on the
              fly. Because who doesn't love a good dark mode?
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="sym_o_palette" />
          </q-item-section>
          <q-item-section>
            <q-item-label header class="custom-header"
              >Slick Design System</q-item-label
            >
            <q-item-label caption>
              Built with Quasar's variables.sass for a cohesive look.
              Customization made easy!
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="sym_o_devices" />
          </q-item-section>
          <q-item-section>
            <q-item-label header class="custom-header"
              >Responsive all the way!</q-item-label
            >
            <q-item-label caption>
              Looks great on everything from your phone to your 4K monitor. No
              separate mobile version needed!
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="sym_o_data_object" />
          </q-item-section>
          <q-item-section>
            <q-item-label header class="custom-header"
              >State-of-the-Art State Management</q-item-label
            >
            <q-item-label caption>
              Powered by Pinia for smooth data flow. Because juggling state
              shouldn't be a circus act.
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="text-center q-mt-lg">
        <q-btn
          color="primary"
          label="Dive into the Blog CRUD Example!"
          no-caps
          icon="sym_o_article"
          size="lg"
          to="/blog"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup></script>

<style scoped>
.content-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.text-center {
  text-align: center;
}

.custom-list .q-item__section--avatar {
  min-width: 40px;
}

.custom-list .custom-header {
  font-weight: bold;
  padding-left: 0;
}
</style>
