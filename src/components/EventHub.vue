<template>
  <div>
    
  </div>
</template>

<script>
import api from '../api/api'

import { AbilityBuilder, Ability } from '@casl/ability';
import { ABILITY_TOKEN } from '@casl/vue';
export default {
  name: 'EventHub',
  
  inject: {
      $ability: { from: ABILITY_TOKEN }
  },
  
  methods:{
    
    updateAbility(newAbilities) {
      const { can, rules } = new AbilityBuilder(Ability);

      can(newAbilities, 'all');

      console.log(this.$ability)

      this.$ability.update(rules);
    },
    isLoggedIn() {
      return localStorage.getItem("auth");
    }
    
  },
  created () {
    this.eventBus.on('notification', (payload) => {
      this.$notify({
        title: payload.title,
        message: payload.message,
        type: payload.type
      });
    })
  },
  watch: {
    $route: {
      handler() {
        if(this.isLoggedIn()){
          api.get('/abilities').then(response => {
            console.log(response.data)
            this.updateAbility(response.data)
          })
        }
      },
      immediate: true
    }
  }
  
}
</script>