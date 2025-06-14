
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, Folder } from 'lucide-react';
import Papa from 'papaparse';
import { useToast } from '@/hooks/use-toast';

interface FileUploadZoneProps {
  onDataUpload: (data: any[]) => void;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ onDataUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const processCSVFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => {
          console.log('CSV parsed:', results.data.length, 'rows from', file.name);
          if (results.data.length > 1) {
            resolve(results.data.slice(1)); // Skip header row
          } else {
            reject(new Error(`Empty or malformed CSV file: ${file.name}`));
          }
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
          reject(new Error(`Could not parse CSV file: ${file.name}`));
        },
        header: true,
      });
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setIsUploading(true);
    console.log('Processing files:', acceptedFiles.length);

    try {
      const csvFiles = acceptedFiles.filter(file => 
        file.type === 'text/csv' || file.name.endsWith('.csv')
      );

      if (csvFiles.length === 0) {
        toast({
          title: "No CSV Files Found",
          description: "Please upload CSV files or folders containing CSV files with your cancer dataset.",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }

      const allData: any[] = [];
      let processedFiles = 0;

      for (const file of csvFiles) {
        try {
          const fileData = await processCSVFile(file);
          allData.push(...fileData);
          processedFiles++;
        } catch (error) {
          console.error(`Error processing ${file.name}:`, error);
          // Continue processing other files even if one fails
        }
      }

      if (allData.length > 0) {
        onDataUpload(allData);
        toast({
          title: "Files Uploaded Successfully",
          description: `Successfully loaded ${allData.length} records from ${processedFiles} CSV file(s)`,
        });
      } else {
        toast({
          title: "No Valid Data Found",
          description: "No valid CSV data could be extracted from the uploaded files.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('File upload error:', error);
      toast({
        title: "Upload Error",
        description: "An error occurred while processing the files.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [onDataUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
    },
    multiple: true, // Allow multiple files
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input 
          {...getInputProps()} 
          {...({ webkitdirectory: "" } as any)}
          multiple 
        />
        {isUploading ? (
          <div className="space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600">Processing files...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-center space-x-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <Folder className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">
              {isDragActive
                ? 'Drop your CSV files or folders here...'
                : 'Drag & drop CSV files or folders here, or click to select'}
            </p>
            <p className="text-xs text-gray-500">
              Supports individual CSV files and folders containing CSV files
            </p>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <strong>Expected Format:</strong> CSV files with cancer dataset features like radius_mean, 
            texture_mean, perimeter_mean, area_mean, smoothness_mean, etc. Each row should represent 
            one sample for analysis. You can upload individual files or entire folders containing CSV files.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;
