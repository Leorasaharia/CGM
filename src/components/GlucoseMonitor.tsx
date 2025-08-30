import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Droplets } from 'lucide-react';
import { GlucoseReading } from '../types';
import { getGlucoseColor, getGlucoseBgColor, formatTime } from '../utils/glucoseUtils';

interface GlucoseMonitorProps {
  currentReading: GlucoseReading;
  data: GlucoseReading[];
}

export const GlucoseMonitor: React.FC<GlucoseMonitorProps> = ({ currentReading, data }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="h-5 w-5 text-red-500" />;
      case 'falling':
        return <TrendingDown className="h-5 w-5 text-blue-500" />;
      case 'stable':
        return <Minus className="h-5 w-5 text-gray-500" />;
      default:
        return <Minus className="h-5 w-5 text-gray-500" />;
    }
  };

  const chartData = data.map(reading => ({
    time: formatTime(reading.timestamp),
    value: reading.value,
    timestamp: reading.timestamp.getTime()
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-lg font-semibold text-blue-600">
            {payload[0].value} mg/dL
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="tidepool-card p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-xl">
            <Droplets className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Glucose Monitor</h2>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-600">Last reading</p>
          <p className="text-sm font-semibold text-gray-900">
            {formatTime(currentReading.timestamp)}
          </p>
        </div>
      </div>

      {/* Current Reading Display */}
      <div className={`rounded-2xl border-2 p-8 mb-8 ${getGlucoseBgColor(currentReading.value)} transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-gray-700 mb-2">Current Glucose</p>
            <div className="flex items-center space-x-3">
              <span className={`text-5xl font-bold ${getGlucoseColor(currentReading.value)} tracking-tight`}>
                {currentReading.value}
              </span>
              <span className="text-xl font-medium text-gray-600">mg/dL</span>
              {getTrendIcon(currentReading.trend)}
            </div>
          </div>
          <div className="text-right">
            <p className="text-base font-semibold text-gray-700 mb-2">Status</p>
            <p className={`text-lg font-bold ${getGlucoseColor(currentReading.value)}`}>
              {currentReading.value < 70 ? 'Low' : 
               currentReading.value > 180 ? 'High' : 'In Range'}
            </p>
          </div>
        </div>
      </div>

      {/* Glucose Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['dataMin - 20', 'dataMax + 20']}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={2} />
            <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={2} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={4}
              dot={{ fill: '#3b82f6', strokeWidth: 0, r: 5 }}
              activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 3, fill: '#ffffff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Range Indicators */}
      <div className="flex justify-between text-sm font-medium">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
          <span className="text-gray-700">Critical (<70, >250)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm"></div>
          <span className="text-gray-700">Caution (70-180, 180-250)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
          <span className="text-gray-700">In Range (70-180)</span>
        </div>
      </div>
    </div>
  );
};