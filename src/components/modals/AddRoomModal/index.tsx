import { useState } from 'react';
import { useApp } from 'contexts/AppProvider';
import { useAuth } from 'contexts/AuthProvider';
import { addDocument } from 'helpers/services';
import { Form, Input } from 'antd';
import Modal from 'components/ui/Modal';
import { CollectionName } from 'types/Firestore';

const AddRoomModal = () => {
  const { isAddRoomModalVisible, setIsAddRoomModalVisible } = useApp();
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [isOkButtonDisabled, setIsOkButtonDisabled] = useState(true);

  const okHandler = async () => {
    void form
      .validateFields()
      .then(async ({ errorFields }) => {
        if (errorFields?.length > 0) {
          return;
        }

        await addDocument(CollectionName.ROOMS, { ...form.getFieldsValue(), members: [user?.uid] });
        form.resetFields();
        setIsAddRoomModalVisible?.(false);
      })
      .catch((err) => console.log(err));
  };

  const cancelHandler = () => {
    form.resetFields();
    setIsAddRoomModalVisible?.(false);
  };

  const formChanges = () => {
    setIsOkButtonDisabled(form.getFieldsError().some((field) => field.errors.length > 0));
  };

  return (
    <Modal
      title="Add new room"
      open={isAddRoomModalVisible}
      onOk={okHandler}
      onCancel={cancelHandler}
      okButtonProps={{
        disabled: isOkButtonDisabled,
      }}
    >
      <Form form={form} layout="vertical" onFieldsChange={() => formChanges()}>
        <Form.Item
          label="Room name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Room name cannot be blank',
            },
            {
              max: 256,
              message: 'Room name cannot exceed 256 characters',
            },
          ]}
        >
          <Input placeholder="Enter room name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Room description cannot be blank',
            },
            {
              max: 256,
              message: 'Room description cannot exceed 256 characters',
            },
          ]}
        >
          <Input.TextArea placeholder="Enter room description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoomModal;
