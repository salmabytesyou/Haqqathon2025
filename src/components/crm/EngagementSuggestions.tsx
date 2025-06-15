
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Clock, TrendingUp, Gift, MessageSquare, Calendar } from 'lucide-react';

const EngagementSuggestions = () => {
  const suggestions = [
    {
      id: 1,
      type: 'birthday',
      priority: 'high',
      contact: 'Nour Abdulaziz',
      title: 'Birthday Coming Up',
      description: "Nour's birthday is in 3 days. Send a personalized message or schedule a call.",
      platform: 'LinkedIn',
      suggestedAction: 'Send Birthday Message',
      timeframe: '3 days',
      icon: Gift,
      color: 'text-pink-600 bg-pink-50'
    },
    {
      id: 2,
      type: 'job_change',
      priority: 'high',
      contact: 'Emily Rodriguez',
      title: 'New Job Opportunity',
      description: 'Emily just started as Marketing Director at TechCorp. Congratulate her on the new role.',
      platform: 'LinkedIn',
      suggestedAction: 'Send Congratulations',
      timeframe: 'Recent',
      icon: TrendingUp,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 3,
      type: 'follow_up',
      priority: 'medium',
      contact: 'Mike Chen',
      title: 'Follow Up Needed',
      description: "Haven't interacted with Mike in 2 weeks. He recently posted about a gaming project.",
      platform: 'Instagram',
      suggestedAction: 'Comment on Post',
      timeframe: '2 weeks ago',
      icon: MessageSquare,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 4,
      type: 'meeting',
      priority: 'medium',
      contact: 'David Kim',
      title: 'Schedule Check-in',
      description: 'Good time to schedule a quarterly check-in with David about design collaboration.',
      platform: 'LinkedIn',
      suggestedAction: 'Schedule Meeting',
      timeframe: 'This week',
      icon: Calendar,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 5,
      type: 'reconnect',
      priority: 'low',
      contact: 'Alex Thompson',
      title: 'Reconnect Opportunity',
      description: 'Alex recently shared an article about AI trends. Great conversation starter.',
      platform: 'Twitter',
      suggestedAction: 'Start Conversation',
      timeframe: '1 month ago',
      icon: Lightbulb,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn':
        return 'bg-blue-600';
      case 'Instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Twitter':
        return 'bg-blue-400';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Engagement Suggestions
        </CardTitle>
        <CardDescription>
          AI-powered recommendations to strengthen your relationships
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon;
            return (
              <div key={suggestion.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${suggestion.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(suggestion.priority)}`}>
                        {suggestion.priority} priority
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-900">{suggestion.contact}</span>
                        <span className={`text-xs text-white px-2 py-1 rounded ${getPlatformColor(suggestion.platform)}`}>
                          {suggestion.platform}
                        </span>
                        <span className="text-xs text-gray-500">{suggestion.timeframe}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                          {suggestion.suggestedAction}
                        </button>
                        <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-900">Smart Suggestions</h4>
              <p className="text-sm text-blue-700">
                Our AI analyzes interaction patterns, platform activity, and relationship strength to provide personalized engagement recommendations.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { EngagementSuggestions };
