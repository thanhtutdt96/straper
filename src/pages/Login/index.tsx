import { useState } from 'react';
import { auth } from 'helpers/firebase';
import {
  FacebookFilled,
  GoogleOutlined,
  LockOutlined,
  UserOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { Button, Checkbox, Form, Spin } from 'antd';
import logo from 'assets/logo.png';
import {
  FormInput,
  FormInputPassword,
  FormSubmitCta,
  FormWrapper,
  LoginBackground,
  LoginSeparator,
} from 'pages/Login/styled';

const Login = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const logInWithFacebook = () => {
    signInWithPopup(auth, new FacebookAuthProvider())
      .then(({ user }) => {
        setSuccessMessage(`Welcome to Straper, ${user.displayName}`);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(({ user }) => {
        setSuccessMessage(`Welcome to Straper, ${user.displayName}`);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <LoginBackground>
      <FormWrapper>
        <div className="mb-7 text-center d-flex align-center justify-center login__header">
          <img src={logo} alt="Straper" width="32px" className="mr-2" />
          <h2>Login</h2>
        </div>

        {successMessage && (
          <div className="text-primary mb-4 text-center text-md">
            <Spin className="mr-3" />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="text-error mb-4 text-center text-sm">
            <WarningOutlined className="mr-2" />
            {errorMessage}
          </div>
        )}

        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <FormInput prefix={<UserOutlined />} placeholder="Email/Username" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <FormInputPassword prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <FormSubmitCta type="primary" htmlType="submit" size="large">
              Submit
            </FormSubmitCta>
          </Form.Item>

          <LoginSeparator>
            <span>or login with</span>
          </LoginSeparator>

          <div className="d-flex justify-center">
            <Button
              shape="circle"
              size="large"
              type="primary"
              icon={<GoogleOutlined />}
              ghost
              danger
              className="mr-5"
              onClick={loginWithGoogle}
            />

            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<FacebookFilled />}
              ghost
              onClick={logInWithFacebook}
            />
          </div>
        </Form>
      </FormWrapper>
    </LoginBackground>
  );
};

export default Login;