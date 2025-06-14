
export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  lastSync: string;
  contacts: number;
  status: 'active' | 'warning' | 'disconnected';
}
