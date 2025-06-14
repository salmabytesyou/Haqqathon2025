
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, MessageSquare, Target } from 'lucide-react';

const RelationshipInsights = () => {
  const insights = [
    {
      metric: 'Engagement Rate',
      value: '92%',
      change: '+5%',
      trend: 'up',
      description: 'vs last month'
    },
    {
      metric: 'New Connections',
      value: '23',
      change: '+12',
      trend: 'up',
      description: 'this month'
    },
    {
      metric: 'Response Rate',
      value: '78%',
      change: '-2%',
      trend: 'down',
      description: 'vs last month'
    }
  ];

  const topContacts = [
    { name: 'Sarah Johnson', interactions: 24, platform: 'LinkedIn' },
    { name: 'Emily Rodriguez', interactions: 18, platform: 'Twitter' },
    { name: 'Mike Chen', interactions: 15, platform: 'Instagram' },
  ];

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Relationship Insights
        </CardTitle>
        <CardDescription>
          Analytics and trends for your network
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{insight.metric}</h4>
                <p className="text-xs text-gray-500">{insight.description}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{insight.value}</div>
                <div className={`text-xs ${insight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {insight.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Contacts */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Most Active Contacts
          </h4>
          <div className="space-y-2">
            {topContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                    <p className="text-xs text-gray-500">{contact.platform}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{contact.interactions} interactions</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Quick Actions
          </h4>
          <button className="w-full p-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            Export Relationship Report
          </button>
          <button className="w-full p-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            Set Engagement Goals
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export { RelationshipInsights };
