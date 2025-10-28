# Google Cloud Setup Guide for Email Classifier

Follow these steps to set up Google OAuth for your Email Classifier app.

## Important: Migration to Google Identity Services

This app now uses the **new Google Identity Services (GIS)** library instead of the deprecated `gapi.auth2`. This resolves the "idpiframe_initialization_failed" error.

## Step 1: Enable Gmail API

1. In the Google Cloud Console, make sure your "Email" project is selected
2. In the search bar at the top, type "Gmail API" and select it
3. Click the **"ENABLE"** button
4. Wait for the API to be enabled (this may take a minute)

## Step 2: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials** (using the left sidebar)
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"**
4. If prompted, configure the OAuth consent screen first:
   - **IMPORTANT**: When asked "What data will you access?", select **"User data"** (NOT "Application data")
   - User Type: Select **"External"** (unless you have a Google Workspace)
   - Click **"CREATE"**
   - App name: "Email Classifier"
   - User support email: Select your email
   - Developer contact email: Enter your email
   - Click **"SAVE AND CONTINUE"**
   - Scopes: Click **"ADD OR REMOVE SCOPES"**
     - Search for and check: `.../auth/gmail.readonly`
     - Search for and check: `openid`, `profile`, `email` (for user info)
     - Click **"UPDATE"** → **"SAVE AND CONTINUE"**
   - Test users: Click **"ADD USERS"** and add your Google email
     - Click **"SAVE AND CONTINUE"**
   - Summary: Click **"BACK TO DASHBOARD"**
5. Back to creating credentials:
   - Application type: Select **"Web application"**
   - Name: "Email Classifier Web Client"
   - **Authorized JavaScript origins**: Add:
     - `http://localhost:3000`
   - **⚠️ IMPORTANT**: For Google Identity Services, NO redirect URI is needed for token-based flow
   - Click **"CREATE"**
6. You'll see a popup with your **Client ID** and **Client secret**
   - Copy the **Client ID** (looks like: `XXXXX.apps.googleusercontent.com`)
   - **IMPORTANT**: Save this Client ID!
   - Note: You do not need the Client secret for this implementation

## Step 3: Add Client ID to Your App

1. In your project folder, create a file named `.env.local`:
   ```bash
   cp env.local.example .env.local
   ```

2. Open `.env.local` and replace `your_google_client_id_here` with your actual Client ID:
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE.apps.googleusercontent.com
   ```

3. Save the file

## Step 4: Run Your App

```bash
npm install
npm run dev
```

## Troubleshooting

- If you see "OAuth client not found", double-check your Client ID
- If authentication fails, make sure `http://localhost:3000` is in authorized JavaScript origins
- If you get a "redirect_uri_mismatch" error, verify the redirect URI is exactly `http://localhost:3000`

## Security Note

- Never commit `.env.local` to version control (it's already in .gitignore)
- The Client ID is safe to expose (it's public)
- Keep your Client secret secure (we don't need it for this app)
