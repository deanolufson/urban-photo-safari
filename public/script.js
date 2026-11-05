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
  { id: '57', name: 'Steve Wall' },
  { year: '2001', name: 'Andy VanBlarcum', src: '2001/images/AndyVanBlarcum/21.jpg' },
  { year: '2001', name: 'Andy VanBlarcum', src: '2001/images/AndyVanBlarcum/56.jpg' },
  { year: '2001', name: 'Eric Diebold', src: '2001/images/EricDiebold/22.jpg' },
  { year: '2001', name: 'Jon Northington', src: '2001/images/JonNorthington/10.jpg' },
  { year: '2001', name: 'Jon Northington', src: '2001/images/JonNorthington/18.jpg' },
  { year: '2001', name: 'Kevin Sisemore', src: '2001/images/KevinSisemore/16.jpg' },
  { year: '2009', name: 'Candida Kohler', src: '2009/gallery/images/candida-kohler-04.jpg' },
  { year: '2009', name: 'Erin Northington', src: '2009/gallery/images/erin-northington-09.jpg' },
  { year: '2009', name: 'Jamieson', src: '2009/gallery/images/jamieson-02.jpg' },
  { year: '2009', name: 'Jeff Nissen', src: '2009/gallery/images/jeff-nissen-01.jpg' },
  { year: '2009', name: 'Jon Northington', src: '2009/gallery/images/jon-northington-10.jpg' },
  { year: '2009', name: 'Kevin Orr', src: '2009/gallery/images/kevin-orr-01.jpg' },
  { year: '2009', name: 'Kyle Johnston', src: '2009/gallery/images/kyle-johnston-01.jpg' },
  { year: '2009', name: 'Robin & Bill Hooper', src: '2009/gallery/images/robin-bill-hooper-01.jpg' },
  { year: '2009', name: 'Ryan Hembree', src: '2009/gallery/images/ryan-hembree-03.jpg' },
  { year: '2011', name: 'Dean Olufson', src: '2011/assets/photos/IMG_0573.jpg' },
  { year: '2011', name: 'Dean Olufson', src: '2011/assets/photos/IMG_0505.jpg' },
  { year: '2011', name: 'Dean Olufson', src: '2011/assets/photos/IMG_0500.jpg' },
  { year: '2011', name: 'Dean Olufson', src: '2011/assets/photos/IMG_0533.jpg' },
  { year: '2011', name: 'Dean Olufson', src: '2011/assets/photos/IMG_0435.jpg' }
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
  const imageURL = new URL(photo.src || `2008/assets/entries/${photo.id}/01.webp`, assetRoot).href;
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
    photoCredit.textContent = `${photo.year || '2008'} PHOTO / ${photo.name} ↗`;
    photoCredit.href = new URL(photo.src || `2008/entries/${photo.id}.html#frame-01`, assetRoot).href;
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
