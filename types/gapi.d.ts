interface Window {
  gapi?: {
    load: (api: string, callback: () => void) => void
    auth2: {
      init: (config: any) => Promise<any>
      getAuthInstance: () => any
    }
  }
  google?: {
    accounts: {
      oauth2: {
        initTokenClient: (config: {
          client_id: string
          scope: string
          callback: string | ((response: any) => void)
        }) => GoogleTokenClient
      }
    }
  }
}

interface GoogleTokenClient {
  requestAccessToken: (promptConfig?: { prompt: string }) => void
  callback?: (response: GoogleAuthResponse) => void
}

interface GoogleAuthResponse {
  access_token: string
  error?: string
  error_description?: string
}

interface gapi {
  auth2: {
    init: (config: any) => Promise<any>
    getAuthInstance: () => any
  }
  load: (api: string, callback: () => void) => void
}

