import { CSSProperties, FC, memo } from 'react';
import logo from 'assets/logo.png';
import styled from 'styled-components';

type Props = {
  title?: string;
  titleAttributes?: CSSProperties;
};

const WrapperStyled = styled.div<Props>`
  display: flex;
  align-items: center;

  h2 {
    margin-bottom: 0;
    color: ${(props) => props.titleAttributes?.color};
    font-size: ${(props) => props.titleAttributes?.fontSize};
    font-weight: ${(props) => props.titleAttributes?.fontWeight};
  }

  img {
    margin-right: 0.65rem;
  }
`;

const StraperLogo: FC<Props> = ({ title = 'Straper', titleAttributes }) => (
  <WrapperStyled className="straper-logo" titleAttributes={titleAttributes}>
    <img src={logo} alt={title} width="32px" />
    <h2>{title}</h2>
  </WrapperStyled>
);

export default memo(StraperLogo);
