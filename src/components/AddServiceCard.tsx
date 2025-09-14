import Link from "next/link";
import { Plus } from "lucide-react";
import PrimaryButton from "./ฺPrimaryButton";

export default function AddServiceCard({ onCreate }: { onCreate: () => void }) {
    return (
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm w-full h-110">
          <div className="text-[19px] font-medium text-gray-900">บริการของฉัน</div>

          <div className="flex h-90 flex-col items-center justify-center text-center p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2  border-gray-100 bg-gray-100">
              <Plus className="h-8 w-8 text-black" />
            </div>

            <p className="mt-6 text-[19px] font-medium text-[#000]">ยังไม่มีบริการ</p>
            <p className="mt-1 mb-4 text-[13px] text-[#000]">เริ่มสร้างบริการแรกของคุณ</p>

            <button
            onClick={onCreate}
            className="rounded-md px-4 py-2 mr-1 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500 cursor-pointer transition-all duration-300 hover:scale-105"
            >
            สร้างบริการแรก
            </button>
          </div>
        </section>
    )
}