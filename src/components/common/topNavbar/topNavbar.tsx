import React, { useState, useEffect } from 'react'
import UnderlineIcon from '../../../assets/icons/Active.svg'
import { useRouter } from 'next/router'
import { objIsEqual, queryObjToString, queryStringToObject } from '../../../utils/util'
import { borderRadius } from '@mui/system'
import style from './topNavbar.module.scss';
interface Props {
  data: any[];
  onTabChange: () => void;
}

const TopNavBar = ({ data = [], onTabChange }: Props) => {
  const history = useRouter()
  const [queryObj, setQueryObj] = useState({});
  const { asPath } = history

  const onChangeTab = (label: string): void => {
    onTabChange()
    let tempObj = { ...queryObj, result_type: label }
    if (objIsEqual(tempObj, queryObj)) return;
    history.push(`/posts?${queryObjToString(tempObj)}`)
  }

  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    let tempQueryObj = queryStringToObject(asPath)
    if (!objIsEqual(tempQueryObj, queryObj)) setQueryObj(tempQueryObj)
    let { result_type } = tempQueryObj
    if (result_type) {
      if (result_type === 'nft') {
        setActiveIndex(data.indexOf(result_type.toUpperCase()))
      }
      else {
        setActiveIndex(data.indexOf(result_type.charAt(0).toUpperCase() + result_type.slice(1)))
      }
    }
    else setActiveIndex(0)
  }, [asPath])

  return (
    <div className={style.wrapper}>
      {data.map((item, index): any => <TopicName key={index} label={item} active={index === activeIndex} onClick={() => onChangeTab(item.toLowerCase())} />)}
    </div>
  )
}

export default TopNavBar;

const TopicName = ({ label, active = false, onClick }: any) => {
  return <div className={style.topicName}
    onClick={() => onClick()}>
    <p className={`${style.text} ${active ? style.active : style.notactive}`}>{label}
      {active && <UnderlineIcon />}
    </p>
  </div>
}