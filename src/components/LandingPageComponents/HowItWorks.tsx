
const how = [
    { id:"01", title:"Check in", sub:"Pick your mood, rate your energy, write a quick note. Takes less than three minutes. No pressure." },
    { id:"02", title:"Build your history", sub:"Your mood calendar fills up over time. Every entry is a data point that makes your weekly report more accurate." },
    { id:"03", title:"Read your AI report", sub:"Every week, AI reads your entries and tells you what it noticed — in plain English, not charts you have to interpret." },
    { id:"04", title:"Understand yourself", sub:"Over months you build a real picture of what affects you. What helps. What hurts. What you need more of." }
]

export default function HowItWorks (){

    return(
        <section id="how" className="mt-[5rem] bg-[#111113] bg-opacity-70 border bord">
            <main className="sect-w py-[4rem]">
                <p className="sect-title">HOW IT WORKS</p>
                <h1 className="sect-head">Simple by design.</h1>
                <p className="sect-p">Four steps. Three minutes a day. Real insight over time.</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 md:border border-x bord rounded-2xl mt-7">
                { how.slice(0,1).map( (h) => (
                        <div key={h.id} className="px-6 py-7 border-t md:border-t-0 md:border-r md:border-b lg:border-r bord font-grotesque hover:border-[#22c55e] hover:border-t-2 hover:border-r-[#27272a] hover:bg-[#151517] transition ease-in-out rounded-t-2xl md:rounded-tr-none lg:rounded-tl-2xl">
                            <h1 className="text-dim text-[2.5rem] font-bold">{h.id} </h1>
                            <h3 className="white font-semibold text-[1.2rem]">{h.title} </h3>
                            <p className="gray mt-2 text-[0.83rem] font-inter">{h.sub} </p>
                        </div>
                   )) } 
                   { how.slice(1,3).map( (h) => (
                        <div key={h.id} className="px-6 py-7 border-t md:border-t-0 lg:border-r bord font-grotesque hover:border-[#22c55e] hover:border-t-2 hover:border-r-[#27272a] hover:bg-[#151517] transition ease-in-out">
                            <h1 className="text-dim text-[2.5rem] font-bold">{h.id} </h1>
                            <h3 className="white font-semibold text-[1.2rem]">{h.title} </h3>
                            <p className="gray mt-2 text-[0.83rem] font-inter">{h.sub} </p>
                        </div>
                   )) } 
                   { how.slice(3).map( (h) => (
                        <div key={h.id} className="px-6 py-7 border-y md:border-b-0 md:border-l bord font-grotesque hover:border-[#22c55e] hover:border-t-2 hover:border-r-[#27272a] hover:bg-[#151517] transition ease-in-out rounded-b-2xl md:rounded-bl-none lg:rounded-tr-2xl">
                            <h1 className="text-dim text-[2.5rem] font-bold">{h.id} </h1>
                            <h3 className="white font-semibold text-[1.2rem]">{h.title} </h3>
                            <p className="gray mt-2 text-[0.83rem] font-inter">{h.sub} </p>
                        </div>
                   )) } 
                </div>
            </main>
        </section>
    )
}