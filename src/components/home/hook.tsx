import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const useData = (page: number) => {
    console.log('page', page)
    const router = useRouter();
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        const parameters = router.asPath.split('?')[1]
        axios.get(`/contents?${parameters}${page > 1 ? '&page=' + page : ''}`)
            .then((res: any) => {
                if (page > 1) {
                    setData([...data, ...res.data.data])
                }
                else {
                    setData(res.data.data)
                }
            })
    }, [router, page])

    return data
}
export default useData;