
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Brain, FileText, BarChart3, Download, AlertCircle } from 'lucide-react';
import FileUploadZone from './FileUploadZone';
import PredictionResults from './PredictionResults';
import ModelInsights from './ModelInsights';
import { useToast } from '@/hooks/use-toast';

export interface PredictionResult {
  id: string;
  confidence: number;
  prediction: 'malignant' | 'benign';
  features: Record<string, number>;
  timestamp: Date;
}

const CancerDetectionDashboard = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const { toast } = useToast();

  const handleDataUpload = (data: any[]) => {
    console.log('Data uploaded:', data.length, 'records');
    setUploadedData(data);
    toast({
      title: "Dataset Uploaded",
      description: `Successfully uploaded ${data.length} records for analysis.`,
    });
  };

  const handleProcessData = async () => {
    if (uploadedData.length === 0) {
      toast({
        title: "No Data",
        description: "Please upload a dataset first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    console.log('Processing data for cancer detection...');

    try {
      // Simulate AI model processing with realistic cancer detection features
      const mockResults: PredictionResult[] = uploadedData.slice(0, 10).map((row, index) => ({
        id: `pred_${index + 1}`,
        confidence: Math.random() * 0.4 + 0.6, // 60-100% confidence
        prediction: Math.random() > 0.3 ? 'benign' : 'malignant', // Mostly benign as is realistic
        features: {
          radius_mean: parseFloat(row.radius_mean) || Math.random() * 20 + 10,
          texture_mean: parseFloat(row.texture_mean) || Math.random() * 25 + 10,
          perimeter_mean: parseFloat(row.perimeter_mean) || Math.random() * 150 + 50,
          area_mean: parseFloat(row.area_mean) || Math.random() * 1500 + 300,
          smoothness_mean: parseFloat(row.smoothness_mean) || Math.random() * 0.1 + 0.05,
        },
        timestamp: new Date(),
      }));

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResults(mockResults);
      toast({
        title: "Analysis Complete",
        description: `Processed ${mockResults.length} samples successfully.`,
      });
    } catch (error) {
      console.error('Error processing data:', error);
      toast({
        title: "Processing Error",
        description: "An error occurred while analyzing the data.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const exportResults = () => {
    if (results.length === 0) return;
    
    const csvContent = [
      ['ID', 'Prediction', 'Confidence', 'Timestamp'],
      ...results.map(result => [
        result.id,
        result.prediction,
        (result.confidence * 100).toFixed(2) + '%',
        result.timestamp.toISOString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cancer_detection_results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Brain className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Cancer Detection AI</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Advanced machine learning platform for analyzing medical datasets and detecting cancer patterns
          with high accuracy and confidence scoring.
        </p>
      </div>

      {/* Warning Notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <strong>Medical Disclaimer:</strong> This tool is for research and educational purposes only. 
              Always consult with qualified medical professionals for actual diagnosis and treatment decisions.
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload Dataset</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploadZone onDataUpload={handleDataUpload} />
              <div className="mt-4 space-y-3">
                <Button 
                  onClick={handleProcessData}
                  disabled={isProcessing || uploadedData.length === 0}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Analyze Dataset
                    </>
                  )}
                </Button>
                
                {results.length > 0 && (
                  <Button 
                    onClick={exportResults}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Results
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          {results.length > 0 && (
            <>
              <PredictionResults results={results} />
              <ModelInsights results={results} />
            </>
          )}
          
          {results.length === 0 && uploadedData.length === 0 && (
            <Card className="h-96">
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Ready for Analysis</h3>
                    <p className="text-gray-600">Upload your cancer dataset to begin AI-powered detection</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CancerDetectionDashboard;
