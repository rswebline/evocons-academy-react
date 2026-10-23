#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ $# -ne 1 || -z "$1" ]]; then
  echo 'Uso: ./tools/gitpush.sh "messaggio commit"'
  exit 1
fi

printf '\nModifiche correnti:\n'
git status --short
printf '\nFile già preparati per il commit:\n'
git diff --cached --name-only
if git diff --cached --quiet; then
  echo 'Nessun file in staging. Seleziona esplicitamente i file con git add <percorso>.'
  exit 1
fi

read -r -p 'Confermi commit e push dei soli file in staging? (y/N): ' confirm
[[ "$confirm" == 'y' || "$confirm" == 'Y' ]] || { echo 'Operazione annullata.'; exit 0; }

npm run build
git commit -m "$1"
git push origin main
printf 'Commit e push completati.\n'
