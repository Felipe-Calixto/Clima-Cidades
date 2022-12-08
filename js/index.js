const apiFlag = "https://countryflagsapi.com/png/";
const apiKey = "f1665e5a0b55549dd40a5a617dc9fe4e";
const btn = document.querySelector("#btn-search");
const inputCity = document.querySelector("#input-city");
const cityText = document.querySelector("#city-conteiner h1");
const flag = document.querySelector("#country");
const temp = document.querySelector("#temperatura");
const tempImg = document.querySelector("#temp-img");
const vento = document.querySelector("#vento-conteiner span");
const umidade = document.querySelector("#umidade-conteiner span");
const conteiner = document.querySelector("#infs-conteiner");
const load = document.querySelector("#box-load");
const erroText = document.querySelector("#error");


//FUNCTIONS//

const getItensApi = async (city)=> {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    const resp = await fetch(apiUrl);
    const data = await resp.json();

    console.log(data)

    if(data.cod == 404) {
        load.style = "display: none";
        conteiner.classList.add("hide");
        erroText.classList.remove("hide");

        setTimeout(() => {
            erroText.classList.add("hide");      
        }, 2000);

    }

    return data;
}

const alterItens =  async (city)=> {
    const data = await getItensApi(city);

    cityText.textContent = data.name;
    flag.src = `https://countryflagsapi.com/png/${data.sys.country}`
    temp.textContent = parseInt(data.main.temp);
    tempImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    vento.textContent = `${data.wind.speed}Km/h`;
    umidade.textContent = `${data.main.humidity}%`
    
    if(cityText != "undefined" && temp != "undefined" && vento != "undefined" && umidade != "undefined") {
        load.style = "display: none";
        conteiner.classList.remove("hide");
    }
}

const loading = ()=> {

    load.style = "display: flex";
    conteiner.classList.add("hide");

}


//EVENTS

btn.addEventListener("click", (event)=> {

    event.preventDefault();

    const city = inputCity.value;
    alterItens(city);
    inputCity.value = "";
    loading();

});
    
