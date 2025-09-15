'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Kanit } from 'next/font/google'
import { useAuthContext } from '@/contexts/AuthContext'
import { updateUser as updateUserInStorage } from '@/lib/localStorage'

import ProfileBanner from '@/components/profile/ProfileBanner'
import PersonalInfo from '@/components/profile/PersonalInfo'
import PersonalInfoEdit from '@/components/profile/PersonalInfoEdit'
import AccountSettings from '@/components/profile/AccountSettings'
import ChangeProfile from '@/components/profile/ChangeProfile'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function ProfilePage() {
    const { user: authUser, updateUser, isAuthenticated } = useAuthContext()
    const router = useRouter()

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

    // Track if we're currently updating to prevent useEffect from overriding
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        console.log('🔄 [Profile] useEffect triggered')
        console.log('🔄 [Profile] isAuthenticated:', isAuthenticated)
        console.log('🔄 [Profile] authUser:', authUser)
        console.log('🔄 [Profile] isUpdating:', isUpdating)

        if (!isAuthenticated) {
            console.log('❌ [Profile] Not authenticated, redirecting to login')
            router.push('/login')
            return
        }

        // Don't update state if we're currently in the middle of an update
        if (isUpdating) {
            console.log(
                '⏸️ [Profile] Skipping useEffect update - currently updating'
            )
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
            console.log('📝 [Profile] Setting new user data:', newUserData)
            setUser(newUserData)
            setDraft(newUserData) // sync draft ด้วย
            console.log('✅ [Profile] User data updated in useEffect')
        }
    }, [authUser, isAuthenticated, router, isUpdating])

    const [changeProfile, setChangeProfile] = useState(false)

    const [tempImg, setTempImg] = useState<string | null>(null)

    const [editProfile, setEditProfile] = useState(false)

    const [draft, setDraft] = useState(getInitialUserData)

    const handleDraftChange = (key: string, value: string) => {
        setDraft({ ...draft, [key]: value })
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('💾 [Profile] handleSave called')
        console.log('💾 [Profile] Current authUser:', authUser)
        console.log('💾 [Profile] Current draft:', draft)

        if (!authUser) {
            console.error('❌ [Profile] No authUser available')
            return
        }

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

        console.log('🔄 [Profile] Prepared updatedUser:', updatedUser)

        try {
            console.log('🚀 [Profile] Starting user update process')
            setIsUpdating(true) // Set flag to prevent useEffect from overriding

            // อัปเดตใน localStorage
            const updatedUserData = updateUserInStorage(authUser.id, {
                firstName: firstName ?? '',
                lastName,
                username: draft.username,
                email: draft.email,
                phone: draft.phone,
                birthdate: draft.birth,
                gender: draft.gender,
                interestedGender: draft.interest,
                img: draft.img,
            })

            console.log(
                '✅ [Profile] localStorage update successful:',
                updatedUserData
            )

            // อัปเดต context
            console.log('🔄 [Profile] Updating auth context')
            updateUser(updatedUserData)

            // อัปเดต state ให้สอดคล้องกัน (ใช้ข้อมูลจาก updatedUserData)
            const newUserData = {
                type: updatedUserData.type,
                img: updatedUserData.img,
                id: updatedUserData.idCard,
                username: updatedUserData.username,
                name: `${updatedUserData.firstName || ''} ${updatedUserData.lastName || ''}`.trim(),
                email: updatedUserData.email,
                phone: updatedUserData.phone,
                birth: updatedUserData.birthdate,
                gender: updatedUserData.gender,
                interest: updatedUserData.interestedGender,
                joined: updatedUserData.joined,
            }
            console.log('📝 [Profile] Setting new user data:', newUserData)
            setUser(newUserData)
            setDraft(newUserData)
            setEditProfile(false) // ปิด edit mode หลังบันทึกสำเร็จ
            console.log('✅ [Profile] Profile update completed successfully')

            // Reset the updating flag after a short delay to allow state to settle
            setTimeout(() => {
                setIsUpdating(false)
                console.log('🔓 [Profile] Update flag cleared')
            }, 100)
        } catch (error) {
            console.error('❌ [Profile] Error updating user:', error)
            setIsUpdating(false) // Reset flag on error
            alert(
                error instanceof Error
                    ? error.message
                    : 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล'
            )
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
                        console.log('🖼️ [Profile] saveProfile called')
                        console.log('🖼️ [Profile] tempImg:', tempImg)
                        console.log('🖼️ [Profile] authUser:', authUser)

                        if (tempImg && authUser) {
                            try {
                                console.log(
                                    '🚀 [Profile] Starting profile image update'
                                )
                                // อัปเดตใน localStorage
                                const updatedUserData = updateUserInStorage(
                                    authUser.id,
                                    {
                                        img: tempImg,
                                    }
                                )

                                console.log(
                                    '✅ [Profile] Profile image update successful:',
                                    updatedUserData
                                )

                                // อัปเดต context
                                console.log(
                                    '🔄 [Profile] Updating auth context for profile image'
                                )
                                updateUser(updatedUserData)

                                // อัปเดต state ทั้งหมดให้สอดคล้องกัน (ใช้ข้อมูลจาก updatedUserData)
                                const newUserData = {
                                    type: updatedUserData.type,
                                    img: updatedUserData.img,
                                    id: updatedUserData.idCard,
                                    username: updatedUserData.username,
                                    name: `${updatedUserData.firstName || ''} ${updatedUserData.lastName || ''}`.trim(),
                                    email: updatedUserData.email,
                                    phone: updatedUserData.phone,
                                    birth: updatedUserData.birthdate,
                                    gender: updatedUserData.gender,
                                    interest: updatedUserData.interestedGender,
                                    joined: updatedUserData.joined,
                                }
                                console.log(
                                    '📝 [Profile] Setting new user data for profile image:',
                                    newUserData
                                )
                                setUser(newUserData)
                                setDraft(newUserData)
                                setChangeProfile(false)
                                setTempImg(null)
                                console.log(
                                    '✅ [Profile] Profile image update completed successfully'
                                )
                            } catch (error) {
                                console.error(
                                    '❌ [Profile] Error updating profile image:',
                                    error
                                )
                                alert(
                                    error instanceof Error
                                        ? error.message
                                        : 'เกิดข้อผิดพลาดในการอัปเดตรูปโปรไฟล์'
                                )
                            }
                        } else {
                            console.warn(
                                '⚠️ [Profile] Missing tempImg or authUser for profile image update'
                            )
                        }
                    }}
                />
            )}
        </main>
    )
}
