
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, MessageSquare, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

const InteractiveStats = () => {
  const [selectedStat, setSelectedStat] = useState(null);

  const stats = [
    { 
      icon: Users, 
      label: 'Total Contacts', 
      value: '1,247', 
      change: '+12%', 
      trend: 'up',
      color: 'from-blue-500 to-blue-600',
      details: 'Added 134 new contacts this month'
    },
    { 
      icon: MessageSquare, 
      label: 'Interactions', 
      value: '89', 
      change: '+5%', 
      trend: 'up',
      color: 'from-green-500 to-green-600',
      details: '24 messages, 35 likes, 30 comments'
    },
    { 
      icon: Calendar, 
      label: 'Events', 
      value: '15', 
      change: '+8%', 
      trend: 'up',
      color: 'from-purple-500 to-purple-600',
      details: '8 meetings, 4 birthdays, 3 anniversaries'
    },
    { 
      icon: TrendingUp, 
      label: 'Engagement', 
      value: '92%', 
      change: '-2%', 
      trend: 'down',
      color: 'from-orange-500 to-orange-600',
      details: 'Slight decrease from last month'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
        const isSelected = selectedStat === index;
        
        return (
          <Card 
            key={index} 
            className={`bg-white hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''
            }`}
            onClick={() => setSelectedStat(isSelected ? null : index)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                {isSelected && (
                  <p className="text-xs text-gray-500 mt-2 animate-fade-in">
                    {stat.details}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export { InteractiveStats };
