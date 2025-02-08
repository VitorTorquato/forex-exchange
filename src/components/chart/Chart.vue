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
          labels: ['12','11','10','20','8','5','7','5','4'],
          datasets: [
            {
              label: '$ 1.0000.83',
              data: [20, 15,22 ,30,56,53,21,12,10],
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
            },
            legend: {
            display: false,  // Remover a legenda do gráfico
          }
          },
          scales:{
                x:{
                    grid:{
                        display:false,
                        drawBorder:true
                    },
                    ticks:{
                        display:false
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