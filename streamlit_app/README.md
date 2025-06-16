# SecureGluco - Streamlit Cyber Threat Detection App

A professional Streamlit application for testing your trained LightweightANN cyber threat detection model.

## 🚀 Quick Start

### 1. Setup Environment
```bash
# Create virtual environment
python -m venv streamlit_env
source streamlit_env/bin/activate  # On Windows: streamlit_env\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Prepare Model Files
Place these files in the `streamlit_app/` directory:
- `best_model.pth` - Your trained model weights
- `scaler.pkl` - Fitted StandardScaler object
- `label_encoder.pkl` - Fitted LabelEncoder object

### 3. Generate Preprocessing Files
Add this code to the end of your training script:
```python
import pickle

# Save preprocessing objects
with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)
    
with open('label_encoder.pkl', 'wb') as f:
    pickle.dump(le, f)
    
print("✅ Preprocessing objects saved!")
```

### 4. Launch Application
```bash
streamlit run cyber_threat_detection_app.py
```

## 🎯 Features

### Professional Interface
- **Clean Design**: Modern, responsive UI with custom CSS styling
- **Organized Input**: 45 features grouped into logical categories
- **Real-time Analysis**: Instant threat classification with your trained model
- **Visual Results**: Interactive charts and confidence visualizations

### Feature Categories
1. **Network Features** (6): Header_Length, Protocol_Type, Duration, Rate, Srate, Drate
2. **TCP Flags** (7): fin, syn, rst, psh, ack, ece, cwr flag numbers
3. **Connection Counts** (4): ack_count, syn_count, fin_count, rst_count
4. **Protocol Types** (15): HTTP, HTTPS, DNS, SSH, TCP, UDP, etc.
5. **Statistical Features** (13): Tot_sum, Min, Max, AVG, Std, etc.

### Sample Data Testing
- **Benign Traffic**: Normal network communication patterns
- **DDoS Attack**: High-volume distributed denial of service
- **Port Scan**: Network reconnaissance activity
- **Malware Communication**: Suspicious encrypted traffic

### Analysis Results
- **Threat Classification**: Real-time model predictions
- **Confidence Scoring**: Model certainty measurement
- **Risk Assessment**: Color-coded threat levels
- **Security Recommendations**: Actionable response guidance
- **Probability Distribution**: Visual breakdown of all class probabilities

## 🛡️ Model Integration

### Architecture Support
- **LightweightANN**: 256→128→64→Classes neural network
- **PyTorch Framework**: Full compatibility with your training code
- **Memory Optimized**: Efficient inference for real-time analysis
- **Device Agnostic**: Automatic CPU/GPU detection

### Preprocessing Pipeline
- **StandardScaler**: Feature normalization using your fitted scaler
- **Label Encoding**: Threat class mapping with your label encoder
- **Feature Validation**: Input validation and error handling
- **Batch Processing**: Optimized for single and batch predictions

## 📊 Demo Mode

If model files are not available, the app runs in demo mode with:
- **Simulated Predictions**: Heuristic-based threat classification
- **Full UI Functionality**: Complete interface testing
- **Sample Data**: Pre-configured traffic patterns
- **Educational Value**: Understanding feature importance

## 🎨 Visual Features

### Interactive Charts
- **Confidence Gauge**: Real-time confidence visualization
- **Probability Bars**: Class probability distribution
- **Color Coding**: Intuitive threat level indication
- **Responsive Design**: Mobile and desktop optimized

### Professional Styling
- **Gradient Backgrounds**: Modern visual appeal
- **Custom CSS**: Consistent branding and styling
- **Smooth Animations**: Enhanced user experience
- **Clear Typography**: Excellent readability

## 🔧 Technical Details

### File Structure
```
streamlit_app/
├── cyber_threat_detection_app.py  # Main application
├── requirements.txt               # Dependencies
├── README.md                     # Documentation
├── best_model.pth               # Your trained model (add this)
├── scaler.pkl                   # Your fitted scaler (add this)
└── label_encoder.pkl            # Your label encoder (add this)
```

### Dependencies
- **Streamlit**: Web application framework
- **PyTorch**: Neural network inference
- **Pandas/NumPy**: Data manipulation
- **Plotly**: Interactive visualizations
- **Scikit-learn**: Preprocessing utilities

### Performance
- **Real-time Inference**: <100ms prediction time
- **Memory Efficient**: Optimized for production deployment
- **Error Handling**: Comprehensive exception management
- **Caching**: Streamlit resource caching for model loading

## 🚀 Deployment Options

### Local Development
```bash
streamlit run cyber_threat_detection_app.py
```

### Streamlit Cloud
1. Push to GitHub repository
2. Connect to Streamlit Cloud
3. Deploy with automatic updates

### Docker Deployment
```dockerfile
FROM python:3.9-slim
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 8501
CMD ["streamlit", "run", "cyber_threat_detection_app.py"]
```

## 🎯 Integration with SecureGluco Dashboard

This Streamlit app complements your React dashboard by providing:
- **Detailed Model Testing**: Comprehensive feature input interface
- **Model Validation**: Real-time testing with your trained model
- **Educational Tool**: Understanding AI threat detection capabilities
- **Demonstration Platform**: Professional showcase for stakeholders

## 📝 Usage Tips

1. **Start with Sample Data**: Use pre-configured samples for quick testing
2. **Understand Features**: Hover over inputs for detailed explanations
3. **Monitor Confidence**: High confidence (>80%) indicates reliable predictions
4. **Review Recommendations**: Follow security guidance for detected threats
5. **Test Edge Cases**: Try various feature combinations to understand model behavior

## 🔒 Security Considerations

- **Input Validation**: All features validated before model inference
- **Error Handling**: Graceful handling of invalid inputs
- **Model Security**: Secure loading and inference procedures
- **Data Privacy**: No data persistence or external transmission

---

**Ready to test your AI threat detection model with a professional interface!**