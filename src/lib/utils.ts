interface Entry {
    id: number;
    note: string;
    mood: string;
    energy: number;
    score: number;
    created_at: Date;
}

export const formatDate = () => {
    const now = new Date();
    const dayIndex = now.getDay(); 
    const month = now.getMonth(); 
    const date = now.getDate(); 

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];

    const dayName = days[dayIndex];
    const monthName = months[month];

    // e.g. "Wednesday, Apr 29"
    return `${dayName}, ${monthName} ${date}`;
}

export const formatEntryDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
};

export const handleLabelColor = ( label:string ) => {
    if ( label == "Low" ) return {color:"red"};
    if ( label == "Meh" ) return {color:"yellow"};
    return { color:"green green-dim green-bord border" }
}

export const getWeekRange = () => {
    const now = new Date();
    const day = now.getDay();
  
    const monday = new Date(now);
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
  
    const format = (d:any) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  
    return `${format(monday)} — ${format(sunday)}`;
}

export const getThisWeekEntries = (entries : Entry[]) => {
    const now = new Date();
    const day = now.getDay();
  
    const monday = new Date(now);
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
    monday.setHours(0, 0, 0, 0);
  
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
  
    return entries.filter((e) => {
      const created = new Date(e.created_at);
      return created >= monday && created <= sunday;
    });
}

export const isCurrentWeekEntry = (created_at: Date): boolean => {
    const now = new Date();
    const day = now.getDay();

    const monday = new Date(now);
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const entryDate = new Date(created_at);
    return entryDate >= monday && entryDate <= sunday;
};

export const handleBarHeight = (score: number) => {
    if (score < 5)  return { h: "35%", color: "#802a2b" };
    if (score < 7)  return { h: "55%", color: "#fbbf24" };
    return { h: "100%", color: "#22c55e" };
}

