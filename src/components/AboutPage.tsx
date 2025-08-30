@@ .. @@
   return (
-    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
+    <div className="min-h-screen" style={{ backgroundColor: '#fafbfc' }}>
       {/* Header */}
-      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
+      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
-          <div className="flex justify-between items-center h-16">
+          <div className="flex justify-between items-center h-20">
             <div className="flex items-center space-x-3">
               <div className="flex items-center space-x-2">
-                <Shield className="h-8 w-8 text-blue-600" />
-                <Activity className="h-8 w-8 text-green-600" />
+                <div className="p-2 bg-blue-50 rounded-xl">
+                  <Shield className="h-6 w-6 text-blue-600" />
+                </div>
+                <div className="p-2 bg-green-50 rounded-xl">
+                  <Activity className="h-6 w-6 text-green-600" />
+                </div>
               </div>
               <div>
-                <h1 className="text-xl font-bold text-gray-900">SecureGluco</h1>
-                <p className="text-sm text-gray-500">About</p>
+                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">SecureGluco</h1>
+                <p className="text-sm font-medium text-gray-600">About</p>
               </div>
             </div>
             <button
               onClick={onBackToLogin}
-              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
+              className="tidepool-button-primary"
             >
               Back to Login
             </button>
           </div>
         </div>
       </header>

       {/* Hero Section */}
-      <section className="py-20">
+      <section className="py-24">
         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
-          <h1 className="text-5xl font-bold text-gray-900 mb-6">
+          <h1 className="text-6xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
             Secure Diabetes Management
           </h1>
-          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
+          <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
             Advanced BioMEMS technology combined with AI-powered cybersecurity 
             to protect your health data and ensure safe insulin delivery.
           </p>
-          <div className="flex justify-center space-x-4">
+          <div className="flex justify-center space-x-6">
             <button
               onClick={onBackToLogin}
-              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
+              className="tidepool-button-primary text-lg px-10 py-4"
             >
               Get Started
             </button>
-            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
+            <button className="tidepool-button-secondary text-lg px-10 py-4">
               Learn More
             </button>
           </div>
         </div>
       </section>

       {/* Features Section */}
-      <section className="py-16 bg-white">
+      <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
-          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
+          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 tracking-tight">
             Comprehensive Health Protection
           </h2>
-          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
+          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {/* Glucose Monitoring */}
-            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
+            <div className="tidepool-card p-8 hover:shadow-lg transition-all duration-300">
               <div className="flex items-center space-x-3 mb-4">
-                <Droplets className="h-8 w-8 text-blue-600" />
-                <h3 className="text-xl font-semibold text-gray-900">Real-time Monitoring</h3>
+                <div className="p-3 bg-blue-50 rounded-xl">
+                  <Droplets className="h-8 w-8 text-blue-600" />
+                </div>
+                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Real-time Monitoring</h3>
               </div>
-              <p className="text-gray-600 mb-4">
+              <p className="text-gray-700 mb-6 font-medium leading-relaxed">
                 Continuous glucose monitoring with advanced BioMEMS sensors providing 
                 accurate readings every 5 minutes.
               </p>
               <ul className="space-y-2 text-sm text-gray-600">
                 <li className="flex items-center space-x-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
-                  <span>24/7 continuous monitoring</span>
+                  <span className="font-medium">24/7 continuous monitoring</span>
                 </li>
                 <li className="flex items-center space-x-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
-                  <span>Trend analysis and alerts</span>
+                  <span className="font-medium">Trend analysis and alerts</span>
                 </li>
                 <li className="flex items-center space-x-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
-                  <span>Historical data insights</span>
+                  <span className="font-medium">Historical data insights</span>
                 </li>
               </ul>
             </div>

             {/* Security Protection */}
-            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
+            <div className="tidepool-card p-8 hover:shadow-lg transition-all duration-300">
               <div className="flex items-center space-x-3 mb-4">
-                <Shield className="h-8 w-8 text-red-600" />
-                <h3 className="text-xl font-semibold text-gray-900">Cybersecurity Shield</h3>
+                <div className="p-3 bg-red-50 rounded-xl">
+                  <Shield className="h-8 w-8 text-red-600" />
+                </div>
+                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Cybersecurity Shield</h3>
               </div>
-              <p className="text-gray-600 mb-4">
+              <p className="text-gray-700 mb-6 font-medium leading-relaxed">
                 Advanced threat detection protecting your medical devices from 
                 cyber attacks and unauthorized access.
               </p>
               <ul className="space-y-2 text-sm text-gray-600">
                 <li className="flex items-center space-x-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
-                  <span>Real-time threat detection</span>
+                  <span className="font-medium">Real-time threat detection</span>
                 </li>
                 <li className="flex items-center space-x-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
-                  <span>Encrypted communications</span>
+                  <span className="font-medium">Encrypted communications</span>
                 </li>
                 <li className="flex items-center space-x-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
-                  <span>Emergency response system</span>
+                  <span className="font-medium">Emergency response system</span>
                 </li>
               </ul>
             </div>

             {/* AI Technology */}
-            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
+            <div className="tidepool-card p-8 hover:shadow-lg transition-all duration-300">
               <div className="flex items-center space-x-3 mb-4">
-                <Brain className="h-8 w-8 text-purple-600" />
-                <h3 className="text-xl font-semibold text-gray-900">AI Intelligence</h3>
+                <div className="p-3 bg-purple-50 rounded-xl">
+                  <Brain className="h-8 w-8 text-purple-600" />
+                </div>
+                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">AI Intelligence</h3>
               </div>
-              <p className="text-gray-600 mb-4">
+              <p className="text-gray-700 mb-6 font-medium leading-relaxed">
                 Machine learning algorithms analyze network traffic patterns 
                 to identify and prevent security threats in real-time.
               </p>
               <ul className="space-y-2 text-sm text-gray-600">
                 <li className="flex items-center space-x-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
-                  <span>Neural network analysis</span>
+                  <span className="font-medium">Neural network analysis</span>
                 </li>
                 <li className="flex items-center space-x-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
-                  <span>45-feature threat detection</span>
+                  <span className="font-medium">45-feature threat detection</span>
                 </li>
                 <li className="flex items-center space-x-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
-                  <span>97% accuracy rate</span>
+                  <span className="font-medium">97% accuracy rate</span>
                 </li>
               </ul>
             </div>
           </div>
         </div>
       </section>

       {/* Technology Section */}
-      <section className="py-16">
+      <section className="py-20" style={{ backgroundColor: '#fafbfc' }}>
         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
-          <h2 className="text-3xl font-bold text-gray-900 mb-8">
+          <h2 className="text-4xl font-bold text-gray-900 mb-12 tracking-tight">
             Advanced BioMEMS Technology
           </h2>
-          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
-            <p className="text-lg text-gray-600 mb-6">
+          <div className="tidepool-card p-12">
+            <p className="text-xl text-gray-700 mb-8 font-medium leading-relaxed">
               Our LightweightANN neural network processes 45 distinct network features 
               to provide comprehensive threat detection for medical IoT devices.
             </p>
-            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
+            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               <div>
-                <div className="text-2xl font-bold text-blue-600 mb-2">256→128→64</div>
-                <div className="text-sm text-gray-600">Neural Architecture</div>
+                <div className="text-3xl font-bold text-blue-600 mb-2 tracking-tight">256→128→64</div>
+                <div className="text-sm font-semibold text-gray-700">Neural Architecture</div>
               </div>
               <div>
-                <div className="text-2xl font-bold text-green-600 mb-2">45</div>
-                <div className="text-sm text-gray-600">Feature Analysis</div>
+                <div className="text-3xl font-bold text-green-600 mb-2 tracking-tight">45</div>
+                <div className="text-sm font-semibold text-gray-700">Feature Analysis</div>
               </div>
               <div>
-                <div className="text-2xl font-bold text-purple-600 mb-2">97%</div>
-                <div className="text-sm text-gray-600">Accuracy Rate</div>
+                <div className="text-3xl font-bold text-purple-600 mb-2 tracking-tight">97%</div>
+                <div className="text-sm font-semibold text-gray-700">Accuracy Rate</div>
               </div>
               <div>
-                <div className="text-2xl font-bold text-orange-600 mb-2"><100ms</div>
-                <div className="text-sm text-gray-600">Response Time</div>
+                <div className="text-3xl font-bold text-orange-600 mb-2 tracking-tight"><100ms</div>
+                <div className="text-sm font-semibold text-gray-700">Response Time</div>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* CTA Section */}
-      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
+      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
-          <h2 className="text-3xl font-bold text-white mb-6">
+          <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">
             Ready to Secure Your Health?
           </h2>
-          <p className="text-xl text-blue-100 mb-8">
+          <p className="text-xl text-blue-100 mb-12 font-medium leading-relaxed">
             Join thousands of patients who trust SecureGluco for comprehensive 
             diabetes management with enterprise-grade security.
           </p>
           <button
             onClick={onBackToLogin}
-            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
+            className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
           >
             Access Dashboard
           </button>
         </div>
       </section>
     </div>
   );
 };