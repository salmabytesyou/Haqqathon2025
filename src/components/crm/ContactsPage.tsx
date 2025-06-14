
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, Mail, Phone, Calendar, MapPin, Briefcase, Instagram, Linkedin, Twitter, MessageSquare, Search, Filter } from 'lucide-react';
import { ContactInteractions } from './ContactInteractions';

const ContactsPage = () => {
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const tags = [
    { id: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
    { id: 'family', label: 'Family', color: 'bg-red-100 text-red-700' },
    { id: 'friends', label: 'Friends', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'professional', label: 'Professional', color: 'bg-blue-100 text-blue-700' },
    { id: 'clients', label: 'Clients', color: 'bg-green-100 text-green-700' },
    { id: 'mentors', label: 'Mentors', color: 'bg-purple-100 text-purple-700' }
  ];

  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      profession: 'Product Manager at TechCorp',
      birthday: 'March 15',
      location: 'San Francisco, CA',
      tags: ['professional', 'clients'],
      avatar: '/placeholder.svg',
      socialMedia: [
        { platform: 'LinkedIn', active: true, handle: '@sarahjohnson' },
        { platform: 'Twitter', active: true, handle: '@sarah_j_pm' },
        { platform: 'Instagram', active: false, handle: '' }
      ]
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 987-6543',
      profession: 'Software Engineer at StartupXYZ',
      birthday: 'July 22',
      location: 'Seattle, WA',
      tags: ['friends', 'professional'],
      avatar: '/placeholder.svg',
      socialMedia: [
        { platform: 'LinkedIn', active: true, handle: '@mikechen' },
        { platform: 'Twitter', active: false, handle: '' },
        { platform: 'Instagram', active: true, handle: '@mike_codes' }
      ]
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily@design.com',
      phone: '+1 (555) 456-7890',
      profession: 'UI/UX Designer',
      birthday: 'November 8',
      location: 'Austin, TX',
      tags: ['professional', 'mentors'],
      avatar: '/placeholder.svg',
      socialMedia: [
        { platform: 'LinkedIn', active: true, handle: '@emilyrodriguez' },
        { platform: 'Twitter', active: true, handle: '@emily_designs' },
        { platform: 'Instagram', active: true, handle: '@emily.creative' }
      ]
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@consulting.com',
      phone: '+1 (555) 321-0987',
      profession: 'Business Consultant',
      birthday: 'February 14',
      location: 'New York, NY',
      tags: ['professional', 'mentors'],
      avatar: '/placeholder.svg',
      socialMedia: [
        { platform: 'LinkedIn', active: true, handle: '@davidkim' },
        { platform: 'Twitter', active: true, handle: '@david_consults' },
        { platform: 'Instagram', active: false, handle: '' }
      ]
    },
    {
      id: 5,
      name: 'Mom (Linda)',
      email: 'linda@home.com',
      phone: '+1 (555) 111-2222',
      profession: 'Teacher',
      birthday: 'June 12',
      location: 'Phoenix, AZ',
      tags: ['family'],
      avatar: '/placeholder.svg',
      socialMedia: [
        { platform: 'LinkedIn', active: false, handle: '' },
        { platform: 'Twitter', active: false, handle: '' },
        { platform: 'Instagram', active: true, handle: '@linda_photos' }
      ]
    },
    {
      id: 6,
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1 (555) 777-8888',
      profession: 'Travel Photographer',
      birthday: 'September 3',
      location: 'Los Angeles, CA',
      tags: ['friends'],
      avatar: '/placeholder.svg',
      socialMedia: [
        { platform: 'LinkedIn', active: false, handle: '' },
        { platform: 'Twitter', active: true, handle: '@james_travels' },
        { platform: 'Instagram', active: true, handle: '@jameswilsonphoto' }
      ]
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesTag = selectedTag === 'all' || contact.tags.includes(selectedTag);
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.profession.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'LinkedIn':
        return <Linkedin className="w-4 h-4" />;
      case 'Twitter':
        return <Twitter className="w-4 h-4" />;
      case 'Instagram':
        return <Instagram className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (selectedContact) {
    return <ContactInteractions contact={selectedContact} onBack={() => setSelectedContact(null)} />;
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="w-5 h-5" />
          All Contacts
        </CardTitle>
        <CardDescription>
          Manage your personal and professional relationships
        </CardDescription>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
              {/* Contact Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {contact.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.profession}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-1 mb-3">
                {contact.tags.map((tag) => {
                  const tagInfo = tags.find(t => t.id === tag);
                  return (
                    <span key={tag} className={`text-xs px-2 py-1 rounded-full ${tagInfo?.color}`}>
                      {tagInfo?.label}
                    </span>
                  );
                })}
              </div>

              {/* Contact Details */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Birthday: {contact.birthday}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{contact.location}</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Active on:</p>
                <div className="flex gap-2">
                  {contact.socialMedia
                    .filter(social => social.active)
                    .map((social) => (
                      <div key={social.platform} className="flex items-center gap-1 text-xs bg-white px-2 py-1 rounded border">
                        {getSocialIcon(social.platform)}
                        <span>{social.handle}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setSelectedContact(contact)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                View Interactions
              </button>
            </div>
          ))}
        </div>
        
        {filteredContacts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No contacts found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { ContactsPage };
