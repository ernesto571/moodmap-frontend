const footerLinks = [
    {name:"Privacy"},
    {name:"Terms"},
    {name:"Contact"}
]
export default function Footer (){

    return(
        <footer className="dark-dim py-3 md:px-6 border-t bord">
            <div className="grid gap-2 lg:gap-0 md:flex md:justify-between items-center font-inter">
                <span className="font-grotesque text-[1.2rem] font-semibold white flex justify-center" >Mood<p className="green">Map</p></span>
                <p className="gray text-xs text-bold font-satoshi hover:text-white flex justify-center">© 2025 MoodMap. Know yourself better.</p>

                <span className="flex gap-5 justify-center">
                    { footerLinks.map( (f) => (
                        <a href="#" key={f.name} className="gray text-xs text-bold font-satoshi hover:text-white">{f.name}</a>
                    )) }
                </span>

            </div>
        </footer>
    )
}