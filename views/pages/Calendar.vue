<template>
  <v-responsive>
    <v-container fluid id="box">
      <full-calendar class="primary" :events="events"></full-calendar>
    </v-container>
  </v-responsive>
</template>

<script>
import "fullcalendar/dist/fullcalendar.css";

export default {
  //Variables
  data() {
    return {
      events: [
        {
          title: "event1",
          start: "2010-01-01"
        },
        {
          title: "event2",
          start: "2010-01-05",
          end: "2010-01-07"
        },
        {
          title: "event3",
          start: "2010-01-09T12:30:00",
          allDay: false
        }
      ]
    };
  },

  //Components this page will need
  components: {},

  //The methods we will need
  methods: {}
};
</script>

<style scoped>
.v-container {
  text-align: center;
  display: block;
}

#box {
  position: relative;
  overflow: hidden;
}

.full-calendar{
  background-color: #3A1C71;
}

</style>