window.Selah.createAmbientBackground('bg', { pointCount: 55 });

/* CONSTELLATION */
const cc=document.getElementById('constellation-canvas');
const cx=cc.getContext('2d');
const habits=[
  {label:'Prayer',done:true},{label:'Scripture',done:true},
  {label:'Reflection',done:false},{label:'Gratitude',done:false},
  {label:'Stillness',done:false},{label:'Kindness',done:true}
];
function resizeCons(){cc.width=cc.offsetWidth;cc.height=cc.offsetHeight;}
resizeCons();

function drawConstellation(){
  const W=cc.width,H=cc.height;
  cx.clearRect(0,0,W,H);
  const cx0=W/2,cy0=H/2;
  const R=Math.min(W,H)*0.36;
  const nodes=habits.map((h,i)=>{
    const angle=(i/habits.length)*Math.PI*2 - Math.PI/2;
    return {x:cx0+Math.cos(angle)*R,y:cy0+Math.sin(angle)*R,...h};
  });

  // Lines between completed
  nodes.forEach((a,i)=>{
    nodes.forEach((b,j)=>{
      if(j<=i)return;
      if(a.done&&b.done){
        cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);
        cx.strokeStyle='rgba(219,175,138,0.15)';cx.lineWidth=1;cx.stroke();
      }
    });
  });

  // Lines to center
  nodes.forEach(n=>{
    if(n.done){
      cx.beginPath();cx.moveTo(cx0,cy0);cx.lineTo(n.x,n.y);
      cx.strokeStyle='rgba(219,175,138,0.12)';cx.lineWidth=1;cx.setLineDash([3,6]);cx.stroke();cx.setLineDash([]);
    }
  });

  // Center glow
  const cg=cx.createRadialGradient(cx0,cy0,0,cx0,cy0,50);
  cg.addColorStop(0,'rgba(219,175,138,0.25)');cg.addColorStop(1,'transparent');
  cx.fillStyle=cg;cx.beginPath();cx.arc(cx0,cy0,50,0,Math.PI*2);cx.fill();
  cx.beginPath();cx.arc(cx0,cy0,7,0,Math.PI*2);cx.fillStyle='rgba(219,175,138,0.7)';cx.fill();

  // Nodes
  nodes.forEach(n=>{
    if(n.done){
      const ng=cx.createRadialGradient(n.x,n.y,0,n.x,n.y,18);
      ng.addColorStop(0,'rgba(219,175,138,0.35)');ng.addColorStop(1,'transparent');
      cx.fillStyle=ng;cx.beginPath();cx.arc(n.x,n.y,18,0,Math.PI*2);cx.fill();
      cx.beginPath();cx.arc(n.x,n.y,6,0,Math.PI*2);cx.fillStyle='rgba(219,175,138,0.85)';cx.fill();
    } else {
      cx.beginPath();cx.arc(n.x,n.y,5,0,Math.PI*2);
      cx.strokeStyle='rgba(162,174,179,0.4)';cx.lineWidth=1.5;cx.stroke();
    }
    // Label
    cx.font='11px Inter,sans-serif';cx.fillStyle='rgba(255,255,255,0.5)';
    cx.textAlign='center';cx.textBaseline='middle';
    const lx=cx0+(n.x-cx0)*1.28,ly=cy0+(n.y-cy0)*1.28;
    cx.fillText(n.label,lx,ly);
  });
}
drawConstellation();
window.addEventListener('resize',()=>{resizeCons();drawConstellation();});


document.querySelectorAll('[data-toggle-habit]').forEach((card) => {
  const toggleHabit = () => card.classList.toggle('done');
  card.addEventListener('click', toggleHabit);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleHabit();
    }
  });
});
