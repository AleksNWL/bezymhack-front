import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { useState } from 'react';
import { CardType } from "../../types/Card"


interface CardsFormProps {
    cards: Array<CardType>;
    setCards: (data: Array<CardType>) => void;
}

export const CardsForm: React.FC<CardsFormProps> = ({ cards, setCards }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleSubmit = () => {
        form.validateFields()
            .then((values: CardType) => {
                console.log(values)
                console.log(cards)
                setCards([...cards, { ...values, id: cards.length + 1, x: 0, y: 0 }]);
                handleClose();
            })
            .catch((info) => {
                console.error('Validation Failed:', info);
            });
    };

    return (
        <>
            <Button type="primary" onClick={handleOpen}>
                Create Card
            </Button>
            <Modal
                title="Create New Card"
                visible={isModalOpen}
                onCancel={handleClose}
                onOk={handleSubmit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};