#!/usr/bin/env bash
set -euo pipefail

# restart_backend.sh
# Attempts to trigger a redeploy/restart of the backend using provider APIs.
# Environment variables (provide as GitHub secrets in Actions):
# - RENDER_API_KEY, RENDER_SERVICE_ID
# - RAILWAY_API_KEY, RAILWAY_PROJECT_ID
# - BACKEND_URL (used for fallback messaging)
# - SLACK_WEBHOOK_URL (optional)

RENDER_API_KEY=${RENDER_API_KEY:-}
RENDER_SERVICE_ID=${RENDER_SERVICE_ID:-}
RAILWAY_API_KEY=${RAILWAY_API_KEY:-}
RAILWAY_PROJECT_ID=${RAILWAY_PROJECT_ID:-}
BACKEND_URL=${BACKEND_URL:-}
SLACK_WEBHOOK_URL=${SLACK_WEBHOOK_URL:-}

notify_slack() {
  if [ -n "${SLACK_WEBHOOK_URL}" ]; then
    payload=$(printf '{"text":"%s"}' "$1")
    curl -s -X POST -H 'Content-Type: application/json' -d "$payload" "$SLACK_WEBHOOK_URL" || true
  fi
}

echo "Auto-restart helper starting"

if [ -n "${RENDER_API_KEY}" ] && [ -n "${RENDER_SERVICE_ID}" ]; then
  echo "Triggering Render deploy for service ${RENDER_SERVICE_ID}"
  # Render deploy endpoint: POST /v1/services/:serviceId/deploys
  resp=$(curl -s -X POST "https://api.render.com/v1/services/${RENDER_SERVICE_ID}/deploys" \
    -H "Authorization: Bearer ${RENDER_API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{}') || true
  echo "Render response: $resp"
  notify_slack "Render restart requested for service ${RENDER_SERVICE_ID}."
  exit 0
fi

if [ -n "${RAILWAY_API_KEY}" ] && [ -n "${RAILWAY_PROJECT_ID}" ]; then
  echo "Attempting Railway redeploy for project ${RAILWAY_PROJECT_ID} (best-effort)"
  # Railway's public API surface can change; this attempt is a best-effort placeholder.
  resp=$(curl -s -X POST "https://api.railway.app/v1/projects/${RAILWAY_PROJECT_ID}/deployments" \
    -H "Authorization: Bearer ${RAILWAY_API_KEY}" \
    -H "Content-Type: application/json" \
    -d '{}' ) || true
  echo "Railway response: $resp"
  notify_slack "Railway restart requested for project ${RAILWAY_PROJECT_ID}."
  exit 0
fi

echo "No provider credentials found in environment. Cannot restart automatically."
if [ -n "${BACKEND_URL}" ]; then
  notify_slack "Auto-restart attempted but no provider credentials found. Backend URL: ${BACKEND_URL}"
else
  notify_slack "Auto-restart attempted but no provider credentials found."
fi
exit 1
