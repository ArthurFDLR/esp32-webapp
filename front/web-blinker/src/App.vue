<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app clipped>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/blinker">
          <v-list-item-action>
            <v-icon>tungsten</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Blinker</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="#005db5" dark fixed app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>ESP32-S3 Web application example</v-app-bar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer class="pa-0" app fixed>
      <v-card
        tile
        flat
        width="100%"
        color="#005db5"
        dark
        height="30px"
        class="d-flex align-center justify-center"
      >
        <a href="https://arthurfindelair.com" style="text-decoration: none; color: white;"> &#169; Arthur Findelair 2022</a>
      </v-card>
      <!-- <span class="white--text"> Arthur Findelair</span> -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: null
    }
  }
}
</script>
