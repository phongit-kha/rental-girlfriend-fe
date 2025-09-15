'use client';

import { useState } from "react";
import { Kanit } from 'next/font/google';
import { Mail, User, Phone, Calendar, CreditCard, Camera, Save, Upload, X } from "lucide-react";

import ProfileBanner from "@/components/profile/edit/ProfileBanner";
import PersonalInfo from "@/components/profile/edit/PersonalInfo";
import AccountSettings from "@/components/profile/AccountSettings";
import ChangeProfile from "@/components/profile/ChangeProfile";

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] });

export default function ProfilePageEdit() {

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

    const [draft, setDraft] = useState(user);

    const handleDraftChange = (key: string, value: string) => {
        setDraft({ ...draft, [key]: value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setUser(draft);
        console.log("Profile saved:", draft);
    };

    const [changeProfile, setChangeProfile] = useState(false);

    const [tempImg, setTempImg] = useState<string | null>(null);

    const avatars = [
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
        "/img/p1.jpg",
        "/img/p2.jpg",
    ];

    return (
        <main className={`${kanit.className} min-h-screen bg-[#F4F6F8] flex flex-col items-center gap-12 pt-[48px]`}>
            <div className="w-190.5 flex flex-col items-center justify-center items-center gap-8 bg-light-blue">
                <ProfileBanner user={user} setChangeProfile={setChangeProfile} />
                <div className="w-[100%] h-[403px] flex gap-5">
                    <PersonalInfo
                        user={user}
                        draft={draft}
                        handleDraftChange={handleDraftChange}
                        handleSave={handleSave}
                    />
                    <AccountSettings />
                </div>
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
                            setDraft({ ...draft, img: tempImg });
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
