import React, { useEffect, useState } from 'react'
import CheckIcon from '../../../assets/icons/check.svg'
import style from './filters.module.scss'
import c from 'classnames'
interface FilterCheckBoxProps {
    initialVlue: string;
    item: any;
    onChange: (data: any) => void;
    onKeyDown: () => void;
}
export const FilterCheckBox = ({ initialVlue, item, onChange, onKeyDown }: FilterCheckBoxProps) => {

    const getState1 = (initialVlue: string, label: string) => {
        if (initialVlue === '') return true
        if (initialVlue === item[label].toLowerCase()) return true
        return false
    }

    const [checkURL, setCheckURL] = useState<boolean>(false)
    const [checked1, setChecked1] = useState<boolean>(true)
    const [checked2, setChecked2] = useState<boolean>(true)


    useEffect(() => {
        if (checkURL) {
            onKeyDown()
            setCheckURL(false)
        }
        setChecked1(getState1(initialVlue, 'label1'))
        setChecked2(getState1(initialVlue, 'label2'))
    }, [initialVlue])

    useEffect(() => {
        let temp: any = {}
        if (checked1 && checked2) {
            temp[item.key] = ''
        }
        else if (checked1 && !checked2) {
            temp[item.key] = item.label1.toLowerCase()
        }
        else if (checked2 && !checked1) {
            temp[item.key] = item.label2.toLowerCase()
        }
        else {
            temp[item.key] = ''
        }
        onChange(temp)
    }, [checked1, checked2])


    const handle1Click = () => {
        setCheckURL(true)
        setChecked1(!checked1)
    }

    const handle2Click = () => {
        setCheckURL(true)
        setChecked2(!checked2)
    }


    return <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={c(style.FollowWrapperSmall, checked1 && style.checked)} onClick={handle1Click}>
            {checked1 && <CheckIcon style={{ marginRight: 5 }} />}
            <p style={{ fontSize: 14, fontWeight: 400, color: checked1 ? '#fff' : '#3772FF' }}>{item.label1}</p>
        </div>
        <div className={c(style.FollowWrapperSmall, checked1 && style.checked)} onClick={handle2Click}>
            {checked2 && <CheckIcon style={{ marginRight: 5 }} />}
            <p style={{ fontSize: 14, fontWeight: 400, color: checked2 ? '#fff' : '#3772FF' }}>{item.label2}</p>
        </div>
    </div>
}

interface FilterNoCheckBoxProps {
    initialVlue: string;
    item: any;
    onChange: (data: any) => void;
    onKeyDown: () => void;
}
export const FilterNoCheckBox = ({ initialVlue, item, onChange, onKeyDown }: FilterNoCheckBoxProps) => {

    const getState1 = (initialVlue: string, label: string) => {
        if (initialVlue === `delete_${item[label].toLowerCase()}`) return true
        if (initialVlue === item[label].toLowerCase()) return false
        return false
    }

    const getState2 = (initialVlue: string, label: string) => {
        if (initialVlue === item[label].toLowerCase()) return true
        return false
    }

    const [checkURL, setCheckURL] = useState<boolean>(false)
    const [checked1, setChecked1] = useState<boolean>(true)
    const [checked2, setChecked2] = useState<boolean>(false)

    useEffect(() => {
        if (checkURL) {
            onKeyDown()
            setCheckURL(false);
            setChecked1(getState1(initialVlue, 'value'))
            setChecked2(getState2(initialVlue, 'value'))
        }
    }, [checkURL])



    const handle1Click = () => {
        setCheckURL(true)
        let temp: any = {}
        temp[item.key] = `delete_${item.value.toLowerCase()}`
        onChange(temp)

    }

    const handle2Click = () => {
        setCheckURL(true)
        let temp: any = {}
        temp[item.key] = item.value.toLowerCase()
        onChange(temp)

    }


    return <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={c(style.FollowWrapperSmall, checked1 && style.checked)} onClick={handle1Click}>
            <p style={{ fontSize: 12, fontWeight: 400, color: checked1 ? '#fff' : '#3772FF' }}>{item.label1}</p>
        </div>
        <div className={c(style.FollowWrapperSmall, checked1 && style.checked)} onClick={handle2Click}>
            <p style={{ fontSize: 12, fontWeight: 400, color: checked2 ? '#fff' : '#3772FF' }}>${item.label2}</p>
        </div>
    </div>
}