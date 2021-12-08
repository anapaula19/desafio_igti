function preco(distancia, numero_crianca, numero_adulto, pais_o, pais_d, classe_executiva) {
    let distancia_adulto = 0
    let distancia_crianca = 0
    let valor_crianca = 0
    let valor_adulto = 0
    if (pais_o == pais_d){
        distancia_adulto = distancia * 0.3
        distancia_crianca = distancia * 0.15
        valor_crianca = distancia_crianca * numero_crianca
        valor_adulto = distancia_adulto * numero_adulto
    } else if (pais_o != pais_d) {
        distancia_adulto = distancia * 0.5
        distancia_crianca = distancia * 0.25
        valor_crianca = distancia_crianca * numero_crianca
        valor_adulto = distancia_adulto * numero_adulto
    }
    if(classe_executiva == "Executiva") {
        valor_adulto = valor_adulto * 1.8
        valor_crianca = valor_crianca * 1.4
    }
    if(pais_o == pais_d){
        const soma = valor_crianca + valor_adulto
        return {
            soma, valor_crianca, valor_adulto
        }
    } else if(pais_o != pais_d) {
        const soma = valor_crianca + valor_adulto
        return {
            soma, valor_crianca, valor_adulto
        }
    }
    return 0    
}
export {
    preco
}