import { device } from 'helpers/constants';
import { Button, Input } from 'antd';
import loginBackground from 'assets/login-background.jpg';
import styled, { css } from 'styled-components';

export const LoginBackground = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
    url(${loginBackground}) center no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const FormWrapper = styled.div`
  background-color: #fff;
  width: 450px;
  max-width: 100%;
  padding: 2rem 1.5rem 1.5rem;
  border-radius: 1.5rem;
  box-shadow: 1px 4px 20px rbga(0, 0, 0, 0.8);

  .login__header {
    transform: translateX(-5%);
  }

  h2 {
    margin-bottom: 0;
    color: #1890ff;
  }

  @media ${device.tablet} {
    padding: 2.5rem 3.5rem 2rem;
  }
`;

export const styledInput = css`
  border-radius: 1rem;
`;

export const FormInput = styled(Input)`
  ${styledInput};
`;

export const FormInputPassword = styled(Input.Password)`
  ${styledInput};
`;

export const FormSubmitCta = styled(Button)`
  ${styledInput};
  width: 100%;
`;

export const LoginSeparator = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #999;
  color: #999;
  line-height: 0.1em;
  margin: 10px 0 20px;

  span {
    background-color: #fff;
    padding: 0 1rem;
  }
`;
