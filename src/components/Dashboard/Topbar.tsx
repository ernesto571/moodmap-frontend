import { useClerk } from "@clerk/clerk-react";
import { useAuthStore } from "../../store/AuthStore";
import { formatDate } from "../../lib/utils";
import { useState } from "react";
import { Menu } from "lucide-react";
import MenuSidebar from "./MenuSidebar";

export default function Topbar(){

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { openUserProfile } = useClerk();
    const { profile } = useAuthStore()
    const initials = `${profile?.first_name?.slice(0,1)}${profile?.last_name?.slice(0,1)}`
    return(
        <nav className="fixed top-0 left-0 py-2 px-4 lg:px-6  md:py-3  w-screen z-10 transition-all duration-300 black  border-b border-[#27272a]">
            <section  className="flex justify-between mx-auto items-center">
                
                <span className="flex gap-3 items-center">
                <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden gray dark-dim border bord py-1.5 px-2  rounded-lg transition-all">
                        <Menu className="size-4" />
                    </button>
                <span className="flex font-grotesque text-[1.2rem] font-semibold white" >Mood<p className="green">Map</p></span>

                </span>

                <div className="flex gap-5 font-inter white text-[0.92rem] tracking-tight items-center">
                    <p className="hidden md:flex gray-2 text-sm">{ formatDate() }</p>
                    
                    <button onClick={() => openUserProfile()} className="py-1.5 px-2 border border-green-500/30 rounded-lg text-sm green bg-green-500/10 hover:bg-green-500/20 transition-colors">
                        {initials}
                    </button>
                </div>
                
            </section>
            <MenuSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        </nav>
    )
}