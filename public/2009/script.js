const viewer = document.querySelector('.lightbox');
const viewerImage = viewer.querySelector('img');
const viewerCaption = viewer.querySelector('p');

document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => {
    viewerImage.src = button.dataset.photo;
    viewerImage.alt = button.querySelector('img').alt;
    viewerCaption.textContent = button.dataset.caption;
    viewer.showModal();
  });
});

viewer.querySelector('.close-lightbox').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
