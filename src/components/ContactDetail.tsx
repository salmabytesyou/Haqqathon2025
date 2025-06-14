import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, Phone, Building2, Calendar, MessageCircle } from 'lucide-react';
import { Contact, Interaction } from '@/pages/Index';

interface ContactDetailProps {
  contact: Contact;
  interactions: Interaction[];
  onBack: () => void;
}

export const ContactDetail = ({ contact, interactions, onBack }: ContactDetailProps) => {
  const sortedInteractions = interactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Contacts
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-3xl mx-auto mb-4">
                {contact.name.charAt(0)}
              </div>
              <CardTitle className="text-2xl">{contact.name}</CardTitle>
              {contact.position && (
                <p className="text-gray-600">{contact.position}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {contact.company && (
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <span>{contact.company}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-sm">{contact.email}</span>
              </div>
              
              {contact.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{contact.phone}</span>
                </div>
              )}

              <div className="pt-4">
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {contact.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-2">Platforms</h4>
                <div className="flex space-x-2">
                  {contact.platforms.map(platform => (
                    <div key={platform} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {platform}
                    </div>
                  ))}
                </div>
              </div>

              {contact.notes && (
                <div className="pt-4">
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{contact.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Interaction Timeline */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Interaction Timeline ({interactions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sortedInteractions.length > 0 ? (
                <div className="space-y-4">
                  {sortedInteractions.map((interaction, index) => (
                    <div key={interaction.id} className="relative">
                      {index !== sortedInteractions.length - 1 && (
                        <div className="absolute left-4 top-8 w-0.5 h-full bg-gray-200" />
                      )}
                      <div className="flex space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                          interaction.isInbound ? 'bg-green-500' : 'bg-blue-500'
                        }`}>
                          {interaction.platform.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{interaction.platform}</span>
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
                          <p className="text-gray-700">{interaction.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No interactions recorded yet</p>
                  <p className="text-gray-400 text-sm mt-2">Interactions will appear here when synced from connected platforms</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
