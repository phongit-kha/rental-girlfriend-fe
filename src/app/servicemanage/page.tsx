'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Kanit } from 'next/font/google'
import AddServiceCard from '@/components/AddServiceCard'
import ServiceModal from '@/components/ServiceModal'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function serviceMangePage() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <main
                className={`${kanit.className} min-h-screen bg-[#F4F6F8] py-8`}
            >
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-[30px] text-black">
                                จัดการบริการ
                            </h1>
                            <p className="mt-1 text-[13px] text-gray-500">
                                สร้างและจัดการบริการของคุณ
                            </p>
                        </div>

                        <button
                            onClick={() => setOpen(true)}
                            className="mr-1 inline-flex cursor-pointer items-center gap-2 rounded-md bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                        >
                            <Plus className="h-4 w-4 stroke-[3]" />
                            เพิ่มบริการใหม่
                        </button>
                    </div>

                    <AddServiceCard onCreate={() => setOpen(true)} />
                </div>
            </main>

            <ServiceModal
                open={open}
                onClose={() => setOpen(false)}
                onSave={(formData) => {
                    // TODO: POST ไป API ของคุณ
                    // await fetch('/api/services', { method:'POST', body: formData })
                    console.log(
                        'to-submit:',
                        Object.fromEntries(formData.entries())
                    )
                    setOpen(false)
                }}
            />
        </>
    )
}
