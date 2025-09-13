"use client";
import Image from "next/image";
type AccountFieldsProps = {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export default function ContactAndPreference({
  formData,
  handleChange,
}: AccountFieldsProps) {
  return (
    <div>
      <div className="flex justify-center gap-4">
        <div className="w-full">
          <div className="text-left text-[#020617] mb-2">เบอร์โทรศัพท์*</div>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Image
                src="/img/tel.svg"
                alt="user icon"
                width={20}
                height={20}
                className="text-gray-400"
              />
            </div>

            <input
              type="tel"
              id="tel"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              placeholder="กรุณาใส่เบอร์โทรศัพท์"
              style={{ border: "1px solid #E1E7F4" }}
              className="text-black block w-full !h-8 !rounded-md   pl-10  focus:border-pink-500 focus:ring-pink-500 placeholder:text-[#b4b8bf] placeholder:text-[13px]"
              required
            />
          </div>
        </div>
        <div className="w-full">
          <div className="text-left text-[#020617] mb-2">เพศ *</div>
          <div className="relative w-full">
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={{ border: "1px solid #E1E7F4" }}
              className={`block w-full !h-8 rounded-md   pl-3  focus:border-pink-500 focus:ring-pink-500 placeholder:text-[13px] ${
                formData.gender ? "text-black" : "text-[#b4b8bf]"
              }`}
              required
            >
              <option value="" disabled hidden>
                กรุณาเลือกเพศ
              </option>
              <option className="text-black">ชาย</option>
              <option className="text-black">หญิง</option>
              <option className="text-black">LGBTQ+</option>
            </select>
          </div>
        </div>
        <div className="w-full">
          <div className="text-left text-[#020617] mb-2">เพศที่สนใจ *</div>
          <div className="relative w-full">
            <select
              id="interestedGender"
              name="interestedGender"
              value={formData.interestedGender}
              onChange={handleChange}
              style={{ border: "1px solid #E1E7F4" }}
              className={`block w-full !h-8 rounded-md   pl-3  focus:border-pink-500 focus:ring-pink-500  placeholder:text-[13px]  ${
                formData.interestedGender ? "text-black" : "text-[#b4b8bf]"
              }`}
              required
            >
              <option value="" disabled hidden>
                กรุณาเลือกเพศ
              </option>
              <option className="text-black">ชาย</option>
              <option className="text-black">หญิง</option>
              <option className="text-black">LGBTQ+</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
