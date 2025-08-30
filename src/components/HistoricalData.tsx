import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Target, AlertCircle } from 'lucide-react';
import { GlucoseReading, TimeRange } from '../types';

interface HistoricalDataProps {
  data: GlucoseReading[];
}

export const HistoricalData: React.FC<HistoricalDataProps> = ({ data }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');

  const getFilteredData = () => {
    const now = new Date();
    let hoursBack = 24;
    
    switch (timeRange) {
      case '7d':
        hoursBack = 24 * 7;
        break;
      case '30d':
        hoursBack = 24 * 30;
        break;
      case '90d':
        hoursBack = 24 * 90;
        break;
      default:
        hoursBack = 24;
    }
    
    const cutoff = new Date(now.getTime() - hoursBack * 60 * 60 * 1000);
    return data.filter(reading => reading.timestamp >= cutoff);
  };

  const filteredData = getFilteredData();

  const getTimeInRangeStats = () => {
    const total = filteredData.length;
    if (total === 0) return { inRange: 0, low: 0, high: 0 };

    const inRange = filteredData.filter(r => r.value >= 70 && r.value <= 180).length;
    const low = filteredData.filter(r => r.value < 70).length;
    const high = filteredData.filter(r => r.value > 180).length;

    return {
      inRange: Math.round((inRange / total) * 100),
      low: Math.round((low / total) * 100),
      high: Math.round((high / total) * 100)
    };
  };

  const getAverageGlucose = () => {
    if (filteredData.length === 0) return 0;
    const sum = filteredData.reduce((acc, reading) => acc + reading.value, 0);
    return Math.round(sum / filteredData.length);
  };

  const stats = getTimeInRangeStats();
  const avgGlucose = getAverageGlucose();

  // Create hourly aggregated data for chart
  const getChartData = () => {
    const hourlyData: { [key: string]: number[] } = {};
    
    filteredData.forEach(reading => {
      const hour = reading.timestamp.toISOString().slice(0, 13); // YYYY-MM-DDTHH
      if (!hourlyData[hour]) {
        hourlyData[hour] = [];
      }
      hourlyData[hour].push(reading.value);
    });

    return Object.entries(hourlyData).map(([hour, values]) => {
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      return {
        hour: new Date(hour + ':00:00').toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit'
        }),
        average: Math.round(avg),
        inRange: values.filter(v => v >= 70 && v <= 180).length,
        total: values.length
      };
    }).slice(-24); // Show last 24 data points
  };

  const chartData = getChartData();

  return (
    <div className="tidepool-card p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 rounded-xl">
            <Calendar className="h-6 w-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Historical Data</h2>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">
          {(['24h', '7d', '30d', '90d'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                timeRange === range
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-5 w-5 text-green-600" />
            <p className="text-sm font-semibold text-green-800">Time in Range</p>
          </div>
          <p className="text-3xl font-bold text-green-600 tracking-tight">{stats.inRange}%</p>
          <p className="text-xs font-medium text-green-700">70-180 mg/dL</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-semibold text-blue-800">Average Glucose</p>
          </div>
          <p className="text-3xl font-bold text-blue-600 tracking-tight">{avgGlucose}</p>
          <p className="text-xs font-medium text-blue-700">mg/dL</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm font-semibold text-red-800">Time Low</p>
          </div>
          <p className="text-3xl font-bold text-red-600 tracking-tight">{stats.low}%</p>
          <p className="text-xs font-medium text-red-700"><70 mg/dL</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <p className="text-sm font-semibold text-yellow-800">Time High</p>
          </div>
          <p className="text-3xl font-bold text-yellow-600 tracking-tight">{stats.high}%</p>
          <p className="text-xs font-medium text-yellow-700">>180 mg/dL</p>
        </div>
      </div>

      {/* Historical Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" />
            <XAxis 
              dataKey="hour" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={[0, 400]}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip 
              formatter={(value, name) => [
                `${value} mg/dL`,
                name === 'average' ? 'Average Glucose' : name
              ]}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Bar 
              dataKey="average" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
              name="average"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Insights */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <h4 className="font-bold text-gray-900 mb-3 text-lg">Insights for {timeRange}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium">
          <div>
            <p className="text-gray-700">
              <span className="font-medium">Target Achievement:</span> 
              {stats.inRange >= 70 ? ' ✅ Excellent glucose control' : 
               stats.inRange >= 50 ? ' ⚠️ Room for improvement' : 
               ' 🔴 Needs attention'}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-medium">Readings Analyzed:</span> {filteredData.length} data points
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};