import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from '@/components/header/header'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>SEPANA</title>
    </Head>
    <Provider store={store}>
      <div style={{ width: '100vw' }}>
        <Header />
      </div>
      <div style={{ maxWidth: 1200, width: '100vw', marginRight: 'auto', marginLeft: 'auto' }}>
        <Component {...pageProps} />
      </div>
    </Provider >
  </>
}

const initialState = {
  query: JSON.stringify({}),
  search: '',
  filterQueries: JSON.stringify({ posts: false, reClouts: true, replies: false }),
  exchange: 100,
  searchData: JSON.stringify({ data: [] })
}
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'EXCHANGE':
      return {
        ...state,
        exchange: action.data
      }
    case 'QUERY':
      return {
        ...state,
        query: action.data
      }
    case 'SEARCH':
      return {
        ...state,
        search: action.data
      }
    case 'FILTERQUERY':
      return {
        ...state,
        filterQueries: action.data
      }
    case 'SEARCH_DATA_ASYNC':
      return {
        ...state,
        searchData: action.data
      }
    default:
      return state
  }
}

const store = createStore(reducer)


export default MyApp
