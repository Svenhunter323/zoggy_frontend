import React from 'react'
import { Clock } from 'lucide-react'
import { useCountdown } from '../hooks/useCountdown'

const Countdown = ({ targetDate, label = 'Next chest in', className = '' }) => {
  const { timeLeft, isExpired } = useCountdown(targetDate)

  if (isExpired) {
    return (
      <div className={`flex items-center space-x-2 text-green-400 ${className}`}>
        <Clock className="w-5 h-5" />
        <span className="font-mono text-lg">Ready!</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 text-gray-300 ${className}`}>
      <Clock className="w-5 h-5" />
      <div className="text-sm">
        <span className="text-gray-400">{label}</span>
        <div className="font-mono text-lg text-white">{timeLeft}</div>
      </div>
    </div>
  )
}

export default Countdown