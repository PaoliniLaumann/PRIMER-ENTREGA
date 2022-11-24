fetch('/api/products/')
    .then(res => res.json())
    .then(products => {
        
        const cards = document.getElementById('cards')
        cards.innerHTML = ""
        products.forEach(prod => {
            const div = document.createElement('div')
            div.classList.add('d-flex')
            div.innerHTML += `
                            <div class="card m-1" style="width: 18rem;">
                                    <img src="${prod.img}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${prod.name} id: ${prod.id}</h5>
                                    <p class="card-text">Descripción:${prod.desc}</p>
                                    <p class="card-text">Stock: ${prod.stock}</p>
                                    <p class="card-text">Código${prod.code}</p>
                                    <p class="card-text">Precio$${prod.price}</p>
                                    <a id="${prod.id}" class="btn btn-primary">Agrega al Carrito</a>
                                </div>
                            </div>
                             `
            cards.appendChild(div)
        });

        const filters = document.getElementById('toFilter')
        filters.innerHTML= ""
        products.forEach(prod => {
            const div = document.createElement('div')
            div.classList.add('d-flex', 'mx-3')
            div.innerHTML += `
                             <button class="btn btn-success" id=${prod.id}b>${prod.name}</button>
                             `
            filters.appendChild(div)
        })
        const filterGetId = (products) => {
            products.forEach((prod) => {

                const button = document.getElementById(`${prod.id}b`)
                button.addEventListener('click', (e) => {
                    e.preventDefault()
                    console.log(prod.id);
                    filterProds(prod.id)
                })

            });
        }
        filterGetId(products)
     })



const filterProds = (id) =>{
    fetch(`/api/products/${id}`)
    .then(res => res.json())
    .then(products => {
        
        const cards = document.getElementById('cards')
        cards.innerHTML = ""
        products.forEach(prod => {
            const div = document.createElement('div')
            div.classList.add('d-flex')
            div.innerHTML += `
                            <div class="card m-1" style="width: 18rem;">
                                    <img src="" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${prod.name} id: ${prod.id}</h5>
                                    <p class="card-text">Descripción:${prod.desc}</p>
                                    <p class="card-text">Stock: ${prod.stock}</p>
                                    <p class="card-text">Código${prod.code}</p>
                                    <p class="card-text">Precio$${prod.price}</p>
                                    <a id="${prod.id}" class="btn btn-primary">Agrega al Carrito</a>
                                </div>
                            </div>
                             `
            cards.appendChild(div)
        });
     })
}


const btnModify = document.getElementById('btnModify')
btnModify.addEventListener('click', () =>{
    const formModify = document.getElementById('formModify') 
    const obj = {
         name: formModify.name.value,
         price: formModify.price.value, 
         desc: formModify.desc.value, 
         img: formModify.img.value, 
         stock: formModify.stock.value, 
         code: formModify.code.value
        }
    fetch(`/api/products/${Number(formModify.id.value)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
             admin: 'true'
        },
        body: JSON.stringify(obj)
    });
})

const btnAddProd = document.getElementById('btnAddProd')
btnAddProd.addEventListener('click', () =>{
    const formDescription = document.getElementById('formDescription') 
    const obj = {
         name: formDescription.name.value,
         price: formDescription.price.value, 
         desc: formDescription.desc.value, 
         img: formDescription.img.value, 
         stock: formDescription.stock.value, 
         code: formDescription.code.value
        }
    fetch(`/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
             admin: 'true'
        },
        body: JSON.stringify(obj)
    });
    location.reload()
})



     
const btnDelete = document.getElementById('btnDelete')    
const inputDelete = document.getElementById('inputDelete')

btnDelete.addEventListener('click', () =>{
    fetch(`/api/products/${inputDelete.value}`, {
            method: 'DELETE',
            headers:{
                admin: 'true'
            }
       });
       location.reload()
    
})






 

