# How to Find OAuth Consent Screen

## You're Currently On: OAuth Overview (Wrong Place)

The page you're viewing is the "OAuth Overview" which shows metrics. You need to go to the **OAuth Consent Screen** instead.

## Method 1: Using Search (EASIEST - DO THIS!)

1. **Click the search bar** at the top center of the page (where it currently shows "ap")
2. **Delete the "ap" and type**: `OAuth consent screen`
3. **Press Enter** or click the first result
4. You should now see a page with an **"EDIT APP"** button
5. Click **"EDIT APP"** button
6. Navigate to **"Scopes"** section
7. Click **"ADD OR REMOVE SCOPES"**
8. Add the scopes needed for Email Classifier

## Method 2: Using Navigation Menu

1. **Click the hamburger menu** (☰) in the top left corner
2. Look for **"APIs & Services"** in the left sidebar
3. Click **"APIs & Services"**
4. Click **"OAuth consent screen"** from the submenu

## Method 3: Direct URL

1. Copy and paste this URL in your browser (replace PROJECT_ID with your project ID):
   ```
   https://console.cloud.google.com/apis/credentials/consent?project=YOUR_PROJECT_ID
   ```

## Once You're on OAuth Consent Screen

You should see:
- A page titled "OAuth consent screen"
- An **"EDIT APP"** button (or "CONFIGURE CONSENT SCREEN" if not set up)
- Options to configure: App information, Scopes, Test users, etc.

## What You're Looking For

The OAuth consent screen page will have sections like:
1. **App information** - App name, logo, etc.
2. **Scopes** ⬅️ **THIS IS WHERE YOU ADD SCOPES**
3. **Test users**
4. **Summary**

## Quick Visual Guide

```
Current Location (Wrong):
Google Cloud Console
└── Google Auth Platform
    └── Overview ⬅️ You are here

Correct Location:
Google Cloud Console
└── APIs & Services
    └── OAuth consent screen ⬅️ Go here instead
        └── Click "EDIT APP"
            └── Go to "Scopes" section
```

## Still Having Trouble?

Try these searches in the search bar:
- `consent screen`
- `scopes`
- `oauth consent`

One of these should take you to the right place where you can edit the app and add scopes.

