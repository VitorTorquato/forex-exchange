<template>
  <div>
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

Chart.register(...registerables);

export default {
  setup() {
    const chartCanvas = ref(null);
    let chartInstance = null;
    const selectedLabel = ref("15min");
    const chartData = ref([]);
    const labelsData = ref([]);

    const labels = ref([
      { label: "24 Hours", value: "24Hours", interval: "hourly", period: 1 },
      { label: "1 Week", value: "1Week", interval: "daily", period: 7 },
      { label: "1 Month", value: "1Month", interval: "daily", period: 30 },
      { label: "1 Year", value: "1Year", interval: "daily", period: 365 },
    
    ]);

    const fetchData = async () => {
  const labelObj = labels.value.find(label => label.value === selectedLabel.value);
  const interval = labelObj.interval;
  const period = labelObj.period;

  // Getting date e removin 1 minuto to not stay in the future"
  const endDate = new Date();
  endDate.setMinutes(endDate.getMinutes() - 1);

  let startDate = new Date(endDate);

  // Ajuste do `startDate
  if (interval === "hourly") {
    startDate.setDate(endDate.getDate() - period);
  } else if (interval === "daily") {
    startDate.setDate(endDate.getDate() - period); 
  }

  // Função para formatar data e hora no padrão UTC (YYYY-MM-DD-HH:MM)
  const formatDateTimeUTC = (date) => {
    return date.toISOString().slice(0, 16).replace("T", "-"); // Formato correto `YYYY-MM-DD-HH:MM`
  };

  const formattedStartDate = formatDateTimeUTC(startDate);
  const formattedEndDate = formatDateTimeUTC(endDate);

  // Construção da URL com parâmetros corretos
  let url = `https://marketdata.tradermade.com/api/v1/timeseries?currency=EURUSD&api_key=vlxciMCTw1zbfqP0ADqk&start_date=${formattedStartDate}&end_date=${formattedEndDate}&format=records`;

  if (interval !== "daily") {
    url += `&interval=${interval}&period=${period}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Dados recebidos:", data);

    if (data.quotes) {
      labelsData.value = data.quotes.map(quote => quote.date);
      chartData.value = data.quotes.map(quote => quote.close);
      createChart();
    } else {
      console.error("Erro na resposta da API:", data);
    }
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
};







    const createChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
      
      chartInstance = new Chart(chartCanvas.value, {
        type: "line",
        data: {
          labels: labelsData.value,
          datasets: [
            {
              label: `Data for ${selectedLabel.value}`,
              data: chartData.value,
              borderColor: "black",
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: { display: false }
          }
        }
      });
    };

    const handleLabelClick = (value) => {
      selectedLabel.value = value;
      fetchData();
    };

    onMounted(() => {
      createChart()
      fetchData();
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
