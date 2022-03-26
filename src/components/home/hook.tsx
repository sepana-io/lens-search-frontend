import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const useData = (page: number) => {

    const router = useRouter();
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        let parameters = router.asPath.split('?')[1]
        let urlPath = 'publications'
        if (router.query.result_type === "profiles") {
            urlPath = 'profiles'
            parameters.replace('result_type=profiles', '')
        }
        else if (router.query.result_type !== undefined) {
            parameters.replace('result_type=' + router.query.result_type, '')
        }
        axios.get(`/${urlPath}?${parameters}${page > 1 ? '&page=' + page : ''}`)
            .then((res: any) => {
                // console.log('res', res)
                if (page > 1) {
                    setData([...data, ...res.data.data])
                }
                else {
                    setData(res.data.data)
                }
            })
    }, [router, page])

    return { data }
}
export default useData;