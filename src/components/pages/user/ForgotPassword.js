import React,{useState} from "react"
import bgImage from '../../../static/assets/img/backgrounds/form_image.jpg';
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {

    const [username,setUsername] = useState(
        ''
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8080/api/v1/forgot-password',{username:username});
        console.log(response.data);
        return response;
    }

    return (
        <div className="container-fluid" style={{ backgroundImage: `url(${bgImage})`,backgroundPosition:'center',backgroundRepeat:'no-repeat' }}>
            <div className="row" style={{height:'100vh'}}>
                <div className="col-xl-12 col-md-9 col-sm-6 mx-auto d-flex justify-contentcenter align-items-center">
                    <div className="border mx-auto " style={{borderRadius:'20% 20% / 8% 8%',width:'600px',backgroundColor: 'rgb(255, 255, 255,0.9)', boxShadow: '0px 2px 20px 10px rgb(47, 63, 93)'}}>
                    <div className="mx-auto" style={{padding: '20px 36px'}}>
                            <div>
                                <div className="h4 text-uppercase text-shadow text-center" >Quên mật khẩu</div>
                            </div>
                            <form className=" my-4" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username" className="form-label"><strong className="" >Email</strong></label>
                                    <input id="username" type="text" placeholder="Nhập Email" className="input-red" value={username} onChange={(e)=>setUsername(e.target.value)} />
                                </div>
                                <div className="text-center">
                                    <button className="btn-red w-100">Gửi yêu cầu</button>
                                </div>
                                <hr />
                                <div>
                                    <Link to="/sign-in" className="text-red">Quay lại trang đăng nhập</Link>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;