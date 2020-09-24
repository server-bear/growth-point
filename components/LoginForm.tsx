import React, { FunctionComponent, useState } from 'react';
import firebase from '../utils/server/firebaseClient';

type Props = {

};

const LoginForm: FunctionComponent<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (email === '' || password === '') {
      // eslint-disable-next-line no-undef
      alert('Нужен логин / пароль');
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
      });
  };

  const handleSignInWithGoogle = () => {
    const GoogleProvider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(GoogleProvider)
      .then((auth) => {
        console.log(auth);
      });
  };

  return (
    <div
      className="box"
      style={{
        padding: 16,
        width: 360,
        margin: '100px'
          + ' auto',
      }}
    >
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="email"
            placeholder="Емэйл"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check" />
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input"
            type="password"
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control level">
          <button
            type="button"
            className="button is-success level-item has-text-centered"
            onClick={handleSignIn}
          >
            Войти
          </button>
          <span className="has-text-grey-light mx-5 level-item has-text-centered">
            или
          </span>
          <button
            type="button"
            className="button is-white level-item has-text-centered"
            onClick={handleSignInWithGoogle}
          >
            Через Гугл
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
