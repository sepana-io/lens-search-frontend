import style from '../post/post.module.scss'
import moment from 'moment'
const User = ({ post }: any) => {
    return <div className={style.user}>
        <h5 className={style.author}>{post.profile.handle}</h5>
        <p className={style.spacing}>{post.profile.id}</p>
        {post.bio ?
            <div className={style.FilterBtn}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#ABFE2D' }}>Follow</p>
            </div>
            : <p className={style.spacing}>{moment(post.createdAt).format('MMMM DD')}</p>}
    </div>
}
export default User