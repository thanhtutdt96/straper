import { FC, ReactNode } from 'react';
import { ModalProps } from 'antd/lib/modal/Modal';
import { ModalStyled } from 'components/ui/Common/styled';

type Props = {
  children: ReactNode;
} & ModalProps;

const Modal: FC<Props> = ({ children, ...attributes }) => {
  return (
    <ModalStyled centered destroyOnClose {...attributes}>
      {children}
    </ModalStyled>
  );
};

export default Modal;
