import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { accessToken, maxResults = 15 } = await req.json()

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      )
    }

    // Fetch messages list
    const messagesResponse = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!messagesResponse.ok) {
      const errorText = await messagesResponse.text()
      console.error('Gmail API Error:', messagesResponse.status, errorText)
      throw new Error(`Gmail API Error: ${messagesResponse.status} - ${errorText}`)
    }

    const messagesData = await messagesResponse.json()
    const messages = messagesData.messages || []

    // Fetch full details for each message
    const emails = await Promise.all(
      messages.map(async (message: any) => {
        const messageResponse = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        if (!messageResponse.ok) {
          console.error(`Failed to fetch message ${message.id}:`, messageResponse.status)
          return null
        }

        const messageData = await messageResponse.json()
        
        // Extract headers
        const headers = messageData.payload.headers
        const getHeader = (name: string) =>
          headers.find((h: any) => h.name === name)?.value || ''

        return {
          id: message.id,
          snippet: messageData.snippet,
          subject: getHeader('Subject'),
          from: getHeader('From'),
          date: getHeader('Date'),
          body: messageData.payload.body?.data || '',
          threadId: messageData.threadId,
        }
      })
    )

    return NextResponse.json({
      emails: emails.filter((e) => e !== null),
    })
  } catch (error: any) {
    console.error('Error fetching emails:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch emails' },
      { status: 500 }
    )
  }
}

