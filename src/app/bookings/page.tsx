'use client'

import React, { useState, useEffect } from 'react'
import {
    Calendar,
    Clock,
    User,
    MessageCircle,
    Star,
    AlertCircle,
} from 'lucide-react'
import { useAuthContext } from '@/contexts/AuthContext'
import { getUsers } from '@/lib/localStorage'
import type { User as UserType } from '@/lib/localStorage'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Mock booking interface
interface Booking {
    id: string
    customerId: string
    providerId: string
    serviceId: string
    serviceName: string
    date: string
    startTime: string
    endTime: string
    totalHours: number
    totalAmount: number
    depositAmount: number
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    specialRequests?: string
    createdAt: string
}

// Mock booking data
const mockBookings: Booking[] = [
    {
        id: '1',
        customerId: '4',
        providerId: '1',
        serviceId: '1',
        serviceName: 'เดทดูหนังโรแมนติก',
        date: '2024-12-25',
        startTime: '19:00',
        endTime: '22:00',
        totalHours: 3,
        totalAmount: 1500,
        depositAmount: 750,
        status: 'confirmed',
        specialRequests: 'อยากดูหนังแอคชั่น ขอหนังที่มีซับไตเติลภาษาไทย',
        createdAt: '2024-12-20T10:00:00Z',
    },
    {
        id: '2',
        customerId: '4',
        providerId: '2',
        serviceId: '2',
        serviceName: 'ช้อปปิ้งและทานอาหาร',
        date: '2024-12-30',
        startTime: '14:00',
        endTime: '18:00',
        totalHours: 4,
        totalAmount: 1800,
        depositAmount: 900,
        status: 'pending',
        specialRequests: 'อยากไปห้างสยามพารากอน และทานอาหารญี่ปุ่น',
        createdAt: '2024-12-22T15:30:00Z',
    },
    {
        id: '3',
        customerId: '4',
        providerId: '3',
        serviceId: '3',
        serviceName: 'ถ่ายรูปและเดินเล่น',
        date: '2024-12-15',
        startTime: '10:00',
        endTime: '16:00',
        totalHours: 6,
        totalAmount: 3300,
        depositAmount: 1650,
        status: 'completed',
        specialRequests:
            'อยากถ่ายรูปที่สวนลุมพินี และเดินเล่นที่ตลาดนัดจตุจักร',
        createdAt: '2024-12-10T09:15:00Z',
    },
    {
        id: '4',
        customerId: '4',
        providerId: '1',
        serviceId: '4',
        serviceName: 'งานสังคมและปาร์ตี้',
        date: '2024-11-20',
        startTime: '18:00',
        endTime: '23:00',
        totalHours: 5,
        totalAmount: 3000,
        depositAmount: 1500,
        status: 'cancelled',
        specialRequests: 'งานปาร์ตี้บริษัท ต้องแต่งตัวเป็นทางการ',
        createdAt: '2024-11-15T14:20:00Z',
    },
]

