import { Post } from '@/types/posttype';
import style from './post.module.scss';
import User from '../users/users';
import Social from '../social/social';
import UserOrPost from '../userorpost/userorpost';
import UserLogo from "@/assets/logo/user.svg"

interface Props {
    post: Post
}

const Post = ({ post }: any) => {

    return <div className={style.wrapper}>

        {post.profile.picture.original.url === "" ? <div className={style.avatar}> <UserLogo /> </div> :
            <img src={post.profile.picture.original.url} alt='some image' className={style.avatar} />
        }
        {/* <UserLogo /> */}

        <div className={style.wrapper2}>
            <User post={post} />
            <UserOrPost post={post} />
            <Social post={post} />
        </div>
    </div>
}


export default Post