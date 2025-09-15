// localStorage utilities สำหรับจัดการข้อมูล
export interface User {
    id: string
    email: string
    username: string
    password: string
    firstName: string
    lastName: string
    birthdate: string
    idCard: string
    phone: string
    gender: string
    interestedGender: string
    type: 'customer' | 'provider'
    img: string
    joined: string
    verified: boolean
}

export interface Service {
    id: string
    providerId: string
    name: string
    description: string
    categories: string[]
    priceHour: number
    priceDay: number
    images: string[]
    rating: number
    reviewCount: number
    bookingCount: number
    active: boolean
    createdAt: string
}

export interface Review {
    id: string
    serviceId: string
    customerId: string
    rating: number
    comment: string
    createdAt: string
}

// Keys สำหรับ localStorage
const USERS_KEY = 'rental_girlfriend_users'
const SERVICES_KEY = 'rental_girlfriend_services'
const REVIEWS_KEY = 'rental_girlfriend_reviews'
const CURRENT_USER_KEY = 'rental_girlfriend_current_user'

// Helper functions
export const getUsers = (): User[] => {
    if (typeof window === 'undefined') return []
    const users = localStorage.getItem(USERS_KEY)
    return users ? (JSON.parse(users) as User[]) : []
}

export const setUsers = (users: User[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const getServices = (): Service[] => {
    if (typeof window === 'undefined') return []
    const services = localStorage.getItem(SERVICES_KEY)
    return services ? (JSON.parse(services) as Service[]) : []
}

export const setServices = (services: Service[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services))
}

export const getReviews = (): Review[] => {
    if (typeof window === 'undefined') return []
    const reviews = localStorage.getItem(REVIEWS_KEY)
    return reviews ? (JSON.parse(reviews) as Review[]) : []
}

export const setReviews = (reviews: Review[]): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
}

export const getCurrentUser = (): User | null => {
    if (typeof window === 'undefined') return null
    const user = localStorage.getItem(CURRENT_USER_KEY)
    return user ? (JSON.parse(user) as User) : null
}

export const setCurrentUser = (user: User | null): void => {
    if (typeof window === 'undefined') return
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    } else {
        localStorage.removeItem(CURRENT_USER_KEY)
    }
}

// User management functions
export const registerUser = (
    userData: Omit<User, 'id' | 'joined' | 'verified'>
): User => {
    const users = getUsers()

    // ตรวจสอบอีเมลซ้ำ
    if (users.find((u) => u.email === userData.email)) {
        throw new Error('อีเมลนี้ถูกใช้งานแล้ว')
    }

    // ตรวจสอบ username ซ้ำ
    if (users.find((u) => u.username === userData.username)) {
        throw new Error('ชื่อผู้ใช้นี้ถูกใช้งานแล้ว')
    }

    const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        joined: new Date().getFullYear().toString(),
        verified: true,
    }

    users.push(newUser)
    setUsers(users)

    return newUser
}

export const loginUser = (email: string, password: string): User => {
    const users = getUsers()
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
        throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    }

    setCurrentUser(user)
    return user
}

export const logoutUser = (): void => {
    setCurrentUser(null)
}

