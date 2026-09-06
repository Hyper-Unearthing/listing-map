# Places
A mobile-friendly, static property shortlist. GitHub Pages + `listings.json`; no database, backend, credentials or browser-only storage.

## Update the shortlist
Send Cracker a listing URL for a pull request, or use **Edit listings on GitHub** on the site. GitHub sign-in is required to edit. Changes to `main` appear after Pages deploys; reload the site on either device.

Copy an object in `listings.json` for a new place and give it a unique `id`. Use numeric `price` (SGD/month), `beds`, `lat`, `lng`, or null for unknown numbers. Status is `Interested`, `Viewing booked`, `Viewed`, or `Passed`. `viewing` is a human-readable date/time (include Singapore time). Use `approximate: true` for neighbourhood pins. Missing coordinates leave a listing in the cards without a map pin. Keep valid JSON (no trailing commas).

All source, listings, notes and Git history are public. Do not store personal contact details, credentials or private notes. Removing a value does not erase Git history.

## Run / verify
Serve this directory with `python -m http.server 8000`, then open localhost:8000. Run `node --check app.js` and `python -m json.tool listings.json` for basic validation. No build step. Pages publishes root of `main`.

Map library: Leaflet 1.9.4 from unpkg. Tiles: OpenStreetMap; attribution is displayed. These third parties receive normal browser requests. Map requires internet; card links remain usable if Leaflet fails. There is no automatic scraping or price refresh.

## Initial listing verification
On 2026-09-06 the exact 99.co listing was retrieved using IPRoyal Singapore residential HTTP. Datacenter HTTP and proxied Chrome remained blocked by Cloudflare. Page text and Product/Apartment JSON-LD confirmed S$5,800/month, 3 bedrooms, 2 bathrooms, 1,066 sqft, 7 Pasir Ris Central 519612, high floor and built year 2026. The pin now uses that listing's published coordinates, not Pasir Ris station. It represents the property's map location, not a verified unit entrance. Availability and immediate move-in remain advertiser claims. The page's dates are inconsistent, so no last-updated date was inferred. Contact details and raw page archives are not published.

## Listing photos
Optional `images` is an ordered array of `{src, sourceUrl, alt, width, height}`.
The first is the cover; Previous/Next controls show every remaining image, with an
open-photo link for a larger view. Empty/missing arrays and failed image requests
show a text fallback while the source listing link remains available. Images are
lazy-loaded, shown uncropped to preserve watermarks, and have accessible labels.
`imagesChecked` records our check date; `imagesNote` records provenance/limitations.
Only use URLs actually published in the exact listing gallery, not agent portraits,
recommendations or stock photos. Keep source URL parameters/watermarks unchanged.

On 2026-09-06 IPRoyal Singapore residential retrieved both public listing pages:
Pasir Ris 8 has 8 photos + 1 floor plan, Sea Horizon 9 photos + 1 floor plan.
The exact gallery URLs are retained for source-CDN delivery, **not verified reliable**:
direct HTTP, direct Chromium and IPRoyal datacenter Chromium received CDN 403
challenges. Residential page fetching rejects image content types. No access
controls were bypassed. Photos may therefore show the fallback until the source
CDN permits delivery; no unavailable image is claimed as successfully downloaded.
These external images send ordinary requests to 99.co. No raw listing HTML or
agent contact details are published. A future authorized download can use same-site
assets for reliability, retaining `sourceUrl` and unchanged image bytes/watermarks.

Browser regression test: with Playwright installed and the site served on port
8000, run `node tests/gallery.cjs`. This deliberately mocks failed image responses
and checks desktop/mobile navigation, wraparound, missing images, search, statuses
and horizontal overflow. It does **not** establish real CDN delivery.

### Pending reusable-template addition
Template 14 / version ID 21 and user memory could not be edited in this background
context (template-version read permission denied; memory download HTTP 403). Preserve
all existing template instructions and append the following once access is restored:

> For each future URL addition, collect all publicly accessible photos and floor
> plans from that exact listing's gallery into the optional `images` schema above.
> Use IPRoyal Singapore residential first for Singapore sources. Exclude agent
> portraits, recommendations and unrelated project/stock images. Never invent URLs,
> bypass access controls or remove watermarks. Preserve source attribution and URL
> parameters. Verify HTTP status, image MIME type and actual image decoding before
> claiming availability. Prefer verified unchanged same-site copies when permitted;
> otherwise verify source-CDN delivery in browsers. Record `imagesChecked` and
> provenance/limitations in `imagesNote`; use an empty array if none are obtainable.
> Preserve existing images and user notes/status on refresh unless verified changes
> warrant updating them. Test navigation, missing/broken-image fallback, lazy loading,
> accessibility and desktop/mobile layout. Report unavailable photos explicitly.
