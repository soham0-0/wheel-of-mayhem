(function() {
  let color    = ['#ca7','#7ac','#77c'];
  let label = ['stuff0', 'stuff1', 'stuff2', 'stuff3', 'stuff4', 'stuff5'];
  let slices   = label.length;
  let sliceDeg = 360/slices, px=30; // px => font size
  let deg      = 0;
  let modd   = (slices%2)?(3):(2);
  let ctx    = canvas.getContext('2d');
  let width  = canvas.width; // size
  let center = width/2;      // center
  function deg2rad(deg){ return deg * Math.PI/180; }

  function drawSlice(deg, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(center, center);
    ctx.arc(center, center, width/2, deg2rad(deg), deg2rad(deg+sliceDeg));
    ctx.lineTo(center, center);
    ctx.fill();
  }

  function drawText(deg, text) {
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(deg2rad(deg));
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${px}px sans-serif`;
    ctx.fillText(text, 220, 5);
    ctx.restore();
  }

  for(let i=0; i<slices; i++){
    drawSlice(deg, color[i%modd]);
    drawText(deg+sliceDeg/2, label[i]);
    deg += sliceDeg;
  }
  const wheel = document.querySelector('.wheel');
  const startButton = document.querySelector('.wheel');
  wheel.style.transform = `rotate(${-90}deg)`
  deg = 0;
  startButton.addEventListener('click', () => {
    startButton.style.pointerEvents = 'none';
    deg = Math.floor(5000 + Math.random()*5000);
    wheel.style.transition = 'all 5s ease-out';
    wheel.style.transform = `rotate(${deg}deg)`;
    wheel.classList.add('blur');
  });

  wheel.addEventListener('transitionend', () => {
    let elem = document.querySelector('#text');
    wheel.classList.remove('blur');
    startButton.style.pointerEvents = 'auto';
    wheel.style.transition = 'none';
    const actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    console.log(slices-Math.floor((actualDeg+90)/(360/slices)));
    let selection = label[slices-Math.floor((actualDeg+90)/(360/slices))-1];
    document.getElementById('text').innerHTML = selection;
    elem.setAttribute("data-heading", selection);
  });
})();