// Update user information
export const updateUser = (userId: string, updates: Partial<User>): User => {
    console.log('🔧 [localStorage] updateUser called with userId:', userId)
    console.log('🔧 [localStorage] Updates:', updates)

    const users = getUsers()
    console.log('📋 [localStorage] Current users count:', users.length)

    const userIndex = users.findIndex((u) => u.id === userId)
    console.log('🔍 [localStorage] User index found:', userIndex)

    if (userIndex === -1) {
        console.error('❌ [localStorage] User not found with id:', userId)
        throw new Error('ไม่พบผู้ใช้ที่ต้องการแก้ไข')
    }

    console.log('👤 [localStorage] Original user:', users[userIndex])

    // ตรวจสอบอีเมลซ้ำ (ถ้ามีการอัปเดตอีเมล)
    if (updates.email && updates.email !== users[userIndex].email) {
        const emailExists = users.find(
            (u) => u.email === updates.email && u.id !== userId
        )
        if (emailExists) {
            console.error(
                '❌ [localStorage] Email already exists:',
                updates.email
            )
            throw new Error('อีเมลนี้ถูกใช้งานแล้ว')
        }
    }

    // ตรวจสอบ username ซ้ำ (ถ้ามีการอัปเดต username)
    if (updates.username && updates.username !== users[userIndex].username) {
        const usernameExists = users.find(
            (u) => u.username === updates.username && u.id !== userId
        )
        if (usernameExists) {
            console.error(
                '❌ [localStorage] Username already exists:',
                updates.username
            )
            throw new Error('ชื่อผู้ใช้นี้ถูกใช้งานแล้ว')
        }
    }

    const updatedUser = { ...users[userIndex], ...updates }
    console.log('🔄 [localStorage] Updated user object:', updatedUser)

    const updatedUsers = [...users]
    updatedUsers[userIndex] = updatedUser
    console.log('📝 [localStorage] Saving updated users to localStorage')
    setUsers(updatedUsers)

    // อัปเดต current user ด้วย (ถ้าเป็นผู้ใช้ปัจจุบัน)
    const currentUser = getCurrentUser()
    console.log('👤 [localStorage] Current user before update:', currentUser)
    if (currentUser && currentUser.id === userId) {
        console.log('🔄 [localStorage] Updating current user in localStorage')
        setCurrentUser(updatedUser)
    }

    console.log('✅ [localStorage] User update completed successfully')
    return updatedUser
}

// Delete user account and all related data
export const deleteUserAccount = (
    userId: string,
    password: string
): boolean => {
    const users = getUsers()
    const user = users.find((u) => u.id === userId)

    if (!user || user.password !== password) {
        throw new Error('รหัสผ่านไม่ถูกต้อง')
    }

    // Delete all user's services (if provider)
    deleteAllUserServices(userId)

    // Delete all user's reviews
    deleteAllUserReviews(userId)

    // Remove user from users array
    const updatedUsers = users.filter((u) => u.id !== userId)
    setUsers(updatedUsers)

    // Logout user
    logoutUser()

    return true
}

// Delete all services created by a user
export const deleteAllUserServices = (userId: string): void => {
    const services = getServices()
    const updatedServices = services.filter(
        (service) => service.providerId !== userId
    )
    setServices(updatedServices)
}

// Delete all reviews written by a user
export const deleteAllUserReviews = (userId: string): void => {
    const reviews = getReviews()
    const updatedReviews = reviews.filter(
        (review) => review.customerId !== userId
    )
    setReviews(updatedReviews)

    // Also need to update service ratings after removing reviews
    updateAllServiceRatings()
}

// Recalculate ratings for all services after review deletion
const updateAllServiceRatings = (): void => {
    const services = getServices()
    const reviews = getReviews()

    const updatedServices = services.map((service) => {
        const serviceReviews = reviews.filter(
            (review) => review.serviceId === service.id
        )

        if (serviceReviews.length === 0) {
            return {
                ...service,
                rating: 0,
                reviewCount: 0,
            }
        }

        const totalRating = serviceReviews.reduce(
            (sum, review) => sum + review.rating,
            0
        )
        const averageRating = totalRating / serviceReviews.length

        return {
            ...service,
            rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
            reviewCount: serviceReviews.length,
        }
    })

    setServices(updatedServices)
}

// Service management functions
export const createService = (
    serviceData: Omit<
        Service,
        'id' | 'rating' | 'reviewCount' | 'bookingCount' | 'createdAt'
    >
): Service => {
    const services = getServices()

    const newService: Service = {
        ...serviceData,
        id: Date.now().toString(),
        rating: 0,
        reviewCount: 0,
        bookingCount: 0,
        createdAt: new Date().toISOString(),
    }

    services.push(newService)
    setServices(services)

    return newService
}

export const updateService = (
    serviceId: string,
    updates: Partial<Service>
): Service => {
    const services = getServices()
    const index = services.findIndex((s) => s.id === serviceId)

    if (index === -1) {
        throw new Error('ไม่พบบริการที่ต้องการแก้ไข')
    }

    const updatedService = { ...services[index], ...updates } as Service
    services[index] = updatedService
    setServices(services)

    return updatedService
}

