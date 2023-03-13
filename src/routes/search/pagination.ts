import { goto } from "$app/navigation"

export function paginate(sign:number, oldURL:URL){
    let newURL = new URL(oldURL)
    newURL.searchParams.set("p", (parseInt(oldURL.searchParams.get("p")||"")+sign).toString() || "1")
    return goto(newURL)
}