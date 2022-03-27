import style from './header.module.scss';
import Logo from '@/assets/logo/logo.svg';
import SearchIcon from "@/assets/icons/search_24px.svg";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Link from "next/link"
import { parseSearchText, queryObjToString, objIsEqual, queryObjToSearchText } from "@/utils/util"

const Header = () => {
    const router = useRouter();
    const [text, setText] = useState<string | string[]>('')
    const [shouldNavigate, setNavigate] = useState(true);
    const [showSearch, setShowSearch] = useState(false)
    const handleSearch = (e: any) => {
        if (e.key === "Enter") {
            goToTopic()
        }
        else {
            setText(e.target.value)
            setNavigate(true)
        }
    }

    const goToTopic = () => {
        if (shouldNavigate) {
            setNavigate(false);
            let searchTextObj = parseSearchText(text)
            setTimeout(() => router.push(`/posts?${queryObjToString(searchTextObj)}`), 100)
        }
    }

    useEffect(() => {
        const { query } = router;
        let qObj = { ...query }
        delete qObj.name
        if (!objIsEqual(qObj, parseSearchText(text))) {
            setText(queryObjToSearchText(qObj));
        }

        if (router.pathname === '/') {
            setShowSearch(false)
        }
        else {
            setShowSearch(true)
        }

    }, [router])
    if (showSearch)
        return (
            <>
                <div className={style.wrapper}>
                    <div style={{ maxWidth: 1200, marginRight: 'auto', marginLeft: 'auto' }}>
                        <Grid container alignItems='center' spacing={2} direction='row' style={{ marginTop: 0, height: 50 }}>
                            <Grid item xs={4} className={style.logo}>
                                <Link href={"/"} >
                                    <Logo />
                                </Link>
                            </Grid>
                            <Grid item xs={8} className={style.searchGrid}>
                                {showSearch && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '50vw' }}>
                                    <input type="text" className={style.search} onKeyDown={handleSearch} onChange={(e: any) => setText(e.target.value)} value={text} />
                                    <span><div className={style.logoSearch} onClick={goToTopic} ><SearchIcon /></div>
                                    </span>
                                </div>}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </>
        )
    return null
}

export default Header;