export default function AccountSettings() {
    return (
        <div className="flex h-54.75 w-68.25 flex-col gap-4 rounded-[16px] bg-white p-6 shadow-[1px_4px_16px_rgba(0,0,0,0.1)]">
            <h2 className="h-[27px] w-[114px] text-[19px] leading-[140%] font-normal text-black">
                การตั้งค่าบัญชี
            </h2>
            <div className="flex flex-col gap-1">
                <button className="flex h-[40px] w-[225px] cursor-pointer flex-row items-center gap-[10px] rounded-md px-4 py-2 hover:underline">
                    <p className="font-inter h-[24px] text-[14px] leading-[24px] font-medium text-[#020617] not-italic">
                        เปลี่ยนรหัสผ่าน
                    </p>
                </button>
                <button className="flex h-[40px] w-[225px] cursor-pointer flex-row items-center gap-[10px] rounded-md px-4 py-2 hover:underline">
                    <p className="font-inter h-[24px] text-[14px] leading-[24px] font-medium text-[#020617] not-italic">
                        ความเป็นส่วนตัว
                    </p>
                </button>
                <button className="flex h-[40px] w-[225px] cursor-pointer flex-row items-center gap-[10px] rounded-md px-4 py-2 decoration-pink-500 hover:underline">
                    <p className="font-inter h-[24px] text-[14px] leading-[24px] font-medium text-[#F24472] not-italic">
                        ลบบัญชี
                    </p>
                </button>
            </div>
        </div>
    )
}
