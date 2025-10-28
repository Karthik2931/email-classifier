'use client'

import { useState, useEffect } from 'react'
import EmailList from './EmailList'

interface EmailClassifierProps {
  user: any
}

export default function EmailClassifier({ user }: EmailClassifierProps) {
  const [emails, setEmails] = useState<any[]>([])
  const [classifiedEmails, setClassifiedEmails] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isClassifying, setIsClassifying] = useState(false)
  const [emailCount, setEmailCount] = useState(15)

  useEffect(() => {
    // Load emails from localStorage
    const storedEmails = localStorage.getItem('emails')
    if (storedEmails) {
      setEmails(JSON.parse(storedEmails))
    }
    
    const storedClassifications = localStorage.getItem('classifications')
    if (storedClassifications) {
      setClassifiedEmails(JSON.parse(storedClassifications))
    }
  }, [])

  const fetchEmails = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: user.accessToken,
          maxResults: emailCount,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Email fetch error:', errorData)
        throw new Error(errorData.error || 'Failed to fetch emails')
      }

      const data = await response.json()
      setEmails(data.emails)
      localStorage.setItem('emails', JSON.stringify(data.emails))
    } catch (error: any) {
      console.error('Error fetching emails:', error)
      alert(`Failed to fetch emails: ${error.message || 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const classifyEmails = async () => {
    if (emails.length === 0) {
      alert('Please fetch emails first')
      return
    }

    const apiKey = localStorage.getItem('ai_api_key')
    const aiProvider = localStorage.getItem('ai_provider') || 'gemini'
    
    if (!apiKey) {
      alert('API key not found. Please set it up again.')
      return
    }

    setIsClassifying(true)
    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emails: emails,
          apiKey: apiKey,
          provider: aiProvider,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to classify emails')
      }

      const data = await response.json()
      setClassifiedEmails(data.classifiedEmails)
      localStorage.setItem('classifications', JSON.stringify(data.classifiedEmails))
    } catch (error: any) {
      console.error('Error classifying emails:', error)
      alert(`Failed to classify emails: ${error.message}`)
    } finally {
      setIsClassifying(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={user.image}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Emails
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={emailCount}
              onChange={(e) => setEmailCount(parseInt(e.target.value) || 15)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchEmails}
            disabled={isLoading}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Fetching...' : 'Fetch Emails'}
          </button>
          <button
            onClick={classifyEmails}
            disabled={isClassifying || emails.length === 0}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isClassifying ? 'Classifying...' : 'Classify Emails'}
          </button>
        </div>
      </div>

      {emails.length > 0 && (
        <EmailList
          emails={emails}
          classifiedEmails={classifiedEmails}
          isClassifying={isClassifying}
        />
      )}
    </div>
  )
}