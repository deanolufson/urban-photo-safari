const artists = [
  ["Kevin Sisemore", 33], ["Ames Hall", 88], ["Andy VanBlarcum", 57],
  ["Chris Schoenhals", 41], ["Dean Olufson", 139], ["Eric Diebold", 53],
  ["Heather McKenzie", 35], ["Jon Northington", 22], ["Kathy VanBlarcum", 56]
];
const byId = id => document.getElementById(id);
const artist = byId("artist");
const scope = byId("scope");
const viewer = byId("viewer");
const number = index => String(index + 1).padStart(3, "0");
const path = (name, index, thumb = false) =>
  "images/" + name.replaceAll(" ", "") + "/" + (thumb ? "thumb-" : "") + index + ".jpg";
let current;

function showFrame(name, index, total) {
  current = {name, index, total};
  const label = name + " · Frame " + number(index);
  byId("large").src = path(name, index);
  byId("large").alt = label;
  byId("credit").textContent = name;
  byId("position").textContent = number(index) + " / " + total;
  if (!viewer.open) viewer.showModal();
}

function step(offset) {
  const {name, index, total} = current;
  showFrame(name, (index + total + offset) % total, total);
}

function renderGallery() {
  const [name, rollSize] = artists[artist.selectedIndex];
  const total = scope.value === "vote" ? 10 : rollSize;
  const grid = byId("grid");
  grid.replaceChildren();
  for (let index = 0; index < total; index++) {
    const button = document.createElement("button");
    button.className = "frame";
    button.ariaLabel = "Open frame " + number(index) + " by " + name;
    const photo = new Image();
    photo.alt = "";
    photo.loading = "lazy";
    photo.src = path(name, index, true);
    const caption = document.createElement("span");
    caption.textContent = number(index);
    button.append(photo, caption);
    button.onclick = () => showFrame(name, index, total);
    grid.append(button);
  }
  byId("count").textContent = total + " frames · " + name;
}

for (const [name] of artists) artist.add(new Option(name));
artist.onchange = scope.onchange = renderGallery;
byId("open-cover").onclick = () => showFrame("Kevin Sisemore", 9, 10);
byId("close").onclick = () => viewer.close();
byId("prev").onclick = () => step(-1);
byId("next").onclick = () => step(1);
viewer.onkeydown = event => {
  if (event.key === "ArrowLeft") step(-1);
  if (event.key === "ArrowRight") step(1);
};
renderGallery();
