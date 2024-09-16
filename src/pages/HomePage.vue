<template>
  <q-page padding>
    <div class="content-container">
      <h1 class="text-h2 q-mb-md text-center">Welcome</h1>
      <p class="q-my-lg">
        This is an application built with Vue 3 and Quasar Framework. It was
        built with no end in mind, really. Just having some fun configuring the
        framework from scratch and showcasing some neat quasar components 😁
      </p>

      <p class="q-my-lg">
        This app features a seamless dark mode integration, it initially sets
        itself to the browser preference on the first acces but also allowing
        users to switch between light and dark themes effortlessly.
      </p>

      <p class="q-my-lg">
        Additionally, I've implemented a consistent design system using Quasar's
        variables.sass file, ensuring a cohesive look and feel across the entire
        application. This approach allows for easy customization of colors,
        typography, and other design elements while maintaining a unified
        aesthetic.
      </p>

      <p class="q-my-lg">
        Furthermore, this application is seamlessly responsive, adapting fluidly
        to various screen sizes and devices. Leveraging Quasar's built-in
        responsive design system, the layout, components, and content
        automatically adjust to provide an optimal user experience whether on
        desktop, tablet, or mobile. This responsiveness ensures that the
        application remains functional and visually appealing across all
        platforms, without the need for separate mobile-specific versions.
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
