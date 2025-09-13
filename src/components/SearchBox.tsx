"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBox({
  placeholder = "ค้นหาชื่อ, ความสนใจ, หรือประเภทบริการ...",
  defaultQuery = "",
}: {
  placeholder?: string;
  defaultQuery?: string;
}) {
  const [q, setQ] = useState(defaultQuery);
  const [open, setOpen] = useState(false);

  const [activity, setActivity] = useState("");
  const [gender, setGender] = useState("");

  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/services?q=${encodeURIComponent(query)}` : "/services");
  }

  return (
    <form onSubmit={submit} className="relative w-full">
      {/* แถวค้นหา */}
      <div className="relative">
        <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="text-[13px] h-12 md:h-14 w-full rounded-md border border-gray-300/40 bg-white pl-12 pr-40 text-gray-500 placeholder:text-[#BFC7D8] focus:outline-none focus:ring-1 focus:ring-black focus:black"
        />

        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="filters"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors
            ${open ? "bg-[#FEECF1] border-[#FBC7E4] text-[#F24472]" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            <SlidersHorizontal className={'h-4 w-4'} />
          </button>
          <button
            type="submit"
            className="rounded-md px-4 py-2 mr-1 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500"
          >
            ค้นหา
          </button>
        </div>
      </div>

      {/* แถวตัวกรอง (เปิด/ปิดจะดันด้านล่างลงเอง) */}
        <div id="filters" className={open ? "mt-3 block" : "mt-3 hidden"}>
        <hr className="border-0 border-t border-t-[#E1E7F4]/60 mb-3" />
        <hr className="border-0 border-t border-t-[#E1E7F4]/60 mb-3" />

        {/* === ฟิลด์ตัวกรอง พร้อม label ด้านบน === */}
        <div className="flex flex-between">
            {/* กิจกรรมที่สนใจ */}
            <div>
                <div className="mb-2 text-sm font-medium text-gray-700">กิจกรรมที่สนใจ</div>
                <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className={`h-10 w-180 rounded-md border border-gray-300/40 bg-white pl-3 pr-3 text-sm ${
                    activity ? "text-gray-700" : "text-[#BFC7D8]"}`}
                >
                <option value="">เลือกกิจกรรมที่สนใจ</option>
                </select>
            </div>

            {/* เพศ */}
            <div>
            <div className="mb-2 text-sm font-medium text-gray-700 ml-8.75">เพศ</div>
                <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={`h-10 w-25 rounded-md border border-gray-300/40 bg-white px-3 text-sm ml-8 mr-8 ${
                    gender ? "text-gray-700" : "text-[#BFC7D8]"}`}
                >
                <option value="">เลือกเพศ</option>
                </select>
            </div>

            {/* ราคาต่อชั่วโมง */}
            <div>
            <div className="mb-2 text-sm font-medium text-gray-700">ราคาต่อชั่วโมง</div>
            <div className="flex items-center gap-2">
                <input
                placeholder="ขั้นต่ำ"
                className="text-center h-10 w-30 rounded-md border border-gray-300/40 bg-white px-3 text-sm placeholder:text-[#BFC7D8]" // เอา text-center ออก + เปลี่ยนสี placeholder
                />
                <span className="text-gray-400">-</span>
                <input
                placeholder="สูงสุด"
                className="text-center h-10 w-30 rounded-md border border-gray-300/40 bg-white px-3 text-sm placeholder:text-[#BFC7D8]" // เอา text-center ออก + เปลี่ยนสี placeholder
                />
            </div>
            </div>

            {/* คะแนนขั้นต่ำ */}
            <div>
            <div className="mb-2 text-sm font-medium text-gray-700 ml-7.5">คะแนนขั้นต่ำ</div>
            <select className="h-10 w-40 rounded-md border border-gray-300/40 bg-white px-3 text-sm text-[#BFC7D8] ml-7">
                <option>เลือกคะแนนขั้นต่ำ</option>
            </select>
            </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-3">
            <button
            type="button"
            className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-600"
            >
            ล้างตัวกรอง
            </button>
            <button
            type="button"
            className="rounded-md px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500"
            >
            ใช้ตัวกรอง
            </button>
        </div>
        </div>
    </form>
  );
}
