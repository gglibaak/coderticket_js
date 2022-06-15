//Inicio

// Recupero de data
const parseList = JSON.parse(localStorage.getItem("eventList"))

const optSelect = localStorage.getItem("eventSelection"); 

const infoEvent = parseList.find( event => event.id == optSelect)

//Guardamos un nuevo objeto dependiendo la opción seleccionada (localStorage)
const spreadList = {...infoEvent}


//Plata Regenerable para testeo :D
let cashWallet = 3500
let creditWallet = 1500
let debitWallet = 2000


console.log( spreadList );

//Info
document.querySelector(".titulo--h1").textContent = spreadList.bandName + " @ " + spreadList.place ;
document.querySelector(".eventInfo--eventName span").textContent = spreadList.bandName;
document.querySelector(".eventInfo--eventPlace span").textContent = spreadList.place;
document.querySelector(".eventInfo--eventDate span").textContent = spreadList.dayHour;


// Seleccion de Butacas

const seatContainer = document.querySelector(".seatSelectorContainer")

const seatQty = []

seatContainer.addEventListener('click', seatElement => {
    if (
      seatElement.target.classList.contains('seatSelectorContainer--seat') &&
      !seatElement.target.classList.contains('seat-Sold') && 
      !seatElement.target.classList.contains('seat-Selected')

    ) {
        let b = seatElement.target.textContent 
         
        //Asignamos status a la butaca
         seatElement.target.classList.toggle('seat-Selected');

         seatQty.push(b) 

         Toastify({
          text: `Usted seleccionó la butaca ${b}`,
          style: {
            background: "linear-gradient(to right, #eb5e26, #CC3A01)",
          },
          offset: {
            x: 50,
            y: 80 
          },
        }).showToast(); 
       
    }
    else if (
      seatElement.target.classList.contains('seatSelectorContainer--seat') &&
      seatElement.target.classList.contains('seat-Selected')
      ){
        let c = seatElement.target.textContent               
        let index = seatQty.indexOf(c)
        if (index >= 0)
        seatQty.splice(index, 1)
        //Asignamos status a la butaca
        seatElement.target.classList.toggle('seat-Selected');  
        
        Toastify({
          text: `Usted a quitado la butaca ${c}`,
          style: {
            background: "linear-gradient(to right, #4245EE, #1820f7)",
          },
          offset: {
            x: 50,
            y: 80 
          },
        }).showToast(); 
    }
    updateInfo(); 
  });

  function updateInfo() {
    //Habilitamos la info de "Detalle de Selección"
    document.querySelector('.detail').style.display="block";
    document.querySelector('.detail--h3').style.display="block";
    document.querySelector('.detail--button').style.display="block";
     
    const selectedSeats = document.querySelectorAll('.seat-Selected');
  
    let selectedSeatsCount = selectedSeats.length;

    let subTotal = selectedSeatsCount*spreadList.price

    let servCharge = parseInt((subTotal * 10)/100) //10%
  
    document.querySelector(".detail--qty span").textContent = selectedSeatsCount;
    
    const seat = seatQty.map(function(s) {        
        return `Butaca: ${s}`       
    });

    document.querySelector(".detail--seat span").textContent = seat

    document.querySelector(".detail--Monto span").textContent = `$${subTotal}`

    document.querySelector(".detail--SC span").textContent = `$${servCharge}`

    document.querySelector(".detail--total span").textContent = `$${servCharge + subTotal}`
   
    
  }
 
  
//Comportamiento del boton de Confirmar Pago
document.querySelector('.detail--button').addEventListener('click', (e) => {
  e.preventDefault()

  if (seatQty.length > 0) {
    Toastify({
      text: `Por favor seleccione su forma de pago`,
      style: {
        background: "linear-gradient(to right, #00ea65, #00d358)",
      },
      offset: {
        x: 50,
        y: 80
      },
    }).showToast();

    document.querySelector('.payMethod--h3').style.display = "block";
    document.querySelector('.payMethod').style.display = "grid";    
    

  } else {
    Toastify({
      text: `La selección no puede ser nula`,
      style: {
        background: "linear-gradient(to right, #ed4250, #ff0015)",
      },
      offset: {
        x: 50,
        y: 80
      },
    }).showToast();
  }

})


document.querySelector('.payMethod--1').addEventListener('click', ()=> {

  const card = document.querySelector('.payMethod--1')
  
  let ele = document.querySelectorAll('.payMethod--selected')

    ele.forEach(element => {
      element.classList.remove("payMethod--selected")
    });

    card.classList.add("payMethod--selected");
    payMethodSelected(1);
  
  }
)

document.querySelector('.payMethod--2').addEventListener('click', ()=> {

  const card = document.querySelector('.payMethod--2')
  
  let ele = document.querySelectorAll('.payMethod--selected')

    ele.forEach(element => {
      element.classList.remove("payMethod--selected")
    });

    card.classList.add("payMethod--selected");
    payMethodSelected(2);
  }
)

document.querySelector('.payMethod--3').addEventListener('click', ()=> {

  const card = document.querySelector('.payMethod--3')
  
  let ele = document.querySelectorAll('.payMethod--selected')

    ele.forEach(element => {
      element.classList.remove("payMethod--selected")
    });

    card.classList.add("payMethod--selected");
    payMethodSelected(3);
  }
)

//Card Metodo de Pago precio
document.querySelector(".payMethod--Mount1").textContent = `$${cashWallet}`
document.querySelector(".payMethod--Mount2").textContent = `$${debitWallet}`
document.querySelector(".payMethod--Mount3").textContent = `$${creditWallet}`





function payMethodSelected(op) {
  
  switch (op) {
    case 1:
      Toastify({
        text: `Método de pago seleccionado: EFECTIVO`,
        style: {
          background: "linear-gradient(to right, #00ea65, #00d358)",
        },
        offset: {
          x: 50,
          y: 80
        },
      }).showToast();
      confirmPay(1);
      break;
    case 2:
      Toastify({
        text: `Método de pago seleccionado: DÉBITO`,
        style: {
          background: "linear-gradient(to right, #00ea65, #00d358)",
        },
        offset: {
          x: 50,
          y: 80
        },
      }).showToast();
      confirmPay(2);
      break;
    case 3:
      Toastify({
        text: `Método de pago seleccionado: CRÉDITO`,
        style: {
          background: "linear-gradient(to right, #00ea65, #00d358)",
        },
        offset: {
          x: 50,
          y: 80
        },
      }).showToast();    
      confirmPay(3);  
      break;
  }

}
  
 function confirmPay(c) {
  const selectedSeats = document.querySelectorAll('.seat-Selected');
  
    let selectedSeatsCount = selectedSeats.length;

    let subTotal = selectedSeatsCount*spreadList.price

    let servCharge = parseInt((subTotal * 10)/100) //10%

    let total = servCharge+subTotal

    switch(c) {
      case 1:
        Swal.fire({
          title: 'Detalle de Compra',
          html:
          `Monto a abonar: <b>$${total}</b> 
          <br>
          Saldo Disponible: <b> ${cashWallet}</b>`
          ,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#6fdf60',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Comprar',
          cancelButtonText: 'Cancelar Compra'
        }).then((result) => {
          if (result.isConfirmed) {
                            
            if (cashWallet < total) 
            {
              console.error("poca plata")
              Swal.fire(
                'Fondos Insuficientes!',
                'Lo lamentamos, por favor revisa tus fondos antes de volver a intentar ',
                'error'
              )
            }
            else {
              cashWallet -= total
              console.warn(cashWallet) 
    
              Swal.fire(
                'Compra Realizada con Éxito!',
                'Gracias por tu compra, podés revisar tus tickets en la sacción E-Tickets ',
                'success'
              )
    
              Toastify({
                text: `Saldo actual en Efectivo: $${cashWallet}`,
                style: {
                  background: "linear-gradient(to right, #d7ff3a, #b3e000)",
                },
                offset: {
                  x: 50,
                  y: 80
                },
              }).showToast();              
              
            }

            setTimeout(function(){
              location.reload();
          }, 4500);

            document.querySelector(".payMethod--Mount1").textContent = `$${cashWallet}`             
          }
        })
        break;
      case 2:
        Swal.fire({
          title: 'Detalle de Compra',
          html:
          `Monto a abonar: <b>$${total}</b> 
          <br>
          Saldo Disponible: <b> ${debitWallet}</b>`
          ,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#6fdf60',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Comprar',
          cancelButtonText: 'Cancelar Compra'
        }).then((result) => {
          if (result.isConfirmed) {
                            
            if (debitWallet < total) 
            {
              console.error("poca plata")
              Swal.fire(
                'Fondos Insuficientes!',
                'Lo lamentamos, por favor revisa tus fondos antes de volver a intentar ',
                'error'
              )
            }
            else {
              debitWallet -= total
              console.warn(debitWallet) 
    
              Swal.fire(
                'Compra Realizada con Éxito!',
                'Gracias por tu compra, podés revisar tus tickets en la sacción E-Tickets ',
                'success'
              )
    
              Toastify({
                text: `Saldo actual en Débito: $${debitWallet}`,
                style: {
                  background: "linear-gradient(to right, #d7ff3a, #b3e000)",
                },
                offset: {
                  x: 50,
                  y: 80
                },
              }).showToast();            
              
            }

            setTimeout(function(){
                  location.reload();
              }, 4500);
              
              document.querySelector(".payMethod--Mount2").textContent = `$${debitWallet}`                         
          }
        })
        break;

      case 3:
        Swal.fire({
          title: 'Detalle de Compra',
          html:
          `Monto a abonar: <b>$${total}</b> 
          <br>
          Saldo Disponible: <b> ${creditWallet}</b>`
          ,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#6fdf60',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Comprar',
          cancelButtonText: 'Cancelar Compra'
        }).then((result) => {
          if (result.isConfirmed) {
                            
            if (creditWallet < total) 
            {
              console.error("poca plata")
              Swal.fire(
                'Fondos Insuficientes!',
                'Lo lamentamos, por favor revisa tus fondos antes de volver a intentar ',
                'error'
              )
            }
            else {
              creditWallet -= total
              console.warn(creditWallet) 
    
              Swal.fire(
                'Compra Realizada con Éxito!',
                'Gracias por tu compra, podés revisar tus tickets en la sacción E-Tickets ',
                'success'
              )
    
              Toastify({
                text: `Saldo actual en Débito: $${creditWallet}`,
                style: {
                  background: "linear-gradient(to right, #d7ff3a, #b3e000)",
                },
                offset: {
                  x: 50,
                  y: 80
                },

              }).showToast();   
              setTimeout(function(){
                location.reload();
            }, 4500);
    
              document.querySelector(".payMethod--Mount3").textContent = `$${creditWallet}`         
              
            }
            
          }
        })
        break;
    }
   
    

    


 }
  
 





        
       


    
  
