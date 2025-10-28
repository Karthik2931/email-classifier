'use client'

interface Email {
  id: string
  snippet: string
  subject?: string
  from?: string
  date?: string
  category?: string
}

interface EmailListProps {
  emails: any[]
  classifiedEmails: any[]
  isClassifying: boolean
}

const categoryColors: { [key: string]: string } = {
  Important: 'bg-blue-100 text-blue-800 border-blue-200',
  Promotional: 'bg-purple-100 text-purple-800 border-purple-200',
  Social: 'bg-green-100 text-green-800 border-green-200',
  Marketing: 'bg-orange-100 text-orange-800 border-orange-200',
  Spam: 'bg-red-100 text-red-800 border-red-200',
  General: 'bg-gray-100 text-gray-800 border-gray-200',
}

export default function EmailList({ emails, classifiedEmails, isClassifying }: EmailListProps) {
  const getCategoryForEmail = (emailId: string) => {
    const classified = classifiedEmails.find((e) => e.id === emailId)
    return classified?.category || 'Pending'
  }

  const getCategoryStats = () => {
    const stats: { [key: string]: number } = {}
    classifiedEmails.forEach((email) => {
      stats[email.category] = (stats[email.category] || 0) + 1
    })
    return stats
  }

  const stats = getCategoryStats()

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mb-6">Your Emails</h2>
      
      {classifiedEmails.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Classification Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(stats).map(([category, count]) => (
              <div
                key={category}
                className={`${categoryColors[category] || categoryColors.General} px-4 py-2 rounded-lg border text-center`}
              >
                <div className="font-semibold">{count}</div>
                <div className="text-xs mt-1">{category}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {emails.map((email: any) => {
          const category = getCategoryForEmail(email.id)
          const isPending = category === 'Pending' && !isClassifying
          
          return (
            <div
              key={email.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    {email.from && (
                      <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {email.from.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 truncate">
                          {email.from || 'Unknown Sender'}
                        </p>
                        {email.date && (
                          <span className="text-sm text-gray-500">
                            {new Date(email.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      {email.subject && (
                        <p className="font-medium text-gray-700 mb-1 truncate">
                          {email.subject}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {email.snippet || 'No content'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                      isPending
                        ? 'bg-gray-100 text-gray-600 border-gray-300'
                        : categoryColors[category] || categoryColors.General
                    }`}
                  >
                    {category}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

