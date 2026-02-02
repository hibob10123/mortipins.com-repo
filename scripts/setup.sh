#!/usr/bin/env bash
set -euo pipefail

D1_NAME=${1:-}
KV_ID=${2:-}
CREATE_KV=${3:-false}

if [[ -z "$D1_NAME" ]]; then
  echo "Usage: ./scripts/setup.sh <D1_NAME> [KV_ID] [CREATE_KV:false]"
  exit 1
fi

echo "Using D1: $D1_NAME"

if [[ "$CREATE_KV" == "true" && -z "$KV_ID" ]]; then
  echo "Creating KV namespace LEADERBOARD_KV..."
  wrangler kv namespace create "LEADERBOARD_KV"
  echo "Run 'wrangler kv namespace list' to find the id and rerun with KV_ID set if you need to set bindings." 
fi

for sql in migrations/*.sql; do
  echo "Applying $sql"
  wrangler d1 execute --database "$D1_NAME" --file "$sql"
done

read -p "Add JWT_SECRET? (y/N): " add
if [[ "$add" == "y" ]]; then
  read -p "Enter secret: (blank to auto-generate) " secret
  if [[ -z "$secret" ]]; then
    secret=$(uuidgen)$(uuidgen)
    echo "Generated secret: $secret"
  fi
  printf "%s" "$secret" | wrangler secret put JWT_SECRET
fi

# Deploy workers
npm run deploy:dashboard
npm run deploy:leaderboard
npm run deploy:cron

echo "Done. Verify Cron triggers and KV in Cloudflare Dashboard."