#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE="evocons"
REMOTE_PATH="/var/www/academy.evocons.it/"
SITE_URL="https://academy.evocons.it/"

cd "$PROJECT_ROOT"
for command_name in npm rsync curl; do
  command -v "$command_name" >/dev/null 2>&1 || { echo "Errore: comando $command_name non disponibile."; exit 1; }
done

printf 'Deploy Evocons Academy -> %s:%s\n' "$REMOTE" "$REMOTE_PATH"
read -r -p 'Procedere con il deploy in produzione? (y/N): ' confirm
[[ "$confirm" == 'y' || "$confirm" == 'Y' ]] || { echo 'Deploy annullato.'; exit 0; }

npm run build
[[ -f dist/index.html ]] || { echo 'Errore: dist/index.html assente.'; exit 1; }

rsync -avz --delete --omit-dir-times --human-readable --itemize-changes \
  "$PROJECT_ROOT/dist/" "$REMOTE:$REMOTE_PATH"

status="$(curl -L -sS -o /dev/null -w '%{http_code}' "$SITE_URL")"
if [[ "$status" != '200' ]]; then
  echo "Attenzione: $SITE_URL risponde HTTP $status"
  exit 1
fi
printf 'Deploy completato. %s risponde HTTP %s\n' "$SITE_URL" "$status"
