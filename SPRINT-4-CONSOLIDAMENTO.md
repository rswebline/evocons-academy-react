# Sprint 4 — Consolidamento homepage

## Modifiche
- Fotografia del corso AI per il lavoro distinta dalla Hero.
- Fotografia AI Automation Specialist orientata a dati e processi digitali.
- Testi della sezione Come si impara resi più specifici.
- CTA finale differenziata dalle altre CTA della pagina.
- Il pulsante Come funziona nella Hero punta alla sezione corretta.

## SEO verificata
- `index.html`: lingua italiana, title, description, canonical, Open Graph, Twitter Card, JSON-LD WebSite.
- `public/robots.txt`: sitemap e crawling abilitato.
- `public/sitemap.xml`: URL canonico della homepage.
- `public/og-academy.jpg`: 1200 × 630 px.

## Da verificare prima del deploy
- Fotografie esterne Unsplash: disponibilità, resa grafica e opportunità di hosting locale.
- Anteprima Open Graph reale e indicizzazione su Search Console.
- Dati societari, privacy e cookie policy prima di attivare la raccolta lead.
- I percorsi sono proposte in preparazione, non iscrizioni già aperte.

## Comandi
`npm ci && npm run build`

Deploy dal Mac (cartella progetto):
`rsync -avz --delete -e "ssh -i $HOME/.ssh/id_ed25519 -o IdentitiesOnly=yes" dist/ stefano@evocons.it:/var/www/academy.evocons.it/`

Git:
`git add . && git commit -m "Sprint 4 - Homepage visual refinement and SEO verification" && git push origin main`
