
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Contact } from '@/pages/Index';

interface KeyContactsProps {
  contacts: Contact[];
}

export const KeyContacts = ({ contacts }: KeyContactsProps) => {
  const keyTags = ['family', 'work'];
  const keyContacts = contacts.filter(contact => 
    contact.tags.some(tag => keyTags.includes(tag))
  ).slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Key Contacts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {keyContacts.map((contact) => (
            <div key={contact.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-medium">
                {contact.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.company}</p>
                <div className="flex space-x-1 mt-1">
                  {contact.tags.filter(tag => keyTags.includes(tag)).slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
