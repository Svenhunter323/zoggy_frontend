import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'
import DailyChest from '../components/DailyChest'
import ReferralSection from '../components/ReferralSection'
import CopyField from '../components/CopyField'
import Card from '../components/Card'
import { Gift } from 'lucide-react'
import { useToast } from '../components/Toast'

const DashboardPage = () => {
  const { user } = useAuth()
  const { ToastContainer } = useToast()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-gray-600 border-t-brand rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome Back!
          </h1>
          <p className="text-xl text-gray-400">
            Open your daily chest and manage your account
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Daily Chest */}
          <div className="space-y-8">
            <DailyChest />
            
            {/* Claim Code */}
            <Card>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Your Claim Code</h3>
                <p className="text-gray-400">
                  Use this code to claim your rewards when we launch
                </p>
              </div>
              
              <CopyField
                value={user.claimCode}
                label="Claim Code"
              />
              
              <div className="mt-4 bg-gold/10 border border-gold/30 rounded-lg p-4">
                <p className="text-gold text-sm">
                  <strong>Important:</strong> Save this code! You'll need it to claim all your earned rewards when we officially launch.
                </p>
              </div>
            </Card>
          </div>

          {/* Referral Section */}
          <div>
            <ReferralSection />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default DashboardPage