import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await register(data.name, data.email, data.password);
      // console.log(data);
      navigate('/verses');
    } catch (err) {
      throw new Error('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <AuthForm onSubmit={handleSubmit} isLogin={false} />
    </div>
  );
}

export default Register;