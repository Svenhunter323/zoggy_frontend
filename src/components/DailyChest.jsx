import React, { useState } from 'react'
import { Gift, Clock, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { canOpenChest, getNextChestTime } from '../utils/time'
import { chestAPI } from '../api/endpoints'
import Button from './Button'
import Card from './Card'
import Countdown from './Countdown'
import ChestModal from './ChestModal'
import TelegramModal from './TelegramModal'
import { useToast } from './Toast'

const DailyChest = () => {
  const { user, fetchUser } = useAuth()
  const { showToast } = useToast()
  const [showChestModal, setShowChestModal] = useState(false)
  const [showTelegramModal, setShowTelegramModal] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  const canOpen = canOpenChest(user?.lastChestOpenAt)
  const nextChestTime = getNextChestTime(user?.lastChestOpenAt)

  const handleOpenChest = async () => {
    if (!user?.telegramVerified) {
      setShowTelegramModal(true)
      return
    }

    if (!canOpen) {
      showToast('You can only open one chest per day!', 'warning')
      return
    }

    try {
      setIsOpening(true)
      const response = await chestAPI.open()
      setShowChestModal(true)
      await fetchUser() // Refresh user data
    } catch (error) {
      console.error('Failed to open chest:', error)
      showToast('Failed to open chest. Please try again.', 'error')
    } finally {
      setIsOpening(false)
    }
  }

  return (
    <>
      <Card className="max-w-md mx-auto text-center bg-gradient-to-br from-gold/10 to-yellow-600/10 border-gold/30">
        <h3 className="text-2xl font-bold text-white mb-6">Daily Chest</h3>
        
        <div className="w-32 h-32 mx-auto mb-6 relative">
          <motion.div
            animate={canOpen ? { 
              rotateY: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            } : {}}
            transition={{ 
              duration: 2,
              repeat: canOpen ? Infinity : 0,
              ease: "easeInOut"
            }}
            className={`w-full h-full bg-gradient-to-br from-gold to-yellow-500 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300 ${
              !canOpen ? 'opacity-60' : ''
            }`}
          >
            <Gift className="w-16 h-16 text-gray-900 drop-shadow-lg" />
            {!canOpen && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-2xl flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            )}
          </motion.div>
        </div>

        {canOpen ? (
          <Button
            variant="secondary"
            size="lg"
            onClick={handleOpenChest}
            loading={isOpening}
            className="w-full"
          >
            {isOpening ? 'Opening...' : 'Open Chest'}
          </Button>
        ) : (
          <div className="space-y-4">
            <Button
              variant="outline"
              size="lg"
              disabled
              className="w-full opacity-50 cursor-not-allowed"
            >
              Chest Opened
            </Button>
            {nextChestTime && (
              <Countdown 
                targetDate={nextChestTime}
                label="Next chest in"
                className="justify-center"
              />
            )}
          </div>
        )}
      </Card>

      {showChestModal && (
        <ChestModal
          onClose={() => setShowChestModal(false)}
        />
      )}

      {showTelegramModal && (
        <TelegramModal
          onClose={() => setShowTelegramModal(false)}
        />
      )}
    </>
  )
}

export default DailyChest