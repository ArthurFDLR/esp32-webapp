<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar
            flat
            dense
          >
            <v-toolbar-title>
              <span class="subheading">Blinker speed</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon> {{mdiShareVariantPath}} </v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-row
              class="mb-4"
              justify="space-between"
            >
              <v-col class="text-left">
                <span
                  class="text-h2 font-weight-light"
                  v-text="bpm"
                ></span>
                <span class="subheading font-weight-light mr-1">BPM</span>
                <v-fade-transition>
                  <v-avatar
                    v-if="isOn"
                    color="red"
                    :style="{
                      animationDuration: animationDuration
                    }"
                    class="mb-1 v-avatar--metronome"
                    size="12"
                  ></v-avatar>
                </v-fade-transition>
              </v-col>
              <v-col class="text-right">
                <v-btn
                  color="#005db5"
                  dark
                  depressed
                  fab
                  @click="toggle"
                >
                  <v-icon large>
                    {{ isOn ? mdiPausePath : mdiPlayPath }}
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-slider
              v-model="bpm"
              color="#005db5"
              track-color="grey"
              always-dirty
              min="10"
              max="600"
              v-on:mouseup="post_bpm"
            >
              <template v-slot:prepend>
                <v-icon
                  color="#005db5"
                  @click="decrement"
                >
                {{mdiMinusPath}}
                </v-icon>
              </template>

              <template v-slot:append>
                <v-icon
                  color="#005db5"
                  @click="increment"
                >
                  {{mdiPlusPath}}
                </v-icon>
              </template>
            </v-slider>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mdiPlus, mdiMinus, mdiShareVariant, mdiPause, mdiPlay } from '@mdi/js'

  export default {
    data: () => ({
      bpm: 120,
      interval: null,
      isOn: false,
      mdiPlusPath: mdiPlus,
      mdiMinusPath: mdiMinus,
      mdiShareVariantPath: mdiShareVariant,
      mdiPausePath: mdiPause,
      mdiPlayPath: mdiPlay,
    }),

    computed: {
      animationDuration () {
        return `${30 / this.bpm}s`
      },
    },

    mounted:function(){
        this.post_bpm()
        this.post_toggle()
    },

    methods: {
      post_bpm () {
        this.$ajax
          .post("/api/v1/light/duration", {
            duration_ms: Math.round(60000 / this.bpm),
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      post_toggle () {
        this.$ajax
          .post("/api/v1/light/state", {
            state: this.isOn,
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      decrement () {
        this.bpm--
        this.post_bpm()
      },
      increment () {
        this.bpm++
        this.post_bpm()
      },
      toggle () {
        this.isOn = !this.isOn;
        this.post_toggle()
      },
    },
  }
</script>

<style>
  @keyframes metronome-example {
    from {
      transform: scale(.2);
    }
    to {
      transform: scale(1);
    }
  }

  .v-avatar--metronome {
    animation-name: metronome-example;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
</style>