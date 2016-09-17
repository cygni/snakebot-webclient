const squareImg1 = new Image();
squareImg1.onload = function () {
    console.log("Loaded squareImg1");
};
squareImg1.src = "img/ruta/ruta-1.svg";

const squareImg2 = new Image();
squareImg2.onload = function () {
    console.log("Loaded squareImg2");
};
squareImg2.src = "img/ruta/ruta-2.svg";

const starImg = new Image();
starImg.onload = function () {
    console.log("Loaded starImg");
};
starImg.src = "img/star/star.svg";

const snakeHeadBlueImg = new Image();
snakeHeadBlueImg.onload = function () {
    console.log("Loaded snakeHeadBlueImg");
};
snakeHeadBlueImg.src = "img/Snakes/blue/Blue-0ebde7-head.png";

const snakeHeadBlueDownImg = new Image();
snakeHeadBlueDownImg.onload = function () {
    console.log("Loaded snakeHeadBlueDownImg");
};
snakeHeadBlueDownImg.src = "img/Snakes/blue/Blue-0ebde7-head_down.png";

const snakeHeadBlueRightImg = new Image();
snakeHeadBlueRightImg.onload = function () {
    console.log("Loaded snakeHeadBlueImg");
};
snakeHeadBlueRightImg.src = "img/Snakes/blue/Blue-0ebde7-head_right.png";

const snakeHeadBlueLeftImg = new Image();
snakeHeadBlueLeftImg.onload = function () {
    console.log("Loaded snakeHeadBlueImg");
};
snakeHeadBlueLeftImg.src = "img/Snakes/blue/Blue-0ebde7-head_left.png";

const snakeHeadGreenImg = new Image();
snakeHeadGreenImg.onload = function () {
    console.log("Loaded snakeHeadGreenImg");
};
snakeHeadGreenImg.src = "img/Snakes/green/Green-3cc321-head.png";

const snakeHeadOrangeImg = new Image();
snakeHeadOrangeImg.onload = function () {
    console.log("Loaded snakeHeadOrangeImg");
};
snakeHeadOrangeImg.src = "img/Snakes/orange/Orange-ff8f35-head.png";

const snakeHeadYellowImg = new Image();
snakeHeadYellowImg.onload = function () {
    console.log("Loaded snakeHeadYellowImg");
};
snakeHeadYellowImg.src = "img/Snakes/yellow/Yellow-ffdf4a-head.png";

export default {
    SQUARE_1: squareImg1,
    SQUARE_2: squareImg2,
    STAR: starImg,
    SNAKE_HEAD_BLUE: snakeHeadBlueImg,
    SNAKE_HEAD_BLUE_DOWN: snakeHeadBlueDownImg,
    SNAKE_HEAD_BLUE_RIGHT: snakeHeadBlueRightImg,
    SNAKE_HEAD_BLUE_LEFT: snakeHeadBlueLeftImg,
    SNAKE_HEAD_GREEN: snakeHeadGreenImg,
    SNAKE_HEAD_ORANGE: snakeHeadOrangeImg,
    SNAKE_HEAD_YELLOW: snakeHeadYellowImg
}