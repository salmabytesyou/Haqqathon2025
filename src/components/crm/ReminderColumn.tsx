
import React from 'react';
import { Reminder, ReminderCategory, CategoryConfigMap } from './reminder-types';
import { ReminderItem } from './ReminderItem';
import { CategorySelector } from './CategorySelector';

interface ReminderColumnProps {
  tierNumber: number;
  category: ReminderCategory;
  setCategory: (category: ReminderCategory) => void;
  reminders: Reminder[];
  categoryConfig: CategoryConfigMap;
}

export const ReminderColumn = ({ 
  tierNumber, 
  category, 
  setCategory, 
  reminders, 
  categoryConfig 
}: ReminderColumnProps) => {
  const config = categoryConfig[category];
  const Icon = config.icon;
  const tierReminders = reminders.filter(reminder => reminder.category === category);

  return (
    <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${config.color}`} />
            <h3 className="font-semibold text-gray-900">Tier {tierNumber}</h3>
          </div>
          <CategorySelector 
            value={category} 
            onChange={setCategory} 
            categoryConfig={categoryConfig} 
          />
        </div>
        <p className="text-sm text-gray-500">{config.label} reminders</p>
      </div>

      <div className="p-4 space-y-3 min-h-[400px]">
        {tierReminders.length > 0 ? (
          tierReminders.map((reminder) => (
            <ReminderItem key={reminder.id} reminder={reminder} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Icon className={`w-12 h-12 mx-auto mb-3 ${config.color} opacity-30`} />
            <p className="text-sm font-medium">No {config.label.toLowerCase()} reminders</p>
            <p className="text-xs text-gray-400 mt-1">All caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};
