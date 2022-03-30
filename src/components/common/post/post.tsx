import { PostProps } from '@/types/posttype';
import style from './post.module.scss';
import User from '../users/users';
import Social from '../social/social';
import UserOrPost from '../userorpost/userorpost';
import UserLogo from "@/assets/logo/user.svg"
import { useState } from "react"
import Link from 'next/link';

interface Props {
    post: PostProps
}

const getURL = (url: string) => url === null ? '' : url.replace("ipfs://", "https://ipfs.io/ipfs/")


const Post = ({ post }: any) => {
    const [err, setErr] = useState<boolean>(false)

    return <div className={style.wrapper}>
        <ProfileImage post={post} />

        <div className={style.wrapper2}>
            <User post={post} />
            <UserOrPost post={post} />
            <Social post={post} />
        </div>
    </div>
}


const ProfileImage = ({ post }) => {
    const [err, setErr] = useState(false)
    if (post.profile.picture && !err) return <Link href={`posts?from_users=${post.profile.handle}`} ><img src={getURL(post.profile.picture.original?.url)} alt='some image' className={style.avatar}
        onError={() => setErr(true)} /></Link>
    return <Link href={`posts?from_users=${post.profile.handle}`}><div className={style.avatar}>
        <UserLogo />
    </div>
    </Link>
}

export default Post

