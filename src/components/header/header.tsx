import TextField from '@mui/material/TextField';
import style from './header.module.scss';
import Logo from '../../assets/logo/logo.svg';
import Image from 'next/image';

const Header = () => {
    // const routes = [
    //     { title: 'Home', path: '/' },
    //     { title: 'About', path: '/' },
    // ]

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.both}>
                    {/* <Image src={logo} alt='logo' /> */}
                    <div className={style.logo}>
                    <Logo />

                    </div>
                    {/* <h1 >LENS.SEPANA.IO</h1> */}
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" className={style.search}/>
                </div>
                {/* {routes.map(item => {
                    return <a key={item.title} className={style.link} href={item.path}>{item.title}</a>
                })} */}
            </div>
            <div className={style.fade}>

            </div>

        </>
    )
}

export default Header;