import { Post } from '@/types/posttype';
import style from './post.module.scss';
import User from '../users/users';
import Social from '../social/social';
import UserOrPost from '../userorpost/userorpost';
interface Props {
    post: Post
}

const Post = ({ post }: any) => {

    return <div className={style.wrapper}>
        <div>
            <img src={''} alt='Avatar' className={style.avatar} />
        </div>
        <div className={style.wrapper2}>
            <User post={post} />
            <UserOrPost post={post} />
            <Social post={post} />
        </div>
    </div>
}


export default Post