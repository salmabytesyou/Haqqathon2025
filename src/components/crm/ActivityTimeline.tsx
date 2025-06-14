import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, Share, Calendar, Clock, Activity, Filter, Gift, TrendingUp, Star, Phone } from 'lucide-react';

const ActivityTimeline = () => {
  const [selectedTag, setSelectedTag] = useState('all');

  const tags = [
    { id: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
    { id: 'family', label: 'Family', color: 'bg-red-100 text-red-700' },
    { id: 'friends', label: 'Friends', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'professional', label: 'Professional', color: 'bg-blue-100 text-blue-700' },
    { id: 'clients', label: 'Clients', color: 'bg-green-100 text-green-700' },
    { id: 'mentors', label: 'Mentors', color: 'bg-purple-100 text-purple-700' }
  ];

  // Important activities that deserve special attention
  const importantActivities = [
    {
      id: 'imp1',
      type: 'birthday',
      contact: 'Mom',
      title: 'Birthday Tomorrow!',
      description: 'Your mom\'s birthday is tomorrow. Don\'t forget to call her!',
      suggestedAction: 'Call Mom',
      priority: 'high',
      tags: ['family'],
      icon: Gift,
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      iconColor: 'text-pink-600'
    },
    {
      id: 'imp2',
      type: 'promotion',
      contact: 'Sarah Johnson',
      title: 'Got Promoted!',
      description: 'Sarah just got promoted to Senior Product Manager at TechCorp. Congratulate her!',
      suggestedAction: 'Send Congratulations',
      priority: 'high',
      tags: ['professional'],
      icon: TrendingUp,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600'
    },
    {
      id: 'imp3',
      type: 'milestone',
      contact: 'Mike Chen',
      title: 'Wedding Anniversary',
      description: 'Mike and his wife are celebrating their 5th anniversary this weekend.',
      suggestedAction: 'Send Wishes',
      priority: 'medium',
      tags: ['friends'],
      icon: Heart,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600'
    }
  ];

  const activities = [
    {
      id: 1,
      type: 'message',
      platform: 'LinkedIn',
      contact: 'Sarah Johnson',
      action: 'sent you a message about the product launch',
      timestamp: '2 hours ago',
      content: 'Hey! Saw your latest post about AI in product development. Would love to chat more about this...',
      avatar: '/placeholder.svg',
      tags: ['professional', 'clients']
    },
    {
      id: 2,
      type: 'like',
      platform: 'Instagram',
      contact: 'Mike Chen',
      action: 'liked your photo',
      timestamp: '4 hours ago',
      content: 'Your weekend hiking adventure photo',
      avatar: '/placeholder.svg',
      tags: ['friends']
    },
    {
      id: 3,
      type: 'share',
      platform: 'Twitter',
      contact: 'Emily Rodriguez',
      action: 'shared your article',
      timestamp: '1 day ago',
      content: '"The Future of Remote Work: Insights from Tech Leaders"',
      avatar: '/placeholder.svg',
      tags: ['professional']
    },
    {
      id: 4,
      type: 'comment',
      platform: 'LinkedIn',
      contact: 'David Kim',
      action: 'commented on your post',
      timestamp: '2 days ago',
      content: 'Great insights on UX design trends! The part about micro-interactions was particularly interesting.',
      avatar: '/placeholder.svg',
      tags: ['professional', 'mentors']
    },
    {
      id: 5,
      type: 'event',
      platform: 'Calendar',
      contact: 'Mom',
      action: 'birthday reminder',
      timestamp: 'Tomorrow',
      content: 'Don\'t forget to call mom for her birthday!',
      avatar: '/placeholder.svg',
      tags: ['family']
    },
    {
      id: 6,
      type: 'message',
      platform: 'WhatsApp',
      contact: 'James Wilson',
      action: 'sent vacation photos',
      timestamp: '3 days ago',
      content: 'Check out these amazing shots from Bali!',
      avatar: '/placeholder.svg',
      tags: ['friends']
    },
    {
      id: 7,
      type: 'call',
      platform: 'Phone',
      contact: 'Dr. Martinez',
      action: 'career consultation call',
      timestamp: '1 week ago',
      content: 'Discussed career transition strategies and industry insights',
      avatar: '/placeholder.svg',
      tags: ['mentors', 'professional']
    }
  ];

  const filteredActivities = selectedTag === 'all' 
    ? activities 
    : activities.filter(activity => activity.tags.includes(selectedTag));

  const filteredImportantActivities = selectedTag === 'all'
    ? importantActivities
    : importantActivities.filter(activity => activity.tags.includes(selectedTag));

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
      case 'call':
        return <Clock className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
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
      case 'call':
        return 'text-indigo-600 bg-indigo-50';
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
      case 'WhatsApp':
        return 'bg-green-500';
      case 'Phone':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Activity Timeline
        </CardTitle>
        <CardDescription>
          Recent user engagement across all platforms and relationships
        </CardDescription>
        
        {/* Tag Filter */}
        <div className="flex items-center gap-2 mt-4">
          <Filter className="w-4 h-4 text-gray-600" />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedTag === tag.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : tag.color + ' hover:shadow-sm'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Important Activities Section */}
        {filteredImportantActivities.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900">Important Activities</h3>
            </div>
            
            <div className="grid gap-4 mb-6">
              {filteredImportantActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg border-2 ${activity.bgColor} ${activity.borderColor} hover:shadow-md transition-all duration-200`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full bg-white shadow-sm ${activity.iconColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                          <span className="text-sm font-medium text-gray-700">• {activity.contact}</span>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{activity.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {activity.tags.map((tag) => {
                              const tagInfo = tags.find(t => t.id === tag);
                              return (
                                <span key={tag} className={`text-xs px-2 py-1 rounded-full ${tagInfo?.color}`}>
                                  {tagInfo?.label}
                                </span>
                              );
                            })}
                          </div>
                          
                          <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                            {activity.suggestedAction}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular Activities Timeline */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          
          {filteredActivities.map((activity, index) => (
            <div key={activity.id} className="relative">
              {/* Timeline line */}
              {index < filteredActivities.length - 1 && (
                <div className="absolute left-8 top-16 w-px h-12 bg-gray-200"></div>
              )}
              
              <div className="flex gap-4">
                {/* Avatar and Icon */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {activity.contact.charAt(0)}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${getIconColor(activity.type)}`}>
                    {getIcon(activity.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-gray-900">{activity.contact}</span>
                    <span className="text-gray-600">{activity.action}</span>
                    <span className={`text-xs text-white px-2 py-1 rounded ${getPlatformColor(activity.platform)}`}>
                      {activity.platform}
                    </span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex gap-1 mb-2">
                    {activity.tags.map((tag) => {
                      const tagInfo = tags.find(t => t.id === tag);
                      return (
                        <span key={tag} className={`text-xs px-2 py-1 rounded-full ${tagInfo?.color}`}>
                          {tagInfo?.label}
                        </span>
                      );
                    })}
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
        
        <div className="mt-6 text-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Load More Activities
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export { ActivityTimeline };
