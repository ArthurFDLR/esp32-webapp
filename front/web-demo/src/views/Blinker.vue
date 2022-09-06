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
              <v-icon>mdi-share-variant</v-icon>
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
                    v-if="isPlaying"
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
                    {{ isPlaying ? 'mdi-pause' : 'mdi-play' }}
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-slider
              v-model="bpm"
              color="#005db5"
              track-color="grey"
              always-dirty
              min="30"
              max="300"
            >
              <template v-slot:prepend>
                <v-icon
                  color="#005db5"
                  @click="decrement"
                >
                  mdi-minus
                </v-icon>
              </template>

              <template v-slot:append>
                <v-icon
                  color="#005db5"
                  @click="increment"
                >
                  mdi-plus
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
  export default {
    data: () => ({
      bpm: 120,
      interval: null,
      isPlaying: false,
    }),

    computed: {
      animationDuration () {
        return `${60 / this.bpm}s`
      },
    },

    methods: {
      decrement () {
        this.bpm--
      },
      increment () {
        this.bpm++
      },
      toggle () {
        this.isPlaying = !this.isPlaying;
        this.$ajax
          .post("/api/v1/light/duration", {
            duration_ms: 60 / this.bpm,
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
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