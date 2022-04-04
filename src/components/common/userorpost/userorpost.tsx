import style from '../post/post.module.scss'
import { sanitize } from "@/utils/sanitize"
import removeMarkdown from "markdown-to-text";
const UserOrPost = ({ post }: any) => {
    // if (post._source.bio) {
    //     return <p className={style.description}>{post._source.description}</p>
    // }
    function urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function(url) {
          return '<a style="margin-left:4px; color:#367BF5;" target="_blank" href="' + url + '">' + url + '</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
      }
    // let urls = urlify(post.metadata.content)

    const getClickableLinks = (text) =>{
const s = sanitize(text);
const r = removeMarkdown(s)
return urlify(r)
    }
    return <>
        <div className={style.title} dangerouslySetInnerHTML={{__html:getClickableLinks(post.metadata.content)}}></div>
        {removeMarkdown(post.metadata.content) !== removeMarkdown(post.metadata.description) && <p className={style.description}>{urlify(sanitize(post.metadata.description))}</p>}
        {post.metadata.media?.length > 0 && post.metadata.media?.map((item: any, index: any) => {
            return <Media item={item} key={index} />
        })}

    </>

}

const Media = ({ item }) => {

    const getURL = (url: string) => url.replace("ipfs://", "https://ipfs.io/ipfs/")

    if (item.original.mimeType?.includes('image'))
        return <img src={getURL(item.original.url)} alt='some image' className={style.mainImage} />
    return null
}

export default UserOrPost;