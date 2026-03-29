<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Deployment (Google Cloud Run)

**Live URL:** https://gabriel-portugues-494148911439.us-central1.run.app

**GCP Project:** `gen-lang-client-0900539959` (us-central1)

### Quick Redeploy

```bash
# Build and push new image, then deploy
gcloud builds submit --tag us-central1-docker.pkg.dev/gen-lang-client-0900539959/gabriel-portugues/app:latest . && \
gcloud run deploy gabriel-portugues --image us-central1-docker.pkg.dev/gen-lang-client-0900539959/gabriel-portugues/app:latest --region us-central1
```

### Environment Variables

Set via Cloud Run (not in code):
```bash
gcloud run services update gabriel-portugues --set-env-vars "GEMINI_API_KEY=xxx" --region us-central1
```

### Key Files

- `Dockerfile` — Multi-stage Node.js 20 build
- `next.config.ts` — Uses `output: "standalone"` for Docker
- `.dockerignore` — Excludes node_modules, .env, etc.

### Troubleshooting

```bash
# View logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=gabriel-portugues" --limit=20

# Check service status
gcloud run services describe gabriel-portugues --region us-central1
```
