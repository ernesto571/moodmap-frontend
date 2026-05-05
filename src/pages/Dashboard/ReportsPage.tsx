import { useEffect, useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useReportStore } from "../../store/ReportsStore";
import { handleBarHeight} from "../../lib/utils";
import ViewReportModal from "../../components/Dashboard/ViewReportModal";
import Loading from "../../components/Dashboard/Loading";
import EmptyReport from "../../components/Dashboard/EmptyState/EmptyReports";

const value = "font-semibold text-[0.94rem] leading-[1.1rem]"
const label ="gray-2 mt-0.5 text-xs "
export default function () {

    const { reportLoading, all_report, fetchAllReports } = useReportStore();
    const [selectedReport, setSelectedReport] = useState<any | null>(null);


    useEffect (() => {
        if (all_report.length == 0) {
            fetchAllReports()
        }
    } , [])

    return(
        <section className="h-screen ">
            <main className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 overflow-hidden">
                <div className="hidden md:flex md:col-span-1">
                    <Sidebar />
                </div>

                
                <div className="md:col-span-3 lg:col-span-5 black h-screen overflow-auto pt-5 pb-8 px-5 md:p-8 ">
                    <div className="font-grotesque mt-[3.5rem]">
                        <h1 className="white font-bold text-[1.7rem]">Reports </h1>
                        <p className="flex gap-1 gray-2 text-sm ">
                            Weekly summaries and overviews of your mood data
                        </p>
                    </div>

                    { all_report.length === 0 ? <EmptyReport /> : (
                        reportLoading ? <Loading /> : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                                {all_report.map( (a) => (
                                    <div onClick={() => setSelectedReport(a)} className="bord border rounded-xl py-3 px-6 dark-dim font-inter hover:cursor-pointer hover:border-gray-400/55" key={a.id}>
                                        <div className="inline-flex flex-col " >
                                            <p className="text-xs gray-2">{a.week_range} </p>
                                            <h3 className="white font-bold mt-2 text-[1.8rem] leading-[1.6rem] tracking-wide " >{a.avg_score} </h3>
                                            <p className="text-[0.65rem] gray-2 pt-0.5">avg mood score</p>
                                        </div>
                                        {/* score bar */}
                                        <div className="flex items-end gap-2 mt-3 h-[150px] ">
                                            { a.daily_breakdown.map( (d:any) => {
                                                const { h, color } = d.score ? handleBarHeight(d.score) : { h: "6px", color: "#17171b" }
                                                return(
                                                    <div key={d.day} className="flex flex-col items-center justify-end h-full flex-1 gap-1 ">
                                                        <p className="text-[0.65rem] gray-2 mb-0.5">{d.score? d.score : "—" }</p>
                                                        <div style={{ height: h, backgroundColor: color }} className="w-full rounded-t-sm transition-all duration-300" />
                                                        <p className="text-[0.7rem] gray-2 mt-0.5">{d.day}</p>
                                                    </div>
                                                )
                                            } ) }
                                        </div>
                                        {/* best and worst day */}
                                        <div className="grid grid-cols-3 gap-2 mt-5">
                                            {/* best day */}
                                            <div className="flex flex-col border bord justify-center items-center py-2 bg-[#1a1a1e] rounded-lg">
                                                <h3 className={`${value} green`} >{a.best_day.day ? a.best_day.day : "—"} </h3>
                                                <p className={`${label}`} >Best day</p>
                                            </div>
                                            {/* Worst day */}
                                            <div className="flex flex-col border bord justify-center items-center py-2 bg-[#1a1a1e] rounded-lg">
                                                <h3 className={`${value} text-[#ef4444]`} >{a.worst_day.day? a.worst_day.day : "—" } </h3>
                                                <p className={`${label}`} >Worst day</p>
                                            </div>
                                            {/* Entries */}
                                            <div className="flex flex-col border bord justify-center items-center py-2 bg-[#1a1a1e] rounded-lg">
                                                <h3 className={`${value} white`} >{a.total_entries} </h3>
                                                <p className={`${label}`} >Entries</p>
                                            </div>
                                        </div>

                                        {/* key insight */}
                                        <p className="hidden lg:flex mt-4 border-t bord gray-2 text-[0.8rem] italic py-2">
                                            "{a.key_insight}"
                                        </p>
                                        
                                    </div>
                                ))}

                            </div>
                        )
                        
                    ) }

                </div>

            </main>
            {selectedReport && (
                <ViewReportModal 
                    onClose={() => setSelectedReport(null)} 
                    report={selectedReport} 
                />
            )}
        </section>
    )
}