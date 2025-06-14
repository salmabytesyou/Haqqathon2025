
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReminderCategory, CategoryConfigMap } from './reminder-types';

interface CategorySelectorProps {
  value: ReminderCategory;
  onChange: (value: ReminderCategory) => void;
  categoryConfig: CategoryConfigMap;
}

export const CategorySelector = ({ value, onChange, categoryConfig }: CategorySelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-32 h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(categoryConfig).map(([key, config]) => (
          <SelectItem key={key} value={key}>
            {config.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
