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
            <ProfileImage item={post} />

        </div>
        <div className={style.wrapper2}>

            <div className={style.user}>
                <h5 className={style.author}>{post.handle}</h5>
                <p className={style.spacing}>{post.id}</p>
                {/* <p className={style.spacing}>{moment(post.block_timestamp).format('MMMM DD')}</p> */}
                {/* {post.bio ?
                    <div className={style.FilterBtn}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#ABFE2D' }}>Follow</p>
                    </div>
                    : <p className={style.spacing}>{moment(post.createdAt).format('MMMM DD')}</p>} */}
            </div>

            <div>
                <p className={style.title}>{post.bio}</p>
            </div>

            <div>
                <p className={style.title}>Name: <span className={style.muted}>{post.name}</span></p>
                <p className={style.title}>Location: <span className={style.muted}>{post.location}</span></p>
                <p className={style.title}>Owned by <span className={style.muted}>{post.ownedBy}</span></p>
            </div>

            <div className={style.social}>
                <p className={style.unmuted}>{post.stats.totalPublications ? post.stats.totalPublications : 0}<span className={style.muted}>Publications</span></p>
                <p className={style.unmuted}>{post.stats.totalFollowers ? post.stats.totalFollowers : 0}<span className={style.muted}>Followers</span></p>
                <p className={style.unmuted}>{post.stats.totalFollowing ? post.stats.totalFollowing : 0}<span className={style.muted}>Following</span></p>

            </div>
        </div>
    </div>
}
export default Profile


const ProfileImage = (item: any) => {
    if (item.item.picture.original.url === "") return <div className={style.avatar}> <UserLogo /> </div>
    return <img src={item.item.picture.original.url} alt='some image' className={style.avatar} />
}