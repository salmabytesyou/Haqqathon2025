import { useState, useCallback } from 'react';
import Tesseract from 'tesseract.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, Gift, Calendar as CalendarIcon, Users, Bell } from 'lucide-react';
import './PhotoUpload.css';

interface Reminder {
  id?: number;
  type: 'birthday' | 'meeting' | 'event' | 'reminder';
  contact: string;
  title: string;
  date: string;
  time: string;
  icon: any;
  color: string;
  urgent: boolean;
  category: string;
}

interface PhotoUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (reminders: Reminder[]) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ isOpen, onClose, onUpload }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formattedReminders, setFormattedReminders] = useState<Reminder[]>([]);
  const [isProcessingLLM, setIsProcessingLLM] = useState(false);

  const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'birthday':
        return Gift;
      case 'meeting':
        return Users;
      case 'event':
        return CalendarIcon;
      default:
        return Bell;
    }
  };

  const getColorForType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'birthday':
        return 'text-pink-600 bg-pink-50';
      case 'meeting':
        return 'text-blue-600 bg-blue-50';
      case 'event':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  // Helper to normalize date to 'MMM DD, 2025' if year is missing or in the past
  function normalizeDate(dateStr: string): string {
    // Handle 'Today' and 'Tomorrow'
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (/today/i.test(dateStr)) return 'Today';
    if (/tomorrow/i.test(dateStr)) return 'Tomorrow';

    // Try to parse date
    let date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      // Try parsing formats like '21 December' or 'December 21'
      const match = dateStr.match(/(\d{1,2})\s+([A-Za-z]+)/);
      if (match) {
        const day = match[1];
        const month = match[2];
        date = new Date(`2025-${month} ${day}`);
      }
    }
    // If year is missing or in the past, set to 2025
    if (isNaN(date.getTime()) || date.getFullYear() < 2025) {
      const parts = dateStr.match(/(\d{1,2})\s+([A-Za-z]+)/);
      if (parts) {
        const day = parts[1];
        const month = parts[2];
        return `${month.slice(0,1).toUpperCase() + month.slice(1,2).toLowerCase() + month.slice(2,3).toLowerCase()} ${day}, 2025`;
      }
      return 'Dec 21, 2025'; // fallback
    }
    // Format as 'MMM DD, YYYY'
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const processWithLLM = async (text: string) => {
    setIsProcessingLLM(true);
    try {
      const prompt = `Given the following text extracted from an image, extract reminder information and format it as a JSON array. Each reminder should have the following structure:\n\n{\n  "type": "birthday" | "meeting" | "event" | "reminder",\n  "contact": "string",\n  "title": "string",\n  "date": "string (in format 'Today', 'Tomorrow', or 'MMM DD, YYYY', e.g. 'Dec 21, 2025')",\n  "time": "string (in format 'HH:MM AM/PM' or empty string)",\n  "urgent": boolean,\n  "category": "family" | "friends" | "work" | "other"\n}\n\nRules:\n- If the year is not specified, always use 2025.\n- If the date is within the next 7 days, use 'Today' or 'Tomorrow'.\n- Otherwise, use 'MMM DD, 2025' (e.g., 'Dec 21, 2025').\n- If no time is specified, use an empty string.\n- For birthdays, set type to 'birthday' and category to 'family' or 'friends'.\n- For meetings, set type to 'meeting' and category to 'work'.\n- For events, set type to 'event' and category based on context.\n- For other reminders, set type to 'reminder' and category based on context.\n\nHere is the text:\n${text}\n\nRespond ONLY with the JSON array, nothing else.`;

      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistral',
          prompt: prompt,
          stream: false
        }),
      });

      const data = await response.json();
      let jsonResponse = [];
      try {
        jsonResponse = JSON.parse(data.response);
      } catch (e) {
        setFormattedReminders([]);
        setIsProcessingLLM(false);
        return;
      }

      // Normalize and fill missing fields
      const formattedReminders = jsonResponse.map((reminder: any) => {
        // Normalize date
        const normalizedDate = normalizeDate(reminder.date || '');
        // Add missing fields and defaults
        return {
          id: undefined,
          type: reminder.type || 'reminder',
          contact: reminder.contact || '',
          title: reminder.title || '',
          date: normalizedDate,
          time: reminder.time || '',
          urgent: typeof reminder.urgent === 'boolean' ? reminder.urgent : false,
          category: reminder.category || 'other',
          icon: getIconForType(reminder.type),
          color: getColorForType(reminder.type)
        };
      });
      setFormattedReminders(formattedReminders);
      onUpload(formattedReminders);
    } catch (error) {
      console.error('Error processing with LLM:', error);
      setFormattedReminders([]);
    }
    setIsProcessingLLM(false);
  };

  const processImage = async (imageUrl: string) => {
    setIsProcessing(true);
    setExtractedText('');
    setFormattedReminders([]);
    try {
      const result = await Tesseract.recognize(
        imageUrl,
        'eng',
        {
          logger: m => console.log(m)
        }
      );
      const text = result.data.text;
      setExtractedText(text);
      await processWithLLM(text);
    } catch (error) {
      console.error('Error processing image:', error);
      setExtractedText('Error processing image. Please try again.');
    }
    setIsProcessing(false);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setSelectedImage(imageUrl);
        processImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setSelectedImage(imageUrl);
        processImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleRemove = useCallback(() => {
    setSelectedImage(null);
    setExtractedText('');
    setFormattedReminders([]);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Reminders from Photo</DialogTitle>
          <DialogDescription>
            Upload a photo of your reminder or note. We'll extract the text and create reminders for you.
          </DialogDescription>
        </DialogHeader>
        
        <div
          className={`upload-area ${isDragging ? 'dragging' : ''} mt-4`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {selectedImage ? (
            <div className="preview-container">
              <img src={selectedImage} alt="Preview" className="preview-image" />
              <Button 
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="mt-2"
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="upload-prompt">
              <Upload className="w-10 h-10 text-gray-400 mb-4" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop your photo here</p>
              <p className="text-sm text-gray-500 mb-4">or</p>
              <label className="file-input-label">
                <Button variant="outline" size="sm">
                  Choose a file
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
        
        {isProcessing && (
          <div className="text-sm text-gray-500 mt-4">
            Processing image... Please wait
          </div>
        )}

        {isProcessingLLM && (
          <div className="text-sm text-gray-500 mt-4">
            Processing text with AI... Please wait
          </div>
        )}

        {extractedText && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Extracted Text:</h3>
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {extractedText}
            </div>
          </div>
        )}

        {formattedReminders.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Formatted Reminders:</h3>
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(formattedReminders, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PhotoUpload; 