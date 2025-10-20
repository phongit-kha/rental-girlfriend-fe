'use client'

import { useState } from 'react'
import {
    Clock,
    MapPin,
    Star,
    Heart,
    Shield,
    Calendar,
    MessageCircle,
    Award,
} from 'lucide-react'

export default function ServiceDetailPage() {
    const [isFavorite, setIsFavorite] = useState(false)

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
    }

    const handleBooking = () => {
        // Handle booking logic
        console.log('Booking clicked')
    }

    const handleMessage = () => {
        // Handle message logic
        console.log('Message clicked')
    }

    // Mock reviews data
    const reviews = [
        {
            id: 1,
            rating: 5,
            comment: 'บริการดีมาก น่ารักและเป็นกันเอง แนะนำเลยค่ะ',
            createdAt: '2024-01-15',
        },
        {
            id: 2,
            rating: 4,
            comment: 'สนุกดี เวลาผ่านไปเร็วมาก ขอบคุณสำหรับประสบการณ์ดีๆ',
            createdAt: '2024-01-10',
        },
        {
            id: 3,
            rating: 5,
            comment: 'ประทับใจมาก จะจองอีกแน่นอน',
            createdAt: '2024-01-05',
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Profile */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Header */}
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                            <div className="relative h-64">
                                <img
                                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    alt="นางสาวสมใจ"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h1 className="mb-2 text-3xl font-bold">
                                        นางสาวสมใจ
                                    </h1>
                                    <div className="flex items-center space-x-4 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="h-4 w-4" />
                                            <span>24 ปี</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>กรุงเทพมหานคร</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 fill-current text-yellow-400" />
                                            <span>4.8 (156 รีวิว)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                รายละเอียด
                            </h2>
                            <p className="mb-6 leading-relaxed text-gray-600">
                                สวัสดีค่ะ ฉันชื่อสมใจ
                                เป็นคนร่าเริงและชอบทำกิจกรรมต่างๆ ชอบดูหนัง
                                ฟังเพลง และเที่ยวชมสถานที่ต่างๆ
                                มีประสบการณ์ในการเป็นเพื่อนคู่คิดมาแล้วกว่า 2 ปี
                                พร้อมให้คำปรึกษาและเป็นเพื่อนที่ดีให้กับทุกคน
                            </p>

                            {/* Interests */}
                            <div className="mb-6">
                                <h3 className="mb-3 text-lg font-medium text-gray-900">
                                    ประเภทบริการ
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-lg bg-pink-50 px-3 py-1 text-sm text-pink-600">
                                        ดูหนัง
                                    </span>
                                    <span className="rounded-lg bg-pink-50 px-3 py-1 text-sm text-pink-600">
                                        ฟังเพลง
                                    </span>
                                    <span className="rounded-lg bg-pink-50 px-3 py-1 text-sm text-pink-600">
                                        เที่ยวชมสถานที่
                                    </span>
                                    <span className="rounded-lg bg-pink-50 px-3 py-1 text-sm text-pink-600">
                                        อ่านหนังสือ
                                    </span>
                                    <span className="rounded-lg bg-pink-50 px-3 py-1 text-sm text-pink-600">
                                        ถ่ายรูป
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    รีวิวจากลูกค้า ({reviews.length})
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <Star className="h-5 w-5 fill-current text-yellow-400" />
                                    <span className="text-lg font-semibold">
                                        4.8
                                    </span>
                                    <span className="text-gray-500">
                                        จาก 156 รีวิว
                                    </span>
                                </div>
                            </div>

                            {reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {reviews.slice(0, 5).map((review) => (
                                        <div
                                            key={review.id}
                                            className="border-b border-gray-100 pb-4 last:border-b-0"
                                        >
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="flex items-center space-x-1">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < review.rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(
                                                        review.createdAt
                                                    ).toLocaleDateString(
                                                        'th-TH'
                                                    )}
                                                </span>
                                            </div>
                                            <p className="text-gray-600">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center text-gray-500">
                                    ยังไม่มีรีวิว
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Pricing */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                ราคาบริการ
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">
                                        ต่อชั่วโมง
                                    </span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        ฿500
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">
                                        ต่อวัน (8 ชั่วโมง)
                                    </span>
                                    <span className="text-xl font-semibold text-gray-900">
                                        ฿3,000
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={handleBooking}
                                    className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white transition-all duration-200 hover:cursor-pointer hover:from-pink-600 hover:to-rose-600"
                                >
                                    <Calendar className="mr-2 inline h-5 w-5" />
                                    จองเลย
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                สถิติ
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Award className="h-5 w-5 text-pink-500" />
                                        <span className="text-gray-600">
                                            การจองทั้งหมด
                                        </span>
                                    </div>
                                    <span className="font-semibold">124</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Star className="h-5 w-5 text-yellow-500" />
                                        <span className="text-gray-600">
                                            คะแนนเฉลี่ย
                                        </span>
                                    </div>
                                    <span className="font-semibold">4.8</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
