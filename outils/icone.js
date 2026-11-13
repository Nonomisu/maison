// Fabrique les icônes de l'appli (écran d'accueil) à partir des sprites des trois chats.
// Usage : NODE_PATH=$(npm root -g) node outils/icone.js
const sharp = require("sharp"), fs = require("fs"), path = require("path");
const R = path.join(__dirname, "..");
const inner = (f) => fs.readFileSync(path.join(R, "a", f), "utf8").replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
const cat = (f, x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${inner(f)}</g>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" shape-rendering="crispEdges">
<rect width="64" height="64" fill="#EDE2D3"/>
<rect x="0" y="44" width="64" height="20" fill="#C9A06B"/>
<rect x="0" y="44" width="64" height="2" fill="#8E6F4E"/>
${cat("c5e87960cca9459f63de6e1a544ecb0d.svg", 2, 26, 1.15)}
${cat("2fed77e510494554b23090758c8933e0.svg", 42, 26, 1.15)}
${cat("53a68fb3bc2e94fda3480c894eb7bde7.svg", 18, 18, 1.55)}
</svg>`;
fs.writeFileSync(path.join(R, "icon.svg"), svg);
(async () => {
  for (const n of [180, 192, 512]) await sharp(Buffer.from(svg), { density: 600 }).resize(n, n, { kernel: "nearest" }).png().toFile(path.join(R, `icon-${n}.png`));
  console.log("icônes faites");
})();
