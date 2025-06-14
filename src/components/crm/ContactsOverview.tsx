import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreVertical, MessageSquare, Calendar, MapPin, Star, Phone, Mail } from 'lucide-react';

const ContactsOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [favoriteContacts, setFavoriteContacts] = useState(new Set([1, 3]));

  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Product Manager at Google',
      platform: 'LinkedIn',
      lastInteraction: '2 days ago',
      relationship: 'Professional',
      avatar: '/placeholder.svg',
      tags: ['Product', 'Tech', 'Mentor'],
      location: 'San Francisco, CA',
      engagementScore: 85,
      email: 'sarah.j@google.com',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      name: 'Mike Chen',
      title: 'Software Engineer',
      platform: 'Instagram',
      lastInteraction: '1 week ago',
      relationship: 'Friend',
      avatar: '/placeholder.svg',
      tags: ['Friend', 'Gaming', 'Tech'],
      location: 'Seattle, WA',
      engagementScore: 72,
      email: 'mike.chen@email.com',
      phone: '+1 (555) 234-5678'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Marketing Director',
      platform: 'Twitter',
      lastInteraction: '3 days ago',
      relationship: 'Professional',
      avatar: '/placeholder.svg',
      tags: ['Marketing', 'Startup', 'Networking'],
      location: 'Austin, TX',
      engagementScore: 91,
      email: 'emily.r@startup.com',
      phone: '+1 (555) 345-6789'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'UX Designer',
      platform: 'LinkedIn',
      lastInteraction: '5 days ago',
      relationship: 'Colleague',
      avatar: '/placeholder.svg',
      tags: ['Design', 'UX', 'Collaboration'],
      location: 'New York, NY',
      engagementScore: 78,
      email: 'david.kim@design.com',
      phone: '+1 (555) 456-7890'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Contacts' },
    { id: 'professional', label: 'Professional' },
    { id: 'personal', label: 'Personal' },
    { id: 'high-engagement', label: 'High Engagement' },
    { id: 'favorites', label: 'Favorites' },
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'professional') return matchesSearch && contact.relationship === 'Professional';
    if (selectedFilter === 'personal') return matchesSearch && contact.relationship === 'Friend';
    if (selectedFilter === 'high-engagement') return matchesSearch && contact.engagementScore > 80;
    if (selectedFilter === 'favorites') return matchesSearch && favoriteContacts.has(contact.id);
    
    return matchesSearch;
  });

  const toggleFavorite = (contactId) => {
    const newFavorites = new Set(favoriteContacts);
    if (newFavorites.has(contactId)) {
      newFavorites.delete(contactId);
    } else {
      newFavorites.add(contactId);
    }
    setFavoriteContacts(newFavorites);
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Contacts Overview
        </CardTitle>
        <CardDescription>
          Manage and track your relationships across all platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contacts List */}
        <div className="space-y-3">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <button
                        onClick={() => toggleFavorite(contact.id)}
                        className={`p-1 rounded-full transition-colors ${
                          favoriteContacts.has(contact.id)
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${favoriteContacts.has(contact.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">{contact.title}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{contact.platform}</span>
                      <span className="text-xs text-gray-500">Last: {contact.lastInteraction}</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{contact.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {contact.engagementScore}%
                    </div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 hover:bg-blue-100 rounded-md transition-colors group">
                      <Phone className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-green-100 rounded-md transition-colors group">
                      <Mail className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                    </button>
                    <button className="p-2 hover:bg-purple-100 rounded-md transition-colors group">
                      <MessageSquare className="w-4 h-4 text-gray-600 group-hover:text-purple-600" />
                    </button>
                    <button className="p-2 hover:bg-orange-100 rounded-md transition-colors group">
                      <Calendar className="w-4 h-4 text-gray-600 group-hover:text-orange-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex gap-2 mt-3">
                {contact.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { ContactsOverview };
