import { SignOutButton, useClerk } from "@clerk/clerk-react";
import { Calendar, DoorOpen, LayoutDashboard, Pencil,  User } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useEntryStore } from "../../store/EntryStore";
import { useAuthStore } from "../../store/AuthStore";

const calculateStreak = (entries: { created_at: Date }[]): number => {
    if (entries.length === 0) return 0;

    const dates = entries
        .map((e) => new Date(e.created_at).toLocaleDateString("en-CA"))
        .sort()
        .reverse(); // newest first

    const today = new Date().toLocaleDateString("en-CA");
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("en-CA");

    // streak is dead if no entry today or yesterday
    if (dates[0] !== today && dates[0] !== yesterday) return 0;

    let streak = 1;
    for (let i = 0; i < dates.length - 1; i++) {
        const curr = new Date(dates[i]);
        const next = new Date(dates[i + 1]);
        const diff = (curr.getTime() - next.getTime()) / 86400000;

        if (diff === 1) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
};
const sidebarLinks = [
    { id:"1", icon: LayoutDashboard , label:"Dashboard ", to:"/dashboard", end:true},
    { id:"2 ", icon: Pencil , label:" Journal", to:"/dashboard/journal"},
    { id:"4 ", icon: Calendar , label:"Reports ", to:"/dashboard/reports"}
]

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MenuSidebar ({ isOpen, onClose }: SidebarProps){

    const { profile } = useAuthStore()
    const { openUserProfile } = useClerk();
    const { all_entries } = useEntryStore();
    const initials = `${profile?.first_name?.slice(0,1)}${profile?.last_name?.slice(0,1)}`;

    const streak = calculateStreak(all_entries)
    let streakMessage;
    if ( streak < 2) {
        streakMessage = `${streak} day`
    } else {
        streakMessage = `${streak} days`
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={onClose}
            />

            {/* sidebar */}
            <div className={`fixed top-0 left-0 z-50 h-screen w-[50%] flex flex-col justify-between dark-dim shadow-2xl transform transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="mx-2 mt-[1rem]  h-screen">
                    <h3 className="text-[0.7rem] pt-[2rem] text-dim font-inter tracking-widest">MAIN</h3>
                    <div className="mt-2">
                        {sidebarLinks.map((s) => (
                            <NavLink to={s.to} end={s.end} key={s.id} className={({ isActive }: { isActive: boolean }) => `flex items-center gap-3 mt-1 w-full py-2 px-3 text-[0.85rem] rounded-lg ${isActive ? "green green-dim" : "gray hover:bg-[#1a1a1e] hover:text-[#fafafa]"}`}>
                                {({ isActive }: { isActive: boolean }) => (
                                    <>
                                        <s.icon size={15} className={isActive ? "green" : ""} />
                                        <h5>{s.label}</h5>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                    <h3 className="text-[0.7rem] text-dim mt-3 font-inter tracking-widest">ACCOUNT</h3>
                    <button onClick={() => openUserProfile()} className="flex items-center gap-3 mt-1 w-full py-2 px-3 text-[0.85rem] hover:text-[#fafafa] hover:bg-[#1a1a1e] gray rounded-lg">
                        <User size={15} className="text-[#a1a1aa]" />
                        <p>Profile</p>
                    </button>
                    <SignOutButton>
                        <button onClick={() => openUserProfile()} className="group flex items-center gap-3 mt-1 w-full py-2 px-3 text-[0.85rem] transition-colors hover:bg-[#221416] gray rounded-lg">
                            <DoorOpen size={15} className="text-[#a1a1aa] transition-colors group-hover:text-[#ef4444]" />
                            <p className="transition-colors group-hover:text-[#ef4444]">Logout</p>
                        </button>
                    </SignOutButton>
                </div>
                <div className="flex flex-col border-t bord pt-3 pb-6 mx-2 font-inter">
                    <div className="yellow py-3 px-4 w-full rounded-xl">
                        <p className="text-sm">Current Streak</p>
                        <h3 className="white font-bold text-[1.5rem] leading-[1.5rem] mt-1">{streakMessage}</h3>
                        <p className="text-[0.7rem] gray-2 mt-1">Keep it going</p>
                    </div>
                    <div onClick={() => openUserProfile()} className="inline-flex gap-3 px-1 py-2 w-full items-center mt-4 rounded-xl hover:bg-[#1a1a1e] hover:cursor-pointer min-w-0">
                        <button className="py-1.5 px-2 border border-green-500/30 rounded-lg text-sm green bg-green-500/10 flex-shrink-0">
                            {initials}
                        </button>
                        <div className="min-w-0 flex-1">
                            <h6 className="white text-[0.8rem] font-semibold truncate">{profile?.first_name} {profile?.last_name}</h6>
                            <p className="text-[0.65rem] gray-2">Free Plan</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    
}