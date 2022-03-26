import SearchIcon from "@/assets/icons/search_24px.svg";
import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from "next/link"
import style from './landing.module.scss';
import Plant from "@/assets/logo/plant.svg"
import { parseSearchText, queryObjToString } from "@/utils/util"
const Landing = () => {
    const router = useRouter();
    const [text, setText] = useState<string | string[]>('')
    const [shouldNavigate, setNavigate] = useState(true);
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

    const mockdata = ['Publications by @balajis ', 'Profiles with ‘solidity’ in Bio  ', 'Most active Profiles']
    return <div>
        <h1 className={style.header}>Discover the Lens social network</h1>
        <p className={style.subtitle}>
        Lens is a social network built on the blockchain. 
        <br />
        Search and explore it’s posts, people, and connections.
        </p>
        <div className={style.wrapper}>
            <input type="text" className={style.search} onKeyDown={handleSearch} onChange={(e: any) => setText(e.target.value)} value={text} />
            <span><div className={style.logoSearch} onClick={goToTopic} >
                <SearchIcon />
                <span className={style.searchtext}>Search</span>
                </div>
            </span>
        </div>
            <div className={style.recent}>
                {mockdata.map((item,index) => {
                    return <div key={item} className={style.recentSingle}>
                        <Link href={item}>{index !== mockdata.length-1 ? `${item} |` : item}</Link>
                        </div>
                })}
            </div>
        <div className={style.plant}>
        <Plant />

        </div>
    </div>
};
export default Landing;