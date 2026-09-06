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
**Local/static hosting is required; external image hotlinks are not an acceptable
fallback.** The URLs currently in this draft are source discovery evidence only,
not approved delivery. Do not merge this draft until they have been replaced by
verified local assets. Download the actual published image bytes to
`assets/listings/<listing-id>/`, commit them, and use relative `src` paths such as
`assets/listings/pasir-ris-8-99co/photo-01.jpg` (no leading slash), compatible with
GitHub Pages at `/listing-map/`. Keep the exact published URL in `sourceUrl` for
attribution/provenance; never use that field as an external image fallback.
The gallery URL resolver must be updated and tested for relative paths before
local assets can be delivered; the draft currently accepts absolute URLs only.

Validate a successful HTTP response, image MIME type, magic bytes, full image
decoding and dimensions before adding any file. Never save challenge HTML with an
image extension. Preserve visible watermarks, the complete uncropped photo and
source attribution. For phones, retain useful photo/floor-plan detail; use modest
compression and responsive sizes only after visually checking watermark and text
legibility. Do not enlarge, invent, substitute or remove watermarks. Verify every
local URL under `/listing-map/` in desktop/mobile browsers and after deployment.

### Local-download follow-up (2026-09-06)
Refreshed this draft with main including PR #6; all five records and their existing
fields, notes and statuses are preserved. **0 of 19 image files downloaded; no
photo feature merged or deployed.** Current capability discovery found:

- IPRoyal account access works. Singapore residential page fetching still returns
  an HTML artifact for the Pasir Ris listing. Inspection found no original gallery
  image embedded as binary data (the embedded JPEG is an unrelated 404 blur asset,
  not a listing photo, and was not substituted).
- `FETCH_RESIDENTIAL_WEB_PAGE` and `FETCH_DATACENTER_WEB_PAGE` expose bounded page
  retrieval, not a binary-download/content-type override. The prior image MIME
  rejection cannot be fixed with any documented input to these commands.
- Broker `DOWNLOAD_FILE` takes an attachment/artifact ID, not a public URL; it is
  not an arbitrary image downloader. Broker offers datacenter Chrome only, not a
  residential browser. Proxy previews are redacted, not usable download credentials.
- Prior direct/proxied Chromium image requests returned CDN 403. With no newly
  supported binary method identified, those known-failing requests were not blindly
  repeated, and no challenge or connector content-type restriction was bypassed.

Unblocking requires a supported, authorized residential binary-download interface
or user-provided original listing image files. Then validate all 19 assets, adapt
relative-path handling, test local delivery and only merge/deploy after acceptance.
No raw listing HTML or agent contact details are published.

Browser regression test: with Playwright installed and the site served on port
8000, run `node tests/gallery.cjs`. This deliberately mocks failed image responses
and checks desktop/mobile navigation, wraparound, missing images, search, statuses
and horizontal overflow. It does **not** establish real CDN delivery.

### Pending reusable-template addition
Template 14 / version ID 21 and user memory could not be edited in this background
context (template-version read permission denied; memory download HTTP 403). Preserve
all existing template instructions and append the following once access is restored.
The follow-up again received template-version permission denied and user-memory
HTTP 403, so neither was overwritten or replaced with incomplete instructions:

> For each future URL addition, collect all publicly accessible photos and floor
> plans from that exact listing's gallery into the optional `images` schema above.
> Use IPRoyal Singapore residential first for Singapore sources. Exclude agent
> portraits, recommendations and unrelated project/stock images. Never invent URLs,
> bypass access controls or remove watermarks. Preserve source attribution and URL
> parameters. Verify HTTP status, image MIME type and actual image decoding before
> claiming availability. Download and commit actual image files under `assets/listings/<id>/`; use
> relative local `src` paths compatible with `/listing-map/`, never hotlink. Retain
> exact original URLs in `sourceUrl`. Check magic bytes, decoding and dimensions,
> preserve visible watermarks and attribution, and optimize modestly for phones.
> Never substitute challenge HTML or unrelated images. If downloads are blocked,
> report the blocker and retain useful work in a draft PR; do not merge broken
> photo delivery. Verify every local image URL in desktop/mobile browsers and on
> the deployed site before claiming completion. Record `imagesChecked` and
> provenance/limitations in `imagesNote`; use an empty array if none are obtainable.
> Preserve existing images and user notes/status on refresh unless verified changes
> warrant updating them. Test navigation, missing/broken-image fallback, lazy loading,
> accessibility and desktop/mobile layout. Report unavailable photos explicitly.
