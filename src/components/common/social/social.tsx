import style from '../post/post.module.scss'

const Social = ({ post }: any) => {
    return <div className={style.social}>
        {/* {post.profile.stats?.map((item: any, index: number) => {
            return <p key={index} className={style.unmuted}>{item[Object.keys(item)[0]]}<span className={style.muted}>{item[Object.keys(item)[1]]}</span></p>
        })} */}
        <p className={style.unmuted}>{post.profile.stats.totalMirrors ? post.profile.stats.totalMirrors : 0}<span className={style.muted}>Mirros</span></p>
        <p className={style.unmuted}>{post.profile.stats.totalCollects ? post.profile.stats.totalCollects : 0}<span className={style.muted}>Collects</span></p>
        <p className={style.unmuted}>{post.profile.stats.totalComments ? post.profile.stats.totalComments : 0}<span className={style.muted}>Comments</span></p>

    </div>
}
export default Social;