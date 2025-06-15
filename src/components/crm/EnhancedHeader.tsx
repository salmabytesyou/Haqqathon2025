
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Bell, Search, Plus, Filter, User } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';

const EnhancedHeader = () => {
  const [notifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search contacts, interactions..."
            className="pl-10 bg-white shadow-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Add Contact
        </button>
        
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          
          <NotificationDropdown 
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        </div>
        
        <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};

export { EnhancedHeader };
