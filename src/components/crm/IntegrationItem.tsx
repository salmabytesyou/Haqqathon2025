
import React from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { Integration } from './types';
import { getStatusIcon, getStatusColor } from './StatusUtils';

interface IntegrationItemProps {
  integration: Integration;
  onConnect: (platformId: string) => void;
  onDisconnect: (platformId: string) => void;
  onSync: (platformId: string) => void;
}

const IntegrationItem = ({ integration, onConnect, onDisconnect, onSync }: IntegrationItemProps) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl">{integration.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              {integration.name}
              {getStatusIcon(integration.status)}
            </h3>
            <p className="text-sm text-gray-600">{integration.description}</p>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-xs text-gray-500">
                Last sync: {integration.lastSync}
              </span>
              {integration.connected && (
                <span className="text-xs text-gray-500">
                  {integration.contacts} contacts
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(integration.status)}`}>
            {integration.connected ? 'Connected' : 'Disconnected'}
          </span>
          
          {integration.connected ? (
            <div className="flex gap-1">
              <button 
                onClick={() => onSync(integration.id)}
                className="p-2 hover:bg-gray-100 rounded-md"
                title="Sync now"
              >
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                onClick={() => onDisconnect(integration.id)}
                className="px-3 py-1 text-sm border border-red-300 text-red-700 rounded hover:bg-red-50 transition-colors"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onConnect(integration.id)}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Connect
            </button>
          )}
        </div>
      </div>
      
      {integration.connected && integration.status === 'warning' && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Sync Issue:</strong> Unable to fetch latest data. Check your permissions and try again.
          </p>
        </div>
      )}
    </div>
  );
};

export { IntegrationItem };
