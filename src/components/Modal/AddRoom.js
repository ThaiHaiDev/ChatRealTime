import React, { useContext, useState } from "react"
import { Modal, Form, Input } from 'antd'
import { AppContext } from "../../Context/AppProvider"
import { useForm } from "antd/lib/form/Form"
import { addDocument } from "../../firebase/service"
import { AuthContext } from "../../Context/AuthProvider"

export default function AddRoom() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
    const { user } = useContext(AuthContext)
    const [form] = useForm()

    const handleOk = () => {
        // add new room to firestore
        // console.log('data', form.getFieldValue())

        addDocument('rooms', { ...form.getFieldValue(), members: [user.uid] })
        setIsAddRoomVisible(false)

        // reset form value
        form.resetFields()
    }

    const hanldeCancel = () => {
        form.resetFields()
        setIsAddRoomVisible(false)
    }

    return (
        <div>
            <Modal title="New Room" visible={isAddRoomVisible} onOk={handleOk} onCancel={hanldeCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Name Room" name='name'>
                        <Input placeholder="Please Name Room ..."/>
                    </Form.Item>
                    <Form.Item label="Description" name='description'>
                    <Input.TextArea placeholder="Please Description ..."/>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    )
}