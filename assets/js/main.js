//*URL Base
const baseURL = "https://ecommercebackend.fundamentos-29.repl.co/";
//* Dibujar productos en la web
const productsList = document.querySelector("#Products-container");
/** mostar y ocultar carrito */
const navToggle= document.querySelector( ".nav__button--toogle")
const navCar = document.querySelector(".nav__car");
//carro de compras
const car = document.querySelector("#car");
const carList = document.querySelector ("#car__list");


let carProducts = [] ;

navToggle.addEventListener("click", () => {
  navCar.classList.toggle("nav_car--visible")
})

eventListenersLoader()

function eventListenersLoader(){
  productsList.addEventListener("click", addProduct)
}

function getProducts(){
    axios.get(baseURL)
      .then((response) => {
        const products = response.data
        printProducts(products)
    })
      .catch((error) => {
        console.log(error)
      })
}
getProducts()

function printProducts(products){
    let HTML = '';
    for (let product of products ){
        HTML +=`
            <div class="products__element">
                <img src="${product.image}" alt="product__img" class="products__img">
                <p class="products__name">${product.name} </p>
                <div class="products__div">
                  <p class="products__price"> USD ${product.price.toFixed(2)} </p> 
                </div>
                <div class="products__div">
                  <button data-id="${product.id}" class="products__button add__car">
                    Add To Car 
                  </button>
                </div>
            </div>
        `
    }
    productsList.innerHTML = HTML
}
//agregar los producotr al carro//
function addProduct(event){
  if(event.target.classList.contains("add__car")){
    const product=event.target.parentElement.parentElement
      // console.log(product)
      carProductsElements(product)
  }
}

function carProductsElements(product){
  const infoProduct={
    id: product.querySelector('button').getAttribute('data-id'),
    image: product.querySelector('img').src,
    name: product.querySelector('.products__name').textContent,
    price: product.querySelector('.products__price').textContent,
    quantity: 1
  }
  if(carProducts.some(product=> product.id === infoProduct.id ) ){
    const productIncrement = carProducts.map(product=>{
      if(product.id === infoProduct.id){
        product.quantity++
        return product
      } else{
        return product}

    })
    carProducts= [...productIncrement]
  } else {
    carProducts= [...carProducts, infoProduct]
  }
  carElementsHTML();
  console.log(carProducts)
}
function carElementsHTML (){

  let carHTML= '';
  for(let product of carProducts){
        carHTML += `
        <div class="car__product">
            <div class="car__product__image">
              <img src="${product.image}">
            </div>
            <div class="car__product__description">
              <p>${product.name}</p>
              <p>Precio: ${product.price}</p>
              <p>Cantidad: ${product.quantity}</p>
            </div>
            <div class="car__product__button">
                <button class="delete__product" data-id="${product.id}">
                    Delete
                </button>
            </div>
        </div>
        <hr>
        `
    }
    carList.innerHTML = carHTML;
  
  let value = carProducts.length
  carCounter.innerHTML = `<p>${value}</p>`
  }

//* Eliminar productos del carrito
function deleteProduct(event) {
  if( event.target.classList.contains('delete__product') ){
      const productId = event.target.getAttribute('data-id')
      carProducts = carProducts.filter(product => product.id != productId)
      carElementsHTML()
  }
}

//* Vaciar el carrito
function emptyCar() {
  carProducts = [];
  carElementsHTML();
}

//* Ventana Modal
//* 1. Crear función que escuche el botón del producto.
function modalProduct(event) {
  if(event.target.classList.contains("products__details")){
      modalContainer.classList.add("show__modal")
      const product = event.target.parentElement.parentElement
      modalDetailsElement(product)
  }
}

//* 2. Crear función que escuche el botón de cierre.
function closeModal(event) {
  if(event.target.classList.contains("modal__icon")){
      modalContainer.classList.remove("show__modal")
  }
}

//* 3. Crear función que convierta la info HTML en objeto.
function modalDetailsElement(product) {

  const infoDatails = {
      id: product.querySelector('button').getAttribute('data-id'),
      image: product.querySelector('img').src,
      name: product.querySelector('p').textContent,
      price: product.querySelector('.products__div .products__price').textContent,
      description: product.querySelector('.products__details').getAttribute('data-description')
  }
  modalDetails = [ ...modalDetails, infoDatails ]
  modalHTML()
}

//* 4. Dibujar producto dentro del modal.
function modalHTML() {

  let detailsHTML = ""
  for( let element of modalDetails ) {
      detailsHTML = `
          <h2>${element.description}</h2>
          <img src="${element.image}">
      `
  }
  modalElement.innerHTML = detailsHTML
}