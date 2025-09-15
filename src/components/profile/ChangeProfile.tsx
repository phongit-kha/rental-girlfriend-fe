'use client';

import { Camera, X, Upload } from "lucide-react";

interface User {
    img: string;
}

export default function ChangeProfile({
    user,
    avatars,
    tempImg,
    setChangeProfile,
    setTempImg,
    saveProfile,
}: {
    user: User;
    avatars: string[];
    tempImg: string | null;
    setChangeProfile: (change: boolean) => void;
    setTempImg: (url: string | null) => void;
    saveProfile: () => void;
}) {

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setTempImg(URL.createObjectURL(file));
        }
    };
    
    return (
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
                                    onClick={() => setTempImg(url)}
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
    )
}