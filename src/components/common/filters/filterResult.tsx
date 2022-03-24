import React, { useEffect, useState } from 'react'
import Filter from './filters'
import { Close } from '@mui/icons-material';
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { objIsEqual, queryObjToString } from '@/utils/util';
import style from './filters.module.scss'

const fliterData = [
  { label: 'Content', inputs: [{ label: 'All of these words', key: "text", extra: { search_type: "all_words" } }, { label: 'Exact phrase', key: "text", extra: { search_type: "exact_phrase" } }, { label: 'Any of these words', key: "text", extra: { search_type: "any_words" } }, { label: 'These hashtags', key: "text", extra: { search_type: "hashtags" } }] },
  { label: 'Profiles', inputs: [{ label: 'Bio description', key: "bio_description" }, { label: 'From these profiles', key: "from_users" }, { label: 'To these profiles', key: "these_profiles" }, { label: 'Mentioning these profiles', key: "mention_profiles" }] },
  { label: 'Status', inputs: [{ label: 'Minimum Reclouts', key: "min_reclouts" }, { label: 'Minimum Likes', key: "min_likes" }, { label: 'Minimum Comments', key: "min_comments" }] },
  {
    label: 'NFT', inputs: [
      { 'Availability': [{ label1: 'Bidding', label2: 'Sold', key: "nft_availability", checkBox: true }] },
      { 'Initial_bid': [{ label1: 'USD', label2: 'DESO', key: "i_value_in_deso", checkBox: true, value: 'lowest_bid' }, { label: 'Min', key: "min_lowest_bid" }, { label: 'Max', key: "max_lowest_bid" }] },
      { 'Selling_price': [{ label1: 'USD', label2: 'DESO', key: "s_value_in_deso", checkBox: true, value: 'accepted_bid' }, { label: 'Min', key: "min_accepted_bid" }, { label: 'Max', key: "max_accepted_bid" }] },
      {
        'NFT_Details': [
          // { title: 'Availability', data: [{ label1: 'Bidding',label2: 'Sold', key: "nft_availability", checkBox:true }] },
          { title: 'Creator_royalty_%', data: [{ label: 'Min', key: "min_nft_royalty_to_creator", min: 0, max: 100 }, { label: 'Max', key: "max_nft_royalty_to_creator", min: 0, max: 100 }] },
          { title: 'Creator-coin_royalty_%', data: [{ label: 'Min', key: "min_nft_royalty_to_coin", min: 0, max: 100 }, { label: 'Max', key: "max_nft_royalty_to_coin", min: 0, max: 100 }] },
          { title: 'Number_of_copies', data: [{ label: 'Min', key: "min_nft_copies" }, { label: 'Max', key: "max_nft_copies" }] }
        ]
      },
    ]
  },
  // { label: 'Bio', inputs: [{ label: 'Include these words', key: "bio_search" }] },

  // { label: 'Diamonds', inputs: [{ label: 'Minimum Diamonds', key: "min_diamonds" }] },
  // { label: 'Creator Coin', inputs: [{ label: 'Minimum Coins', key: "min_coin_price" }, { label: 'Minimum Coins in Circulation', key: "min_coin_in_circulation" }, { label: 'Minimum USD Market Cap', key: "min_usd_cap" }] },
  // { label: 'DAO', inputs: [{ label: 'Minimum DAO holders', key: "min_dao_holder" }, { label: 'Total DAO coins held', key: "min_total_dao_coins" }] },
  { label: 'Date', inputs: [{ label: 'From', key: "from_date" }, { label: 'To', key: "to_date" }] },

]
interface FilterResultProps {
  title?: string;
  onClose?: () => void;
  search: () => void;
  dispatch: (data: any) => void;
}
const FilterResult = ({ title = 'Filter results by', onClose, search, dispatch }: FilterResultProps) => {
  const history = useRouter();
  const [queryObj, setQueryObj] = useState({});
  const [reset, setReset] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const { asPath, query } = history;

  useEffect(() => {
    let qObj = { ...query }
    delete qObj.name
    if (!objIsEqual(qObj, queryObj)) setQueryObj(qObj)
  }, [asPath])

  const onChange = (val: any, submit: boolean = false) => {
    let keys = Object.keys(val)[0]
    if (val[keys] === '') {
      let temp: any = { ...queryObj }
      delete temp[keys]
      setQueryObj(temp)
    }
    else {
      setQueryObj({ ...queryObj, ...val })
    }
  }
  const [active, setActive] = useState(null)
  const handleActive = (index: number) => {
    // setActive(index)
  }

  const submitForm = () => {
    let temp = { ...queryObj }
    let url = `/posts?${queryObjToString(temp)}`
    history.push(url)
    onClose && onClose()
  }

  const resetForm = () => {
    history.push('/posts?')
    setTimeout(() => { setReset(false) }, 100)
  }

  const expandAll = () => setViewAll(!viewAll)

  return <div className={style.Wrapper}>
    <div style={{ position: 'sticky', top: 65 }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <p style={{ marginTop: 20, marginLeft: 15, fontSize: 24, fontWeight: 700, marginBottom: 10 }}>{title}</p>
        <div className={style.BarIcon}>
          {/* <Close size={30} onClick={onClose} color={'primary'} /> */}
        </div>

      </div>
      <p style={{ fontSize: 16, fontWeight: 400, color: '#0E501DE3', textAlign: 'right', marginRight: 20, cursor: 'pointer' }} onClick={expandAll}>{viewAll ? 'Collapse' : 'Expand'} all</p>

      <div style={{ overflowY: 'auto', height: 'calc(100vh - 197px)' }}>
        {!reset && fliterData.map((item, index) => {
          return <Filter query={queryObj} viewAll={viewAll} label={item.label} handleActive={handleActive} activeIndex={active} inputs={item.inputs} onChange={onChange} onKeyDown={submitForm}
            key={`fr${index}`} index={index} search={search} getState={(data: any) => { dispatch({ type: 'FILTERQUERY', data: JSON.stringify(data) }) }} />
        })}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 15, marginTop: 20 }}>
          <div className={style.FilterBtn} onClick={submitForm}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#ABFE2D' }}>Apply Filters</p>
          </div>
          <div style={{ height: 39, display: 'flex', justifyContent: 'center', cursor: 'pointer', alignItems: 'center' }} onClick={resetForm}>
            <p style={{ fontSize: 16, fontWeight: 400, color: '#7EA186'}}>Reset</p>
          </div>
        </div>
      </div>

    </div>
  </div>
}

const mapStateToProps = (state: any) => {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(FilterResult)