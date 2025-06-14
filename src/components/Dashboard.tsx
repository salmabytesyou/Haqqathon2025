
import { Contact, Interaction, Reminder } from '@/pages/Index';
import { DashboardStats } from './dashboard/DashboardStats';
import { WeeklyOverview } from './dashboard/WeeklyOverview';
import { RecentInteractions } from './dashboard/RecentInteractions';
import { KeyContacts } from './dashboard/KeyContacts';
import { UrgentReminders } from './dashboard/UrgentReminders';

interface DashboardProps {
  contacts: Contact[];
  interactions: Interaction[];
  reminders: Reminder[];
}

export const Dashboard = ({ contacts, interactions, reminders }: DashboardProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Overview of your relationship management</p>
      </div>

      <WeeklyOverview contacts={contacts} reminders={reminders} />

      <UrgentReminders contacts={contacts} reminders={reminders} />

      <DashboardStats contacts={contacts} interactions={interactions} reminders={reminders} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentInteractions contacts={contacts} interactions={interactions} />
        <KeyContacts contacts={contacts} />
      </div>
    </div>
  );
};
