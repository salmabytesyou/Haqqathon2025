
import React from 'react';
import { Settings } from 'lucide-react';

const PrivacyNotice = () => {
  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
      <div className="flex items-start gap-3">
        <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
        <div>
          <h4 className="font-medium text-blue-900">Privacy & Security</h4>
          <p className="text-sm text-blue-700 mt-1">
            All platform integrations use secure OAuth authentication. We only access publicly available information and respect your privacy settings on each platform.
          </p>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2">
            Learn more about data handling
          </button>
        </div>
      </div>
    </div>
  );
};

export { PrivacyNotice };
