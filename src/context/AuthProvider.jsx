import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    setLocalStorage();
    return getLocalStorage();
  });

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;    
