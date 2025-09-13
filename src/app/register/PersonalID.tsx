import Image from "next/image";
type AccountFieldsProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function PersonalID({
  formData,
  handleChange,
}: AccountFieldsProps) {
  return (
    <div>
      <div className="w-full">
        <div className="text-left text-[#020617] mb-2">
          รหัสบัตรประจำตัวประชาชน*
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
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="กรุณาใส่รหัสบัตรประจำตัวประชาชน 13 หลัก"
            style={{ border: "1px solid #E1E7F4" }}
            className="text-black placeholder:text-[#b4b8bf] block w-full !h-8 rounded-md  pl-10  focus:border-pink-500 focus:ring-pink-500 placeholder:text-[13px]"
            required
          />
        </div>
      </div>
    </div>
  );
}
