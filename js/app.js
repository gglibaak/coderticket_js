



//Asignamos desde el archivo json mediante fetch
const getJSONdata = ()=> {
    fetch("../data/data.json")
        .then((res) => res.json())
        .then((data)=> putJSONdata(data))
        .catch((err)=> console.log("Flag: ",err))
}

// Recorremos el json obtenido y lo asignamos a listEvents para luego ser guardado en el localStorage
const putJSONdata = (events) => {
       const listEvents = []
    events.forEach((a)=> {
        
        listEvents.push(a)
    })
             
    const listJson = JSON.stringify(listEvents)
    
    localStorage.setItem("eventList", listJson)
}

//Inicio
window.onload = getJSONdata();

// Impresión de datos en el dom
const parseList = JSON.parse(localStorage.getItem("eventList"))
        
        //Recorrido del Array e impresión       
        for (const event of parseList) {            
                      
           const eventDiv = document.querySelector(".eventos");
           let list = document.createElement("div")
          
            list.innerHTML = `
            <div class="eventos__cards">
                <div class="${event.imgSrc}">
                    <div class="eventos__cards--info">
                    <p class="eventos__cards--title">${event.bandName}</p>
                    <p class="eventos__cards--date">${event.dayHour}</p>
                    <p class="eventos__cards--place">${event.place}</p>
                    <a href="./pages/eventSeats.html" value="${event.id}" " onclick="saveSelection(${event.id})" class="eventos__cards--button">comprar tickets</a>        
                    </div>
                </div>
            </div>
            `           
            eventDiv.appendChild(list)
        }

//Guardamos la selección del evento
function saveSelection(e) {    
    localStorage.setItem("eventSelection", e)
    // console.log(e);
}

    
  
