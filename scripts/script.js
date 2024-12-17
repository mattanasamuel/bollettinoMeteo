
var forecast; //oggetto contenente il bollettino meteo
const elenco = document.getElementById("elenco");
const selZona = document.getElementById("sel-zona");
var requestURL = "json/bollettino-2024-12-16.json";
selZona.addEventListener("change", getRemoteData);
var selectZona = document.getElementById("sel-zona")
var opzioniZone = []
var bollettiniZone = []
var contenitore = document.getElementById("previsioni")



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
    loadData();
    
    //(opzionale) caricamento dinamico delle zone
  
  }



  function loadData(){
    //riempimento zone dinamico
    loadOpzioni()
    loadBollettini()
  }

  function loadBollettini()
  {
    for(let bollettino of forecast.previsioni.meteogrammi.meteogramma)
    {
      if(bollettino._zoneid == selectZona.value)
      {
        console.log(bollettino)
        createSection(bollettino)
        
      }
    }


  }


  function createSection(variable)
  {
    contenitore.innerHTML = ""
    for(let previsione of variable.scadenza)
    {
      let div = document.createElement("div")
      contenitore.appendChild(div)
      let data = document.createElement("h4")
      data.textContent = previsione._data
      div.appendChild(data)
      console.log(data)
      
      let immagine = document.createElement("img")
      immagine.src = previsione.SIMBOLO.__text
      div.appendChild(immagine)
      

      let tabella = document.createElement("table")
      let tabella_tbody = document.createElement("tbody")
      tabella.appendChild(tabella_tbody)
      tabella.classList.add("table-striped")
      
      let tabella_tbody_cielo = document.createElement("th")
      let tabella_tbody_cielo_value = document.createElement("td")
      tabella_tbody_cielo.textContent = "CIELO"
      tabella_tbody_cielo_value.textContent = previsione.CIELO.__text
      tabella_tbody.appendChild(tabella_tbody_cielo)
      tabella_tbody.appendChild(tabella_tbody_cielo_value)

      let tabella_tbody_precipitazione = document.createElement("th")
      let tabella_tbody_precipitazione_value = document.createElement("td")
      tabella_tbody_precipitazione.textContent = "CIELO"
      tabella_tbody_precipitazione_value.textContent = previsione.CIELO.__text
      tabella_tbody.appendChild(tabella_tbody_precipitazione)
      tabella_tbody.appendChild(tabella_tbody_precipitazione_value)


      div.appendChild(tabella)
      
      




      
      /*
      let section = document.createElement("section")
      contenitore.appendChild(section)
      let tabella = document.createElement("table")
      section.appendChild(tabella);
      for(let parametro of previsione)
      {
        let tabella_tr = document.createElement("tr")
        let tabella_tr_th = document.createElement("th")
        tabella_tr_th.textContent = parametro._title
        

      }*/








    }
  }




  function loadOpzioni() //funzione per caricare la lista completa delle opzioni
  {
    opzioniZone = []
    for(let previsione of forecast.previsioni.meteogrammi.meteogramma)
    {
      if(!opzioniZone.includes(previsione._zoneid))
      {
        opzioniZone.push(previsione._zoneid)
      }
    }
    console.log(opzioniZone)

    for(let zona of opzioniZone)
    {
      let opt = document.createElement("option")
      opt.textContent = zona
      opt.value = zona
      selectZona.appendChild(opt)
    }
  }


  
  
  //carica le previsioni della zona selezionata
  function loadForecast(){
    //TODO
  }

  getRemoteData();

