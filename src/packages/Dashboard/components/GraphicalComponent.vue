<template>
  <v-row>
    <v-col cols="9">
    </v-col>
    <v-col cols="3">
      <div ref="pieChart"></div>
    </v-col>
  </v-row>
</template>
  <script setup>

// const pieChart = ref(null);

// INTIALIZE ECHART
// Data for Bar and Line Chart
let option;
option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
};

// option && myBarandLineChart.setOption(option);
</script>