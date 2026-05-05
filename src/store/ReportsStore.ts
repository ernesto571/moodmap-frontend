import axios from "../lib/axios";
import { create } from "zustand";

 
interface Report {
    id: number;
    week_start: string;
    week_range: string,
    total_entries: number,
    avg_score: number;
    best_day: {day:string; score: number };
    worst_day: {day:string; score: number };
    pattern_summary: string;
    daily_breakdown: [{day:string, score:number}]
    good_day_triggers: string[];
    bad_day_triggers: string[];
    key_insight: string;
    created_at: Date;
}

interface ReportsStore {
    all_report : Report[];
    reportLoading: boolean;
    error: string | null;
    fetchAllReports : () => Promise<void>
}

export const useReportStore = create < ReportsStore >((set) => ({
    all_report: [],
    reportLoading: false,
    error: null,

    fetchAllReports : async () => {
        console.log("FetchAllReports starting...")
        set({ reportLoading: true, error: null });
        try {
            const res = await axios.get("/report/all")
            console.log("✅ fetchReport success", res.data);
            set({ all_report: res.data.reports, reportLoading: false });
        } catch (err:any) {
            console.error("🔴 fetchReport : failed", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            }); 
        }
    }
}))