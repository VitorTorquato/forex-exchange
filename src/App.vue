<script >
  import "/node_modules/flag-icons/css/flag-icons.min.css";

  import Chart from "./components/chart/Chart.vue";
  import Input from './components/input/Input.vue';
  export default{
    name:'App',
    components:{
      Input,
      Chart
    }
  }
</script>

<template>
    <div class="app">
      <main>
        <h1 class="title">Forex Exchange</h1>
        <p>Check out the current price for a current pair</p>

          <section>
              <div class="inputs_container">
                    <Input/>     
                    <Input/>
              </div>


              <div class="chart_container">
                  
                <div class="flags_currency_container">
                   
                  <div class="flags_wrapper">
                      <span class="flags fi fi-eu"></span>
                      <span class="flags fi fi-br"></span>
                      <span class="forex_tag">forex.com</span>
                    </div>

                    <span class="currency">EUR/USD</span>
                  </div>
                  
                  <div class="chart">
                    <Chart/>
                  </div>

              </div>
          </section>
      </main>
    </div>
</template>

<style lang="scss" scoped>
  
  .app{
    width: 100%;
    min-height: 100dvh;

    main{
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.2rem 2.4rem;


      .title{
    font-size: 6rem;
    font-weight: bold;
    margin-bottom: .8rem;
  }

  p{
    font-size: 2rem;
  } 

    section{
    width: 100%;
    height: 100vh;
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    gap: 3.2rem;


    .inputs_container{
    width: 28%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2.8rem;
    padding: 2.4rem;
    
  }

  .chart_container{
    width: 100%;
    max-width: 700px;
    height: 100%;
    max-height: 45rem;
    padding: 2rem;
   background-color:rgb(253, 250, 250);
    border-radius: 2rem;
    box-shadow: -1px 10px 12px 4px rgba(0,0,0,0.24);
  -webkit-box-shadow: -1px 10px 12px 4px rgba(0,0,0,0.24);
  -moz-box-shadow: -1px 10px 12px 4px rgba(0,0,0,0.24);

 



  .flags_currency_container{
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .flags_wrapper{
      display: flex;
      align-items: center;
      gap: 1.2rem;


      .flags{
        width: 4rem;
        height: 4rem;
        background-color: red;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .5rem;
        border-radius: 50%;
        background-size: cover;
     
      }

    

      .forex_tag{
        padding: 1rem 1.2rem;
        background-color: gray;
        border-radius: 1.4rem;
      }

      
    }
    
    .currency{
      font-size: 3.4rem;
      font-weight: bold;
    }

  }
  
  .chart{
    max-width: 100%;
    max-height: fit-content;
    overflow: hidden;
  }

  }

  
   }
  }
}

   

</style>
