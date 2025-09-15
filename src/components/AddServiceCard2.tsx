import Link from "next/link";
import { Plus } from "lucide-react";
import PrimaryButton from "./ฺPrimaryButton";
import Card from "./Card";

export default function AddServiceCard2() {
    return (
        <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm w-full h-145">
          <div className="text-[19px] font-medium text-gray-900">บริการของฉัน</div>

            <div className="flex justify-between content-center">
            <Card
                Name="สมหญิง ว้อนชาย"
                Age={25}
                Rating={4.8}
                Location="กรุงเทพมหานคร"
                Description="เจนค่ะ เจนค่ะ หนูชื่อเจนมากับบูมแล้วก็มากับโบว์ โบว์ค่ะ โบว์ค่ะ หนูชื่อโบว์มากับบูม แล้วก็มากับเจน นุ่มค่ะ นุ่มค่ะ..."
                Type="แนะนำ"
                PriceHr={500}
                PriceD={3000}
                Review="จองแล้ว 145 ครั้ง"
                ReviewCount={127}
                imgSrc="/img/provider1.png"
                buttonTitle="แก้ไข"
            />
            <Card
                Name="สมหญิง ว้อนชาย"
                Age={25}
                Rating={4.8}
                Location="กรุงเทพมหานคร"
                Description="เจนค่ะ เจนค่ะ หนูชื่อเจนมากับบูมแล้วก็มากับโบว์ โบว์ค่ะ โบว์ค่ะ หนูชื่อโบว์มากับบูม แล้วก็มากับเจน นุ่มค่ะ นุ่มค่ะ..."
                Type="แนะนำ"
                PriceHr={500}
                PriceD={3000}
                Review="จองแล้ว 145 ครั้ง"
                ReviewCount={127}
                imgSrc="/img/provider2.png"
                buttonTitle="แก้ไข"
            />
            <Card
                Name="สมหญิง ว้อนชาย"
                Age={25}
                Rating={4.8}
                Location="กรุงเทพมหานคร"
                Description="เจนค่ะ เจนค่ะ หนูชื่อเจนมากับบูมแล้วก็มากับโบว์ โบว์ค่ะ โบว์ค่ะ หนูชื่อโบว์มากับบูม แล้วก็มากับเจน นุ่มค่ะ นุ่มค่ะ..."
                Type="แนะนำ"
                PriceHr={500}
                PriceD={3000}
                Review="จองแล้ว 145 ครั้ง"
                ReviewCount={127}
                imgSrc="/img/provider3.png"
                buttonTitle="แก้ไข"
            />
            </div>
        </section>
    )
}