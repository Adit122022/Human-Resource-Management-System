import React, { useState } from 'react';
import axiosinstance from '../../lib/axios';

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? '/api/auth/signup' : '/api/auth/login';

    try {
      const res = await axiosinstance(url, form);
      localStorage.setItem('token', res.data.token);
      alert('Success! Token stored in localStorage');
    } catch (err) {
      alert('Error: ' + err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <input name="name" placeholder="Name" onChange={handleChange} required /><br />
            <select name="role" onChange={handleChange}>
              <option value="client">Client</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select><br />
          </>
        )}
        <input name="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required /><br />
        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        Switch to {isSignup ? 'Login' : 'Signup'}
      </button>
    </div>
  );
};

export default AuthForm;
