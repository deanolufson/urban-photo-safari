const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelector('.scroll-cue').addEventListener('click', () => {
  document.querySelector('.manifesto').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .16 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const photographs = [
  { id: '03', name: 'Andrew Tasch' },
  { id: '04', name: 'Andrew Wright' },
  { id: '10', name: 'Cari Williams' },
  { id: '17', name: 'Dale Jamieson' },
  { id: '19', name: 'Dave McElwain' },
  { id: '27', name: 'Janine Eastman' },
  { id: '29', name: 'Jay Parsons' },
  { id: '31', name: 'Jennifer & Josh Quint' },
  { id: '33', name: 'Jimmy Lam' },
  { id: '34', name: 'Justin Ferguson' },
  { id: '37', name: 'Kevin Orr' },
  { id: '38', name: 'Kevin Sisemore' },
  { id: '39', name: 'Kim Hersh' },
  { id: '40', name: 'Kristin Banker' },
  { id: '43', name: 'Luis Ulloa' },
  { id: '44', name: 'Lisa Heeke' },
  { id: '47', name: 'Ray Ruppert' },
  { id: '49', name: 'Ryan Hembree' },
  { id: '54', name: 'Shelly Hatton' },
  { id: '57', name: 'Steve Wall' }
];

// Paths resolve from this script, so the local source preview and deployed site use the same files.
const assetRoot = new URL('.', document.currentScript.src);
const photoLayers = [...document.querySelectorAll('.hero-photo')];
const photoCredit = document.querySelector('.hero-credit');
const shuffled = items => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
let remaining = shuffled(photographs);
let activeLayer = 0;
let currentPhoto = null;

function showPhoto(photo, first = false) {
  const imageURL = new URL(`2008/assets/entries/${photo.id}/01.webp`, assetRoot).href;
  const image = new Image();
  image.onload = () => {
    const nextLayer = first ? activeLayer : 1 - activeLayer;
    photoLayers[nextLayer].style.backgroundImage = `url("${imageURL}")`;
    if (!first) {
      photoLayers[nextLayer].classList.add('is-active');
      photoLayers[activeLayer].classList.remove('is-active');
      activeLayer = nextLayer;
    }
    currentPhoto = photo;
    photoCredit.textContent = `2008 PHOTO / ${photo.name} ↗`;
    photoCredit.href = new URL(`2008/entries/${photo.id}.html#frame-01`, assetRoot).href;
    if (!reduced) setTimeout(nextPhoto, 8000);
  };
  image.onerror = () => { if (!reduced) setTimeout(nextPhoto, 8000); };
  image.src = imageURL;
}

function nextPhoto() {
  if (document.hidden) {
    setTimeout(nextPhoto, 8000);
    return;
  }
  if (remaining.length === 0) {
    remaining = shuffled(photographs.filter(photo => photo !== currentPhoto));
  }
  showPhoto(remaining.pop());
}

showPhoto(remaining.pop(), true);

if (!reduced) {
  const cursor = document.querySelector('.cursor');
  addEventListener('pointermove', event => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
  document.querySelectorAll('a,button,.archive-card').forEach(el => {
    el.addEventListener('pointerenter', () => cursor.classList.add('hover'));
    el.addEventListener('pointerleave', () => cursor.classList.remove('hover'));
  });
}
