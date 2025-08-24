import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://prelaunch-landing.onrender.com/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('zoggy_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('zoggy_token')
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  }
)

// Auth endpoints
export const authAPI = {
  signup: (email, referralCode = null) => 
    api.post('/waitlist', { email, referralCode }),
  
  signin: (email) => 
    api.post('/signin', { email }),
  
  getMe: () => 
    api.get('/me'),
  
  resendVerification: (email) => 
    api.post('/auth/resend', { email }),
}

// Telegram endpoints
export const telegramAPI = {
  getDeeplink: () => 
    api.get('/telegram/deeplink'),
  
  verifyStatus: () => 
    api.get('/telegram/verify-status'),
}

// Chest endpoints
export const chestAPI = {
  open: () => 
    api.post('/chest/open'),
}

// Data endpoints
export const dataAPI = {
  getStats: () => 
    api.get('/stats'),
  
  getLatestWins: (limit = 24) => 
    api.get(`/wins/latest?limit=${limit}`),
  
  getLeaderboard: () => 
    api.get('/leaderboard/top10'),
}

// Admin endpoints
export const adminAPI = {
  getUsers: () => 
    api.get('/admin/users'),
  
  getReferrals: () => 
    api.get('/admin/referrals'),
  
  exportClaimCodes: () => 
    api.get('/admin/exports/claim-codes.csv', { responseType: 'blob' }),
}

export default api