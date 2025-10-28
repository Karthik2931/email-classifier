'use client'

import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import EmailList from './components/EmailList'
import EmailClassifier from './components/EmailClassifier'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasAPIKey, setHasAPIKey] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem('gmail_auth')
    const apiKey = localStorage.getItem('ai_api_key') // Changed from 'openai_key'
    
    console.log('🔍 Checking auth state:', {
      hasAuth: !!authData,
      hasApiKey: !!apiKey
    })
    
    if (authData) {
      const userData = JSON.parse(authData)
      // Check if token is still valid
      if (userData.expiresAt && userData.expiresAt > Date.now()) {
        setIsAuthenticated(true)
        setUser(userData)
      } else {
        // Token expired, clear auth data
        localStorage.removeItem('gmail_auth')
      }
    }
    
    if (apiKey) {
      setHasAPIKey(true)
    }
  }, [])

  const handleLogin = (userData: any) => {
    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem('gmail_auth', JSON.stringify(userData))
  }

  const handleSetAPIKey = () => {
    const key = localStorage.getItem('ai_api_key') // Changed from 'openai_key'
    console.log('🔍 API Key set, checking:', !!key)
    if (key) {
      setHasAPIKey(true)
    }
  }

  const handleLogout = () => {
    // Get auth data before clearing
    const authData = localStorage.getItem('gmail_auth')
    
    // Revoke Google access token if it exists
    if (authData && typeof window !== 'undefined' && window.google?.accounts?.oauth2) {
      try {
        const userData = JSON.parse(authData)
        if (userData.accessToken) {
          window.google.accounts.oauth2.revoke(userData.accessToken, () => {
            console.log('Google access token revoked')
          })
        }
      } catch (error) {
        console.error('Error revoking token:', error)
      }
    }
    
    // Clear ALL localStorage data including API keys
    setIsAuthenticated(false)
    setHasAPIKey(false)
    setUser(null)
    localStorage.clear() // This clears EVERYTHING including API keys
    
    // Force page reload to ensure clean state
    window.location.reload()
  }

  console.log('🔍 Render state:', { hasAPIKey, isAuthenticated })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            📧 Email Classifier
          </h1>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
            >
              Logout
            </button>
          )}
        </div>

        {!hasAPIKey || !isAuthenticated ? (
          <LoginForm 
            onLogin={handleLogin}
            hasOpenAIKey={hasAPIKey}
            onSetOpenAIKey={handleSetAPIKey}
          />
        ) : (
          <EmailClassifier user={user} />
        )}
      </div>
    </div>
  )
}