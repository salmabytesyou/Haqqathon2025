
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MessageCircle, Calendar } from 'lucide-react';
import { Contact, Interaction } from '@/pages/Index';

interface InteractionsProps {
  interactions: Interaction[];
  contacts: Contact[];
}

export const Interactions = ({ interactions, contacts }: InteractionsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const platforms = Array.from(new Set(interactions.map(i => i.platform)));

  const filteredInteractions = interactions.filter(interaction => {
    const contact = contacts.find(c => c.id === interaction.contactId);
    const matchesSearch = contact?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interaction.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = !selectedPlatform || interaction.platform === selectedPlatform;
    
    return matchesSearch && matchesPlatform;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Interactions</h2>
        <p className="text-gray-600 mt-2">Track all your communications across platforms</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search interactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedPlatform === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedPlatform(null)}
          >
            All Platforms
          </Badge>
          {platforms.map(platform => (
            <Badge
              key={platform}
              variant={selectedPlatform === platform ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedPlatform(platform)}
            >
              {platform}
            </Badge>
          ))}
        </div>
      </div>

      {/* Interactions List */}
      <div className="space-y-4">
        {filteredInteractions.map((interaction) => {
          const contact = contacts.find(c => c.id === interaction.contactId);
          return (
            <Card key={interaction.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                    interaction.isInbound ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {interaction.platform.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-lg">{contact?.name}</h3>
                        <Badge variant={interaction.isInbound ? "default" : "secondary"}>
                          {interaction.isInbound ? 'Inbound' : 'Outbound'}
                        </Badge>
                        <Badge variant="outline">{interaction.type}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {interaction.date}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{interaction.content}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{interaction.platform}</span>
                      <span>•</span>
                      <span>{contact?.company}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredInteractions.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No interactions found</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};
