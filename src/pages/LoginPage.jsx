import { useState } from 'react';
import axios from 'axios';


const BASE_URL = import.meta.env.VITE_BASE_URL;
//const API_PATH = import.meta.env.VITE_API_PATH;

function LoginPage({ setIsAuth }) {

    const [account, setAccount] = useState({
        username: "example@test.com",
        password: "example"
    });

    const handleLogin = (e) => {
        //console.clear();
        //remove default event
        e.preventDefault();
        // console.log(import.meta.env.VITE_BASE_URL);
        // console.log(import.meta.env.VITE_API_PATH);
        axios.post(`${BASE_URL}/v2/admin/signin`, account)
            .then((res) => {

                const { token, expired } = res.data;
                document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;

                //console.log(token, expired, getToken);
                //發送請求前，在headers 裡帶入 token資料，後續動作的請求都會自動帶上Token資料
                axios.defaults.headers.common['Authorization'] = token;
                //console.log(new Date(expired));
                //  getProducts();
                setIsAuth(true);
            }).catch((error) => {
                console.log(error.response.data);
                alert('login error');
            })
    }
    const handleInputChange = (e) => {
        const { value, name } = e.target
        //copy account物件值
        setAccount({ ...account, [name]: value })

    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-secondary" >
            <h1 className="mb-5">請先登入</h1>
            <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
                <div className="form-floating mb-3">
                    <input name="username" value={account.username} onChange={handleInputChange} type="email" className="form-control" id="username" placeholder="name@example.com" />
                    <label htmlFor="username">Email address</label>
                </div>
                <div className="form-floating">
                    <input name="password" value={account.password} onChange={handleInputChange} type="password" className="form-control" id="password" placeholder="Password" />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="btn btn-primary">登入</button>
            </form>
            <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
        </div>)
}

export default LoginPage;
