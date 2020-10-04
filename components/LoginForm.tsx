import React, { useState } from 'react';
import { useAuth } from '../context/authContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSignIn = () => {
    if (email === '' || password === '') {
      // eslint-disable-next-line no-undef
      alert('Нужен логин / пароль');
    }

    login(email, password);
  };

  return (
    <div
      className="box"
      style={{
        padding: 16,
        width: 360,
        margin: '100px auto',
      }}
    >
      <div className="field">
        <p className="control has-icons-right">
          <input
            className="input"
            placeholder="Емэйл"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="icon is-small is-right">
            <i className="fas fa-check" />
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <input
            className="input"
            placeholder="Пароль"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
      </div>
      <div className="field">
        <p className="control level">
          <button
            className="button is-success level-item has-text-centered"
            type="button"
            onClick={handleSignIn}
          >
            Войти
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
