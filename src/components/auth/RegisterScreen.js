import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const [values, handleInputChange] = useForm({
    name: 'Andrés',
    email: 'andressalgado41@gmail.com',
    password: '123456',
    password2: '123456',
  });

  const { name, email, password, password2 } = values;

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(name, email, password, password2);
  };

  const isFormValid = () => {};

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        <input className="auth__input" type="text" placeholder="Name" name="name" autoComplete="off" value={name} onChange={handleInputChange} />
        <input className="auth__input" type="text" placeholder="Email" name="email" autoComplete="off" value={email} onChange={handleInputChange} />
        <input className="auth__input" type="password" placeholder="Password" name="password" autoComplete="off" value={password} onChange={handleInputChange} />
        <input className="auth__input" type="password" placeholder="Confirm Password" name="password2" autoComplete="off" value={password2} onChange={handleInputChange} />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>

        <Link className="link mt-5" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
};
