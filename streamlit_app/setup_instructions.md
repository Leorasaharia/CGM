# Setup Instructions for Streamlit Cyber Threat Detection App

## 📋 Prerequisites

1. **Your Trained Model**: Ensure you have completed training your LightweightANN model
2. **Python Environment**: Python 3.8+ with pip installed
3. **Model Files**: Access to your training script output files

## 🔧 Step-by-Step Setup

### Step 1: Prepare Model Files

Add this code to the **END** of your training script (after model training is complete):

```python
import pickle

# Save the fitted StandardScaler
with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

# Save the fitted LabelEncoder  
with open('label_encoder.pkl', 'wb') as f:
    pickle.dump(le, f)

print("✅ Preprocessing objects saved!")
print("✅ Model weights already saved as 'best_model.pth'")
```

This will create three essential files:
- `best_model.pth` (already created during training)
- `scaler.pkl` (newly created)
- `label_encoder.pkl` (newly created)

### Step 2: Setup Streamlit Environment

```bash
# Create a new directory for the Streamlit app
mkdir streamlit_threat_detection
cd streamlit_threat_detection

# Create virtual environment
python -m venv streamlit_env

# Activate virtual environment
# On Windows:
streamlit_env\Scripts\activate
# On macOS/Linux:
source streamlit_env/bin/activate

# Install required packages
pip install streamlit pandas numpy torch scikit-learn plotly
```

### Step 3: Copy Files

Copy these files to your `streamlit_threat_detection` directory:
1. `cyber_threat_detection_app.py` (the Streamlit app)
2. `best_model.pth` (from your training directory)
3. `scaler.pkl` (from your training directory)
4. `label_encoder.pkl` (from your training directory)

Your directory structure should look like:
```
streamlit_threat_detection/
├── cyber_threat_detection_app.py
├── best_model.pth
├── scaler.pkl
├── label_encoder.pkl
└── streamlit_env/
```

### Step 4: Launch the Application

```bash
# Make sure you're in the correct directory and virtual environment is activated
streamlit run cyber_threat_detection_app.py
```

The app will automatically open in your browser at `http://localhost:8501`

## 🎯 Testing the Application

### Quick Test with Sample Data
1. **Select Sample**: Use the sidebar to choose "DDoS Attack" sample
2. **Load Data**: Click "🔍 Load Sample Data"
3. **Analyze**: Click "🔍 Analyze Network Traffic"
4. **Review Results**: Check the threat classification and confidence

### Manual Feature Input
1. **Expand Sections**: Open each feature category (Network Features, TCP Flags, etc.)
2. **Input Values**: Enter your network traffic feature values
3. **Analyze**: Click the analysis button
4. **Interpret**: Review the AI model's prediction and recommendations

## 🔍 Troubleshooting

### Model Files Not Found
**Error**: "Model files not found: [Errno 2] No such file or directory"
**Solution**: 
- Ensure all three files (`best_model.pth`, `scaler.pkl`, `label_encoder.pkl`) are in the same directory as the Streamlit app
- Re-run the preprocessing save code from Step 1

### Import Errors
**Error**: "ModuleNotFoundError: No module named 'torch'"
**Solution**:
- Ensure virtual environment is activated
- Install missing packages: `pip install torch streamlit pandas numpy scikit-learn plotly`

### Model Architecture Mismatch
**Error**: "RuntimeError: Error(s) in loading state_dict"
**Solution**:
- Verify the model architecture in the Streamlit app matches your training script
- Check that the number of input features (45) and output classes match

### Performance Issues
**Issue**: Slow loading or prediction
**Solution**:
- The app uses CPU by default - this is normal for the model size
- First prediction may be slower due to model loading (cached afterward)

## 🚀 Advanced Configuration

### Custom Threat Classes
If your model has different threat classes, update the `SAMPLE_DATA` dictionary and prediction logic in the app.

### Feature Modifications
If you used different features, update the `FEATURE_NAMES` list to match your training data.

### Styling Customization
Modify the CSS in the `st.markdown()` sections to match your branding preferences.

## 📊 Integration with Main Dashboard

The Streamlit app works alongside your React SecureGluco dashboard:

1. **Development Testing**: Use Streamlit for detailed model testing and validation
2. **Production Integration**: The React dashboard provides the real-time monitoring interface
3. **Demonstration**: Use Streamlit to showcase AI capabilities to stakeholders
4. **Model Validation**: Compare results between both interfaces for consistency

## 🎯 Success Indicators

You'll know the setup is successful when:
- ✅ App loads without errors
- ✅ Sample data loads correctly
- ✅ Model predictions return realistic confidence scores
- ✅ All visualizations render properly
- ✅ Security recommendations appear based on threat type

## 📞 Support

If you encounter issues:
1. Check that all file paths are correct
2. Verify virtual environment activation
3. Ensure all dependencies are installed
4. Review the console output for specific error messages

The app includes comprehensive error handling and will display helpful messages for common issues.

---

**Your AI threat detection model is now ready for professional demonstration and testing!**