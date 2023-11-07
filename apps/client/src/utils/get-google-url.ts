import { SERVER_URL } from "./server"

const getGoogleUrl = (from: string): string => {
  const root = 'https://accounts.google.com/o/oauth2/v2/auth'

  const options = {
    redirect_uri: SERVER_URL + import.meta.env.VITE_GOOGLE_CALLBACK_URL,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    state: from,
  }

  const qs = new URLSearchParams(options).toString()

  return `${root}?${qs}`
}

export default getGoogleUrl