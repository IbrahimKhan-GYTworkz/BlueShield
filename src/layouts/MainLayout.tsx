import { NavLink, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import VideoHero from '../components/VideoHero/VideoHero'
import FeatureCard from '../components/FeatureCard/FeatureCard'
import sheild from '../assets/shieldCheck.svg'
import heart from '../assets/heart.svg'
import skethascopre from '../assets/stethoscope.svg'
import file from '../assets/file.svg'
import "../globals.css"
export default function MainLayout() {
  const cards = [
    {
      icon: sheild,
      title: 'Explore My Benefits',
      description: 'See what’s covered and compare plans that fit your life.',
      features: [
        'Quickly compare premiums, deductibles & coverage.',
        'Get personalized plan suggestions in seconds.',
      ],
      linkLabel: 'Compare My Plans',
      linkUrl: '#',
    },
    {
      icon: skethascopre,
      title: 'Find a doctor',
      description: 'Locate trusted,in-network care near you',
      features: [
        'Search by speciality,location or telehealth availability.',
        'Filter only doctors covered under your plan.',
      ],
      linkLabel: 'Find Now',
      linkUrl: '#',
    },
    {
      icon: file,
      title: 'Check Claims Status',
      description: 'Know exactly where your claims stand, anytime.',
      features: [
        'Get instant claim updates without calling support.',
        'Understand approvals, rejections, or pending steps.',
      ],
      linkLabel: 'Track My Claims',
      linkUrl: '#',
    },
    {
      icon: heart,
      title: 'Mental Well-Being Support',
      description: 'Access resources that care for your mind, not just your body.',
      features: [
        'Find therapists, counselors, and 24/7 helplines.',
        'Explore digital programs designed for stress & resilience.',
      ],
      linkLabel: 'Get Support',
      linkUrl: '#',
    },
  ]
  return (
    <>
      <header>
        <Navbar />
      </header>
      <>
        <VideoHero />
        {/* Main container with responsive padding */}
        <div className="px-4 sm:px-8 md:px-12 lg:px-24 xl:px-36">
          {/* Heading Section */}
          <div className="mt-12 mb-8 flex flex-col items-center justify-center gap-4 text-center sm:mt-16 sm:mb-12 lg:mt-24">
            <h1 className="text-2xl leading-snug font-bold sm:text-3xl lg:text-5xl">
              Your Benefits. Your Care. One Conversation
            </h1>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-base text-[#707070] sm:text-lg lg:text-xl">
                Skip the menus and forms
              </p>
              <p className="text-base text-[#707070] sm:text-lg lg:text-xl">
                Just ask, we'll guide you with answers, tools, and next steps
              </p>
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, idx) => (
              <FeatureCard key={idx} {...card} />
            ))}
          </div>

          {/* CTA Section */}
          <div className="py-12 flex flex-col items-center justify-center gap-6 sm:my-16">
            <h1 className="text-center text-base font-medium sm:text-lg lg:text-xl">
              Not sure where to start? Just ask me
            </h1>
            <button className="rounded-full border-2 border-[#306FB6] bg-white px-6 py-3 text-sm font-medium transition hover:bg-[#306FB6] hover:text-white sm:px-8 sm:py-4 sm:text-base">
              Start a conversation
            </button>
          </div>
        </div>
      </>
        <Outlet />
    </>
  )
}
