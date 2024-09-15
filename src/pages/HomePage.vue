<template>
  <q-page padding>
    <div class="content-container">
      <h1 class="text-h2 q-mb-md text-center">Welcome</h1>
      <p class="q-mb-xl">
        This is an application built with Vue 3 and Quasar Framework. It was
        built with no end in mind, really. Just having some fun configuring the
        framework from scratch and showcasing some neat quasar components 😁
      </p>

      <div class="text-center">
        <q-btn
          color="primary"
          label="Check out the examples"
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
</style>
