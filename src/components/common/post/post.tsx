import { User } from '@/types/posttype'
import style from './post.module.scss'

interface Props {
    user: User
}
const Post = ({ user }: Props) => {
    const { avatar,
        author,
        title,
        description,
        mainImage,
        social } = user
        console.log('user', user)
    return <div className={style.wrapper}>
        <div>
            {/* Avatar */}
            <img src={avatar} alt='Avatar' className={style.avatar} />
        </div>
        <div className={style.wrapper2}>
            <h5 className={style.author}>{author}</h5>
            <p className={style.title}>{title}</p>
            <p className={style.description}>{description}</p>
            <img src={mainImage} alt='some image' className={style.mainImage} />
            <div className={style.social}>
                {social?.map((item, index) => {
                    return <p key={index} className={style.unmuted}>{item[Object.keys(item)[0]]}<span className={style.muted}>{Object.keys(item)[0]}</span></p>
                })}
            </div>
        </div>
    </div>
}

export default Post