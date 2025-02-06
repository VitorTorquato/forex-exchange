<script >

  import Input from './components/input/Input.vue';
  export default{
    name:'App',
    components:{
      Input
    }
  }
</script>

<template>
    <div class="app">
      <main class="main_container">
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
                      <span class="flags">EUR</span>
                      <span class="flags">USD</span>
                      <span>forex.com</span>
                    </div>

                    <span>EUR/USD</span>

                    <div>
                      CHART
                    </div>
                  </div>
              </div>
          </section>
      </main>
    </div>
</template>

<style scoped>
  .app{
    width: 100%;
    min-height: 100dvh;
  }

  .main_container{
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
  }
  
  /*title and sub-title*/
  .title{
    font-size: 6rem;
    font-weight: bold;
    margin-bottom: .8rem;
  }

  p{
    font-size: 2rem;
  }

  /*section*/
  section{
    width: 100%;
    height: calc(100vh - 106px);
    padding: 2rem 1rem;
    display: flex;
    gap: 3.2rem;
  }

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
    flex: 1;
    height: 100%;
    padding: 2rem;
   background-color:rgb(253, 250, 250);
    border-radius: 2rem;
    box-shadow: -1px 10px 12px 4px rgba(0,0,0,0.24);
-webkit-box-shadow: -1px 10px 12px 4px rgba(0,0,0,0.24);
-moz-box-shadow: -1px 10px 12px 4px rgba(0,0,0,0.24);
  }

</style>
