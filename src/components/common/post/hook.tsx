import { useState, useEffect } from "react"
import axios from "axios"


const useComments = ( id: string) => {
    const [data, setData] = useState<any>();
    const getComments = () => {
        axios.get(`/comments?pub_id=${id}`).then((res: any) => {
            setData(res.data)
        })
    }
    useEffect(() => {
        if (id) {
            getComments()
        }
    }, [id])
    return data
}

export default useComments