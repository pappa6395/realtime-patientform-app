import { ChevronDown, Plus } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

interface Nationality {
  code: string;
  name: string;
  demonym: string;
  isCustom?: boolean;
}

interface NationalitySelectProps {
  value: string;
  onChange: (demonym: string, details: { code: string; name: string; isCustom?: boolean }) => void;
  placeholder?: string;
  className?: string;
}

const NationalitySelect: React.FC<NationalitySelectProps> = ({
  value,
  onChange,
  placeholder = 'Select nationality',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customDemonym, setCustomDemonym] = useState('');
  const [customNationalities, setCustomNationalities] = useState<Nationality[]>([]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const customNameInputRef = useRef<HTMLInputElement>(null);

  // Most frequently referenced nationalities, including Thai
  const predefinedNationalities: Nationality[] = [
    { code: 'US', name: 'United States', demonym: 'American' },
    { code: 'CN', name: 'China', demonym: 'Chinese' },
    { code: 'IN', name: 'India', demonym: 'Indian' },
    { code: 'GB', name: 'United Kingdom', demonym: 'British' },
    { code: 'DE', name: 'Germany', demonym: 'German' },
    { code: 'JP', name: 'Japan', demonym: 'Japanese' },
    { code: 'FR', name: 'France', demonym: 'French' },
    { code: 'BR', name: 'Brazil', demonym: 'Brazilian' },
    { code: 'IT', name: 'Italy', demonym: 'Italian' },
    { code: 'CA', name: 'Canada', demonym: 'Canadian' },
    { code: 'RU', name: 'Russia', demonym: 'Russian' },
    { code: 'KR', name: 'South Korea', demonym: 'South Korean' },
    { code: 'AU', name: 'Australia', demonym: 'Australian' },
    { code: 'ES', name: 'Spain', demonym: 'Spanish' },
    { code: 'MX', name: 'Mexico', demonym: 'Mexican' },
    { code: 'ID', name: 'Indonesia', demonym: 'Indonesian' },
    { code: 'TH', name: 'Thailand', demonym: 'Thai' },
    { code: 'TR', name: 'Turkey', demonym: 'Turkish' },
    { code: 'SA', name: 'Saudi Arabia', demonym: 'Saudi Arabian' },
    { code: 'PH', name: 'Philippines', demonym: 'Filipino' },
    { code: 'NL', name: 'Netherlands', demonym: 'Dutch' },
    { code: 'CH', name: 'Switzerland', demonym: 'Swiss' },
    { code: 'SE', name: 'Sweden', demonym: 'Swedish' },
    { code: 'VN', name: 'Vietnam', demonym: 'Vietnamese' },
    { code: 'SG', name: 'Singapore', demonym: 'Singaporean' },
    { code: 'MY', name: 'Malaysia', demonym: 'Malaysian' },
    { code: 'ZA', name: 'South Africa', demonym: 'South African' },
    { code: 'AE', name: 'United Arab Emirates', demonym: 'Emirati' },
    { code: 'EG', name: 'Egypt', demonym: 'Egyptian' },
    { code: 'PL', name: 'Poland', demonym: 'Polish' },
  ];

  // Combine predefined and custom nationalities
  const allNationalities = [...predefinedNationalities, ...customNationalities];

  // Filter nationalities based on search term
  const filteredNationalities = allNationalities.filter(
    (nat) =>
      nat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nat.demonym.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nat.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get currently selected nationality
  const selectedNationality = allNationalities.find((nat) => nat.demonym === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsAddingCustom(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current && !isAddingCustom) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isAddingCustom]);

  // Focus custom name input when adding custom nationality
  useEffect(() => {
    if (isAddingCustom && customNameInputRef.current) {
      customNameInputRef.current.focus();
    }
  }, [isAddingCustom]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
      setIsAddingCustom(false);
    }
  };

  const handleSelect = (nationality: Nationality) => {
    onChange(nationality.demonym, {
      code: nationality.code,
      name: nationality.name,
      isCustom: nationality.isCustom
    });
    setIsOpen(false);
  };

  const handleAddCustom = () => {
    setIsAddingCustom(true);
    setSearchTerm('');
  };

  const handleCancelCustom = () => {
    setIsAddingCustom(false);
    setCustomName('');
    setCustomDemonym('');
  };

  const handleSaveCustom = () => {
    if (customName.trim() && customDemonym.trim()) {
      // Generate a unique code for the custom nationality
      const customCode = `CUSTOM_${Date.now()}`;
      const newCustomNationality: Nationality = {
        code: customCode,
        name: customName.trim(),
        demonym: customDemonym.trim(),
        isCustom: true
      };
      
      setCustomNationalities([...customNationalities, newCustomNationality]);
      onChange(newCustomNationality.demonym, {
        code: customCode,
        name: newCustomNationality.name,
        isCustom: true
      });
      
      // Reset and close
      setCustomName('');
      setCustomDemonym('');
      setIsAddingCustom(false);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected nationality display */}
      <div
        className="flex items-center justify-between border rounded 
        px-3 py-2 bg-white text-slate-700 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>
          {selectedNationality 
            ? `${selectedNationality.demonym} (${selectedNationality.name})`
            : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform dark:text-slate-900 ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-80 overflow-y-auto">
          {!isAddingCustom ? (
            <>
              {/* Search input */}
              <div className="sticky top-0 bg-white p-2 border-b">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Search nationalities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Nationality options */}
              <ul className="py-1">
                {filteredNationalities.map((nat) => (
                  <li
                    key={nat.code}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      nat.code === value ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
                    } ${nat.isCustom ? 'italic' : ''}`}
                    onClick={() => handleSelect(nat)}
                  >
                    <span className="font-medium">{nat.demonym}</span> - {nat.name}
                    {nat.isCustom && <span className="ml-2 text-gray-500 text-sm">(custom)</span>}
                  </li>
                ))}
                {filteredNationalities.length === 0 && (
                  <li className="px-3 py-2 text-gray-500">No nationalities found</li>
                )}
              </ul>

              {/* Add custom nationality option */}
              <div className="border-t py-2 px-3">
                <button
                  className="w-full text-left text-blue-600 hover:text-blue-800 flex items-center"
                  onClick={handleAddCustom}
                >
                    <Plus className="w-4 h-4 mr-2"/>
                    Add custom nationality
                </button>
              </div>
            </>
          ) : (
            /* Custom nationality form */
            <div className="p-3">
              <h3 className="font-medium mb-3">Add Custom Nationality</h3>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-700 mb-1" htmlFor="customName">
                  Country Name
                </label>
                <input
                  ref={customNameInputRef}
                  id="customName"
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="e.g. Wakanda"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1" htmlFor="customDemonym">
                  Nationality/Demonym
                </label>
                <input
                  id="customDemonym"
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="e.g. Wakandan"
                  value={customDemonym}
                  onChange={(e) => setCustomDemonym(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
                  onClick={handleCancelCustom}
                >
                  Cancel
                </button>
                <button
                  className={`px-3 py-1 rounded text-white ${
                    customName.trim() && customDemonym.trim()
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-300 cursor-not-allowed'
                  }`}
                  onClick={handleSaveCustom}
                  disabled={!customName.trim() || !customDemonym.trim()}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NationalitySelect;