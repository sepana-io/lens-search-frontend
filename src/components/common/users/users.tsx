import style from './users.module.scss'
import Person from '@/assets/icons/person.svg';
import moment from 'moment'
import Link from 'next/link'
const User = ({ post }: any) => {
    const isValid = (data) => {
        if (data == undefined) return false
        if (data === "") return false
        return true
    }
    return <div className={style.user}>
        {/* <Link href={`posts?from_users=${post.profile.handle}`}><h5 className={style.author}>{post.profile.handle}</h5></Link> */}
        {/* <p className={style.spacing}>{post.profile.id}</p> */}
        <div className={style.flex}>
            <Link href={`posts?from_users=${post.profile.handle}`}><h5 className={style.author} style={{ marginRight: 5 }}>{post.profile.handle}</h5></Link>
            {isValid(post.profile.name) && <p className={style.title} style={{ color: '#979797', opacity: 0.75 }}> <span className={style.muted} style={{ marginLeft: -7 }}>{post.profile.name}{" · "} {post.profile.id}{" · "}</span></p>}
            {post.bio ?
                <div className={style.FilterBtn}>
                    <p className={style.followText}>Follow</p>
                </div>
                : <p className={style.spacing}>{moment(post.createdAt).format('MMMM DD')}</p>}

        </div>
    </div>
}
export default User