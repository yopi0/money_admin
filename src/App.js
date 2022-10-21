import React from 'react';
import { AuthProvider } from './provider/AuthProvider';
import './App.css';
import './service/firebase'
import Header from './components/Header'
import Form from './components/Form';
import List from './components/List'

function App() {
  return (
    <AuthProvider>
      <Header />
      <Form />
    </AuthProvider>
  );
}
export default App;
