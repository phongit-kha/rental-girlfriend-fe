'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
    CreditCard,
    Shield,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
} from 'lucide-react'

export default function PaymentPage() {
    const { id } = useParams()
    const router = useRouter()

    // Static booking data (replacing variables with plain text)
    const booking = {
        id: '1',
        customerId: 'current-user-id',
        providerId: '1',
        date: '2024-12-25',
        startTime: '14:00',
        endTime: '18:00',
        totalHours: 4,
        totalAmount: 2000,
        depositAmount: 1000,
        status: 'pending',
        paymentStatus: 'pending',
        specialRequests: 'ต้องการไปดูหนัง',
    }

    // Static provider data (replacing variables with plain text)
    const provider = {
        id: '1',
        name: 'นางสาวสมใจ',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
        rating: 4.8,
        totalReviews: 156,
    }

    const [paymentMethod, setPaymentMethod] = useState('credit_card')
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentComplete, setPaymentComplete] = useState(false)

    useEffect(() => {
        if (!id) {
            router.push('/services')
            return
        }
    }, [id, router])

    const handlePayment = async () => {
        setIsProcessing(true)

        // Simulate payment processing
        setTimeout(() => {
            setPaymentComplete(true)
            setIsProcessing(false)
        }, 3000)
    }

    if (paymentComplete) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="mx-4 w-full max-w-md">
                    <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">
                            ชำระเงินสำเร็จ!
                        </h2>
                        <p className="mb-6 text-gray-600">
                            การจองของคุณได้รับการยืนยันแล้ว
                            ผู้ให้บริการจะติดต่อกลับในเร็วๆ นี้
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/services')}
                                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600"
                            >
                                กลับไปหน้าบริการ
                            </button>
                            <button
                                onClick={() => router.push('/profile')}
                                className="w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                ดูโปรไฟล์ของฉัน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex items-center">
                    <button
                        onClick={() => router.back()}
                        className="mr-4 p-2 text-gray-600 transition-colors hover:text-gray-800"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            ชำระเงิน
                        </h1>
                        <p className="text-gray-600">
                            ชำระเงินมัดจำเพื่อยืนยันการจอง
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Payment Form */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Payment Methods */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                เลือกวิธีการชำระเงิน
                            </h3>
                            <div className="space-y-3">
                                <label className="flex cursor-pointer items-center rounded-xl border-2 border-gray-200 p-4 transition-colors hover:border-pink-200">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="credit_card"
                                        checked={
                                            paymentMethod === 'credit_card'
                                        }
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="text-pink-600 focus:ring-pink-500"
                                    />
                                    <CreditCard className="mr-4 ml-3 h-6 w-6 text-gray-600" />
                                    <div>
                                        <div className="font-medium">
                                            บัตรเครดิต/เดบิต
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Visa, Mastercard, JCB
                                        </div>
                                    </div>
                                </label>

                                <label className="flex cursor-pointer items-center rounded-xl border-2 border-gray-200 p-4 transition-colors hover:border-pink-200">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="promptpay"
                                        checked={paymentMethod === 'promptpay'}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="text-pink-600 focus:ring-pink-500"
                                    />
                                    <div className="mr-4 ml-3 flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
                                        PP
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            PromptPay
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            โอนผ่าน QR Code
                                        </div>
                                    </div>
                                </label>

                                <label className="flex cursor-pointer items-center rounded-xl border-2 border-gray-200 p-4 transition-colors hover:border-pink-200">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="bank_transfer"
                                        checked={
                                            paymentMethod === 'bank_transfer'
                                        }
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="text-pink-600 focus:ring-pink-500"
                                    />
                                    <div className="mr-4 ml-3 flex h-6 w-6 items-center justify-center rounded bg-green-600 text-xs font-bold text-white">
                                        B
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            โอนเงินผ่านธนาคาร
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            โอนผ่านแอปธนาคาร
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Payment Details */}
                        {paymentMethod === 'credit_card' && (
                            <div className="rounded-2xl bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                    ข้อมูลบัตร
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            หมายเลขบัตร
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                วันหมดอายุ
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            ชื่อผู้ถือบัตร
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="ชื่อตามบัตร"
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        {/* Booking Details */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                รายละเอียดการจอง
                            </h3>

                            {/* Provider */}
                            <div className="mb-4 flex items-center space-x-3 border-b pb-4">
                                <img
                                    src={provider.avatar}
                                    alt={provider.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-medium">
                                        {provider.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        ⭐ {provider.rating} (
                                        {provider.totalReviews} รีวิว)
                                    </div>
                                </div>
                            </div>

                            {/* Booking Info */}
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        วันที่
                                    </span>
                                    <span className="font-medium">
                                        {new Date(
                                            booking.date
                                        ).toLocaleDateString('th-TH')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">เวลา</span>
                                    <span className="font-medium">
                                        {booking.startTime} - {booking.endTime}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        ระยะเวลา
                                    </span>
                                    <span className="font-medium">
                                        {booking.totalHours} ชั่วโมง
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                สรุปการชำระเงิน
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        ค่าบริการรวม
                                    </span>
                                    <span className="font-medium">
                                        ฿{booking.totalAmount.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-pink-600">
                                    <span>เงินมัดจำ (50%)</span>
                                    <span className="font-semibold">
                                        ฿
                                        {booking.depositAmount.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>ค่าบริการคงเหลือ</span>
                                    <span>
                                        ฿
                                        {(
                                            booking.totalAmount -
                                            booking.depositAmount
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>ยอดที่ต้องชำระ</span>
                                        <span className="text-pink-600">
                                            ฿
                                            {booking.depositAmount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Button */}
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-4 font-semibold text-white transition-all duration-200 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                                    <span>กำลังดำเนินการ...</span>
                                </>
                            ) : (
                                <>
                                    <CreditCard className="h-5 w-5" />
                                    <span>
                                        ชำระเงิน ฿
                                        {booking.depositAmount.toLocaleString()}
                                    </span>
                                </>
                            )}
                        </button>

                        {/* Terms */}
                        <div className="text-center text-xs text-gray-500">
                            การชำระเงินแสดงว่าคุณยอมรับ
                            <a
                                href="/privacy"
                                className="ml-1 text-pink-600 hover:underline"
                            >
                                ข้อกำหนดการใช้งาน
                            </a>
                            และ
                            <a
                                href="/privacy"
                                className="ml-1 text-pink-600 hover:underline"
                            >
                                นโยบายการยกเลิก
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
