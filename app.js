'use strict';
const cards = document.querySelector('#cards');
const search = document.querySelector('#search');
const statusFilter = document.querySelector('#status');
let listings = [], map, markers;
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function safeUrl(value) {
  try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : null; } catch { return null; }
}
function coordinates(item) {
  return Number.isFinite(item.lat) && Number.isFinite(item.lng) && Math.abs(item.lat) <= 90 && Math.abs(item.lng) <= 180;
}
function render() {
  cards.replaceChildren();
  if (markers) markers.clearLayers();
  const query = search.value.trim().toLowerCase();
  const filtered = listings.filter(item => (!statusFilter.value || item.status === statusFilter.value) && [item.title, item.address, item.notes].join(' ').toLowerCase().includes(query));
  document.querySelector('#count').textContent = `${filtered.length} of ${listings.length} places`;
  const bounds = [];
  for (const item of filtered) {
    const card = element('article', undefined, 'card');
    card.append(element('span', item.status || 'Interested', 'tag'), element('h2', item.title), element('p', item.address || 'Address to confirm', 'muted'));
    card.append(element('p', Number.isFinite(item.price) ? `S$${item.price.toLocaleString('en-SG')} / month` : 'Price to confirm', 'price'));
    if (item.beds != null) card.append(element('p', `${item.beds} bedroom(s)`, 'muted'));
    if (item.viewing) card.append(element('p', `Viewing: ${item.viewing}`));
    if (item.notes) card.append(element('p', item.notes, 'notes'));
    const actions = element('div', undefined, 'actions');
    const url = safeUrl(item.url);
    if (url) {
      const link = element('a', `View on ${new URL(url).hostname.replace(/^www\./, '')} ↗`);
      link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; actions.append(link);
    }
    if (coordinates(item) && map) {
      const popup = element('div'); popup.append(element('strong', item.title), element('p', item.approximate ? 'Approximate neighbourhood location' : item.address));
      const marker = L.marker([item.lat, item.lng]).bindPopup(popup).addTo(markers);
      bounds.push([item.lat, item.lng]);
      const button = element('button', item.approximate ? 'Approximate pin' : 'Show on map');
      button.type = 'button'; button.onclick = () => { map.setView([item.lat, item.lng], 15); marker.openPopup(); document.querySelector('#map').scrollIntoView({behavior: 'smooth', block: 'center'}); };
      actions.append(button);
    } else if (!coordinates(item)) card.append(element('p', 'Location not mapped yet', 'muted'));
    card.append(actions); cards.append(card);
  }
  if (!filtered.length) cards.append(element('p', 'No places match. Try another search or status.'));
  if (bounds.length) map.fitBounds(bounds, {padding: [35, 35], maxZoom: 15});
}
async function init() {
  if (window.L) {
    map = L.map('map').setView([1.3521, 103.8198], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    markers = L.layerGroup().addTo(map);
  } else document.querySelector('#map').textContent = 'Map could not load. Your listing links are still available below.';
  try {
    const response = await fetch('listings.json', {cache: 'no-store'});
    if (!response.ok) throw new Error('Could not fetch listings');
    listings = await response.json();
    if (!Array.isArray(listings) || listings.some(x => !x || typeof x.title !== 'string')) throw new Error('Invalid listing data');
    render(); search.addEventListener('input', render); statusFilter.addEventListener('change', render);
  } catch (error) {
    cards.replaceChildren(element('p', 'Could not load listings. Please refresh, or check listings.json on GitHub.', 'error'));
    console.error(error);
  }
}
init();
