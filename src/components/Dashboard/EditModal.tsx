import { useEffect, useState } from "react";
import { useEntryStore } from "../../store/EntryStore";

interface Props {
    onClose: () => void
    entry?: any
}

const moods = [
    {id:"1", label:"Low"},
    {id:"2", label:"Meh"},
    {id:"3", label:"Good"},
    {id:"4", label:"Great"},
    {id:"5", label:"Amazing"}
]

const energy_levels = [
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5}
]

const title = "tracking-widest gray-2 text-[0.7rem] font-semibold"

export default function EditModal ( { onClose, entry }: Props ){

    const [mood, setMood] = useState(entry.mood);
    const [energy, setEnergy] = useState(entry.energy);
    const [note, setNote] = useState(`${entry.note}`);
    const { updateEntry, isLoading, formData, setFormData } = useEntryStore()
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value)
        setFormData({ note : e.target.value });
    };

    const handleMoodChange = (label: string) => {
        setMood(label)
        setFormData({ mood: label })
    }

    const handleEnergyChange = (id: number) => {
        setEnergy(id)
        setFormData({ energy: id })
    }

    const handleEdit = async () => {
        try {
            if ( entry ){
                return await updateEntry( entry.id, formData )
            }
        } catch (error) {
           console.error(error) 
        } finally {
            onClose() 
        }

        
    }
    useEffect(() => {
        if ( entry ) {
          setFormData({
            mood: entry.mood,
            note: entry.note,
            energy: entry.energy
          })
          
        }
    }, [entry])

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm w-full">
            <div className="px-2 md:px-6 dark-dim border bord rounded-xl w-[95%] md:w-[80%] lg:w-[60%] mx-auto">
                {/* heading */}
                <span className=" font-inter flex justify-between">
                    <p className="white text-[0.9rem] font-semibold py-4 px-3 md:px-5">Today's Check-in</p>
                    <button onClick={onClose} className="gray-2 hover:text-[#fafafa] text-xs font-light">✕</button>
                </span>
                
                <div className="py-4 px-3 md:px-5 border-t bord font-inter">
                    <section>
                        <h3 className={`${title}`}>HOW ARE YOU FEELING TODAY?</h3>
                        {/* buttons */}
                        <span className="grid grid-cols-5 gap-3 mt-3">
                            { moods.map((m) => (
                                <button key={m.label} aria-pressed={mood === m.label} onClick={() => handleMoodChange(m.label)} className={`py-2 rounded-lg text-xs ${mood === m.label ? "green-bord green green-dim border" :"border bord gray"}`}>
                                    {m.label}
                                </button>
                            )) }
                        </span>
                    </section>
                    {/* input */}
                    <section className="mt-4">
                        <h3 className={`${title}`}>WHAT'S ON YOUR MIND?</h3>
                        <textarea value={formData.note && note} name="text" onChange={handleChange} maxLength={500} className="mt-2 h-[200px] md:h-[150px] lg:h-[100px] w-full rounded-lg border bord white resize-none bg-gray px-4 py-3 text-sm focus:outline-none"/>

                    </section>

                    {/* energy */}
                    <section className="mt-4">
                        <h3 className={`${title}`}>ENERGY LEVEL</h3>
                        <span className="flex gap-2 items-center mt-2">
                            { energy_levels.map((e) => (
                                <button  key={e.id} onClick={() => handleEnergyChange(e.id)} className={`h-2 w-8 rounded-full transition-colors ${
                                    e.id <= energy ? "bg-green" : "bg-gray "
                                }`}/>
                            )) }
                            <p className="text-xs gray-2 font-medium pl-2">{energy} / 5 </p>
                        </span>
                    </section>

                    <span className="flex justify-between items-center mt-4">
                        <p className={`text-[0.68rem] font-medium ${note.length > 11000 ? "text-red-400" : "gray-2"}`}>{note.length} / 500</p>
                        <button onClick={handleEdit} disabled={isLoading} className="bg-green rounded-lg py-2 px-6 font-medium text-sm hover:brightness-75 disabled:cursor-not-allowed disabled:opacity-30">{isLoading ? "Saving..." : "Save Entry"}</button>
                    </span>
                </div>
            </div>
        </section>
    )

}