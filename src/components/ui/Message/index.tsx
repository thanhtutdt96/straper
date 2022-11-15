import React, { memo } from 'react';
import { useAuth } from 'contexts/AuthProvider';
import { Avatar, Typography } from 'antd';
import { formatRelative } from 'date-fns';
import styled from 'styled-components';
import { Timestamp } from 'types/App';

type Props = {
  content: string;
  displayName: string;
  createdAt: Timestamp;
  photoURL?: string | null;
  userUuid: string;
};

const WrapperStyled = styled.div`
  margin-bottom: 1rem;
  display: flex;
`;

const MessageWrapper = styled.div<{ isOwnMessage: boolean }>`
  display: flex;
  margin-left: ${(props) => (props.isOwnMessage ? 'auto' : undefined)};
  flex-direction: ${(props) => (props.isOwnMessage ? 'row-reverse' : 'row')};

  .message__author {
    font-weight: 700;
  }

  .message__date {
    margin-left: 0.75rem;
    font-size: var(--text-xs);
    color: #a7a7a7;
  }
`;

const MessageInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const MessageInnerWrapper = styled.div<{ isOwnMessage: boolean }>`
  ${(props) => (props.isOwnMessage ? 'margin-right: 0.75rem' : 'margin-left: 0.75rem')};
  align-items: ${(props) => (props.isOwnMessage ? 'end' : 'start')};
  display: flex;
  flex-direction: column;
`;

const AvatarWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: flex-start;
`;

const MessageBubble = styled.div<{ isOwnMessage: boolean }>`
  background-color: ${(props) => (props.isOwnMessage ? 'var(--color-secondary)' : '#f0f0f0')};
  color: ${(props) => (props.isOwnMessage ? '#fff' : '#000')};
  max-width: max-content;
  padding: 0.5rem 0.8rem;
  border-radius: ${(props) =>
    props.isOwnMessage ? '0.8rem 0.25rem 0.8rem 0.8rem' : '0.25rem 0.8rem 0.8rem 0.8rem'};
  align-self: ${(props) => (props.isOwnMessage ? 'end' : 'start')};
`;

const formatDate = (seconds?: number) => {
  if (!seconds) {
    return '';
  }
  const formattedDate = formatRelative(new Date(seconds * 1000), new Date());

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

const Message: React.FC<Props> = ({ content, displayName, createdAt, photoURL, userUuid }) => {
  const { user } = useAuth();

  return (
    <WrapperStyled>
      <MessageWrapper isOwnMessage={user?.uid === userUuid}>
        <AvatarWrapper>
          <Avatar size="large" src={photoURL}>
            {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
        </AvatarWrapper>
        <MessageInnerWrapper isOwnMessage={user?.uid === userUuid}>
          <MessageInfoWrapper>
            {user?.uid !== userUuid && (
              <Typography.Text className="message__author">{displayName}</Typography.Text>
            )}
            <Typography.Text className="message__date">
              {formatDate(createdAt?.seconds)}
            </Typography.Text>
          </MessageInfoWrapper>
          <MessageBubble isOwnMessage={user?.uid === userUuid}>{content}</MessageBubble>
        </MessageInnerWrapper>
      </MessageWrapper>
    </WrapperStyled>
  );
};

export default memo(Message);
