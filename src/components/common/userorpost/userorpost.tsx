import style from '../post/post.module.scss'

const UserOrPost = ({ post }: any) => {
    // if (post._source.bio) {
    //     return <p className={style.description}>{post._source.description}</p>
    // }
    return <>
        <p className={style.title}>{post.metadata.content}</p>
        <p className={style.description}>{post.metadata.description}</p>
        {post.metadata.media?.length > 0 && post.metadata.media?.map((item: any, index: any) => {
            return <Media item={item} key={index} />
        })}

    </>

}

const Media = (item: any) => {

    const getURL = (url: string) => {
        if (url.includes('ipfs')) {

            if (url.includes('https://ipfs')) {
                return url
            }
            let hash = url.split('//')[1]
            return `https://ipfs.io/ipfs/${hash}`
        }
        return url
    }

    if (item.item.type.includes('image'))
        return <img src={getURL(item.item.item)} alt='some image' className={style.mainImage} />
    return null
}

export default UserOrPost;