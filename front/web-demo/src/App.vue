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
        <!-- <v-list-item to="/light">
          <v-list-item-action>
            <v-icon>mdi-led-on</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Light</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item to="/blinker">
          <v-list-item-action>
            <v-icon>{{ mdiLedOnPath }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Blinker</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="#005db5" dark fixed app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>ESP32-S3 Darlington Array Web application</v-app-bar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer class="pa-0" color="#005db5" app fixed>
      <span class="white--text">Original application from &copy; ESPRESSIF SYSTEMS (SHANGHAI) CO., LTD. All rights reserved. &mdash; Modified by Arthur Findelair.</span>
    </v-footer>
  </v-app>
</template>

<style>
  .v-app-bar-title__content{
    width: 1000px !important;
  }
</style>

<script>
  import { mdiLedOn  } from '@mdi/js'

  export default {
    name: "App",
    data() {
      return {
        drawer: null,
        mdiLedOnPath: mdiLedOn
      };
    }
  };
</script>
