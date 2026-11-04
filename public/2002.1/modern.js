const photos = {"Eric": ["assets/galleries/eric/00-57.jpg", "assets/galleries/eric/01-61.jpg", "assets/galleries/eric/02-65.jpg", "assets/galleries/eric/03-68.jpg", "assets/galleries/eric/04-71.jpg", "assets/galleries/eric/05-75.jpg", "assets/galleries/eric/06-78.jpg", "assets/galleries/eric/07-81.jpg", "assets/galleries/eric/08-84.jpg", "assets/galleries/eric/09-87.jpg"], "Dean": ["assets/galleries/dean/01-57.jpg", "assets/galleries/dean/02-61.jpg", "assets/galleries/dean/03-65.jpg", "assets/galleries/dean/04-68.jpg", "assets/galleries/dean/05-71.jpg", "assets/galleries/dean/06-75.jpg", "assets/galleries/dean/07-78.jpg", "assets/galleries/dean/08-81.jpg", "assets/galleries/dean/09-84.jpg", "assets/galleries/dean/10-87.jpg"], "Matt": ["assets/galleries/matt/00-57.jpg", "assets/galleries/matt/01-61.jpg", "assets/galleries/matt/02-65.jpg", "assets/galleries/matt/03-68.jpg", "assets/galleries/matt/04-71.jpg", "assets/galleries/matt/05-74.jpg", "assets/galleries/matt/06-77.jpg", "assets/galleries/matt/07-81.jpg", "assets/galleries/matt/08-84.jpg", "assets/galleries/matt/09-87.jpg"], "Tyler": ["assets/galleries/tyler/01-57.jpg", "assets/galleries/tyler/02-61.jpg", "assets/galleries/tyler/03-65.jpg", "assets/galleries/tyler/04-68.jpg", "assets/galleries/tyler/05-71.jpg", "assets/galleries/tyler/06-74.jpg", "assets/galleries/tyler/07-77.jpg", "assets/galleries/tyler/08-80.jpg", "assets/galleries/tyler/09-83.jpg", "assets/galleries/tyler/10-86.jpg"]};
const marks = {"Eric": ["II", "II", "I", "", "", "", "I", "I", "I", "II"], "Dean": ["II", "II", "I", "I", "", "", "", "", "III", ""], "Matt": ["II", "II", "I", "", "", "", "", "I", "I", "II"], "Tyler": ["II", "", "II", "", "", "II", "II", "III", "", "I"]};
const names={Eric:'Eric Diebold',Dean:'Dean Olufson',Matt:'Matt McNary',Tyler:'Tyler Galloway'};
const scene=document.querySelector('#scene'),sceneImage=document.querySelector('#scene-image');
const sceneNames=['Second annual Urban Photo Safari billboard','How the safari works','Voting instructions','Prize and map information'];
document.querySelectorAll('[data-scene]').forEach(button=>button.addEventListener('click',()=>{
 const number=Number(button.dataset.scene);sceneImage.src=`assets/pic0${number}.jpg`;sceneImage.alt=sceneNames[number-1];
 document.querySelectorAll('[data-scene]').forEach(item=>item.setAttribute('aria-current',String(item===button)));
 scene.querySelectorAll('.tile').forEach(tile=>{tile.style.animation='none';void tile.offsetWidth;tile.style.animation=''});
}));
document.querySelector('#map-button').addEventListener('click',()=>window.open('assets/map.jpg','_blank'));
let currentPerson='Eric',currentPhoto=0;
function showPhoto(person,index,scroll=false){
 currentPerson=person;currentPhoto=index;
 document.querySelector('#gallery-image').src=photos[person][index];
 document.querySelector('#gallery-image').alt=`${names[person]}, photograph ${index+1}`;
 document.querySelector('#gallery-name').textContent=names[person];
 document.querySelector('#gallery-counter').textContent=`Photograph ${index+1} of 10`;
 document.querySelectorAll('[data-person]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.person===person)));
 const thumbs=document.querySelector('#thumbnails');thumbs.replaceChildren();
 photos[person].forEach((src,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`View photograph ${i+1} by ${names[person]}`);b.setAttribute('aria-current',String(i===index));const img=document.createElement('img');img.src=src;img.alt='';img.loading='lazy';b.append(img);b.addEventListener('click',()=>showPhoto(person,i));thumbs.append(b)});
 if(scroll)document.querySelector('#gallery').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
document.querySelectorAll('[data-person]').forEach(b=>b.addEventListener('click',()=>showPhoto(b.dataset.person,0)));
document.querySelector('#next-photo').addEventListener('click',()=>showPhoto(currentPerson,(currentPhoto+1)%10));
const body=document.querySelector('#tally-body');
for(const person of ['Eric','Dean','Matt','Tyler']){
 const tr=document.createElement('tr');const th=document.createElement('th');th.scope='row';th.textContent=names[person];tr.append(th);
 marks[person].forEach((mark,i)=>{const td=document.createElement('td');const b=document.createElement('button');b.type='button';b.textContent=mark||'·';b.setAttribute('aria-label',`${names[person]}, photograph ${i+1}, ${mark?mark.length+(mark.length===1?' vote':' votes'):'no votes'}. View photograph`);b.addEventListener('click',()=>showPhoto(person,i,true));td.append(b);tr.append(td)});body.append(tr);
}
document.querySelector('#winner-link').addEventListener('click',()=>showPhoto('Tyler',7));
showPhoto('Eric',0);
