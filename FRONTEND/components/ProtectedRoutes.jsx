import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { SessionContext } from '../Contex/SessionContext'

const ProtectedRoutes = ({ children }) => {
    const { session } = useContext(SessionContext)
    if (!session) {
        return <>
            <Navigate to="/login" replace />
        </>
    }
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoutes