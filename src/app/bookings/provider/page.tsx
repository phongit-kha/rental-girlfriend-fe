'use client'

import React, { useState, useEffect } from 'react'
import {
    Calendar,
    Clock,
    User,
    MessageCircle,
    Star,
    AlertCircle,
    CheckCircle,
    XCircle,
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

// Mock booking data for providers
const mockProviderBookings: Booking[] = [
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
        status: 'pending',
        specialRequests: 'อยากดูหนังแอคชั่น ขอหนังที่มีซับไตเติลภาษาไทย',
        createdAt: '2024-12-20T10:00:00Z',
    },
    {
        id: '2',
        customerId: '4',
        providerId: '1',
        serviceId: '4',
        serviceName: 'งานสังคมและปาร์ตี้',
        date: '2024-12-28',
        startTime: '18:00',
        endTime: '23:00',
        totalHours: 5,
        totalAmount: 3000,
        depositAmount: 1500,
        status: 'confirmed',
        specialRequests:
            'งานปาร์ตี้บริษัท ต้องแต่งตัวเป็นทางการ สีดำหรือน้ำเงินเข้ม',
        createdAt: '2024-12-22T15:30:00Z',
    },
    {
        id: '3',
        customerId: '4',
        providerId: '1',
        serviceId: '1',
        serviceName: 'เดทดูหนังโรแมนติก',
        date: '2024-12-15',
        startTime: '14:00',
        endTime: '17:00',
        totalHours: 3,
        totalAmount: 1500,
        depositAmount: 750,
        status: 'completed',
        specialRequests: 'อยากดูหนังโรแมนติก และทานป๊อปคอร์นรสคาราเมล',
        createdAt: '2024-12-10T09:15:00Z',
    },
    {
        id: '4',
        customerId: '4',
        providerId: '1',
        serviceId: '4',
        serviceName: 'งานสังคมและปาร์ตี้',
        date: '2024-11-20',
        startTime: '19:00',
        endTime: '22:00',
        totalHours: 3,
        totalAmount: 1800,
        depositAmount: 900,
        status: 'cancelled',
        specialRequests: 'งานเลี้ยงรุ่น ต้องแต่งตัวสบายๆ',
        createdAt: '2024-11-15T14:20:00Z',
    },
]

