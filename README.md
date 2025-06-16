# SecureGluco Dashboard - Integrated Cyber Threat Detection

A comprehensive diabetes management dashboard with integrated AI-powered cybersecurity threat detection capabilities.

## 🎯 Features

### Main Dashboard
- **Real-time Glucose Monitoring** with CGM data visualization and trend analysis
- **Insulin Pump Control Panel** with security controls and emergency suspension
- **Security Threat Detection** with ML-powered analysis and real-time alerts
- **Historical Data Analysis** with comprehensive trend visualization
- **Alert Management System** with real-time notifications and dismissal
- **3D Intro Animation** featuring detailed BioMEMS chip visualization

### AI Threat Detection Module
- **Integrated Neural Network Analysis** using LightweightANN model (256→128→64→classes)
- **45-Feature Network Traffic Analysis** across 5 categories:
  - Network Features (Header_Length, Protocol Type, Duration, Rate, etc.)
  - TCP Flags (fin, syn, rst, psh, ack, ece, cwr)
  - Connection Counts (ack_count, syn_count, fin_count, rst_count)
  - Protocols (HTTP, HTTPS, DNS, SSH, TCP, UDP, etc.)
  - Statistical Features (Tot sum, Min, Max, AVG, Std, etc.)
- **Real-time Threat Classification** with confidence scoring
- **Sample Data Testing** for Benign Traffic, DDoS Attacks, and Port Scans
- **Visual Risk Assessment** with color-coded alerts and recommendations
- **Seamless Dashboard Integration** with automatic threat reporting

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── IntroAnimation.tsx          # 3D BioMEMS chip intro
│   ├── Header.tsx                  # Main navigation header
│   ├── GlucoseMonitor.tsx          # Real-time glucose visualization
│   ├── InsulinPump.tsx             # Pump control and status
│   ├── SecurityDashboard.tsx       # Security threat monitoring
│   ├── HistoricalData.tsx          # Historical analysis
│   ├── AlertPanel.tsx              # Alert management
│   └── ThreatDetectionPanel.tsx    # AI threat detection interface
├── utils/
│   ├── mockData.ts                 # Sample data generation
│   └── glucoseUtils.ts             # Utility functions
├── types/
│   └── index.ts                    # TypeScript definitions
└── App.tsx                         # Main application component
```

## 🛡️ AI Threat Detection

### Model Architecture
- **LightweightANN**: 256→128→64→Classes neural network
- **Training Dataset**: CIC IoMT 2024 Dataset
- **Accuracy**: 97% on test data
- **Inference**: Real-time on-device processing

### Threat Categories
- **Benign Traffic**: Normal network communication patterns
- **DDoS Attacks**: Distributed denial of service patterns
- **Port Scanning**: Network reconnaissance activities
- **Custom Threats**: Extensible for additional threat types

### Analysis Features
- **Real-time Classification**: Instant threat assessment
- **Confidence Scoring**: Model certainty measurement
- **Risk Level Assessment**: Critical/High/Medium/Low categorization
- **Security Recommendations**: Actionable response guidance
- **Dashboard Integration**: Automatic alert generation

## 🎨 Design Features

### Visual Design
- **Apple-level Aesthetics**: Clean, sophisticated interface design
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Color-coded Alerts**: Intuitive visual feedback system
- **Smooth Animations**: Engaging micro-interactions and transitions
- **Professional Typography**: Clear hierarchy and readability

### User Experience
- **Intuitive Navigation**: Easy access to all features
- **Real-time Updates**: Live data streaming and notifications
- **Interactive Charts**: Detailed data visualization with Recharts
- **Sample Data Testing**: Quick demonstration capabilities
- **Emergency Controls**: Immediate threat response options

## 🔧 Technology Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive styling
- **Recharts** for data visualization
- **Lucide React** for consistent iconography

### AI Integration
- **Mock Neural Network** simulation (ready for TensorFlow.js integration)
- **Feature Engineering** with 45-parameter analysis
- **Real-time Inference** with confidence scoring
- **Threat Classification** with actionable recommendations

## 📊 Demo Workflow

### 1. Dashboard Overview
- Launch the application to see the 3D intro animation
- Navigate through glucose monitoring, insulin pump control, and security features
- Monitor real-time alerts and notifications

### 2. AI Threat Detection
- Access the integrated threat detection panel
- Select from sample traffic patterns (Benign, DDoS, Port Scan)
- Click "Analyze Network Traffic" to run AI analysis
- Review threat classification, confidence scores, and security recommendations
- Observe automatic integration with the main security dashboard

### 3. Security Response
- Monitor detected threats in the Security Dashboard
- Use emergency controls to suspend insulin delivery if needed
- Review historical threat patterns and system performance
- Manage alerts through the comprehensive notification system

## 🔒 Security Integration

### Threat Detection Pipeline
1. **Network Traffic Analysis**: 45-feature extraction and preprocessing
2. **AI Model Inference**: LightweightANN classification with confidence scoring
3. **Risk Assessment**: Automated threat level determination
4. **Alert Generation**: Real-time notification system integration
5. **Response Coordination**: Actionable security recommendations

### Medical Device Security
- **Insulin Pump Protection**: Emergency suspension capabilities
- **Communication Security**: Bluetooth and WiFi monitoring
- **Command Validation**: Unauthorized access prevention
- **Real-time Monitoring**: Continuous threat assessment

## 🎯 Key Innovations

### Integrated Healthcare Security
- **Dual-Purpose Dashboard**: Medical monitoring + cybersecurity
- **AI-Powered Detection**: Machine learning threat identification
- **Real-time Response**: Immediate threat mitigation capabilities
- **User-Friendly Interface**: Complex security made accessible

### Advanced Visualization
- **3D Intro Animation**: Detailed BioMEMS chip representation
- **Interactive Charts**: Real-time data streaming visualization
- **Color-coded Alerts**: Intuitive threat level communication
- **Responsive Design**: Consistent experience across devices

## 🚀 Future Enhancements

- **TensorFlow.js Integration**: Replace mock AI with actual model inference
- **Extended Threat Types**: Additional attack pattern recognition
- **Historical Analysis**: Long-term threat pattern identification
- **Mobile Application**: Native iOS/Android companion apps
- **Cloud Integration**: Centralized threat intelligence sharing

## 📝 License

This project is for educational and demonstration purposes, showcasing the integration of medical device monitoring with AI-powered cybersecurity threat detection.

---

**SecureGluco Dashboard** - Protecting Your Health with Advanced BioMEMS Technology and AI Security