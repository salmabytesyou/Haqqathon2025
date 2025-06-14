
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageSquare, Heart, Share, Calendar, Clock, Activity } from 'lucide-react';

const ContactInteractions = ({ contact, onBack }) => {
  const contactActivities = [
    {
      id: 1,
      type: 'message',
      platform: 'LinkedIn',
      action: 'sent you a message about the product launch',
      timestamp: '2 hours ago',
      content: 'Hey! Saw your latest post about AI in product development. Would love to chat more about this...',
    },
    {
      id: 2,
      type: 'comment',
      platform: 'LinkedIn',
      action: 'commented on your post',
      timestamp: '2 days ago',
      content: 'Great insights on UX design trends! The part about micro-interactions was particularly interesting.',
    },
    {
      id: 3,
      type: 'like',
      platform: 'Instagram',
      action: 'liked your photo',
      timestamp: '1 week ago',
      content: 'Your weekend hiking adventure photo',
    },
    {
      id: 4,
      type: 'share',
      platform: 'Twitter',
      action: 'shared your article',
      timestamp: '2 weeks ago',
      content: '"The Future of Remote Work: Insights from Tech Leaders"',
    },
    {
      id: 5,
      type: 'call',
      platform: 'Phone',
      action: 'had a call',
      timestamp: '3 weeks ago',
      content: 'Discussed upcoming project collaboration and timeline',
    }
  ];

  const getIcon = (type) => {
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
      case 'call':
        return <Clock className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getIconColor = (type) => {
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
      case 'call':
        return 'text-indigo-600 bg-indigo-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'LinkedIn':
        return 'bg-blue-600';
      case 'Instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Twitter':
        return 'bg-blue-400';
      case 'Phone':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {contact.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-xl">{contact.name}</CardTitle>
              <CardDescription>{contact.profession}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contactActivities.map((activity, index) => (
            <div key={activity.id} className="relative">
              {/* Timeline line */}
              {index < contactActivities.length - 1 && (
                <div className="absolute left-8 top-16 w-px h-12 bg-gray-200"></div>
              )}
              
              <div className="flex gap-4">
                {/* Avatar and Icon */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {contact.name.charAt(0)}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${getIconColor(activity.type)}`}>
                    {getIcon(activity.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-gray-900">{contact.name}</span>
                    <span className="text-gray-600">{activity.action}</span>
                    <span className={`text-xs text-white px-2 py-1 rounded ${getPlatformColor(activity.platform)}`}>
                      {activity.platform}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{activity.content}</p>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800">Reply</button>
                    <button className="text-xs text-gray-600 hover:text-gray-800">View Full</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Send Message
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              Schedule Call
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              Add Note
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ContactInteractions };
