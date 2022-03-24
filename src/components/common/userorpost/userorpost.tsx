import style from '../post/post.module.scss'

const UserOrPost = ({ post }: any) => {
    if (post._source.bio) {
        return <p className={style.description}>{post._source.description}</p>
    }
    return <>
       <p className={style.title}>{post._source.content}</p>
        <p className={style.description}>{post._source.description}</p>
        {post._source.image && <img src={post._source.image} alt='some image' className={style.mainImage} />}
    </>

}

export default UserOrPost;