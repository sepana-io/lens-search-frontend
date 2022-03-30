import style from '../post/post.module.scss'
import { sanitize } from "@/utils/sanitize"
const UserOrPost = ({ post }: any) => {
    // if (post._source.bio) {
    //     return <p className={style.description}>{post._source.description}</p>
    // }
    return <>
        <p className={style.title}>{sanitize(post.metadata.content)}</p>
        <p className={style.description}>{sanitize(post.metadata.description)}</p>
        {post.metadata.media?.length > 0 && post.metadata.media?.map((item: any, index: any) => {
            return <Media item={item} key={index} />
        })}

    </>

}

const Media = ({item}) => {

    const getURL = (url: string) => url.replace("ipfs://", "https://ipfs.io/ipfs/")

    if (item.original.mimeType?.includes('image'))
        return <img src={getURL(item.original.url)} alt='some image' className={style.mainImage} />
    return null
}

export default UserOrPost;