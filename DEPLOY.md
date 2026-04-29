# 🚀 QiM-AI2.1 — Production Deployment Guide

Deploy your AI tutor for **free** using these providers.

---

## 🎯 Quick Deploy Summary

| Service | Provider | Cost | What It Hosts |
| --- | --- | --- | --- |
| **Frontend** | Vercel | Free | Next.js app |
| **Backend** | Render or Railway | Free | Express API |
| **Database** | Supabase | Free Tier | PostgreSQL + Auth |
| **File Storage** | Supabase Storage | Free Tier | Uploaded files |
| **Monitoring** | UptimeRobot | Free | Health checks |

---

## 1️⃣ Deploy Backend (Render — Free)

### Option A: Blueprint Deploy (Easiest)

1. Push code to **GitHub**
2. Go to [dashboard.render.com/blueprints](https://dashboard.render.com/blueprints)
3. Connect your repo
4. Render reads `render.yaml` automatically
5. Add your environment variables in the dashboard:
   - `OPENAI_API_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRICE_ID`
   - `ELEVENLABS_KEY`
   - `FRONTEND_URL` (`https://qim-ai2-1.hakimsarker.org`)

### Option B: Manual

1. Create a **New Web Service**
2. Connect your GitHub repo
3. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm ci`
   - **Start Command**: `node server.js`
4. Add env vars in Render dashboard
5. Deploy!

> 📝 **Note**: Free tier sleeps after 15 min inactivity. First request after sleep takes ~30s.

---

## 2️⃣ Deploy Frontend (Vercel — Free)

1. Push code to **GitHub**
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repo
4. Vercel auto-detects Next.js
5. Add **Environment Variables**:

   ```bash
   BACKEND_URL=https://qim-ai2-1-backend.onrender.com
   ```

6. Add your custom domain in Vercel: `qim-ai2-1.hakimsarker.org`
7. Deploy!

If you host the frontend on Render instead of Vercel, `BACKEND_URL` can be wired from the backend service:

```yaml
envVars:
  - key: BACKEND_URL
    fromService:
      type: web
      name: qim-ai2-1-backend
      property: url
```

For Vercel, add `BACKEND_URL` in the Vercel dashboard manually after the backend URL exists.

> Vercel free tier includes automatic HTTPS, global CDN, and 100GB bandwidth.

---

## 3️⃣ Alternative Backend: Railway (Free)

If Render's sleep behavior is annoying, try Railway:

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Add a **Start Command**: `cd backend && node server.js`
4. Add environment variables
5. Deploy

> Railway free tier: $5 credit/month (~500 hours), no sleep.

---

## 4️⃣ Database (Supabase — Free Tier)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Add to backend env vars:

   ```bash
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-service-role-key
   ```

5. Create tables:
   - `users` (id, email, created_at)
   - `subscriptions` (id, user_id, status, stripe_customer_id)
   - `knowledge_base` (id, filename, purpose, embedding_status)
   - `uploads` (id, filename, path, created_at)

---

## 5️⃣ Environment Variables Checklist

| Variable | Frontend (Vercel) | Backend (Render/Railway) |
| --- | --- | --- |
| `OPENAI_API_KEY` | ❌ | ✅ Required |
| `STRIPE_SECRET_KEY` | ❌ | ✅ Optional |
| `STRIPE_PRICE_ID` | ❌ | ✅ Optional |
| `ELEVENLABS_KEY` | ❌ | ✅ Optional |
| `ADMIN_TOKEN` | ❌ | ✅ Required |
| `FRONTEND_URL` | ❌ | ✅ Required (CORS) |
| `BACKEND_URL` | ✅ Required | ❌ |
| `NODE_ENV` | ❌ | ✅ Set to `production` |

Legacy aliases are also accepted by the backend for compatibility: `OPENAI_KEY` for `OPENAI_API_KEY`, and `STRIPE_KEY` for `STRIPE_SECRET_KEY`.

---

## 6️⃣ Testing Production

After deploy, verify these endpoints:

```bash
# Health check
curl https://qim-ai2-1-backend.onrender.com/health

# Chat API
curl -X POST https://qim-ai2-1-backend.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

---

## 🐳 Docker (Self-Host / VPS)

If you have a VPS (DigitalOcean, AWS, Hetzner):

```bash
# Build & run everything
docker-compose up --build -d

# Or just backend
cd backend
docker build -t qim-backend .
docker run -p 4000:4000 --env-file ../.env qim-backend
```

---

## 📁 Files for Deploy

| File | Purpose |
| --- | --- |
| `render.yaml` | Render Blueprint config |
| `vercel.json` | Vercel deploy config |
| `Dockerfile` | Frontend container |
| `backend/Dockerfile` | Backend container |
| `docker-compose.yml` | Local / VPS orchestration |
| `.env.example` | Template for all env vars |
| `DEPLOY.md` | This guide |

---

## 💡 Pro Tips

- **Custom Domain**: Both Vercel and Render support free custom domains
- **SSL**: Automatic HTTPS on all providers
- **Monitoring**: Add your `/health` endpoint to UptimeRobot for free uptime monitoring
- **Logs**: Check Render/Vercel dashboards for real-time logs
- **Scale**: All providers offer paid tiers if you outgrow free limits

---

**Branding:** by hakimsarker.org · powered by Varizen Inc. · developped with love from Dhaka, Kuala Lumpur and Wyoming· in association with SohaelTasneem Foundation Ltd - a non-profit organization and ISWR, University of Dhaka.
