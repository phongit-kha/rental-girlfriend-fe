"use client";

import { useState } from "react";
import { X, Upload, Plus, FileText, Save } from "lucide-react";
import { Kanit } from 'next/font/google';

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] });

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
};

const CATEGORIES = [
  "เดท/คู่เดท","ดูหนัง","เพื่อนร่วมกิจกรรม","ช้อปปิ้ง","ทานอาหาร","เดินเล่น",
  "งานสังคม","ถ่ายรูป","ท่องเที่ยว","คอนเสิร์ต","กีฬา","อื่น ๆ",
];

export default function ServiceModal({ open, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priceHour, setPriceHour] = useState("");
  const [priceDay, setPriceDay] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  if (!open) return null;

  const toggleCat = (c: string) =>
    setCats((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const addFiles = (fl: FileList | null) => {
    if (!fl) return;
    setFiles((prev) => {
      const remain = 3 - prev.length;      
      if (remain <= 0) return prev;      
      const incoming = Array.from(fl).slice(0, remain);
      return [...prev, ...incoming];      
    });
  };

  const isComplete =
    name.trim() !== "" &&
    desc.trim() !== "" &&
    priceHour.trim() !== "" &&
    priceDay.trim() !== "" &&
    files.length > 0;

  const removeFile = (idx: number) =>
    setFiles((p) => p.filter((_, i) => i !== idx));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return; // ป้องกันการ submit ถ้าไม่ครบ
    const fd = new FormData();
    fd.append("name", name);
    fd.append("desc", desc);
    fd.append("priceHour", priceHour);
    fd.append("priceDay", priceDay);
    fd.append("categories", JSON.stringify(cats));
    files.forEach((f) => fd.append("images", f));
    onSave(fd);
  };

  return (
    <div className={`${kanit.className} fixed inset-0 z-50`}>
      {/* ฉากหลังจาง ๆ + เบลอ */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* กล่องโมดัล */}
      <div className="absolute inset-0 overflow-y-auto sm:p-6 p-6">
        <div className="mx-auto w-full max-w-2xl rounded-xl bg-white shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2 mt-3">
              <FileText className="h-5 w-5 text-[#F24472]" />
              <h3 className="text-[19px] font-bold text-black">สร้างบริการของคุณ</h3>
            </div>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="px-6 pb-8">
            <hr className="border-gray-300 mb-5" />
            {/* Upload */}
            <label className="block text-[13px] font-normal text-[#000]">
              อัปโหลดรูป *
            </label>
            <div className="mt-2 grid grid-cols-3 gap-3 w-full">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="relative h-24 overflow-hidden rounded-lg border"
                >
                  {/* ใช้ <img> เพื่อพรีวิว blob ได้ทันที */}
                  <img
                    src={URL.createObjectURL(f)}
                    alt={f.name}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute right-1 top-1 rounded-full bg-white/90 p-1 hover:bg-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <label className="flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-400 text-center text-xs text-gray-500 hover:bg-gray-50">
                <input
                  type="file"
                  multiple
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />
                <div className="flex flex-col items-center">
                  <Upload className="h-5 w-5" />
                  <span className="mt-1">
                    คลิกเพื่ออัปโหลด<br />JPG, PNG สูงสุด 5MB
                  </span>
                </div>
              </label>
            </div>

            {/* Fields */}
            <div className="mt-4">
              <label className="block text-[13px] font-normal text-black">
                ชื่อบริการ *
              </label>
              <input
                className={`mt-1 w-full rounded-md border px-3 py-2 text-[13px] outline-none
                  placeholder:text-gray-300 focus:ring-1 focus:gray-300
                  ${name ? "text-gray-900 border-gray-300" : "text-gray-400 border-gray-200"}`}
                placeholder="เช่น เดทดูโรแมนติก, เพื่อนเปลี่ยนบรรยากาศ"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-[13px] font-normal text-black">
                รายละเอียดบริการ *
              </label>
              <textarea
                rows={3}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-[13px] outline-none
                  placeholder:text-gray-300 focus:ring-1 focus:gray-300
                  ${desc ? "text-gray-900 border-gray-300" : "text-gray-400 border-gray-200"}`}
                placeholder="อธิบายรายละเอียดบริการของคุณ"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-[13px] font-normal text-black">
                ประเภทบริการ (เลือกได้หลายประเภท)
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {CATEGORIES.map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => toggleCat(c)}
                    className={`rounded-md border px-3 py-1.5 text-[11px] bg-gray-100 border-gray-100 ${
                      cats.includes(c)
                        ? "bg-gradient-to-r from-pink-600 to-rose-500 text-white"
                        : "border-gray-300 text-black hover:bg-gray-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[13px] font-normal text-black">
                  ราคาต่อชั่วโมง (บาท) *
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ฿
                  </span>
                  <input
                    className={`mt-1 w-full rounded-md border px-3 py-2 text-[13px] outline-none
                      placeholder:text-gray-300 focus:ring-1 focus:gray-300 pl-7 pr-3 py-2
                      ${priceHour ? "text-gray-900 border-gray-300" : "text-gray-400 border-gray-200"}`}
                    placeholder="กรุณาใส่ราคา"
                    value={priceHour}
                    onChange={(e) => setPriceHour(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-normal text-black">
                  ราคาต่อวัน (บาท) *
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ฿
                  </span>
                  <input
                    className={`mt-1 w-full rounded-md border px-3 py-2 text-[13px] outline-none
                      placeholder:text-gray-300 focus:ring-1 focus:gray-300 pl-7 pr-3 py-2
                      ${priceDay ? "text-gray-900 border-gray-300" : "text-gray-400 border-gray-200"}`}
                    placeholder="กรุณาใส่ราคา"
                    value={priceDay}
                    onChange={(e) => setPriceDay(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <hr className="mt-6 border-gray-300" />

            {/* Footer */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                disabled={!isComplete} 
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-rose-500 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500 cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <Save className="h-4 w-4" />
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
