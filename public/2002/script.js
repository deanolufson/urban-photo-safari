(() => {
  const dialog = document.querySelector('#photo-dialog');
  if (!dialog) return;
  const image = document.querySelector('#dialog-photo');
  const caption = document.querySelector('#photo-caption');
  const close = document.querySelector('#close-photo');
  const previous = document.querySelector('#previous-photo');
  const next = document.querySelector('#next-photo');
  const gallery = [...document.querySelectorAll('a[data-gallery]')];
  let index = 0;
  let trigger = null;
  const show = () => {
    const link = gallery[index];
    image.src = link.href;
    image.alt = link.querySelector('img')?.alt || 'Urban Photo Safari photograph';
    caption.textContent = `${index + 1} / ${gallery.length}`;
  };
  for (const [position, link] of gallery.entries()) {
    link.addEventListener('click', event => {
      event.preventDefault();
      trigger = link;
      index = position;
      show();
      dialog.showModal();
    });
  }
  close.addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => { index = (index + gallery.length - 1) % gallery.length; show(); });
  next.addEventListener('click', () => { index = (index + 1) % gallery.length; show(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { image.removeAttribute('src'); trigger?.focus(); });
  document.addEventListener('keydown', event => {
    if (!dialog.open) return;
    if (event.key === 'ArrowLeft') previous.click();
    if (event.key === 'ArrowRight') next.click();
  });
})();
