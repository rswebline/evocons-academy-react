# Evocons Academy — Sprint 4

## Modifiche
- Tre immagini editoriali nelle schede dei percorsi (caricate da Unsplash tramite URL esterni).
- Meta title, description, canonical, Open Graph, Twitter card e WebSite JSON-LD.
- `public/robots.txt`, `public/sitemap.xml`, `public/og-academy.jpg`.

## Verifica
1. `npm install` (se necessario) e `npm run build`.
2. `npm run dev` per verificare immagini e layout mobile.
3. Deploy con rsync della cartella `dist/` come negli sprint precedenti.
4. Verificare `https://academy.evocons.it/robots.txt`, `/sitemap.xml`, `/og-academy.jpg`.

## Attenzioni
- Le immagini Unsplash sono esterne: prima della release definitiva valutare download e hosting locale, diritti/licenze e prestazioni.
- Non sono stati aggiunti schema Course o Event: programmi, disponibilità, prezzi e date non sono ancora definitivi.
- La sitemap elenca solo la homepage realmente esistente.
- Non sono stati inseriti dati aziendali, recensioni o numeri non verificati.
- Le CTA delle schede non portano ancora a pagine corso; saranno implementate negli sprint successivi.
