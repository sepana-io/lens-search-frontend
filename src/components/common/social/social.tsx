import style from '../post/post.module.scss'

const Social = ({ post }: any) => {
    return <div className={style.social}>
        {/* {post.profile.stats?.map((item: any, index: number) => {
            return <p key={index} className={style.unmuted}>{item[Object.keys(item)[0]]}<span className={style.muted}>{item[Object.keys(item)[1]]}</span></p>
        })} */}
        <p className={style.unmuted}>{post.profile.stats.totalMirrors}<span className={style.muted}>Mirros</span></p>
        <p className={style.unmuted}>{post.profile.stats.totalCollects}<span className={style.muted}>Collects</span></p>
        <p className={style.unmuted}>{post.profile.stats.totalComments}<span className={style.muted}>Comments</span></p>

    </div>
}
export default Social;