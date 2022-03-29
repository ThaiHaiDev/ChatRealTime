import React, { useContext, useMemo, useState } from "react"
import { AuthContext } from "./AuthProvider"
import useFirestore from "../hooks/useFirestore"

export const AppContext = React.createContext()

export default function AppProvider({ children }) {
    const { user } = useContext(AuthContext)
    const [ isAddRoomVisible, setIsAddRoomVisible ] = useState(false)
    const [ selectRoomId, setSelectRoomId ] = useState('')
    const [ isInviteMember, setIsInviteMember ] = useState(false)

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user.uid
        }
    }, [user.uid])

    const rooms = useFirestore('rooms', roomsCondition)

    const selectRoom = useMemo(() => 
        rooms.find(room => room.id === selectRoomId) || {}
        ,[rooms, selectRoomId])

    const usersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectRoom.members
        }
    }, [selectRoom.members])

    const members = useFirestore('users', usersCondition)

    return (
        <AppContext.Provider value={{ rooms, isAddRoomVisible, setIsAddRoomVisible, selectRoomId, setSelectRoomId, selectRoom, members, isInviteMember, setIsInviteMember }}>
            { children }
        </AppContext.Provider>
    )
}

