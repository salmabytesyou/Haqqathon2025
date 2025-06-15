
import { Reminder, CategoryConfigMap } from './reminder-types';
import { Gift, Calendar, Coffee, Briefcase, Users, Heart, Building2 } from 'lucide-react';

export const sampleReminders: Reminder[] = [
  {
    id: 1,
    type: 'birthday',
    contact: 'Nour Mukhtar',
    title: 'Birthday',
    date: 'Today',
    time: '',
    icon: Gift,
    color: 'text-pink-600 bg-pink-50',
    urgent: true,
    category: 'family'
  },
  {
    id: 2,
    type: 'meeting',
    contact: 'Mike Chen',
    title: 'Coffee Chat',
    date: 'Tomorrow',
    time: '2:00 PM',
    icon: Coffee,
    color: 'text-amber-600 bg-amber-50',
    urgent: false,
    category: 'friends'
  },
  {
    id: 3,
    type: 'follow_up',
    contact: 'Emily Rodriguez',
    title: 'Project Follow-up',
    date: 'Friday',
    time: '10:00 AM',
    icon: Briefcase,
    color: 'text-blue-600 bg-blue-50',
    urgent: false,
    category: 'colleagues'
  },
  {
    id: 4,
    type: 'anniversary',
    contact: 'Sophia Hassan',
    title: 'Work Anniversary',
    date: 'Next Monday',
    time: '',
    icon: Calendar,
    color: 'text-green-600 bg-green-50',
    urgent: false,
    category: 'colleagues'
  },
  {
    id: 5,
    type: 'birthday',
    contact: 'Mom',
    title: 'Birthday',
    date: 'Wednesday',
    time: '',
    icon: Gift,
    color: 'text-pink-600 bg-pink-50',
    urgent: false,
    category: 'family'
  },
  {
    id: 6,
    type: 'meeting',
    contact: 'Jessica Smith',
    title: 'Lunch Meeting',
    date: 'Thursday',
    time: '12:30 PM',
    icon: Coffee,
    color: 'text-amber-600 bg-amber-50',
    urgent: false,
    category: 'friends'
  }
];

export const categoryConfig: CategoryConfigMap = {
  family: { label: 'Family', icon: Heart, color: 'text-pink-600' },
  friends: { label: 'Friends', icon: Users, color: 'text-blue-600' },
  colleagues: { label: 'Colleagues', icon: Building2, color: 'text-green-600' },
  other: { label: 'Other', icon: Calendar, color: 'text-gray-600' }
};
