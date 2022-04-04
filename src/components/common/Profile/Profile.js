import style from './Profile.module.scss'
import UserLogo from "@/assets/logo/user.svg"
import Person from '@/assets/icons/person.svg';
import Location from '@/assets/icons/location.svg';
import Key from '@/assets/icons/key.svg';
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import { sanitize } from "@/utils/sanitize"
import Link from 'next/link'


let ForceGraph2D = null


const Profile = ({ post }) => {

    const [graphData, setGraphData] = useState({ nodes: [], links: [] })
    const fgRef = useRef();
    const containerView = useRef();

    const getGraphData = (id) => {
        axios.get('/traverse?start=' + id)
            .then((res) => {
                let data = { ...res.data }
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
                console.log({ nodes, links })
                setGraphData({ nodes, links })
                setTimeout(() => {
                    if (fgRef.current != undefined)
                        fgRef.current.zoomToFit(500, 20)
                }, 300)
            })
            .catch(err => {
                console.log('err', err)
            })
    }
    const [width, setWidth] = useState(400)
    useEffect(() => {
        ForceGraph2D = require('react-force-graph-2d').default
        setWidth(containerView.current.offsetWidth - 50)
    }, [])

    const [showGraph, setShowGraph] = useState(false)

    const getColor = (data) => {
        const type = data.split('/')[0]
        if (type === 'people') return '#FF5100'
        else if (type === 'topics') return '#3772ff'
        return '#0E501D'
    }

    const isValid = (data) => {
        if (data == undefined) return false
        if (data === "") return false
        return true
    }

    const handleGraph = () => {
        if (!showGraph) {
            getGraphData(post.id);
        }
        setShowGraph(!showGraph)
    }

    return (
        <div className={style.wrapper} ref={containerView}>
            <div className={style.flex}>
                <div>
                    <ProfileImage item={post} />
                </div>

                <div className={style.wrapper2}>
                    <div className={style.user} style={{ justifyContent: 'space-between' }}>
                        <a href={`posts?from_users=${post.handle}`} >  <div className={style.author}>{post.handle}</div>
                        </a>
                        {/* <p className={style.spacing}>{post.id}</p> */}

                        <div className={style.FilterBtnSmall} onClick={handleGraph}>
                            <p className={style.applyFilter}>Social Graph</p>
                        </div>
                        {/* <p className={style.spacing}>{moment(post.block_timestamp).format('MMMM DD')}</p> */}
                        {/* {post.bio ?
                    <div className={style.FilterBtn}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#ABFE2D' }}>Follow</p>
                    </div>
                    : <p className={style.spacing}>{moment(post.createdAt).format('MMMM DD')}</p>} */}
                    </div>
                    <div>
                        {isValid(post.name) && <p className={style.title}><span className={style.muted} style={{ color: '#979797', marginLeft: -7, marginTop: -5 }}>{post.name}{" · "} {post.id}</span></p>}
                    </div>
                    <div>
                        <p className={style.bio}>{sanitize(post.bio)}</p>
                    </div>
                    <div className={style.flex}>

                        {isValid(post.location) && <p className={style.title}><Location /> <span className={style.muted}>{post.location}</span></p>}

                        <p className={`${style.title} ${post.location ? style.spaceLeft : ""}`}><Key /> <a href={`https://polygonscan.com/address/${post.ownedBy}`} target='_blank' rel="noreferrer"><span className={style.link}>{post.ownedBy}</span></a></p>
                    </div>
                    <div className={style.social}>
                        <p className={style.unmuted} style={{ marginLeft: -7 }}>{post.stats.totalPublications ? post.stats.totalPublications : 0}<span className={style.muted}>Publications</span></p>
                        <p className={style.unmuted}>{post.stats.totalFollowers ? post.stats.totalFollowers : 0}<span className={style.muted}>Followers</span></p>
                        <p className={style.unmuted}>{post.stats.totalFollowing ? post.stats.totalFollowing : 0}<span className={style.muted}>Following</span></p>
                    </div>

                </div>
            </div>
            {showGraph && ForceGraph2D !== null && <ForceGraph2D
                width={width}
                height={400}
                ref={fgRef}
                graphData={graphData}
                // nodeAutoColorBy="group"
                // onNodeClick={handleClick}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.handle === undefined ? node.id : node.handle;
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


        </div>
    )
}
export default Profile

const ProfileImage = ({ item }) => {
    const [err, setErr] = useState(false)
    if (item.picture?.original?.url && !err) return <Link href={`posts?from_users=${item.handle}`}><img src={item.picture?.original?.url} alt='some image' className={style.avatar} onError={() => setErr(true)} />
    </Link>
    return <Link href={`posts?from_users=${item.handle}`}><div className={style.avatar}> <UserLogo /> </div></Link>
}