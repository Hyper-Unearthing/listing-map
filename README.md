# Places
A mobile-friendly, static property shortlist. GitHub Pages + `listings.json`; no database, backend, credentials or browser-only storage.

## Update the shortlist
Send Cracker a listing URL for a pull request, or use **Edit listings on GitHub** on the site. GitHub sign-in is required to edit. Changes to `main` appear after Pages deploys; reload the site on either device.

Copy an object in `listings.json` for a new place and give it a unique `id`. Use numeric `price` (SGD/month), `beds`, `lat`, `lng`, or null for unknown numbers. Status is `Interested`, `Viewing booked`, `Viewed`, or `Passed`. `viewing` is a human-readable date/time (include Singapore time). Use `approximate: true` for neighbourhood pins. Missing coordinates leave a listing in the cards without a map pin. Keep valid JSON (no trailing commas).

All source, listings, notes and Git history are public. Do not store personal contact details, credentials or private notes. Removing a value does not erase Git history.

## Run / verify
Serve this directory with `python -m http.server 8000`, then open localhost:8000. Run `node --check app.js` and `python -m json.tool listings.json` for basic validation. No build step. Pages publishes root of `main`.

Map library: Leaflet 1.9.4 from unpkg. Tiles: OpenStreetMap; attribution is displayed. These third parties receive normal browser requests. Map requires internet; card links remain usable if Leaflet fails. There is no automatic scraping or price refresh.

Initial 99.co listing details could not be fetched (HTTP 403). Title is based on the provided URL; price and beds remain unknown. The initial pin is explicitly approximate, using an OpenStreetMap Nominatim Pasir Ris station result, not verified property coordinates.
