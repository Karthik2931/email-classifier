# Fix: "Access blocked: Web application has not completed the Google verification process"

## Error: 403 access_denied

This error occurs when your Google OAuth app is in "Testing" mode and your email is not added as a test user.

## Solution: Add Your Email as a Test User

### Step 1: Go to Google Cloud Console
1. Open https://console.cloud.google.com/
2. Select your "Email" project
3. Make sure you're logged in with your Google account

### Step 2: Navigate to OAuth Consent Screen
1. In the top search bar, type: **"OAuth consent screen"**
2. Click on **"OAuth consent screen"**
3. If you see **"Edit App"** button, click it
4. If you see **"Configure consent screen"**, click it

### Step 3: Add Your Email as Test User
1. Scroll down to the **"Test users"** section
2. Click **"Add users"** or **"+ ADD USERS"** button
3. Enter your email: **nadellakarthikkumar@gmail.com**
4. Click **"ADD"** or **"SAVE"**
5. Click **"SAVE AND CONTINUE"** or **"BACK TO DASHBOARD"**

### Step 4: Verify Authorized Origins
1. Go to **APIs & Services** → **Credentials**
2. Click on your OAuth 2.0 Client ID (the one ending with `.apps.googleusercontent.com`)
3. Under **"Authorized JavaScript origins"**, make sure you have:
   - `http://localhost:3000`
4. Under **"Authorized redirect URIs"**, add:
   - `http://localhost:3000`
   - `http://localhost:3000/callback`
5. Click **"SAVE"**

### Step 5: Verify Required Scopes Are Added
1. Go back to **OAuth consent screen**
2. Click **"EDIT APP"**
3. Scroll to **"Scopes"** section
4. Click **"ADD OR REMOVE SCOPES"**
5. In the filter box, search for and add these scopes:
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `openid`
   - `profile`
   - `email`
6. Click **"UPDATE"**
7. Click **"SAVE AND CONTINUE"**

### Step 6: Restart Your Application
1. Stop your dev server (Ctrl+C in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```
3. Clear your browser cache or use incognito mode
4. Try logging in again

## Alternative: Publish Your App (Not Required)

If you want to allow any user to access your app (not just test users):
1. Go to **OAuth consent screen**
2. Under **"Publishing status"**, click **"PUBLISH APP"**
3. Click **"CONFIRM"**

**Note:** Publishing may require Google to review your app if you're requesting sensitive scopes.

## Troubleshooting

If you still see the error after adding your email as a test user:
1. Make sure you're logged into Google with the correct email (nadellakarthikkumar@gmail.com)
2. Wait 5-10 minutes after making changes in Google Cloud Console
3. Try logging out and logging back into Google
4. Clear all cookies and cache for localhost
5. Try again in incognito mode

## Important Notes

- Changes in Google Cloud Console can take a few minutes to propagate
- The error message will show your email address next to the "N" icon
- Make sure the email shown in the error matches the one you added as a test user
- You must be logged into Google Cloud Console with the project owner account

