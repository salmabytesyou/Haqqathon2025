
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Heart, Share, Calendar, Clock } from 'lucide-react';

const InteractionTimeline = () => {
  const interactions = [
    {
      id: 1,
      type: 'message',
      platform: 'LinkedIn',
      contact: 'Sarah Johnson',
      action: 'sent you a message about the product launch',
      timestamp: '2 hours ago',
      content: 'Hey! Saw your latest post about AI in product development. Would love to chat more about this...',
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      type: 'like',
      platform: 'Instagram',
      contact: 'Mike Chen',
      action: 'liked your photo',
      timestamp: '4 hours ago',
      content: 'Your weekend hiking adventure photo',
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      type: 'share',
      platform: 'Twitter',
      contact: 'Emily Rodriguez',
      action: 'shared your article',
      timestamp: '1 day ago',
      content: '"The Future of Remote Work: Insights from Tech Leaders"',
      avatar: '/placeholder.svg'
    },
    {
      id: 4,
      type: 'comment',
      platform: 'LinkedIn',
      contact: 'David Kim',
      action: 'commented on your post',
      timestamp: '2 days ago',
      content: 'Great insights on UX design trends! The part about micro-interactions was particularly interesting.',
      avatar: '/placeholder.svg'
    },
    {
      id: 5,
      type: 'event',
      platform: 'Calendar',
      contact: 'Team Meeting',
      action: 'upcoming call with Sarah Johnson',
      timestamp: 'Tomorrow at 2 PM',
      content: 'Product roadmap discussion - Q2 planning',
      avatar: '/placeholder.svg'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-4 h-4" />;
      case 'like':
        return <Heart className="w-4 h-4" />;
      case 'share':
        return <Share className="w-4 h-4" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'text-blue-600 bg-blue-50';
      case 'like':
        return 'text-red-600 bg-red-50';
      case 'share':
        return 'text-green-600 bg-green-50';
      case 'comment':
        return 'text-purple-600 bg-purple-50';
      case 'event':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
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
      case 'Calendar':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Interaction Timeline
        </CardTitle>
        <CardDescription>
          Recent activities and interactions across all platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interactions.map((interaction, index) => (
            <div key={interaction.id} className="relative">
              {/* Timeline line */}
              {index < interactions.length - 1 && (
                <div className="absolute left-8 top-16 w-px h-12 bg-gray-200"></div>
              )}
              
              <div className="flex gap-4">
                {/* Avatar and Icon */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {interaction.contact.charAt(0)}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${getIconColor(interaction.type)}`}>
                    {getIcon(interaction.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{interaction.contact}</span>
                    <span className="text-gray-600">{interaction.action}</span>
                    <span className={`text-xs text-white px-2 py-1 rounded ${getPlatformColor(interaction.platform)}`}>
                      {interaction.platform}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{interaction.content}</p>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">{interaction.timestamp}</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800">Reply</button>
                    <button className="text-xs text-gray-600 hover:text-gray-800">View Full</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Load More Interactions
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export { InteractionTimeline };
