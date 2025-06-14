
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Lock, Eye, EyeOff, Settings, Bell, Database, Users, Key, AlertTriangle, CheckCircle } from 'lucide-react';

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    dataEncryption: true,
    activityLogging: true,
    publicProfile: false,
    shareAnalytics: false,
    emailNotifications: true,
    pushNotifications: false,
    dataExportEnabled: true,
    autoLogout: true,
    sessionTimeout: 30,
  });

  const [permissions, setPermissions] = useState({
    linkedin: { read: true, write: false, contacts: true },
    instagram: { read: true, write: false, contacts: true },
    twitter: { read: true, write: false, contacts: true },
    facebook: { read: false, write: false, contacts: false },
    github: { read: false, write: false, contacts: false },
    slack: { read: false, write: false, contacts: false },
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePermissionChange = (platform: string, permission: string, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [platform]: { ...prev[platform], [permission]: value }
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Security Settings
          </CardTitle>
          <CardDescription>
            Manage your privacy preferences and security settings across all connected platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="privacy" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>

            <TabsContent value="privacy" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Privacy Controls
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Public Profile</h4>
                      <p className="text-sm text-gray-600">Allow others to view your profile information</p>
                    </div>
                    <Switch
                      checked={settings.publicProfile}
                      onCheckedChange={(checked) => handleSettingChange('publicProfile', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Share Analytics</h4>
                      <p className="text-sm text-gray-600">Share anonymous usage data to improve the service</p>
                    </div>
                    <Switch
                      checked={settings.shareAnalytics}
                      onCheckedChange={(checked) => handleSettingChange('shareAnalytics', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Activity Logging</h4>
                      <p className="text-sm text-gray-600">Log interactions and activities for insights</p>
                    </div>
                    <Switch
                      checked={settings.activityLogging}
                      onCheckedChange={(checked) => handleSettingChange('activityLogging', checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Privacy & Security</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      All platform integrations use secure OAuth authentication. We only access publicly available information and respect your privacy settings on each platform.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Security Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium flex items-center gap-2">
                        Two-Factor Authentication
                        {settings.twoFactorAuth && <CheckCircle className="w-4 h-4 text-green-600" />}
                      </h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Data Encryption</h4>
                      <p className="text-sm text-gray-600">Encrypt all stored data using AES-256</p>
                    </div>
                    <Switch
                      checked={settings.dataEncryption}
                      onCheckedChange={(checked) => handleSettingChange('dataEncryption', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Auto Logout</h4>
                      <p className="text-sm text-gray-600">Automatically logout after 30 minutes of inactivity</p>
                    </div>
                    <Switch
                      checked={settings.autoLogout}
                      onCheckedChange={(checked) => handleSettingChange('autoLogout', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Security Actions</h4>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      View Login History
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Platform Permissions
                </h3>

                <div className="space-y-4">
                  {Object.entries(permissions).map(([platform, perms]) => {
                    const platformInfo = {
                      linkedin: { name: 'LinkedIn', icon: '💼' },
                      instagram: { name: 'Instagram', icon: '📷' },
                      twitter: { name: 'Twitter', icon: '🐦' },
                      facebook: { name: 'Facebook', icon: '📘' },
                      github: { name: 'GitHub', icon: '⚡' },
                      slack: { name: 'Slack', icon: '💬' },
                    };

                    return (
                      <div key={platform} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{platformInfo[platform].icon}</span>
                          <h4 className="font-medium">{platformInfo[platform].name}</h4>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Read Access</span>
                            <Switch
                              checked={perms.read}
                              onCheckedChange={(checked) => handlePermissionChange(platform, 'read', checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Write Access</span>
                            <Switch
                              checked={perms.write}
                              onCheckedChange={(checked) => handlePermissionChange(platform, 'write', checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Contact Access</span>
                            <Switch
                              checked={perms.contacts}
                              onCheckedChange={(checked) => handlePermissionChange(platform, 'contacts', checked)}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data Management
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Enable Data Export</h4>
                      <p className="text-sm text-gray-600">Allow exporting your data in various formats</p>
                    </div>
                    <Switch
                      checked={settings.dataExportEnabled}
                      onCheckedChange={(checked) => handleSettingChange('dataExportEnabled', checked)}
                    />
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Data Retention Policy</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Specify how long to keep different types of data
                    </p>
                    <Textarea
                      placeholder="Define your data retention preferences..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Data Actions</h4>
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Export Data
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50">
                        <AlertTriangle className="w-4 h-4" />
                        Delete All Data
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export { PrivacySettings };
