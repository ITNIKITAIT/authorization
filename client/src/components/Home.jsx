import { NavLink } from "react-router-dom";
import { Context } from "../index";
import { useContext } from "react";
import { LOGIN_ROUTE, REGISTRETION_ROUTE } from "../routes/routes";
import {observer} from 'mobx-react-lite'

const Home = observer(() => {
    const {user} = useContext(Context);
    const exit = () => {
        user.setIsAuth(false)
    }
 
    return ( 
        <div className="wrapper">
            <div className="login">
                <p className="home__title">
                    Home
                    <span></span>
                </p>
                {user._isAuth ? (
                    <p className="home__subtitle">
                        You are successfully authorizated!
                    </p>
                ) : (
                    <p className="home__subtitle">
                        You are not authorizated!
                    </p>
                )}
                {user._isAuth ? (
                    <div className="home__auth">
                        <NavLink onClick={exit}>Exit</NavLink>
                    </div>
                ) : (
                    <div className="home__auth">
                        <NavLink to={REGISTRETION_ROUTE}>Register</NavLink>
                        <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                    </div>
                )}
            </div>
        </div>
     );
})
 
export default Home;