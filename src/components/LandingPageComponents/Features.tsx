import { Calendar, Lightbulb, Pencil, Tag, TrendingUp } from "lucide-react";

const moods = [
    { id:"1", desc:"Low" },
    { id:"2", desc:"Meh" },
    { id:"3", desc:"Great" },
    { id:"4", desc:"Amazing" }
]

const td = [
    { id:"1", desc:"deadlines" },
    { id:"2", desc:"skipped lunch" }
]

const icon = "green-dim inline-flex border border-[#143923] p-2 rounded-md "
const title = "white font-grotesque text-[1.2rem] font-semibold mt-3"
const subtitle = "gray text-sm mt-2 leading-[1.4rem]"
const mood = "border bord py-2 text-xs text-gray-500 rounded-md flex justify-center truncate "

export default function Features (){

    return(
        <section id="features" className="w-full" >
            <main className="sect-w mt-[7rem] ">
                <p className="sect-title ">FEATURES</p>
                <h1 className="sect-head">Everything you need to understand yourself.</h1>
                <p className="sect-p">Built around one idea — small daily inputs lead to deep long-term clarity.</p>

                {/* grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 rounded-2xl md:border bord font-inter mt-8">
                    {/* first */}
                    <div className="p-5 lg:p-7 bg-[#111113] rounded-t-2xl md:rounded-tl-2xl md:rounded-tr-none md:col-span-2 border md:border-r md:border-b md:border-t-0 bord  hover:bg-[#151517] transition ease-in-out">
                        {/* icon */}
                        <div className={`${icon}`}>
                            <Pencil className=" fill-[#22c55e] text-[#121e18] size-5"/>
                        </div>
                        <h3 className={`${title}`}>Daily check-in — done in 3 minutes</h3>
                        <p className={`${subtitle}`}>Pick your mood, rate your energy, write a quick note. No pressure, no lengthy forms. Just a consistent daily signal that compounds into something meaningful over time.</p>
                        <span className="grid grid-cols-5 gap-2 md:gap-4 my-6">
                            { moods.slice(0 , 2).map( (m) => (
                                <p className={`${mood}`} key={m.id}>{m.desc} </p>
                            )) }

                            <p className="border border-[#22c55e] green-dim  py-2  text-xs green rounded-md flex justify-center">Good</p>

                            { moods.slice(2).map( (m) => (
                                <p className={`${mood}`} key={m.id}>{m.desc} </p>
                            )) }
                        </span>
                    </div>

                    {/* second */}
                    <div className="p-5 lg:p-7 bg-[#111113]  md:rounded-tr-2xl col-span-1 border-b bord hover:bg-[#151517] transition ease-in-out">
                        {/* icon */}
                        <div className={`${icon}`}>
                            <TrendingUp className="  text-[#22c55e] size-5"/>
                        </div>
                        <h3 className={`${title}`}>Weekly AI report</h3>
                        <p className={`${subtitle}`}>AI reads your entries and surfaces patterns — mood triggers, recurring themes, and what's actually driving your ups and downs.</p>

                        <p className="purple p-4 italic text-[0.8rem] mt-6 rounded-xl">"Mood dips on Mondays. Sleep may be a factor — mentioned tiredness 3x this week."</p>
                        
                    </div>

                    {/* third */}
                    <div className="p-5 lg:p-7 border-b bord md:border-none bg-[#111113] md:rounded-bl-2xl  hover:bg-[#151517] transition ease-in-out">
                        {/* icon */}
                        <div className={`${icon}`}>
                            <Calendar className="  text-[#22c55e] size-5"/>
                        </div>
                        <h3 className={`${title}`}>Mood calendar</h3>
                        <p className={`${subtitle}`}>A visual record of every day you checked in. See your emotional history at a glance and spot patterns you'd never notice in text.</p>
                        <div className="flex items-end gap-1.5 h-[70px] mt-6">
                            {[
                                { h: '35%', type: 'lo' },
                                { h: '58%', type: 'mi' },
                                { h: '72%', type: 'hi' },
                                { h: '65%', type: 'hi' },
                                { h: '80%', type: 'hi' },
                                { h: '45%', type: 'mi' },
                                { h: '60%', type: 'mi' },
                            ].map((bar, i) => (
                                <div
                                    key={i}
                                    style={{ height: bar.h }}
                                    className={`flex-1 rounded-t-[3px] transition-all duration-500
                                        ${bar.type === 'hi' ? 'bg-[#22c55e]' : ''}
                                        ${bar.type === 'mi' ? 'bg-[#3f3f46]' : ''}
                                        ${bar.type === 'lo' ? 'bg-[#ef444440]' : ''}
                                    `}
                                />
                            ))}
                        </div>
                    </div>

                    {/* fourth */}
                    <div className="p-5 lg:p-7 border-b md:border-x bord bg-[#111113] hover:bg-[#151517] transition ease-in-out">
                        {/* icon */}
                        <div className={`${icon}`}>
                            <Tag className="  fill-[#22c55e] text-[#22c55e] size-5"/>
                        </div>
                        <h3 className={`${title}`}>Trigger detection</h3>
                        <p className={`${subtitle}`}>MoodMap identifies what words and themes appear most on your worst days — so you know what to watch for.</p>

                        <span className=" grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-3 mt-3">
                            <p className="border border-[#22c55e] green-dim  py-1  text-xs green rounded-xl flex justify-center truncate">poor sleep</p>

                            { td.map( (t)=> (
                                <p className="border bord py-1 text-xs text-gray-500 rounded-xl flex justify-center truncate" key={t.id}>{t.desc} </p>
                            )) }

                            <p className="border border-[#22c55e] green-dim  py-1  text-xs green rounded-xl flex justify-center truncate">exercise</p>
                        </span>
                        
                    </div>

                    {/* fifth */}
                    <div className="p-5 lg:p-7 border-b bord md:border-none bg-[#111113] rounded-b-2xl md:rounded-br-2xl md:rounded-bl-none hover:bg-[#151517] transition ease-in-out">
                        {/* icon */}
                        <div className={`${icon}`}>
                            <Lightbulb className="  fill-[#22c55e] text-[#22c55e] size-5"/>
                        </div>
                        <h3 className={`${title}`}>Streak & progress</h3>
                        <p className={`${subtitle}`}>Building a habit is half the work. Streaks keep you consistent — and your progress over months is something you can actually see.</p>
                        
                    </div>
                </section>
                
            </main>
        </section>
    )
}