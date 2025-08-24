import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import StatsSection from '../components/StatsSection'
import LatestWins from '../components/LatestWins'
import Leaderboard from '../components/Leaderboard'
import Footer from '../components/Footer'

const LandingPage = () => {
  const navigate = useNavigate()

  const handleJoinWaitlist = () => {
    navigate('/signup')
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header minimal={true} />
      <HeroSection onJoinWaitlist={handleJoinWaitlist} />
      <StatsSection />
      <LatestWins />
      <Leaderboard />
      <Footer />
    </div>
  )
}

export default LandingPage