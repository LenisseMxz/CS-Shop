let divMessage = document.getElementById("div-message");
let divMain = document.getElementById("div-main");

const btnProducts = document.getElementById("btn-products");
const btnHome = document.getElementById("btn-home");

const imgFrontPage = document.getElementById("img-front-page");
const btnLeftSlide = document.getElementById("btn-left-slide");
const btnRightSlide = document.getElementById("btn-right-slide");

const myImages = ["./media/Front-page1.jpeg", "./media/Front-page2.png", "./media/Front-page3.png"]
let image = 0;

setInterval(() => {
    imgFrontPage.animate([
        {opacity: 0},
        {opacity: 1}
    ], {
        duration: 1000,
        easing: "ease-in-out"
    })
    
    if (image >= 2) {
        image = 0;
        imgFrontPage.setAttribute("src", myImages[image]);
    } else if (image <= -2) {
        image++;
        image = -1 * image;
        imgFrontPage.setAttribute("src", myImages[image]);
        image = -1 * image;
    } else {
        image++;
        imgFrontPage.setAttribute("src", myImages[image]);
    }

}, 3000);

btnLeftSlide.addEventListener("click", () => {
    if (image <= -2) {
        image = 0;
        imgFrontPage.setAttribute("src", myImages[image]);
    } else {
        image--;
        image = -1 * image;
        imgFrontPage.setAttribute("src", myImages[image]);
        image = -1 * image;
    }
})

btnRightSlide.addEventListener("click", () => {
    if (image >= 2) {
        image = 0;
        imgFrontPage.setAttribute("src", myImages[image]);
    } else {
        image++;
        imgFrontPage.setAttribute("src", myImages[image]);
    }
})

btnHome.addEventListener("click", () => {
    divMain.removeAttribute("class");
    divMain.innerHTML = "";
    divMain.innerHTML = `
                        <h3>Welcome to CS Shop</h3>
                        <p>Wanna be pretty? in CS Shop you can find a wide variety of high-quality beauty products.</p>
                        <div class="div-img">
                            <div class="row">
                                <button id="btn-left-slide" class="btn-slide"><</button>
                                <img id="img-front-page" src="./media/Front-page1.jpeg" alt="Front page">
                                <button id="btn-right-slide" class="btn-slide">></button>
                            </div>
                        </div>
                        `;
}) 

btnProducts.addEventListener("click", () => {
    // fetch("http://localhost:3000/cs-shop/products")
    // .then(res => res.json())
    // .then(products => {
    //     products.forEach(product => {})
    // })

    divMain.setAttribute("class", "row-wrap");
    divMain.innerHTML = "";
    divMain.innerHTML += `
                        <div id="div-product${1}" class="div-products" style="width: 30%">
                            <h4>${"My Foundation"}</h4>
                            <img src=${"./media/Foundation.jpeg"} alt=${"My Foundation"} style="width: 50%">
                            <p>${"$20"}</p>
                            <p>${"Expensive Foundation"}</p>
                            <input type="number" id="input-quantity" class="input-products" name="quantity" min="1" max="5" value=""></input>   
                            <button type="button" id="btn-add" class="btn-others"onclick="add(1, 20)">Add</button>
                        </div>
                        `;
})

function add(id, price) {
    let productId = id;
    let productQuantity = document.getElementById("input-quantity").value;
    let productPrice = price;

    // fetch POST

    divMessage.style.visibility = "visible";
    divMessage.innerHTML = `<p style="color: #362317";>${"The product has been added to the shopping cart"}</p>`;

    divMessage.animate([
        {opacity: 0},
        {opacity: 1}
    ], {
        duration: 500,
        easing: "ease-in"
    });
    
    setTimeout(() => {
        divMessage.animate([
            {opacity: 1},
            {opacity: 0}
        ], {
            duration: 500,
            easing: "ease-out"
        });
    }, 3000);

    setTimeout(() => {
        divMessage.innerHTML = "";
        divMessage.style.visibility = "hidden";
    }, 3500)
}