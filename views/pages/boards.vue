<template>
  <div class="board">
    <div class="row">
      <div class="col-md">
        <task-lane id="todo" title="To-Do" :items="todoItems"></task-lane>
      </div>
    </div>
    <div class="col-md">
      <task-lane id="inProgress" title="In progress" :items="inProgressItems"></task-lane>
    </div>
    <div class="col-md">
      <task-lane id="done" title="Done" :items="doneItems"></task-lane>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import taskLane from '../components/taskLane';
  
  export default {
    name: 'board',
    components: {
      'task-lane': taskLane,
    },
    computed: mapState({
      todoItems: s => s.items.todo,
      inProgressItems: s => s.items.inProgress,
      doneItems: s => s.items.done,
    }),
  };
</script>

<style>
  
</style>