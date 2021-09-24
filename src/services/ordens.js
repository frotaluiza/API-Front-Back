import { http } from './config'

export default {
    listar:()=>{
        return http.get('OrdensPorData')
    },

    salvar:()=>{
        return http.post('Ordems')
    },
    posicao(data){
        const axios = require('axios')
        
        return axios.get('https://ordens120210922085502.azurewebsites.net/api/Soma/'+data)
        
        
  
      }

    

    // soma:()=>{
    //     return http.get('OrdensPorData')
    // }


}