<template>
  <div>
    <!-- Botões para selecionar o período de tempo -->
    <div class="labels-container">
      <button
        v-for="(label, index) in labels"
        :key="index"
        class="label-button"
        :class="{ active: selectedLabel === label.value }"
        @click="handleLabelClick(label.value)"
      >
        {{ label.label }}
      </button>
    </div>

   
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";

// Registrar os componentes necessários do Chart.js
Chart.register(...registerables);

export default {
  setup() {
    const chartCanvas = ref(null);
    let chartInstance = null;

    // Opções para os botões
    const labels = ref([
      { label: "15 Minutes", value: "15min" },
      { label: "1 Hour", value: "1h" },
      { label: "1 Week", value: "1week" },
      { label: "1 Month", value: "1month" },
      { label: "1 Year", value: "1year" }
    ]);

    const selectedLabel = ref("15min");

    // Dados do gráfico para cada período
    const chartDataSets = {
      "15min": [10, 12, 14, 19, 12, 11],
      "1h": [10, 7, 20, 17, 15, 10],
      "1week": [15, 25, 19, 12, 16, 11],
      "1month": [20, 30, 25, 26.8, 30, 31],
      "1year": [30, 36, 42, 50,55,49.1]
    };

    const createChart = () => {
      if (chartInstance) {
        chartInstance.destroy(); // Remove o gráfico antigo antes de criar um novo
      }

      chartInstance = new Chart(chartCanvas.value, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: `Data for ${selectedLabel.value}`,
              data: chartDataSets[selectedLabel.value],
              borderColor: "black",
              backgroundColor: 'rgba(144, 238, 144, 1)',
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          plugins:{
            legend:{display: false}
          },
          scales:{
            x:{display:false}
          }
          
        }

      });
    };

    const handleLabelClick = (value) => {
      selectedLabel.value = value;
      createChart(); // Atualiza o gráfico ao clicar
    };

    onMounted(() => {
      createChart(); // Cria o gráfico ao iniciar
    });

    return {
      labels,
      selectedLabel,
      handleLabelClick,
      chartCanvas
    };
  }
};
</script>

<style scoped>
.labels-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin:2.4rem 0 3.6rem 0;
}

.label-button {
  padding: 10px 15px;
  border: none;
  background-color: #ccc;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: 0.3s;
}

.label-button.active {
  background-color:transparent;
  color: #121212;
  border: 1px solid #121212;
}

.chart-container {
  width: 100%;
  max-width: 600px;
  height: 400px;
}
</style>
