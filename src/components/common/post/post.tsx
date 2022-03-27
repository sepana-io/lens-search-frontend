import { Post } from '@/types/posttype';
import style from './post.module.scss';
import User from '../users/users';
import Social from '../social/social';
import UserOrPost from '../userorpost/userorpost';
import UserLogo from "@/assets/logo/user.svg"
import { useState } from "react"
interface Props {
    post: Post
}


const Post = ({ post }: any) => {
    const [err, setErr] = useState<boolean>(false)
    const getURL = (url: string) => {
        if (url && url.includes('ipfs')) {

            if (url.includes('https://ipfs')) {
                return url
            }
            let hash = url.split('//')[1]
            return `https://ipfs.io/ipfs/${hash}`
        }

        return url === null ? '' : url
    }

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
    const getURL = (url: string) => {
        if (url && url.includes('ipfs')) {

            if (url.includes('https://ipfs')) {
                return url
            }
            let hash = url.split('//')[1]
            return `https://ipfs.io/ipfs/${hash}`
        }

        return url === null ? '' : url
    }

    if (post.profile.imageURI && !err) return <img src={getURL(post.profile.imageURI)} alt='some image' className={style.avatar}
        onError={() => setErr(true)} />
    return <div className={style.avatar}> <UserLogo /> </div>
}

export default Post

