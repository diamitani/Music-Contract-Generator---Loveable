
import React from 'react';

type Field = {
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'date';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
};

type ContractFormFieldsProps = {
  fields: Record<string, Field>;
  formData: Record<string, any>;
  handleChange: (field: string, value: any) => void;
};

const ContractFormFields = ({ fields, formData, handleChange }: ContractFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {Object.entries(fields).map(([key, field]) => (
        <div key={key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
          <label className="block text-sm font-medium mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          
          {field.type === 'text' && (
            <input
              type="text"
              value={formData[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={field.placeholder || ''}
              className="form-input"
              required={field.required}
            />
          )}
          
          {field.type === 'number' && (
            <input
              type="number"
              value={formData[key] || ''}
              onChange={(e) => handleChange(key, parseFloat(e.target.value))}
              placeholder={field.placeholder || ''}
              className="form-input"
              required={field.required}
            />
          )}
          
          {field.type === 'select' && (
            <select
              value={formData[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="form-input"
              required={field.required}
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          
          {field.type === 'date' && (
            <input
              type="date"
              value={formData[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="form-input"
              required={field.required}
            />
          )}
          
          {field.type === 'textarea' && (
            <textarea
              value={formData[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={field.placeholder || ''}
              className="form-input h-24"
              required={field.required}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ContractFormFields;
