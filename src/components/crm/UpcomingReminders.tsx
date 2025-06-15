
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bell, Plus, Edit, Camera } from 'lucide-react';
import { ReminderCategory } from './reminder-types';
import { ReminderColumn } from './ReminderColumn';
import { ReminderItem } from './ReminderItem';
import { sampleReminders, categoryConfig } from './reminder-data';

interface UpcomingRemindersProps {
  showAsMainTab?: boolean;
}

const UpcomingReminders = ({ showAsMainTab = false }: UpcomingRemindersProps) => {
  const [tier1Category, setTier1Category] = useState<ReminderCategory>('family');
  const [tier2Category, setTier2Category] = useState<ReminderCategory>('friends');
  const [tier3Category, setTier3Category] = useState<ReminderCategory>('colleagues');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleManualEntry = () => {
    setDialogOpen(false);
    console.log('Manual entry selected');
    // Here you would typically open a form for manual entry
    alert('Manual entry form would open here.');
  };

  const handleImageUpload = () => {
    setDialogOpen(false);
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Use camera if available
    
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Image captured:', file.name);
        // Here you would typically process the image for text extraction
        alert('Image captured! Text processing would happen here.');
      }
    };
    
    // Trigger the file input
    input.click();
  };

  if (showAsMainTab) {
    return (
      <div className="w-full max-w-full">
        <Card className="bg-white w-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Reminders
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Add Reminder
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Reminder</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-4">
                    <Button
                      onClick={handleManualEntry}
                      className="flex items-center gap-2 justify-start p-4 h-auto"
                      variant="outline"
                    >
                      <Edit className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Manual Entry</div>
                        <div className="text-sm text-gray-500">Create a reminder by typing details</div>
                      </div>
                    </Button>
                    <Button
                      onClick={handleImageUpload}
                      className="flex items-center gap-2 justify-start p-4 h-auto"
                      variant="outline"
                    >
                      <Camera className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Upload Image</div>
                        <div className="text-sm text-gray-500">Extract reminder from image or document</div>
                      </div>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
            <CardDescription>
              Organize your reminders by priority tiers
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-6 w-full">
              <ReminderColumn
                tierNumber={1}
                category={tier1Category}
                setCategory={setTier1Category}
                reminders={sampleReminders}
                categoryConfig={categoryConfig}
              />
              <ReminderColumn
                tierNumber={2}
                category={tier2Category}
                setCategory={setTier2Category}
                reminders={sampleReminders}
                categoryConfig={categoryConfig}
              />
              <ReminderColumn
                tierNumber={3}
                category={tier3Category}
                setCategory={setTier3Category}
                reminders={sampleReminders}
                categoryConfig={categoryConfig}
              />
            </div>
            
            <button className="w-full mt-6 text-sm text-blue-600 hover:text-blue-800 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors">
              View All Reminders
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sidebar version - compact layout (no add button)
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Upcoming Reminders
        </CardTitle>
        <CardDescription>
          Don't miss important dates and follow-ups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sampleReminders.slice(0, 4).map((reminder) => (
            <ReminderItem key={reminder.id} reminder={reminder} compact={true} />
          ))}
        </div>
        
        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Reminders
        </button>
      </CardContent>
    </Card>
  );
};

export { UpcomingReminders };
