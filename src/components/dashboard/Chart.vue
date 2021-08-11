<template>
<div>
  <Chart :data="data" :margin="margin" :direction="direction">
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Bar :dataKeys="['name', 'pl']" :barStyle="{ fill: '#ED1C24' }" />
      <Bar :dataKeys="['name', 'avg']" :barStyle="{ fill: '#004379' }" />
      <Line :dataKeys="['name', 'avg']" type="step" />
    </template>
  </Chart>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { Chart, Grid, Bar, Line } from 'vue3-charts'

export default defineComponent({
  name: 'Main',
  components: { Chart, Grid, Bar, Line },
  setup() {
    const data = [
  { name: 'Jan', pl: 1000, avg: 500, inc: 300 },
  { name: 'Feb', pl: 2000, avg: 900, inc: 400 },
  { name: 'Apr', pl: 400, avg: 400, inc: 500 },
  { name: 'Mar', pl: 3100, avg: 1300, inc: 700 },
  { name: 'May', pl: 200, avg: 100, inc: 200 },
  { name: 'Jun', pl: 600, avg: 400, inc: 300 },
  { name: 'Jul', pl: 500, avg: 90, inc: 100 }
]
    return {data}
  }
})
</script>