<script>
  import "/node_modules/currency-flags/dist/currency-flags.min.css";
  import Chart from "./components/chart/Chart.vue";

  export default {
    name: 'App',
    components: {
      Chart
    },
    data() {
      return {
        flagOne: 'USD',
        flagTwo: 'EUR',
        currenciesName: null,
        isDropdownOpenOne: false,
        isDropdownOpenTwo: false
      };
    },
    methods: {
      toggleDropdown(flagType) {
        if (flagType === 'one') {
          this.isDropdownOpenOne = !this.isDropdownOpenOne;
          this.isDropdownOpenTwo = false; 
        } else if (flagType === 'two') {
          this.isDropdownOpenTwo = !this.isDropdownOpenTwo;
          this.isDropdownOpenOne = false; 
        }
      },

      selectCurrency(currency, flagType) {
        if (flagType === 'one') {
          this.flagOne = currency;
        } else if (flagType === 'two') {
          this.flagTwo = currency;
        }

        this.isDropdownOpenOne = false;
        this.isDropdownOpenTwo = false;

        // Previne a troca de moeda para o mesmo valor
        if (this.flagOne === this.flagTwo) {
          window.location.reload()
        }
      },

      async handleFetchCurrencyData() {
        const req = await fetch(`https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=vlxciMCTw1zbfqP0ADqk`);
        const data = await req.json();
        this.currenciesName = Object.keys(data.available_currencies);
        console.log(this.currenciesName);
      }
    },
    mounted() {
      this.handleFetchCurrencyData();
    }
  };
</script>

<template>
  <div class="app">
    <main>
      <h1 class="title">Forex Exchange</h1>
      <p>Check out the current price for a currency pair</p>

      <section>
        <div class="inputs_container">
       
          <div class="dropdown" @click="toggleDropdown('one')">
            <div class="selected-option">
              <span :class="`flags currency-flag currency-flag-${flagOne.toLowerCase()}`"></span>
              {{ flagOne }}
              <span class="dropdown-icon" :class="{'open' : isDropdownOpenOne}">&#9660;</span>
            </div>
            <div v-if="isDropdownOpenOne" class="options-list">
              <div
                v-for="currency in currenciesName"
                :key="currency"
                class="option"
                @click="selectCurrency(currency, 'one')"
              >
                <span :class="`currency-flag currency-flag-${currency.toLowerCase()}`"></span>
                {{ currency }}
              </div>
            </div>
          </div>

          
          <div class="swap-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
            </svg>
          </div>

          
          <div class="dropdown" @click="toggleDropdown('two')">
            <div class="selected-option">
              <span :class="`flags currency-flag currency-flag-${flagTwo.toLowerCase()}`"></span>
              {{ flagTwo }}
              <span class="dropdown-icon" :class="{'open' : isDropdownOpenTwo}">&#9660;</span>
            </div>
            <div v-if="isDropdownOpenTwo" class="options-list">
              <div
                v-for="currency in currenciesName"
                :key="currency"
                class="option"
                @click="selectCurrency(currency, 'two')"
              >
                <span :class="` currency-flag currency-flag-${currency.toLowerCase()}`"></span>
                {{ currency }}
              </div>
            </div>
          </div>
        </div>

        <!-- Chart -->

        <div class="chart_container">
          <div class="chart-header">
            <div class="flags_currency_container">
              <div class="flags_wrapper">
                <span :class="`flags currency-flag currency-flag-${flagOne.toLowerCase()}`"></span>
                <span :class="`flags currency-flag currency-flag-${flagTwo.toLowerCase()}`"></span>
              </div>
              <span class="currency">{{ flagOne }}/{{ flagTwo }}</span>
            </div>

            <div class="currency-compare">
              <span>1USD = </span>
              <span>0.96830 EUR</span>
            </div>
          </div>

          <div class="chart">
            <Chart />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    width: 100%;
    min-height: 100dvh;

    main {
      width: 100%;
      max-width: 1200px;
      height: 100vh;
      margin: 0 auto;
      padding: 1.2rem 2.4rem;

      .title {
        font-size: 6rem;
        font-weight: bold;
        margin-bottom: .8rem;
      }

      p {
        font-size: 2rem;
        color: #6C757D;
      }

      section {
        width: 100%;
        height: fit-content;
        padding: 2rem 1rem;
        display: flex;
        align-items: center;
        gap: 3.2rem;
        margin-top: 3.2rem;

        .inputs_container {
          width: 28%;
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 2.8rem;
          padding: 2.4rem;

          .dropdown {
            width: 100%;
           
            border: 2px solid #222;
            border-radius: 1rem;
            padding: 1rem;
            cursor: pointer;
            position: relative;
          }

          .selected-option {
            display: flex;
            align-items: center;
            gap: 1.2rem;


            .dropdown-icon{
              font-size: 1.6rem;
              margin-left: auto;
              color: #333;
              transition: transform 0.3s ease, color 0.3s ease;

              &.open {
                transform: rotate(180deg); 
              }

            }
          }

          .options-list {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 20rem;
            overflow: hidden auto;
            background-color: white;
            border-radius: 1rem;
            border: 1px solid #ccc;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
          }

          .option {
            padding: 1rem;
            display: flex;
            align-items: center;
            cursor: pointer;
          }

          .option:hover {
            background-color: #f0f0f0;
          }

          .swap-icon {
            cursor: pointer;
          }
        }

        .chart_container {
          width: 100%;
          max-width: 700px;
          height: fit-content;
          max-height: 50rem;
          padding: 2rem;
          background-color: rgb(253, 250, 250);
          border-radius: 2rem;
          box-shadow: -1px 10px 12px 4px rgba(0, 0, 0, 0.24);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .flags_currency_container {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            align-items: center;

            .flags_wrapper {
              display: flex;
              align-items: center;
              gap: 1.2rem;

              .flags {
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
                background-size: cover;
                background-position: center;
              }
            }

            .currency {
              font-size: 2.4rem;
              font-weight: bold;
            }
          }

          .currency-compare {
            font-size: 2rem;
            font-weight: bold;
          }
        }

        .chart {
          max-width: 100%;
          max-height: fit-content;
          overflow: hidden;
        }
      }
    }
  }
</style>
