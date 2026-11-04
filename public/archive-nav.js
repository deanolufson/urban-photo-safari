(() => {
  const match = location.pathname.match(/^\/(2001|2002|2003|2004|2006|2007|2008|2009)(?:\/|$)/);
  if (!match || !document.body || document.getElementById('archive-year-nav')) return;

  const year = match[1];
  const years = ['2001', '2002', '2003', '2004', '2006', '2007', '2008', '2009'];
  const nav = document.createElement('nav');
  nav.id = 'archive-year-nav';
  nav.setAttribute('aria-label', 'Switch archive year');
  nav.innerHTML = `
    <a class="archive-brand" href="/" aria-label="Urban Photo Safari main site">URBAN PHOTO SAFARI</a>
    <span class="archive-years">${years.map(item => `<a class="archive-year" href="/${item}/"${item === year ? ' aria-current="page"' : ''}>${item}</a>`).join('')}</span>
    <a class="archive-home" href="/" aria-label="Main site">MAIN SITE ↗</a>`;

  const oldTopPadding = getComputedStyle(document.body).paddingTop;
  document.body.style.paddingTop = `calc(${oldTopPadding} + 52px)`;
  document.body.prepend(nav);
})();
