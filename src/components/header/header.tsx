import TextField from '@mui/material/TextField';
import style from './header.module.scss';
import Logo from '@/assets/logo/logo.svg';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@/assets/icons/search_24px.svg";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const Header = () => {
    const router = useRouter();
    const [text, setText] = useState<string | string[]>('')
    const handleSearch = (e: any) => {
        if (e.key === "Enter") {
            router.push(`/posts?search_type=all_words&text=${text}`)
        }
        else {
            setText(e.target.value)
        }
    }

    useEffect(() => {
        if (router.query.search_type && router.query.text) {
            setText(router.query.text)
        }
        else {
            setText('')
        }
    }, [router])

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.both}>
                    <div className={style.logo}>
                        <Logo />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', width: "40%" }}>
                        <input type="text" className={style.search} onKeyDown={handleSearch} onChange={(e: any) => setText(e.target.value)} value={text} />
                        <span><div className={style.logoSearch} ><SearchIcon /></div>
                        </span>
                    </div>

                </div>
            </div>
            <div className={style.fade} />
        </>
    )
}

export default Header;