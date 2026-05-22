// *USAR TOKEN PARA FETCH*
// CAMBIAR POSICION DE INPUTS DEL CONTENIDO AL CENTRO Y AÑADIR CANCELACION DE PRODUCTO EN CARRITO !!!
// Divs principales
let message = document.getElementById("message");
let main = document.getElementById("main");

// Botones del navegador
const btnProducts = document.getElementById("btn-products");
const btnHome = document.getElementById("btn-home");
const btnShoppingCart = document.getElementById("btn-shoppingcart");
const btnAccount = document.getElementById("btn-account");

// Función de añadir al carrito
function add(id, price) {
    const productId = id;
    const productQuantity = document.getElementById("product-quantity").value;
    const productPrice = price;

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

// Función para acceder
function login() {
    main.innerHTML = "";
    main.innerHTML += `<div id="account-main-frame">
                            <div class="div-account-container">
                                <label>Username: </label>
                                <input type="text" id="username" class="input-account" name="username"></input>
                            </div>
                            <div class="div-account-container">
                                <label>Password: </label>
                                <input type="password" id="password" class="input-account" name="password"></input>
                            </div>
                            <button type="button" id="btn-login" class="btn-account">Login</button>
                        </div>
                        `;

    const btnLogin = document.getElementById("btn-login");

    btnLogin.addEventListener("click", () => {
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        // fetch POST 

        main.innerHTML = "";
        main.innerHTML += `<div id="account-main-frame">
                            <h3>Me</h3>
                        </div>
                        <div id="account-secondary-frame">
                            <h4>Historial de pedidos</h4>
                        </div>
                        `;
    })
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
                                <input type="number" id="sc-quantity" class="input-sc" name="sc-quantity" min="1" max="5"></input>
                            </div>
                        </div>
                        <div id="sc-secondary-frame">
                            <h3>Total</h3>
                            <p>${"$20"}</p>
                            <button type="button" class="btn-sc">Buy</button>
                        </div>
                        `;
})

btnAccount.addEventListener("click", () => {
    // fetch POST
    main.removeAttribute("class");
    main.innerHTML = "";
    main.innerHTML += `<div id="account-main-frame">
                            <button type="Button" onclick="login()" class="btn-account">Login</button>
                            <button type="Button" onclick="register()" class="btn-account">Register</button>
                        </div>
                        `;
})