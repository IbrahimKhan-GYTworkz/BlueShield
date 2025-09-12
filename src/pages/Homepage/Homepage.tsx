import React from 'react';

// SVG Icons as components
const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Stethoscope = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm0 0V9a5 5 0 00-5-5H8a5 5 0 00-5 5v2M7 7h4m4 0h2a2 2 0 012 2v6.5a2.5 2.5 0 11-5 0V15a1 1 0 00-1-1H9a1 1 0 00-1 1v1.5a2.5 2.5 0 11-5 0V9a2 2 0 012-2h2" />
  </svg>
);

const FileText = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Heart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const FeatureCard = ({ icon, title, description, bullets, cta }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 flex items-center justify-center text-blue-600 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>
      <div className="space-y-3 mb-6">
        {bullets.map((bullet, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-700 leading-relaxed">{bullet}</span>
          </div>
        ))}
      </div>
      <button className="text-blue-600 text-sm font-medium hover:underline flex items-center space-x-1 mt-auto">
        <span>{cta}</span>
        <span className="text-xs">↗</span>
      </button>
    </div>
  );
};

const Homepage = () => {
  return (
    <div style={{backgroundColor: '#FBF9F7'}} className="min-h-screen">
      
      {/* Hero Section */}
      <section style={{backgroundColor: '#FBF9F7'}} className="pt-6 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative">
            <div className="bg-gray-100 rounded-2xl overflow-hidden relative">
              <div className="relative h-72 sm:h-80 lg:h-96">
                {/* Family Image */}
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80"
                  alt="Happy family"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  style={{ filter: 'grayscale(100%)' }}
                />
                
                {/* Hero Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-lg pl-6 sm:pl-8 lg:pl-12 pr-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight mb-3">
                      Your Health<br />
                      Simplified with AI
                    </h1>
                    <p className="text-gray-700 text-base sm:text-lg mb-5 max-w-md leading-relaxed">
                      Find the right plan, doctor, or answer — instantly.
                    </p>
                    <button className="bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm border border-gray-200 hover:bg-gray-50 flex items-center space-x-2">
                      <span className="text-blue-500 text-sm">✨</span>
                      <span>Talk to AI</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16" style={{backgroundColor: '#FBF9F7'}}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              Your Benefits. Your Care. One Conversation.
            </h2>
            <div className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              <p className="mb-1">Skip the menus and forms —</p>
              <p>just ask, and we'll guide you with answers, tools, and next steps.</p>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Explore My Benefits"
              description="See what's covered and compare plans that fit your life."
              bullets={[
                "Quickly compare premiums, deductibles & coverage.",
                "Get personalized plan suggestions in seconds."
              ]}
              cta="Compare My Plans"
            />
            
            <FeatureCard
              icon={<Stethoscope className="w-6 h-6" />}
              title="Find a Doctor"
              description="Locate trusted, in-network care near you."
              bullets={[
                "Search by specialty, location, or telehealth availability.",
                "Filter only doctors covered under your plan."
              ]}
              cta="Find Now"
            />
            
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="Check Claims Status"
              description="Know exactly where your claims stand, anytime."
              bullets={[
                "Get instant claim updates without calling support.",
                "Understand approvals, rejections, or pending steps."
              ]}
              cta="Track My Claims"
            />
            
            <FeatureCard
              icon={<Heart className="w-6 h-6" />}
              title="Mental Well-Being Support"
              description="Access resources that care for your mind, not just your body."
              bullets={[
                "Find therapists, counselors, and 24/7 helplines.",
                "Explore digital programs designed for stress & resilience."
              ]}
              cta="Get Support"
            />
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <p className="text-lg sm:text-xl text-gray-900 mb-6 font-medium">
              Not sure where to start? Just ask me.
            </p>
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 shadow-sm">
              Start a Conversation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;