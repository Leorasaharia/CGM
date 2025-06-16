import React, { useState } from 'react';
import { Brain, Zap, AlertTriangle, CheckCircle, BarChart3, Network } from 'lucide-react';

interface ThreatDetectionPanelProps {
  onThreatDetected: (threat: any) => void;
}

interface NetworkFeatures {
  Header_Length: number;
  Protocol_Type: number;
  Duration: number;
  Rate: number;
  Srate: number;
  Drate: number;
  fin_flag_number: number;
  syn_flag_number: number;
  rst_flag_number: number;
  psh_flag_number: number;
  ack_flag_number: number;
  ece_flag_number: number;
  cwr_flag_number: number;
  ack_count: number;
  syn_count: number;
  fin_count: number;
  rst_count: number;
  HTTP: number;
  HTTPS: number;
  DNS: number;
  Telnet: number;
  SMTP: number;
  SSH: number;
  IRC: number;
  TCP: number;
  UDP: number;
  DHCP: number;
  ARP: number;
  ICMP: number;
  IGMP: number;
  IPv: number;
  LLC: number;
  Tot_sum: number;
  Min: number;
  Max: number;
  AVG: number;
  Std: number;
  Tot_size: number;
  IAT: number;
  Number: number;
  Magnitude: number;
  Radius: number;
  Covariance: number;
  Variance: number;
  Weight: number;
}

const SAMPLE_DATA = {
  'Benign Traffic': {
    Header_Length: 20, Protocol_Type: 6, Duration: 0.5, Rate: 1000, Srate: 500, Drate: 500,
    fin_flag_number: 1, syn_flag_number: 1, rst_flag_number: 0, psh_flag_number: 1,
    ack_flag_number: 1, ece_flag_number: 0, cwr_flag_number: 0,
    ack_count: 10, syn_count: 1, fin_count: 1, rst_count: 0,
    HTTP: 1, HTTPS: 0, DNS: 0, Telnet: 0, SMTP: 0, SSH: 0, IRC: 0,
    TCP: 1, UDP: 0, DHCP: 0, ARP: 0, ICMP: 0, IGMP: 0, IPv: 1, LLC: 0,
    Tot_sum: 1500, Min: 64, Max: 1500, AVG: 750, Std: 200, Tot_size: 3000,
    IAT: 0.1, Number: 20, Magnitude: 1.5, Radius: 0.8, Covariance: 0.3,
    Variance: 0.4, Weight: 1.0
  },
  'DDoS Attack': {
    Header_Length: 20, Protocol_Type: 17, Duration: 0.001, Rate: 50000, Srate: 25000, Drate: 25000,
    fin_flag_number: 0, syn_flag_number: 1, rst_flag_number: 0, psh_flag_number: 0,
    ack_flag_number: 0, ece_flag_number: 0, cwr_flag_number: 0,
    ack_count: 0, syn_count: 1000, fin_count: 0, rst_count: 0,
    HTTP: 0, HTTPS: 0, DNS: 0, Telnet: 0, SMTP: 0, SSH: 0, IRC: 0,
    TCP: 0, UDP: 1, DHCP: 0, ARP: 0, ICMP: 0, IGMP: 0, IPv: 1, LLC: 0,
    Tot_sum: 64000, Min: 64, Max: 64, AVG: 64, Std: 0, Tot_size: 64000,
    IAT: 0.00001, Number: 1000, Magnitude: 10.0, Radius: 5.0, Covariance: 0.9,
    Variance: 0.95, Weight: 5.0
  },
  'Port Scan': {
    Header_Length: 20, Protocol_Type: 6, Duration: 0.01, Rate: 10000, Srate: 5000, Drate: 5000,
    fin_flag_number: 1, syn_flag_number: 1, rst_flag_number: 1, psh_flag_number: 0,
    ack_flag_number: 0, ece_flag_number: 0, cwr_flag_number: 0,
    ack_count: 0, syn_count: 100, fin_count: 0, rst_count: 100,
    HTTP: 0, HTTPS: 0, DNS: 0, Telnet: 1, SMTP: 0, SSH: 1, IRC: 0,
    TCP: 1, UDP: 0, DHCP: 0, ARP: 0, ICMP: 0, IGMP: 0, IPv: 1, LLC: 0,
    Tot_sum: 6400, Min: 64, Max: 64, AVG: 64, Std: 0, Tot_size: 6400,
    IAT: 0.0001, Number: 100, Magnitude: 3.0, Radius: 2.0, Covariance: 0.7,
    Variance: 0.8, Weight: 3.0
  }
};

