
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
    <div className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${config.color}`} />
            <h4 className="font-medium text-gray-900 text-sm">Tier {tierNumber}</h4>
          </div>
          <CategorySelector 
            value={category} 
            onChange={setCategory} 
            categoryConfig={categoryConfig} 
          />
        </div>
        <p className="text-xs text-gray-500">{config.label} reminders</p>
      </div>

      <div className="p-3 space-y-2 min-h-[200px]">
        {tierReminders.length > 0 ? (
          tierReminders.slice(0, 3).map((reminder) => (
            <ReminderItem key={reminder.id} reminder={reminder} compact={true} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Icon className={`w-8 h-8 mx-auto mb-2 ${config.color} opacity-30`} />
            <p className="text-xs font-medium">No {config.label.toLowerCase()} reminders</p>
            <p className="text-xs text-gray-400 mt-1">All caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};
