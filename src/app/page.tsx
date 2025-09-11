'use client';

import Image from 'next/image';
import { Kanit } from 'next/font/google';
import { Heart } from "lucide-react";
import { Search } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { Star } from "lucide-react";

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] });

export default function HomePage() {
  return (
    <main className={`${kanit.className} min-h-screen flex items-center justify-center mt-[64px] bg-[#FEEDF633] h-[768px]`}>
      <div className="w-full max-w-[1200px] px-6 flex flex-col md:flex-row items-center justify-center">
        {/* ซ้าย: 461 x 393, gap 32px */}
        <section className="w-full md:w-[461px] md:h-[393px] flex flex-col gap-8">
          <header className="md:w-[398] md:h-[194px]">
            <h1 className="text-[48px] text-slate-900 font-bold leading-tight text-4xl md:text-5xl">
              พบกับแฟนเช่า<br />ที่ใช่สำหรับคุณ
            </h1>
            <p className="font-[16px] mt-4 text-slate-600 font-normal">
              Platform ที่คู่เดตและเพื่อนทำกิจกรรมที่ปลอดภัยและเชื่อถือได้
              เติมสีสันให้ชีวิตด้วยประสบการณ์ใหม่ ๆ ที่น่าจดจำ
            </p>
          </header>

          <div className="flex items-center gap-3">
            <button className="w-[144px] h-[44px] px-4 py-2 rounded-md text-[13px] text-white font-semibold bg-gradient-to-r from-pink-600 to-rose-500 shadow">
              <div className="flex flex-row justify-center items-center gap-[5px]">
                <Search size={16} />
                <div>เริ่มค้นหาเลย</div>
              </div>
            </button>
            <button className="w-[165px] h-[44px] px-4 py-2 rounded-md text-[13px] font-semibold text-pink-600 border border-pink-600 bg-white">
              <div className="flex flex-row justify-center items-center gap-[5px]">
                <Heart size={16} />
                <div>สมัครเป็นผู้ให้บริการ</div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-[28px] flex justify-center font-bold text-pink-600 to-rose-500 mb-[8px]">1,200+</div>
              <div className="text-center text-sm text-slate-500">ผู้ให้บริการที่ผ่านการตรวจสอบ</div>
            </div>
            <div>
              <div className="text-[28px] flex justify-center font-bold text-pink-600 to-rose-500 mb-[8px]">15,000+</div>
              <div className="text-center text-sm text-slate-500">การจองที่สำเร็จ</div>
            </div>
            <div>
              <div className="text-[28px] flex justify-center font-bold text-pink-600 to-rose-500 mb-[8px]">4.9</div>
              <div className="text-center text-sm text-slate-500">คะแนนความพึงพอใจ</div>
            </div>
          </div>
        </section>

        {/* ขวา: 515 x 360, เส้นขอบ 1px #BBBEC5 */}
        <aside className="w-full md:w-[515px] md:h-[360px]  rounded-2xl relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/img/party.jpg"
              alt="กิจกรรมสังสรรค์"
              width={468}
              height={312}
              className="rounded-[24px] object-cover"
              priority
            />
          </div>

          <div className="w-[177px] h-[56px] absolute top-4 left-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white/95 backdrop-blur px-4 py-2 shadow-sm">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <div className="leading-tight">
              <div className="text-[14px] font-bold text-slate-800">ปลอดภัย 100%</div>
              <div className="text-[12px] text-slate-500">ตรวจสอบตัวตนแล้ว</div>
            </div>
          </div>

          <div className="w-[146px] h-[58px] absolute bottom-4 right-4 rounded-xl border border-slate-200 bg-white/95 backdrop-blur px-4 py-2 shadow-sm">
            <div className="flex flex-row items-center gap-3">
              <div className="flex -space-x-2">
                <Image src="/img/p1.jpg" alt="ผู้ใช้ 1" width={24} height={24}
                      className="rounded-full ring-2 ring-white object-cover" />
                <Image src="/img/p2.jpg" alt="ผู้ใช้ 2" width={24} height={24}
                      className="rounded-full ring-2 ring-white object-cover" />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-[18px] font-bold text-slate-800">4.9</span>
                </div>
                <div className="text-[13px] text-slate-500 -mt-0.5">รีวิวจากผู้ใช้</div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}

