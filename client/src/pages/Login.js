import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      setToken(res.data.token);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {token && <div>Token: {token}</div>}
    </div>
  );
};

export default Login;
