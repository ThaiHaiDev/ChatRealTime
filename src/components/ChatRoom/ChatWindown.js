import { UserAddOutlined } from "@ant-design/icons"
import { Avatar, Button, Form, Input, Tooltip } from "antd"
import React, { useContext, useMemo, useState } from "react"
import styled from "styled-components"
import { AppContext } from "../../Context/AppProvider"
import { AuthContext } from "../../Context/AuthProvider"
import { addDocument } from "../../firebase/service"
import useFirestore from "../../hooks/useFirestore"
import Message from "./Message"

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
        &_info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &_title {
            margin: 0;
            font-weight: bold;
        }
        &_description {
            font-size: 12px;
        }
    }
`

const ButtonGroupStyled =styled.div`
    display: flex;
    align-items: center;
`

const ContentStyle = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`

const WapperStyled = styled.div`
    height: 100vh;
`
const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`

function ChatWindown() {
    const { selectRoom, members, setIsInviteMember } = useContext(AppContext)
    const [ inputValue, setInputValue ] = useState('')
    const { user } = useContext(AuthContext)

    const handleInput = (e) => {
        setInputValue(e.target.value)
    }

    const handleOnSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid: user.uid,
            photoURL: user.photoURL,
            roomId: selectRoom.id,
            displayName: user.displayName
        })
    }

    // Lấy ra data message ở trong collection message theo selectRoom.id
    const condition = useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectRoom.id
    }), [selectRoom.id])

    const message = useFirestore('messages', condition)
    console.log(message)

    return (
        <WapperStyled>
            <HeaderStyled>
                <div className="header_info">
                    <p className="header_title">{selectRoom.name}</p>
                    <span className="header_description">{selectRoom.description}</span>
                </div>
                <ButtonGroupStyled>
                    <Button icon={<UserAddOutlined />} onClick={() => setIsInviteMember(true)}>Add</Button>
                    <Avatar.Group maxCount={2}> 
                    
                        {members.map((member) => (
                            <Tooltip title={member.displayName} key={member.id}>
                                <Avatar src={member.photoURL}>
                                {member.photoURL? '' : member.displayName?.charAt(0)?.toUpperCase()}
                                </Avatar>
                            </Tooltip>
                        ))}

                    </Avatar.Group>
                </ButtonGroupStyled>
            </HeaderStyled>

            <ContentStyle>
                <MessageListStyled>
                    {
                        message.map((mes) => (
                            <Message key={mes.id} text={mes.text} displayName={mes.displayName} createAt={new Date(mes.createAt.seconds*1000).toLocaleDateString() + ' at ' + new Date(mes.createAt.seconds*1000).toLocaleTimeString()} photoURL={mes.photoURL} />
                        ))
                    }
                </MessageListStyled>
                <FormStyled>
                    <Form.Item>
                        <Input bordered={false} autoComplete='off' placeholder="Please Enter ..." onChange={handleInput} onPressEnter={handleOnSubmit}/>
                    </Form.Item>
                    <Button onClick={handleOnSubmit}>Send</Button>
                </FormStyled>
            </ContentStyle>
        </WapperStyled>
    )
}

export default ChatWindown