function changeTitle(text) {
    document.title = text
}


function createImage(url){
 const image = document.createElement("img")
 image.classList.add("card-image")
 image.src = url
 return image
}

function createTitle(text) {
    const title = document.createElement("h4")
    title.innerHTML = text
    return title
}


function createParagraph(text) {
const p = document.createElement("p")
p.classList.add("card-paragraph")
p.innerHTML = text
return p
}

function createCard({thumbnail, title, description}) { 
    const card = document.createElement("div")
    card.classList.add("card")
    card.appendChild(createImage(thumbnail))
    card.appendChild(createTitle(title))
    card.appendChild(createParagraph(description))
    card.addEventListener("click", () => {
       changeTitle(title)
    })
    return card
}

function addProduct(child, id){
   const section = document.getElementById(id)
   section.appendChild(child)
}

async function listProducts(){
   const res = await fetch("https://dummyjson.com/products")
   const body = await res.json()
   body.products.forEach(product =>  addProduct(createCard(product), "products"))
}

async function listCategories() {
   const res = await fetch("https://dummyjson.com/products/categories")
   const body = await res.json()
   body.forEach(category => addProduct(createTitle(category), "categories"))
}

  
//Esto nos devuelve lista de todos los productos
async function getCategories() {

      let categoriasVistas = []
      const response = await fetch("https://dummyjson.com/products")
      const listCategories = await response.json()
      const listaFinal = listCategories.products
          .map(product => {
              return {
                  name: product.category,
                  image: product.thumbnail
              }
          }) 
           .filter(category => {
              if (categoriasVistas.includes(category.name)) {
                  return false
              }

              categoriasVistas.push(category.name)
              return true
          }) 
           .forEach(category => showCategories(category))
      console.log(listaFinal)
}
  

  

//listCategories()
getCategories()
listProducts()