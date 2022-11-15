import { Button, Modal } from 'antd';
import loginBackground from 'assets/login-background.jpg';
import styled from 'styled-components';

export const AccentButton = styled(Button)<{ borderRadius: string }>`
  &&& {
    background-color: var(--color-accent);
    border-color: var(--color-accent);
  }
  color: #fff;
  font-weight: 600;
  border-radius: ${(props) => props.borderRadius || '0.5rem'};

  &:hover {
    opacity: 0.9;
  }
`;

export const MainBackground = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
    url(${loginBackground}) center no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
`;

export const MainWrapperStyled = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const ModalStyled = styled(Modal)`
  .ant-modal-header {
    background-color: var(--color-accent);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;

    .ant-modal-title {
      color: #fff;
    }
  }

  .ant-modal-close {
    color: #fff;
  }
  .ant-modal-content {
    border-radius: 0.5rem;
  }

  .ant-btn {
    border-radius: 0.5rem;
  }

  .ant-btn-primary:not([disabled]) {
    background-color: var(--color-accent);
    border-color: var(--color-accent);
    border-radius: 0.5rem;
  }
`;
