import style from '../post/post.module.scss'

const UserOrPost = ({ post }: any) => {
    // if (post._source.bio) {
    //     return <p className={style.description}>{post._source.description}</p>
    // }
    return <>
        <p className={style.title}>{post.metadata.content}</p>
        <p className={style.description}>{post.metadata.description}</p>
        {post.metadata.media.length > 0 && post.metadata.media.map((item: any, index: any) => {
            return <Media item={item} key={index} />
        })}

    </>

}

const Media = (item: any) => {
    if (item.item.mimeType.includes('image'))
        return <img src={item.item.item} alt='some image' className={style.mainImage} />
    return null
}

export default UserOrPost;