const ProviderBookings: React.FC = () => {
    const { user, isAuthenticated, isProvider } = useAuthContext()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [customers, setCustomers] = useState<{ [key: string]: UserType }>({})
    const [activeTab, setActiveTab] = useState<
        'pending' | 'confirmed' | 'completed' | 'cancelled'
    >('pending')

    useEffect(() => {
        if (user && isAuthenticated && isProvider) {
            loadBookings()
        }
    }, [user, isAuthenticated, isProvider])

    const loadBookings = () => {
        if (!user || user.type !== 'provider') return

        // Filter bookings for current provider
        const providerBookings = mockProviderBookings.filter(
            (booking) => booking.providerId === user.id
        )

        setBookings(providerBookings)

        // Load customer data
        const users = getUsers()
        const customerData: { [key: string]: UserType } = {}

        providerBookings.forEach((booking) => {
            const customer = users.find((u) => u.id === booking.customerId)
            if (customer) {
                customerData[booking.customerId] = customer
            }
        })

        setCustomers(customerData)
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

    const filteredBookings = bookings.filter(
        (booking) => booking.status === activeTab
    )

    const handleConfirmBooking = (bookingId: string) => {
        toast(
            (t) => (
                <div className="flex flex-col gap-3">
                    <p className="font-medium text-gray-900">
                        คุณต้องการยืนยันการจองนี้หรือไม่?
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setBookings((prev) =>
                                    prev.map((booking) =>
                                        booking.id === bookingId
                                            ? {
                                                  ...booking,
                                                  status: 'confirmed' as const,
                                              }
                                            : booking
                                    )
                                )
                                toast.dismiss(t.id)
                                toast.success('ยืนยันการจองเรียบร้อยแล้ว', {
                                    duration: 3000,
                                })
                            }}
                            className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
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

    const handleRejectBooking = (bookingId: string) => {
        toast(
            (t) => (
                <div className="flex flex-col gap-3">
                    <p className="font-medium text-gray-900">
                        คุณต้องการปฏิเสธการจองนี้หรือไม่?
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
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
                                toast.error('ปฏิเสธการจองเรียบร้อยแล้ว', {
                                    duration: 3000,
                                })
                            }}
                            className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                        >
                            ปฏิเสธ
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

    const handleCompleteBooking = (bookingId: string) => {
        toast(
            (t) => (
                <div className="flex flex-col gap-3">
                    <p className="font-medium text-gray-900">
                        คุณต้องการทำเครื่องหมายว่าบริการนี้เสร็จสิ้นแล้วหรือไม่?
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setBookings((prev) =>
                                    prev.map((booking) =>
                                        booking.id === bookingId
                                            ? {
                                                  ...booking,
                                                  status: 'completed' as const,
                                              }
                                            : booking
                                    )
                                )
                                toast.dismiss(t.id)
                                toast.success(
                                    'ทำเครื่องหมายบริการเสร็จสิ้นแล้ว! 🎉',
                                    {
                                        duration: 4000,
                                    }
                                )
                            }}
                            className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
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

    const handleSendMessage = (customerId: string) => {
        toast.success('เปิดหน้าแชท', {
            duration: 2000,
        })
        // Here you would navigate to chat page
        // router.push(`/chat/${customerId}`)
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

    if (!isProvider) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                        เฉพาะผู้ให้บริการเท่านั้น
                    </h2>
                    <p className="mb-6 text-gray-600">
                        หน้านี้สำหรับผู้ให้บริการเท่านั้น
                    </p>
                    <Link
                        href="/bookings"
                        className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600"
                    >
                        ไปหน้าการจองของลูกค้า
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
                        จัดการการจองของลูกค้า
                    </h1>
                    <p className="text-gray-600">
                        ตรวจสอบและจัดการคำขอจองจากลูกค้าของคุณ
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    รอยืนยัน
                                </p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {
                                        bookings.filter(
                                            (b) => b.status === 'pending'
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="rounded-full bg-yellow-100 p-3">
                                <Clock className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    ยืนยันแล้ว
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {
                                        bookings.filter(
                                            (b) => b.status === 'confirmed'
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="rounded-full bg-green-100 p-3">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    เสร็จสิ้น
                                </p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {
                                        bookings.filter(
                                            (b) => b.status === 'completed'
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="rounded-full bg-blue-100 p-3">
                                <Star className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    ยกเลิก
                                </p>
                                <p className="text-2xl font-bold text-red-600">
                                    {
                                        bookings.filter(
                                            (b) => b.status === 'cancelled'
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="rounded-full bg-red-100 p-3">
                                <XCircle className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8 rounded-2xl bg-white shadow-sm">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                                activeTab === 'pending'
                                    ? 'border-b-2 border-pink-600 bg-pink-50 text-pink-600'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            รอยืนยัน
                            <span className="ml-2 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                                {
                                    bookings.filter(
                                        (b) => b.status === 'pending'
                                    ).length
                                }
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('confirmed')}
                            className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                                activeTab === 'confirmed'
                                    ? 'border-b-2 border-pink-600 bg-pink-50 text-pink-600'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            ยืนยันแล้ว
                            <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                                {
                                    bookings.filter(
                                        (b) => b.status === 'confirmed'
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
                            {activeTab === 'pending' &&
                                'ไม่มีการจองที่รอยืนยัน'}
                            {activeTab === 'confirmed' &&
                                'ไม่มีการจองที่ยืนยันแล้ว'}
                            {activeTab === 'completed' &&
                                'ไม่มีการจองที่เสร็จสิ้น'}
                            {activeTab === 'cancelled' &&
                                'ไม่มีการจองที่ถูกยกเลิก'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredBookings.map((booking) => {
                            const customer = customers[booking.customerId]

                            if (!customer) return null

                            return (
                                <div
                                    key={booking.id}
                                    className="rounded-2xl bg-white p-6 shadow-sm"
                                >
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={
                                                    customer.img ||
                                                    '/img/p1.jpg'
                                                }
                                                alt={customer.firstName}
                                                className="h-16 w-16 rounded-full object-cover"
                                            />
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {customer.firstName}{' '}
                                                    {customer.lastName}
                                                </h3>
                                                <p className="text-gray-600">
                                                    ลูกค้า
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
                                                        booking.customerId
                                                    )
                                                }
                                                className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                                            >
                                                <MessageCircle className="h-4 w-4" />
                                                <span>ส่งข้อความ</span>
                                            </button>

                                            {booking.status === 'pending' && (
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
                                                            handleRejectBooking(
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
                                                        handleCompleteBooking(
                                                            booking.id
                                                        )
                                                    }
                                                    className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                                                >
                                                    ทำเครื่องหมายเสร็จสิ้น
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

export default ProviderBookings
