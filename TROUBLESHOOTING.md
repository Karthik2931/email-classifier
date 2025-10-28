# Troubleshooting Guide

## Common Issues and Solutions

### 1. Error: "Access blocked: Web application has not completed the Google verification process"
**Error Code:** 403: access_denied

**Cause:** Your Google OAuth app is in "Testing" mode and your email is not added as a test user.

**Solution:**
1. Go to https://console.cloud.google.com/
2. Select your "Email" project
3. Search for "OAuth consent screen"
4. Click "Add users" in the Test users section
5. Add your email (nadellakarthikkumar@gmail.com)
6. Click "Save"
7. Wait 5 minutes and try again

**Detailed Instructions:** See `FIX_ACCESS_BLOCKED_ERROR.md`

---

### 2. Error: "Google Client ID is not configured"

**Cause:** The `.env.local` file is missing or the environment variable is not set.

**Solution:**
1. Copy `env.local.example` to `.env.local`:
   ```bash
   copy env.local.example .env.local
   ```
2. Open `.env.local` and verify the Client ID is set:
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   ```
3. **Restart your dev server:**
   - Stop the server (Ctrl+C)
   - Run `npm run dev` again
4. Clear browser cache or use incognito mode

---

### 3. Error: "redirect_uri_mismatch"

**Cause:** The redirect URI in your Google Cloud Console doesn't match.

**Solution:**
1. Go to Google Cloud Console → APIs & Services → Credentials
2. Click on your OAuth 2.0 Client ID
3. Under "Authorized JavaScript origins", add: `http://localhost:3000`
4. Under "Authorized redirect URIs", add: `http://localhost:3000`
5. Click "SAVE"
6. Wait a few minutes and try again

---

### 4. Emails Not Loading

**Possible Causes:**
- Token expired (tokens expire after 1 hour)
- Insufficient Gmail API scopes
- Network issues

**Solution:**
1. Log out and log back in to get a fresh token
2. Check browser console for errors
3. Verify your Gmail API is enabled in Google Cloud Console

---

### 5. OpenAI Classification Not Working

**Possible Causes:**
- Invalid OpenAI API key
- No OpenAI key set
- Rate limit exceeded

**Solution:**
1. Verify your OpenAI API key in browser localStorage
2. Check OpenAI dashboard for rate limits
3. Ensure you have credits in your OpenAI account

---

## Still Having Issues?

1. Check browser console (F12) for error messages
2. Verify your .env.local file exists and has correct Client ID
3. Make sure you restarted the dev server after modifying .env.local
4. Try using incognito mode to rule out cache issues
5. Check the detailed documentation files in the project root

