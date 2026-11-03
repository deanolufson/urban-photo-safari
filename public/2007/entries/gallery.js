let collections = [];
let active = 0;
let frame = 0;
const $ = id => document.getElementById(id);
const buttons = [...document.querySelectorAll(".contestant")];
const dialog = $("viewer");
function openFrame(index) {
  const group = collections[active];
  frame = (index + group.photos.length) % group.photos.length;
  $("large").src = "../" + group.photos[frame];
  $("large").alt = group.name + ", frame " + (frame + 1);
  $("viewer-credit").textContent = group.name;
  $("position").textContent = (frame + 1) + " / " + group.photos.length;
  if (!dialog.open) dialog.showModal();
}
function showGallery(index) {
  active = index;
  const group = collections[index];
  buttons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
  $("gallery-name").textContent = group.name;
  document.querySelector("#selected .eyebrow").textContent = group.number === 0 ? "Event gallery" : "Contestant " + String(group.number).padStart(2, "0");
  const grid = $("photo-grid");
  grid.replaceChildren();
  group.photos.forEach((source, i) => {
    const button = document.createElement("button");
    button.className = "frame";
    button.setAttribute("aria-label", "Open frame " + (i + 1) + " by " + group.name);
    const photo = new Image();
    photo.src = "../" + source;
    photo.loading = "lazy";
    photo.alt = "";
    const caption = document.createElement("span");
    caption.textContent = "FRAME " + String(i + 1).padStart(2, "0");
    button.append(photo, caption);
    button.onclick = () => openFrame(i);
    grid.append(button);
  });
}
fetch("gallery.json").then(response => response.json()).then(data => {
  collections = data;
  buttons.forEach((button, i) => button.onclick = () => {
    showGallery(i);
    $("selected").scrollIntoView({behavior:"smooth"});
  });
  showGallery(0);
});
$("close").onclick = () => dialog.close();
$("previous").onclick = () => openFrame(frame - 1);
$("next").onclick = () => openFrame(frame + 1);
dialog.onkeydown = event => {
  if (event.key === "ArrowLeft") openFrame(frame - 1);
  if (event.key === "ArrowRight") openFrame(frame + 1);
};
