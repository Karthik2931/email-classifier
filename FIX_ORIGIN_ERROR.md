# Fix "Not a valid origin" Error

You're seeing this error because your OAuth client needs to have `http://localhost:3000` configured as an authorized origin.

## Steps to Fix:

1. **Go to Google Cloud Console** → Your "Email" project

2. **Navigate to**: APIs & Services → Credentials

3. **Find your OAuth 2.0 Client ID** (the one ending with `.apps.googleusercontent.com`)

4. **Click on it** to edit

5. **Under "Authorized JavaScript origins"**, make sure you have:
   - `http://localhost:3000`

6. **Under "Authorized redirect URIs"**, make sure you have:
   - `http://localhost:3000`

7. **Click "SAVE"**

8. **Wait 5-10 seconds** for the changes to propagate

9. **Restart your Next.js server** (stop with Ctrl+C and run `npm run dev` again)

10. **Try logging in again**

## Important Notes:

- The URL must be exactly `http://localhost:3000` (not `https` or different port)
- After saving, wait a moment for Google's servers to update
- You may need to clear your browser cache or use incognito mode if it still doesn't work

## If it still doesn't work:

1. Check that your Client ID is: `641692746265-q1da47e5f24n5o1n9u4lapj6te0751er.apps.googleusercontent.com`
2. Verify in the Credentials page that this is the ID you're using
3. Make sure Gmail API is enabled in your project