export const deleteService = (serviceId: string): void => {
    const services = getServices()
    const filteredServices = services.filter((s) => s.id !== serviceId)
    setServices(filteredServices)
}

export const getServicesByProvider = (providerId: string): Service[] => {
    const services = getServices()
    return services.filter((s) => s.providerId === providerId)
}

export const getServicesByCategory = (category: string): Service[] => {
    const services = getServices()
    return services.filter((s) => s.categories.includes(category) && s.active)
}

// Review management functions
export const addReview = (
    reviewData: Omit<Review, 'id' | 'createdAt'>
): Review => {
    const reviews = getReviews()

    const newReview: Review = {
        ...reviewData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
    }

    reviews.push(newReview)
    setReviews(reviews)

    // อัปเดตคะแนนเฉลี่ยของบริการ
    updateServiceRating(reviewData.serviceId)

    return newReview
}

export const updateServiceRating = (serviceId: string): void => {
    const reviews = getReviews()
    const serviceReviews = reviews.filter((r) => r.serviceId === serviceId)

    if (serviceReviews.length === 0) return

    const avgRating =
        serviceReviews.reduce((sum, r) => sum + r.rating, 0) /
        serviceReviews.length

    updateService(serviceId, {
        rating: Math.round(avgRating * 10) / 10, // ปัดเศษ 1 ตำแหน่ง
        reviewCount: serviceReviews.length,
    })
}

