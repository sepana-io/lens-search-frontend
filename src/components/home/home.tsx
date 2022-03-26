import type { NextPage } from 'next'
import { Grid } from '@mui/material'
import Post from '@/components/common/post/post'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState, useEffect } from 'react'
import FilterResult from '@/components/common/filters/filterResult'
import useData from './hook'
import style from './home.module.scss'
import TopNavBar from '@/components/common/topNavbar/topNavbar'
import Profile from '@/components/common/Profile/Profile'
const Home: NextPage = () => {

    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)

    const topData: any[] = ['Top', 'Latest', 'Profiles', 'Links', 'Photo']
    const { data } = useData(page);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (loading && data.length <= 10) {
            setLoading(false)
        }
    }, [loading, data])

    return (
        <Grid container justifyContent='space-between' style={{ width: '100%', marginTop: 72 }}>
            <Grid item xs={4}>
                <FilterResult />
            </Grid>

            <Grid item xs={8}>
                <TopNavBar data={topData} onTabChange={() => setPage(1)} />
                <div>
                    <InfiniteScroll
                        dataLength={data.length} //This is important field to render the next data
                        next={() => setPage(page + 1)}
                        hasMore={hasMore}
                        loader={<div className={style.wrapper}>
                            <h3>Loading</h3>
                        </div>
                        }
                    >
                        {loading && <div className={style.wrapper}>
                            <h3>Loading</h3>
                        </div>}

                        {!loading && data.map(item => {
                            if (item?.profile?.handle === undefined) {
                                return <Profile key={item._id} post={item} />
                            }
                            return <Post key={item._id} post={item} />
                        })}
                    </InfiniteScroll>
                </div>
            </Grid>

        </Grid>
    )
}

export default Home
