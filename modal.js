const selecModal= document.getElementById('camada-transparente')
const selecJanela = document.getElementById('camada-filme')
const conteudoModal = document.getElementById('filme-selecionado')


function clickJanela(){
    selecModal.classList.remove('aparecer')
}

function aparecerModal(data){
    conteudoModal.innerHTML = `
    <h2 id="titulo-filme">${data.Title} - ${data.Year}</h2>
        <section id="corpo-filme">
          <img src=${data.Poster} id="poster-modal">
          <div id="info">
                <h5>${data.Plot}</h5>
              
              <div id="atores"><h4>ATORES:</h4>
                  <h5>${data.Writer}</h5>
              </div>
              
              <div id="genero"><h4>GENÊRO:</h4> 
                  <h5>${data.Genre}</h5>
              </div>
            
          </div>
        </section>
        <section id="rodape">
          <button id="adc" onclick='adcFilmeALista(${JSON.stringify(data).replace("'","-")})'>Adicionar à Lista</button>
        </section> `
}

selecJanela.addEventListener('click', clickJanela)
