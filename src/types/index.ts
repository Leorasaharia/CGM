export interface GlucoseReading {
  timestamp: Date;
  value: number; // mg/dL
  trend: 'rising' | 'stable' | 'falling';
}

export interface InsulinPumpStatus {
  batteryLevel: number;
  activeInsulin: number;
  reservoirLevel: number;
  connectionStatus: 'connected' | 'disconnected' | 'weak';
  lastSync: Date;
  isDelivering: boolean;
}

export interface SecurityThreat {
  id: string;
  type: 'replay_attack' | 'unauthorized_bolus' | 'bluetooth_spoofing' | 'wifi_interception' | 'device_manipulation' | 'ddos_attack' | 'port_scan';
  severity: 'critical' | 'warning' | 'info';
  timestamp: Date;
  description: string;
  status: 'active' | 'blocked' | 'resolved';
  source?: string;
}

export interface Alert {
  id: string;
  type: 'glucose' | 'security' | 'device' | 'ai_threat';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  dismissed: boolean;
}

export interface ThreatAnalysis {
  classification: 'Benign' | 'Malicious';
  confidence: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  threatType: string;
  recommendations: string[];
}

export type TimeRange = '24h' | '7d' | '30d' | '90d';