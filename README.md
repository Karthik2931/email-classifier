# Email Classifier - MagicSlides.app Assignment

A Next.js application that classifies Gmail messages using OpenAI GPT-4o with Google OAuth authentication.

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google account
- 📧 **Gmail Integration** - Fetch emails directly from your Gmail account
- 🤖 **AI Classification** - Classify emails into categories using OpenAI GPT-4o
- 💾 **Local Storage** - All data stored locally in your browser
- 🎨 **Modern UI** - Beautiful interface built with Tailwind CSS
- 🔄 **Real-time Classification** - See results instantly

## Email Categories

- **Important** - Personal or work-related emails requiring immediate attention
- **Promotional** - Sales, discounts, marketing campaigns from businesses
- **Social** - Emails from social networks, friends, family
- **Marketing** - Newsletters, marketing content, updates
- **Spam** - Unwanted or unsolicited emails
- **General** - Everything else

## Prerequisites

- Node.js 18+ installed
- Google Cloud Console project with Gmail API enabled
- OpenAI API key

## Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized JavaScript origins: `http://localhost:3000`
6. Add authorized redirect URIs: `http://localhost:3000`
7. Copy the Client ID

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=641692746265-q1da47e5f24n5o1n9u4lapj6te0751er.apps.googleusercontent.com
```

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter OpenAI Key**: When you first open the app, enter your OpenAI API key (stored locally)
2. **Sign in with Google**: Click "Sign in with Google" and authorize the app to access your Gmail
3. **Fetch Emails**: Click "Fetch Emails" to retrieve your messages (default: 15 emails)
4. **Classify Emails**: Click "Classify Emails" to categorize your messages using AI
5. **View Results**: See categorized emails with color-coded badges

## Project Structure

```
.
├── app
│   ├── api
│   │   ├── classify/route.ts      # Email classification API
│   │   └── emails/route.ts        # Gmail fetching API
│   ├── components
│   │   ├── EmailClassifier.tsx    # Main classifier component
│   │   ├── EmailList.tsx          # Email display component
│   │   └── LoginForm.tsx          # Login and setup form
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Google OAuth** - Authentication
- **Gmail API** - Email fetching
- **OpenAI GPT-4o** - Email classification
- **Langchain.js** - LLM orchestration

## API Routes

### POST /api/emails
Fetches emails from Gmail

**Request Body:**
```json
{
  "accessToken": "google_oauth_token",
  "maxResults": 15
}
```

### POST /api/classify
Classifies emails using OpenAI

**Request Body:**
```json
{
  "emails": [...],
  "openaiKey": "sk-..."
}
```

## Security Notes

- OpenAI API key is stored locally in your browser (localStorage)
- Google OAuth token is also stored locally
- No data is sent to any backend server
- All processing happens in Next.js API routes

## License

MIT

