import { Post } from '@/types/posttype'
import style from './post.module.scss'

interface Props {
    post: Post
}

const Post = ({ post }: any) => {

    return <div className={style.wrapper}>
        <div>
            <img src={''} alt='Avatar' className={style.avatar} />
        </div>
        <div className={style.wrapper2}>
            <div className={style.user}>
                <h5 className={style.author}>{post._source.profileId}</h5>
                <p className={style.spacing}>{'0x01'}</p>
                <p className={style.spacing}>{post._source.ingested_at}</p>
            </div>
            <p className={style.title}>{post._source.content}</p>
            <p className={style.description}>{post._source.description}</p>
            {post._source.image && <img src={post._source.image} alt='some image' className={style.mainImage} />}
            <div className={style.social}>
                {post._source.attributes?.map((item: any, index: number) => {
                    return <p key={index} className={style.unmuted}>{item[Object.keys(item)[0]]}<span className={style.muted}>{item[Object.keys(item)[1]]}</span></p>
                })}
            </div>
        </div>
    </div>
}

export default Post