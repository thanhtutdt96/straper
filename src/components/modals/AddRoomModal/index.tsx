import { useApp } from 'contexts/AppProvider';
import { useAuth } from 'contexts/AuthProvider';
import { addDocument } from 'helpers/services';
import { Form, Input, Modal } from 'antd';
import { CollectionName } from 'types/Firestore';

const AddRoomModal = () => {
  const { isAddRoomModalVisible, setIsAddRoomModalVisible } = useApp();
  const { user } = useAuth();
  const [form] = Form.useForm();

  const okHandler = async () => {
    await addDocument(CollectionName.ROOMS, { ...form.getFieldsValue(), members: [user?.uid] });
    form.resetFields();
    setIsAddRoomModalVisible?.(false);
  };

  const cancelHandler = () => {
    setIsAddRoomModalVisible?.(false);
  };
  return (
    <Modal
      title="Add new room"
      open={isAddRoomModalVisible}
      onOk={okHandler}
      onCancel={cancelHandler}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Room name" name="name">
          <Input placeholder="Enter room name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter room description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoomModal;
