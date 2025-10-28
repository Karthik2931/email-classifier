# Fix: "Failed to fetch emails" Error

## ✅ Good News: OAuth Login Works!

You successfully signed in with Google! The 403 error is fixed.

## ❌ Current Issue: Email Fetching Failed

The app can't fetch your Gmail messages. This is likely because:

1. **Gmail API is not enabled** in Google Cloud Console
2. **Missing Gmail API scopes** in OAuth consent screen
3. **Token doesn't have Gmail access**

## Quick Fix Steps

### Step 1: Enable Gmail API
1. Go to: https://console.cloud.google.com/
2. Select your "Email" project
3. In the search bar, type: **"Gmail API"**
4. Click on **"Gmail API"** from results
5. Click the **"ENABLE"** button
6. Wait for it to enable (may take 1-2 minutes)

### Step 2: Verify OAuth Scopes
1. Search for: **"OAuth consent screen"**
2. Click **"EDIT APP"**
3. Go to **"Scopes"** section
4. Click **"ADD OR REMOVE SCOPES"**
5. Make sure this scope is checked:
   - ✅ `https://www.googleapis.com/auth/gmail.readonly`
6. Click **"UPDATE"**
7. Click **"SAVE AND CONTINUE"**

### Step 3: Test Again
1. **Restart your dev server:**
   - Press Ctrl+C in terminal
   - Run: `npm run dev`
2. **Clear browser cache** or use incognito mode
3. **Log out and log back in** to get fresh token
4. Try "Fetch Emails" again

## Debug Steps

### Check Browser Console
1. Press **F12** to open developer tools
2. Go to **"Console"** tab
3. Click "Fetch Emails" again
4. Look for error messages
5. Share any error messages you see

### Check Network Tab
1. In developer tools, go to **"Network"** tab
2. Click "Fetch Emails"
3. Look for failed requests (red entries)
4. Click on failed requests to see error details

## Common Error Messages

**"Gmail API has not been used in project"**
- Solution: Enable Gmail API (Step 1 above)

**"Insufficient Permission"**
- Solution: Add Gmail scope (Step 2 above)

**"Invalid Credentials"**
- Solution: Log out and log back in

## Alternative: Check Gmail API Status

1. Go to: https://console.cloud.google.com/apis/library/gmail.googleapis.com
2. Make sure it shows **"ENABLED"**
3. If it shows **"ENABLE"**, click it

## Still Not Working?

1. **Share the exact error message** from browser console
2. **Check if Gmail API is enabled** in Google Cloud Console
3. **Verify the scope** `gmail.readonly` is added
4. **Try logging out and back in**

---

## What to Do Next

1. Enable Gmail API (most likely fix)
2. Verify Gmail scope is added
3. Restart dev server
4. Try again
5. If still failing, share the console error message

