import style from '../post/post.module.scss'
const User = ({ post }: any) => {
    return <div className={style.user}>
        <h5 className={style.author}>{post._source.profileId}</h5>
        <p className={style.spacing}>{'0x01'}</p>
        {post.bio ?
            <div className={style.FilterBtn}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#ABFE2D' }}>Follow</p>
            </div>
            : <p className={style.spacing}>{post._source.ingested_at}</p>}
    </div>
}
export default User