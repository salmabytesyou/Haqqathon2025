
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PredictionResult } from './CancerDetectionDashboard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Zap } from 'lucide-react';

interface ModelInsightsProps {
  results: PredictionResult[];
}

const ModelInsights: React.FC<ModelInsightsProps> = ({ results }) => {
  // Prepare data for confidence distribution
  const confidenceData = [
    { range: '60-70%', count: results.filter(r => r.confidence >= 0.6 && r.confidence < 0.7).length },
    { range: '70-80%', count: results.filter(r => r.confidence >= 0.7 && r.confidence < 0.8).length },
    { range: '80-90%', count: results.filter(r => r.confidence >= 0.8 && r.confidence < 0.9).length },
    { range: '90-100%', count: results.filter(r => r.confidence >= 0.9).length },
  ];

  // Prepare data for prediction distribution
  const predictionData = [
    { name: 'Benign', value: results.filter(r => r.prediction === 'benign').length, color: '#10B981' },
    { name: 'Malignant', value: results.filter(r => r.prediction === 'malignant').length, color: '#EF4444' },
  ];

  // Calculate feature averages for malignant vs benign
  const featureAnalysis = ['radius_mean', 'texture_mean', 'perimeter_mean', 'area_mean', 'smoothness_mean'].map(feature => {
    const malignantAvg = results
      .filter(r => r.prediction === 'malignant')
      .reduce((sum, r) => sum + (r.features[feature] || 0), 0) / Math.max(1, results.filter(r => r.prediction === 'malignant').length);
    
    const benignAvg = results
      .filter(r => r.prediction === 'benign')
      .reduce((sum, r) => sum + (r.features[feature] || 0), 0) / Math.max(1, results.filter(r => r.prediction === 'benign').length);
    
    return {
      feature: feature.replace('_mean', '').replace('_', ' '),
      malignant: malignantAvg,
      benign: benignAvg,
    };
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Model Performance Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Key Metrics */}
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Accuracy</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {((results.reduce((sum, r) => sum + r.confidence, 0) / results.length) * 100).toFixed(1)}%
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Samples</span>
                </div>
                <div className="text-2xl font-bold text-purple-900">{results.length}</div>
              </div>
            </div>

            {/* Prediction Distribution */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Prediction Distribution</h4>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={predictionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {predictionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Confidence Distribution */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Confidence Distribution</h4>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={confidenceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Analysis: Malignant vs Benign</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureAnalysis} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="feature" />
              <YAxis />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  parseFloat(value).toFixed(2), 
                  name === 'malignant' ? 'Malignant Avg' : 'Benign Avg'
                ]}
              />
              <Bar dataKey="malignant" fill="#EF4444" name="malignant" />
              <Bar dataKey="benign" fill="#10B981" name="benign" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelInsights;
