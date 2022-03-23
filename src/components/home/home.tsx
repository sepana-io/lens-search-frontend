import type { NextPage } from 'next'
import { Grid } from '@mui/material'
import Post from '@/components/common/post/post'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react'
import { mock } from './mockData'
import FilterResult from '../common/filters/filterResult'

const Home: NextPage = () => {

    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const fetchData = (query: string, page: number) => {
    }

    return (
        <Grid container justifyContent='space-between' style={{ width: '100%' }}>
            <Grid item xs={4}>
                <FilterResult />
            </Grid>

            <Grid item xs={8}>
                <div>
                    <InfiniteScroll
                        dataLength={mock.length} //This is important field to render the next data
                        next={() => fetchData('query', page + 1)}
                        hasMore={hasMore}
                        loader={<h3>Loading</h3>}
                    >
                        {mock.map(item => {
                            return <Post key={item.title} user={item} />
                        })}
                    </InfiniteScroll>
                </div>
            </Grid>

        </Grid>
    )
}

export default Home
