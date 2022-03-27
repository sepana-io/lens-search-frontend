import style from '../post/post.module.scss'

const Social = ({ post }: any) => {
    if (post.profile.stats)
        return <div className={style.social}>
            <p className={style.unmuted}>{post.profile.stats.totalMirrors ? post.profile.stats.totalMirrors : 0}<span className={style.muted}>Mirrors</span></p>
            <p className={style.unmuted}>{post.profile.stats.totalCollects ? post.profile.stats.totalCollects : 0}<span className={style.muted}>Collects</span></p>
            <p className={style.unmuted}>{post.profile.stats.totalComments ? post.profile.stats.totalComments : 0}<span className={style.muted}>Comments</span></p>

        </div>

    return null
}
export default Social;