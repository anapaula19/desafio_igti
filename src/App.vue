<template>
  <h2>Faça a viagem dos sonhos!</h2>
  <h3>Use milhas para ter os melhores pacotes de viagens e aporveite suas férias!</h3>
  <div class="div-flex">

    <div class="div-input">
      <div>
        <p>País de origem:</p>
        <select v-model="selecaoPaisOrigem" class="select" name="pais-o" id="pais-o">
          <option v-for="(pais, index) in apiDados" :key="index" :value="pais" >{{pais?.country}}</option>
        </select>
        <p>Cidade de origem:</p>
        <select v-model="selecaoCidadeOrigem" class="select" name="cidade-o" id="cidade-o" @change="getCityOrigem">
          <option v-for="(cidade, index) in selecaoPaisOrigem?.cities" :key="index" :value="cidade">{{cidade.city}}</option>
        </select>
        <p>País destino:</p>
        <select v-model="selecaoPaisDestino" class="select" name="pais-d" id="pais-d">
          <option v-for="(pais, index) in apiDados" :key="index" :value="pais">{{pais?.country}}</option>
        </select>
        <p>Cidade destino:</p>
        <select v-model="selecaoCidadeDestino" class="select" name="cidade-d" id="cidade-d">
          <option v-for="(cidade, index) in selecaoPaisDestino?.cities" :key="index" :value="cidade">{{cidade.city}}</option>
        </select>
        <p class="erro-cidade" v-if="selecaoCidadeOrigem && selecaoCidadeDestino && selecaoCidadeOrigem == selecaoCidadeDestino">Não é possível viajar para a mesma cidade de origem!</p>
      </div>

      <div class="div-width">
        <div class="div-flex">
          <div class="div-ac">
            <p>Adultos:</p>
            <div class="div-button">
              <button @click="decrementeA()" :disabled="desabilitarBotaoA">-</button>
              <div class="div-p">{{contadorA}}</div>
              <button @click="incrementeA()">+</button>
            </div>
          </div>
          <div class="div-ac">
            <p>Criança:</p>
            <div class="div-button">
              <button @click="decrementeC()" :disabled="desabilitarBotaoC">-</button>
              <div class="div-p">{{contadorC}}</div>
              <button @click="incremneteC()">+</button>
            </div>
          </div>
        </div>
        
        <div class="div-flex div-checked">
          <input v-model="selecaoClasse" id="economica" type="radio" name="vehicle1" value="Econômica" checked>
          <label for="Econômica">Classe Econômica</label><br>
          <input v-model="selecaoClasse" id="executiva" type="radio" name="vehicle1" value="Executiva">
          <label for="Executiva">Classe Executiva</label><br>
        </div>
      </div>

      <div class="div-slider">
        <p>Utilizar {{ milhas }} milhas</p>
        <input v-model="milhas" type="range" class="slider" id="myRange" min="0" :max="totalMilhas">
      </div>
    </div>


    <div class="div-input">
      <div>
        <h4>Resumo da viagem</h4>
        <p>Origem: {{selecaoPaisOrigem?.country}} ({{selecaoCidadeOrigem?.city}})</p>
        <p>Destino: {{selecaoPaisDestino?.country}} ({{selecaoCidadeDestino?.city}})</p>
        <p>Distância: {{distancia}} km</p>
        <p>{{contadorA}} adulto(s), {{contadorC}} criança(s)</p>
        <p>Tipo de vôo: Classe {{selecaoClasse}}</p>
        <p>R$ {{precoPassagemAdulto}} por adulto</p>
        <p>R$ {{precoPassagemCrianca}} por criança</p>
        <p>Milhas: {{milhas}}</p>
        <p>Valor abatido por milhas: R$ {{valorMilha}}</p>
        <p>Total:R$ {{precoPassagem}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { preco } from "./utils/get-price.js"
import { getDistance } from "./utils/get-distance.js"
import { getCountries } from "./service/countries-service.js"
export default {
  data() {
    return{
      apiDados: null,
      contadorA: 0,
      contadorC: 0,
      desabilitarBotaoA: true,
      desabilitarBotaoC: true,
      milhas: 0,
      selecaoPaisOrigem: null,
      selecaoPaisDestino: null,
      selecaoCidadeOrigem: null,
      selecaoCidadeDestino: null,
      selecaoClasse: "Econômica"
    }
  },
  computed: {
    distancia: function () {
      if(this.selecaoCidadeOrigem && this.selecaoCidadeDestino) {
        const distancia = getDistance(this.selecaoCidadeOrigem?.latitude,
        this.selecaoCidadeOrigem?.longitude,
        this.selecaoCidadeDestino?.latitude,
        this.selecaoCidadeDestino?.longitude);
        return distancia.toFixed(2)
      }
      return 0
    },
    precoPassagem: function() { 
      if(this.distancia && this.contadorA && this.selecaoPaisOrigem && this.selecaoPaisDestino && this.selecaoClasse) {
        const precoDaPassagem = preco(this.distancia, this.contadorC, this.contadorA, this.selecaoPaisOrigem?.country, this.selecaoPaisDestino?.country, this.selecaoClasse);
        const precoMilhaTotal = precoDaPassagem.soma.toFixed(2) - this.valorMilha
        return precoMilhaTotal.toFixed(2)
      }
      return 0
    }, 
    precoPassagemSemMilhas: function() {
      if(this.distancia && this.contadorA && this.selecaoPaisOrigem && this.selecaoPaisDestino && this.selecaoClasse) {
        const precoDaPassagem = preco(this.distancia, this.contadorC, this.contadorA, this.selecaoPaisOrigem?.country, this.selecaoPaisDestino?.country, this.selecaoClasse);
        return precoDaPassagem.soma.toFixed(2);
      }
      return 0
    },
    precoPassagemCrianca: function() {
      if(this.distancia && this.contadorC && this.contadorA && this.selecaoPaisOrigem && this.selecaoPaisDestino && this.selecaoClasse) {
        const precoDaPassagemCrianca = preco(this.distancia, this.contadorC, this.contadorA, this.selecaoPaisOrigem?.country, this.selecaoPaisDestino?.country, this.selecaoClasse);
        return new Intl.NumberFormat('id').format(precoDaPassagemCrianca.valor_crianca.toFixed(2))
      }
      return 0
    },
    precoPassagemAdulto: function() {
      if(this.distancia && this.contadorA && this.selecaoPaisOrigem && this.selecaoPaisDestino && this.selecaoClasse) {
        const precoDaPassagemAdulto = preco(this.distancia, this.contadorC, this.contadorA, this.selecaoPaisOrigem?.country, this.selecaoPaisDestino?.country, this.selecaoClasse);
        return new Intl.NumberFormat('id').format(precoDaPassagemAdulto.valor_adulto.toFixed(2))
      }
      return 0
    },
    valorMilha: function() {
      const somaMilhas = this.milhas * 0.02
      return somaMilhas.toFixed(2)
    },
    totalMilhas: function() {
        const totalMilhas = this.precoPassagemSemMilhas / 0.02;
        return totalMilhas;
    } 
  },
  async mounted() {
    this.apiDados = await getCountries();
  },
  methods: {
    incrementeA() {
      this.contadorA++;
      this.desabilitarBotaoA = false;
    },
    decrementeA() {
      this.contadorA--;
      if (this.contadorA == 0) {
        this.desabilitarBotaoA = true;
      }
    },
    incremneteC() {
      this.contadorC++;
      this.desabilitarBotaoC = false;
    },
    decrementeC() {
      this.contadorC--;
      if (this.contadorC == 0) {
        this.desabilitarBotaoC = true;
      }
    },
    getCityOrigem() {
      console.log(this.selecaoCidadeOrigem);
      console.log(this.selecaoCidadeDestino);
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.div-input{
  border: 2px solid lightgray;
  padding: 20px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.div-flex{
  display: flex;
}
.select {
  background-color: rgb(241, 241, 241);
  width: 300px;
  height: 35px;
  border: none;
}
button {
  align-items: center;
  border-radius: 5px;
  border: none;
  width: 35px;
  height: 35px;
  font-size: 1rem;
} 
.div-button {
  display: flex;
  align-items: center;
}
.div-p {
  margin-right: 20px;
  margin-left: 20px;
}
.div-ac {
  margin-right: 10px;
}
.div-checked {
  margin-top: 20px;
}
#executiva {
  margin-left: 50px;
}
.div-slider {
  width: 100%;
}
.slider {
  width: 100%;
}
.div-width {
  width: 100%;
}
.erro-cidade {
  color: red;
  font-size: 14px;
}
</style>
