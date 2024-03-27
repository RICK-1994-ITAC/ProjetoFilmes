const $button = document.getElementById('search')
const $nome = document.getElementById('nome')
const $ano = document.getElementById('ano')
const areaFilmes = document.getElementById('lista-total') 
let listafilme = JSON.parse(localStorage.getItem('movieList')) ?? []

async function consultaApi() {
    try {
      let url =(`http://www.omdbapi.com/?apikey=${key}&t=${validationName()}${validationDate()}`)

    const resposta = await fetch(url)
    const data = await resposta.json()
    aparecerModal(data)
    console.log('data:', data)
    if(data.Error){
        throw new Error('Filme não encontrado')
    }
    selecModal.classList.add('aparecer')  
    } catch (error) {
        notie.alert({ type:'error' ,text: error.message})
    }

    function validationName(){
        if($nome.value === ''){
            throw new Error('O nome do filme deve ser informado')
        }
       return $nome.value.split(' ').join('+')
    }

    function validationDate() {
        if($ano.value === ''){
            return ''
        }
        if($ano.value.length !== 4){
            throw new Error('Ano do filme inválido')
        }
       return `&y=${$ano.value}`
    }
     
}

function adcFilmeALista(data){
    if (esseFilmeJaFoiAdc(data.imdbID)){
        notie.alert({ type:'error' ,text:'Filme já se encontra na Lista'})
        return
    }//vai chamar a função, e passar o código imdbID, do filme pesquisado no momento,como paramêtro.
    //Se dentro do array(listaFilme) já houver um filme com codigo imdbID diferente do codigo pesquisado no momento,ou o array estiver vazio, entao o filme será adc a lista,através do comando abaixo:
    listafilme.push(data)
    listaAtualizadaLocalStorage()
    updateUi(data)
  selecModal.classList.remove('aparecer')
}

function updateUi(data){
    areaFilmes.innerHTML+=`<article id="lista-filmes-${data.imdbID}" class='lista-filmes'>
    <img src="${data.Poster}"
    alt="poster do ${data.Title}">
    <button class="remover" onclick ='removerDaLista("${data.imdbID}")' ><i class="bi bi-trash"></i>Remover</button>
  </article>`

}

//nessa função, vai haver um comparativo, se houver adicionado o mesmo filme na lista,ou seja, com o mesmo código, entao vai cair no "if" acima,e retorna notificação de erro.
function esseFilmeJaFoiAdc(novoCodigoASerComparado){
    function esseIdEDesseFilme(filme){
        return filme.imdbID === novoCodigoASerComparado
    }
   return listafilme.find(esseIdEDesseFilme)
}

function removerDaLista(codigoFilme){
    listafilme = listafilme.filter(item => item.imdbID !== codigoFilme)
    document.getElementById(`lista-filmes-${codigoFilme}`).remove()
    listaAtualizadaLocalStorage()
}

function listaAtualizadaLocalStorage(){
    localStorage.setItem('movieList', JSON.stringify(listafilme))
}

listafilme.forEach(updateUi)

$button.addEventListener('click', consultaApi)
