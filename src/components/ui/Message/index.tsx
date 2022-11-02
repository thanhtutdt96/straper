import React from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';

const WrapperStyled = styled.div`
  margin-bottom: 10px;

  .message__author {
    margin-left: 5px;
    font-weight: bold;
  }

  .message__date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .message__content {
    margin-left: 30px;
  }
`;

type Props = {
  content: string;
  displayName: string;
  createdAt: string;
  photoURL?: string | null;
};

const Message: React.FC<Props> = ({ content, displayName, createdAt, photoURL }) => {
  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>A</Avatar>
        <Typography.Text className="message__author">{displayName}</Typography.Text>
        <Typography.Text className="message__date">{createdAt}</Typography.Text>
      </div>
      <div>
        <Typography.Text className="message__content">{content}</Typography.Text>
      </div>
    </WrapperStyled>
  );
};

export default Message;
