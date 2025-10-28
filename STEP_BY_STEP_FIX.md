# Step-by-Step Fix for 403 Error

## IMPORTANT: You MUST Add Your Email as a Test User

Your email `nadellakarthikkumar@gmail.com` is NOT currently added to the test users list in Google Cloud Console.

## Visual Step-by-Step Instructions

### Step 1: Open Google Cloud Console
1. Go to: https://console.cloud.google.com/
2. Make sure you're logged in with the Google account that created the project

### Step 2: Select Your Project
1. At the top of the page, you'll see a dropdown with your project name
2. Make sure "Email" project is selected
3. If you don't see it, click the dropdown and search for "Email"

### Step 3: Find OAuth Consent Screen
1. Look at the top of the page - there's a **search bar** at the top center
2. Click in the search bar
3. Type exactly: `oauth consent screen`
4. You should see "OAuth consent screen" appear in the results
5. **Click on "OAuth consent screen"**

### Step 4: Edit the App
1. On the OAuth consent screen page, look for a button that says:
   - **"EDIT APP"** or
   - **"CONFIGURE CONSENT SCREEN"**
2. Click that button

### Step 5: Navigate to Test Users
1. You'll see tabs or sections like:
   - App information
   - Scopes
   - **Test users** ← THIS IS WHAT YOU NEED
   - Summary
2. Click on **"Test users"** tab/section

### Step 6: Add Your Email
1. Look for a button that says:
   - **"ADD USERS"** or
   - **"+ ADD USERS"** or
   - A blue **"ADD"** button
2. Click that button
3. A dialog or text box will appear
4. Type your email: `nadellakarthikkumar@gmail.com`
5. Click **"ADD"** or **"SAVE"**

### Step 7: Save Changes
1. Scroll down and look for:
   - **"SAVE AND CONTINUE"** button, or
   - **"SAVE"** button, or
   - **"BACK TO DASHBOARD"** button
2. Click one of these buttons to save

### Step 8: Verify Scopes (IMPORTANT!)
1. Still on the OAuth consent screen
2. Click **"Scopes"** tab/section
3. Click **"ADD OR REMOVE SCOPES"**
4. Make sure these scopes are checked:
   - ✅ `https://www.googleapis.com/auth/gmail.readonly`
   - ✅ `openid`
   - ✅ `https://www.googleapis.com/auth/userinfo.profile`
   - ✅ `https://www.googleapis.com/auth/userinfo.email`
5. If any are missing, search for them and check the boxes
6. Click **"UPDATE"**
7. Click **"SAVE AND CONTINUE"**

### Step 9: Wait and Restart
1. **Wait 5 minutes** for changes to propagate
2. In your terminal, press **Ctrl+C** to stop the dev server
3. Run: `npm run dev`
4. In your browser, go to: http://localhost:3000
5. Hard refresh: **Ctrl+Shift+R** (or **Cmd+Shift+R** on Mac)

### Step 10: Try Again
1. Click "Sign in with Google"
2. It should work now!

## Alternative: Direct Link Method

1. Go to this URL (replace with your actual project ID):
   ```
   https://console.cloud.google.com/apis/credentials/consent?project=YOUR_PROJECT_ID
   ```
2. Or search for your project ID in the Google Cloud Console and append `/apis/credentials/consent`
3. Then follow steps 4-10 above

## If You Still Can't Find It

Try these search terms in the Google Cloud Console:
- "OAuth consent"
- "consent screen"
- "test users"
- "scopes"

## Troubleshooting

**Problem:** I don't see "Test users" section
**Solution:** Your app might not have a consent screen configured. Click "CONFIGURE CONSENT SCREEN" first.

**Problem:** The button is grayed out or disabled
**Solution:** Make sure you're using the account that created the project. You need to be a project owner.

**Problem:** Still getting the error after adding my email
**Solution:** 
- Wait at least 5 more minutes
- Clear all browser cookies for localhost
- Try in incognito/private mode
- Make sure you're using the correct email that you added

## What Your Screen Should Look Like

When you're in the right place, you should see:
- Title: "OAuth consent screen"
- Sections: App information, Scopes, Test users, Summary
- In "Test users" section: A list of email addresses (should include yours after adding)

---

## Quick Checklist

- [ ] Opened Google Cloud Console
- [ ] Selected "Email" project
- [ ] Searched for "oauth consent screen"
- [ ] Clicked "EDIT APP"
- [ ] Went to "Test users" section
- [ ] Added "nadellakarthikkumar@gmail.com"
- [ ] Clicked "SAVE"
- [ ] Verified all 4 scopes are present
- [ ] Waited 5 minutes
- [ ] Restarted dev server (Ctrl+C, then npm run dev)
- [ ] Hard refreshed browser
- [ ] Tried logging in again

If you check ALL of these off and it still doesn't work, there might be a different issue. Let me know!

