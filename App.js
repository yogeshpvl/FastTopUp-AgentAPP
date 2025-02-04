
import React from 'react';
import Navigation from './src/Navigation'
import { AuthProvider } from './src/hooks/useAuth';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
