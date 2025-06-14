
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Contact, Reminder } from '@/pages/Index';

interface RemindersProps {
  reminders: Reminder[];
  contacts: Contact[];
  setReminders: (reminders: Reminder[]) => void;
}

export const Reminders = ({ reminders, contacts, setReminders }: RemindersProps) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const toggleReminder = (reminderId: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    ));
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const filteredReminders = reminders.filter(reminder => {
    switch (filter) {
      case 'pending':
        return !reminder.completed;
      case 'completed':
        return reminder.completed;
      default:
        return true;
    }
  }).sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const pendingCount = reminders.filter(r => !r.completed).length;
  const overdueCount = reminders.filter(r => !r.completed && new Date(r.dueDate) < new Date()).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Reminders</h2>
        <p className="text-gray-600 mt-2">Stay on top of your relationship management tasks</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Bell className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
            <p className="text-sm text-gray-600">Overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{reminders.filter(r => r.completed).length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All ({reminders.length})
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          onClick={() => setFilter('pending')}
        >
          Pending ({pendingCount})
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
        >
          Completed ({reminders.filter(r => r.completed).length})
        </Button>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.map((reminder) => {
          const contact = contacts.find(c => c.id === reminder.contactId);
          const isOverdue = !reminder.completed && new Date(reminder.dueDate) < new Date();
          
          return (
            <Card 
              key={reminder.id} 
              className={`transition-all ${
                reminder.completed ? 'opacity-75' : getPriorityColor(reminder.priority)
              } ${isOverdue ? 'border-red-300 bg-red-50' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={reminder.completed}
                    onCheckedChange={() => toggleReminder(reminder.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getPriorityIcon(reminder.priority)}
                        <h3 className={`font-medium ${reminder.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {reminder.title}
                        </h3>
                        <Badge variant={reminder.completed ? 'secondary' : 'outline'}>
                          {reminder.priority}
                        </Badge>
                        {isOverdue && <Badge variant="destructive">Overdue</Badge>}
                      </div>
                      <div className="text-sm text-gray-500">
                        Due: {reminder.dueDate}
                      </div>
                    </div>
                    <p className={`text-gray-600 mb-2 ${reminder.completed ? 'line-through' : ''}`}>
                      {reminder.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                        {contact?.name.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-600">{contact?.name}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-400">{contact?.company}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredReminders.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No reminders found</p>
          <p className="text-gray-400 mt-2">
            {filter === 'all' ? 'No reminders have been set up yet' : 
             filter === 'pending' ? 'No pending reminders' : 'No completed reminders'}
          </p>
        </div>
      )}
    </div>
  );
};
