import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Authorization = () => {

    const location = useLocation()
    const isLogin = location.pathname === '/auth'

    return ( 
        <div className="wrapper">
            <div className="login">
                <p className="title">
                    {isLogin ? 'Login' : 'Registration'}
                    <span></span>
                </p>
                <form action="" className="form">
                    <div className="input-box">
                        <input type="text" id="user" className="input-field"/>
                        <label for="user" className="label">Username</label>
                    </div>
                    <div className="input-box">
                        <input type="text" id="password" className="input-field"/>
                        <label for="password" className="label">Password</label>
                    </div>
                    {!isLogin && (
                        <div className="input-box">
                            <input type="text" id="repeat-password" className="input-field"/>
                            <label for="repeat-password" className="label">Repeat Password</label>
                        </div>
                    )}
                    <div className="remember-forgot">
                        <div className="remember-me">
                            <input type="checkbox" id="remember"/>
                            <label for="remember">Remember me</label>
                        </div>
                        <div className="forgot">
                            <a href="/">Forgot a password?</a>
                        </div>
                    </div>
                    <button type="submit" className="submit">Login</button>
                    {isLogin ? (
                        <div className="register">
                            <span>Don't have an account? <NavLink to="/register">Register</NavLink></span>
                        </div>
                    ) : (
                        <div className="register">
                            <span>Already have an account? <NavLink to="/auth">Login</NavLink></span>
                        </div>
                    )}
                </form>
            </div>
        </div>
     );
}
 
export default Authorization;