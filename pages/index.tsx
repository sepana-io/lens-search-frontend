import type { NextPage } from 'next'
import { Grid } from '@mui/material'
import Filters from '@/components/common/filters/filters'
import Post from '@/components/common/post/post'

const Home: NextPage = () => {
  return (
    <div>
      <Grid container justifyContent='space-between' style={{ width: '100%' }}>
        <Grid item xs={3}>
          <Filters />
        </Grid>

        <Grid item xs={9}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <Post />
          </div>
        </Grid>

      </Grid>
    </div>
  )
}

export default Home
