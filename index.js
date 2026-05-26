// Variables auxiliares
let userToken = null;
let userOrderId = null; // NO SE AUN xd

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

    // Añadir un producto al carrito
    fetch("http://localhost:3000/api/order-details", { // Falta ruta para añadir el producto al pedido, supongo que a detalles de pedido ya que es producto por producto y este se enlaza al pedido en general
        method: "POST",
        headers: {
            "Authorization": `Bearer ${userToken}`, // Se envia el token para confirmar acción
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            orderId: userOrderId, // Lo manejo desde aqui para hacer referencia al pedido actual pero no se si haya otra forma xd help.
            productId: productId,
            quantity: productQuantity,
            price: productPrice
        })
    })
    .then(res => res.json())
    .then(detail => {
        console.log(detail);
        if (detail == "Conseguido!") { // Si se añadió el producto
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
    });
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
                                                <button type="button" onclick="add(${product.id}, ${product.price})" class="btn-products">Add</button>
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
                                                <button type="button" onclick="add(${product.id}, ${product.price})" class="btn-products">Add</button>
                                            </div>
                                            `;
        });
    })
})

// Botón de carrito de compra
btnShoppingCart.addEventListener("click", () => { // Necesito poder obtener mis productos del pedido actual. Supongo que se haria un obtener pedidos (el pedido actual) y de ahi los detalles del pedido.
    main.innerHTML = "";
    main.innerHTML += `<div id="sc-main-frame">
                            <div id=${1} class="row">
                                <img id="sc-image" src=${"./media/Foundation.jpeg"} alt=${"My Foundation"}>
                                <div id="sc-main-text">
                                    <h5>${"My Foundation"}</h5>
                                    <p class="text-sc-content">${"Expensive Foundation"}</p>
                                </div>
                            </div>
                        </div>
                        <div id="sc-secondary-frame">
                            <h3>Total</h3>
                            <p id="total">${20}</p>
                            <button type="button" class="btn-sc">Buy</button>
                        </div>
                        `;

    const mainFrame = document.getElementById("sc-main-frame");
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