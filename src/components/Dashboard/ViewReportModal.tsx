import { X } from "lucide-react";

 
 
interface Report {
    id: number;
    week_range: string,
    pattern_summary: string;
    good_day_triggers: string[];
    bad_day_triggers: string[];
    key_insight: string;
}

interface props {
    onClose: () => void;
    report? : Report
} 
export default function ViewReportModal ( {onClose, report} : props ) {

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="dark-dim rounded-2xl font-inter  w-[95%] md:w-[70%] lg:w-[50%] max-h-[80%] overflow-y-auto pt-4 relative animate-modal">
                {/* heading */}
                <span className="flex justify-between items-center px-3 md:px-6">
                    <div>
                        <h4 className="gray-2 text-sm tracking-wide">WEEKLY REPORT</h4>
                        <h2 className="white txet-[1.2rem] md:text-[1.5rem] font-semibold">{report?.week_range} </h2>
                    </div>
                    <button
                    onClick={onClose}
                    className="inline-flex items-center h-[30px] px-2 bg-[#1a1a1e] gray-2 rounded-lg hover:text-white border bord transition">
                        <X className="size-4" />
                    </button>
                </span>

                {/* summary */}
                <div className="purple rounded-lg text-[0.8rem] py-3 px-3 md:px-5 mx-3 md:mx-6 mt-6">
                    <div className="text-xs inline-flex items-center gap-2 text-[#a78bfa]  tracking-widest">
                        <div className="bg-[#493e6a] w-[8px] h-[8px] rounded-full animate-pulse"></div>
                        PATTERN SUMMARY
                    </div>
                    <p className="italic mt-2">"{report?.pattern_summary}" </p>
                </div>

                {/* triggers */}
                <div className="grid grid-cols-1 md:grid-cols-2 mt-5 border-t bord" >
                    <div className="py-4 px-3 md:px-6 md:border-r bord  ">
                        <p className="text-[0.65rem] gray-2 tracking-wide">GOOD DAYS TRIGGER</p>
                        <span className="inline-flex flex-wrap gap-2 items-center mt-3 ">{report?.good_day_triggers.map((t)=> (
                            <span key={t} className="inline-flex green-dim border green-bord green px-2 text-[0.65rem] py-1 rounded-xl text-nowrap justify-center ">{t}</span>
                        ))}</span>
                    </div>

                    <div className="py-4 px-3 md:px-6">
                        <p className="text-[0.65rem] gray-2 tracking-wide ">BAD DAYS TRIGGER</p>
                        <span className="inline-flex flex-wrap gap-2 items-center mt-3">{report?.bad_day_triggers.map((t)=> (
                            <span key={t} className="inline-flex red px-2 text-[0.65rem] py-1 rounded-xl text-nowrap justify-center">{t}</span>
                        ))}</span>
                    </div>
                </div>
                
                {/* insight */}
                <div className="py-3 px-6 green-bord border-t green-dim rounded-b-xl">
                    <h4 className="green text-xs tracking-wide flex items-center gap-3"> <div className="bg-green w-[8px] h-[8px] rounded-full animate-pulse"></div>KEY INSIGHT</h4>
                    <p className="white text-[0.8rem] mt-3">{report?.key_insight} </p>
                </div>

            </div>
            <style>{`
                @keyframes modal-in {
                    from { opacity: 0; transform: scale(0.95) translateY(8px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-modal { animation: modal-in 0.2s ease forwards; }
            `}</style>
        </section>
    )
}