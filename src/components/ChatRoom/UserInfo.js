import React, { useContext, useEffect } from "react"
import { Avatar, Button, Typography } from 'antd'
import styled from "styled-components"
import { auth, db } from "../../firebase/config"
import { AuthContext } from '../../Context/AuthProvider'

const WapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 28, 83);

    .username {
        color: white;
        margin-left: 10px;
    }
`
// onSnapshot của firebase giúp covert data của shapshot sang js thuần
function UserInfo() {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        db.collection('users').onSnapshot((snapshot) => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data,
                id: doc.id
            }))
        })
    }, [])

    return (
        <WapperStyled>
            <div>
                <Avatar src={user.photoURL}>A</Avatar>
                <Typography.Text className="username">{user.displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>Đăng xuất</Button>
        </WapperStyled>
    )
}

export default UserInfo