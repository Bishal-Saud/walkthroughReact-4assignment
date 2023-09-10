import { useEffect, useState } from "react"
import "../styles/HomePage.css"
import { PhotoCard } from "../Component/PhotoCard";
import useDebounce from "../CustomHook/useDebounce";
import axios from "axios";

export const HomePage = ()=>{
const [photoData,setPhotoData] = useState([]);
const [query,setQuery] =useState("Bishal-Saud");
const debounceUpdateSearch = useDebounce((e) => setQuery(e.target.value));

const getData = async()=>{
    try {
        const resp = await axios.get(`https://api.github.com/search/users?q=${query||"Bishal-Saud"}`)

console.log('res',resp);
        const data = await resp.data
        console.log('data',data);
        setPhotoData(data.items)
    } catch (error) {
        console.log("Error while fetching Data",error.message) 
    }
}

const updateQuery=useDebounce()

useEffect(()=>{
    getData()
},[query])


return(
<div>
            <div>
                <input type="text" onChange={debounceUpdateSearch} id="userInput" placeholder="Enter photo Id"/>
            </div>
            <div id="imageContainer">
               {
                photoData?.map((e)=>{
                    return <PhotoCard key={e.avatar_url} id={e.login} url={e.avatar_url}/>
                })
               }
              
            </div>
        </div>

)

} 