<template>
  <div v-if="$ability.can('comments_access', 'all')">
      Comments
  </div>
</template>

<script>
import { ABILITY_TOKEN } from '@casl/vue';
export default {
  inject: {
      $ability: { from: ABILITY_TOKEN }
  },
  data(){
    return{

    }
  }
}
</script>

<style>

</style>