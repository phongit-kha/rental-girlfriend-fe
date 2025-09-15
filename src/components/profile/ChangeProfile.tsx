'use client'

import { useState } from 'react'
import { Camera, X, Upload, Check } from 'lucide-react'
import Image from 'next/image'

interface User {
    img: string
}

export default function ChangeProfile({
    user,
    avatars,
    tempImg,
    setChangeProfile,
    setTempImg,
    saveProfile,
}: {
    user: User
    avatars: string[]
    tempImg: string | null
    setChangeProfile: (change: boolean) => void
    setTempImg: (url: string | null) => void
    saveProfile: () => void
}) {
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0]
            setTempImg(URL.createObjectURL(file))
        }
    }

    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)

    return (
        <div className="absolute top-0 left-0 h-[100%] w-[100%] bg-[rgba(33,43,54,0.5)]">
            <div className="absolute top-1/2 left-1/2 flex h-[569px] w-[566px] -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-6 rounded-xl bg-white p-6 px-4">
                {/* Top Block */}
                <div className="flex h-[27px] w-[534px] items-center justify-between gap-[69px]">
                    <div className="flex h-[27px] w-[168px] items-center gap-[12px]">
                        <div>
                            <Camera className="text-[#F24472]" />
                        </div>
                        <p className="text-[19px] leading-[140%] font-normal text-black">
                            เปลี่ยนรูปโปรไฟล์
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setChangeProfile(false)
                            setTempImg(null)
                        }}
                        className="h-[24px] w-[24px]"
                    >
                        <X className="inset-x-1/4 inset-y-1/4 text-[#9CA1AA]" />
                    </button>
                </div>

                <div className="h-[1px] w-[534px] bg-[#D9D9D9]" />

                <div className="flex h-[362px] w-[534px] items-start gap-[12px]">
                    <div className="flex w-[178px] flex-col items-start gap-[12px]">
                        {/* รูปปัจจุบัน */}
                        <div className="flex h-[114px] w-[178px] flex-col items-start gap-[12px]">
                            <p className="h-[22px] w-[178px] text-[16px] leading-[140%] font-normal text-black">
                                รูปปัจจุบัน
                            </p>
                            <div className="flex h-[80px] w-[178px] items-center justify-center">
                                <Image
                                    src={user.img}
                                    alt="รูปโปรไฟล์ปัจจุบัน"
                                    width={80}
                                    height={80}
                                    className="box-border h-20 w-20 rounded-full border-[3px] border-white bg-cover bg-center"
                                />
                            </div>
                        </div>
                        {/* ตัวอย่าง */}
                        {tempImg && (
                            <div className="flex h-[114px] w-[178px] flex-col items-start gap-[12px]">
                                <p className="h-[22px] w-[178px] text-[16px] leading-[140%] font-normal text-black">
                                    ตัวอย่าง
                                </p>
                                <div className="flex h-[80px] w-[178px] items-center justify-center">
                                    <Image
                                        src={tempImg}
                                        alt="ตัวอย่างรูปโปรไฟล์"
                                        width={80}
                                        height={80}
                                        className="box-border h-20 w-20 rounded-full border-[3px] border-white bg-cover bg-center"
                                    />
                                </div>
                            </div>
                        )}
                        {/* อัปโหลดรูป */}
                        <div className="flex h-[127px] w-[178px] flex-col items-start gap-[12px]">
                            <p className="h-[22px] w-[178px] text-[16px] leading-[140%] font-normal text-black">
                                อัปโหลดรูป
                            </p>
                            <label className="flex h-[93px] w-[178px] flex-col items-center gap-2 rounded-lg border border-dashed border-[#6B7280] p-3 px-7">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        handleUpload(e)
                                        setSelectedAvatar(null)
                                    }}
                                    hidden
                                />
                                <Upload
                                    strokeWidth={1.5}
                                    className="h-6 w-6 text-[#6B7280]"
                                />
                                <div className="flex h-[37px] w-[122px] flex-col items-start gap-1">
                                    <p className="h-[18px] w-[122px] text-center text-[13px] leading-[140%] font-normal text-[#6B7280]">
                                        คลิกเพื่อเลือกรูป
                                    </p>
                                    <p className="h-[15px] w-[122px] text-center text-[11px] leading-[140%] font-normal text-[#6B7280]">
                                        JPG, PNG ขนาดไม่เกิน 5MB
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="flex h-[362px] w-[344px] flex-col items-start gap-[12px]">
                        {/* เลือกรูปจากตัวอย่าง */}
                        <p className="h-[22px] w-[344px] text-[16px] leading-[140%] font-normal text-black">
                            เลือกรูปจากตัวอย่าง
                        </p>
                        {/* รูปให้เลือก */}
                        <div className="grid h-[328px] w-[344px] grid-cols-4 gap-x-2 gap-y-1">
                            {avatars.map((url, i) => (
                                <div key={i} className="relative">
                                    <Image
                                        key={i}
                                        src={url}
                                        alt={`ตัวเลือกรูปโปรไฟล์ ${i + 1}`}
                                        width={80}
                                        height={80}
                                        onClick={() => {
                                            setTempImg(url)
                                            setSelectedAvatar(url)
                                        }}
                                        className={`top-0 left-0 box-border h-20 w-20 cursor-pointer rounded-lg ${selectedAvatar === url ? 'border-2 border-[#F24472]' : ''}`}
                                    />
                                    {selectedAvatar === url && (
                                        <div className="">
                                            <div className="absolute top-1/2 left-1/2 z-1 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F24472]">
                                                <Check
                                                    strokeWidth={1.25}
                                                    className="z-2 h-6 w-6 text-white"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="h-[1px] w-[534px] bg-[#D9D9D9]" />

                <div className="flex h-[34px] w-[534px] items-center justify-end gap-[12px]">
                    <button
                        onClick={() => {
                            setChangeProfile(false)
                            setTempImg(null)
                        }}
                        className="box-border flex h-[34px] w-[68px] items-center justify-center rounded-md border border-[#E2E8F0] bg-white p-2 px-4"
                    >
                        <p className="h-[18px] w-[36px] text-center text-[13px] leading-[140%] font-normal text-[#6B7280]">
                            ยกเลิก
                        </p>
                    </button>
                    <button
                        onClick={saveProfile}
                        disabled={!tempImg}
                        className={`flex h-[34px] w-[121px] items-center justify-center rounded-md p-2 px-4 ${tempImg ? 'bg-[linear-gradient(133.15deg,#F24BA7_2.02%,#EF4444_98.99%)]' : 'bg-[linear-gradient(133.15deg,#F24BA7_2.02%,#EF4444_98.99%)] opacity-70'}`}
                    >
                        <p className="h-[18px] w-[89px] text-center text-[13px] leading-[140%] font-bold text-white">
                            บันทึกรูปโปรไฟล์
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}
