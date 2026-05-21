// Divs principales
let message = document.getElementById("message");
let main = document.getElementById("main");

// Botones del navegador
const btnProducts = document.getElementById("btn-products");
const btnHome = document.getElementById("btn-home");
const btnShoppingCart = document.getElementById("btn-shoppingcart");

// Función de añadir al carrito
function add(id, price) {
    let productId = id;
    let productQuantity = document.getElementById("product-quantity").value;
    let productPrice = price;

    // fetch POST

    message.style.visibility = "visible";
    message.innerHTML = `<p style="color: #362317";>${"The product has been added to the shopping cart"}</p>`;

    message.animate([
        {opacity: 0},
        {opacity: 1}
    ], {
        duration: 500,
        easing: "ease-in"
    });
    
    setTimeout(() => {
        message.animate([
            {opacity: 1},
            {opacity: 0}
        ], {
            duration: 500,
            easing: "ease-out"
        });
    }, 3000);

    setTimeout(() => {
        message.innerHTML = "";
        message.style.visibility = "hidden";
    }, 3500)
}

// Botón de página principal
btnHome.addEventListener("click", () => {
    main.removeAttribute("class");
    main.innerHTML = "";
    main.innerHTML = `
                        <h3>Welcome to CS Shop</h3>
                        <p>Wanna be pretty? in CS Shop you can find a wide variety of high-quality beauty products.</p>
                        <div id="home-frame">
                            <img id="home-img" src="./media/Front-page.jpeg" alt="Front page">
                        </div>
                        `;
}) 

// Botón de productos
btnProducts.addEventListener("click", () => {
    // fetch("http://localhost:3000/cs-shop/products")
    // .then(res => res.json())
    // .then(products => {
    //     products.forEach(product => {})
    // })

    main.setAttribute("class", "row-wrap");
    main.innerHTML = "";
    main.innerHTML += `
                    <div class="div-products">
                        <h4>${"My Foundation"}</h4>
                        <img class="img-products" src=${"./media/Foundation.jpeg"} alt=${"My Foundation"}>
                        <p>${"$20"}</p>
                        <p>${"Expensive Foundation"}</p>
                        <input type="number" id="product-quantity" class="input-products" name="product-quantity" min="1" max="5"></input>   
                        <button type="button" onclick="add('product${1}', ${20})" class="btn-products">Add</button>
                    </div>
                    `;
})

// Botón de carrito de compra
btnShoppingCart.addEventListener("click", () => {
    // fetch GET
    main.removeAttribute("class");
    main.innerHTML = "";
    main.innerHTML += `<div id="sc-main-frame">
                            <div class="row">
                                <img id="sc-image" src=${"./media/Foundation.jpeg"} alt=${"My Foundation"}>
                                <div id="sc-main-text">
                                    <h5>${"My Foundation"}</h5>
                                    <p class="text-sc-content">${"Expensive Foundation"}</p>
                                </div>
                                <input type="number" id="sc-quantity" class="sc-input-products" name="scQuantity" min="1" max="5"></input>
                            </div>
                        </div>
                        <div id="sc-secondary-frame">
                            <h3>Total</h3>
                            <p>${"$20"}</p>
                            <button type="button" class="btn-sc">Buy</button>
                        </div>
                        `;
})

