import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { starLoginEmailPassword, startGoogleLogin } from '../../actions/auth';


export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [values, handleInputChange] = useForm({
        email: 'andressalgado41@gmail.com',
        password: '123456'
    });

    const {email, password} = values;

    const handleLogin = (e) =>{
        e.preventDefault();
        console.log(email,password);
        dispatch(starLoginEmailPassword(email, password));
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin}> 
                <input className="auth__input" type="text" placeholder="Email" name="email" value={email} onChange={handleInputChange} />
                <input className="auth__input" type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange} />
                <button className="btn btn-primary btn-block" type="submit">Login</button>
                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text"> 
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className="link" to="/auth/register">Create new account</Link>
            </form>
        </>
    )
}
