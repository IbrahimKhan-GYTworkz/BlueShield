import React from "react";
import { ArrowUpRight } from "lucide-react";
import tick from "../../assets/checked.svg";
import "../../globals.css"

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  features: string[];
  linkLabel: string;
  linkUrl: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  features,
  linkLabel,
  linkUrl,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0px_3px_6px_#0000000D] 
                    p-4 sm:p-6 flex flex-col hover:shadow-lg 
                    transition-shadow duration-300 h-full w-full">
      {/* Top Icon */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-4">
        <img src={icon} alt="icon" className="w-6 h-6 sm:w-[29px] sm:h-[37px]" />
      </div>

      {/* Middle content area */}
      <div className="flex-1 flex flex-col justify-start space-y-3">
        <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
        <p className="text-[#6F7070] text-sm sm:text-[13px] md:text-base">
          {description}
        </p>

        <ul className="space-y-2 text-sm sm:text-base text-gray-600">
          {features.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <img
                src={tick}
                alt="tick"
                className="w-3 h-3 sm:w-[11px] sm:h-[11px] mt-[6px]"
              />
              <span className="text-[#6F7070] text-sm sm:text-[13px] md:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom link */}
      <div className="mt-4 ml-4">
        <a
          href={linkUrl}
          className="text-blue-600 font-semibold flex items-center space-x-1 text-sm sm:text-base"
        >
          <span>{linkLabel}</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default FeatureCard;

