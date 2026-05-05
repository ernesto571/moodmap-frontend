import React from "react";

export const EmptyReport: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(139,92,246,0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </div>

      <h3
        className="font-semibold text-base mb-1"
        style={{ color: "rgba(255,255,255,0.85)" }}
      >
        No report available
      </h3>

      <p
        className="text-sm leading-relaxed max-w-[240px] mb-5"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        Your AI Insight report hasn't been generated yet.
      </p>

      {/* Requirements card — mirrors the AI Insight card style */}
      <div
        className="w-full max-w-xs rounded-2xl px-4 py-4 text-left"
        style={{
          background: "rgba(139,92,246,0.08)",
          border: "1px solid rgba(139,92,246,0.18)",
        }}
      >
        {/* Header row */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full" style={{ background: "#8b5cf6" }} />
          <span
            className="text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: "rgba(139,92,246,0.9)" }}
          >
            How reports work
          </span>
        </div>

        {/* Requirements list */}
        <ul className="space-y-2">
          {[
            {
              icon: "📅",
              text: (
                <>
                  Reports are generated every{" "}
                  <span style={{ color: "rgba(255,255,255,0.75)" }}>
                    Sunday at end of week
                  </span>
                </>
              ),
            },
            {
              icon: "✍️",
              text: (
                <>
                  Log entries on{" "}
                  <span style={{ color: "rgba(255,255,255,0.75)" }}>
                    at least a few days
                  </span>{" "}
                  during the week
                </>
              ),
            },
            {
              icon: "⏰",
              text: (
                <>
                  Entries must be submitted{" "}
                  <span style={{ color: "rgba(255,255,255,0.75)" }}>
                    before Sunday midnight
                  </span>
                </>
              ),
            },
            {
              icon: "🔁",
              text: (
                <>
                  Check back{" "}
                  <span style={{ color: "rgba(255,255,255,0.75)" }}>
                    every Monday
                  </span>{" "}
                  for your latest report
                </>
              ),
            },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-sm mt-px">{item.icon}</span>
              <span
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next generation countdown label */}
      <div className="mt-4 flex items-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#22c55e" }}
        />
        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
          Next report generates this Sunday
        </span>
      </div>
    </div>
  );
};

export default EmptyReport;