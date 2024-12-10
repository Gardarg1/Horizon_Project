import { useEffect, useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [positionClass, setPositionClass] = useState('bottom-full mb-1');

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);
  useEffect(() => {
    switch (position) {
      case 'top':
        setPositionClass('bottom-full mb-1 left-1/2 transform -translate-x-1/2');
        break;
      case 'left':
        setPositionClass('right-full mr-1');
        break;
      case 'right':
        setPositionClass('left-full ml-1');
        break;
      case 'bottom':
        setPositionClass('top-full mt-1 left-1/2 transform -translate-x-1/2');
        break;
    }
  }, [position]);

  return (
    <div className="relative flex items-center">
      <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip} className="cursor-pointer">
        {children}
      </div>

      {isVisible && (
        <div
          className={`absolute ${positionClass} w-max rounded-md bg-fourth p-2 text-sm text-white shadow-lg`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
