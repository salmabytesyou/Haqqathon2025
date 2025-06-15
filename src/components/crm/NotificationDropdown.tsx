
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, Calendar, Users, TrendingUp, Activity, Clock, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'activity' | 'engagement' | 'calendar' | 'insights';
  title: string;
  message: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDropdown = ({ isOpen, onClose }: NotificationDropdownProps) => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'calendar',
      title: 'Upcoming Meeting',
      message: 'Coffee with Nour Mukhtar in 30 minutes',
      time: '30m',
      priority: 'high',
      read: false
    },
    {
      id: '2',
      type: 'engagement',
      title: 'Follow-up Reminder',
      message: 'Time to reconnect with Mike Chen - last contact 2 weeks ago',
      time: '1h',
      priority: 'medium',
      read: false
    },
    {
      id: '3',
      type: 'insights',
      title: 'Weekly Summary',
      message: 'Your engagement increased by 12% this week',
      time: '2h',
      priority: 'low',
      read: true
    },
    {
      id: '4',
      type: 'activity',
      title: 'New Interaction',
      message: 'Emily Rodriguez liked your LinkedIn post',
      time: '3h',
      priority: 'low',
      read: true
    },
    {
      id: '5',
      type: 'calendar',
      title: 'Event Tomorrow',
      message: 'Team standup meeting at 9:00 AM',
      time: '5h',
      priority: 'medium',
      read: false
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'calendar':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'engagement':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'insights':
        return <TrendingUp className="w-4 h-4 text-purple-600" />;
      case 'activity':
        return <Activity className="w-4 h-4 text-orange-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-0 z-50 w-80">
      <Card className="bg-white shadow-lg border">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                ×
              </button>
            </div>
          </div>
        </div>
        
        <CardContent className="p-0 max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-l-4 ${getPriorityColor(notification.priority)} hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? 'font-medium' : 'opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No new notifications</p>
            </div>
          )}
        </CardContent>
        
        {notifications.length > 0 && (
          <div className="p-3 border-t bg-gray-50">
            <button className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium">
              View All Notifications
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export { NotificationDropdown };
