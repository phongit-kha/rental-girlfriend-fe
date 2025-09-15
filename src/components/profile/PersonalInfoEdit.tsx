'use client'

import { Mail, User, Phone, Calendar, CreditCard, Save } from "lucide-react";

export default function PersonalInfoEdit({
    user,
    draft,
    handleDraftChange,
    handleSave,
}: {
    user: any;
    draft: any;
    handleDraftChange: (key: string, value: string) => void;
    handleSave: (e: React.FormEvent) => void;
}) {
    return (
        <form onSubmit={handleSave} className="w-[469px] p-6 grid gap-4 bg-white rounded-[16px] shadow-[1px_4px_16px_rgba(0,0,0,0.1)]">
            <h2 className="w-[100px] h-[27px] font-normal text-[19px] leading-[140%] text-black">ข้อมูลส่วนตัว</h2>
            <div className="grid grid-cols gap-4">
                {/* Row 1 */}
                <div className="h-[58px] flex gap-4">
                    {user.type === "provider" && (
                        <div className="w-[202.5px] h-[58px] flex flex-col items-start gap-1 relative">
                            <p className="w-[93px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">รหัสบัตรประชาชน</p>
                            <input 
                                type="text" 
                                value={draft.id} onChange={(e) => handleDraftChange("id", e.target.value)} 
                                className="box-border flex flex-row items-center px-3 py-2 gap-2 pl-9 w-[202.5px] h-[36px] border border-[#E1E7F4] rounded-md font-normal text-[13px] leading-[140%] text-[#212B36] focus:outline-2 focus:outline-pink-500">
                            </input>
                            <div className="absolute left-3 top-8">
                                <CreditCard className="w-4 h-4 opacity-50" />
                            </div>
                        </div>
                    )}
                    
                    <div className="w-[202.5px] h-[58px] flex flex-col items-start gap-1 relative">
                        <p className="w-[105px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">ชื่อผู้ใช้ (Username)</p>
                        <input 
                            type="text" 
                            value={draft.username} onChange={(e) => handleDraftChange("username", e.target.value)} 
                            className="box-border flex flex-row items-center px-3 py-2 gap-2 pl-9 w-[202.5px] h-[36px] border border-[#E1E7F4] rounded-md font-normal text-[13px] leading-[140%] text-[#212B36] focus:outline-2 focus:outline-pink-500">
                        </input>
                        <div className="absolute left-3 top-8">
                            <User className="w-4 h-4 opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="h-[58px] flex gap-4">
                    <div className="w-[202.5px] h-[58px] flex flex-col items-start gap-1 relative">
                        <p className="w-[73px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">ชื่อ - นามสกุล</p>
                        <input 
                            type="text" 
                            value={draft.name} onChange={(e) => handleDraftChange("name", e.target.value)} 
                            className="box-border flex flex-row items-center px-3 py-2 gap-2 pl-9 w-[202.5px] h-[36px] border border-[#E1E7F4] rounded-md font-normal text-[13px] leading-[140%] text-[#212B36] focus:outline-2 focus:outline-pink-500">
                        </input>
                        <div className="absolute left-3 top-8">
                            <User className="w-4 h-4 opacity-50" />
                            
                        </div>
                    </div>

                    <div className="w-[202.5px] h-[58px] flex flex-col items-start gap-1 relative">
                        <p className="w-[28px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">อีเมล</p>
                        <input 
                            type="text" 
                            value={draft.email} onChange={(e) => handleDraftChange("email", e.target.value)} 
                            className="box-border flex flex-row items-center px-3 py-2 gap-2 pl-9 w-[202.5px] h-[36px] border border-[#E1E7F4] rounded-md font-normal text-[13px] leading-[140%] text-[#212B36] focus:outline-2 focus:outline-pink-500">
                        </input>
                        <div className="absolute left-3 top-8">
                            <Mail className="w-4 h-4 opacity-50" />            
                        </div>
                    </div>
                </div>

                {/* Row 3 */}
                <div className="h-[58px] flex gap-4">
                    <div className="w-[202.5px] h-[58px] flex flex-col items-start gap-1 relative">
                        <p className="w-[71px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">เบอร์โทรศัพท์</p>
                        <input 
                            type="text" 
                            value={draft.phone} onChange={(e) => handleDraftChange("phone", e.target.value)} 
                            className="box-border flex flex-row items-center px-3 py-2 gap-2 pl-9 w-[202.5px] h-[36px] border border-[#E1E7F4] rounded-md font-normal text-[13px] leading-[140%] text-[#212B36] focus:outline-2 focus:outline-pink-500">
                        </input>
                        <div className="absolute left-3 top-8">
                            <Phone className="w-4 h-4 opacity-50" />
                        </div>
                    </div>

                    <div className="w-[202.5px] h-[58px] flex flex-col items-start gap-1 relative">
                        <p className="w-[35px] h-[18px] font-normal text-[13px] leading-[140%] text-[#020617]">วันเกิด</p>
                        <input 
                            type="text" 
                            value={draft.birth} onChange={(e) => handleDraftChange("birth", e.target.value)} 
                            className="box-border flex flex-row items-center px-3 py-2 gap-2 pl-9 w-[202.5px] h-[36px] border border-[#E1E7F4] rounded-md font-normal text-[13px] leading-[140%] text-[#212B36] focus:outline-2 focus:outline-pink-500">
                        </input>
                        <div className="absolute left-3 top-8">
                            <Calendar className="w-4 h-4 opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Row 4 */}
                <div className="h-[40px] flex gap-4">
                    <div className="w-[202.5px] h-[40px] flex items-center gap-2">
                        <p className="w-[22px] h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36]">เพศ</p>
                        <select
                            value={draft.gender}
                            onChange={(e) => handleDraftChange("gender", e.target.value)}
                            className="box-border flex flex-row justify-center items-center px-3 py-2 w-20 h-10 border border-[#E1E7F4] rounded-md text-[13px] leading-[140%] text-[#212B36] focus:outline-2 focus:outline-pink-500"
                        >
                            <option value="ชาย">ชาย</option>
                            <option value="หญิง">หญิง</option>
                            <option value="อื่นๆ">อื่นๆ</option>
                        </select>
                    </div>
                    
                    <div className="w-[202.5px] h-[40px] flex items-center gap-2">
                        <p className="w-[57px] h-[18px] font-normal text-[13px] leading-[140%] text-[#212B36]">เพศที่สนใจ</p>
                        <select
                            value={draft.interest}
                            onChange={(e) => handleDraftChange("interest", e.target.value)}
                            className="box-border flex flex-row justify-center items-center px-3 py-2 gap-2 w-20 h-10 border border-[#E1E7F4] rounded-md text-[13px] leading-[140%] text-[#0212B36] focus:outline-2 focus:outline-pink-500"
                        >
                            <option value="ชาย">ชาย</option>
                            <option value="หญิง">หญิง</option>
                            <option value="อื่นๆ">อื่นๆ</option>
                        </select>
                    </div>
                </div>

                {/* Row 5 */}
                <div className="w-[421px] h-[34px] flex flex-col justify-center items-end">
                    <button type="submit" className="flex flex-row justify-center items-center px-4 py-2 gap-2 w-[179px] h-[34px] rounded-md bg-[linear-gradient(133.15deg,#F24BA7_2.02%,#EF4444_98.99%)]">
                        <Save className="w-4 h-4 text-white"/>
                        <p className="w-[123px] h-[18px] font-bold text-[13px] leading-[140%] text-[#F8FAFC]">บันทึกการเปลี่ยนแปลง</p>
                    </button>
                </div>
            </div>
        </form>
    )
}