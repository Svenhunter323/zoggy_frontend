import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { formatCurrency } from '../utils/reward'
import Countdown from './Countdown'
import { getNextChestTime } from '../utils/time'

const Header = ({ minimal = false }) => {
  const { user, isAuthenticated } = useAuth()

  if (minimal) {
    return (
      <header className="w-full py-4 px-6 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.svg" 
              alt="Zoggy Logo" 
              className="w-10 h-10 filter brightness-0 invert"
            />
            <span className="text-2xl font-bold text-white">Zoggy</span>
          </div>
        </div>
      </header>
    )
  }

  if (!isAuthenticated || !user) {
    return <Header minimal={true} />
  }

  const nextChestTime = getNextChestTime(user.lastChestOpenAt)

  return (
    <header className="w-full py-4 px-6 bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src="/logo.svg" 
            alt="Zoggy Logo" 
            className="w-10 h-10 filter brightness-0 invert"
          />
          <span className="text-2xl font-bold text-white">Zoggy</span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-sm text-gray-400">Balance</div>
            <div className="text-xl font-bold text-gold">
              {formatCurrency(user.totalCredits || 0)}
            </div>
          </div>

          {nextChestTime && (
            <Countdown 
              targetDate={nextChestTime}
              className="text-right"
            />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header