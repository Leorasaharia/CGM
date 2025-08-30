@@ .. @@
   return (
   )
-    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
-      <div className="max-w-md w-full">
+    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#fafbfc' }}>
+      <div className="max-w-lg w-full">
         {/* Logo and Title */}
-        <div className="text-center mb-8">
+        <div className="text-center mb-12">
           <div className="flex items-center justify-center space-x-3 mb-4">
-            <Shield className="h-10 w-10 text-blue-600" />
-            <Activity className="h-10 w-10 text-green-600" />
+            <div className="p-3 bg-blue-50 rounded-2xl">
+              <Shield className="h-10 w-10 text-blue-600" />
+            </div>
+            <div className="p-3 bg-green-50 rounded-2xl">
+              <Activity className="h-10 w-10 text-green-600" />
+            </div>
           </div>
-          <h1 className="text-3xl font-bold text-gray-900 mb-2">SecureGluco</h1>
-          <p className="text-gray-600">Secure Diabetes Management Dashboard</p>
+          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">SecureGluco</h1>
+          <p className="text-gray-600 text-lg font-medium">Secure Diabetes Management Dashboard</p>
         </div>

         {/* Login Form */}
-        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-8">
-          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
+        <div className="tidepool-card p-10">
+          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight">
             Welcome Back
           </h2>
           
           <form onSubmit={handleSubmit} className="space-y-6">
             <div>
-              <label className="block text-sm font-medium text-gray-700 mb-2">
+              <label className="block text-base font-semibold text-gray-900 mb-3">
                 Email Address
               </label>
               <input
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
-                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
+                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base font-medium"
                 placeholder="Enter your email"
                 required
               />
             </div>
             
             <div>
-              <label className="block text-sm font-medium text-gray-700 mb-2">
+              <label className="block text-base font-semibold text-gray-900 mb-3">
                 Password
               </label>
               <div className="relative">
                 <input
                   type={showPassword ? 'text' : 'password'}
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
-                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12"
+                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pr-12 text-base font-medium"
                   placeholder="Enter your password"
                   required
                 />
                 <button
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
-                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
+                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                 >
                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                 </button>
               </div>
             </div>

             <button
               type="submit"
-              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
+              className="w-full tidepool-button-primary py-4 text-lg shadow-lg hover:shadow-xl"
             >
               Sign In to Dashboard
             </button>
           </form>

-          <div className="mt-6 text-center">
+          <div className="mt-8 text-center">
             <button
               onClick={onShowAbout}
-              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
+              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors text-base"
             >
               Learn more about SecureGluco
             </button>
           </div>
         </div>

         {/* Footer */}
-        <div className="text-center mt-8 text-sm text-gray-500">
+        <div className="text-center mt-12 text-sm font-medium text-gray-600">
           <p>© 2024 SecureGluco. Protecting your health with advanced technology.</p>
         </div>
       </div>
     </div>
   );
 };