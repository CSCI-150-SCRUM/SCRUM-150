<!-- src/components/TaskLaneItem.vue -->
<template>
  <div class="card tasklane-item">
    <div class="card-block">
      <h5 class="card-title">
        <span class="text-muted">#{{item.id}}</span> {{item.text}}
      </h5>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TaskLaneItem',
    props: ['item'],
  };
</script>

<style>
  .card.tasklane-item {
    background: #627180;
  }
</style>