const Bookings: React.FC = () => {
    const { user, isAuthenticated } = useAuthContext()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [providers, setProviders] = useState<{ [key: string]: UserType }>({})
    const [activeTab, setActiveTab] = useState<
        'upcoming' | 'completed' | 'cancelled'
    >('upcoming')

    useEffect(() => {
        if (user && isAuthenticated) {
            loadBookings()
        }
    }, [user, isAuthenticated])

    const loadBookings = () => {
        if (!user) return

        // Filter bookings for current user
        const userBookings = mockBookings.filter((booking) =>
            user.type === 'customer'
                ? booking.customerId === user.id
                : booking.providerId === user.id
        )

        setBookings(userBookings)

        // Load provider/customer data
        const users = getUsers()
        const userData: { [key: string]: UserType } = {}

        userBookings.forEach((booking) => {
            const otherUserId =
                user.type === 'customer'
                    ? booking.providerId
                    : booking.customerId
            const otherUser = users.find((u) => u.id === otherUserId)
            if (otherUser) {
                userData[otherUserId] = otherUser
            }
        })

        setProviders(userData)
    }

    const getStatusColor = (status: Booking['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'confirmed':
                return 'bg-green-100 text-green-800'
            case 'completed':
                return 'bg-blue-100 text-blue-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusText = (status: Booking['status']) => {
        switch (status) {
            case 'pending':
                return 'รอยืนยัน'
            case 'confirmed':
                return 'ยืนยันแล้ว'
            case 'completed':
                return 'เสร็จสิ้น'
            case 'cancelled':
                return 'ยกเลิก'
            default:
                return status
        }
    }

    const filteredBookings = bookings.filter((booking) => {
        switch (activeTab) {
            case 'upcoming':
                return (
                    booking.status === 'pending' ||
                    booking.status === 'confirmed'
                )
            case 'completed':
                return booking.status === 'completed'
            case 'cancelled':
                return booking.status === 'cancelled'
            default:
                return true
        }
    })

    const handleCancelBooking = (bookingId: string) => {
        toast(
            (t) => (
                <div className="flex flex-col gap-3">
                    <p className="font-medium text-gray-900">
                        คุณแน่ใจหรือไม่ที่จะยกเลิกการจองนี้?
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                // Mock cancel booking
                                setBookings((prev) =>
                                    prev.map((booking) =>
                                        booking.id === bookingId
                                            ? {
                                                  ...booking,
                                                  status: 'cancelled' as const,
                                              }
                                            : booking
                                    )
                                )
                                toast.dismiss(t.id)
                                toast.success('ยกเลิกการจองเรียบร้อยแล้ว', {
                                    duration: 3000,
                                })
                            }}
                            className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                        >
                            ยืนยัน
                        </button>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="rounded bg-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-400"
                        >
                            ยกเลิก
                        </button>
                    </div>
                </div>
            ),
            {
                duration: Infinity,
            }
        )
    }

    const handleConfirmBooking = (bookingId: string) => {
        // Mock confirm booking (for providers)
        setBookings((prev) =>
            prev.map((booking) =>
                booking.id === bookingId
                    ? { ...booking, status: 'confirmed' as const }
                    : booking
            )
        )
        toast.success('ยืนยันการจองเรียบร้อยแล้ว', {
            duration: 3000,
        })
    }

    const handleReviewBooking = (bookingId: string) => {
        toast.success('เปิดหน้าให้รีวิว', {
            duration: 2000,
        })
        // Here you would navigate to review page
        // router.push(`/review/${bookingId}`)
    }

    const handleSendMessage = (userId: string) => {
        toast.success('เปิดหน้าแชท', {
            duration: 2000,
        })
        // Here you would navigate to chat page
        // router.push(`/chat/${userId}`)
    }

    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                        กรุณาเข้าสู่ระบบ
                    </h2>
                    <p className="mb-6 text-gray-600">
                        คุณต้องเข้าสู่ระบบเพื่อดูการจองของคุณ
                    </p>
                    <Link
                        href="/login"
                        className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600"
                    >
                        เข้าสู่ระบบ
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        {user?.type === 'provider'
                            ? 'การจองของลูกค้า'
                            : 'การจองของฉัน'}
                    </h1>
                    <p className="text-gray-600">
                        {user?.type === 'provider'
                            ? 'จัดการคำขอจองจากลูกค้า'
                            : 'ตรวจสอบสถานะการจองและประวัติการใช้บริการ'}
                    </p>
                </div>

                {/* Tabs */}
                <div className="mb-8 rounded-2xl bg-white shadow-sm">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                                activeTab === 'upcoming'
                                    ? 'border-b-2 border-pink-600 bg-pink-50 text-pink-600'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            การจองที่จะมาถึง
                            <span className="ml-2 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                                {
                                    bookings.filter(
                                        (b) =>
                                            b.status === 'pending' ||
                                            b.status === 'confirmed'
                                    ).length
                                }
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                                activeTab === 'completed'
                                    ? 'border-b-2 border-pink-600 bg-pink-50 text-pink-600'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            เสร็จสิ้นแล้ว
                            <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                {
                                    bookings.filter(
                                        (b) => b.status === 'completed'
                                    ).length
                                }
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('cancelled')}
                            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                                activeTab === 'cancelled'
                                    ? 'border-b-2 border-pink-600 bg-pink-50 text-pink-600'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            ยกเลิก
                            <span className="ml-2 rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                                {
                                    bookings.filter(
                                        (b) => b.status === 'cancelled'
                                    ).length
                                }
                            </span>
                        </button>
                    </div>
                </div>

                {/* Bookings List */}
                {filteredBookings.length === 0 ? (
                    <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                        <h3 className="mb-2 text-xl font-semibold text-gray-900">
                            ไม่มีการจอง
                        </h3>
                        <p className="mb-6 text-gray-600">
                            {activeTab === 'upcoming' &&
                                'ยังไม่มีการจองที่จะมาถึง'}
                            {activeTab === 'completed' &&
                                'ยังไม่มีการจองที่เสร็จสิ้น'}
                            {activeTab === 'cancelled' &&
                                'ไม่มีการจองที่ถูกยกเลิก'}
                        </p>
                        {user?.type === 'customer' && (
                            <Link
                                href="/services"
                                className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600"
                            >
                                เริ่มค้นหาบริการ
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredBookings.map((booking) => {
                            const otherUserId =
                                user?.type === 'provider'
                                    ? booking.customerId
                                    : booking.providerId
                            const otherUser = providers[otherUserId]

                            if (!otherUser) return null

                            return (
                                <div
                                    key={booking.id}
                                    className="rounded-2xl bg-white p-6 shadow-sm"
                                >
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={
                                                    otherUser.img ||
                                                    '/img/p1.jpg'
                                                }
                                                alt={otherUser.firstName}
                                                className="h-16 w-16 rounded-full object-cover"
                                            />
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {otherUser.firstName}{' '}
                                                    {otherUser.lastName}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {user?.type === 'provider'
                                                        ? 'ลูกค้า'
                                                        : 'ผู้ให้บริการ'}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    บริการ:{' '}
                                                    {booking.serviceName}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(booking.status)}`}
                                        >
                                            {getStatusText(booking.status)}
                                        </span>
                                    </div>

                                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Calendar className="h-5 w-5" />
                                            <span>
                                                {new Date(
                                                    booking.date
                                                ).toLocaleDateString('th-TH')}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Clock className="h-5 w-5" />
                                            <span>
                                                {booking.startTime} -{' '}
                                                {booking.endTime}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <User className="h-5 w-5" />
                                            <span>
                                                {booking.totalHours} ชั่วโมง
                                            </span>
                                        </div>
                                    </div>

                                    {booking.specialRequests && (
                                        <div className="mb-4 rounded-lg bg-gray-50 p-3">
                                            <h4 className="mb-1 font-medium text-gray-900">
                                                คำขอพิเศษ:
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {booking.specialRequests}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="text-lg font-semibold text-gray-900">
                                            ฿
                                            {booking.totalAmount.toLocaleString()}
                                            <span className="ml-2 text-sm font-normal text-gray-500">
                                                (มัดจำ ฿
                                                {booking.depositAmount.toLocaleString()}
                                                )
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() =>
                                                    handleSendMessage(
                                                        otherUserId
                                                    )
                                                }
                                                className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                                            >
                                                <MessageCircle className="h-4 w-4" />
                                                <span>ส่งข้อความ</span>
                                            </button>

                                            {booking.status === 'pending' &&
                                                user?.type === 'provider' && (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                handleConfirmBooking(
                                                                    booking.id
                                                                )
                                                            }
                                                            className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                                                        >
                                                            ยืนยัน
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleCancelBooking(
                                                                    booking.id
                                                                )
                                                            }
                                                            className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                                                        >
                                                            ปฏิเสธ
                                                        </button>
                                                    </>
                                                )}

                                            {booking.status === 'confirmed' && (
                                                <button
                                                    onClick={() =>
                                                        handleCancelBooking(
                                                            booking.id
                                                        )
                                                    }
                                                    className="rounded-lg border border-red-300 px-4 py-2 text-red-600 transition-colors hover:bg-red-50"
                                                >
                                                    ยกเลิก
                                                </button>
                                            )}

                                            {booking.status === 'completed' &&
                                                user?.type === 'customer' && (
                                                    <button
                                                        onClick={() =>
                                                            handleReviewBooking(
                                                                booking.id
                                                            )
                                                        }
                                                        className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2 text-white transition-all hover:from-pink-600 hover:to-rose-600"
                                                    >
                                                        <Star className="h-4 w-4" />
                                                        <span>ให้รีวิว</span>
                                                    </button>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Bookings
