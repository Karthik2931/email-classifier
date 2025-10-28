# Quick Start Guide

## Important: Restart After Environment Changes

**Whenever you modify `.env.local`, you MUST restart the Next.js dev server!**

### Steps:
1. In your terminal running `npm run dev`, press `Ctrl+C` to stop
2. Run `npm run dev` again to restart
3. Refresh your browser at `http://localhost:3000`

## Current Configuration

✅ **.env.local file created with:** 
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=641692746265-q1da47e5f24n5o1n9u4lapj6te0751er.apps.googleusercontent.com
```

## What to Check Next:

1. **Restart server** - This is critical!
2. **Authorized Origins in Google Cloud Console**:
   - Go to: APIs & Services → Credentials
   - Click your OAuth 2.0 Client ID
   - Under "Authorized JavaScript origins", add: `http://localhost:3000`
   - Under "Authorized redirect URIs", add: `http://localhost:3000`
   - Click SAVE

3. **Refresh browser** and try again

## Troubleshooting:

If you still see "Google Client ID is not configured":
- Make sure `.env.local` exists (not just `env.local.example`)
- Restart the dev server completely
- Clear browser cache or use incognito mode
- Check browser console for errors
