import React from 'react';
import { AuthProvider } from './provider/AuthProvider';
import './App.css';
import './service/firebase'
import Header from './components/Header'
import Form from './components/Form';
import List from './components/List'
import Datetime from './components/Datetime';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Datetime />
    </AuthProvider>
  );
}
export default App;
