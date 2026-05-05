import React from "react";

export const EmptyEntries: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      {/* Icon container */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>

      <h3
        className="font-semibold text-base mb-1"
        style={{ color: "rgba(255,255,255,0.85)" }}
      >
        No entries yet
      </h3>

      <p
        className="text-sm leading-relaxed max-w-[220px]"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        Log your first mood entry to start tracking your weekly patterns.
      </p>

      {/* Subtle indicator dots mimicking the week bar */}
      <div className="flex gap-2 mt-6">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="flex flex-col items-center gap-1">
            <div
              className="w-5 h-5 rounded-md"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.07)" }}
            />
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.2)" }}>
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmptyEntries;