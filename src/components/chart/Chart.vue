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
import { ref, onMounted , watch} from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  props:{
    currency1:String,
    currency2:String
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chartInstance = null;
    const selectedLabel = ref("5Days");
    const chartData = ref([]);
    const labelsData = ref([]);

    const labels = ref([
      { label: "5 Days", value: "5Days", interval: "daily", period: 5 },
      { label: "2 Weeks", value: "2Weeks", interval: "daily", period: 14 },
      { label: "1 Month", value: "1Month", interval: "daily", period: 30 },
      { label: "6 Months", value: "6Months", interval: "daily", period: 182 },
      { label: "1 Year", value: "1Year", interval: "daily", period: 365 },
    
    ]);

    const fetchData = async () => {
      if (!props.currency1 || !props.currency2) {
      console.error("Currency not defined");
      return;
    }

  const labelObj = labels.value.find(label => label.value === selectedLabel.value);
  const interval = labelObj.interval;
  const period = labelObj.period;

  // Getting date e removin 1 minuto to not stay in the future"
  const endDate = new Date();
  endDate.setMinutes(endDate.getMinutes() - 1);

  let startDate = new Date(endDate);

  // Ajuste do `startDate
  if (interval === "daily") {
    startDate.setDate(endDate.getDate() - period); 
  }

  // Função para formatar data e hora no padrão UTC (YYYY-MM-DD-HH:MM)
  const formatDateTimeUTC = (date) => {
    return date.toISOString().slice(0, 16).replace("T", "-"); // Formato correto `YYYY-MM-DD-HH:MM`
  };

  const formattedStartDate = formatDateTimeUTC(startDate);
  const formattedEndDate = formatDateTimeUTC(endDate);

  let currencyPair = `${props.currency1}${props.currency2}`;
  
  // Construção da URL com parâmetros corretos
  let url = `https://marketdata.tradermade.com/api/v1/timeseries?currency=${currencyPair}&api_key=vlxciMCTw1zbfqP0ADqk&start_date=${formattedStartDate}&end_date=${formattedEndDate}&format=records`;

  if (interval !== "daily") {
    url += `&interval=${interval}&period=${period}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    //console.log("Data received:", data);

    if (data.quotes) {
      labelsData.value = data.quotes.map(quote => quote.date);
      chartData.value = data.quotes.map(quote => quote.close);
      createChart();
    } else {
      console.error("Erro na resposta da API:", data);
    }
  } catch (error) {
    throw new Error('Errod to get data' , error);
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
              borderWidth: 1,
              fill: false,
              pointRadius: 0, // Esconde os pontos padrão
              pointHoverRadius: 5
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          interaction: {
        mode: "index", // Garante que todos os pontos na mesma posição X fiquem visíveis
        intersect: false,
      },
          scales: {
            x: { display: false },
            y: { 
          position: "right", // Move os valores do eixo Y para a direita
        }
          }
        }
      });
    };

    const handleLabelClick = (value) => {
      selectedLabel.value = value;
      fetchData();
    };

    watch(() => [props.currency1, props.currency2], ([newCurrency1, newCurrency2], [oldCurrency1, oldCurrency2]) => {
    if (newCurrency1 !== oldCurrency1 || newCurrency2 !== oldCurrency2) {
      fetchData();
    }
  });

    onMounted(() => {
      createChart()
      fetchData();
    });

    return {
      labels,
      selectedLabel,
      handleLabelClick,
      chartCanvas
    }
    
    
  },
 
};
</script>



<style lang="scss" scoped>
.labels-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin:2.4rem 0 3.6rem 0;
  
  .label-button {
    padding: 10px;
    border: none;
    background-color: #ccc;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1.4rem;
    transition: 0.3s;
  }

  .label-button.active {
    background-color:transparent;
    color: #121212;
    border: 1px solid #121212;
  }
}



.chart-container {
  width: 100%;
}

/*responsive layout*/
@media(max-width:425px){
    .labels-container{
      gap: .5rem;
      justify-content: flex-start;

      .label-button{
        font-size: 1rem;
      }

    }
}
</style>
