<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      extended
      extension-height="100"
      src="https://www.umbgolfclub.com/wp-content/uploads/2019/11/restaurante_7-1.jpg"
      fade-img-on-scroll
    >
    

    </v-app-bar>

    <v-main>
      <v-row class= "mt-5">
      <v-spacer></v-spacer>
        <router-link :to="{name: 'Home'}" class="mr-5">Comidas</router-link>
        <router-link :to="{name: 'Meseros'}" class="mr-5">Meseros</router-link>
        <router-link :to="{name: 'Ordenes'}" class="mr-5">Ordenes</router-link>
      <v-spacer></v-spacer>
      </v-row>
      <router-view>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
