import React, { FunctionComponent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';

type FormTypes = {
  firstName: string,
  lastName: string,
  email: string,
  password: string
};

type Props = {

};

const SignupForm: FunctionComponent<Props> = () => {
  const {
    register, handleSubmit,
  } = useForm<FormTypes>();

  const { signup } = useAuth();

  const onSubmit: SubmitHandler<FormTypes> = async (formData) => {
    signup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <form
      className="box"
      style={{
        padding: 16,
        width: 360,
        margin: '100px'
          + ' auto',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="field">
        <p className="control has-icons-right">
          <input
            ref={register({ required: true })}
            className="input"
            name="firstName"
            placeholder="Имя"
            type="text"
          />
          <span className="icon is-small is-right">
            <i className="fas fa-check" />
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-right">
          <input
            ref={register({ required: true })}
            className="input"
            name="email"
            placeholder="Емэйл"
            type="email"
          />
          <span className="icon is-small is-right">
            <i className="fas fa-check" />
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <input
            ref={register({ required: true })}
            className="input"
            name="password"
            placeholder="Пароль"
            type="password"
          />
        </p>
      </div>

      <div className="field">
        <p className="control level">
          <button
            className="button is-warning level-item has-text-centered"
            type="submit"
          >
            Зарегистрироваться
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
