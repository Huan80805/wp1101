import {Modal, Input} from 'antd'
import { useState } from 'react';
const  ChatModal = ({visible, onCreate, onCancel}) => {
    const [name, setName] = useState('');
    return (
        <Modal
            title="Start a chat with someone ?"
            visible={visible}
            onOk={() => {
                onCreate({name})
            }}
            onCancel={onCancel}
            okText="Create"
        >
            <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            ></Input>        
        </Modal>
    )
}
export default ChatModal