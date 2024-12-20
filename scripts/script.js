
var forecast; //oggetto contenente il bollettino meteo
const elenco = document.getElementById("elenco");
const selZona = document.getElementById("sel-zona");
var requestURL = "json/bollettino-2024-12-16.json";
selZona.addEventListener("change", getRemoteData);
var opzioniZone = []
var bollettiniZone = []
var contenitore = document.getElementById("previsioni")
var intestazione = document.getElementById("intestazione")
let nomeZona



async function getRemoteData() {
    try {
      // after this line, our function will wait for the `fetch()` call to be settled
      // the `fetch()` call will either return a Response or throw an error
      const response = await fetch(requestURL);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      forecast = await response.json();
    } catch (error) {
      console.error(`Errore reperimento strutture recettive: ${error}`);
    }
    console.log(forecast.previsioni.meteogrammi.meteogramma)
    console.log(forecast)
    loadData();
    
    //(opzionale) caricamento dinamico delle zone
  
  }



  function loadData(){
    //riempimento zone dinamico
    loadOpzioni()
    changeText()
    loadBollettini()
  }

  function loadBollettini()
  {
    for(let bollettino of forecast.previsioni.meteogrammi.meteogramma)
    {
      if(bollettino._zoneid == selZona.value)
      {
        console.log(bollettino)
        createSection(bollettino)
        
      }
    }


  }


  function createSection(variable)
  {
    contenitore.innerHTML = ""
    
    let dataEmissione = document.createElement("p")
    dataEmissione.innerHTML = "ultimo aggiornamento: "+ forecast.previsioni.data_emissione._date

    let dataAggiornamento = document.createElement("p")
    dataAggiornamento.innerHTML = "rilasciato il: " + forecast.previsioni.data_aggiornamento._date


    contenitore.appendChild(dataEmissione)
    contenitore.appendChild(dataAggiornamento)


    for(let previsione of variable.scadenza)
    {
      let div = document.createElement("div")
      contenitore.appendChild(div)

      

      


      let immagine = document.createElement("img")
      immagine.src = previsione.SIMBOLO.__text
      immagine.style = "float:top;width:42px;height:42px;" //aggiunta della posizione e dimensione foto
      div.appendChild(immagine)

      let data = document.createElement("h4")
      data.textContent = previsione._data
      div.appendChild(data)
      console.log(data)

      

      let tabella = document.createElement("table")
      let tabella_tbody = document.createElement("tbody")
      tabella.appendChild(tabella_tbody)
      tabella.classList.add("table-striped")


      if(Object.hasOwn(previsione, 'ATTENDIBILITA'))
      {
        if(Object.hasOwn(previsione.ATTENDIBILITA, '__text'))
          {
            let tr = document.createElement("tr")
            tabella_tbody.appendChild(tr)
    
            let th = document.createElement("th")
            th.textContent = "attendibilità: "
            tr.appendChild(th)
    
            let td = document.createElement("td")
            td.textContent = previsione.ATTENDIBILITA.__text
            tr.appendChild(td)
          }
      }






      if(Object.hasOwn(previsione, 'CIELO'))
      {
        if(Object.hasOwn(previsione.CIELO, '__text'))
          {
            let tr = document.createElement("tr")
            tabella_tbody.appendChild(tr)
    
            let th = document.createElement("th")
            th.textContent = "cielo: "
            tr.appendChild(th)
    
            let td = document.createElement("td")
            td.textContent = previsione.CIELO.__text
            tr.appendChild(td)
          }
      }

        if(Object.hasOwn(previsione.PRECIPITAZIONI, '__text'))
          {
            let tr = document.createElement("tr")
            tabella_tbody.appendChild(tr)
    
            let th = document.createElement("th")
            th.textContent = "precipitazioni: "
            tr.appendChild(th)
    
            let td = document.createElement("td")
            td.textContent = previsione.PRECIPITAZIONI.__text
            tr.appendChild(td)
          }

          if(Object.hasOwn(previsione.PROBPREC, '__text'))
            {
              let tr = document.createElement("tr")
              tabella_tbody.appendChild(tr)
      
              let th = document.createElement("th")
              th.textContent = "probabilità pioggia: "
              tr.appendChild(th)
      
              let td = document.createElement("td")
              td.textContent = previsione.PROBPREC.__text
              tr.appendChild(td)
            }

            if(Object.hasOwn(previsione.QNEVE, '__text'))
              {
                let tr = document.createElement("tr")
                tabella_tbody.appendChild(tr)
        
                let th = document.createElement("th")
                th.textContent = "neve prevista: "
                tr.appendChild(th)
        
                let td = document.createElement("td")
                td.textContent = previsione.QNEVE.__text
                tr.appendChild(td)
              }
      //Object.hasOwn(object, ‘prop’)

      console.log(previsione)
      
      div.appendChild(tabella)

      }
    }
  




  function loadOpzioni() //funzione per caricare la lista completa delle opzioni
  {
    opzioniZone = []
    for(let previsione of forecast.previsioni.meteogrammi.meteogramma)
    {
      if(!opzioniZone.includes(previsione._zoneid))
      {
        let opt = document.createElement("option")
        opt.textContent = previsione._name
        opt.value = previsione._zoneid
        opzioniZone.push(opt)
      }
    }
    console.log(opzioniZone)

    for(let zona of opzioniZone)
    {
      selZona.appendChild(zona)
    }
  }

  function changeText(){
    intestazione.innerHTML = selZona.options[selZona.selectedIndex].textContent
  }

  getRemoteData();

