import { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
  position?: 'top' | 'bottom'; // Dropdown can be positioned on top or bottom
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect, position = 'bottom' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block min-w-28 text-left" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="inline-flex w-full justify-center rounded-xl border-2 border-first bg-transparent px-2 py-1 font-semibold text-first transition-all duration-300 hover:border-second hover:bg-second hover:text-white"
      >
        {label}
        <svg
          className={`-mr-1 ml-2 h-5 w-5 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
          />
        </svg>
      </button>

      <div
        className={`absolute ${
          position === 'top' ? 'bottom-full mb-2' : 'top-full mt-1'
        } left-0 w-full transform transition-all duration-200 ${
          isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        } z-10 rounded-md bg-third text-white shadow-lg`}
        style={{ transformOrigin: 'top' }} // Ensures animation originates from the top
      >
        <div className="rounded-xl text-center">
          {options.map((option, index) => (
            <a
              key={index}
              onClick={() => handleOptionClick(option)}
              className="block w-full cursor-pointer px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-second"
            >
              {option}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
