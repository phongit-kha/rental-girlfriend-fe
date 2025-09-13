type AccountFieldsProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function PersonalDetails({
  formData,
  handleChange,
}: AccountFieldsProps) {
  return (
    <div>
      <div className="flex justify-center gap-4">
        <div className="w-full">
          <div className="text-left text-[#020617] mb-2">ชื่อ*</div>
          <div className="relative w-full">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="กรุณาใส่ชื่อ"
              style={{ border: "1px solid #E1E7F4" }}
              className="text-black block w-full !h-8 !rounded-md   pl-4  focus:border-pink-500 focus:ring-pink-500 placeholder:text-[#b4b8bf] placeholder:text-[13px]"
              required
            />
          </div>
        </div>
        <div className="w-full">
          <div className="text-left text-[#020617] mb-2">นามสกุล*</div>
          <div className="relative w-full">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={{ border: "1px solid #E1E7F4" }}
              placeholder="กรุณาใส่นามสกุล"
              className="text-black block w-full !h-8 rounded-md   pl-4 focus:border-pink-500 focus:ring-pink-500 placeholder:text-[#b4b8bf] placeholder:text-[13px]"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="text-left text-[#020617] mb-2">วันเกิด*</div>

          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            style={{ border: "1px solid #E1E7F4" }}
            placeholder="กรุณาใส่วันเกิด"
            className="text-black block w-full !h-8 rounded-md   pl-4  focus:border-pink-500 focus:ring-pink-500 placeholder:text-[#b4b8bf] placeholder:text-[13px]"
          />
        </div>
      </div>
    </div>
  );
}
