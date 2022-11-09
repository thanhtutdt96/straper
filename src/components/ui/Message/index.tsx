import React from 'react';
import { Avatar, Typography } from 'antd';
import { formatRelative } from 'date-fns';
import styled from 'styled-components';
import { Timestamp } from 'types/App';

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
  createdAt: Timestamp;
  photoURL?: string | null;
};

const formatDate = (seconds?: number) => {
  if (!seconds) {
    return '';
  }
  const formattedDate = formatRelative(new Date(seconds * 1000), new Date());

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

const Message: React.FC<Props> = ({ content, displayName, createdAt, photoURL }) => (
  <WrapperStyled>
    <div>
      <Avatar size="small" src={photoURL}>
        {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
      </Avatar>
      <Typography.Text className="message__author">{displayName}</Typography.Text>
      <Typography.Text className="message__date">{formatDate(createdAt?.seconds)}</Typography.Text>
    </div>
    <div>
      <Typography.Text className="message__content">{content}</Typography.Text>
    </div>
  </WrapperStyled>
);

export default Message;
