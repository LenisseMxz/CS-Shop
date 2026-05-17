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