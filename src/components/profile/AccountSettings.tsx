export default function AccountSettings() {
    return (
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
    );
}
