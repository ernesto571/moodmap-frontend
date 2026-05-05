import { useEffect, useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useAuthStore } from "../../store/AuthStore";
import { formatDate, formatEntryDate, getThisWeekEntries, getWeekRange, handleBarHeight, handleLabelColor } from "../../lib/utils";
import { useEntryStore } from "../../store/EntryStore";
import toast from "react-hot-toast";
import TodayEntryCard from "../../components/Dashboard/TodayEntryCard";
import { useReportStore } from "../../store/ReportsStore";
import MoodCalendar from "../../components/Dashboard/MoodCalendar";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import EmptyReport from "../../components/Dashboard/EmptyState/EmptyReports";
import EmptyEntries from "../../components/Dashboard/EmptyState/EmptyEntries";

const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
}

const moods = [
    {id:"1", label:"Low"},
    {id:"2", label:"Meh"},
    {id:"3", label:"Good"},
    {id:"4", label:"Great"},
    {id:"5", label:"Amazing"}
]

const energy_levels = [
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5}
]

const barInfo = [
    { id:"1", color:"#22c55e", label:"High"},
    { id:"2", color:"#fbbf24", label:"Mid"},
    { id:"3", color:"#802a2b", label:"Low"},
    { id:"4", color:"#17171b", label:"No Entry"},
]

const days = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ]

const title = "tracking-widest gray-2 text-[0.7rem] font-semibold"
const grid_title = "white text-[0.9rem] font-semibold "
const grid_sub = "text-xs gray-2 pt-1"