// Initialize sample data
export const initializeSampleData = (): void => {
    if (typeof window === 'undefined') return

    // ตรวจสอบว่ามีข้อมูลอยู่แล้วหรือไม่
    if (getUsers().length > 0) return

    // สร้างข้อมูลผู้ใช้ตัวอย่าง
    const sampleUsers: User[] = [
        {
            id: '1',
            email: 'provider1@example.com',
            username: 'jenny_cute',
            password: '123456',
            firstName: 'เจนนี่',
            lastName: 'สวยงาม',
            birthdate: '1998-05-15',
            idCard: '1-1234-56789-12-3',
            phone: '089-123-4567',
            gender: 'หญิง',
            interestedGender: 'ชาย',
            type: 'provider',
            img: '/img/provider1.png',
            joined: '2024',
            verified: true,
        },
        {
            id: '2',
            email: 'provider2@example.com',
            username: 'bow_lovely',
            password: '123456',
            firstName: 'โบว์',
            lastName: 'น่ารัก',
            birthdate: '1999-08-22',
            idCard: '1-2345-67890-23-4',
            phone: '089-234-5678',
            gender: 'หญิง',
            interestedGender: 'ชาย',
            type: 'provider',
            img: '/img/provider2.png',
            joined: '2024',
            verified: true,
        },
        {
            id: '3',
            email: 'provider3@example.com',
            username: 'mint_sweet',
            password: '123456',
            firstName: 'มิ้นต์',
            lastName: 'หวานใจ',
            birthdate: '1997-12-10',
            idCard: '1-3456-78901-34-5',
            phone: '089-345-6789',
            gender: 'หญิง',
            interestedGender: 'ชาย',
            type: 'provider',
            img: '/img/provider3.png',
            joined: '2023',
            verified: true,
        },
        {
            id: '4',
            email: 'customer1@example.com',
            username: 'somchai_user',
            password: '123456',
            firstName: 'สมชาย',
            lastName: 'ใจดี',
            birthdate: '1995-03-20',
            idCard: '1-4567-89012-45-6',
            phone: '089-456-7890',
            gender: 'ชาย',
            interestedGender: 'หญิง',
            type: 'customer',
            img: '/img/p1.jpg',
            joined: '2024',
            verified: true,
        },
    ]

    // สร้างข้อมูลบริการตัวอย่าง
    const sampleServices: Service[] = [
        {
            id: '1',
            providerId: '1',
            name: 'เดทดูหนังโรแมนติก',
            description:
                'เจนค่ะ เจนค่ะ หนูชื่อเจนมากับบูมแล้วก็มากับโบว์ โบว์ค่ะ โบว์ค่ะ หนูชื่อโบว์มากับบูม แล้วก็มากับเจน นุ่มค่ะ นุ่มค่ะ...',
            categories: ['เดท/คู่เดท', 'ดูหนัง'],
            priceHour: 500,
            priceDay: 3000,
            images: ['/img/provider1.png'],
            rating: 4.8,
            reviewCount: 127,
            bookingCount: 145,
            active: true,
            createdAt: '2024-01-15T10:00:00Z',
        },
        {
            id: '2',
            providerId: '2',
            name: 'ช้อปปิ้งและทานอาหาร',
            description:
                'โบว์พร้อมไปช้อปปิ้งและหาอะไรอร่อยๆ กินกันค่ะ รับรองสนุกแน่นอน มีประสบการณ์ช้อปปิ้งมากมาย',
            categories: ['ช้อปปิ้ง', 'ทานอาหาร', 'เพื่อนร่วมกิจกรรม'],
            priceHour: 450,
            priceDay: 2800,
            images: ['/img/provider2.png'],
            rating: 4.9,
            reviewCount: 89,
            bookingCount: 112,
            active: true,
            createdAt: '2024-02-01T14:30:00Z',
        },
        {
            id: '3',
            providerId: '3',
            name: 'ถ่ายรูปและเดินเล่น',
            description:
                'มิ้นต์ชอบถ่ายรูปและเดินเล่นในสถานที่สวยๆ ค่ะ มาสร้างความทรงจำดีๆ ไปด้วยกันนะคะ',
            categories: ['ถ่ายรูป', 'เดินเล่น', 'ท่องเที่ยว'],
            priceHour: 550,
            priceDay: 3200,
            images: ['/img/provider3.png'],
            rating: 4.7,
            reviewCount: 156,
            bookingCount: 203,
            active: true,
            createdAt: '2024-01-20T09:15:00Z',
        },
        {
            id: '4',
            providerId: '1',
            name: 'งานสังคมและปาร์ตี้',
            description:
                'เหมาะสำหรับงานสังคม งานปาร์ตี้ หรือกิจกรรมต่างๆ ที่ต้องการเพื่อนร่วมงาน',
            categories: ['งานสังคม', 'เพื่อนร่วมกิจกรรม'],
            priceHour: 600,
            priceDay: 3500,
            images: ['/img/provider1.png'],
            rating: 4.6,
            reviewCount: 78,
            bookingCount: 95,
            active: true,
            createdAt: '2024-02-10T16:45:00Z',
        },
        {
            id: '5',
            providerId: '2',
            name: 'คอนเสิร์ตและกิจกรรมกีฬา',
            description: 'ชอบดูคอนเสิร์ตและกิจกรรมกีฬาต่างๆ มาสนุกไปด้วยกันค่ะ',
            categories: ['คอนเสิร์ต', 'กีฬา', 'เพื่อนร่วมกิจกรรม'],
            priceHour: 480,
            priceDay: 2900,
            images: ['/img/provider2.png'],
            rating: 4.8,
            reviewCount: 134,
            bookingCount: 167,
            active: true,
            createdAt: '2024-01-25T11:20:00Z',
        },
    ]

    // สร้างข้อมูลรีวิวตัวอย่าง
    const sampleReviews: Review[] = [
        {
            id: '1',
            serviceId: '1',
            customerId: '4',
            rating: 5,
            comment: 'บริการดีมาก เจนน่ารักและเป็นกันเองมาก',
            createdAt: '2024-02-15T10:30:00Z',
        },
        {
            id: '2',
            serviceId: '2',
            customerId: '4',
            rating: 5,
            comment: 'โบว์ช่วยเลือกของได้ดีมาก แนะนำร้านอาหารอร่อยด้วย',
            createdAt: '2024-02-20T15:45:00Z',
        },
    ]

    // บันทึกข้อมูลลง localStorage
    setUsers(sampleUsers)
    setServices(sampleServices)
    setReviews(sampleReviews)
}
