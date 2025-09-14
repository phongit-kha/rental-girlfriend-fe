'use client';

import { useState } from "react";
import { Kanit } from 'next/font/google';
import { Bell, Heart, Mail, User, Phone, Calendar, CreditCard, Camera } from "lucide-react";

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] });

export default function ProfilePage() {
  const [user] = useState({
    img: "/img/p2.jpg",
    id: "1-xxxx-xxxx-x-33-7",
    username: "Lnwza007",
    name: "สมชาย โดว",
    email: "demo123@example.com",
    phone: "089-xxx-xxxx",
    birth: "01/10/2004",
    gender: "ชาย",
    interest: "หญิง",
    joined: "2025"
  });

  return (
    <main className={`${kanit.className} min-h-screen bg-[#F4F6F8] flex flex-col items-center gap-12 pt-[181px]`}>
        <div className="w-190.5 flex flex-col items-center justify-center items-center gap-8 bg-light-blue">
            {/* Profile banner */}
            <section className="flex justify-between p-7 gap-3 w-[762px] h-[160px] rounded-xl bg-[linear-gradient(133.15deg,#F24BA7_2.02%,#EF4444_98.99%)]">  
                <div className="w-65.25 h-20 flex items-end gap-3 pt-26">
                    <div className="w-20 h-20 relative">
                        <img
                        src={user.img}
                        alt="profile"
                        className="box-border w-20 h-20 rounded-full bg-cover bg-center border-[3px] border-white rounded-full"
                        />
                        <div className="absolute bottom-0 right-0 w-7 h-7 flex flex-col justify-center items-center gap-[10px] bg-white rounded-full border border-gray-300">
                            <Camera className="w-4 h-4"/>
                        </div>
                    </div>
                    
                    <div className="w-[169px] h-[62px] flex flex-col items-start gap-3">
                        <h1 className="w-[109px] h-[32px] font-bold text-[23px] leading-[140%] text-white">{user.username}</h1>
                        <p className="w-[169px] h-[18px] font-bold text-[13px] leading-[140%] text-white">ผู้ให้บริการ | เข้าร่วมตั้งแต่ {user.joined}</p>
                    </div>
                </div>

                <div className="flex justify-end items-start w-[102px] h-[34px]">
                    <a href="/provider/edit">
                        <button className="flex flex-row justify-center items-center px-4 py-2 gap-[10px] w-[102px] h-[34px] bg-[rgba(244,246,248,0.5)] rounded-md">
                            <p className="w-[70px] h-[18px] font-bold text-[13px] leading-[140%] text-white">
                                แก้ไขโปรไฟล์
                            </p>
                        </button>
                    </a>
                </div>
            </section>

            {/* Content grid */}
            <div className="w-[100%] h-82.75 flex gap-5">
                {/* Personal info */}
                <div className="w-[469px] p-6 grid gap-4 bg-white rounded-[16px] shadow-[1px_4px_16px_rgba(0,0,0,0.1)]">
                    <h2 className="w-[100px] h-[27px] font-normal text-[19px] leading-[140%] text-black">ข้อมูลส่วนตัว</h2>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Row 1 */}
                        <div className="h-[58px] flex flex-col items-start gap-1">
                            <p className="w-[93px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">รหัสบัตรประชาชน</p>
                            <div className="flex gap-2">
                                <CreditCard className="w-4 h-4 text-gray-500 mt-[10px]" />
                                <p className="h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36] mt-[9px]">{user.id}</p>
                            </div>
                        </div>
                        <div className="h-[58px] flex flex-col items-start gap-1">
                            <p className="w-[105px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">ชื่อผู้ใช้ (Username)</p>
                            <div className="flex gap-2">
                                <User className="w-4 h-4 text-gray-500 mt-[10px]" />
                                <p className="h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36] mt-[9px]">{user.username}</p>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="h-[58px] flex flex-col items-start gap-1">
                            <p className="w-[73px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">ชื่อ - นามสกุล</p>
                            <div className="flex gap-2">
                                <User className="w-4 h-4 text-gray-500 mt-[10px]" />
                                <p className="h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36] mt-[9px]">{user.name}</p>
                            </div>
                        </div>
                        <div className="h-[58px] flex flex-col items-start gap-1">
                            <p className="w-[28px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">อีเมล</p>
                            <div className="flex gap-2">
                                <Mail className="w-4 h-4 text-gray-500 mt-[10px]" />
                                <p className="h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36] mt-[9px]">{user.email}</p>
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="h-[58px] flex flex-col items-start gap-1">
                            <p className="w-[71px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">เบอร์โทรศัพท์</p>
                            <div className="flex gap-2">
                                <Phone className="w-4 h-4 text-gray-500 mt-[10px]" />
                                <p className="h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36] mt-[9px]">{user.phone}</p>
                            </div>
                        </div>
                        <div className="h-[58px] flex flex-col items-start gap-1">
                            <p className="w-[35px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">วันเกิด</p>
                            <div className="flex gap-2">
                                <Calendar className="w-4 h-4 text-gray-500 mt-[10px]" />
                                <p className="h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36] mt-[9px]">{user.birth}</p>
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="h-[18px] flex items-start gap-2">
                            <p className="w-[22px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">เพศ</p>
                            <p className="w-[22px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">{user.gender}</p>
                        </div>
                        <div  className="h-[18px] flex items-start gap-2">
                            <p className="w-[57px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">เพศที่สนใจ</p>
                            <p className="w-[28px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">{user.interest}</p>
                        </div>
                    </div>
                </div>
                {/* Account settings */}
                <div className="w-68.25 h-54.75 bg-white shadow rounded-[16px] p-6 flex flex-col gap-4 shadow-[1px_4px_16px_rgba(0,0,0,0.1)]">
                    <h2 className="w-[114px] h-[27px] font-normal text-[19px] leading-[140%] text-black">การตั้งค่าบัญชี</h2>
                    <div className="flex flex-col gap-1">
                        <button className="flex flex-row items-center px-4 py-2 gap-[10px] w-[225px] h-[40px] rounded-md">
                            <p className="h-[24px] font-inter not-italic font-medium text-[14px] leading-[24px] text-[#020617]">เปลี่ยนรหัสผ่าน</p>
                        </button>
                        <button className="flex flex-row items-center px-4 py-2 gap-[10px] w-[225px] h-[40px] rounded-md">
                            <p className="h-[24px] font-inter not-italic font-medium text-[14px] leading-[24px] text-[#020617]">ความเป็นส่วนตัว</p>
                        </button>
                        <button className="flex flex-row items-center px-4 py-2 gap-[10px] w-[225px] h-[40px] rounded-md">
                            <p className="h-[24px] font-inter not-italic font-medium text-[14px] leading-[24px] text-[#F24472]">ลบบัญชี</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
