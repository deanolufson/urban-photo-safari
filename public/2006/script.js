(() => {
  const dialog = document.querySelector('#photo-dialog');
  const image = document.querySelector('#dialog-photo');
  const caption = document.querySelector('#photo-caption');
  const close = document.querySelector('#close-photo');
  const previous = document.querySelector('#previous-photo');
  const next = document.querySelector('#next-photo');
  if (!dialog || !image) return;
  let gallery = [];
  let index = 0;
  let trigger = null;
  const show = () => {
    const link = gallery[index];
    image.src = link.href;
    image.alt = link.dataset.caption || link.title || link.querySelector('img')?.alt || 'Urban Photo Safari photograph';
    caption.textContent = `${image.alt} · ${index + 1} / ${gallery.length}`;
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-gallery]');
    if (!link) return;
    event.preventDefault();
    trigger = link;
    gallery = [...document.querySelectorAll('a[data-gallery]')].filter(item => item.dataset.gallery === link.dataset.gallery);
    index = gallery.indexOf(link);
    show();
    dialog.showModal();
  });
  close.addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => { index = (index - 1 + gallery.length) % gallery.length; show(); });
  next.addEventListener('click', () => { index = (index + 1) % gallery.length; show(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { image.removeAttribute('src'); trigger?.focus(); });
  document.addEventListener('keydown', event => {
    if (!dialog.open) return;
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'p') previous.click();
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'n') next.click();
  });
})();
