<template>
    <Line :data="data" :options="options" />
  </template>
  
  <script>
  
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  } from 'chart.js'
  import { Line } from 'vue-chartjs'
  
  // Registrar os componentes necessários para gráficos de linha
  ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)
  
  export default {
    name: 'App',
    components: {
      Line
    },
    data() {
      return {
        data: {
          labels: ['15M', '1H', '1D' , '1W' , '1M'],
          datasets: [
            {
              label: '$ 1.0000.83',
              data: [10, 20, 15,22 ,30],
              borderColor: 'green',
              backgroundColor: 'rgba(255, 0, 0, 1)',
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          plugins:{
            legend:{
                display: true,
                position:'top',
                align:'end',
                labels:{
                    color:'green',
                    font:{
                        size:24,
                        weight: 'bold'
                    },
                    usePointStyle: false, // Remove os ícones coloridos
                    boxWidth: 0,
                    padding:20
                },             
            },
         
          },
          scales:{
                x:{
                    grid:{
                        display:false,
                        drawBorder:true
                    },
                    ticks:{
                        display:true
                    }
                },
                y:{
                    grid: {
                        display:false,
                        drawBorder:true
                    },
                    ticks:{
                        display:true
                    }
                }
            }
        }
      }
    }
  }
  </script>