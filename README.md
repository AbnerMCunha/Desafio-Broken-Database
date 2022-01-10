# Desafio-Rocky
Contexto: Arquivo JSON foi corrompido. É necessário corrigilo.

O Desafio consiste, simplificadamente em 2 partes

1.Recuperação dos dados originais do banco de dados 
  1.1 Ler o arquivo Json;
  1.2 Corrigir os nomes dos produtos, substituindo os caracteres corrompidos; 	
    1.2.1	"a" por "æ", 	
    1.2.2 	"c" por "¢", 	
    1.2.3 	"o" por "ø", 	
    1.2.4 	"b" por "ß". 
  1.3. Converter campos price de String pra Number.
  1.4. Nos registro de Produtos onde não houver campo de quantidade, adicioná-lo;  
  
2. Validação do banco de dados corrigido 
  2.1 Imprimir ordenadamente os registros por Categoria e ID dos produtos.
    2.1.1	Foi necessário criar uma função para ordenar as categorias,(como maiúsculas para não haver diferenças), chamada como argumento da função sort,
    2.1.2	 Feito isso, é impresso por meior do método table as colunas: “category”, ”id” e ”name”. 
  2.2 Geração do Arquivo JSON corrigido
      2.2.1	Baseado no módulo de interação com arquivos, FS, e recebendo o array de objetos da base de dados JSON, esta foi convertida em string e jogado dentro do documento, saida.json, criado ao chamar a função writeFile, gerando assim o arquivo na mesma pasta dos outros arquivos base. 

Conclusão
  Sem dúvidas foi a implementação que mais me ajudou a compreender o funcionamento do JavaScript com suas funções nativas, gerenciamento de módulos de manipulação de documentos, por meio de um problema realista, de correção de bug no bancos de dados não relacional, o que é novo pra mim, já que lido mais com os Relacionais, cotidianamente.
	Ao finalizar o projeto me sinto mais motivado para compreender mais da linguagem, do banco de dados e da plataforma web em geral.
