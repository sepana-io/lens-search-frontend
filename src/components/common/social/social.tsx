import style from '../post/post.module.scss'

const Social = ({ post }: any) => {
    return <div className={style.social}>
        {post._source.attributes?.map((item: any, index: number) => {
            return <p key={index} className={style.unmuted}>{item[Object.keys(item)[0]]}<span className={style.muted}>{item[Object.keys(item)[1]]}</span></p>
        })}
    </div>
}
export default Social;