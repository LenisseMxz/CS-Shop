const imgFrontPage = document.getElementById("img-front-page");
const btnLeftSlide = document.getElementById("btn-left-slide");
const btnRightSlide = document.getElementById("btn-right-slide");

const myImages = ["./media/Front-page1.jpeg", "./media/Front-page2.png", "./media/Front-page3.png"]
let image = 0;

btnLeftSlide.addEventListener("click", () => {

    if (image > -2) {
        image--;
        if (image > 0) {
            imgFrontPage.setAttribute("src", myImages[image]);
        } else {
            image = -1 * (image)
            imgFrontPage.setAttribute("src", myImages[image]);
            image = -1 * (image)
        }
    } else {
        image = 0;
        imgFrontPage.setAttribute("src", myImages[image]);
    }
})

btnRightSlide.addEventListener("click", () => {

    if (image < 2) {
        image++;
        if (image < 0) {
            image = -1 * (image)
            imgFrontPage.setAttribute("src", myImages[image]);
            image = -1 * (image)
        } else {
          imgFrontPage.setAttribute("src", myImages[image]);
        }
    } else {
        image = 0;
        imgFrontPage.setAttribute("src", myImages[image]);
    }
})