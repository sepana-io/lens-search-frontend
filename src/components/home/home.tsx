import type { NextPage } from 'next'
import { Grid } from '@mui/material'
import Post from '@/components/common/post/post'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState, useEffect } from 'react'
import { mock } from './mockData'
import FilterResult from '../common/filters/filterResult'
import useData from './hook'
import style from './home.module.scss'
const Home: NextPage = () => {

    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)


    const data = useData(page);

    return (
        <Grid container justifyContent='space-between' style={{ width: '100%', marginTop: 80 }}>
            <Grid item xs={4}>
                <FilterResult />
            </Grid>

            <Grid item xs={8}>
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

                        {data.map(item => {
                            return <Post key={item._id} post={item} />
                        })}
                    </InfiniteScroll>
                </div>
            </Grid>

        </Grid>
    )
}

export default Home
