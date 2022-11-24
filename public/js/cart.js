fetch("/api/products/")
  .then((res) => res.json())
  .then((products) => {
    const BtnGetId = (products) => {
      products.forEach((prod) => {
        const button = document.getElementById(`${prod.id}`);
        button.addEventListener("click", () => {
          addCart(prod.id);
        });
      });
    };
    BtnGetId(products);

    const addCart = (id) => {
      const matchObj = products.find((prod) => prod.id === id);
      console.log(matchObj);
      fetch(`/api/cart/220005/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(matchObj),
      });
      location.reload();
    };
  });

fetch("/api/cart/220005/products")
  .then((res) => res.json())
  .then((prods) => {
    const cartView = document.getElementById("cartView");
    cartView.innerHTML = "";
    prods.forEach((prod) => {
      const div = document.createElement("div");
      div.classList.add("d-flex");
      div.innerHTML += `
                             <div class="card m-1" style="width: 18rem;">
                                 <div class="card-body">
                                     <h5 class="card-title">${prod.name} id: ${prod.id}</h5>
                                     <p class="card-text">Precio$${prod.price}</p>
                                 </div>
                                 <button type="submit" class="btn btn-danger" id="${prod.id}a">Eliminar del Carrito</button>
                             </div>
                              `;
      cartView.appendChild(div);
    });
    const BtnDeleteOfCartId = (prods) => {
      prods.forEach((prod) => {
        const button = document.getElementById(`${prod.id}a`);

        button.addEventListener("click", () => {
          deleteProdOfCart(prod.id);
        });
      });
    };
    BtnDeleteOfCartId(prods);
    const deleteProdOfCart = (id) => {
      fetch(`/api/cart/220005/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      location.reload();
    };
  });
