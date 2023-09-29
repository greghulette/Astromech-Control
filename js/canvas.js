
var translatePos = {
    x: -500,
    y: -3750
};

draw(1, translatePos);
function draw(scale, translatePos) {
    var canvas = document.getElementById("myCanvas");
    canvas.height = 700;
    canvas.width = 1100;
    var context = canvas.getContext("2d");


    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(translatePos.x, translatePos.y);
    context.scale(scale, scale);

    var img = new Image
    img.src = '../Images/Wiring_Diagram/R2D2-Wiring-Diagram.png'

    context.drawImage(img, translatePos.x, translatePos.y, canvas.width, canvas.height * 2)

    // createImage()
    // var img = new Image 
    //     img.onload = ()=>{
    // context.drawImage(img, x, y, width, height)
    //     }
    //     var image = "";
    //     context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // context.beginPath(); // begin custom shape
    // context.moveTo(-119, -20);
    // context.bezierCurveTo(-159, 0, -159, 50, -59, 50);
    // context.bezierCurveTo(-39, 80, 31, 80, 51, 50);
    // context.bezierCurveTo(131, 50, 131, 20, 101, 0);
    // context.bezierCurveTo(141, -60, 81, -70, 51, -50);
    // context.bezierCurveTo(31, -95, -39, -80, -39, -50);
    // context.bezierCurveTo(-89, -95, -139, -80, -119, -20);
    // context.closePath(); // complete custom shape
    var grd = context.createLinearGradient(-59, -100, 81, 100);
    grd.addColorStop(0, "#8ED6FF"); // light blue
    grd.addColorStop(1, "#004CB3"); // dark blue
    context.fillStyle = grd;
    context.fill();

    context.lineWidth = 5;
    context.strokeStyle = "#0000ff";
    context.stroke();
    context.restore();
}
function createImage() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    canvas.height = 700;
    canvas.width = 1100;
    var width = canvas.width
    var height = canvas.height
    var x = 0
    var y = 0

    var img = new Image
    img.onload = () => {
        context.drawImage(img, x, y, width, height * 2)
    }
    img.src = '../Images/Wiring_Diagram/R2D2-Wiring-Diagram.png'
}


var initialize = (function () {
    var canvas = document.getElementById("myCanvas");

    createImage();
    var translatePos = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    var scale = 1.0;
    var scaleMultiplier = 0.8;
    var startDragOffset = {};
    var mouseDown = false;


    // add button event listeners
    document.getElementById("plus").addEventListener("click", function () {
        scale /= scaleMultiplier;
        draw(scale, translatePos);
    }, false);

    document.getElementById("minus").addEventListener("click", function () {
        scale *= scaleMultiplier;
        draw(scale, translatePos);
    }, false);

    // add event listeners to handle screen drag
    canvas.addEventListener("mousedown", function (evt) {
        mouseDown = true;
        startDragOffset.x = evt.clientX - translatePos.x;
        startDragOffset.y = evt.clientY - translatePos.y;
    });

    canvas.addEventListener("mouseup", function (evt) {
        mouseDown = false;
    });

    canvas.addEventListener("mouseover", function (evt) {
        mouseDown = false;
    });

    canvas.addEventListener("mouseout", function (evt) {
        mouseDown = false;
    });

    canvas.addEventListener("mousemove", function (evt) {
        if (mouseDown) {
            translatePos.x = evt.clientX - startDragOffset.x;
            translatePos.y = evt.clientY - startDragOffset.y;
            draw(scale, translatePos);
        }
    });

    draw(scale, translatePos);
}());
















// var canvas = document.querySelector("canvas");
// // console.log(canvas);

// canvas.height = 700;
// canvas.width = 1100;

// var c = canvas.getContext('2d');

// function Circle(x, y, dx, dy, radius) {

//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.radius = radius;
//     this.draw = function () {
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//         c.strokeStyle = "red";
//         c.stroke();

//     }

//     this.update = function () {
//         if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
//             this.dx = -this.dx;
//         }
//         if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
//             this.dy = -this.dy;
//         }
//         this.x += this.dx;
//         this.y += this.dy;

//         this.draw();
//     }


// }

// var circleArray = [];

// for (var i = 0; i < 100; i++) {
//     var radius = (Math.random() * 75);

//     var x = Math.random() * (canvas.width);
//     var dx = (Math.random() - 0.5) * 8;
//     var y = Math.random() * (canvas.height);
//     var dy = (Math.random() - 0.5) * 10;
//     circleArray.push(new Circle(x, y, dx, dy, radius));

// }


// var circle = new Circle(x, y, dx, dy, radius);
// var circle2 = new Circle(x, y, dx, dy, radius);



// function animate() {
//     requestAnimationFrame(animate);
//     // console.log('testing')
//     c.clearRect(0, 0, canvas.width, canvas.height);
//     // circle.update();
//     // circle2.update();
//     for (var i = 0; i < circleArray.length; i++) {
//         circleArray[i].update();
//     }

// }

// window.addEventListener('mousemove', function (event) {
//     // console.log("Testingmouse");
// })


// animate();

