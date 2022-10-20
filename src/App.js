import React from 'react';
import { AuthProvider } from './provider/AuthProvider';
import './App.css';
import './service/firebase'
import Header from './components/Header'

function App() {
  return (
    <AuthProvider>
      <Header />
    </AuthProvider>
  );
}
export default App;
