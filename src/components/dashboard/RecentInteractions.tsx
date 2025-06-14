
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import { Contact, Interaction } from '@/pages/Index';

interface RecentInteractionsProps {
  contacts: Contact[];
  interactions: Interaction[];
}

export const RecentInteractions = ({ contacts, interactions }: RecentInteractionsProps) => {
  const recentInteractions = interactions.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Recent Interactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInteractions.map((interaction) => {
            const contact = contacts.find(c => c.id === interaction.contactId);
            return (
              <div key={interaction.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                  {contact?.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{contact?.name}</p>
                  <p className="text-sm text-gray-600">{interaction.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{interaction.platform} • {interaction.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
