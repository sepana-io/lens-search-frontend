import style from '../post/post.module.scss'
import moment from 'moment'
import Image from 'next/image'
import UserLogo from "@/assets/logo/user.svg"
interface ProfileProps {
    post: any
}
const Profile = ({ post }: ProfileProps) => {
    return <div className={style.wrapper}>
        <div>
            <ProfileImage item={post.coverPicture} />

        </div>
        <div className={style.wrapper2}>

            <div className={style.user}>
                <h5 className={style.author}>{post.handle}</h5>
                <p className={style.spacing}>{post.profileId}</p>
                <p className={style.spacing}>{moment(post.block_timestamp).format('MMMM DD')}</p>
                {/* {post.bio ?
                    <div className={style.FilterBtn}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#ABFE2D' }}>Follow</p>
                    </div>
                    : <p className={style.spacing}>{moment(post.createdAt).format('MMMM DD')}</p>} */}
            </div>

            <div>
                <p className={style.title}>{post.bio}</p>
            </div>

            <div className={style.social}>
                <p className={style.unmuted}>{post.stats.totalMirrors ? post.stats.totalMirrors : 0}<span className={style.muted}>Mirros</span></p>
                <p className={style.unmuted}>{post.stats.totalCollects ? post.stats.totalCollects : 0}<span className={style.muted}>Collects</span></p>
                <p className={style.unmuted}>{post.stats.totalComments ? post.stats.totalComments : 0}<span className={style.muted}>Comments</span></p>

            </div>
        </div>
    </div>
}
export default Profile


const ProfileImage = (item: any) => {
    if (item?.item?.original?.mimeType?.includes('image'))
        return <img src={item.item.original.url} alt='Avatar' className={style.avatar} />
    return <div className={style.avatar}>
        <UserLogo />
    </div>
}