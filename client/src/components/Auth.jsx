import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRETION_ROUTE } from "../routes/routes";
import { AuthService } from "../services/auth.service";
import { useContext, useState } from "react";
import { Context } from "..";

const Authorization = () => {
    const {user} = useContext(Context); 

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const location = useLocation()
    const isLogin = location.pathname === '/login';

    const click = async () => {
        try {
            if (isLogin) {
                await AuthService.login(email, password)
                user.setIsAuth(true)
            }
            else {
                if (password === repeatPassword) {
                    await AuthService.registration(email, password)
                }
                else {
                    throw new Error('Password is incorrect')
                }
            }
            user.setIsAuth(true)
            navigate(HOME_ROUTE)
        }
        catch(err) {
            alert(err)
        }
    }

    return ( 
        <div className="wrapper">
            <div className="login">
                <p className="title">
                    {isLogin ? 'Login' : 'Registration'}
                    <span></span>
                </p>
                <form action="" className="form">
                    <div className="input-box">
                        <input autoComplete="off" required value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="user" className="input-field"/>
                        <label htmlFor="user" className="label">Email</label>
                    </div>
                    <div className="input-box">
                        <input autoComplete="off" required value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="input-field"/>
                        <label htmlFor="password" className="label">Password</label>
                    </div>
                    {!isLogin && (
                        <div className="input-box">
                            <input autoComplete="off" required value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" id="repeat-password" className="input-field"/>
                            <label htmlFor="repeat-password" className="label">Repeat Password</label>
                        </div>
                    )}
                    <div className="remember-forgot">
                        <div className="remember-me">
                            <input type="checkbox" id="remember"/>
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <div className="forgot">
                            <a href="/">Forgot a password?</a>
                        </div>
                    </div>
                    
                    <button onClick={(e) => {
                        e.preventDefault()
                        click()}
                    } className="submit">{isLogin ? 'Login' : 'Register'}</button>

                    {isLogin ? (
                        <div className="register">
                            <span>Don't have an account? <NavLink to={REGISTRETION_ROUTE}>Register</NavLink></span>
                        </div>
                    ) : (
                        <div className="register">
                            <span>Already have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink></span>
                        </div>
                    )}
                </form>
            </div>
        </div>
     );
}
 
export default Authorization;