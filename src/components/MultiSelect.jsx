import React from 'react';
import { X } from 'lucide-react';

export default function MultiSelect({ label, options, selectedOptions, onChange }) {
  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue && !selectedOptions.includes(selectedValue)) {
      onChange([...selectedOptions, selectedValue]);
    }
  };

  const handleRemove = (optionToRemove) => {
    onChange(selectedOptions.filter(option => option !== optionToRemove));
  };

  const availableOptions = options.filter(opt => !selectedOptions.includes(opt));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <div className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
        <div className="flex flex-wrap gap-2 mb-2 min-h-[30px]">
          {selectedOptions.map(option => (
            <span key={option} className="flex items-center gap-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-sm font-medium px-2.5 py-1 rounded-full">
              {option}
              <button type="button" onClick={() => handleRemove(option)} className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <select onChange={handleSelect} value="" className="w-full border-t pt-2 border-gray-200 dark:border-gray-600 focus:outline-none bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400">
          <option value="" disabled>{label === 'Your Technical Skills' ? 'Add a skill...' : 'Add an interest...'}</option>
          {availableOptions.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
    </div>
  );
}
