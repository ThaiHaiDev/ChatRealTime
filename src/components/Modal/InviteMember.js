import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';

const { Option } = Select;

// Sau 0.3s sẽ tìm kiếm 1 lần, fetchOptions là API tìm kiếm
function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {

    const [options, setOptions] = useState([]);

    // Thực hiện gọi API
    const debounceFetch = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([])

            // API truyền từ ngoài vào
            fetchOptions(value, props.currentMember).then((newOptions) => {
                setOptions(newOptions);
                console.log({options})
            })
        }

        // return hàm debounce từ lodash: hàm f không bị gọi lần nào (thay vì gọi 1000 lần hay 100 lần). Hàm f sẽ chỉ được gọi sau một khoảng thời gian (0.3s) mà tìm kiếm không được thực hiện nữa
        return debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions]);

    useEffect(() => { return () => {
          // clear when unmount
          setOptions([])
        }
    }, [])

    return (
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetch}
        {...props}
      >
        {options.map((opt) => (
          <Option key={opt.value} value={opt.value} title={opt.label}>
            <Avatar size='small' src={opt.photoURL}>
              {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
            </Avatar>
            {` ${opt.label}`}
          </Option>
        ))}
      </Select>
    )
}

// Dữ liệu trả về khi search
async function fetchUserList(search, currentMember) {
    return db.collection('users').where('keywords', 'array-contains', search).orderBy('displayName').limit(20).get()
      .then((snapshot) => {
        return snapshot.docs
          .map((doc) => ({
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL,
          })).filter(opt => currentMember.include(opt.value))
      })
}

export default function InviteMember() {
    const { isInviteMember, setIsInviteMember, selectRoomId, selectRoom } = useContext(AppContext)
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();

    const handleOk = () => {
      // reset form value
      form.resetFields();
      setValue([]);

      // update members trong room
      const roomRef = db.collection('rooms').doc(selectRoomId);

      roomRef.update({
        members: [...selectRoom.members, ...value.map((val) => val.value)],
      });

      setIsInviteMember(false);
    };

    const handleCancel = () => {
      // reset form value
      form.resetFields();
      setValue([]);

      setIsInviteMember(false);
    };

    return (
      <div>
        <Modal
          title='Add new member'
          visible={isInviteMember}
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose={true}
        >
          <Form form={form} layout='vertical'>
            <DebounceSelect
              mode='multiple'
              name='search-user'
              label='Name All Member'
              value={value}
              placeholder='Please Name Nember Enter ...'
              fetchOptions={fetchUserList}
              onChange={(newValue) => setValue(newValue)}
              style={{ width: '100%' }}
              currentMember={selectRoom.members}
            />
          </Form>
        </Modal>
      </div>
    )
}