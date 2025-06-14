import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { ContactsList } from '@/components/ContactsList';
import { ContactDetail } from '@/components/ContactDetail';
import { Interactions } from '@/components/Interactions';
import { Reminders } from '@/components/Reminders';
import { mockContacts, mockInteractions, mockReminders } from '@/data/mockData';

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  avatar?: string;
  tags: string[];
  platforms: string[];
  lastInteraction?: string;
  notes?: string;
};

export type Interaction = {
  id: string;
  contactId: string;
  platform: string;
  type: string;
  content: string;
  date: string;
  isInbound: boolean;
};

export type Reminder = {
  id: string;
  contactId: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
};

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [interactions, setInteractions] = useState<Interaction[]>(mockInteractions);
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);

  const handleContactSelect = (contactId: string) => {
    setSelectedContactId(contactId);
    setActiveView('contact-detail');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard contacts={contacts} interactions={interactions} reminders={reminders} />;
      case 'contacts':
        return <ContactsList contacts={contacts} onContactSelect={handleContactSelect} />;
      case 'contact-detail':
        const selectedContact = contacts.find(c => c.id === selectedContactId);
        const contactInteractions = interactions.filter(i => i.contactId === selectedContactId);
        return selectedContact ? (
          <ContactDetail 
            contact={selectedContact} 
            interactions={contactInteractions}
            onBack={() => setActiveView('contacts')}
          />
        ) : null;
      case 'interactions':
        return <Interactions interactions={interactions} contacts={contacts} />;
      case 'reminders':
        return <Reminders reminders={reminders} contacts={contacts} setReminders={setReminders} />;
      default:
        return <Dashboard contacts={contacts} interactions={interactions} reminders={reminders} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
