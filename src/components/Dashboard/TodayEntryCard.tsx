// components/Dashboard/TodayEntryCard.tsx
interface Entry {
    id: number;
    note: string;
    mood: string;
    energy: number;
    score: number;
    created_at: Date;
}

const moodEmoji: Record<string, string> = {
    Low: "😔", Meh: "😐", Good: "🙂", Great: "😄", Amazing: "🤩"
}

const moodColor: Record<string, string> = {
    Low: "text-red-400 bg-red-500/10 border-red-500/20",
    Meh: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    Good: "text-green-400 bg-green-500/10 border-green-500/20",
    Great: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    Amazing: "text-purple-400 bg-purple-500/10 border-purple-500/20",
}

export default function TodayEntryCard({ entry }: { entry: Entry }) {
    return (
        <div className="col-span-2 dark-dim border bord rounded-xl">
            <div className="flex items-center justify-between py-4 px-5">
                <p className="white text-[0.9rem] font-semibold font-inter">Today's Check-in</p>
                <span className="text-xs green green-dim border green-bord px-3 py-1 rounded-full font-inter">✓ Done</span>
            </div>

            <div className="py-6 px-5 border-t bord font-inter space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[0.7rem] tracking-widest gray-2 font-semibold mb-1">MOOD</p>
                        <span className={`text-xs px-3 py-1 rounded-full border font-medium ${moodColor[entry.mood]}`}>
                            {moodEmoji[entry.mood]} {entry.mood}
                        </span>
                    </div>
                    <div className="text-right">
                        <p className="text-[0.7rem] tracking-widest gray-2 font-semibold mb-1">SCORE</p>
                        <p className="white font-bold text-xl">{entry.score}</p>
                    </div>
                </div>

                <div>
                    <p className="text-[0.7rem] tracking-widest gray-2 font-semibold mb-2">ENERGY LEVEL</p>
                    <div className="flex items-center gap-2">
                        {[1,2,3,4,5].map((e) => (
                            <div key={e} className={`h-2 w-12 rounded-full transition-colors ${e <= entry.energy ? "bg-green-500" : "bg-[#1a1a1e] border border-[#2a2a2e]"}`} />
                        ))}
                        <span className="text-xs gray ml-1">{entry.energy} / 5</span>
                    </div>
                </div>

                <div>
                    <p className="text-[0.7rem] tracking-widest gray-2 font-semibold mb-2">YOUR NOTE</p>
                    <p className="text-sm gray leading-relaxed bg-[#1a1a1e] border bord rounded-lg px-4 py-3">
                        {entry.note || <span className="text-dim italic">No note written.</span>}
                    </p>
                </div>

                <p className="text-xs text-dim text-center">You can edit your note until midnight</p>
            </div>
        </div>
    )
}