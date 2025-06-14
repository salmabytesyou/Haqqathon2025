
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PredictionResult } from './CancerDetectionDashboard';
import { AlertTriangle, CheckCircle, Brain } from 'lucide-react';

interface PredictionResultsProps {
  results: PredictionResult[];
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ results }) => {
  const malignantCount = results.filter(r => r.prediction === 'malignant').length;
  const benignCount = results.filter(r => r.prediction === 'benign').length;
  const avgConfidence = results.reduce((sum, r) => sum + r.confidence, 0) / results.length;

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-800">{benignCount}</div>
                <div className="text-sm text-green-600">Benign Cases</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-800">{malignantCount}</div>
                <div className="text-sm text-red-600">Malignant Cases</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-800">
                  {(avgConfidence * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-blue-600">Avg Confidence</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {results.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-900">
                    {result.id}
                  </div>
                  <Badge
                    variant={result.prediction === 'malignant' ? 'destructive' : 'secondary'}
                    className={
                      result.prediction === 'malignant'
                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }
                  >
                    {result.prediction === 'malignant' ? (
                      <AlertTriangle className="w-3 h-3 mr-1" />
                    ) : (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    )}
                    {result.prediction.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {(result.confidence * 100).toFixed(1)}% confidence
                  </div>
                  <div className="text-xs text-gray-500">
                    {result.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResults;
