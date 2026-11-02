const grid = document.querySelector('#photo-grid');
const dialog = document.querySelector('#photo-dialog');

if (grid && dialog) {
  if (!grid.children.length) {
    for (let i = 0; i < 10; i++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.id = `photo-${i + 1}`;
      button.dataset.photo = i;
      button.setAttribute('aria-label', `Open photograph ${i + 1} of 10`);
      const image = document.createElement('img');
      image.src = `assets/gallery/Photo${String(i + 1).padStart(3, '0')}.jpg`;
      image.alt = `Grant Generaux and Josh Snyder, photograph ${i + 1} of 10`;
      image.loading = 'lazy';
      button.append(image);
      grid.append(button);
    }
  }

  const buttons = [...grid.querySelectorAll('button[data-photo]')];
  const viewerImage = document.querySelector('#dialog-image');
  const counter = document.querySelector('#photo-counter');
  let current = 0;

  function showPhoto(index) {
    current = (index + buttons.length) % buttons.length;
    const source = buttons[current].querySelector('img');
    viewerImage.src = source.src;
    viewerImage.alt = source.alt;
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${buttons.length}`;
  }

  function openPhoto(index) {
    showPhoto(index);
    if (!dialog.open) dialog.showModal();
  }

  buttons.forEach((button, index) => button.addEventListener('click', () => openPhoto(index)));
  document.querySelectorAll('[data-open-gallery]').forEach(button => button.addEventListener('click', () => openPhoto(Number(button.dataset.openGallery))));
  document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
  document.querySelector('#prev-photo').addEventListener('click', () => showPhoto(current - 1));
  document.querySelector('#next-photo').addEventListener('click', () => showPhoto(current + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') showPhoto(current - 1);
    if (event.key === 'ArrowRight') showPhoto(current + 1);
  });

  const match = location.hash.match(/^#photo-(\d+)$/);
  if (match && Number(match[1]) <= buttons.length) openPhoto(Number(match[1]) - 1);
}
