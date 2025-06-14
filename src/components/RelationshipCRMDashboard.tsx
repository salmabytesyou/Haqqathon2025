
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, MessageSquare, TrendingUp, Settings, Bell, Search, Plus, Filter } from 'lucide-react';
import { ContactsOverview } from './crm/ContactsOverview';
import { InteractionTimeline } from './crm/InteractionTimeline';
import { EngagementSuggestions } from './crm/EngagementSuggestions';
import { PlatformIntegrations } from './crm/PlatformIntegrations';
import { RelationshipInsights } from './crm/RelationshipInsights';
import { UpcomingReminders } from './crm/UpcomingReminders';
import { EnhancedHeader } from './crm/EnhancedHeader';
import { QuickActions } from './crm/QuickActions';
import { InteractiveStats } from './crm/InteractiveStats';

const RelationshipCRMDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'interactions', label: 'Interactions', icon: MessageSquare },
    { id: 'suggestions', label: 'Suggestions', icon: Bell },
    { id: 'integrations', label: 'Platforms', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white shadow-lg h-screen sticky top-0`}>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">RelationCRM</h1>
                  <p className="text-xs text-gray-500">Relationship Manager</p>
                </div>
              )}
            </div>
            
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {sidebarOpen && <span className="font-medium">{tab.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <EnhancedHeader />
          
          <InteractiveStats />
          
          <QuickActions />

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              {activeTab === 'overview' && <ContactsOverview />}
              {activeTab === 'interactions' && <InteractionTimeline />}
              {activeTab === 'suggestions' && <EngagementSuggestions />}
              {activeTab === 'integrations' && <PlatformIntegrations />}
            </div>
            
            <div className="space-y-6">
              <UpcomingReminders />
              <RelationshipInsights />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipCRMDashboard;
