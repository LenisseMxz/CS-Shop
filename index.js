// Variables auxiliares
let userToken = null;
let shoppingCart = [];

// Divs principales
let message = document.getElementById("message");
let main = document.getElementById("main");

// Botones del navegador
const btnProducts = document.getElementById("btn-products");
const btnHome = document.getElementById("btn-home");
const btnShoppingCart = document.getElementById("btn-shoppingcart");
const btnAccount = document.getElementById("btn-account");

<<<<<<< HEAD
// Función de añadir al carrito
function add(name, price, description) {
    quantity = document.getElementById("product-quantity").value;

    const product = {
        name: name,
        price: price,
        description: description,
        quantity: quantity
    };
=======

async function add(id, price) {
    let productId = id;
    let productQuantity = document.getElementById("product-quantity").value;
    let productPrice = price;

>>>>>>> origin/Ale

    shoppingCart.push(product);

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
    }, 3500);
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

        main.innerHTML = "";

        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                useF: username,
                password: password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message == "Login exitoso") {
                fetch(`http://localhost:3000/api/clients/`) // Falta ruta para obtener un usuario determinado
                .then(res => res.json())
                .then(userData => {
                    console.log(userData);
                    userToken = userData.token;

                    main.innerHTML += `<div id="account-main-frame">
                                        <h3>${userData.user}</h3>
                                        </div>
                                        `;

                    
                    fetch(`http://localhost:3000/api/orders`, {
                        headers: {
                            "Authorization": `Bearer ${userToken}` // Paso el token para obtener los pedidos
                        },
                    })
                    .then(res => res.json())
                    .then(orders => {
                        console.log(orders);
                        orders.forEach(order => { // Imprime los pedidos que tenga el usuario
                            main.innerHTML += `
                                                <div id="account-secondary-frame">
                                                    <h4>Order History</h4>
                                                    <div class="row">
                                                        <div id="sc-main-text">
                                                            <h5>${"24-05-2026"}</h5>
                                                            <p class="text-sc-content">$${450}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                `;
                        })
                    });
                });
            }
        });
    })
}

function register() {
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
                            <div class="div-account-container">
                                <label>Repeat Password: </label>
                                <input type="password" id="repeat-password" class="input-account" name="repeat-password"></input>
                            </div>
                            <button type="button" id="btn-register" class="btn-account">Register</button>
                        </div>
                        `;

    const btnRegister = document.getElementById("btn-register");

    btnRegister.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const repeatPassword = document.getElementById("repeat-password").value;
        
        console.log(username, password, repeatPassword);

        fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                user: username,
                password: password,
                confirmPassword: repeatPassword
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.message == "usuario registrado") {
                login(); // Entra para iniciar la sesion en automatico
            }
        })
    })
}

// Botón de página principal
btnHome.addEventListener("click", () => {
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
    main.innerHTML = "";
    main.innerHTML += `
                        <input type="text" id="product-search" class="input-products" name="product-search" placeholder="Search product"></input>
                        <div id="products-container" class="row-wrap"></div>
                        `;

    const productsContainer = document.getElementById("products-container");

    fetch('http://localhost:3000/api/products', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${userToken}` // Paso el token para obtener los productos
        },
    })
    .then(res => res.json())
    .then(products => {
        console.log(products);
        products.forEach(product => {
            productsContainer.innerHTML += `                  
                                            <div class="div-products">
                                                <h4>${product.name}</h4>
                                                <img class="img-products" src=${"./media/Foundation.jpeg"} alt=${product.name}>
                                                <p>${product.price}</p>
                                                <p>${product.description}</p>
                                                <input type="number" id="product-quantity" class="input-products" name="product-quantity" value="1" min="1"></input>   
                                                <button type="button" onclick="add(${product.name}, ${product.price}, ${product.description})" class="btn-products">Add</button>
                                            </div>
                                            `;
        })
    });

    const productSearcher = document.getElementById("product-search");

    productSearcher.addEventListener("input", (e) => {
        const query = e.target.value;

        fetch(`http://localhost:3000/api/products/search?name=${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${userToken}` // Paso el token para la busqueda de productos
            },
        })
        .then(res => res.json())
        .then(product => {
            console.log(product);
            productsContainer.innerHTML = "";
            productsContainer.innerHTML = `
                                            <div class="div-products">
                                                <h4>${product.name}</h4>
                                                <img class="img-products" src=${"./media/Foundation.jpeg"} alt=${product.name}>
                                                <p>${product.price}</p>
                                                <p>${product.description}</p>
                                                <input type="number" id="product-quantity" class="input-products" name="product-quantity" value="1" min="1"></input>   
                                                <button type="button" onclick="add(${product.name}, ${product.price}, ${product.description})" class="btn-products">Add</button>
                                            </div>
                                            `;
        });
    })
})

// Botón de carrito de compra
btnShoppingCart.addEventListener("click", () => {
    main.innerHTML = "";
    main.innerHTML += `<div id="sc-main-frame"></div>
                        <div id="sc-secondary-frame">
                            <h3>Total</h3>
                            <p id="total-quantity">0</p>
                            <button type="button" class="btn-sc">Buy</button>
                        </div>
                        `;

    const mainFrame = document.getElementById("sc-main-frame");
    const totalQuantity = document.getElementById("total-quantity");

    let total = 0;

    shoppingCart.forEach(product => {
        total += product.price * product.quantity;

        mainFrame.innerHTML += `
                                <div class="row">
                                    <img id="sc-image" src=${"./media/Foundation.jpeg"} alt=${product.name}>
                                    <div id="sc-main-text">
                                        <h5>${product.name}</h5>
                                        <p class="text-sc-content">${product.description}</p>
                                    </div>
                                </div>
                                `;
    })

    totalQuantity.innerHTML = total;
})

// Botón del perfil de usuario
btnAccount.addEventListener("click", () => {
    main.innerHTML = "";
    main.innerHTML += `<div id="account-main-frame">
                            <button type="Button" onclick="login()" class="btn-account">Login</button>
                            <button type="Button" onclick="register()" class="btn-account">Register</button>
                        </div>
                        `;
})