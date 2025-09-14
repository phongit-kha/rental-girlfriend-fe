'use client';

import { useState } from "react";
import { Kanit } from 'next/font/google';
import { Mail, User, Phone, Calendar, CreditCard, Camera, X, Upload } from "lucide-react";

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] });

export default function ProfilePage() {
    const [user, setUser] = useState({
        type: "provider",
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

    const [changeProfile, setChangeProfile] = useState(false);

    const [tempImg, setTempImg] = useState<string | null>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setTempImg(URL.createObjectURL(file));
        }
    };

    const saveProfile = () => {
        if (tempImg) setUser({ ...user, "img": tempImg });
        setChangeProfile(false);
        setTempImg(null);
    };

    const handleClickAvatar = (url: string) => {
        setTempImg(url);
    };

    const avatars = [
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
    ];

    return (
        <main className={`${kanit.className} min-h-screen bg-[#F4F6F8] flex flex-col items-center gap-12 pt-[129px]`}>
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
                            <div onClick={() => setChangeProfile(true)} className="absolute bottom-0 right-0 w-7 h-7 flex flex-col justify-center items-center gap-[10px] bg-white rounded-full border border-gray-300">
                                <Camera className="w-4 h-4"/>
                            </div>
                        </div>
                        
                        <div className="w-[169px] h-[62px] flex flex-col items-start gap-3">
                            <h1 className="w-[109px] h-[32px] font-bold text-[23px] leading-[140%] text-white">{user.username}</h1>
                            <p className="w-[169px] h-[18px] font-bold text-[13px] leading-[140%] text-white">ผู้ให้บริการ | เข้าร่วมตั้งแต่ {user.joined}</p>
                        </div>
                    </div>

                    <div className="flex justify-end items-start w-[102px] h-[34px]">
                        <a href="/profile/edit">
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

                        <div className="grid grid-cols gap-4">
                            {/* Row 1 */}
                            <div className="flex gap-4">
                                {user.type === "provider" && (
                                    <div className="w-[202.5px] h-[58px] flex flex-col items-start gap-1">
                                        <p className="w-[93px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">รหัสบัตรประชาชน</p>
                                        <div className="flex gap-2">
                                            <CreditCard className="w-4 h-4 opacity-50 mt-[10px]" />
                                            <p className="h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36] mt-[9px]">{user.id}</p>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="w-[202.5px] h-[58px] flex flex-col items-start gap-1">
                                    <p className="w-[105px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">ชื่อผู้ใช้ (Username)</p>
                                    <div className="flex gap-2">
                                        <User className="w-4 h-4 opacity-50 mt-[10px]" />
                                        <p className="h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36] mt-[9px]">{user.username}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex gap-4">
                                <div className="w-[202.5px] h-[58px] flex flex-col items-start gap-1">
                                    <p className="w-[73px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">ชื่อ - นามสกุล</p>
                                    <div className="flex gap-2">
                                        <User className="w-4 h-4 opacity-50 mt-[10px]" />
                                        <p className="h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36] mt-[9px]">{user.name}</p>
                                    </div>
                                </div>
                                <div className="w-[202.5px] h-[58px] flex flex-col items-start gap-1">
                                    <p className="w-[28px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">อีเมล</p>
                                    <div className="flex gap-2">
                                        <Mail className="w-4 h-4 opacity-50 mt-[10px]" />
                                        <p className="h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36] mt-[9px]">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="flex gap-4">
                                <div className="w-[202.5px] h-[58px] flex flex-col items-start gap-1">
                                    <p className="w-[71px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">เบอร์โทรศัพท์</p>
                                    <div className="flex gap-2">
                                        <Phone className="w-4 h-4 opacity-50 mt-[10px]" />
                                        <p className="h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36] mt-[9px]">{user.phone}</p>
                                    </div>
                                </div>
                                <div className="w-[202.5px] h-[58px] flex flex-col items-start gap-1">
                                    <p className="w-[35px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">วันเกิด</p>
                                    <div className="flex gap-2">
                                        <Calendar className="w-4 h-4 opacity-50 mt-[10px]" />
                                        <p className="h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36] mt-[9px]">{user.birth}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="flex gap-4">
                                <div className="w-[202.5px] h-[18px] flex items-start gap-2">
                                    <p className="w-[22px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">เพศ</p>
                                    <p className="w-[22px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">{user.gender}</p>
                                </div>
                                <div  className="w-[202.5px] h-[18px] flex items-start gap-2">
                                    <p className="w-[57px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">เพศที่สนใจ</p>
                                    <p className="w-[28px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">{user.interest}</p>
                                </div>
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

            {changeProfile && (
                <div className="absolute w-[100%] h-[100%] top-0 left-0 bg-[rgba(33,43,54,0.5)]">
                    <div className="flex flex-col items-start p-6 px-4 gap-6 absolute w-[566px] h-[569px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl">
                        {/* Top Block */}
                        <div className="w-[534px] h-[27px] flex justify-between items-center gap-[69px]">
                            <div className="w-[168px] h-[27px] flex items-center gap-[12px]">
                                <div>
                                    <Camera className="text-[#F24472]"/>
                                </div>
                                <p className="font-normal text-[19px] leading-[140%] text-black">เปลี่ยนรูปโปรไฟล์</p>
                            </div>
                            <button onClick={() => {setChangeProfile(false); setTempImg(null);}} className="w-[24px] h-[24px]">
                                <X className="inset-x-1/4 inset-y-1/4 text-[#9CA1AA]"/>
                            </button>
                        </div>

                        <div className="w-[534px] h-[1px] bg-[#D9D9D9]"/>

                        <div className="w-[534px] h-[362px] flex items-start gap-[12px]">
                            <div className="w-[178px] h-[253px] flex flex-col items-start gap-[12px]">
                                {/* รูปปัจจุบัน */}
                                <div className="w-[178px] h-[114px] flex flex-col items-start gap-[12px]">
                                    <p className="w-[178px] h-[22px] font-normal text-[16px] leading-[140%] text-black">
                                        รูปปัจจุบัน
                                    </p>
                                    <div className="w-[178px] h-[80px] flex justify-center items-center">
                                        <img
                                            src={tempImg || user.img}
                                            alt="profile"
                                            className="box-border w-20 h-20 rounded-full bg-cover bg-center border-[3px] border-white rounded-full"
                                        />
                                    </div>
                                </div>
                                {/* อัปโหลดรูป */}
                                <div className="w-[178px] h-[127px] flex flex-col items-start gap-[12px]">
                                    <p className="w-[178px] h-[22px] font-normal text-[16px] leading-[140%] text-black">
                                        อัปโหลดรูป
                                    </p>
                                    <label className="flex flex-col items-center p-3 px-7 gap-2 w-[178px] h-[93px] border border-dashed border-[#6B7280] rounded-lg">
                                        <input type="file" accept="image/*" onChange={handleUpload} hidden />
                                        <Upload strokeWidth={1.5} className="w-6 h-6 text-[#6B7280]"/>
                                        <div className="flex flex-col items-start gap-1 w-[122px] h-[37px]">
                                            <p className="w-[122px] h-[18px] font-normal text-[13px] leading-[140%] text-center text-[#6B7280]">
                                                คลิกเพื่อเลือกรูป
                                            </p>
                                            <p className="w-[122px] h-[15px] font-normal text-[11px] leading-[140%] text-center text-[#6B7280]">
                                                JPG, PNG ขนาดไม่เกิน 5MB
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="w-[344px] h-[362px] flex flex-col items-start gap-[12px]">
                                {/* เลือกรูปจากตัวอย่าง */}
                                <p className="w-[344px] h-[22px] font-normal text-[16px] leading-[140%] text-black">
                                    เลือกรูปจากตัวอย่าง
                                </p>
                                {/* รูปให้เลือก */}
                                <div className="w-[344px] h-[328px] grid grid-cols-4 gap-x-2 gap-y-1">
                                    {avatars.map((url, i) => (
                                        <img
                                            key={i}
                                            src={url}
                                            onClick={() => handleClickAvatar(url)}
                                            className={`box-border w-20 h-20 left-0 top-0 rounded-lg`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="w-[534px] h-[1px] bg-[#D9D9D9]"/>

                        <div className="w-[534px] h-[34px] flex justify-end items-center gap-[12px]">
                            <button onClick={() => {setChangeProfile(false); setTempImg(null);}} className="box-border flex justify-center items-center p-2 px-4 w-[68px] h-[34px] bg-white border border-[#E2E8F0] rounded-md">
                                <p className="w-[36px] h-[18px] font-normal text-[13px] leading-[140%] text-center text-[#6B7280]">
                                    ยกเลิก
                                </p>
                            </button>
                            <button onClick={saveProfile} disabled={!tempImg} className={`flex justify-center items-center p-2 px-4 w-[121px] h-[34px] rounded-md ${tempImg ? "bg-[linear-gradient(133.15deg,#F24BA7_2.02%,#EF4444_98.99%)]" : "bg-[linear-gradient(133.15deg,#F24BA7_2.02%,#EF4444_98.99%)] opacity-70"}`}>
                                <p className="w-[89px] h-[18px] font-bold text-[13px] leading-[140%] text-center text-white">
                                    บันทึกรูปโปรไฟล์
                                </p>
                            </button>
                        </div>
                        
                    </div>
                </div>
            )}
        </main>
    );
}

// bg-[linear-gradient(133.15deg,#F24BA7_2.02%,#EF4444_98.99%)]