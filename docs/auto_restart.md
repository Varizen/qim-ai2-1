# Auto-restart & monitoring

This folder contains a helper script and a GitHub Actions workflow to monitor the backend health and try to automatically restart it if it becomes unhealthy.

What was added
- `scripts/restart_backend.sh` — attempts to trigger a redeploy using Render or Railway APIs (best-effort).
- `.github/workflows/monitor-restart.yml` — scheduled workflow (every 5 minutes) that checks `BACKEND_URL/health` and calls the restart script if the service is unhealthy.

Required repository secrets (set in GitHub Settings → Secrets):
- `BACKEND_URL` — full URL to your backend (e.g. `https://qim-ai2-1-backend.onrender.com`).
- `RENDER_API_KEY` — (optional) Render service API key with permissions to create deploys.
- `RENDER_SERVICE_ID` — (optional) Render service id to redeploy.
- `RAILWAY_API_KEY` — (optional) Railway API key (if you host on Railway).
- `RAILWAY_PROJECT_ID` — (optional) Railway project id.
- `SLACK_WEBHOOK_URL` — (optional) Slack webhook to receive notifications when restarts are attempted.

Notes & next steps
- The workflow will only *attempt* a provider restart if the corresponding secrets are present. The script uses the provider public APIs as a best-effort approach; provider API shapes can change and you may need to adapt the script to match your account details.
- For Render, the script calls `POST https://api.render.com/v1/services/:serviceId/deploys` (Render's API) — add `RENDER_API_KEY` and `RENDER_SERVICE_ID` to your repo secrets for this to work.
- If you prefer Railway or another host, update the `scripts/restart_backend.sh` script to use your provider's API/CLI.

Security
- Keep provider API keys scoped and store them in GitHub Secrets.
