import { device } from 'helpers/constants';
import { Button, Divider, Input } from 'antd';
import styled, { css } from 'styled-components';

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

  @media ${device.tablet} {
    padding: 2.5rem 3.5rem 2rem;
  }
`;

export const styledInput = css`
  border-radius: 1rem;
  font-size: 1rem;
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

export const LoginSeparator = styled(Divider)`
  &&& {
    border-top-color: #999;
    color: #999;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  .straper-logo {
    transform: translateX(-5%);
  }
`;
