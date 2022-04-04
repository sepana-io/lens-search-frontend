import style from './header.module.scss';
import Logo from '@/assets/logo/logo.svg';
import SearchIcon from "@/assets/icons/search_24px.svg";
import UserLogo from "@/assets/logo/userMobile.svg"
import FilterIcon from "@/assets/icons/filterIcon.svg";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Drawer, Button } from '@mui/material';
import Link from "next/link"
import FilterResult from '@/components/common/filters/filterResult'
import { parseSearchText, queryObjToString, objIsEqual, queryObjToSearchText } from "@/utils/util"

const Header = () => {
    const router = useRouter();
    const [text, setText] = useState<string | string[]>('')
    const [shouldNavigate, setNavigate] = useState<boolean>(true);
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [expand, setExpand] = useState<boolean>(false);

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
                    <div className={style.miniWrapper}>

                        <div className={style.flex}>
                            <div className={style.logo}>
                                <Link href={"/"}>
                                    <Logo />
                                </Link>
                            </div>
                            <div className={style.logo_mobile}>
                                <Link href={"/"} >
                                    <UserLogo />
                                </Link>

                            </div>
                            <div className={style.searchGrid}>
                                {showSearch && <div className={style.searchShow}>
                                    <input type="text" className={style.search} onKeyDown={handleSearch} onChange={(e: any) => setText(e.target.value)} value={text} />
                                    <span><div className={style.logoSearch} onClick={goToTopic} ><SearchIcon /></div>
                                    </span>
                                </div>}

                            </div>
                            <div className={style.filter}>
                                <Button onClick={() => setExpand(true)}><FilterIcon /></Button>

                                <Drawer
                                    anchor='right'
                                    open={expand}
                                    onClose={() => setExpand(false)}
                                >

                                    <FilterResult
                                        onClose={() => setExpand(false)}
                                    />

                                </Drawer>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    return null
}

export default Header;