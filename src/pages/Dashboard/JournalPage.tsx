import { ChevronDown, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useEffect, useRef, useState } from "react";
import { useEntryStore } from "../../store/EntryStore";
import { formatEntryDate, handleLabelColor, isCurrentWeekEntry } from "../../lib/utils";
import EditModal from "../../components/Dashboard/EditModal";
import EmptyEntries from "../../components/Dashboard/EmptyState/EmptyEntries";

const ITEMS_PER_PAGE = 8
const btn ="bg-[#1a1a1e] text-[0.8rem] gray-2 border bord rounded-lg py-1 font-semibold px-3"
export default function JournalPage () {

    const {all_entries, fetchEntries, searchEntries, deleteEntry } = useEntryStore()
    const [ activeCategory, setActiveCategory ] = useState("All");
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const isInitialMount = useRef(true);
    const [editingEntry, setEditingEntry] = useState<any | null>(null)

    const categories = [ 
        { id:"1", label:"All" },
        { id:"2", label:"Amazing" },
        { id:"3", label:"Great" },
        { id:"4", label:"Good" },
        { id:"5", label:"Meh" },
        { id:"6", label:"Low" }
    ]

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this entry?")
        if (!confirmed) return
        await deleteEntry(id)
    }

    const filteredEntries = all_entries!.filter(
        (e) => activeCategory === "All" || e.mood === activeCategory
    );
    const totalPages = Math.ceil(filteredEntries?.length / ITEMS_PER_PAGE)
    const paginatedEntries = filteredEntries?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    ) 

    const handleClearSearch = () => setSearchTerm("");

    useEffect(() => {
        if (all_entries.length === 0){
            fetchEntries()
        }
    }, [])

    useEffect(() => {
        // Prevent searching on the very first render to avoid redundant calls 
        // since ListingsPage already calls fetchListings()
        if (isInitialMount.current) {
          isInitialMount.current = false;
          return;
        }
    
        const delayDebounceFn = setTimeout(() => {
          searchEntries(searchTerm);
        }, 500);
    
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, searchEntries]);
    

    return (
        <section className="h-screen ">
            <main className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 overflow-hidden">
                <div  className="md:col-span-1 hidden md:flex">
                    <Sidebar />
                </div>
                <div className="md:col-span-3 lg:col-span-5 black h-screen overflow-auto pt-5 pb-8 px-5 md:p-8">
                    {all_entries.length == 0 ? <EmptyEntries /> : (
                        <div className="mt-[3.5rem]">
                            {/* heading */}
                            <span className="font-grotesque">
                                <h1 className="white font-bold text-[1.7rem]">Journal </h1>
                                <p className="flex gap-1 gray-2 text-sm ">
                                    Every check-in you've made — searchable and filterable
                                </p>
                            </span>
                            {/* searchbar and filters */}
                            <div className="mt-3 grid lg:flex gap-4 w-full font-interl">
                                <div className="relative flex items-center text-[#52525b] w-full">
                                    <Search className="absolute left-3 size-4 " />
                                    <input
                                        type="text"
                                        placeholder="Search by keyword, or note..."
                                        value={searchTerm}
                                        className="py-2 pl-12 pr-4 border bord w-full rounded-lg focus:outline-none  focus:text-white dark-dim focus:border-gray-400/55 text-sm "
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {searchTerm && (
                                        <X
                                        onClick={handleClearSearch}
                                        className="absolute right-3 white size-4 cursor-pointer"
                                        />
                                    )}
                                </div>
                                {/* filter button */}
                                <span className="flex flex-1 flex-wrap lg:flex-none lg:flex-nowrap gap-2">
                                    { categories.map((c) => (
                                        <button key={c.id} onClick={() => setActiveCategory(c.label)} className={`border py-2 px-4 text-[0.8rem]  rounded-lg ${activeCategory === c.label ? "green green-bord green-dim" : "bord dark-dim gray"} `}>
                                            {c.label}
                                        </button>
                                    )) }
                                </span>
                            </div>

                            {/* entries grid */}
                            { paginatedEntries.length === 0 ? ("") : (
                                <div className="mt-4">
                                    {paginatedEntries.map( (e) => {
                                        const { color } = handleLabelColor(e.mood)
                                        return (
                                            <div className="grid" >
                                                <span key={e.id} onClick={() => setExpandedId(expandedId === e.id ? null : e.id)} className="flex justify-between items-center w-full border hover:border-gray-400/55 rounded-xl bord py-3 mt-4 dark-dim px-3 md:px-6 transition-all hover:cursor-pointer">
                                                    <span className="flex gap-4 ">

                                                        <p className={`${color} text-[0.7rem] py-2 px-1 truncate w-[40px]  rounded-lg flex justify-center items-center `}>{e.mood} </p>
                                                        <div>
                                                            <p className="text-xs font-semibold gray-2">{formatEntryDate(e.created_at)} </p>
                                                            <h6 className="w-[150px] md:w-[300px] lg:w-[500px] truncate gray text-[0.9rem] mt-1">{e.note}</h6>
                                                        </div>
                                                    </span>

                                                    <span className="flex gap-2 md:gap-4">
                                                        <span className="hidden lg:flex items-center gap-1">
                                                            {[1,2,3,4,5].map((bar) => (
                                                                <div
                                                                    key={bar}
                                                                    className={`h-1.5 w-5 rounded-full ${bar <= e.energy ? "bg-green-500" : "bg-[#1a1a1e] border border-[#2a2a2e]"}`}
                                                                />
                                                            ))}
                                                            
                                                        </span>
                                                        <p className={`${color} py-1 px-1 md:px-3 rounded-xl text-xs `} >{e.score} / 10</p>

                                                        <button onClick={() => setExpandedId(expandedId === e.id ? null : e.id)}>
                                                            <ChevronDown size={16} className={`gray-2 transition-transform duration-200 ${expandedId === e.id ? "rotate-180" : ""}`} />
                                                        </button>
                                                    </span>
                                                
                                                </span>
                                                {expandedId === e.id && (
                                                    <div className="border  bord rounded-b-xl dark-dim px-6 py-4 -mt-2">
                                                        <div className="">
                                                            <p className="text-[0.9rem] gray font-semibold ">{e.note}</p>
                                                            {isCurrentWeekEntry(e.created_at) && (
                                                                <span className="mt-3 flex gap-3">
                                                                    <button onClick={() => setEditingEntry(e)} className={`${btn} hover:text-gray-100 hover:border-gray-400/55 transition-colors `} >Edit</button>
                                                                    <button onClick={ () => handleDelete(e.id)} className={`${btn} hover:text-[#ef4444] hover:bg-[#221416] hover:border-[#4b1e1f]`} >Delete</button>
                                                                </span>
                                                            )}

                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            
                                        )
                                    })}
                                </div>
                            ) } 

                            {/* ✅ Pagination */}
                            {filteredEntries.length > ITEMS_PER_PAGE && (
                            <div className="flex items-center justify-between py-4 mt-2">
                                <p className="text-xs white">
                                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredEntries.length)} of {filteredEntries.length} entries
                                </p>
                                <div className="flex items-center gap-2 font-semibold">
                                {/* Prev */}
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1.5 white disabled:opacity-40 transition-all"
                                >
                                    <ChevronLeft className="size-5" />
                                </button>

                                {/* Page numbers */}
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 text-xs rounded-lg transition-all
                                        ${currentPage === i + 1
                                        ? "green green-dim green-bord border "
                                        : "white"
                                        }`}
                                    >
                                    {i + 1}
                                    </button>
                                ))}

                                {/* Next */}
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1.5 text-xs white disabled:opacity-40 transition-all"
                                >
                                    <ChevronRight className="size-5" />
                                </button>
                                </div>
                            </div>
                            )}
                            
                        </div>
                    )}
                    
                </div>
            </main>

            {/* Edit Modal */}
            {editingEntry && (
                <EditModal 
                entry={editingEntry}
                onClose={() => {
                    setEditingEntry(null)
                    fetchEntries()
                }}
                />
            )}
        </section>
    )
}