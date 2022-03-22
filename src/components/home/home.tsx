import type { NextPage } from 'next'
import { Grid } from '@mui/material'
import Filters from '@/components/common/filters/filters'
import Post from '@/components/common/post/post'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react'
import { mock } from './mockData'

const Home: NextPage = () => {

    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const fetchData = (query: string, page: number) => {
    }

    return (
        <div>
            <Grid container justifyContent='space-between' style={{ width: '100%' }}>
                <Grid item xs={3}>
                    <Filters />
                </Grid>

                <Grid item xs={9}>
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
        </div>
    )
}

export default Home
