//AUTOR: ABNER RAFAEL MEDEIROS CUNHA


//interacao com documento - https://www.youtube.com/watch?v=HrjC6RwEpt0&ab_channel=HeyNode
const fs = require('fs');

function CarregaBd (location) {
    return require(location);
}

//Parametros: objeto broken-database, e 2 arrays, uma com os caracteres a serem localizados e a outros a substituirem os localizados.
function CorrigeCaracteres( meusdados, errados, certos) {
    
    //loop do json
    for(i = 0; i < meusdados.length; i++) {
        
        //loop para encontrar os caracteres errados
        for(j = 0; j < errados.length; j++){
            
            let DadosCorrigidos = meusdados[i].name,
                regularExp = new RegExp(errados[j], "g"); //Expressao regular encontrará as instancias do caracter  // https://www.youtube.com/watch?v=5yzF5pngFYY&ab_channel=ErickWendel
            
            //substituição dos caracteres errados pelos corretos
            DadosCorrigidos = DadosCorrigidos.replace(regularExp, certos[j]);
            meusdados[i].name = DadosCorrigidos;           
        }
    }
}


//Convesão de Preco de texto para float
function corrigePrecos( meusdados ) {
    //loop no json
    for(i = 0; i < meusdados.length; i++) {
        meusdados[i].price = parseFloat(meusdados[i].price); 
    }
}

//Checa se objeto possui a propriedade "quantidade", caso negativo atribui propriedade ao objeto, inicializada com '0' - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
function corrigeQtd(meusdados) {
        
    for(i = 0; i < meusdados.length; i++) {        
        if (!meusdados[i].hasOwnProperty('quantity')) {            
            meusdados[i].quantity = 0;            
        }
    }   
}


//imprime a lista com todos os nomes dos produtos, ordenados primeiro por categoria em ordem alfabética e ordenados por id em ordem crescente - https://developer.mozilla.org/pt-BR/docs/Web/API/Console/table
function ImprimePorCategoria(meusDados) {
    meusDados.sort(sortCategoriaId);
    console.table(meusDados, ["category", "id", "name"] ); 
}

//ordenacao com array.sort() - https://www.c-sharpcorner.com/UploadFile/fc34aa/sort-json-object-array-based-on-a-key-attribute-in-javascrip/
function sortCategoriaId(a, b) {
    
    //Deixando todas as categorias iguais para conseguir ordenar corretamente
    const categoriaA = a.category.toUpperCase();
    const categoriaB = b.category.toUpperCase();
    let comparacao = 0;
    
    if (categoriaA > categoriaB) {
        comparacao = 1;
    } else if (categoriaA < categoriaB) {
        comparacao = -1;
    }
    
    //Se descricao da categoria for igual, comparar pelos ID
    if (comparacao == 0){
      if (a.id > b.id) {
          comparacao = 1
      } else {
          comparacao = -1
      }
    }
    return comparacao;
}



//Calculo de inventario de estoque ordenado por categoria
function inventarioDeEstoque(meusDados) {
    
    //Criado um array de objeto armazenar as categorias e valores respectivos e já armazenando os dados da primeria categoria de produtos encontrada
    let estoque = [{
        categoria: meusDados[0].category,
        valorEmEstoque: meusDados[0].quantity * meusDados[0].price      
    }],
        index = 0;
    
    //loop passando nas outras categorias e somando as já adcionadas no objeto estoque, a partir do segundo valor(1º já adcionadio acima)
    for(i = 1; i < meusDados.length; i++) {
        
        // se diferente da já adcionado, criado novo registro na array com o preco, senão, valor incrementado
        if (estoque[index].categoria != meusDados[i].category) {
            
            index++;
            estoque.push({
                categoria: meusDados[i].category,
                valorEmEstoque:  ( meusDados[i].quantity * meusDados[i].price )
            })
            
        } else {            
            estoque[index].valorEmEstoque += ( meusDados[i].quantity * meusDados[i].price )
        }        
    }
    
    console.table(estoque);
}

function arquivoJsonCorrigido(meusDados, caminho) {
    
    //Convertendo o objeto para string
    const jsonString = JSON.stringify(meusDados, null, 1);

    fs.writeFile(caminho, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        }
    })
}

// Execução // Execução // Execução // Execução // Execução // Execução 
// Execução // Execução // Execução // Execução // Execução // Execução 

let substituir =    ["æ", "¢", "ø", "ß"],
    substituidos =  ["a", "c", "o", "b"];

var Dados = CarregaBd('./broken-database.json');

CorrigeCaracteres(Dados, substituir, substituidos);

corrigePrecos(Dados);

corrigeQtd(Dados);

ImprimePorCategoria(Dados);

inventarioDeEstoque(Dados);

arquivoJsonCorrigido(Dados, './saida.json');
