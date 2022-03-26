import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { Add, Remove } from '@mui/icons-material';
import Bio from '../../../assets/icons/Bio.svg'
import Coin from '../../../assets/icons/Coin2.svg'
import Content from '../../../assets/icons/Content.svg'
import Daimonds from '../../../assets/icons/Daimonds.svg'
import Date from '../../../assets/icons/Date.svg'
import Engagement from '../../../assets/icons/Engagement.svg'
import Users from '../../../assets/icons/Users.svg'
import NFT from '../../../assets/icons/nft.svg'
import DAO from '../../../assets/icons/clarity_group-line.svg';
import App from '../../../assets/icons/app.svg';
import { FilterCheckBox, FilterNoCheckBox } from './filterCheckbox'
import style from './filters.module.scss'
import Autocomplete from '@mui/material/Autocomplete';

const getIcon = (label: string) => {
  switch (label) {
    case 'Content': return <Content />
    case 'Bio': return <Bio />
    case 'Profiles': return <Users />
    case 'Publications': return <Engagement />
    case 'Diamonds': return <Daimonds />
    case 'Creator Coin': return <Coin />
    case 'NFT': return <NFT />
    case "DAO": return <DAO />
    case 'App': return <App />
    default: return <Date />
  }
}

interface FilterProps {
  query: any;
  viewAll: boolean;
  label: string;
  inputs: any[];
  active?: boolean;
  onChange: (val: any, submit?: boolean) => void;
  handleActive: (index: number) => void;
  index: number;
  activeIndex: number | null;
  search: () => void;
  onKeyDown: () => void;
  getState: (data: any) => void;
}

const Filter = (props: FilterProps) => {
  const { query, viewAll, label, inputs, active = false, onChange, handleActive, index, activeIndex, search, onKeyDown, getState } = props

  const [isActive, setIsActive] = useState<boolean>(active)
  const [resetIndex, setResetIndex] = useState<number | null>(null)
  const handleRefresh = (index: number) => {
    setResetIndex(index)
  }
  const handleAdd = () => {
    handleActive(index)
    setIsActive(!isActive)
  }

  useEffect(() => {
    if (activeIndex !== index) {
      setIsActive(false)
    }
    setIsActive(viewAll)
  }, [activeIndex, viewAll])

  const getType = () => {
    if (label === 'Engagement') return 'number'
    if (label === 'Diamonds') return 'number'
    if (label === 'Creator Coin') return 'number'
    if (label === 'Date') return 'date'
    if (label === 'NFT') return 'number'
    if (label === 'DAO') return 'number'
    if (label === 'App') return 'dropdown'
    return 'text'
  }

  const options = [{ label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }];

  const getInitialValues = (item: any) => {
    let q_keys = query ? Object.keys(query) : []
    if (q_keys.includes(item.key)) {
      if (!item.extra) return query[item.key]
      let [extra_k, extra_v]: any = Object.entries(item.extra)[0]
      if (q_keys.includes(extra_k) && query[extra_k] === extra_v) return query[item.key]
      if (extra_v === "all_words" && !q_keys.includes(extra_k)) return query[item.key]
    }
    return ""
  }

  return (
    <div className={style.FilterWrapper}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, cursor: 'pointer' }} onClick={() => handleAdd()}>
        <div className={style.flexrowCenter}>
          <div className={style.icon}>
            {getIcon(label)}
          </div>
          <p style={{ marginLeft: 10, fontWeight: 700, fontSize: 18 }}>{label}</p>
        </div>
        {isActive ? <Remove onClick={() => setIsActive(false)} /> : <Add />}
      </div>
      <div style={{ maxHeight: isActive ? 700 : 0, transition: 'max-height 0.3s ease-in-out', overflow: 'hidden' }}>
        {inputs.map((item: any, index: number) => {
          if (label === 'NFT') {
            return <MultiInputs data={item} query={query} onChange={onChange} key={`fi${index}`} onFocus={handleRefresh} resetIndex={resetIndex} search={search} onKeyDown={onKeyDown} />
          }
          return <FilterInputs initialVlue={getInitialValues(item)} item={item} onChange={onChange} key={`fi${index}`} index={index} onFocus={handleRefresh} type={getType()} options={options} onKeyDown={onKeyDown} />
        })}
        {/* <PRRFilter label={label} getState={getState}/> */}
      </div>
    </div>
  )
}

export default Filter;

