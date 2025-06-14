
export type ReminderCategory = 'family' | 'friends' | 'colleagues' | 'other';

export interface Reminder {
  id: number;
  type: string;
  contact: string;
  title: string;
  date: string;
  time: string;
  icon: any;
  color: string;
  urgent: boolean;
  category: ReminderCategory;
}

export interface CategoryConfig {
  label: string;
  icon: any;
  color: string;
}

export type CategoryConfigMap = {
  [K in ReminderCategory]: CategoryConfig;
};
