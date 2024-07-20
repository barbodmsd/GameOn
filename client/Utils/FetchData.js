const fetchData=async(url,option={})=>{
    try {
        const res=await fetch("http://localhost:7000/"+url,option)
        const data=await res.json()
        return data
    } catch (error) {
        alert(error)
    }
}
export default fetchData