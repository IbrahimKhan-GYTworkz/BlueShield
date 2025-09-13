import React, { useState } from 'react';
import logo from '../../assets/logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Navigation items with dropdown content
  const navItems = [
    {
      name: 'Plans',
      dropdown: [
        { name: 'Basic Plan', description: 'Affordable coverage' },
        { name: 'Premium Plan', description: 'Comprehensive protection' },
        { name: 'Family Plan', description: 'Coverage for everyone' }
      ]
    },
    {
      name: 'Find doctor',
      dropdown: [
        { name: 'Search Doctors', description: 'Find by specialty' },
        { name: 'Book Appointment', description: 'Schedule a visit' },
        { name: 'Telehealth', description: 'Virtual consultations' }
      ]
    },
    {
      name: 'Be Well',
      dropdown: [
        { name: 'Wellness Tips', description: 'Stay healthy' },
        { name: 'Fitness Programs', description: 'Get active' },
        { name: 'Nutrition Guides', description: 'Eat better' }
      ]
    },
    {
      name: 'Get',
      dropdown: [
        { name: 'Mobile App', description: 'Download our app' },
        { name: 'Member Resources', description: 'Helpful tools' },
        { name: 'Support Center', description: 'Get help' }
      ]
    }
  ];

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <nav className="bg-white mx-[25px] mt-[19px] rounded-[20px] shadow-[0px_3px_6px_#0000000D]">
      <div className="px-[34px]">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src={logo}
              alt="Health Plus Logo"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  {item.name}
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {/* Dropdown menu */}
                {activeDropdown === item.name && (
                  <div className="absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <div className="font-medium">{subItem.name}</div>
                          <div className="text-gray-500 text-xs">
                            {subItem.description}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Get Started Button */}
            <button className="ml-4 border-2 border-[#306FB6] px-[22px] py-[10px] rounded-[30px] text-sm font-medium transition-colors duration-200">
              Get started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="w-full text-left text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  {/* Mobile Dropdown */}
                  {activeDropdown === item.name && (
                    <div className="pl-4 mt-2 space-y-2">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href="#"
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 rounded-md"
                        >
                          <div className="font-medium">{subItem.name}</div>
                          <div className="text-gray-500 text-xs">
                            {subItem.description}
                          </div>
                        </a> 
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Get Started Button */}
              <button className="w-full mt-4 border-2 border-[#306FB6]  px-[22px] py-[10px] rounded-[20px] text-base font-medium">
                Get started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;