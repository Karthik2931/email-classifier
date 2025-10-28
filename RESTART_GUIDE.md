# How to Properly Restart Your Next.js Server

## Step-by-Step Instructions

### 1. Stop ALL Running Node Processes

In your terminal where `npm run dev` is running:
1. Press **`Ctrl + C`** to stop the server
2. Wait for it to completely stop (you should see the `>` prompt)

### 2. Verify the .env.local file exists

```powershell
Get-Content .env.local
```

You should see:
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=641692746265-q1da47e5f24n5o1n9u4lapj6te0751er.apps.googleusercontent.com
```

### 3. Start Fresh

```bash
npm run dev
```

### 4. Check the Console

Once the server starts, look at:
- **Terminal output** - Should show "Ready" and no errors
- **Browser console** (F12) - Should show the debug log with your Client ID

### 5. If It Still Doesn't Work

Try these additional steps:

**Option A: Kill all Node processes**
```powershell
Get-Process node | Stop-Process -Force
```

Then restart:
```bash
npm run dev
```

**Option B: Clear Next.js cache**
```bash
Remove-Item -Recurse -Force .next
npm run dev
```

**Option C: Check browser cache**
- Press `Ctrl + Shift + Delete`
- Clear cache and cookies for localhost
- Or use Incognito mode (Ctrl + Shift + N)

### What to Look For

After restarting, open browser console (F12) and you should see:
```
🔍 Debug - Environment Variables:
NEXT_PUBLIC_GOOGLE_CLIENT_ID: 641692746265-q1da47e5f24n5o1n9u4lapj6te0751er...
```

If you see `undefined` instead, the environment variable isn't loading.
