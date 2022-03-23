import TextField from '@mui/material/TextField';
import style from './header.module.scss';
import Logo from '@/assets/logo/logo.svg';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@/assets/icons/search_24px.svg";
const Header = () => {
    return (
        <>
            <div className={style.wrapper}>
                <div className={style.both}>
                    <div className={style.logo}>
                        <Logo />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', width: "40%" }}>
                        <input type="text" className={style.search} />
                        <span><div className={style.logoSearch} ><SearchIcon /></div>
                        </span>
                    </div>

                </div>
            </div>
            <div className={style.fade} />
        </>
    )
}

export default Header;