
const reviews =[
    { text:"I had no idea my Sundays were making me anxious until MoodMap pointed it out after three weeks. That one insight changed how I plan my weekends.", name:"Amara M.", job:"Product Designer ", initials:"AM " },
    { text:" I've tried journaling apps before but they always feel like homework. This is just three questions and a text box. I've kept a streak for 6 weeks.", name:"James O. ", job:"Software Engineer ", initials:"JO " },
    { text:"The weekly AI report is the part I look forward to most. It actually reads my entries and makes connections I would have completely missed. ", name:"Sofia R. ", job:"Freelance Writer ", initials:"SR " }
]

export default function Reviews (){

    return(
        <section id="reviews" className="w-full" >
            <main className="sect-w mt-[7rem] ">
                <p className="sect-title">WHAT PEOPLE SAY</p>
                <h1 className="sect-head">Real people. Real patterns found.</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
                    { reviews.map( (r) => (
                        <div key={r.job} className="bg-[#111113] gray rounded-xl text-[0.83rem] border bord hover:border-gray-400 p-6 font-inter">
                            <p className="text-[#fbbf24]  ">★★★★★</p>
                            <p className=" mt-2 text-sm">"{r.text}" </p>   
                            <span className="inline-flex items-center gap-2 mt-4">
                                <p className="border bord p-1.5 bg-[#1a1a1e] rounded-full  font-semibold">{r.initials} </p>
                                <div>
                                    <p className="white font-semibold ">{r.name}</p>
                                    <p className="text-dim text-xs">{r.job}</p>
                                </div>
                            </span>
                        </div>
                    )) }
                </div>
            </main>
        </section>
    )
}