import React from 'react'
import { motion } from 'framer-motion'
import { Gift } from 'lucide-react'
import Button from './Button'

const HeroSection = ({ onJoinWaitlist }) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <motion.div
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-full bg-gradient-to-br from-gold to-yellow-500 rounded-2xl shadow-2xl flex items-center justify-center"
            >
              <Gift className="w-16 h-16 text-gray-900 drop-shadow-lg" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Open Your Daily Chest.
            <br />
            <span className="bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
              Win up to $10,000.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of players opening daily chests and winning real money. 
            Get early access and start earning today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={onJoinWaitlist}
            className="text-xl px-12 py-6"
          >
            Join Waitlist
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection