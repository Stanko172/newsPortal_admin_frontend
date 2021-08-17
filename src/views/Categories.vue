<template>
  <div v-if="$ability.can('categories_access', 'all')">
      Categories
  </div>
</template>

<script>
import{ ABILITY_TOKEN } from '@casl/vue';
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