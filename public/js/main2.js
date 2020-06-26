var slider = document.getElementById('myRange');
var output = document.getElementById('value');

output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
};

slider.addEventListener('mousemove', function () {
  var x = slider.value * 12;
  var color = 'linear-gradient(90deg, rgb(255,255,0)' + x + '%, rgb(214,214,214)' + x + '%)';

  slider.style.background = color;
}
);
