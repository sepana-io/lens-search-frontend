import { PostProps } from '@/types/posttype';
import style from './post.module.scss';
import User from '../users/users';
import Social from '../social/social';
import UserOrPost from '../userorpost/userorpost';
import UserLogo from "@/assets/logo/user.svg"
import { useState } from "react"
import Link from 'next/link';
import useComments from './hook'
interface Props {
    post: PostProps
}

const getURL = (url: string) => url === null ? '' : url.replace("ipfs://", "https://ipfs.io/ipfs/")


const Post = ({ post }: any) => {
    const [err, setErr] = useState<boolean>(false)
    const [expand, setExpand] = useState<boolean>(false)
    const data = useComments(post.id)
    return <div className={style.wrapper}>
        <ProfileImage post={post} />

        <div className={style.wrapper2}>
            <User post={post} />
            <UserOrPost post={post} />
            <Social post={post} expandFnc={(val) => setExpand(val)} expand={expand} />
            {expand && <div className={style.expand}>
                {data?.data.map((item, index) => {
                    return <div key={index} className={style.flex}>
                        <ProfileImage post={item} />
                        <div>
                            <User post={item} />
                            <UserOrPost post={item} />
                            <Social post={item} expandFnc={() => null} expand={expand} />
                        </div>
                    </div>
                })}
            </div>}
        </div>
    </div>
}


const ProfileImage = ({ post }) => {
    const [err, setErr] = useState(false)
    if (post.profile.picture && !err) return <Link href={`posts?from_users=${post.profile.handle}`} ><img style={{ marginTop: 4 }} src={getURL(post.profile.picture.original?.url)} alt='some image' className={style.avatar}
        onError={() => setErr(true)} /></Link>
    return <Link href={`posts?from_users=${post.profile.handle}`}><div className={style.avatar} style={{ marginTop: 4 }}>
        <UserLogo />
    </div>
    </Link>
}

export default Post

