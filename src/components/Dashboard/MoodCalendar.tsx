import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Entry {
    id: number;
    score: number;
    created_at: Date;
}

interface Props {
    entries: Entry[];
}

const getScoreColor = (score: number | undefined) => {
    if (!score) return "#1a1a1e";
    if (score < 5) return "#802a2b";
    if (score < 7) return "#fbbf24";
    return "#22c55e";
};

const getScoreDot = (score: number | undefined) => {
    if (!score) return null;
    if (score < 5) return "bg-red-800";
    if (score < 7) return "bg-amber-400";
    return "bg-green-500";
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MoodCalendar({ entries }: Props) {
    const [current, setCurrent] = useState(new Date());

    const entryMap: Record<string, number> = {};
    entries.forEach((e) => {
        const key = new Date(e.created_at).toLocaleDateString("en-CA");
        entryMap[key] = e.score;
    });

    const year = current.getFullYear();
    const month = current.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    // convert Sunday=0 to Monday=0 based week
    const startPad = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthLabel = current.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

    const todayKey = new Date().toLocaleDateString("en-CA");

    const cells = [
        ...Array(startPad).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    const legend = [
        { color: "#22c55e", label: "Good" },
        { color: "#fbbf24", label: "Mid" },
        { color: "#802a2b", label: "Low" },
        { color: "#1a1a1e", label: "No entry" },
    ];

    return (
        <div className="dark-dim border bord rounded-xl font-inter">
            {/* header */}
            <div className="flex items-center justify-between px-5 py-4">
                <h4 className="white text-[0.9rem] font-semibold">{monthLabel}</h4>
                <div className="flex gap-1">
                    <button onClick={prevMonth} className="p-1 rounded-md hover:bg-[#1a1a1e] gray transition-colors">
                        <ChevronLeft size={16} />
                    </button>
                    <button onClick={nextMonth} className="p-1 rounded-md hover:bg-[#1a1a1e] gray transition-colors">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="px-4 pb-4">
                {/* day headers */}
                <div className="grid grid-cols-7 mb-1">
                    {DAYS.map((d) => (
                        <p key={d} className="text-center text-[0.6rem] gray-2 font-medium py-1">{d}</p>
                    ))}
                </div>

                {/* day cells */}
                <div className="grid grid-cols-7 gap-1">
                    {cells.map((day, i) => {
                        if (!day) return <div key={`pad-${i}`} />;

                        const dateKey = new Date(year, month, day).toLocaleDateString("en-CA");
                        const score = entryMap[dateKey];
                        const isToday = dateKey === todayKey;

                        return (
                            <div
                                key={dateKey}
                                title={score ? `Score: ${score}` : "No entry"}
                                className={`relative flex flex-col items-center justify-center rounded-md aspect-square transition-all
                                    ${isToday ? "ring-1 ring-green-500" : ""}`}
                                style={{ backgroundColor: getScoreColor(score) }}
                            >
                                <p className={`text-[0.65rem] font-medium ${score ? "text-white" : "gray-2"}`}>
                                    {day}
                                </p>
                                {score && (
                                    <p className="text-[0.5rem] text-white/70">{score}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* legend */}
            <div className="flex gap-4 px-5 py-3 border-t bord">
                {legend.map((l) => (
                    <span key={l.label} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: l.color }} />
                        <p className="text-[0.6rem] gray-2">{l.label}</p>
                    </span>
                ))}
            </div>
        </div>
    );
}