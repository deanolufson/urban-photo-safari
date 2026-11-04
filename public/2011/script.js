(() => {
  const search = document.querySelector('#post-search');
  const cards = [...document.querySelectorAll('.indexed')];
  if (search && cards.length) {
    let month = new URLSearchParams(location.search).get('month') || 'all';
    const buttons = [...document.querySelectorAll('.month-filters button')];
    const update = () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      for (const card of cards) {
        const show = (month === 'all' || card.dataset.month === month) && card.dataset.search.includes(query);
        card.hidden = !show;
        if (show) visible++;
      }
      document.querySelector('#no-posts').hidden = visible > 0;
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.month === month)));
    };
    buttons.forEach(button => button.addEventListener('click', () => {
      month = button.dataset.month;
      history.replaceState(null, '', month === 'all' ? location.pathname : `?month=${month}`);
      update();
    }));
    search.addEventListener('input', update);
    update();
  }
  const dialog = document.querySelector('#photo-viewer');
  if (dialog) {
    const groups = Object.fromEntries(['awards','dean'].map(group => [group, [...document.querySelectorAll(`.gallery-photo[data-group="${group}"]`)]]));
    let currentGroup = 'awards', index = 0, opener;
    const paint = () => {
      const button = groups[currentGroup][index];
      const photo = button.querySelector('img');
      const full = dialog.querySelector('img');
      full.src = photo.src;
      full.alt = photo.alt;
      dialog.querySelector('figcaption').textContent = `${button.querySelector('span').textContent} · ${index+1} of ${groups[currentGroup].length}`;
    };
    const move = delta => { index = (index + delta + groups[currentGroup].length) % groups[currentGroup].length; paint(); };
    document.querySelectorAll('.gallery-photo').forEach(button => button.addEventListener('click', () => {
      opener = button; currentGroup = button.dataset.group; index = Number(button.dataset.index); paint(); dialog.showModal();
    }));
    dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('.viewer-prev').addEventListener('click', () => move(-1));
    dialog.querySelector('.viewer-next').addEventListener('click', () => move(1));
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { dialog.querySelector('img').src=''; opener?.focus(); });
    document.addEventListener('keydown', event => {
      if (!dialog.open) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    });
  }
})();
