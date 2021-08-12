<template>
<div>
  <Chart :data="data">
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Bar :dataKeys="['month', 'num']" :barStyle="{ fill: '#004379' }" />
    </template>
  </Chart>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { Chart, Grid, Bar } from 'vue3-charts'

export default defineComponent({
  name: 'Main',
  components: { Chart, Grid, Bar },
  props:[
    'data'
  ],
  setup() {
    return {

    }
  }
})
</script>