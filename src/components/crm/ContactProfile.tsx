import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Calendar, MapPin, Phone, Mail, MessageSquare, Gift, Coffee, Star, Plus, Edit, X, Tags } from 'lucide-react';

interface ContactProfileProps {
  contact: any;
  onBack: () => void;
}

interface TierInfo {
  name: string;
  description: string;
  color: string;
  priority: number;
  tags: string[];
}

interface GroupedTierInfo extends TierInfo {
  tags: string[];
}

export const ContactProfile = ({ contact, onBack }: ContactProfileProps) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [contactTags, setContactTags] = useState(contact.tags || ['Professional', 'Tech', 'Mentor']);

  // Tag tiers configuration
  const tagTiers = {
    'Tier 1 (Inner Circle)': {
      description: 'Closest professional and personal contacts',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      priority: 1,
      tags: ['Family', 'Best Friends', 'Key Mentors', 'Core Team']
    },
    'Tier 2 (Active Network)': {
      description: 'Regular professional interactions and close friends',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      priority: 2,
      tags: ['Professional', 'Colleagues', 'Clients', 'Friends', 'Mentors']
    },
    'Tier 3 (Extended Network)': {
      description: 'Broader professional network and acquaintances',
      color: 'bg-green-100 text-green-800 border-green-200',
      priority: 3,
      tags: ['Industry Contacts', 'Conference Connections', 'Alumni', 'Acquaintances']
    },
    'Tier 4 (Casual Connections)': {
      description: 'Occasional interactions and loose connections',
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      priority: 4,
      tags: ['Social Media', 'Event Attendees', 'General Network']
    }
  };

  // Function to get tier for a tag
  const getTagTier = (tag: string): TierInfo => {
    for (const [tierName, tierInfo] of Object.entries(tagTiers)) {
      if (tierInfo.tags.some(tierTag => tierTag.toLowerCase() === tag.toLowerCase())) {
        return { name: tierName, ...tierInfo };
      }
    }
    return {
      name: 'Unassigned',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      priority: 5,
      description: 'Tags not assigned to any tier',
      tags: []
    };
  };

  const addTag = () => {
    if (newTag.trim() && !contactTags.includes(newTag.trim())) {
      setContactTags([...contactTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setContactTags(contactTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  // Extended personal information for relationship building
  const personalInfo = {
    birthday: 'March 15, 1990',
    interests: ['Photography', 'Hiking', 'Coffee Culture', 'Tech Innovation'],
    personalGoals: ['Learning Spanish', 'Running a Marathon', 'Starting a Side Project'],
    family: ['Married to Alex', 'Two kids: Emma (8), Liam (5)', 'Dog named Max'],
    favoriteThings: {
      food: 'Italian cuisine, especially pasta',
      books: 'Mystery novels, business biographies',
      movies: 'Sci-fi and documentaries',
      music: 'Jazz and indie rock',
      travel: 'Japan, Iceland, New Zealand'
    },
    communicationPreferences: {
      bestTime: 'Mornings (9-11 AM)',
      preferredMethod: 'Email for work, text for casual',
      responseTime: 'Usually responds within 2-4 hours'
    }
  };

  const relationshipHistory = [
    {
      date: '2024-03-10',
      type: 'coffee',
      description: 'coffee chat at Blue Bottle - discussed career transition',
      mood: 'positive',
      followUp: 'Send article about product management trends'
    },
    {
      date: '2024-02-20',
      type: 'linkedin',
      description: 'Connected on LinkedIn after tech conference',
      mood: 'professional',
      followUp: 'None needed'
    },
    {
      date: '2024-01-15',
      type: 'referral',
      description: 'Referred her for PM role at current company',
      mood: 'grateful',
      followUp: 'Check in about interview process'
    }
  ];

  const upcomingOpportunities = [
    {
      type: 'birthday',
      date: '2024-03-15',
      description: 'Birthday coming up - send card or small gift',
      priority: 'high'
    },
    {
      type: 'work',
      date: '2024-03-20',
      description: 'Product launch at her company - congratulate',
      priority: 'medium'
    },
    {
      type: 'personal',
      date: '2024-04-01',
      description: 'Marathon training starts - check in on progress',
      priority: 'low'
    }
  ];

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: Heart },
    { id: 'history', label: 'Relationship History', icon: Calendar },
    { id: 'opportunities', label: 'Opportunities', icon: Gift }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{contact.name}</h1>
          <p className="text-gray-600">{contact.title}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
            <Phone className="w-4 h-4 text-blue-600" />
          </button>
          <button className="p-2 hover:bg-green-100 rounded-lg transition-colors">
            <Mail className="w-4 h-4 text-green-600" />
          </button>
          <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
            <MessageSquare className="w-4 h-4 text-purple-600" />
          </button>
        </div>
      </div>

      {/* Profile Summary Card with Tags */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6 mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              {contact.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{contact.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Birthday: {personalInfo.birthday}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Engagement: {contact.engagementScore}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Last contact: {contact.lastInteraction}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Tags</h3>
              <button
                onClick={() => setIsEditingTags(!isEditingTags)}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
              >
                <Edit className="w-3 h-3" />
                {isEditingTags ? 'Done' : 'Edit'}
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {contactTags.map((tag, index) => {
                const tier = getTagTier(tag);
                return (
                  <div key={index} className="relative group">
                    <Badge className={`${tier.color} border ${isEditingTags ? 'pr-6' : ''}`}>
                      {tag}
                      {isEditingTags && (
                        <button
                          onClick={() => removeTag(tag)}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          <X className="w-2 h-2" />
                        </button>
                      )}
                    </Badge>
                    {/* Tier tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {tier.name}
                    </div>
                  </div>
                );
              })}
              
              {isEditingTags && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add tag..."
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={addTag}
                    className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      
      {activeTab === 'personal' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Interests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Hobbies & Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.interests.map((interest, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Current Goals</h4>
                <ul className="space-y-1">
                  {personalInfo.personalGoals.map((goal, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Family & Personal Life</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {personalInfo.family.map((member, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <Heart className="w-3 h-3 text-red-400" />
                    {member}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Favorite Things</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(personalInfo.favoriteThings).map(([category, item]) => (
                <div key={category}>
                  <span className="text-sm font-medium text-gray-700 capitalize">{category}:</span>
                  <span className="text-sm text-gray-600 ml-2">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Communication Style</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Best time to reach:</span>
                <span className="text-sm text-gray-600 ml-2">{personalInfo.communicationPreferences.bestTime}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Preferred method:</span>
                <span className="text-sm text-gray-600 ml-2">{personalInfo.communicationPreferences.preferredMethod}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Response time:</span>
                <span className="text-sm text-gray-600 ml-2">{personalInfo.communicationPreferences.responseTime}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'history' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Relationship Timeline</CardTitle>
            <CardDescription>History of interactions and touchpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relationshipHistory.map((event, index) => (
                <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{event.date}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        event.mood === 'positive' ? 'bg-green-100 text-green-700' :
                        event.mood === 'professional' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {event.mood}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    {event.followUp && (
                      <p className="text-xs text-gray-500 italic">Follow-up: {event.followUp}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 p-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Interaction
            </button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'opportunities' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Relationship Opportunities</CardTitle>
            <CardDescription>Upcoming chances to strengthen your relationship</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingOpportunities.map((opportunity, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  opportunity.priority === 'high' ? 'border-red-400 bg-red-50' :
                  opportunity.priority === 'medium' ? 'border-yellow-400 bg-yellow-50' :
                  'border-green-400 bg-green-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{opportunity.date}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      opportunity.priority === 'high' ? 'bg-red-100 text-red-700' :
                      opportunity.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {opportunity.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{opportunity.description}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 p-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Opportunity
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
