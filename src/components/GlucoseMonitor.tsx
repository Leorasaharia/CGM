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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Droplets className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Glucose Monitor</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last reading</p>
          <p className="text-sm font-medium text-gray-900">
            {formatTime(currentReading.timestamp)}
          </p>
        </div>
      </div>

      {/* Current Reading Display */}
      <div className={`rounded-lg border-2 p-6 mb-6 ${getGlucoseBgColor(currentReading.value)}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Current Glucose</p>
            <div className="flex items-center space-x-3">
              <span className={`text-4xl font-bold ${getGlucoseColor(currentReading.value)}`}>
                {currentReading.value}
              </span>
              <span className="text-lg text-gray-500">mg/dL</span>
              {getTrendIcon(currentReading.trend)}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-600 mb-1">Status</p>
            <p className={`text-sm font-semibold ${getGlucoseColor(currentReading.value)}`}>
              {currentReading.value < 70 ? 'Low' : 
               currentReading.value > 180 ? 'High' : 'In Range'}
            </p>
          </div>
        </div>
      </div>

      {/* Glucose Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['dataMin - 20', 'dataMax + 20']}
              tick={{ fontSize: 12 }}
            />
            <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="5 5" label="Low" />
            <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="5 5" label="High" />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#2563eb" 
              strokeWidth={3}
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Range Indicators */}
      <div className="flex justify-between mt-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Critical (&lt;70, &gt;250)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-600">Caution (70-180, 180-250)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">In Range (70-180)</span>
        </div>
      </div>
    </div>
  );
};