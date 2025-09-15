'use client';

import { useState } from "react";
import { Kanit } from 'next/font/google';

import ProfileBanner from "@/components/profile/ProfileBanner";
import PersonalInfo from "@/components/profile/PersonalInfo";
import PersonalInfoEdit from "@/components/profile/PersonalInfoEdit";
import AccountSettings from "@/components/profile/AccountSettings";
import ChangeProfile from "@/components/profile/ChangeProfile";

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] });

export default function ProfilePage() {

    const [user, setUser] = useState({
        type: "provider",
        img: "/img/p2.jpg",
        id: "1-xxxx-xxxx-x-33-7",
        username: "Lnwza007",
        name: "สมชาย โดว",
        email: "demo123@example.com",
        phone: "089-xxx-xxxx",
        birth: "01/10/2004",
        gender: "ชาย",
        interest: "หญิง",
        joined: "2025"
    });

    const [changeProfile, setChangeProfile] = useState(false);

    const [tempImg, setTempImg] = useState<string | null>(null);

    const [editProfile, setEditProfile] = useState(false);

    const [draft, setDraft] = useState(user);

    const handleDraftChange = (key: string, value: string) => {
        setDraft({ ...draft, [key]: value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setUser(draft);
        console.log("Profile saved:", draft);
    };

    const avatars = [
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p3.jpg",
        "/img/p4.jpg",
        "/img/p5.jpg",
        "/img/p6.jpg",
        "/img/p7.jpg",
        "/img/p8.jpg",
        "/img/p9.jpg",
        "/img/p10.jpg",
        "/img/p11.jpg",
        "/img/p12.jpg",
        "/img/p13.jpg",
        "/img/p14.jpg",
        "/img/p15.jpg",
        "/img/p16.jpg",
    ];

    return (
        <main className={`${kanit.className} min-h-screen bg-[#F4F6F8] flex flex-col items-center gap-12 pt-[129px]`}>
            <div className="w-190.5 flex flex-col items-center justify-center items-center gap-8 bg-light-blue">
                <ProfileBanner user={user} setChangeProfile={setChangeProfile} setEditProfile={setEditProfile} editProfile={editProfile}/>
                
                {editProfile ? (
                    <div className="w-[100%] h-[403px] flex gap-5">
                        <PersonalInfoEdit
                            user={user}
                            draft={draft}
                            handleDraftChange={handleDraftChange}
                            handleSave={handleSave}
                        />
                        <AccountSettings />
                    </div>
                ) : (
                    <div className="w-[100%] h-82.75 flex gap-5">
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
                        if (tempImg) {
                            setUser({ ...user, img: tempImg });
                            setChangeProfile(false);
                            setTempImg(null);
                        }
                    }}
                />
            )}
        </main>
    );
}

