import { Mail, User, Phone, Calendar, CreditCard } from "lucide-react";

export default function PersonalInfo({ user }: any) {
    return (
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
    );
}
