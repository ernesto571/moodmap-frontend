import { Loader } from "lucide-react";

export default function Loading(){

    return (
        <div className="h-screen  flex items-center justify-center ">
          <Loader className="size-10 animate-spin green" />
        </div>
    )
}