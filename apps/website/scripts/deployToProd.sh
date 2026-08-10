#!/usr/bin/env bash
set -euo pipefail

readonly DEPLOY_HOST="${DEPLOY_HOST:-192.248.180.123}"
readonly DEPLOY_USER="${DEPLOY_USER:-emad}"
readonly DEPLOY_KEY="${DEPLOY_KEY:-key}"
readonly DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
readonly REMOTE_PROJECT_DIR="${REMOTE_PROJECT_DIR:-/home/emad/projects/emadunan}"
readonly APP_NAME="emadunan"

if [[ ! -r "$DEPLOY_KEY" ]]; then
  echo "❌ SSH key is not readable: $DEPLOY_KEY" >&2
  echo "   Run from the directory containing 'key', or set DEPLOY_KEY=/path/to/key." >&2
  exit 1
fi

echo "🚀 Deploying $APP_NAME to $DEPLOY_USER@$DEPLOY_HOST..."

ssh \
  -i "$DEPLOY_KEY" \
  -o StrictHostKeyChecking=no \
  "$DEPLOY_USER@$DEPLOY_HOST" \
  "bash -s -- '$REMOTE_PROJECT_DIR' '$DEPLOY_BRANCH' '$APP_NAME'" <<'EOF'
set -euo pipefail

readonly REMOTE_PROJECT_DIR="$1"
readonly DEPLOY_BRANCH="$2"
readonly APP_NAME="$3"

export PATH="$HOME/.nvm/versions/node/v22.21.1/bin:$PATH"

for command_name in git node pnpm pm2; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "❌ Required command not found on server: $command_name" >&2
    exit 1
  fi
done

cd "$REMOTE_PROJECT_DIR"

if [[ "$(git branch --show-current)" != "$DEPLOY_BRANCH" ]]; then
  echo "❌ Expected server branch '$DEPLOY_BRANCH', found '$(git branch --show-current)'" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "❌ The server checkout contains tracked local changes." >&2
  exit 1
fi

echo "⬇️ Updating origin/$DEPLOY_BRANCH..."
git pull --ff-only origin "$DEPLOY_BRANCH"

echo "📥 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🏗️ Building website..."
pnpm --filter website build

echo "♻️ Starting or reloading $APP_NAME..."
pm2 startOrReload apps/website/ecosystem.config.js --only "$APP_NAME" --update-env

website_pid="$(pm2 pid "$APP_NAME")"
if [[ ! "$website_pid" =~ ^[1-9][0-9]*$ ]]; then
  echo "❌ $APP_NAME failed to start. Check: pm2 logs $APP_NAME" >&2
  pm2 list
  exit 1
fi

pm2 save
pm2 list
EOF

echo "✅ Production deployment completed successfully"
