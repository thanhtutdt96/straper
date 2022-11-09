import { FC, useMemo, useState } from 'react';
import { useApp } from 'contexts/AppProvider';
import { updateDocument } from 'helpers/services';
import { Avatar, Form, Modal, Select, Spin } from 'antd';
import useFirestore from 'hooks/useFirestore';
import { debounce } from 'lodash-es';
import { User } from 'types/Auth';
import { CollectionCondition, CollectionName, QueryCollectionMode } from 'types/Firestore';

type UserListItem = {
  photoURL: string;
  value: string;
  displayName: string;
};

type Props = {
  fetchOptions: (
    searchTerm: string,
    currentMembers: string[],
  ) => Promise<UserListItem[]> | undefined;
  debounceTimeout?: number;
  currentMembers: string[];
  [x: string]: unknown;
};

const DebounceSelect: FC<Props> = ({
  fetchOptions,
  debounceTimeout = 300,
  currentMembers,
  ...props
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<UserListItem[]>([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (searchTerm: string) => {
      setOptions([]);
      setIsFetching(true);

      fetchOptions(searchTerm, currentMembers)?.then((newOptions) => {
        setOptions(newOptions);
        setIsFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [currentMembers, debounceTimeout, fetchOptions]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={isFetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((item) => (
        <Select.Option key={item.value} value={item.value} title={item.displayName}>
          <Avatar size="small" src={item.photoURL}>
            {item.photoURL ? '' : item.displayName?.charAt(0).toUpperCase()}
          </Avatar>
          {item.displayName}
        </Select.Option>
      ))}
    </Select>
  );
};

const InviteMemberModal = () => {
  const {
    selectedRoom,
    selectedRoomId,
    isInviteMemberModalVisible,
    setIsInviteMemberModalVisible,
  } = useApp();
  const [value, setValue] = useState<UserListItem[]>([]);
  const [form] = Form.useForm();

  const userConditions: CollectionCondition = {
    fieldName: 'keywords',
    operator: 'array-contains',
    orderBy: 'displayName',
    limit: 20,
  };

  const { getMultipleDocumentsBySearchTerm } = useFirestore<User>(
    CollectionName.USERS,
    userConditions,
    QueryCollectionMode.GET_ALL,
  );

  const fetchUserList = (searchTerm: string, currentMembers: string[]) => {
    return getMultipleDocumentsBySearchTerm(searchTerm)?.then((documents) => {
      return documents.docs
        .map(
          (document): UserListItem => ({
            displayName: document.data().displayName,
            value: document.data().uid,
            photoURL: document.data().photoURL,
          }),
        )
        .filter((item) => !currentMembers.includes(item.value));
    });
  };

  const okHandler = async () => {
    form.resetFields();

    try {
      await updateDocument(selectedRoomId, CollectionName.ROOMS, {
        members: [...(selectedRoom?.members || []), ...value.map((item) => item.value)],
      });
    } catch (error) {
      console.log(error);
    }

    setIsInviteMemberModalVisible?.(false);
  };

  const cancelHandler = () => {
    setIsInviteMemberModalVisible?.(false);
  };

  return (
    <Modal
      title="Invite new member"
      open={isInviteMemberModalVisible}
      onOk={okHandler}
      onCancel={cancelHandler}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Select or search members" name="select-member">
          <DebounceSelect
            mode="multiple"
            placeholder="Search to select"
            value={value}
            label="Member name"
            fetchOptions={fetchUserList}
            onChange={(newValue: UserListItem[]) => setValue(newValue)}
            style={{ width: '100%' }}
            currentMembers={selectedRoom?.members || []}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InviteMemberModal;
