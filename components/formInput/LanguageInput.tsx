"use client"

import { ChevronDown } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface LanguageSelectProps {
  value: string;
  onChange: (name: string) => void;
  placeholder?: string;
  className?: string;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  value,
  onChange,
  placeholder = 'Select language',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Most frequently used languages, including Thai
  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'th', name: 'Thai', nativeName: 'ไทย' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
    { code: 'pl', name: 'Polish', nativeName: 'Polski' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  ];

  // Filter languages based on search term
  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get currently selected language name
  const selectedLanguage = languages.find((lang) => lang.name === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  const handleSelect = (name: string) => {
    onChange(name);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected language display */}
      <div
        className="flex items-center justify-between border rounded 
        px-3 py-2 bg-white text-slate-700 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>
          {selectedLanguage 
            ? `${selectedLanguage.name} (${selectedLanguage.nativeName})`
            : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform dark:text-slate-900 ${isOpen ? 'transform rotate-180' : ''}`}/>
      </div>
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          {/* Search input */}
          <div className="sticky top-0 bg-white p-2 border-b">
            <input
              ref={searchInputRef}
              type="text"
              className="w-full px-3 py-2 border rounded text-slate-700"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Language options */}
          <ul className="py-1">
            {filteredLanguages.map((lang) => (
              <li
                key={lang.code}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  lang.code === value ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
                }`}
                onClick={() => handleSelect(lang.name)}
              >
                <span>{lang.name} ({lang.nativeName})</span>
              </li>
            ))}
            {filteredLanguages.length === 0 && (
              <li className="px-3 py-2 text-gray-500">No languages found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;