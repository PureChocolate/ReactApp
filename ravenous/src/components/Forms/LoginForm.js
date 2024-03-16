import React from 'react';
import './Forms.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';

const formSchema = z.object({
    email: z.string().email("Enter a valid email adress"),
    password: z.string().min(6,"password must be at least 6 characters"),
});


function LoginForm(props) {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema)
    });

    const dispatch = useDispatch();

    const loginHandler = data => {
        fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(data => {
              if (data.status === 'success') {
                // getting user email from response if successful.
                const { email = '', firstName = '', lastName = '' } = data.data.user;

                // setting user to the redux store
                dispatch(login({ firstName, lastName, email, avatar: '' }));
                localStorage.setItem('user', JSON.stringify(data.data.user));
                navigate("/", { replace: true });
                console.log(data.message);
              } else {
                console.error(data.message);
              }
            })
            .catch(err => { })
    }

    return (
        <>
            <div className="card">
                <form onSubmit={handleSubmit(loginHandler)}>
                    <h2 className="title">
                        <Link to="/" title="Home">
                            Ravenous
                        </Link>
                    </h2>
                    <p className="or">
                        <span></span>
                    </p>
                    <div>
                        <h2 className="title"> Login</h2>
                    </div>
                    <div className="email-login">
                        <label htmlFor="email">
                            {" "}
                            <b>Email</b>
                        </label>
                        <input
                            type="text"
                            placeholder="name@abc.com"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-danger">{errors.email?.message}</p>}
                        <label htmlFor="psw">
                            <b>Password</b>
                        </label>
                        <input
                            type="password"
                            placeholder="8+ (a, A, 1, #)"
                            {...register("password")}
                        />
                        {errors.password && <p className="text-danger">{errors.password?.message}</p>}
                    </div>
                    <button type="submit" className="cta-btn">Login</button>
                    <Link className="forget-pass" to="/signup">
                        Create an Account
                    </Link>
                </form>
            </div>
        </>
    );

}

export default LoginForm;