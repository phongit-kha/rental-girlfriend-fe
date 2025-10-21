'use client'
import { useState, useEffect, useCallback, useMemo, Suspense } from 'react'
import { Kanit } from 'next/font/google'
import { useRouter, useSearchParams } from 'next/navigation'
import Card from '@/components/Card'
import { ChevronDown, Check } from 'lucide-react'
import SearchBox from '@/components/SearchBox'
import {
    getServices,
    getUsers,
    type Service,
    type User,
} from '@/lib/localStorage'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

interface FilterState {
    query: string
    activity: string
    gender: string
    priceMin: string
    priceMax: string
    minRating: string
}

type SortOption = 'rating' | 'price-low' | 'price-high' | 'popular' | 'newest'

const sortOptions = [
    { value: 'rating', label: 'คะแนนสูงสุด' },
    { value: 'price-low', label: 'ราคาต่ำสุด' },
    { value: 'price-high', label: 'ราคาสูงสุด' },
    { value: 'popular', label: 'ยอดนิยม' },
    { value: 'newest', label: 'ใหม่ล่าสุด' },
] as const

function ServicePageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [allServices, setAllServices] = useState<Service[]>([])
    const [allProviders, setAllProviders] = useState<User[]>([])
    const [filteredServices, setFilteredServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [filterLoading, setFilterLoading] = useState(false)
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

    const [filters, setFilters] = useState<FilterState>({
        query: searchParams.get('q') ?? '',
        activity: searchParams.get('activity') ?? '',
        gender: searchParams.get('gender') ?? '',
        priceMin: searchParams.get('priceMin') ?? '',
        priceMax: searchParams.get('priceMax') ?? '',
        minRating: searchParams.get('minRating') ?? '',
    })

    const [sortBy, setSortBy] = useState<SortOption>(
        (searchParams.get('sort') as SortOption) ?? 'rating'
    )

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true)

            try {
                // Simulate API delay for services data loading
                await new Promise((resolve) => setTimeout(resolve, 600))

                const services = getServices().filter(
                    (service) => service.active
                )
                const users = getUsers().filter(
                    (user) => user.type === 'provider'
                )
                setAllServices(services)
                setAllProviders(users)
            } catch (error) {
                console.error('Error loading services data:', error)
            } finally {
                setLoading(false)
            }
        }

        void loadData()
    }, [])

    // Filter and sort services
    const applyFiltersAndSort = useCallback(
        async (
            services: Service[],
            providers: User[],
            currentFilters: FilterState,
            currentSort: SortOption
        ) => {
            setFilterLoading(true)

            // Simulate API delay for filtering/sorting
            await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 400 + 800)
            )

            let filtered = [...services]

            // Apply search query
            if (currentFilters.query.trim()) {
                const query = currentFilters.query.toLowerCase().trim()
                filtered = filtered.filter((service) => {
                    const provider = providers.find(
                        (p) => p.id === service.providerId
                    )
                    const providerName = provider
                        ? `${provider.firstName} ${provider.lastName}`
                        : ''

                    return (
                        service.name.toLowerCase().includes(query) ||
                        service.description.toLowerCase().includes(query) ||
                        providerName.toLowerCase().includes(query) ||
                        service.categories.some((cat) =>
                            cat.toLowerCase().includes(query)
                        )
                    )
                })
            }

            // Apply activity filter
            if (currentFilters.activity) {
                filtered = filtered.filter((service) =>
                    service.categories.includes(currentFilters.activity)
                )
            }

            // Apply gender filter
            if (currentFilters.gender) {
                filtered = filtered.filter((service) => {
                    const provider = providers.find(
                        (p) => p.id === service.providerId
                    )
                    return provider?.gender === currentFilters.gender
                })
            }

            // Apply price range filter
            if (currentFilters.priceMin) {
                const minPrice = parseInt(currentFilters.priceMin)
                if (!isNaN(minPrice)) {
                    filtered = filtered.filter(
                        (service) => service.priceHour >= minPrice
                    )
                }
            }

            if (currentFilters.priceMax) {
                const maxPrice = parseInt(currentFilters.priceMax)
                if (!isNaN(maxPrice)) {
                    filtered = filtered.filter(
                        (service) => service.priceHour <= maxPrice
                    )
                }
            }

            // Apply minimum rating filter
            if (currentFilters.minRating) {
                const minRating = parseFloat(currentFilters.minRating)
                if (!isNaN(minRating)) {
                    filtered = filtered.filter(
                        (service) => service.rating >= minRating
                    )
                }
            }

            // Apply sorting
            filtered.sort((a, b) => {
                switch (currentSort) {
                    case 'rating':
                        return b.rating - a.rating
                    case 'price-low':
                        return a.priceHour - b.priceHour
                    case 'price-high':
                        return b.priceHour - a.priceHour
                    case 'popular':
                        return b.bookingCount - a.bookingCount
                    case 'newest':
                        return (
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        )
                    default:
                        return b.rating - a.rating
                }
            })

            setFilteredServices(filtered)
            setFilterLoading(false)
        },
        []
    )

    // Apply filters and sort when data or filters change
    useEffect(() => {
        if (allServices.length > 0 && allProviders.length > 0) {
            void applyFiltersAndSort(allServices, allProviders, filters, sortBy)
        }
    }, [allServices, allProviders, filters, sortBy, applyFiltersAndSort])

    // Update URL parameters
    const updateURL = useCallback(
        (newFilters: FilterState, newSort: SortOption) => {
            const params = new URLSearchParams()

            if (newFilters.query) params.set('q', newFilters.query)
            if (newFilters.activity) params.set('activity', newFilters.activity)
            if (newFilters.gender) params.set('gender', newFilters.gender)
            if (newFilters.priceMin) params.set('priceMin', newFilters.priceMin)
            if (newFilters.priceMax) params.set('priceMax', newFilters.priceMax)
            if (newFilters.minRating)
                params.set('minRating', newFilters.minRating)
            if (newSort !== 'rating') params.set('sort', newSort)

            const queryString = params.toString()
            const newURL = queryString
                ? `/services?${queryString}`
                : '/services'

            router.replace(newURL, { scroll: false })
        },
        [router]
    )

    // Debounced filter update
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            updateURL(filters, sortBy)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [filters, sortBy, updateURL])

    // Handle filter changes
    const handleFilterChange = useCallback(
        (newFilters: Partial<FilterState>) => {
            setFilters((prev) => ({ ...prev, ...newFilters }))
        },
        []
    )

    // Handle sort change
    const handleSortChange = useCallback((newSort: SortOption) => {
        setSortBy(newSort)
        setSortDropdownOpen(false)
    }, [])

    // Clear all filters
    const clearFilters = useCallback(() => {
        const clearedFilters: FilterState = {
            query: '',
            activity: '',
            gender: '',
            priceMin: '',
            priceMax: '',
            minRating: '',
        }
        setFilters(clearedFilters)
        setSortBy('rating')
    }, [])

    // Get current sort label
    const currentSortLabel = useMemo(() => {
        return (
            sortOptions.find((option) => option.value === sortBy)?.label ??
            'เรียงโดย'
        )
    }, [sortBy])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sortDropdownOpen &&
                !(event.target as Element).closest('.sort-dropdown')
            ) {
                setSortDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [sortDropdownOpen])
    return (
        <main className={`${kanit.className} bg-[#F4F6F8]`}>
            <div className="mx-auto w-full md:max-w-290">
                <div className="w-full pt-8">
                    {/* หัวข้อใหญ่ */}
                    <h1 className="text-[33px] font-normal text-black">
                        ค้นหาแฟนเช่า
                    </h1>
                    <p className="text-[13px] font-normal text-[#6B7280]">
                        พบกับผู้ให้บริการมากกว่า 1,200 คน ที่รอให้บริการคุณ
                    </p>
                </div>

                {/* กล่อง "การจองล่าสุด" + แถบค้นหา */}
                <section className="mt-6 rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 text-[19px] font-normal text-[#212B36]">
                        การจองล่าสุด
                    </div>
                    <SearchBox
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={clearFilters}
                    />
                </section>

                {/* แถบจำนวนผลลัพธ์ + ปุ่มเรียงลำดับ */}
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-[13px] font-normal text-[#6B7280]">
                        {loading || filterLoading
                            ? 'กำลังโหลด...'
                            : `พบ ${filteredServices.length} ผู้ให้บริการ`}
                    </p>

                    <div className="sort-dropdown relative">
                        <button
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
                            type="button"
                            onClick={() =>
                                setSortDropdownOpen(!sortDropdownOpen)
                            }
                        >
                            {currentSortLabel}
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {sortDropdownOpen && (
                            <div className="absolute top-full right-0 z-10 mt-1 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                                        onClick={() =>
                                            handleSortChange(option.value)
                                        }
                                    >
                                        {option.label}
                                        {sortBy === option.value && (
                                            <Check className="h-4 w-4 text-pink-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500"></div>
                            <div className="ml-3 text-gray-500">
                                กำลังโหลดข้อมูล...
                            </div>
                        </div>
                    ) : filterLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500"></div>
                            <div className="ml-3 text-gray-500">
                                กำลังค้นหา...
                            </div>
                        </div>
                    ) : filteredServices.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="text-center text-gray-500">
                                <div className="mb-2 text-lg font-medium">
                                    ไม่พบผู้ให้บริการ
                                </div>
                                <div className="text-sm">
                                    ลองเปลี่ยนคำค้นหาหรือตัวกรองดูนะคะ
                                </div>
                            </div>
                            {(filters.query ||
                                filters.activity ||
                                filters.gender ||
                                filters.priceMin ||
                                filters.priceMax ||
                                filters.minRating) && (
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 rounded-lg bg-pink-500 px-4 py-2 text-sm text-white transition-colors hover:bg-pink-600"
                                >
                                    ล้างตัวกรองทั้งหมด
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 pb-5 md:grid-cols-2 lg:grid-cols-3">
                            {filteredServices.map((service) => {
                                const provider = allProviders.find(
                                    (p) => p.id === service.providerId
                                )
                                if (!provider) return null

                                // คำนวณอายุจากวันเกิด
                                const birthYear = new Date(
                                    provider.birthdate
                                ).getFullYear()
                                const currentYear = new Date().getFullYear()
                                const age = currentYear - birthYear

                                return (
                                    <Card
                                        key={service.id}
                                        id={service.id}
                                        Name={`${service.name}`}
                                        Age={age}
                                        Rating={service.rating}
                                        Location="กรุงเทพมหานคร"
                                        Description={service.description}
                                        Type={
                                            service.rating >= 4.8 ? 'แนะนำ' : ''
                                        }
                                        PriceHr={service.priceHour}
                                        PriceD={service.priceDay}
                                        Review={`จองแล้ว ${service.bookingCount} ครั้ง`}
                                        ReviewCount={service.reviewCount}
                                        imgSrc={
                                            service.images[0] ?? provider.img
                                        }
                                        buttonTitle="ดูโปรไฟล์"
                                        Categories={service.categories}
                                    />
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default function ServicePage() {
    return (
        <Suspense
            fallback={
                <main className={`${kanit.className} bg-[#F4F6F8]`}>
                    <div className="mx-auto w-full md:max-w-290">
                        <div className="w-full pt-8">
                            <h1 className="text-[33px] font-normal text-black">
                                ค้นหาแฟนเช่า
                            </h1>
                            <p className="text-[13px] font-normal text-[#6B7280]">
                                พบกับผู้ให้บริการมากกว่า 1,200 คน
                                ที่รอให้บริการคุณ
                            </p>
                        </div>
                        <div className="flex items-center justify-center py-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500"></div>
                            <div className="ml-3 text-gray-500">
                                กำลังโหลดข้อมูล...
                            </div>
                        </div>
                    </div>
                </main>
            }
        >
            <ServicePageContent />
        </Suspense>
    )
}
