"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div
      style={{
        background:
          "linear-gradient(112.9deg, #FEEDF6 0%, #FFFFFF 50%, #FEEDF6 100%)",
      }}
      className="flex flex-col min-h-[91vh] items-center pt-12 sm:pt-16 "
    >
      <div className="w-full flex justify-center items-center mt-[40px]">
        <div className="flex justify-center items-center bg-[linear-gradient(133.15deg,#F24BA7_2.02%,#EF4444_98.99%)] rounded-[99px] -scale-x-100 h-[44px] w-[44px]">
          <Image
            src="/img/heartcycle.svg"
            alt="heart icon"
            width={64}
            height={64}
          />
        </div>
      </div>
      <h4 className=" font-bold text-[28px] leading-[140%] tracking-[0] text-center text-[#212B36] mt-2">
        เข้าสู่ระบบ
      </h4>
      <p className="mt-3 text-[16px] text-[#6B7280]">ยินดีต้อนรับสู่แฟนเช่า</p>
      <form
        style={{
          borderRadius: "16px",
          boxShadow: "1px 4px 16px rgba(0, 0, 0, 0.1)",
        }}
        className=" bg-white  shadow-xl w-[384px]  m-4 p-6 pb-0 mb-0"
      >
        <div className="flex justify-center gap-4 mb-4">
          <div className="w-full">
            <div className="text-left text-[#212B36] ">อีเมล*</div>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ml-3">
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
                className="text-[#212B36] block w-full !h-8 rounded-md border-gray-300 pl-10 mt-[8px]  focus:border-pink-500 focus:ring-pink-500 placeholder:text-gray-400"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <div className="w-full">
            <div className="text-left text-[#212B36] mb-2">รหัสผ่าน*</div>
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
                className="text-[#212B36] placeholder:text-gray-400 block w-full !h-8 rounded-md border-gray-300 pl-10  focus:border-pink-500 focus:ring-pink-500"
                required
              />
            </div>
          </div>
        </div>
        <div className="!mt-2 text-right text-[#F24472]">
          <Link href="#">ลืมรหัสผ่าน ? </Link>
        </div>
        <button
          type="submit"
          style={{
            background:
              "linear-gradient(133.15deg, #F24BA7 2.02%, #EF4444 98.99%)",
            borderRadius: "6px",
          }}
          className=" mt-6 mb-6 w-full cursor-pointer  px-5 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          เข้าสู่ระบบ
        </button>
      </form>
      <div className="!mt-3 text-center">
        <span className="text-[#000000]">ยังไม่มีบัญชี? </span>
        <Link
          href="/register"
          className="font-semibold text-[#f24472] transition-colors hover:text-pink-700 hover:underline"
        >
          สมัครสมาชิก
        </Link>
      </div>
      <div className="flex flex-col gap-[7px]">
        <div className="flex justify-center items-center">
          <Link
            href="/user-account"
            className="flex w-[336px] h-[34px] mt-4 items-center justify-center ml-[2px] rounded-md border border-gray-200 bg-white p-4 text-base font-medium  transition-all hover:border-pink-300 hover:shadow-lg text-[#f6339a]"
          >
            <Image
              src="/img/user.svg"
              alt="User Account Icon"
              className="mb-[2px] mr-[2px]"
              width={20}
              height={20}
            />
            <span className="text-[#f24472]">User Account</span>
          </Link>
        </div>
        <div className="flex justify-center items-center flex-col">
          <Link
            href="/provider-account"
            className="flex w-[336px] h-[34px] items-center justify-center  rounded-md border border-gray-200 bg-white p-4 text-base font-medium  transition-all hover:border-pink-300 hover:shadow-lg text-[#f6339a]"
          >
            <Image
              src="/img/handshake.svg"
              alt="Provider Account Icon"
              className="mr-[2px]"
              width={20}
              height={20}
            />
            <span className="text-[#f24472]">Provider Account</span>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link
            href="#"
            className="flex w-[336px] mb-[56px] h-[34px] items-center justify-center ml-[2px] rounded-md border border-gray-200 bg-white p-4 text-base font-medium  transition-all hover:border-pink-300 hover:shadow-lg  text-[#f6339a]"
          >
            <Image
              src="/img/protect.svg"
              alt="Admin Account Icon"
              className="mr-[2px]  "
              width={20}
              height={20}
            />
            <span className="text-[#f24472]">Admin Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
