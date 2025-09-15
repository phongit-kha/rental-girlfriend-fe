'use client'

import { useState, useEffect } from 'react'
import { X, Upload, FileText, Save, Trash2 } from 'lucide-react'
import { Kanit } from 'next/font/google'
import Image from 'next/image'
import type { Service } from '@/lib/localStorage'
import { processImageFile, isBase64Image } from '@/lib/imageUtils'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

type Props = {
    open: boolean
    onClose: () => void
    onSave: (data: FormData) => void
    onDelete?: () => void
    editingService?: Service | null
}

const CATEGORIES = [
    'เดท/คู่เดท',
    'ดูหนัง',
    'เพื่อนร่วมกิจกรรม',
    'ช้อปปิ้ง',
    'ทานอาหาร',
    'เดินเล่น',
    'งานสังคม',
    'ถ่ายรูป',
    'ท่องเที่ยว',
    'คอนเสิร์ต',
    'กีฬา',
    'อื่น ๆ',
]

export default function ServiceModal({
    open,
    onClose,
    onSave,
    onDelete,
    editingService,
}: Props) {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [priceHour, setPriceHour] = useState('')
    const [priceDay, setPriceDay] = useState('')
    const [cats, setCats] = useState<string[]>([])
    const [newImages, setNewImages] = useState<string[]>([]) // Store base64 images
    const [existingImages, setExistingImages] = useState<string[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)

    // เมื่อเปิด modal ให้ load ข้อมูลถ้าเป็นการแก้ไข
    useEffect(() => {
        if (editingService) {
            setName(editingService.name)
            setDesc(editingService.description)
            setPriceHour(editingService.priceHour.toString())
            setPriceDay(editingService.priceDay.toString())
            setCats(editingService.categories)
            setNewImages([]) // รีเซ็ตรูปใหม่
            setExistingImages(editingService.images || []) // โหลดรูปที่มีอยู่
        } else {
            // รีเซ็ตฟอร์มสำหรับการสร้างใหม่
            setName('')
            setDesc('')
            setPriceHour('')
            setPriceDay('')
            setCats([])
            setNewImages([])
            setExistingImages([])
        }
        setUploadError(null)
    }, [editingService, open])

    if (!open) return null

    const toggleCat = (c: string) =>
        setCats((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]))

    const addFiles = async (fl: FileList | null) => {
        if (!fl) return

        const totalImages = existingImages.length + newImages.length
        const remain = 3 - totalImages
        if (remain <= 0) {
            setUploadError('สามารถอัปโหลดได้สูงสุด 3 รูปเท่านั้น')
            return
        }

        setIsUploading(true)
        setUploadError(null)

        try {
            const filesToProcess = Array.from(fl).slice(0, remain)
            const base64Images: string[] = []

            for (const file of filesToProcess) {
                console.log('📸 [ServiceModal] Processing image:', file.name)

                const result = await processImageFile(file, {
                    maxWidth: 800,
                    maxHeight: 600,
                    quality: 0.8,
                    resize: true,
                })

                base64Images.push(result.base64)
                console.log(
                    '✅ [ServiceModal] Image processed:',
                    result.fileName
                )
            }

            setNewImages((prev) => [...prev, ...base64Images])
            console.log('✅ [ServiceModal] All images processed successfully')
        } catch (error) {
            console.error('❌ [ServiceModal] Error processing images:', error)
            setUploadError(
                error instanceof Error
                    ? error.message
                    : 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ'
            )
        } finally {
            setIsUploading(false)
        }
    }

    const isComplete =
        name.trim() !== '' &&
        desc.trim() !== '' &&
        priceHour.trim() !== '' &&
        priceDay.trim() !== '' &&
        (newImages.length > 0 || existingImages.length > 0) && // มีรูปอย่างน้อย 1 รูป (ใหม่หรือเก่า)
        cats.length > 0

    const removeNewImage = (idx: number) =>
        setNewImages((p) => p.filter((_, i) => i !== idx))

    const removeExistingImage = (idx: number) =>
        setExistingImages((p) => p.filter((_, i) => i !== idx))

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isComplete) return // ป้องกันการ submit ถ้าไม่ครบ

        // Combine existing and new images
        const allImages = [...existingImages, ...newImages]

        const fd = new FormData()
        fd.append('name', name)
        fd.append('desc', desc)
        fd.append('priceHour', priceHour)
        fd.append('priceDay', priceDay)
        fd.append('categories', JSON.stringify(cats))
        fd.append('images', JSON.stringify(allImages)) // Send all images as base64 strings
        onSave(fd)
    }

    return (
        <div className={`${kanit.className} fixed inset-0 z-50`}>
            {/* ฉากหลังจาง ๆ + เบลอ */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            {/* กล่องโมดัล */}
            <div className="absolute inset-0 overflow-y-auto p-6 sm:p-6">
                <div className="mx-auto w-full max-w-2xl rounded-xl bg-white shadow-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="mt-3 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-[#F24472]" />
                            <h3 className="text-[19px] font-bold text-black">
                                {editingService
                                    ? 'แก้ไขบริการของคุณ'
                                    : 'สร้างบริการของคุณ'}
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-full p-1 hover:bg-gray-100"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="px-6 pb-8">
                        <hr className="mb-5 border-gray-300" />
                        {/* Upload */}
                        <label className="block text-[13px] font-normal text-[#000]">
                            อัปโหลดรูป *
                        </label>
                        <div className="mt-2 flex w-full gap-3">
                            {/* แสดงรูปเก่าที่มีอยู่แล้ว */}
                            {existingImages.map((imgSrc, i) => (
                                <div
                                    key={`existing-${i}`}
                                    className="relative h-35 max-w-53 flex-grow overflow-hidden rounded-lg"
                                >
                                    {isBase64Image(imgSrc) ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={imgSrc}
                                            alt={`รูปที่ ${i + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <Image
                                            src={imgSrc}
                                            alt={`รูปที่ ${i + 1}`}
                                            width={200}
                                            height={140}
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeExistingImage(i)}
                                        className="absolute top-1 right-1 cursor-pointer rounded-full bg-red-500 p-1 text-white transition-colors duration-300 hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}

                            {/* แสดงรูปใหม่ที่อัปโหลด */}
                            {newImages.map((base64, i) => (
                                <div
                                    key={`new-${i}`}
                                    className="relative h-35 max-w-53 flex-grow overflow-hidden rounded-lg"
                                >
                                    {/* ใช้ <img> สำหรับ base64 images */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={base64}
                                        alt={`รูปใหม่ ${i + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeNewImage(i)}
                                        className="absolute top-1 right-1 cursor-pointer rounded-full bg-red-500 p-1 text-white transition-colors duration-300 hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}

                            {/* ปุ่มอัปโหลดใหม่ (แสดงเมื่อยังไม่ครบ 3 รูป) */}
                            {existingImages.length + newImages.length < 3 && (
                                <label
                                    className={`flex h-36 flex-grow items-center justify-center rounded-lg border-2 border-dashed text-center text-xs transition-colors ${
                                        isUploading
                                            ? 'cursor-wait border-blue-400 bg-blue-50 text-blue-600'
                                            : uploadError
                                              ? 'border-red-400 bg-red-50 text-red-600'
                                              : 'cursor-pointer border-gray-400 text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        className="hidden"
                                        onChange={(e) =>
                                            addFiles(e.target.files)
                                        }
                                        disabled={isUploading}
                                    />
                                    <div className="flex flex-col items-center">
                                        {isUploading ? (
                                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-blue-500"></div>
                                        ) : (
                                            <Upload
                                                className={`h-5 w-5 ${uploadError ? 'text-red-500' : ''}`}
                                            />
                                        )}
                                        <span className="mt-1">
                                            {isUploading
                                                ? 'กำลังอัปโหลด...'
                                                : uploadError
                                                  ? 'เกิดข้อผิดพลาด'
                                                  : 'คลิกเพื่ออัปโหลด'}
                                            <br />
                                            {uploadError ? (
                                                <span className="text-red-500">
                                                    {uploadError}
                                                </span>
                                            ) : (
                                                'PNG, JPG, WebP (สูงสุด 3 รูป)'
                                            )}
                                        </span>
                                    </div>
                                </label>
                            )}
                        </div>

                        {/* Fields */}
                        <div className="mt-4">
                            <label className="block text-[13px] font-normal text-black">
                                ชื่อบริการ *
                            </label>
                            <input
                                className={`mt-1 w-full rounded-md border px-3 py-2 text-[13px] placeholder:text-gray-300 focus:ring-1 focus:outline-2 focus:outline-offset-2 focus:outline-pink-500 ${name ? 'border-gray-300 text-gray-900' : 'border-gray-200 text-gray-400'}`}
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
                                className={`mt-1 w-full rounded-md border px-3 py-2 text-[13px] placeholder:text-gray-300 focus:ring-1 focus:outline-2 focus:outline-offset-2 focus:outline-pink-500 ${desc ? 'border-gray-300 text-gray-900' : 'border-gray-200 text-gray-400'}`}
                                placeholder="อธิบายรายละเอียดบริการของคุณ"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-[13px] font-normal text-black">
                                ประเภทบริการ* (เลือกได้หลายประเภท)
                            </label>
                            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                                {CATEGORIES.map((c) => (
                                    <button
                                        type="button"
                                        key={c}
                                        onClick={() => toggleCat(c)}
                                        className={`cursor-pointer rounded-md border-gray-100 bg-gray-100 px-3 py-1.5 text-[11px] ${
                                            cats.includes(c)
                                                ? 'bg-pink-500 text-white'
                                                : 'border-gray-300 text-black hover:bg-gray-200'
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
                                    <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-300">
                                        ฿
                                    </span>
                                    <input
                                        className={`w-full rounded-md border px-3 py-2 pr-3 pl-7 text-[13px] placeholder:text-gray-300 focus:ring-1 focus:outline-2 focus:outline-offset-2 focus:outline-pink-500 ${priceHour ? 'border-gray-300 text-gray-900' : 'border-gray-200 text-gray-400'}`}
                                        placeholder="กรุณาใส่ราคา"
                                        value={priceHour}
                                        onChange={(e) =>
                                            setPriceHour(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[13px] font-normal text-black">
                                    ราคาต่อวัน (บาท) *
                                </label>
                                <div className="relative mt-1">
                                    <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-300">
                                        ฿
                                    </span>
                                    <input
                                        className={`w-full rounded-md border px-3 py-2 pr-3 pl-7 text-[13px] placeholder:text-gray-300 focus:ring-1 focus:outline-2 focus:outline-offset-2 focus:outline-pink-500 ${priceDay ? 'border-gray-300 text-gray-900' : 'border-gray-200 text-gray-400'}`}
                                        placeholder="กรุณาใส่ราคา"
                                        value={priceDay}
                                        onChange={(e) =>
                                            setPriceDay(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="mt-6 border-gray-300" />

                        {/* Footer */}
                        <div className="mt-6 flex items-center justify-between gap-3">
                            <div>
                                {editingService && onDelete && (
                                    <button
                                        type="button"
                                        onClick={onDelete}
                                        className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        ลบบริการ
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="cursor-pointer rounded-md border border-[#E2E8F0] px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    disabled={!isComplete}
                                    type="submit"
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-rose-500 bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <Save className="h-4 w-4" />
                                    {editingService ? 'อัปเดต' : 'บันทึก'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
