import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json()
    const { emails, apiKey, provider = 'gemini' } = requestBody

    console.log('Received classification request for', emails.length, 'emails')
    console.log('Provider:', provider)
    console.log('API Key starts with:', apiKey?.substring(0, 7))

    if (!emails || !Array.isArray(emails)) {
      return NextResponse.json(
        { error: 'Emails array is required' },
        { status: 400 }
      )
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    if (provider === 'openai') {
      return await classifyWithOpenAI(emails, apiKey)
    } else if (provider === 'gemini') {
      return await classifyWithGemini(emails, apiKey)
    } else {
      return NextResponse.json(
        { error: 'Invalid provider. Must be "openai" or "gemini"' },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Error classifying emails:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to classify emails' },
      { status: 500 }
    )
  }
}

async function classifyWithOpenAI(emails: any[], apiKey: string) {
  if (!apiKey.startsWith('sk-')) {
    return NextResponse.json(
      { error: 'Invalid OpenAI API key format. Key should start with "sk-"' },
      { status: 400 }
    )
  }

  const classifyEmail = async (email: any) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an email classification assistant. Classify the following email into ONE of these categories ONLY:
1. Important - Personal or work-related emails requiring immediate attention
2. Promotional - Sales, discounts, marketing campaigns from businesses
3. Social - Emails from social networks, friends, family
4. Marketing - Newsletters, marketing content, updates
5. Spam - Unwanted or unsolicited emails
6. General - Everything else that doesn't fit the above

Respond with ONLY the category name.`
          },
          {
            role: 'user',
            content: `Subject: ${email.subject || 'No subject'}
From: ${email.from || 'Unknown'}
Content: ${email.snippet || 'No content'}

Category:`
          }
        ],
        temperature: 0,
        max_tokens: 50,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API error:', error)
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const category = data.choices[0]?.message?.content?.trim() || 'General'

    return {
      id: email.id,
      category: category,
      originalEmail: email,
    }
  }

  console.log('Starting OpenAI classification...')
  const classifiedEmails = await Promise.all(emails.map(classifyEmail))
  console.log('OpenAI classification complete!')

  return NextResponse.json({ classifiedEmails })
}

async function classifyWithGemini(emails: any[], apiKey: string) {
  if (!apiKey.startsWith('AIza')) {
    return NextResponse.json(
      { error: 'Invalid Gemini API key format. Key should start with "AIza"' },
      { status: 400 }
    )
  }

  const classifyEmail = async (email: any) => {
    const prompt = `You are an email classification assistant. Classify the following email into ONE of these categories ONLY:
1. Important - Personal or work-related emails requiring immediate attention
2. Promotional - Sales, discounts, marketing campaigns from businesses
3. Social - Emails from social networks, friends, family
4. Marketing - Newsletters, marketing content, updates
5. Spam - Unwanted or unsolicited emails
6. General - Everything else that doesn't fit the above

Subject: ${email.subject || 'No subject'}
From: ${email.from || 'Unknown'}
Content: ${email.snippet || 'No content'}

Respond with ONLY the category name.`

    // FIXED: Using gemini-2.0-flash (current available model)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0,
            maxOutputTokens: 50,
          }
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Gemini API error:', error)
      throw new Error(`Gemini API error: ${error.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const category = data.candidates[0]?.content?.parts[0]?.text?.trim() || 'General'

    return {
      id: email.id,
      category: category,
      originalEmail: email,
    }
  }

  console.log('Starting Gemini classification...')
  
  // Process emails with rate limiting (max 10 concurrent requests)
  const classifiedEmails = []
  const batchSize = 10
  
  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map(classifyEmail))
    classifiedEmails.push(...batchResults)
    
    // Wait 5 seconds between batches to avoid rate limits
    if (i + batchSize < emails.length) {
      console.log(`Processed ${i + batchSize} emails, waiting 5s before next batch...`)
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
  }
  
  console.log('Gemini classification complete!')

  return NextResponse.json({ classifiedEmails })
}