import { SignUpButton } from "@clerk/clerk-react";
import { ChevronRight } from "lucide-react";
import { info } from "../../constants";

export default function Hero() {
    return (
        <section className="w-full lg:w-[80%] mx-auto pt-10 md:pt-16">
            <main className="flex flex-col justify-center items-center place-content-center text-center mt-6 font-inter">
                <div className="text-xs green py-1.5 px-4 rounded-2xl border font-medium border-[#0f3920] bg-[#0b1711] inline-flex gap-2 items-center justify-center truncate w-none">
                    <div className="announce-dot animate-pulse"></div>
                    AI-powered emotional intelligence
                </div>

                <div className="font-grotesque text-center text-[2.5rem] lg:text-[4.9rem] font-extrabold text-white mt-6 leading-[3rem] lg:leading-[4.7rem] w-[95%] lg:w-[60%] mx-auto">
                    Your mood has
                    <br />
                    <span className="green">patterns.</span> <span className="text-dim">We find them.</span>
                </div>

                <div className="hero-glow"></div>
                {/* sub text */}
                <p className="gray leading-[2rem] w-[90%] md:w-[60%] lg:w-[43%] mx-auto mt-4 md:mt-8 font-light">
                    Check in for three minutes a day. MoodMap tracks your emotional patterns and tells you — in plain English — what's actually driving your mood.
                </p>

                {/* buttons */}
                <span className="flex mt-8 gap-3">
                    <SignUpButton mode="modal">
                        <button className="bg-green text-[0.9rem] flex items-center py-2 px-3 lg:py-3 lg:px-7 font-semibold rounded-xl hover:translate-y-[1px] transform ease-in-out">
                            Start for free <ChevronRight className="size-5 ml-1"/>
                        </button>
                    </SignUpButton>

                    <a href="#how" className="bg-[#1a1a1e] white px-7 py-3 rounded-xl font-semibold hover:translate-y-[1px] transform ease-in-out border border-[#27272a] "> See how it works</a>
                </span>

                {/* info */}
                <div className="flex gap-8 md:gap-10 text-center mt-7">
                    { info.map( (i) => (
                        <div key={i.title}>
                            <h3 className="font-grotesque  text-[1.7rem] font-semibold white">{i.title} </h3>
                            <p className="text-dim text-xs">{i.subtitle} </p>
                        </div>
                    )) }
                </div>

                {/* image */}
                <div className="object-cover hidden md:flex h-fit md:mx-[2rem] lg:mx-0 mt-[5rem]">
                    <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1777158349/Screenshot_2026-04-25_at_02-05-17_MoodMap_Know_What_Drives_Your_Mood_c91qhw.png" alt="dashboard-image" />
                </div>

                <div className="object-cover md:hidden  h-fit md:mx-[2rem] lg:mx-0 mt-[5rem]">
                    <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1777478055/Screenshot_2026-04-29_at_16-53-39_MoodMap_Know_What_Drives_Your_Mood_ueylw6.png" alt="dashboard-image" />
                </div>
            </main>
        </section>
    )
}