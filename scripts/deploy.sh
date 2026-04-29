#!/bin/bash
set -e

# ============================================================
# QiM-AI2.1 — One-Command Deploy Script
# Run this after: gh auth login && vercel login
# ============================================================

echo "🚀 QiM-AI2.1 Production Deploy"
echo "================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Step 1: GitHub Repo
echo -e "${BLUE}Step 1/5: Creating GitHub repo...${NC}"
if ! gh auth status >/dev/null 2>&1; then
  echo -e "${YELLOW}⚠️  Please run: gh auth login${NC}"
  exit 1
fi

REPO_EXISTS=$(gh repo view qim-ai2-1 2>/dev/null && echo "yes" || echo "no")
if [ "$REPO_EXISTS" = "no" ]; then
  gh repo create qim-ai2-1 --public --source=. --remote=origin --push
  echo -e "${GREEN}✅ GitHub repo created & code pushed${NC}"
else
  git push origin main
  echo -e "${GREEN}✅ Code pushed to existing repo${NC}"
fi

# Step 2: Deploy Backend to Render
echo -e "${BLUE}Step 2/5: Deploying backend to Render...${NC}"
echo -e "${YELLOW}   Render deploys via Blueprint from render.yaml${NC}"
echo -e "   Visit: https://dashboard.render.com/blueprints"
echo -e "   Connect repo: $(gh repo view --json url -q .url)"
echo -e "${GREEN}✅ Render blueprint ready (manual connect required once)${NC}"

# Step 3: Deploy Frontend to Vercel
echo -e "${BLUE}Step 3/5: Deploying frontend to Vercel...${NC}"
if ! vercel whoami >/dev/null 2>&1; then
  echo -e "${YELLOW}⚠️  Please run: vercel login${NC}"
  exit 1
fi

# Get Render URL for env var
read -p "Enter your Render backend URL (or press Enter to skip): " RENDER_URL
if [ -n "$RENDER_URL" ]; then
  echo "BACKEND_URL=$RENDER_URL" > .env.production
  vercel --prod --env BACKEND_URL="$RENDER_URL"
else
  vercel --prod
fi
echo -e "${GREEN}✅ Frontend deployed to Vercel${NC}"

# Step 4: Summary
echo ""
echo -e "${GREEN}🎉 QiM-AI2.1 is live!${NC}"
echo "================================"
echo "Frontend: https://qim-ai2-1.vercel.app (or your custom domain)"
echo "Backend:  $RENDER_URL (from Render)"
echo ""
echo "Next steps:"
echo "1. Add env vars in Render dashboard: OPENAI_API_KEY, STRIPE_SECRET_KEY, STRIPE_PRICE_ID, etc."
echo "2. Add BACKEND_URL env var in Vercel dashboard"
echo "3. Visit your deployed app!"
