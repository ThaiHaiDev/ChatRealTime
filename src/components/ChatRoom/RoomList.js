import React, { useContext, useMemo } from "react"
import { Button, Collapse, Typography } from 'antd'
import styled from "styled-components"
import { PlusSquareOutlined } from '@ant-design/icons'
import { AppContext } from "../../Context/AppProvider"
import AddRoom from "../Modal/AddRoom"

const { Panel } = Collapse

// &&& là ghi đè CSS
const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header, p {
            color: white;
        }
        .ant-collapse-content-box {
            padding: 0 40px;
        }
        .add-room {
            color: white;
            padding: 0;
        }
    }
`
const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`

function RoomList() {
    const { rooms, setIsAddRoomVisible, setSelectRoomId } = useContext(AppContext)

    const handleAddRoom = () => {
        setIsAddRoomVisible(true)
    }

    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="Danh sách các phòng" key={1}>

                {rooms.map(room => (<LinkStyled key={room.id} onClick={() => setSelectRoomId(room.id)} >{room.name}</LinkStyled>))}

                <Button type="text" icon={<PlusSquareOutlined />} className="add-room" onClick={handleAddRoom}>Thêm phòng</Button>
            </PanelStyled>
        </Collapse>
    )
}

export default RoomList