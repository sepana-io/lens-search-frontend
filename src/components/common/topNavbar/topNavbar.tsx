import React, { useState, useEffect } from 'react'
import UnderlineIcon from '../../../assets/icons/Active.svg'
import { useRouter } from 'next/router'
import { objIsEqual, queryObjToString, queryStringToObject } from '../../../utils/util'
interface Props {
    data: any[]
}

const TopNavBar = ({ data = [] }:Props) => {
  const history = useRouter()
  const [queryObj, setQueryObj] = useState({});
  const { asPath } = history

  const onChangeTab = (label: string): void => {
    let tempObj = { ...queryObj, result_type: label }
    if (objIsEqual(tempObj, queryObj)) return;
    history.push(`/deso/posts?${queryObjToString(tempObj)}`)
  }

  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    let tempQueryObj = queryStringToObject(asPath)
    if (!objIsEqual(tempQueryObj, queryObj)) setQueryObj(tempQueryObj)
    let { result_type } = tempQueryObj
    if (result_type) {
      if(result_type === 'nft'){
        setActiveIndex(data.indexOf(result_type.toUpperCase()))
      }
      else{
        setActiveIndex(data.indexOf(result_type.charAt(0).toUpperCase() + result_type.slice(1)))
      }
    }
    else setActiveIndex(0)
  }, [asPath])

  return (
    <div style={{ width: '100%', maxWidth:500, height: 50, display: 'flex', justifyContent: 'space-around', paddingTop: 20 }}>
      {data.map((item, index): any => <TopicName key={index} label={item} active={index === activeIndex} onClick={() => onChangeTab(item.toLowerCase())} />)}
    </div>
  )
}

export default TopNavBar;

const TopicName = ({ label, active = false, onClick }: any) => {
  return <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', cursor: 'pointer' }}
    onClick={() => onClick()}>
    <p style={{ marginBottom: 5, width: 70, textAlign: 'center', color: active ? '#0E501D' : '#000', fontWeight: 700, fontSize: 16 }}>{label}</p>
    {active && <UnderlineIcon />}
    <UnderlineIcon />
  </div>
}