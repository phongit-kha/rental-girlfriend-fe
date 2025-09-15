'use client'

import { useState, useEffect } from 'react'
import {
    User,
    getCurrentUser,
    setCurrentUser,
    loginUser,
    registerUser,
    logoutUser,
    initializeSampleData,
} from '@/lib/localStorage'
import toast from 'react-hot-toast'

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Initialize sample data on first load
        initializeSampleData()

        // Get current user from localStorage
        const currentUser = getCurrentUser()
        setUser(currentUser)
        setLoading(false)
    }, [])

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            setLoading(true)
            const loggedInUser = loginUser(email, password)
            setUser(loggedInUser)
            toast.success(`ยินดีต้อนรับ ${loggedInUser.firstName}!`)
            return true
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
            )
            return false
        } finally {
            setLoading(false)
        }
    }

    const register = async (
        userData: Omit<User, 'id' | 'joined' | 'verified'>
    ): Promise<boolean> => {
        try {
            setLoading(true)
            const newUser = registerUser(userData)
            setUser(newUser)
            toast.success(
                `สมัครสมาชิกสำเร็จ! ยินดีต้อนรับ ${newUser.firstName}`
            )
            return true
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'เกิดข้อผิดพลาดในการสมัครสมาชิก'
            )
            return false
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        logoutUser()
        setUser(null)
        toast.success('ออกจากระบบเรียบร้อยแล้ว')
    }

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser)
        setCurrentUser(updatedUser)
        // Force re-render by updating the user state
        setTimeout(() => {
            const freshUser = getCurrentUser()
            if (freshUser) {
                setUser(freshUser)
            }
        }, 0)
    }

    return {
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isProvider: user?.type === 'provider',
        isCustomer: user?.type === 'customer',
    }
}
