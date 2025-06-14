
import { Card, CardContent } from '@/components/ui/card';
import { Users, MessageCircle, Bell } from 'lucide-react';
import { Contact, Interaction, Reminder } from '@/pages/Index';

interface DashboardStatsProps {
  contacts: Contact[];
  interactions: Interaction[];
  reminders: Reminder[];
}

export const DashboardStats = ({ contacts, interactions, reminders }: DashboardStatsProps) => {
  const pendingReminders = reminders.filter(r => !r.completed && new Date(r.dueDate) <= new Date());

  const stats = [
    {
      title: 'Total Contacts',
      value: contacts.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Recent Interactions',
      value: interactions.filter(i => {
        const interactionDate = new Date(i.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return interactionDate >= weekAgo;
      }).length,
      icon: MessageCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Pending Reminders',
      value: pendingReminders.length,
      icon: Bell,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
