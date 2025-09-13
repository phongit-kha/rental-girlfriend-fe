import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
    return (
        <header className="justify-cneter flex h-[64px] w-full items-center bg-white px-8 py-4 pt-[21px] pr-[71px] pb-[21px] pl-[71px] shadow-xl">
            <div className="ml-[10px] flex gap-[310px]">
                <div className="flex gap-[422px]">
                    <Link href="/" className="flex items-center justify-center">
                        <Image
                            src="/img/logo.svg"
                            alt="logo"
                            width={24}
                            height={24}
                        />
                        <div className="ml-[4px] text-[16px] !font-black text-[#F24472]">
                            แฟนเช่า
                        </div>
                    </Link>

                    <nav className="ml-[30px] hidden items-center gap-8 md:flex">
                        <Link
                            href="/services"
                            className="text-[16px] text-[#212B36] transition-colors hover:text-pink-500"
                        >
                            ค้นหาบริการ
                        </Link>
                        <Link
                            href="/how-to-use"
                            className="text-[16px] text-[#212B36] transition-colors hover:text-pink-500"
                        >
                            วิธีใช้งาน
                        </Link>
                        <Link
                            href="/security"
                            className="text-[16px] text-[#212B36] transition-colors hover:text-pink-500"
                        >
                            ความปลอดภัย
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="hidden text-[#212B36] transition-colors hover:text-pink-500 sm:block"
                    >
                        เข้าสู่ระบบ
                    </Link>
                    <Link
                        href="/register"
                        style={{
                            background:
                                'linear-gradient(133.15deg, #F24BA7 2.02%, #EF4444 98.99%)',
                            borderRadius: '6px',
                        }}
                        className="px-5 py-2 font-semibold text-white transition-colors hover:bg-pink-600"
                    >
                        สมัครสมาชิก
                    </Link>
                </div>
            </div>
        </header>
    )
}
