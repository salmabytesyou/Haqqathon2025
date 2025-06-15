
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tags, Edit, Plus, X, Save } from 'lucide-react';

interface TierConfig {
  description: string;
  color: string;
  priority: number;
  tags: string[];
}

interface TagTiersManagerProps {
  className?: string;
}

export const TagTiersManager = ({ className }: TagTiersManagerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [newTagForTier, setNewTagForTier] = useState('');
  const [tagTiers, setTagTiers] = useState<Record<string, TierConfig>>({
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
  });

  const addTagToTier = (tierName: string) => {
    if (newTagForTier.trim() && !tagTiers[tierName].tags.includes(newTagForTier.trim())) {
      setTagTiers(prev => ({
        ...prev,
        [tierName]: {
          ...prev[tierName],
          tags: [...prev[tierName].tags, newTagForTier.trim()]
        }
      }));
      setNewTagForTier('');
    }
  };

  const removeTagFromTier = (tierName: string, tagToRemove: string) => {
    setTagTiers(prev => ({
      ...prev,
      [tierName]: {
        ...prev[tierName],
        tags: prev[tierName].tags.filter(tag => tag !== tagToRemove)
      }
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, tierName: string) => {
    if (e.key === 'Enter') {
      addTagToTier(tierName);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tags className="w-5 h-5" />
            Tag Tiers
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
          >
            {isEditing ? <Save className="w-3 h-3" /> : <Edit className="w-3 h-3" />}
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </CardTitle>
        <CardDescription>
          Manage your tag organization system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(tagTiers)
            .sort(([, a], [, b]) => a.priority - b.priority)
            .map(([tierName, tierConfig]) => (
              <div key={tierName} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{tierName}</h4>
                  <Badge className={tierConfig.color}>Priority {tierConfig.priority}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{tierConfig.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {tierConfig.tags.map((tag, index) => (
                    <div key={index} className="relative">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${isEditing ? 'pr-6' : ''}`}
                      >
                        {tag}
                        {isEditing && (
                          <button
                            onClick={() => removeTagFromTier(tierName, tag)}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            <X className="w-2 h-2" />
                          </button>
                        )}
                      </Badge>
                    </div>
                  ))}
                </div>

                {isEditing && editingTier === tierName && (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={newTagForTier}
                      onChange={(e) => setNewTagForTier(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, tierName)}
                      placeholder="Add new tag..."
                      className="px-2 py-1 border border-gray-300 rounded text-sm flex-1"
                    />
                    <button
                      onClick={() => addTagToTier(tierName)}
                      className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {isEditing && editingTier !== tierName && (
                  <button
                    onClick={() => setEditingTier(tierName)}
                    className="text-blue-600 hover:text-blue-700 text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add tag to this tier
                  </button>
                )}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