interface MultiInputsProps {
  data: any;
  query: any;
  onChange: (val: any, submit?: boolean | undefined) => void;
  onFocus: (index: number) => void;
  resetIndex: number | null;
  search: () => void;
  onKeyDown: () => void;
}
const MultiInputs = ({ data, query, onChange, onFocus, resetIndex, search, onKeyDown }: MultiInputsProps) => {

  const getInitialValues = (item: any) => {
    let q_keys = query ? Object.keys(query) : []
    if (q_keys.includes(item.key)) {
      if (!item.extra) return query[item.key]
      let [extra_k, extra_v] = Object.entries(item.extra)[0]
      if (q_keys.includes(extra_k) && query[extra_k] === extra_v) return query[item.key]
      if (extra_v === "all_words" && !q_keys.includes(extra_k)) return query[item.key]
    }
    return ""
  }

  const clearText = (text: string) => {
    return text.replace(/\_/g, ' ')
  }


  const keyLabel = Object.keys(data)[0]
  if (keyLabel === 'NFT_Details') {
    return <div>
      <p style={{ fontWeight: 700, fontSize: 16, marginLeft: 15, marginBottom: 10, marginTop: 5 }}>{clearText(keyLabel)}</p>
      {data[keyLabel].map((v: any, i: number) => {
        return <div key={`keyla${i}`}>
          <p style={{ fontWeight: 500, fontSize: 16, marginLeft: 15 }}>{clearText(v.title)}</p>
          <div className={style.flexrow}>
            {v.data.map((item: any, index: number) => {
              if (item.checkBox) {
                return <FilterCheckBox initialVlue={getInitialValues(item)} item={item} onChange={onChange} onKeyDown={onKeyDown} />
              }
              else {
                if (index === 1) {
                  return <div className={style.flexrowCenter} key={`keyl${index}`}>
                    <p>to</p>
                    <FilterInputs initialVlue={getInitialValues(item)} item={item} onChange={onChange} index={index}
                      onFocus={onFocus} type={'number'} onKeyDown={onKeyDown} />
                  </div>
                }
                return <FilterInputs initialVlue={getInitialValues(item)} item={item} onChange={onChange} key={`keyl${index}`} index={index}
                  onFocus={onFocus} type={'number'} onKeyDown={onKeyDown} />
              }
            })}
          </div>
        </div>
      })}
    </div>
  }

  if (keyLabel === 'Availability') {
    return <>
      <br />
      <p style={{ marginLeft: 15, fontWeight: 700, fontSize: 16 }}>{keyLabel}</p>

      {data[keyLabel].map((item: any, index: number) => {
        if (item.checkBox) {
          return <FilterCheckBox initialVlue={getInitialValues(item)} item={item} onChange={onChange} onKeyDown={onKeyDown} />
        }
      })}
    </>
  }

  return <div>
    <p style={{ fontWeight: 700, fontSize: 16, marginLeft: 15, marginTop: 5 }}>{clearText(keyLabel)}</p>
    <div className={style.flexrow}>
      {data[keyLabel].map((item: any, index: number) => {
        if (item.checkBox) {
          return <FilterNoCheckBox initialVlue={getInitialValues(item)} item={item} onChange={onChange} onKeyDown={onKeyDown} />
        }
      })}
    </div>

    <div className={style.flexrow}>
      {data[keyLabel].map((item: any, index: number) => {
        if (item.checkBox === undefined) {
          if (index === 2) {
            return <div className={style.flexrowCenter}>
              <p>to</p>
              <FilterInputs initialVlue={getInitialValues(item)} item={item} onChange={onChange} key={`fi${index}`} index={index}
                onFocus={onFocus} type={'number'} onKeyDown={onKeyDown} />
            </div>
          }
          return <FilterInputs initialVlue={getInitialValues(item)} item={item} onChange={onChange} key={`fi${index}`} index={index}
            onFocus={onFocus} type={'number'} onKeyDown={onKeyDown} />
        }
      })}

    </div>

  </div>
}

interface FilterInputsProps {
  item: any;
  onChange: (data: any) => void;
  index: number;
  onFocus: (index: number) => void;
  type: string;
  onKeyDown: () => void;
  initialVlue: string;
  options?: any[];
}

const FilterInputs = ({ item, onChange, index, onFocus, type, onKeyDown, initialVlue = "", options = [] }: FilterInputsProps) => {
  const [value, setValue] = useState<number | string>(initialVlue)
  const handleChange = (e: any) => {
    let val = e.target.value
    let temp = { ...(item.extra || {}) }
    if (item.min || item.max) {
      if (val < item.min) {
        temp[item.key] = 0
        onChange(temp)
        setValue(0)
      }
      else if (val > item.max) {
        temp[item.key] = 100
        onChange(temp)
        setValue(100)
      }
      else {
        temp[item.key] = val
        onChange(temp)
        setValue(val)
      }
    }
    else {
      temp[item.key] = val
      onChange(temp)
      setValue(val)
    }
  }
  useEffect(() => {
    if (initialVlue !== value) {
      setValue(initialVlue)
    }
  }, [initialVlue])

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onKeyDown()
    }
  }
  const typeIdentifyer = () => {
    if (type === 'date') {
      return <TextField
        onFocus={() => onFocus(index)}
        value={value}
        id="outlined-multiline-flexible"
        label={item.label}
        type={type}
        InputLabelProps={{
          shrink: true,
          style: { fontSize: 14 }
        }}
        onChange={handleChange}
        variant="outlined"
        size="small"
        onKeyDown={handleKeyDown}
      />
    } else if (type === 'dropdown') {
      return <div style={{ maxWidth: 235 }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          renderInput={(params) => <TextField {...params} label="App Name" onKeyDown={handleKeyDown}
            size="small"
            onChange={handleChange}
          />}
        />
      </div>
    }
    return <TextField
      onFocus={() => onFocus(index)}
      value={value}
      id="outlined-multiline-flexible"
      label={item.label}
      type={type}
      InputLabelProps={{
        style: { fontSize: 14 }
      }}
      onChange={handleChange}
      variant="outlined"
      size="small"
      onKeyDown={handleKeyDown}
    />
  }

  return (
    <div className={style.singleInput}>
      {typeIdentifyer()}
    </div>
  )
}