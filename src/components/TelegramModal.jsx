import React from 'react'
import { X, MessageCircle, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { telegramAPI } from '../api/endpoints'
import Button from './Button'
import { useToast } from './Toast'

const TelegramModal = ({ onClose }) => {
  const { setTelegramVerified } = useAuth()
  const { showToast } = useToast()
  const channelHandle = import.meta.env.VITE_TG_CHANNEL_HANDLE || '@zoggycasino'

  const handleJoinTelegram = async () => {
    try {
      // Get Telegram deep link
      const response = await telegramAPI.getDeeplink()
      const deepLink = response.data.deepLink
      
      // Open Telegram
      window.open(deepLink, '_blank')
      
      // Show verification message
      showToast('Please join the channel and come back to verify!', 'success')
      
      // Start verification polling
      setTimeout(checkVerification, 5000)
    } catch (error) {
      console.error('Failed to get Telegram link:', error)
      // Fallback to direct channel link
      window.open(`https://t.me/${channelHandle.replace('@', '')}`, '_blank')
      showToast('Please join the channel and come back to verify!', 'success')
      setTimeout(checkVerification, 5000)
    }
  }

  const checkVerification = async () => {
    try {
      const response = await telegramAPI.verifyStatus()
      if (response.data.verified) {
        setTelegramVerified(true)
        showToast('Telegram verification successful!', 'success')
        onClose()
      } else {
        showToast('Please make sure you joined the channel', 'warning')
      }
    } catch (error) {
      console.error('Failed to verify Telegram status:', error)
      showToast('Verification failed. Please try again.', 'error')
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full text-center relative shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Telegram</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              You must subscribe to our Telegram channel to open chests and start earning rewards!
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
            <p className="text-blue-400 font-semibold mb-2">What you'll get:</p>
            <ul className="text-blue-300 text-sm space-y-1">
              <li>• Daily chest access</li>
              <li>• Exclusive rewards</li>
              <li>• Community updates</li>
              <li>• Early access features</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button
              variant="primary"
              onClick={handleJoinTelegram}
              className="w-full text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Join {channelHandle}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            
            <Button
              variant="secondary"
              onClick={checkVerification}
              className="w-full"
            >
              I've Joined - Verify Now
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default TelegramModal