import Link from 'next/link'
type FormActionsProps = {
    formData: any
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isLoading?: boolean
}
export default function FormActions({
    formData,
    handleChange,
    isLoading = false,
}: FormActionsProps) {
    return (
        <div>
            <div className="flex items-center">
                <input
                    id="terms"
                    type="checkbox"
                    name="acception"
                    checked={formData.acception}
                    onChange={handleChange}
                    className="h-4 w-4 rounded text-pink-600 focus:ring-pink-500"
                    required
                />
                <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-[#212b36]"
                >
                    ฉันยอมรับ{' '}
                    <Link
                        href="#"
                        className="font-medium text-[#f24472] hover:underline"
                    >
                        ข้อกำหนดการใช้งาน
                    </Link>{' '}
                    และ{' '}
                    <Link
                        href="#"
                        className="font-medium text-[#f24472] hover:underline"
                    >
                        นโยบายความเป็นส่วนตัว
                    </Link>
                </label>
            </div>

            <button
                type="submit"
                disabled={isLoading || !formData.acception}
                style={{
                    background:
                        'linear-gradient(133.15deg, #F24BA7 2.02%, #EF4444 98.99%)',
                    borderRadius: '6px',
                }}
                className="mt-6 w-full cursor-pointer px-5 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
                {isLoading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
            </button>
        </div>
    )
}
