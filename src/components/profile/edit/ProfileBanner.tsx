import { Camera } from "lucide-react";

export default function ProfileBanner({ user, setChangeProfile }: any) {
    return (
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

            <div className="flex justify-end items-start w-[69px] h-[34px]">
                <a href="/profile">
                    <button className="flex flex-row justify-center items-center px-4 py-2 gap-[10px] w-[69px] h-[34px] bg-[rgba(244,246,248,0.5)] rounded-md">
                        <p className="w-[70px] h-[18px] font-bold text-[13px] leading-[140%] text-white">
                            ยกเลิก
                        </p>
                    </button>
                </a>
            </div>
        </section>
    );
}
