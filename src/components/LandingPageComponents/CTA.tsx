import { SignUpButton } from "@clerk/clerk-react";
import { ChevronRight } from "lucide-react";

export default function CTA (){

    return (
        <section className="mt-[7rem] mb-[5rem] w-[90%] md:w-[80%] lg:w-[45%] mx-auto border bord rounded-2xl bg-[#111113] ">
            <div className="py-[4rem]  font-inter flex flex-col justify-center items-center place-content-center text-center">
                <div className="text-sm green py-1.5 px-4 rounded-3xl border font-medium border-[#0f3920] bg-[#0b1711] inline-flex gap-2 items-center justify-center truncate w-none">
                    <div className="announce-dot animate-pulse"></div>
                    Free to start
                </div>
                <h1 className="text-[2rem] lg:text-[3rem] font-bold white leading-[2.2rem] lg:leading-[3.3rem] w-[80%] font-grotesque  mt-6">Start tracking today. Find your patterns.</h1>
                <div className="cta-glow"></div>
                <p className="gray leading-[2rem] w-[90%] md:w-[70%]  lg:w-[60%] mx-auto mt-5 font-light">Three minutes a day. A clearer picture of yourself over time. No credit card required.</p>

                <SignUpButton mode="modal">
                    <button className="bg-green mt-5 text-[0.9rem] flex items-center py-3 px-7 font-semibold rounded-xl hover:translate-y-[1px] transform ease-in-out">
                        Create your free account <ChevronRight className="size-5 ml-1"/>
                    </button>
                </SignUpButton>

                <p className="gray leading-[2rem] w-[90%]  lg:w-[60%] mx-auto mt-5 font-light">No credit card · Free forever plan</p>
            </div>
        </section>
    )
}