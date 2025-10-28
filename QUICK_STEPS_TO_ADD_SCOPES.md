# Quick Steps to Add OAuth Scopes

## Where to Add Scopes

**IMPORTANT**: You need to add scopes on the **OAuth Consent Screen**, NOT on the OAuth Client configuration page you're currently viewing.

## Step-by-Step Instructions

1. **Go to OAuth Consent Screen**:
   - In Google Cloud Console, use the left sidebar
   - Click: **APIs & Services** → **OAuth consent screen**
   - This is different from the "Credentials" page

2. **Edit the Consent Screen**:
   - Click the **"EDIT APP"** button

3. **Navigate to Scopes**:
   - Click **"Save and Continue"** until you reach the "Scopes" page
   - Or if editing, directly go to the "Scopes" section

4. **Add Required Scopes**:
   - Click **"ADD OR REMOVE SCOPES"** button
   - In the search box, add these scopes one by one:
   
   **Required for Email Classifier:**
   - Type and select: `gmail.readonly` → Select `.../auth/gmail.readonly`
   - Type and select: `openid` → Select `openid`
   - Type and select: `profile` → Select `profile` 
   - Type and select: `email` → Select `email`
   
   - Click **"UPDATE"** at the bottom of the modal

5. **Continue and Save**:
   - Click **"SAVE AND CONTINUE"** through the remaining steps
   - Make sure your email is added as a test user if your app is in "Testing" mode
   - Click **"BACK TO DASHBOARD"** when done

6. **Restart Your Dev Server**:
   ```bash
   # Stop with Ctrl+C, then:
   npm run dev
   ```

## Visual Guide

The page you're currently on shows scopes that were configured elsewhere (OAuth consent screen). 

Think of it this way:
- **OAuth Consent Screen** = Where you define WHAT data your app needs (scopes)
- **Credentials Page** = Where you get your Client ID (just shows the configured scopes)

## What Scopes Do You Need?

For this Email Classifier app, you need:

1. **`https://www.googleapis.com/auth/gmail.readonly`** - To read Gmail messages
2. **`openid`** - For user identification (Google Identity Services)
3. **`profile`** - To get user's profile information
4. **`email`** - To get user's email address

## Troubleshooting

**Can't find the scopes?**
- Make sure you're on the OAuth consent screen, not credentials
- Look for "Scopes" in the left sidebar when editing the OAuth consent screen

**App still in Testing mode?**
- Make sure your Google account email is added as a test user
- You can only log in with test user emails when in testing mode

**Scopes not appearing?**
- Clear browser cache and restart dev server
- Check that you saved all changes and clicked "BACK TO DASHBOARD"

