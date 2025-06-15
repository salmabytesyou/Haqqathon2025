
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import { Integration } from './types';
import { IntegrationItem } from './IntegrationItem';

const PlatformIntegrations = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'google',
      name: 'Google Workspace',
      description: 'Calendar, Meet, To-Do, and Gmail integration',
      icon: 'https://developers.google.com/identity/images/g-logo.png',
      connected: false,
      lastSync: 'Never',
      contacts: 0,
      status: 'disconnected'
    },
    {
      id: 'microsoft',
      name: 'Microsoft 365',
      description: 'Outlook, Teams, Reminders, and Office integration',
      icon: 'https://img.icons8.com/fluency/48/microsoft.png',
      connected: false,
      lastSync: 'Never',
      contacts: 0,
      status: 'disconnected'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Messaging and communication tracking',
      icon: 'https://img.icons8.com/color/48/whatsapp--v1.png',
      connected: false,
      lastSync: 'Never',
      contacts: 0,
      status: 'disconnected'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Professional networking and career updates',
      icon: 'https://img.icons8.com/fluency/48/linkedin.png',
      connected: true,
      lastSync: '2 minutes ago',
      contacts: 847,
      status: 'active'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Personal photos and stories',
      icon: 'https://img.icons8.com/fluency/48/instagram-new.png',
      connected: true,
      lastSync: '5 minutes ago',
      contacts: 234,
      status: 'active'
    },
    {
      id: 'x',
      name: 'X',
      description: 'Real-time updates and conversations',
      icon: 'https://img.icons8.com/ios-filled/50/000000/x.png',
      connected: true,
      lastSync: '1 hour ago',
      contacts: 156,
      status: 'warning'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Social connections and events',
      icon: 'https://img.icons8.com/fluency/48/facebook-new.png',
      connected: false,
      lastSync: 'Never',
      contacts: 0,
      status: 'disconnected'
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Developer collaborations and projects',
      icon: 'https://img.icons8.com/fluency/48/github.png',
      connected: false,
      lastSync: 'Never',
      contacts: 0,
      status: 'disconnected'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communications and channels',
      icon: 'https://img.icons8.com/color/48/slack-new.png',
      connected: false,
      lastSync: 'Never',
      contacts: 0,
      status: 'disconnected'
    }
  ]);

  const handleConnect = (platformId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === platformId 
        ? { ...integration, connected: true, status: 'active', lastSync: 'Just now' }
        : integration
    ));
  };

  const handleDisconnect = (platformId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === platformId 
        ? { ...integration, connected: false, status: 'disconnected', lastSync: 'Never', contacts: 0 }
        : integration
    ));
  };

  const handleSync = (platformId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === platformId 
        ? { ...integration, lastSync: 'Just now', status: 'active' }
        : integration
    ));
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Platform Integrations
        </CardTitle>
        <CardDescription>
          Connect and manage your social and professional platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {integrations.map((integration) => (
            <IntegrationItem
              key={integration.id}
              integration={integration}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              onSync={handleSync}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { PlatformIntegrations };
