import style from '../post/post.module.scss'


interface Props {
    post: any;
    expandFnc: (data: boolean)=> void;
    expand: boolean;
}

const Social = ({ post, expandFnc, expand }: Props) => {
    const handleCallback = () => {
        if (post.profile.stats?.totalComments > 0) {
            return expandFnc(!expand)
        }
        return null
    }
    return <div className={style.social}>
        <p className={`${style.unmuted} ${style.p_0}`}>{post.mainPost?.stats?.totalAmountOfMirrors ? post.mainPost?.stats?.totalAmountOfMirrors : 0}<span className={style.muted}>Mirrors</span></p>
        <p className={style.unmuted}>{post.mainPost?.stats?.totalAmountOfCollects ? post.mainPost?.stats?.totalAmountOfCollects : 0}<span className={style.muted}>Collects</span></p>
        <p className={`${style.unmuted} ${post.mainPost?.stats?.totalAmountOfComments > 0 ? style.cursor : '' }`}
        // onClick={handleCallback}
        >{post.mainPost?.stats?.totalAmountOfComments ? post.mainPost?.stats?.totalAmountOfComments : 0}<span className={style.muted}>Comments</span></p>


    </div>
}
export default Social;