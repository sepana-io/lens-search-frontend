import style from '../post/post.module.scss'
import UserLogo from "@/assets/logo/user.svg"
import { useState, useEffect, useRef } from "react"
import dynamic from 'next/dynamic'
import axios from 'axios'
// const ForceGraph2D = dynamic(() => import('react-force-graph-2d'))

let ForceGraph2D = null


// interface ProfileProps {
//     post: any
// }
const Profile = ({ post }) => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] })
    const fgRef = useRef();

    const getGraphData = (id) => {
        axios.get('/graph?id=' + id)
            .then((res) => {
                let data = { ...res }
                const unique = [...new Map(data.vertices.map((item) => [item._id, item])).values()]
                let nodes = [];
                let links = [];
                for (let i = 0; i < unique.length; i++) {
                    let node = { ...unique[i] }
                    node.id = unique[i]._id
                    node.group = 1
                    nodes.push(node)
                }
                for (let i = 0; i < data.paths.length; i++) {
                    let path = { ...data.paths[i] }
                    let edges = path.edges;
                    for (let j = 0; j < edges.length; j++) {
                        let edge = edges[j]
                        links.push({ source: edge._from, target: edge._to })
                    }
                }
                setGraphData({ nodes, links })
                // setTimeout(() => {
                //     if (fgRef.current != undefined)
                //         fgRef.current.zoomToFit(1000, 70)
                // }, 300)
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    useEffect(() => {
        ForceGraph2D = require('react-force-graph-2d').default
        getGraphData(post.id);
    }, [])

    const getColor = (data) => {
        const type = data.split('/')[0]
        if (type === 'people') return '#FF5100'
        else if (type === 'topics') return '#3772ff'
        return '#1BFF00'
    }

    const isValid = (data) => {
        if (data == undefined) return false
        if (data === "") return false
        return true
    }

    return (<>
        <div className={style.wrapper}>
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
                    {isValid(post.name) && <p className={style.title}>Name <span className={style.muted}>{post.name}</span></p>}
                    {isValid(post.location) && <p className={style.title}>Location <span className={style.muted}>{post.location}</span></p>}
                    <p className={style.title}>Owned by <span className={style.muted}>{post.ownedBy}</span></p>
                </div>
                <div className={style.social}>
                    <p className={style.unmuted}>{post.stats.totalPublications ? post.stats.totalPublications : 0}<span className={style.muted}>Publications</span></p>
                    <p className={style.unmuted}>{post.stats.totalFollowers ? post.stats.totalFollowers : 0}<span className={style.muted}>Followers</span></p>
                    <p className={style.unmuted}>{post.stats.totalFollowing ? post.stats.totalFollowing : 0}<span className={style.muted}>Following</span></p>
                </div>
            </div>
        </div>

        {/* <div>
            {ForceGraph2D !== null && <ForceGraph2D
                width={window.innerWidth * .7}
                ref={fgRef}
                graphData={graphData}
                // nodeAutoColorBy="group"
                // onNodeClick={handleClick}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.name === undefined ? node.id : node.name;
                    const fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = getColor(node.id);
                    ctx.fillText(label, node.x, node.y);

                    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                }}
                nodePointerAreaPaint={(node, color, ctx) => {
                    ctx.fillStyle = color;
                    const bckgDimensions = node.__bckgDimensions;
                    bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
                }}
            />}
        </div> */}

    </>)
}
export default Profile

const ProfileImage = (item) => {
    const [err, setErr] = useState(false)

    if (item.item.picture?.original?.url && !err) return <img src={item.item.picture?.original?.url} alt='some image' className={style.avatar} onError={() => setErr(true)} />
    return <div className={style.avatar}> <UserLogo /> </div>
}