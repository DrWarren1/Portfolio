/* Sculpture originale de présentation : aucun modèle client ou industriel réel. */
(() => {
const host=document.getElementById('scene'),explodeButton=document.getElementById('explode');
if(!window.THREE){document.getElementById('scene-hint').textContent='Étude de forme · aperçu statique';explodeButton.hidden=true;return;}
const T=window.THREE;let renderer;
try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{document.getElementById('scene-hint').textContent='Étude de forme · aperçu statique';explodeButton.hidden=true;return;}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0x000000,0);renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;host.appendChild(renderer.domElement);host.classList.add('scene-ready');
const scene=new T.Scene(),camera=new T.PerspectiveCamera(34,1,.1,100);camera.position.set(0,0,9.8);
// Studio reflection map, locally generated. No external textures or requests.
const studio=document.createElement('canvas');studio.width=1024;studio.height=512;const c=studio.getContext('2d');c.fillStyle='#16121c';c.fillRect(0,0,1024,512);
let gradient=c.createLinearGradient(0,0,0,512);gradient.addColorStop(0,'#ddd5e8');gradient.addColorStop(.25,'#575060');gradient.addColorStop(.5,'#15111b');gradient.addColorStop(1,'#0b080f');c.fillStyle=gradient;c.fillRect(0,0,1024,512);
c.fillStyle='#fff4df';c.fillRect(120,60,90,290);c.fillStyle='#b898ea';c.fillRect(530,80,150,280);c.fillStyle='#ffffff';c.fillRect(850,100,55,240);const env=new T.CanvasTexture(studio);env.mapping=T.EquirectangularReflectionMapping;const pmrem=new T.PMREMGenerator(renderer);const envRT=pmrem.fromEquirectangular(env);scene.environment=envRT.texture;env.dispose();pmrem.dispose();
scene.add(new T.HemisphereLight(0xcab4ec,0x17101e,2));function light(color,intensity,x,y,z){let l=new T.PointLight(color,intensity,30,2);l.position.set(x,y,z);scene.add(l)}light(0xffe9b2,70,-3,5,5);light(0xa858ff,90,4,0,3);light(0xffffff,35,0,-3,4);
const gold=new T.MeshStandardMaterial({color:0xc29b53,metalness:.95,roughness:.24});const goldBright=new T.MeshStandardMaterial({color:0xe9c985,metalness:.85,roughness:.23});const black=new T.MeshStandardMaterial({color:0x252029,metalness:.93,roughness:.27});const silver=new T.MeshStandardMaterial({color:0x8e829e,metalness:.93,roughness:.25});const purple=new T.MeshStandardMaterial({color:0x4a176d,metalness:.6,roughness:.2,emissive:0x6d27aa,emissiveIntensity:.36});const lineMat=new T.MeshBasicMaterial({color:0x9f68d4});
const assembly=new T.Group();scene.add(assembly);assembly.rotation.set(.56,-.5,-.32);
const parts=[];function part(z,spread){const g=new T.Group();g.position.z=z;g.userData={base:z,spread};parts.push(g);assembly.add(g);return g;}
function mesh(geo,mat,parent){const m=new T.Mesh(geo,mat);parent.add(m);return m;}
function torus(r,t,z,mat,parent,segments=120){let m=mesh(new T.TorusGeometry(r,t,16,segments),mat,parent);m.position.z=z;return m;}
function annulus(outer,inner,depth,mat,parent){const s=new T.Shape();s.absarc(0,0,outer,0,Math.PI*2,false);const hole=new T.Path();hole.absarc(0,0,inner,0,Math.PI*2,true);s.holes.push(hole);let m=mesh(new T.ExtrudeGeometry(s,{depth,bevelEnabled:true,bevelThickness:.025,bevelSize:.025,bevelSegments:3,steps:1,curveSegments:96}),mat,parent);m.position.z=-depth/2;return m;}
const rear=part(-.38,-.7);annulus(1.84,1.41,.14,black,rear);torus(1.78,.035,-.08,gold,rear);torus(1.48,.025,.09,goldBright,rear);
const outer=part(0,.05);annulus(1.97,1.62,.24,black,outer);torus(1.96,.048,.15,gold,outer);torus(1.95,.042,-.15,gold,outer);torus(1.63,.038,.15,goldBright,outer);
// Radial machining details and gold indexing marks.
const boltGeometry=new T.CylinderGeometry(.045,.045,.06,6);for(let i=0;i<36;i++){let a=i/36*Math.PI*2;let bolt=mesh(boltGeometry,i%3===0?goldBright:silver,outer);bolt.rotation.x=Math.PI/2;bolt.position.set(Math.cos(a)*1.805,Math.sin(a)*1.805,.16);let mark=mesh(new T.BoxGeometry(.07,.025,.05),i%3===0?gold:black,outer);mark.position.set(Math.cos(a)*2.005,Math.sin(a)*2.005,0);mark.rotation.z=a;}
const rotor=part(.28,.75);annulus(1.47,1.26,.12,gold,rotor);torus(1.47,.025,.06,goldBright,rotor);
const bladeShape=new T.Shape();bladeShape.moveTo(.63,-.14);bladeShape.bezierCurveTo(.88,-.26,1.13,-.19,1.34,.05);bladeShape.lineTo(1.28,.2);bladeShape.bezierCurveTo(1.03,.02,.82,.01,.62,.01);bladeShape.closePath();const bladeGeo=new T.ExtrudeGeometry(bladeShape,{depth:.095,bevelEnabled:true,bevelSegments:2,bevelSize:.015,bevelThickness:.02,curveSegments:8});for(let i=0;i<22;i++){const b=mesh(bladeGeo,i%4===0?gold:black,rotor);b.rotation.z=i/22*Math.PI*2;b.position.z=.035;}
const hub=part(.46,1.05);annulus(.64,.38,.24,black,hub);torus(.61,.04,.14,goldBright,hub);torus(.4,.021,.15,lineMat,hub);
const core=mesh(new T.IcosahedronGeometry(.30,0),purple,hub);core.position.z=.11;const coreEdge=new T.LineSegments(new T.EdgesGeometry(core.geometry),new T.LineBasicMaterial({color:0xb983f1,transparent:true,opacity:.65}));core.add(coreEdge);
// Two detached orbit lines form a technical study frame around the sculpture.
const orbit=new T.Group();assembly.add(orbit);torus(2.3,.006,0,gold,orbit);orbit.rotation.x=.25;orbit.rotation.y=-.25;
const points=[];for(let i=0;i<110;i++){const a=i*2.399963,r=2.6+(i%9)*.13;points.push(Math.cos(a)*r,Math.sin(a)*r,(i%13-6)*.18)}const pg=new T.BufferGeometry();pg.setAttribute('position',new T.Float32BufferAttribute(points,3));scene.add(new T.Points(pg,new T.PointsMaterial({color:0xb798ca,size:.014,transparent:true,opacity:.45})));
let expanded=false,target=0,amount=0,visible=true,dragging=false,lastX=0,lastY=0,rx=.56,ry=-.5,raf=0,lastTime=0;
explodeButton.addEventListener('click',()=>{expanded=!expanded;target=expanded?1:0;explodeButton.setAttribute('aria-pressed',expanded);const english=document.documentElement.lang==='en';explodeButton.innerHTML=expanded?(english?'Reassemble <span>↙</span>':'Réassembler <span>↙</span>'):(english?'Exploded view <span>↗</span>':'Vue éclatée <span>↗</span>');request()});
host.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;host.setPointerCapture(e.pointerId)});
host.addEventListener('pointermove',e=>{if(!dragging)return;ry+=(e.clientX-lastX)*.008;rx+=(e.clientY-lastY)*.008;rx=Math.max(-1.2,Math.min(1.2,rx));lastX=e.clientX;lastY=e.clientY;request()});
const release=()=>{dragging=false};host.addEventListener('pointerup',release);host.addEventListener('pointercancel',release);
host.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')ry-=.12;if(e.key==='ArrowRight')ry+=.12;if(e.key==='ArrowUp')rx-=.12;if(e.key==='ArrowDown')rx+=.12;if(e.key==='Home'){rx=.56;ry=-.5}request()});
function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();const scale=w<500?.92:1;assembly.scale.setScalar(scale);request()}
function request(){if(!raf&&visible&&!document.hidden)raf=requestAnimationFrame(render)}
function render(time){raf=0;const dt=Math.min((time-lastTime)/1000,.04);lastTime=time;const running=window.portfolioMotion&&!document.hidden;amount=running?T.MathUtils.lerp(amount,target,.065):target;parts.forEach(g=>g.position.z=g.userData.base+g.userData.spread*amount);if(running&&!dragging){rotor.rotation.z+=dt*.1;core.rotation.y+=dt*.35;}assembly.rotation.x=rx;assembly.rotation.y=ry+(running&&!dragging?Math.sin(time*.0003)*.15:0);assembly.position.y=running?Math.sin(time*.0006)*.065:0;renderer.render(scene,camera);if(visible&&(running||Math.abs(amount-target)>.001))request();}
new ResizeObserver(resize).observe(host);new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible)request();else if(raf){cancelAnimationFrame(raf);raf=0}},{threshold:0}).observe(host);addEventListener('motionchange',request);document.addEventListener('visibilitychange',request);
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();host.classList.remove('scene-ready');renderer.domElement.style.display='none';explodeButton.hidden=true;document.getElementById('scene-hint').textContent='Étude de forme · aperçu statique';if(raf)cancelAnimationFrame(raf)});resize();
})();
