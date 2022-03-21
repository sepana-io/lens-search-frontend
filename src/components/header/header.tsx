import style from './header.module.scss';


const Header = () => {
    const routes = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/' },
    ]

    return (
        <>
            <div className={style.wrapper}>
                {routes.map(item => {
                    return <a key={item.title} className={style.link} href={item.path}>{item.title}</a>
                })}
            </div>
            <div className={style.fade}>

            </div>

        </>
    )
}

export default Header;