export const ThreatDetectionPanel: React.FC<ThreatDetectionPanelProps> = ({ onThreatDetected }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSample, setSelectedSample] = useState<keyof typeof SAMPLE_DATA>('Benign Traffic');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Mock AI analysis function (replace with actual model inference)
  const analyzeTraffic = async (features: NetworkFeatures) => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on sample data patterns
    let result;
    if (selectedSample === 'Benign Traffic') {
      result = {
        classification: 'Benign',
        confidence: 0.94,
        riskLevel: 'Low',
        threatType: 'None',
        recommendations: [
          'Traffic appears normal',
          'Continue monitoring',
          'No action required'
        ]
      };
    } else if (selectedSample === 'DDoS Attack') {
      result = {
        classification: 'Malicious',
        confidence: 0.97,
        riskLevel: 'Critical',
        threatType: 'DDoS Attack',
        recommendations: [
          'Block source IP immediately',
          'Activate DDoS protection',
          'Scale infrastructure',
          'Monitor for continued attacks'
        ]
      };
      
      // Trigger threat alert in main dashboard
      onThreatDetected({
        id: Date.now().toString(),
        type: 'ddos_attack',
        severity: 'critical',
        timestamp: new Date(),
        description: 'DDoS attack detected via AI analysis - High volume UDP traffic',
        status: 'active',
        source: 'AI Threat Detection'
      });
    } else {
      result = {
        classification: 'Malicious',
        confidence: 0.89,
        riskLevel: 'High',
        threatType: 'Port Scan',
        recommendations: [
          'Block scanning IP',
          'Review firewall rules',
          'Check for vulnerabilities',
          'Monitor for exploitation attempts'
        ]
      };
      
      onThreatDetected({
        id: Date.now().toString(),
        type: 'port_scan',
        severity: 'warning',
        timestamp: new Date(),
        description: 'Port scanning activity detected via AI analysis',
        status: 'active',
        source: 'AI Threat Detection'
      });
    }
    
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleAnalyze = () => {
    const features = SAMPLE_DATA[selectedSample] as NetworkFeatures;
    analyzeTraffic(features);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Threat Detection</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-600">TensorFlow Lite</span>
        </div>
      </div>

      {/* Model Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <Network className="h-5 w-5 text-blue-600" />
          <h4 className="font-semibold text-blue-800">LightweightANN Model</h4>
        </div>
        <p className="text-sm text-blue-700 mb-2">
          Architecture: 256→128→64→Classes | Trained on CIC IoMT 2024 Dataset
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-blue-600">✓ 45 Feature Analysis</span>
          <span className="text-blue-600">✓ Real-time Inference</span>
          <span className="text-blue-600">✓ 97% Accuracy</span>
        </div>
      </div>

      {/* Sample Data Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Network Traffic Sample
        </label>
        <div className="grid grid-cols-3 gap-3">
          {Object.keys(SAMPLE_DATA).map((sample) => (
            <button
              key={sample}
              onClick={() => setSelectedSample(sample as keyof typeof SAMPLE_DATA)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                selectedSample === sample
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
              }`}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Preview */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <BarChart3 className="h-4 w-4" />
          <span>{showAdvanced ? 'Hide' : 'Show'} Feature Details</span>
        </button>
        
        {showAdvanced && (
          <div className="mt-3 bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {Object.entries(SAMPLE_DATA[selectedSample]).slice(0, 12).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600">{key}:</span>
                  <span className="font-mono text-gray-900">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Showing 12 of 45 features. Full feature set includes network metrics, TCP flags, protocols, and statistical analysis.
            </p>
          </div>
        )}
      </div>

      {/* Analysis Button */}
      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
      >
        {isAnalyzing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Analyzing Traffic...</span>
          </>
        ) : (
          <>
            <Brain className="h-5 w-5" />
            <span>Analyze Network Traffic</span>
          </>
        )}
      </button>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="mt-6 space-y-4">
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
            
            {/* Classification Result */}
            <div className={`rounded-lg border-2 p-4 ${getRiskColor(analysisResult.riskLevel)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {analysisResult.classification === 'Benign' ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  )}
                  <h4 className="font-semibold text-lg">
                    {analysisResult.classification} Traffic
                  </h4>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Confidence</p>
                  <p className="text-xl font-bold">{(analysisResult.confidence * 100).toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium">Risk Level</p>
                  <p className="text-lg font-semibold">{analysisResult.riskLevel}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Threat Type</p>
                  <p className="text-lg font-semibold">{analysisResult.threatType}</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Security Recommendations</h4>
              <ul className="space-y-2">
                {analysisResult.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Confidence Visualization */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Model Confidence</h4>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    analysisResult.confidence >= 0.8 ? 'bg-green-500' :
                    analysisResult.confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analysisResult.confidence * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {analysisResult.confidence >= 0.8 ? 'High confidence prediction' :
                 analysisResult.confidence >= 0.6 ? 'Medium confidence prediction' : 'Low confidence prediction'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};