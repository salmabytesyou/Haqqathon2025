
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, MessageSquare, Calendar, Upload, Download, Settings } from 'lucide-react';

const QuickActions = () => {
  const [hoveredAction, setHoveredAction] = useState(null);

  const actions = [
    {
      icon: Plus,
      label: 'Add Contact',
      description: 'Create a new contact',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => console.log('Add contact')
    },
    {
      icon: MessageSquare,
      label: 'Send Message',
      description: 'Quick message to contacts',
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => console.log('Send message')
    },
    {
      icon: Calendar,
      label: 'Schedule Meeting',
      description: 'Book a meeting',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => console.log('Schedule meeting')
    },
    {
      icon: Upload,
      label: 'Import Contacts',
      description: 'Upload contact list',
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => console.log('Import contacts')
    },
    {
      icon: Download,
      label: 'Export Data',
      description: 'Download your data',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      onClick: () => console.log('Export data')
    },
    {
      icon: Settings,
      label: 'Settings',
      description: 'Configure preferences',
      color: 'bg-gray-500 hover:bg-gray-600',
      onClick: () => console.log('Open settings')
    }
  ];

  return (
    <Card className="bg-white mb-6">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.onClick}
                onMouseEnter={() => setHoveredAction(index)}
                onMouseLeave={() => setHoveredAction(null)}
                className={`p-4 rounded-lg text-white transition-all duration-200 transform hover:scale-105 ${action.color}`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">{action.label}</p>
                {hoveredAction === index && (
                  <p className="text-xs mt-1 opacity-90 animate-fade-in">
                    {action.description}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export { QuickActions };
