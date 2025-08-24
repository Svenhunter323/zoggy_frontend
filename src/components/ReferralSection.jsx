import React from 'react'
import { Users, Gift, ExternalLink } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Card from './Card'
import CopyField from './CopyField'
import Button from './Button'

const ReferralSection = () => {
  const { user } = useAuth()

  if (!user) return null

  const referralLink = `${window.location.origin}/signup?ref=${user.referralCode}`
  const referralCount = user.referredUsers || 0

  return (
    <Card>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-brand to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Refer Friends</h3>
        <p className="text-gray-400">
          Invite friends and climb the leaderboard to win cash prizes!
        </p>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-gold mb-1">
            {referralCount}
          </div>
          <div className="text-gray-400">Referrals</div>
        </div>

        <CopyField
          value={referralLink}
          label="Your Referral Link"
        />

        <CopyField
          value={user.referralCode}
          label="Your Referral Code"
        />

        <div className="bg-brand/10 border border-brand/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Gift className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-300">
              <p className="font-semibold text-white mb-1">Referral Rewards:</p>
              <ul className="space-y-1">
                <li>• You get $0.10 for each verified referral</li>
                <li>• Your friend gets a bonus chest</li>
                <li>• Top 10 referrers win cash prizes up to $5,000!</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(
            `🎁 Join me on @Zoggy and open daily chests to win up to $10,000! Use my referral link: ${referralLink}`
          ), '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Share on Twitter
        </Button>
      </div>
    </Card>
  )
}

export default ReferralSection