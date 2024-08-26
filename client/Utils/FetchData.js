const fetchData=async(url,option={})=>{
    try {
        const res=await fetch(process.env.NEXT_PUBLIC_DB_HOST+url,option)
        const data=await res.json()
        return data
    } catch (error) {
        alert(error)
    }
}
export default fetchData