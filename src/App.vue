<template>
  <v-app id="app">
    <v-app-bar app>
      <v-toolbar-title>Vue Timer</v-toolbar-title>
    </v-app-bar>

    
      <v-main>
        <v-container>
          <v-row>
            <v-col>
              Timer is {{timer.isRunning?"running":"stopped"}}
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <h1 style="font-size:64px; font-weight: normal;">
                {{timeStr}}
              </h1>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn
                v-bind:color="timer.isRunning?'error':'success'"
                x-large
                v-on:click="onButton"
              >
                {{buttonText}}
              </v-btn>
            </v-col>
          </v-row>

          <v-dialog
            transition="dialog-bottom-transition"
            max-width="300"
            v-model="showResetDialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-row>
                <v-col>
                  <v-btn
                    x-small
                    v-on="on"
                    v-bind="attrs"
                    v-bind:disabled="timer.isRunning"
                  >
                    Reset
                  </v-btn>
                </v-col>
              </v-row>
            </template>

            <v-card>
              <v-card-title>
                Confirm action
              </v-card-title>
              <v-card-text>
                Really reset timer?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  @click="onReset()"
                >
                  Yes
                </v-btn>
                <v-btn
                  @click="showResetDialog = false"
                >
                  No
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-main>
    </v-app>
</template>

<script>
import Timer from './services/timer';
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)
  
export default {
  name: 'App',
  vuetify: new Vuetify(),
  data: function(){
    return{
      timer: undefined,
      timeStr: "00:00:00",
      interval: null,
      showResetDialog: false
    }
  },
  methods: {
    onButton: function(){
      if(this.timer.isRunning){
        this.stopTimer()
      }else{
        this.startTimer()
      }
    },
    updateTime: function(){
      let t = Math.round(this.timer.getTime() / 1000);
      let hours = Math.floor(t/3600)
      let hourStr = `${hours}`.padStart(2, '0')
      let minutes = Math.floor((t-hours*3600)/60)
      let minStr = `${minutes}`.padStart(2, '0')
      let secStr = `${t%60}`.padStart(2, '0')
      this.timeStr = `${hourStr}:${minStr}:${secStr}`
      document.title=this.timeStr
    },
    stopTimer: function(){
      this.timer.stop();
      clearInterval(this.interval)
      this.interval = null
      localStorage.startTime = this.timer.getTime()
    },
    startTimer: function(){
      this.timer.start();
      let self = this;
      this.interval = setInterval(function(){
          self.updateTime()
      }, 1000)
    },
    onReset: function(){
      this.timer.reset()
      this.showResetDialog = false
      localStorage.startTime = 0
      this.updateTime()
    },
    onBeforeUnload: function(){
      this.timer.stop()
    }
  },
  created: function(){
    window.addEventListener('beforeunload', this.onBeforeUnload)
    let startTime = 0
    console.log("on created()")
    if (localStorage.startTime) {
      startTime = parseInt(localStorage.startTime)
      console.log(`localTorage time is ${startTime}`)
    }
    this.timer = new Timer(startTime)
    this.updateTime()
  },
  computed: {
    buttonText: function(){
      return this.timer.isRunning?"Stop timer":"Start timer";
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
