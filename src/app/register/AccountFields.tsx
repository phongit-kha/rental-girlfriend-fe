import Image from "next/image";
type AccountFieldsProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AccountFields({
  formData,
  handleChange,
}: AccountFieldsProps) {
  return (
    <div>
      <div className="flex justify-center gap-4 mb-4">
        <div className="w-full">
          <div className="text-left text-[#020617] mb-2">อีเมล*</div>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Image
                src="/img/email.svg"
                alt="user icon"
                width={20}
                height={20}
                className="text-gray-400"
              />
            </div>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="กรุณาใส่อีเมล"
              style={{ border: "1px solid #E1E7F4" }}
              className="text-black block w-full !h-8 rounded-md  pl-10  focus:border-pink-500 focus:ring-pink-500 placeholder:text-[#b4b8bf] placeholder:text-[13px]"
              required
            />
          </div>
        </div>
        <div className="w-full">
          <div className="text-left text-[#020617] mb-2">
            ชื่อผู้ใช้ (Username)*
          </div>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Image
                src="/img/user.svg"
                alt="email icon"
                width={20}
                height={20}
                className="text-gray-400"
              />
            </div>

            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="กรุณาใส่ชื่อผู้ใช้"
              style={{ border: "1px solid #E1E7F4" }}
              className="text-black block w-full !h-8 rounded-md  pl-10  focus:border-pink-500 focus:ring-pink-500 placeholder:text-[#b4b8bf] placeholder:text-[13px]"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <div className="w-full">
          <div className="text-left text-[#020617] mb-2">รหัสผ่าน*</div>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Image
                src="/img/lock.svg"
                alt="security icon"
                width={20}
                height={20}
                className="text-gray-400"
              />
            </div>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="กรุณาใส่รหัสผ่าน"
              style={{ border: "1px solid #E1E7F4" }}
              className="text-black block w-full !h-8 rounded-md  pl-10  focus:border-pink-500 focus:ring-pink-500 placeholder:text-[#b4b8bf] placeholder:text-[13px]"
              required
            />
          </div>
        </div>
        <div className="w-full">
          <div className="text-left text-[#020617] mb-2">ยืนยันรหัสผ่าน*</div>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Image
                src="/img/lock.svg"
                alt="security icon"
                width={20}
                height={20}
                className="text-gray-400"
              />
            </div>

            <input
              type="password"
              id="comfirmpassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="ยืนยันรหัสผ่าน"
              onChange={handleChange}
              className={`text-black placeholder:text-[#b4b8bf] block w-full !h-8 rounded-md  placeholder:text-[13px] pl-10 border  ${
                formData.confirmPassword.length > 0 &&
                formData.password != formData.confirmPassword
                  ? "!border-red-500 "
                  : "!border-[#E1E7F4]"
              }`}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
