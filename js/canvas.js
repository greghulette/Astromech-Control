var canvas = document.querySelector("canvas");
// console.log(canvas);

canvas.height = 700;
canvas.width = 1100;

var c = canvas.getContext('2d');

function Circle(x, y, dx, dy, radius) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "red";
        c.stroke();

    }

    this.update = function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }


}

var circleArray = [];

for (var i = 0; i < 100; i++) {
    var radius = (Math.random() * 75);

    var x = Math.random() * (canvas.width);
    var dx = (Math.random() - 0.5) * 8;
    var y = Math.random() * (canvas.height);
    var dy = (Math.random() - 0.5) * 10;
    circleArray.push(new Circle(x, y, dx, dy, radius));

}


var circle = new Circle(x, y, dx, dy, radius);
var circle2 = new Circle(x, y, dx, dy, radius);



function animate() {
    requestAnimationFrame(animate);
    // console.log('testing')
    c.clearRect(0, 0, canvas.width, canvas.height);
    // circle.update();
    // circle2.update();
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

window.addEventListener('mousemove', function (event) {
    // console.log("Testingmouse");
})


animate();