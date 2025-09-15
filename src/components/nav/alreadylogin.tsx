'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { ChevronDown, User, Settings, LogOut } from 'lucide-react'

export default function Alreadylogin() {
    const [messageCnt, setMessageCnt] = useState(4)
    const [notifyCnt, setNotifyCnt] = useState(10)
    const [showDropdown, setShowDropdown] = useState(false)
    const { user, logout, isProvider } = useAuthContext()

    const notifyDisplay = notifyCnt > 9 ? '9+' : notifyCnt
    const messageCntDisplay = messageCnt > 9 ? '9+' : messageCnt

    return (
        <div className="flex items-center gap-[16px]">
            <button className="relative cursor-pointer transition-all duration-300 hover:scale-105">
                <Image
                    src="/img/message.svg"
                    alt="message"
                    width={28}
                    height={28}
                />
                {messageCnt > 0 && (
                    <div className="absolute -top-0 -right-1 flex h-[15px] w-[14px] items-center justify-center rounded-[100px] bg-[#ef4444] text-[10px] text-white">
                        {messageCntDisplay}
                    </div>
                )}
            </button>

            <button className="relative cursor-pointer transition-all duration-300 hover:scale-105">
                <Image
                    src="/img/notify.svg"
                    alt="notice"
                    width={28}
                    height={28}
                />
                {notifyCnt > 0 && (
                    <div className="absolute -top-0 -right-1 flex h-[15px] w-[14px] items-center justify-center rounded-[100px] bg-[#ef4444] text-[10px] text-white">
                        {notifyDisplay}
                    </div>
                )}
            </button>

            <div className="relative">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex cursor-pointer items-center gap-[10px] transition-all duration-300 hover:scale-105"
                >
                    <div className="size-8">
                        <img
                            src={user?.img || '/img/p1.jpg'}
                            alt="smallprofile"
                            className="size-8 rounded-full object-cover"
                        />
                    </div>
                    <div className="text-[16px] text-[#212b36]">
                        {user?.username}
                    </div>
                    <ChevronDown
                        className={`h-4 w-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                    />
                </button>

                {showDropdown && (
                    <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                        <Link
                            href="/profile"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowDropdown(false)}
                        >
                            <User className="h-4 w-4" />
                            โปรไฟล์
                        </Link>

                        {isProvider && (
                            <Link
                                href="/servicemanage"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setShowDropdown(false)}
                            >
                                <Settings className="h-4 w-4" />
                                จัดการบริการ
                            </Link>
                        )}

                        <hr className="my-2" />

                        <button
                            onClick={() => {
                                logout()
                                setShowDropdown(false)
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="h-4 w-4" />
                            ออกจากระบบ
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
