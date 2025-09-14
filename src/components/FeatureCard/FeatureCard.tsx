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
                    p-6 flex flex-col hover:shadow-lg 
                    transition-shadow duration-300 w-[260px] h-[320px] mx-auto overflow-hidden mb-6">
      {/* Top Icon */}
      <div className="w-10 h-10 flex items-center justify-center mb-3 flex-shrink-0">
        <img src={icon} alt="icon" className="w-6 h-6" />
      </div>

      {/* Middle content area */}
      <div className="flex-1 flex flex-col justify-start space-y-2 min-h-0">
        <h3 className="text-base font-semibold leading-tight">{title}</h3>
        <p className="text-[#6F7070] text-xs leading-relaxed">
          {description}
        </p>

        <ul className="space-y-1.5 text-xs text-gray-600 flex-1 min-h-0">
          {features.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <img
                src={tick}
                alt="tick"
                className="w-2.5 h-2.5 mt-0.5 flex-shrink-0"
              />
              <span className="text-[#6F7070] text-xs leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom link */}
      <div className="mt-3 flex-shrink-0 pl-4">
        <a
          href={linkUrl}
          className="text-blue-600 font-semibold flex items-center space-x-1 text-xs"
        >
          <span>{linkLabel}</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export default FeatureCard;