export default function DashboardPage () {

    const [mood, setMood] = useState("Good");
    const [energy, setEnergy] = useState(3);
    const [note, setNote] = useState("");
    const { profile, fetchProfile } = useAuthStore()
    const { formData, setFormData, resetFormData, isLoading, addEntry, all_entries, fetchEntries } = useEntryStore();
    const { all_report, fetchAllReports } = useReportStore()
    const latest_report = all_report[0]

    const thisWeeksEntries = getThisWeekEntries(all_entries)
    
    const todayEntry = all_entries.find((e) => 
        new Date(e.created_at).toDateString() === new Date().toDateString()
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value)
        setFormData({ note : e.target.value });
    };

    const handleMoodChange = (label: string) => {
        setMood(label)
        setFormData({ mood: label })
    }

    const handleEnergyChange = (id: number) => {
        setEnergy(id)
        setFormData({ energy: id })
    }

    const saveEntry = async() => {
         
        try {
            if(!formData.note){
                toast.error("Note is required")
            } else {
                await addEntry(formData)
                resetFormData()
            }
        } catch (err) {
            console.error("Error in saveEntry", err);
        }
    }

    useEffect ( ()=> {
        if(!profile){
            fetchProfile()
        }
    }, []) 

    useEffect(() => {
        if (all_entries.length===0){
            fetchEntries();
        }
    }, []);

    useEffect(() => {
        if (all_report.length===0){
            fetchAllReports();
        }
    }, []);
    return(
        <section className="h-screen ">
            <main className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 overflow-hidden">
                <div className="md:col-span-1 hidden md:flex">
                    <Sidebar />
                </div>
                <div className="md:col-span-3 lg:col-span-5 black h-screen overflow-auto pt-5 pb-8 px-5 md:p-8">
                    <div className="mt-[3.5rem]">
                        {/* heading */}
                        <span className="font-grotesque">
                            <h1 className="white font-bold text-[1.5rem] trunate md:text-[1.7rem]">Good { getTimeOfDay()}, {profile?.first_name} </h1>
                            <span className="flex gap-1 gray-2 text-sm truncate">
                                <span>{formatDate()} </span>
                                <span>{todayEntry? "—— you have checked in today ":"—— you haven't checked in today yet"} </span>
                            </span>
                        </span>
                        {/* todo */}
                        <section className="grid grid-cols-1 lg:grid-cols-3 sticky gap-6 mt-8" >
                            { todayEntry ? <TodayEntryCard entry={todayEntry}/>  : (
                                <div className="lg:col-span-2 dark-dim border bord rounded-xl">
                                    {/* heading */}
                                    <span className=" font-inter ">
                                        <p className="white text-[0.9rem] font-semibold py-4 px-5">Today's Check-in</p>
                                    </span>
                                    
                                    <div className="py-4 px-3 lg:px-5 border-t bord font-inter">
                                        <section>
                                            <h3 className={`${title}`}>HOW ARE YOU FEELING TODAY?</h3>
                                            {/* buttons */}
                                            <span className="grid grid-cols-5 gap-3 mt-3">
                                                { moods.map((m) => (
                                                    <button key={m.label} aria-pressed={mood === m.label} onClick={() => handleMoodChange(m.label)} className={`py-2 rounded-lg text-xs truncate ${mood === m.label ? "green-bord green green-dim border" :"border bord gray"}`}>
                                                        {m.label}
                                                    </button>
                                                )) }
                                            </span>
                                        </section>
                                        {/* input */}
                                        <section className="mt-4">
                                            <h3 className={`${title}`}>WHAT'S ON YOUR MIND?</h3>
                                            <textarea value={formData.note && note} name="text" onChange={handleChange} maxLength={500} className="mt-2 h-[150px] lg:h-[100px] w-full rounded-lg border bord white resize-none bg-gray px-4 py-3 text-sm focus:outline-none"/>

                                        </section>

                                        {/* energy */}
                                        <section className="mt-4">
                                            <h3 className={`${title}`}>ENERGY LEVEL</h3>
                                            <span className="flex gap-2 items-center mt-2">
                                                { energy_levels.map((e) => (
                                                    <button  key={e.id} onClick={() => handleEnergyChange(e.id)} className={`h-2 w-8 rounded-full transition-colors ${
                                                        e.id <= energy ? "bg-green" : "bg-gray "
                                                    }`}/>
                                                )) }
                                                <p className="text-xs gray-2 font-medium pl-2">{energy} / 5 </p>
                                            </span>
                                        </section>

                                        <span className="flex justify-between items-center mt-4">
                                            <p className={`text-[0.68rem] font-medium ${note.length > 11000 ? "text-red-400" : "gray-2"}`}>{note.length} / 500</p>
                                            <button onClick={saveEntry} disabled={isLoading} className="bg-green rounded-lg py-2 px-6 font-medium text-sm hover:brightness-75 disabled:cursor-not-allowed disabled:opacity-30">{isLoading ? "Saving..." : "Save Entry"}</button>
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="lg:col-span-1 dark-dim border h-fit bord rounded-xl ">
                                {/* heading */}
                                <span className="font-inter inline-flex flex-col my-3 px-6">
                                    <h4 className={`${grid_title}`} >This Week</h4>
                                    <p className={`${grid_sub}`}>{getWeekRange()} </p>
                                </span>
                                {/* bars */}
                                <div className="flex items-end gap-2 px-6 h-[200px] pb-2 pt-8 border-t bord">
                                    {days.map((day) => {
                                        const entry = thisWeeksEntries.find(
                                            (t) => new Date(t.created_at).toLocaleDateString("en-US", { weekday: "short" }) === day
                                        );
                                        const { h, color } = entry ? handleBarHeight(entry.score) : { h: "6px", color: "#17171b" };
                                        return (
                                            <div key={day} className="flex flex-col items-center justify-end h-full flex-1 gap-1 ">
                                                <p className="text-[0.65rem] gray-2 mb-1">{entry?.score? entry.score : "—" }</p>
                                                <div style={{ height: h, backgroundColor: color }} className="w-full rounded-t-sm transition-all duration-300" />
                                                <p className="text-xs gray-2 mt-1">{day}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* bar info */}
                                <span className="flex gap-4 bord border-t mx-6 my-2 py-3 overflow-hidden " >
                                    { barInfo.map( (b) => (
                                        <span key={b.id} className="flex gap-1.5 items-center " >
                                            <p style={{ backgroundColor: b.color }} className="p-1 rounded-sm"></p>
                                            <p className="text-[0.65rem] gray-2 ">{b.label} </p>
                                        </span>
                                    )) }
                                </span>
                            </div>                        

                        </section>

                        <section className="grid grid-cols-1  lg:grid-cols-3 gap-6 mt-6 ">
                            <div className="lg:col-span-2 dark-dim border bord rounded-xl ">
                                { latest_report==null? <EmptyReport /> : (
                                    <div className="px-3 md:px-6">
                                        {/* heading */}
                                        <span className="font-inter inline-flex flex-col my-3 ">
                                            <h4 className={`${grid_title}`} >AI Insight</h4>
                                            <p className={`${grid_sub}`}>Generated from last week's entries</p>
                                        </span>
                                        {/* report */}
                                        <div className="border-t bord  py-5">
                                            <div className="purple rounded-lg text-[0.8rem] py-3 px-3 md:px-5">
                                                <div className="text-xs inline-flex items-center gap-2 text-[#a78bfa]  tracking-widest">
                                                    <div className="bg-[#493e6a] w-[8px] h-[8px] rounded-full animate-pulse"></div>
                                                    WEEKLY PATTERN
                                                </div>
                                                <p className="italic mt-2">"{latest_report.pattern_summary}" </p>
                                            </div>

                                            <div className="mt-3">
                                                <p className="text-[0.7rem] gray-2 tracking-widest ">DETECTED TRIGGERS</p>
                                                <span className="flex gap-2 w-full overflow-auto mt-3">
                                                    <span className="flex gap-2 items-center">{latest_report.bad_day_triggers.map((t)=> (
                                                        <span className="inline-flex red px-2 text-[0.65rem] py-1 rounded-xl whitespace-nowrap">{t}</span>
                                                    ))}</span>

                                                    <span className="flex gap-2 items-center">{latest_report.good_day_triggers.map((t)=> (
                                                        <span className="inline-flex green-dim border green-bord green px-2 text-[0.65rem] py-1 rounded-xl whitespace-nowrap">{t}</span>
                                                    ))}</span>
                                                </span>
                                                
                                            </div>
                                        </div>
                                    </div>
                                ) }
                                
                            </div>
                            <div className="lg:col-span-1 sticky">
                                <MoodCalendar entries={all_entries} />
                            </div>
                        </section>

                        {/* reports */}
                        <section className="mt-6 border bord dark-dim font-inte rounded-xl" >
                            { all_entries.length === 0 ? <EmptyEntries />: (
                                <div>
                                    {/* heading */}
                                    <div className="flex justify-between items-center my-3 px-3 md:px-6">
                                        <span className="font-inter inline-flex flex-col ">
                                            <h4 className={`${grid_title}`} >Recent Entries</h4>
                                            <p className={`${grid_sub}`}>Your last 5 check-ins</p>
                                        </span>

                                        <Link className="flex gap-1 gray-2 text-xs hover:text-[#fafafa]" to="/dashboard/journal" >View All <ChevronRight className="size-4" / ></Link>
                                    </div>
                                    
                                    {all_entries.slice(0,5).map( (e) => {
                                        const { color } = handleLabelColor(e.mood)
                                        return (
                                            <span className="flex justify-between items-center w-full border-t bord px-3 md:px-6 py-3">
                                                <span className="flex gap-4 ">

                                                    <p className={`${color} text-[0.7rem] py-2 px-1 truncate w-[40px]  rounded-lg flex justify-center items-center `}>{e.mood} </p>
                                                    <div>
                                                        <p className="text-xs font-semibold gray-2">{formatEntryDate(e.created_at)} </p>
                                                        <h6 className="w-[130px] md:w-[300px] lg:w-[500px] truncate gray text-[0.9rem] mt-1">{e.note}</h6>
                                                    </div>
                                                </span>

                                                <p className={`${color} py-1 px-1 lg:px-3 rounded-xl text-xs `} >{e.score} / 10</p>

                                            </span>
                                        )
                                    })}
                                </div>
                            ) }      
                        </section>
                        
                    </div>
                </div>
            </main>
        </section>
    )
}