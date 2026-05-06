import { Link } from "react-router-dom";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { navLinks } from "../../constants";

export default function Navbar(){


    return(
        <div className={`fixed top-0 left-0 py-2 px-4 lg:px-8 w-full  md:py-3 z-10 transition-all duration-300 black  border-b border-[#27272a] 
        `}>
            <section  className="flex justify-between mx-auto items-center">
                
                <Link to="/" className="flex items-center">
                    
                    <span className="font-grotesque text-[1.2rem] font-semibold white flex" >Mood<p className="green">Map</p></span>
                </Link>

                <span className="hidden md:flex gap-9 text-[0.92rem] justify-center gray font-inter  tracking-tight ">
                    {navLinks.map((link) => (
                        <div key={link.id}>
                            <a href={link.id} className="hover:text-white">
                            {link.title}
                            </a>
                        </div>
                    ))}
                </span>
                
                <div className="flex gap-8 font-inter text-[0.92rem] tracking-tight items-center">
                    <SignInButton mode="modal">
                        <p className=" justify-center gray  hover:text-gray-100 hover:cursor-pointer">Sign in</p>
                    </SignInButton>

                    
                    <SignUpButton mode="modal">
                        <button className=" hidden md:flex bg-green py-1.5 px-4 font-medium rounded-lg hover:translate-y-[1px] transform ease-in-out">
                            Get started free
                        </button>
                    </SignUpButton>
                </div>
                
            </section>
        </div>
    )
}