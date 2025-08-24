import React, { useState, useEffect } from 'react'
import { Trophy, DollarSign } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatCurrency } from '../utils/reward'
import { useApi } from '../hooks/useApi'
import { dataAPI } from '../api/endpoints'
import Card from './Card'

// Fake wins generator with cadence rules
const generateFakeWin = () => {
  const usernames = [
    'CryptoWolf', 'DiamondHands', 'MoonRider', 'GoldRush', 'LuckyStrike',
    'CoinMaster', 'WinnerTakesAll', 'FortuneSeeker', 'JackpotJoe', 'PrizeFighter',
    'MoneyMaker', 'BigWinner', 'CashKing', 'LootLegend', 'TreasureHunter',
    'RichRider', 'GoldDigger', 'CoinCollector', 'WealthWizard', 'ProfitPro',
    'CryptoKing', 'TokenMaster', 'ChestHunter', 'PrizeSeeker', 'GoldMiner'
  ]

  const username = usernames[Math.floor(Math.random() * usernames.length)]
  
  // Reward distribution following constraints
  const random = Math.random()
  let amount
  
  if (random < 0.7) {
    amount = Math.floor(Math.random() * 50) + 10 // $10-$60
  } else if (random < 0.9) {
    amount = Math.floor(Math.random() * 200) + 60 // $60-$260
  } else if (random < 0.98) {
    amount = Math.floor(Math.random() * 1000) + 260 // $260-$1260
  } else {
    amount = Math.floor(Math.random() * 5000) + 1000 // $1000-$6000
  }

  return {
    id: Date.now() + Math.random(),
    username,
    amount,
    timestamp: new Date(),
  }
}

const LatestWins = () => {
  const [wins, setWins] = useState([])
  const [lastBigWin, setLastBigWin] = useState(0)
  const [recentBigWins, setRecentBigWins] = useState([])
  
  const { data: apiWins } = useApi(dataAPI.getLatestWins, [])

  useEffect(() => {
    // Initialize with API data or fake data
    const initialWins = apiWins || Array.from({ length: 8 }, generateFakeWin)
    setWins(initialWins.slice(0, 24))

    let nextTimeout
    let isInMicroBurst = false
    let microBurstCount = 0
    let isInLull = false

    const scheduleNextWin = () => {
      let delay

      if (isInLull) {
        // In lull period: 4-5 minute pause
        delay = (4 + Math.random()) * 60 * 1000
        isInLull = false
      } else if (isInMicroBurst && microBurstCount < 5) {
        // Micro-burst: 2-6s gaps
        delay = (2 + Math.random() * 4) * 1000
        microBurstCount++
      } else {
        // Normal cadence: 60-120s
        delay = (60 + Math.random() * 60) * 1000
        
        // Check if we should start micro-burst (every 6-10 minutes)
        if (Math.random() < 0.1) {
          isInMicroBurst = true
          microBurstCount = 0
        }
        
        // Check if we should start lull (every 10-15 minutes)
        if (Math.random() < 0.05) {
          isInLull = true
        }
      }

      if (microBurstCount >= 5) {
        isInMicroBurst = false
        microBurstCount = 0
      }

      nextTimeout = setTimeout(() => {
        const now = Date.now()
        let newWin = generateFakeWin()

        // Apply big win constraints
        if (newWin.amount > 10000) {
          // Never two wins >$10k within 3 hours
          const threeHoursAgo = now - 3 * 60 * 60 * 1000
          const hasRecentBigWin = recentBigWins.some(time => time > threeHoursAgo)
          if (hasRecentBigWin) {
            newWin.amount = Math.floor(Math.random() * 100) + 10
          } else {
            setRecentBigWins(prev => [...prev.filter(time => time > threeHoursAgo), now])
          }
        } else if (newWin.amount > 2000) {
          // Max one win >$2k per 60 minutes
          const oneHourAgo = now - 60 * 60 * 1000
          if (lastBigWin > oneHourAgo) {
            newWin.amount = Math.floor(Math.random() * 100) + 10
          } else {
            setLastBigWin(now)
          }
        }

        setWins(prevWins => [newWin, ...prevWins.slice(0, 23)])
        scheduleNextWin()
      }, delay)
    }

    scheduleNextWin()

    return () => {
      if (nextTimeout) clearTimeout(nextTimeout)
    }
  }, [apiWins])

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest Wins
          </h2>
          <p className="text-xl text-gray-400">
            See what others are winning right now!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {wins.slice(0, 24).map((win, index) => (
              <motion.div
                key={win.id}
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  className={`${
                    index === 0 ? 'ring-2 ring-gold border-gold' : ''
                  } ${
                    win.amount > 1000 ? 'bg-gradient-to-br from-gold/20 to-yellow-600/20' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-brand to-red-700 rounded-full flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {win.username}
                        </p>
                        <p className="text-xs text-gray-400">just unboxed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-gold" />
                      <span className={`font-bold ${
                        win.amount > 1000 ? 'text-gold text-lg' : 'text-green-400'
                      }`}>
                        {formatCurrency(win.amount)}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default LatestWins