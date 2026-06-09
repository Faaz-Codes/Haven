window.Selah.createAmbientBackground('bg', {
  pointCount: 45,
  palette: { start: '#203A58', middle: '#264864', end: '#75564D', glow: 'rgba(219,175,138,0.08)' },
  gradientWidth: 0.35,
  glowX: 0.72,
  glowY: 0.55,
  glowRadius: 0.38,
});

/* CANDLE */
const cc=document.getElementById('candle-canvas');const cx=cc.getContext('2d');
cc.width=80;cc.height=100;
let flicker=0;
function drawCandle(){
  cx.clearRect(0,0,80,100);
  flicker+=.05;
  const f=Math.sin(flicker)*2.5+Math.sin(flicker*1.7)*1.5;

  // Flame glow
  const gl=cx.createRadialGradient(40,32+f*.4,0,40,35,28);
  gl.addColorStop(0,'rgba(219,175,138,0.55)');
  gl.addColorStop(.4,'rgba(219,175,138,0.15)');
  gl.addColorStop(1,'transparent');
  cx.fillStyle=gl;cx.beginPath();cx.arc(40,35,28,0,Math.PI*2);cx.fill();

  // Flame body
  cx.beginPath();
  cx.moveTo(40,15+f*.5);
  cx.bezierCurveTo(44,22,47,28+f*.3,40,40);
  cx.bezierCurveTo(33,28+f*.3,36,22,40,15+f*.5);
  cx.fillStyle='rgba(219,175,138,0.85)';cx.fill();

  // Flame inner
  cx.beginPath();
  cx.moveTo(40,20+f*.4);
  cx.bezierCurveTo(42,25,43,30+f*.2,40,38);
  cx.bezierCurveTo(37,30+f*.2,38,25,40,20+f*.4);
  cx.fillStyle='rgba(255,240,210,0.7)';cx.fill();

  // Wick
  cx.beginPath();cx.moveTo(40,40);cx.lineTo(40,46);
  cx.strokeStyle='rgba(255,255,255,0.3)';cx.lineWidth=1;cx.stroke();

  // Candle body
  const cg=cx.createLinearGradient(28,46,52,46);
  cg.addColorStop(0,'rgba(219,175,138,0.35)');
  cg.addColorStop(.5,'rgba(219,175,138,0.55)');
  cg.addColorStop(1,'rgba(219,175,138,0.25)');
  cx.fillStyle=cg;cx.beginPath();cx.roundRect(28,46,24,48,3);cx.fill();

  // Candle wax drip
  cx.fillStyle='rgba(219,175,138,0.20)';cx.beginPath();cx.ellipse(40,46,12,3,0,0,Math.PI*2);cx.fill();

  requestAnimationFrame(drawCandle);
}
drawCandle();

// Date
const d=new Date();
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
document.getElementById('prayer-date').textContent=`${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()} · Guidance`;

// Tags
document.querySelectorAll('.footer-tag').forEach(t=>{t.addEventListener('click',()=>t.classList.toggle('active'));});
document.querySelectorAll('.category-tag').forEach(t=>{t.addEventListener('click',()=>{document.querySelectorAll('.category-tag').forEach(x=>x.classList.remove('active'));t.classList.add('active');});});
