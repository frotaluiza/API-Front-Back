<template>
  <div id="tudo">
    <h1>Gerenciador de ativos</h1>
  <div id='conteiner-tudo'>
    <div id="conteiner-tablela-ordens">
      <table id="tabela-ordens">

        <thead>

          <tr>
            <th>Ativo</th>
            <th>Qtd</th>
            <th>Preço</th>
            <th>Data</th>
            <th>Classe Neg</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="ordem of ordens" :key="ordem.idOrdem">

            <td>{{ idAtivo(ordem.fkIdAtivo) }}</td>
            <td>{{ ordem.quantidade }}</td>
            <td>{{ ordem.preco }}</td>
            <td>{{ data(ordem.data) }}</td>
            <td>{{ classe(ordem.classeNegociacao) }}</td>
            

          </tr>

        </tbody>
      
      </table>
      
      
     
    </div>
   <div id="cadastro-posicao">
    <div id="conteiner-cadastro">
      
      
      <form @submit.prevent=" (mudar() &  salvar()) ">
  
   <label id="materialize-select">Ativo</label>
    <div id="input-select" class="input-field col s12">
      
    <select class="browser-default" v-model="ordem.fkIdAtivo" >
      <option  disabled selected>Escolha o ativo</option>
      <option value="1" >PETRO4</option>
      <option value="2">INDV3</option>
    </select>
    
  </div>
 
    <label for="inputQuantidade">Quantidade</label>
    <div class="col-sm-10">
    <input type="number" v-model="ordem.quantidade"/>
    </div>
    <label for="inputNumber3">Preço</label>
    <div class="col-sm-10">
      <input v-model="ordem.preco" type="number" placeholder="Digite o Preço">
    </div>
 
  
    <label for="inputDate3">Data</label>
    <div class="col-sm-10">
      <input type="date" v-model="ordem.data" id="inputPassword3">
    </div>
  <div>
    <input v-model="ordem.classeNegociacao" id="choice_1" name="group1" type="radio" value="c"/>   
  <label for="choice_1">Compra</label>

  <input v-model="ordem.classeNegociacao" id="choice_2" name="group1" type="radio" value="v" />  
  <label for="choice_2">Venda</label>
  
  </div>
  <div class="col-sm-10">
      <button type="submit" class="btn btn-primary">Registrar</button>
    </div>
</form>
    </div>
    <div id="conteiner-posição"> 
      <h2>Posição</h2>
      <form @submit.prevent="posicao">
        <label for="inputDate3">Data</label>
    <div class="col-sm-10">
      <input type="date" v-model="DataRel" id="inputPassword3">
    </div>
    <div class="col-sm-10">
      <button type="submit" class="btn btn-primary">Enviar</button>
    </div>

      </form>
      <table >

        <thead>

          <tr>
            <th>PETRO4</th>
            <th>INDV3</th>
            
          </tr>

        </thead>

        <tbody>

          <tr >

            <td>{{veri0()}}</td>
            <td>{{veri1 ()}}</td>
            
            
            
          </tr>

        </tbody>
      
      </table>

    </div>
    </div>
  </div>
  </div>
</template>

<script src="jquery-3.5.1.min.js"></script>

<script >



 $(document).ready(function(){
    $('select').formSelect();
  });


import Ordens from './services/ordens'




export default{
  

  data(){
    return{
      ordem:{
        
        fkIdAtivo: '',
        quantidade: '',
        preco:'',
        data:'',
        classeNegociacao:''
      },
      ordens: [],
      soma:{
        
        somaPorId: ''
        
      },
      DataRel: ''

    }
  },

  mounted(){
    this.listar()
  },

  methods:{
    listar(){
      Ordens.listar().then(resposta => {
      this.ordens = resposta.data
    })
    },


    mudar(){
      this.ordem.fkIdAtivo = parseInt(this.ordem.fkIdAtivo)
      this.ordem.quantidade = parseInt(this.ordem.quantidade)
      this.ordem.preco = parseInt(this.ordem.preco)
      console.log(this.ordem)
      console.log(JSON.stringify(this.ordem))
      console.log(typeof this.ordem)
      
    },
    salvar(){
      
      let url = 'https://ordens120210922085502.azurewebsites.net/api/Ordems'
      let req = new XMLHttpRequest()

      console.log(req)

      req.open('POST',url,true)
      req.setRequestHeader('Content-Type','application/json; charset=UTF-8')
      req.onreadystatechange = () => {
        if(req.readyState === 4 && req.status === 201){
          let object = JSON.parse(req.response)
          console.log(object)
        }
      }
      let body = JSON.stringify({fkIdAtivo: this.ordem.fkIdAtivo,
        quantidade: this.ordem.quantidade,
        preco:this.ordem.preco,
        data:this.ordem.data,
        classeNegociacao:this.ordem.classeNegociacao})
      req.send(body)
      this.ordem = {}
      alert("Enviado com sucesso!")
      this.listar() 
      // let str = JSON.stringify(this.ordem)
      // Ordens.salvar(str).then(resposta => {alert("ok")})
  
    },
    posicao(){
      Ordens.posicao(this.DataRel)
      .then(resposta => {
          console.log(resposta.data)
          this.soma = resposta.data
        })
    },
    veri0(){
      if(Object.keys(this.soma).length==1 && this.soma.somaPorId==''){
        return this.soma.somaPorId
      }
      else{
        return this.soma[0].somaPorId 
      }
    },
    veri1(){
      if(Object.keys(this.soma).length==1){
        return this.soma.somaPorId
      }
      else{
        return this.soma[1].somaPorId
      }
    },
    idAtivo(idAtivo){
      if (idAtivo == 1){
        return "PETRO4"
      }
      else{
        return "INDV3"
      }
    },
    data(data){
      if(data){
        return data.slice(0,10)
      }
    },
    classe(classe){
      if(classe == "c"){
        return "Compra"
      }
      else{
        return "Venda"
      }
    }
    


    
    
  }
}



</script>



<style>
h2{
  font-size: 20px;
  text-align: center;
}
#conteiner-tablela-ordens{
  max-height: 400px;
  overflow: scroll;
}
#tudo{
  display: flex;
  flex-direction: column;
  align-items: center;
  
}

#conteiner-tudo{
  width:60%;
  display:grid;
  grid-template-areas: 
  "acima  "
  "tabela ";
}
#conteiner-tabela-ordens{
  
  justify-self: center;
  
}

#cadastro-posicao{
  display:flex;
  
  grid-area:acima;
}
#conteiner-cadastro{
  flex-grow: 0.8;
  margin-right: 50px;
}
#conteiner-posicao{
  flex-grow:1;
}







</style>
