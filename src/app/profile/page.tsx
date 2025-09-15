'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Kanit } from 'next/font/google'
import { useAuthContext } from '@/contexts/AuthContext'
import { getUsers, setUsers } from '@/lib/localStorage'

import ProfileBanner from '@/components/profile/ProfileBanner'
import PersonalInfo from '@/components/profile/PersonalInfo'
import PersonalInfoEdit from '@/components/profile/PersonalInfoEdit'
import AccountSettings from '@/components/profile/AccountSettings'
import ChangeProfile from '@/components/profile/ChangeProfile'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function ProfilePage() {
    const { user: authUser, updateUser, isAuthenticated } = useAuthContext()
    const router = useRouter()

    // ใช้ข้อมูลจาก AuthContext แต่แปลงรูปแบบให้เข้ากับ component เดิม
    const getInitialUserData = () => ({
        type: authUser?.type ?? 'customer',
        img: authUser?.img ?? '/img/p2.jpg',
        id: authUser?.idCard ?? '',
        username: authUser?.username ?? '',
        name: `${authUser?.firstName ?? ''} ${authUser?.lastName ?? ''}`.trim(),
        email: authUser?.email ?? '',
        phone: authUser?.phone ?? '',
        birth: authUser?.birthdate ?? '',
        gender: authUser?.gender ?? '',
        interest: authUser?.interestedGender ?? '',
        joined: authUser?.joined ?? '',
    })

    const [user, setUser] = useState(getInitialUserData)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        if (authUser) {
            const newUserData = {
                type: authUser.type,
                img: authUser.img,
                id: authUser.idCard,
                username: authUser.username,
                name: `${authUser.firstName || ''} ${authUser.lastName || ''}`.trim(),
                email: authUser.email,
                phone: authUser.phone,
                birth: authUser.birthdate,
                gender: authUser.gender,
                interest: authUser.interestedGender,
                joined: authUser.joined,
            }
            setUser(newUserData)
            setDraft(newUserData) // sync draft ด้วย
        }
    }, [authUser, isAuthenticated, router])

    const [changeProfile, setChangeProfile] = useState(false)

    const [tempImg, setTempImg] = useState<string | null>(null)

    const [editProfile, setEditProfile] = useState(false)

    const [draft, setDraft] = useState(getInitialUserData)

    const handleDraftChange = (key: string, value: string) => {
        setDraft({ ...draft, [key]: value })
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()

        if (!authUser) return

        // แปลงข้อมูลกลับเป็นรูปแบบ User
        const [firstName, ...lastNameParts] = draft.name.split(' ')
        const lastName = lastNameParts.join(' ') ?? ''

        const updatedUser = {
            ...authUser,
            firstName: firstName ?? '',
            lastName,
            email: draft.email,
            phone: draft.phone,
            birthdate: draft.birth,
            gender: draft.gender,
            interestedGender: draft.interest,
            img: draft.img,
        }

        // อัปเดตใน localStorage
        const users = getUsers()
        const userIndex = users.findIndex((u) => u.id === authUser.id)
        if (userIndex !== -1) {
            users[userIndex] = updatedUser
            setUsers(users)
            updateUser(updatedUser)

            // อัปเดต state ให้สอดคล้องกัน
            setUser(draft)
            setEditProfile(false) // ปิด edit mode หลังบันทึกสำเร็จ
        }
    }

    const avatars = [
        '/img/p1.jpg',
        '/img/p2.jpg',
        '/img/p3.jpg',
        '/img/p4.jpg',
        '/img/p5.jpg',
        '/img/p6.jpg',
        '/img/p7.jpg',
        '/img/p8.jpg',
        '/img/p9.jpg',
        '/img/p10.jpg',
        '/img/p11.jpg',
        '/img/p12.jpg',
        '/img/p13.jpg',
        '/img/p14.jpg',
        '/img/p15.jpg',
        '/img/p16.jpg',
    ]

    return (
        <main
            className={`${kanit.className} flex min-h-screen flex-col items-center gap-12 bg-[#F4F6F8] pt-[129px]`}
        >
            <div className="bg-light-blue flex w-190.5 flex-col items-center justify-center gap-8">
                <ProfileBanner
                    user={user}
                    setChangeProfile={setChangeProfile}
                    setEditProfile={setEditProfile}
                    editProfile={editProfile}
                />

                {editProfile ? (
                    <div className="flex h-[403px] w-[100%] gap-5">
                        <PersonalInfoEdit
                            user={user}
                            draft={draft}
                            handleDraftChange={handleDraftChange}
                            handleSave={handleSave}
                        />
                        <AccountSettings />
                    </div>
                ) : (
                    <div className="flex h-auto w-[100%] gap-5">
                        <PersonalInfo user={user} />
                        <AccountSettings />
                    </div>
                )}
            </div>

            {changeProfile && (
                <ChangeProfile
                    user={user}
                    avatars={avatars}
                    tempImg={tempImg}
                    setChangeProfile={() => setChangeProfile(false)}
                    setTempImg={(url) => setTempImg(url)}
                    saveProfile={() => {
                        if (tempImg && authUser) {
                            const updatedUser = { ...authUser, img: tempImg }
                            const users = getUsers()
                            const userIndex = users.findIndex(
                                (u) => u.id === authUser.id
                            )
                            if (userIndex !== -1) {
                                users[userIndex] = updatedUser
                                setUsers(users)
                                updateUser(updatedUser)

                                // อัปเดต state ทั้งหมดให้สอดคล้องกัน
                                const newUserData = {
                                    ...user,
                                    img: tempImg,
                                }
                                setUser(newUserData)
                                setDraft(newUserData)
                                setChangeProfile(false)
                                setTempImg(null)
                            }
                        }
                    }}
                />
            )}
        </main>
    )
}
