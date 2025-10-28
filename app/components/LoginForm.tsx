'use client'

import { useState, useEffect } from 'react'

interface LoginFormProps {
  onLogin: (userData: any) => void
  hasOpenAIKey: boolean
  onSetOpenAIKey: () => void
}

export default function LoginForm({ onLogin, hasOpenAIKey, onSetOpenAIKey }: LoginFormProps) {
  const [apiKey, setApiKey] = useState('')
  const [aiProvider, setAiProvider] = useState<'openai' | 'gemini'>('gemini')
  const [isKeyConfigured, setIsKeyConfigured] = useState(false)

  // Check for existing API key on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('ai_api_key')
    const storedProvider = localStorage.getItem('ai_provider')
    
    if (storedKey && storedProvider) {
      setIsKeyConfigured(true)
      setAiProvider(storedProvider as 'openai' | 'gemini')
    } else {
      setIsKeyConfigured(false)
    }
  }, [])

  const loadGoogleIdentityServices = () => {
    return new Promise<void>((resolve, reject) => {
      // Check if already loaded
      if (window.google?.accounts) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  // Only load Google Identity Services when API key is configured
  useEffect(() => {
    if (isKeyConfigured && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      loadGoogleIdentityServices()
    }
  }, [isKeyConfigured])

  const handleSetKey = () => {
    // Validate API key format
    if (aiProvider === 'openai' && !apiKey.startsWith('sk-')) {
      alert('Invalid OpenAI API key. The key should start with "sk-"')
      return
    }
    if (aiProvider === 'gemini' && !apiKey.startsWith('AIza')) {
      alert('Invalid Gemini API key. The key should start with "AIza"')
      return
    }

    // Validate API key is not empty
    if (!apiKey.trim()) {
      alert('Please enter a valid API key')
      return
    }

    // Store in localStorage
    localStorage.setItem('ai_api_key', apiKey)
    localStorage.setItem('ai_provider', aiProvider)
    
    // Update state
    setIsKeyConfigured(true)
    
    // Clear the input field for security
    setApiKey('')
    
    // Notify parent component
    onSetOpenAIKey()
  }

  const handleChangeKey = () => {
    const confirmed = confirm('Are you sure you want to change your AI API key?')
    if (confirmed) {
      localStorage.removeItem('ai_api_key')
      localStorage.removeItem('ai_provider')
      setApiKey('')
      setIsKeyConfigured(false)
      // Reload to reset state
      window.location.reload()
    }
  }

  const handleGoogleLogin = async () => {
    // Double-check that API key is configured before allowing login
    const storedKey = localStorage.getItem('ai_api_key')
    if (!storedKey) {
      alert('Please configure your API key first')
      setIsKeyConfigured(false)
      return
    }

    try {
      // Check if Client ID is available
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      if (!clientId) {
        alert('Google Client ID is not configured. Please check your .env.local file and restart the dev server.')
        console.error('Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable')
        return
      }

      console.log('Initializing Google OAuth with Client ID:', clientId.substring(0, 20) + '...')
      
      // Load Google Identity Services
      await loadGoogleIdentityServices()
      
      // Initialize Google OAuth client
      const tokenClient = window.google!.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
        callback: '', // defined later
      })

      // Get access token
      tokenClient.requestAccessToken({ prompt: 'consent' })

      return new Promise<void>((resolve, reject) => {
        tokenClient.callback = async (resp: any) => {
          if (resp.error !== undefined) {
            // Handle specific error cases
            if (resp.error === 'access_denied') {
              alert(
                'Access blocked: Your email is not added as a test user.\n\n' +
                'Please follow these steps:\n' +
                '1. Go to https://console.cloud.google.com/\n' +
                '2. Select your "Email" project\n' +
                '3. Search for "OAuth consent screen"\n' +
                '4. Click "Add users" in the Test users section\n' +
                '5. Add your email address and click Save\n' +
                '6. Wait 5 minutes and try again\n\n' +
                'See FIX_ACCESS_BLOCKED_ERROR.md for detailed instructions.'
              )
            } else {
              alert(`Google login failed: ${resp.error}\n\n${resp.error_description || ''}`)
            }
            reject(resp)
            return
          }

          try {
            // Use access token to get user info
            const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + resp.access_token)
            const userData = await response.json()

            // Store access token and user info
            onLogin({
              name: userData.name,
              email: userData.email,
              image: userData.picture,
              accessToken: resp.access_token,
              expiresAt: Date.now() + 3600000 // 1 hour from now
            })

            resolve()
          } catch (error) {
            reject(error)
          }
        }
      })
    } catch (error) {
      console.error('Google login error:', error)
      alert('Failed to login with Google. Please try again.')
    }
  }

  const getApiKeyPlaceholder = () => {
    return aiProvider === 'openai' ? 'sk-proj-...' : 'AIza...'
  }

  const getApiKeyLink = () => {
    return aiProvider === 'openai' 
      ? 'https://platform.openai.com/api-keys'
      : 'https://aistudio.google.com/app/apikey'
  }

  const getApiKeyInfo = () => {
    if (aiProvider === 'openai') {
      return (
        <>
          Get your API key from: <a href={getApiKeyLink()} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Platform</a>
          <br />
          <span className="text-yellow-600">⚠️ Requires payment ($5 minimum)</span>
        </>
      )
    } else {
      return (
        <>
          Get your API key from: <a href={getApiKeyLink()} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>
          <br />
          <span className="text-green-600">✅ Completely FREE (1500 requests/day)</span>
        </>
      )
    }
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Welcome to Email Classifier
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Classify your Gmail messages using AI. Get started by setting up your AI API key and logging in with Google.
      </p>

      {!isKeyConfigured ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="ai-provider" className="block text-sm font-medium text-gray-700 mb-2">
              Choose AI Provider
            </label>
            <select
              id="ai-provider"
              value={aiProvider}
              onChange={(e) => setAiProvider(e.target.value as 'openai' | 'gemini')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="gemini">Google Gemini (FREE)</option>
              <option value="openai">OpenAI (Paid - Better Quality)</option>
            </select>
          </div>

          <div>
            <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-2">
              {aiProvider === 'openai' ? 'OpenAI' : 'Google Gemini'} API Key
            </label>
            <input
              type="password"
              id="api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={getApiKeyPlaceholder()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-sm text-gray-500 mt-2">
              Your API key is stored locally in your browser and never sent to our servers.
              <br />
              {getApiKeyInfo()}
            </p>
          </div>
          <button
            onClick={handleSetKey}
            disabled={!apiKey}
            className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save API Key
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
            <p className="text-green-800 text-sm">
              ✓ {localStorage.getItem('ai_provider') === 'gemini' ? 'Google Gemini' : 'OpenAI'} API key configured
            </p>
            <button
              onClick={handleChangeKey}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Change Key
            </button>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="w-full btn btn-primary flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  )
}