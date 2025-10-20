'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Calendar, Clock, MessageSquare, AlertCircle } from 'lucide-react'

export default function BookingPage() {
    const { id } = useParams()
    const router = useRouter()

    // Static provider data (replacing variables with plain text)
    const provider = {
        id: '1',
        name: 'นางสาวสมใจ',
        age: 24,
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
        rating: 4.8,
        totalReviews: 156,
        hourlyRate: 500,
        dailyRate: 3000,
        userType: 'provider',
    }

    const [bookingData, setBookingData] = useState({
        date: '',
        startTime: '',
        endTime: '',
        duration: 1,
        serviceType: 'hourly',
        specialRequests: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        // Simple check - in real app would check authentication
        if (!id) {
            router.push('/services')
            return
        }
    }, [id, router])

    const calculateTotal = () => {
        if (!provider) return 0

        if (bookingData.serviceType === 'daily') {
            return provider.dailyRate
        } else {
            return provider.hourlyRate * bookingData.duration
        }
    }

    const calculateDeposit = () => {
        return Math.floor(calculateTotal() * 0.5)
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!bookingData.date) {
            newErrors.date = 'กรุณาเลือกวันที่'
        } else {
            const selectedDate = new Date(bookingData.date)
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            if (selectedDate < today) {
                newErrors.date = 'ไม่สามารถจองย้อนหลังได้'
            }
        }

        if (!bookingData.startTime) {
            newErrors.startTime = 'กรุณาเลือกเวลาเริ่มต้น'
        }

        if (bookingData.serviceType === 'hourly' && !bookingData.endTime) {
            newErrors.endTime = 'กรุณาเลือกเวลาสิ้นสุด'
        }

        if (
            bookingData.serviceType === 'hourly' &&
            bookingData.startTime &&
            bookingData.endTime
        ) {
            const start = new Date(`2000-01-01 ${bookingData.startTime}`)
            const end = new Date(`2000-01-01 ${bookingData.endTime}`)

            if (end <= start) {
                newErrors.endTime = 'เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น'
            } else {
                const duration =
                    (end.getTime() - start.getTime()) / (1000 * 60 * 60)
                setBookingData((prev) => ({ ...prev, duration }))
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm() || !provider) return

        setIsLoading(true)

        try {
            const totalAmount = calculateTotal()
            const depositAmount = calculateDeposit()

            // Simulate booking creation
            const booking = {
                id: Date.now().toString(),
                customerId: 'current-user-id',
                providerId: provider.id,
                serviceId: provider.id,
                date: bookingData.date,
                startTime: bookingData.startTime,
                endTime:
                    bookingData.serviceType === 'daily'
                        ? '23:59'
                        : bookingData.endTime,
                totalHours:
                    bookingData.serviceType === 'daily'
                        ? 8
                        : bookingData.duration,
                totalAmount,
                depositAmount,
                status: 'pending',
                paymentStatus: 'pending',
                specialRequests: bookingData.specialRequests,
            }

            // Simulate success
            setTimeout(() => {
                alert('การจองสำเร็จ! กำลังไปยังหน้าชำระเงิน')
                router.push(`/payment/${booking.id}`)
            }, 1000)
        } catch (error) {
            console.error('Booking error:', error)
            setErrors({
                general: 'เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง',
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (!provider) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-pink-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        จองบริการ
                    </h1>
                    <p className="text-gray-600">กรอกข้อมูลการจองของคุณ</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-2xl bg-white p-6 shadow-sm"
                        >
                            {errors.general && (
                                <div className="mb-6 flex items-center space-x-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                                    <AlertCircle className="h-5 w-5" />
                                    <span>{errors.general}</span>
                                </div>
                            )}

                            {/* Service Type */}
                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-medium text-gray-700">
                                    ประเภทการจอง
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setBookingData((prev) => ({
                                                ...prev,
                                                serviceType: 'hourly',
                                            }))
                                        }
                                        className={`rounded-xl border-2 p-4 transition-all hover:cursor-pointer ${
                                            bookingData.serviceType === 'hourly'
                                                ? 'border-pink-500 bg-pink-50 text-pink-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <Clock className="mx-auto mb-2 h-6 w-6" />
                                        <div className="font-medium">
                                            รายชั่วโมง
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            ฿
                                            {provider.hourlyRate.toLocaleString()}
                                            /ชั่วโมง
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setBookingData((prev) => ({
                                                ...prev,
                                                serviceType: 'daily',
                                            }))
                                        }
                                        className={`rounded-xl border-2 p-4 transition-all hover:cursor-pointer ${
                                            bookingData.serviceType === 'daily'
                                                ? 'border-pink-500 bg-pink-50 text-pink-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <Calendar className="mx-auto mb-2 h-6 w-6" />
                                        <div className="font-medium">
                                            รายวัน
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            ฿
                                            {provider.dailyRate.toLocaleString()}
                                            /วัน
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="mb-6">
                                <label
                                    htmlFor="date"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    วันที่ *
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={bookingData.date}
                                    onChange={(e) =>
                                        setBookingData((prev) => ({
                                            ...prev,
                                            date: e.target.value,
                                        }))
                                    }
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full rounded-xl border px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500 ${
                                        errors.date
                                            ? 'border-red-300'
                                            : 'border-gray-300'
                                    }`}
                                />
                                {errors.date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.date}
                                    </p>
                                )}
                            </div>

                            {/* Time */}
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="startTime"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        เวลาเริ่มต้น *
                                    </label>
                                    <input
                                        type="time"
                                        id="startTime"
                                        value={bookingData.startTime}
                                        onChange={(e) =>
                                            setBookingData((prev) => ({
                                                ...prev,
                                                startTime: e.target.value,
                                            }))
                                        }
                                        className={`w-full rounded-xl border px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500 ${
                                            errors.startTime
                                                ? 'border-red-300'
                                                : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.startTime && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.startTime}
                                        </p>
                                    )}
                                </div>

                                {bookingData.serviceType === 'hourly' && (
                                    <div>
                                        <label
                                            htmlFor="endTime"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            เวลาสิ้นสุด *
                                        </label>
                                        <input
                                            type="time"
                                            id="endTime"
                                            value={bookingData.endTime}
                                            onChange={(e) =>
                                                setBookingData((prev) => ({
                                                    ...prev,
                                                    endTime: e.target.value,
                                                }))
                                            }
                                            className={`w-full rounded-xl border px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500 ${
                                                errors.endTime
                                                    ? 'border-red-300'
                                                    : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.endTime && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.endTime}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Special Requests */}
                            <div className="mb-6">
                                <label
                                    htmlFor="specialRequests"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    ฝากถึงผู้ให้บริการ
                                </label>
                                <textarea
                                    id="specialRequests"
                                    rows={4}
                                    value={bookingData.specialRequests}
                                    onChange={(e) =>
                                        setBookingData((prev) => ({
                                            ...prev,
                                            specialRequests: e.target.value,
                                        }))
                                    }
                                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500"
                                    placeholder="เช่น สถานที่ที่ต้องการไป, กิจกรรมที่ต้องการทำ, หรือข้อกำหนดพิเศษอื่นๆ"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white transition-all duration-200 hover:cursor-pointer hover:from-pink-600 hover:to-rose-600 disabled:opacity-50"
                            >
                                {isLoading
                                    ? 'กำลังดำเนินการ...'
                                    : 'ดำเนินการจอง'}
                            </button>
                        </form>
                    </div>

                    {/* Booking Summary */}
                    <div className="space-y-6">
                        {/* Provider Info */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                ผู้ให้บริการ
                            </h3>
                            <div className="flex items-center space-x-4">
                                <img
                                    src={provider.avatar}
                                    alt={provider.name}
                                    className="h-16 w-16 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {provider.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {provider.age} ปี
                                    </div>
                                    <div className="flex items-center space-x-1 text-yellow-500">
                                        <span className="text-sm">
                                            ⭐ {provider.rating}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            ({provider.totalReviews} รีวิว)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Price Summary */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                สรุปค่าใช้จ่าย
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {bookingData.serviceType === 'daily'
                                            ? 'ค่าบริการรายวัน'
                                            : `ค่าบริการ ${bookingData.duration} ชั่วโมง`}
                                    </span>
                                    <span className="font-medium">
                                        ฿{calculateTotal().toLocaleString()}
                                    </span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>รวมทั้งหมด</span>
                                        <span>
                                            ฿{calculateTotal().toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="mt-1 flex justify-between text-sm text-gray-600">
                                        <span>เงินมัดจำ (50%)</span>
                                        <span>
                                            ฿
                                            {calculateDeposit().toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ร{' '}
                    </div>
                </div>
            </div>
        </div>
    )
}
