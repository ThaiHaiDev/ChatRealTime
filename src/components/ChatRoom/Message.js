import { Avatar, Typography } from "antd"
import React from "react"
import styled from "styled-components"

const WapperStyled = styled.div`
    margin-bottom: 10px;

    .author {
        margin-left: 5px;
        font-weight: bold;
    }
    .date {
        margin-left: 10px;
        font-size: 11px;
        color: black;
    }
    .content {
        margin-left: 30px;
    }
`

function Message({ text, displayName, createAt, photoURL }) {
    return (
        <WapperStyled>
            <div>
                <Avatar size="small" src={photoURL}>A</Avatar>
                <Typography.Text className="author">{displayName}</Typography.Text>
                <Typography.Text className="date">{createAt}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="content">{text}</Typography.Text>
            </div>
        </WapperStyled>
    )
}

export default Message