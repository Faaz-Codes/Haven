const canvas=document.getElementById('bg');
const ctx=canvas.getContext('2d');
function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
resize();window.addEventListener('resize',resize);
const particles=Array.from({length:55},()=>({
  x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,
  r:Math.random()*1.2+0.3,alpha:Math.random()*0.28+0.05,
  vx:(Math.random()-.5)*.1,vy:(Math.random()-.5)*.08-.03,
  pulse:Math.random()*Math.PI*2,ps:.008+Math.random()*.012,
  warm:Math.random()>.5
}));
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const g=ctx.createLinearGradient(0,0,canvas.width*.5,canvas.height);
  g.addColorStop(0,'#203A58');g.addColorStop(.6,'#2b4a68');g.addColorStop(1,'#6F8CA4');
  ctx.fillStyle=g;ctx.fillRect(0,0,canvas.width,canvas.height);
  const gl=ctx.createRadialGradient(canvas.width*.65,canvas.height*.2,0,canvas.width*.65,canvas.height*.2,canvas.width*.4);
  gl.addColorStop(0,'rgba(219,175,138,0.07)');gl.addColorStop(1,'transparent');
  ctx.fillStyle=gl;ctx.fillRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;p.pulse+=p.ps;
    if(p.x<-5)p.x=canvas.width+5;if(p.x>canvas.width+5)p.x=-5;
    if(p.y<-5)p.y=canvas.height+5;if(p.y>canvas.height+5)p.y=-5;
    const a=p.alpha*(0.7+0.3*Math.sin(p.pulse));
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.warm?`rgba(219,175,138,${a})`:`rgba(162,174,179,${a})`;ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();
// Highlight dot active toggle
document.querySelectorAll('.hl-dot').forEach(d=>{
  d.addEventListener('click',()=>{
    document.querySelectorAll('.hl-dot').forEach(x=>x.classList.remove('active'));
    d.classList.add('active');
  });
});
