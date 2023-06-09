import { useState, useEffect } from "react";
import UserService from "../../../../services/UserService";
import { useParams, useNavigate } from "react-router-dom";


/**
 * @author HuuNQ
 * 26-05-2023
 * @method EarnPoints
 * @returns none
 */
const EarnPoints = () => {
    const [earnPoints, setEarnPoints] = useState([]);
    const token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
    const { username } = useParams();
    const navigate = useNavigate();
    let totalEarnPoint = 0;

    useEffect(() => {
        if (token != null) {
            UserService.getEarnPointsByUsername(username,token)
                .then((data) => {
                    setEarnPoints([...data]);
                    for( let i = 0; i< earnPoints.length;i++){
                        totalEarnPoint += earnPoints[i][8];
                    }
                })
                .catch((error) => {
                    if (error?.response?.status === 403) {
                        navigate("/")
                        Notification.toastErrorNotification("Bạn không thể truy cập vào tài nguyên ngày!")
                    }else if(error?.response?.status === 500){
                        localStorage.removeItem("access_token")
                        localStorage.removeItem("username")
                        localStorage.removeItem("roles")
                        navigate("/sign-in")
                        Notification.toastWarningNotification("Hết phiên đăng nhập,vui lòng đăng nhập lại!")
                    }
                })
        }
    }, []);
    const mapEarnPoint = () => {
        for (let i = 0; i < earnPoints.length; i++) {
        return (
            <div>
                < div className="row" >
                    <div className="col-12">
                        <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Mã đặt vé: <span style={{ fontWeight: 400 }}>{earnPoints[i][0]}</span></p>
                        <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Trạng thái: <span style={{ fontWeight: 400 }}>{earnPoints[i][7] > 0 ? 'Thành công' : 'Thất bại'}</span></p>
                        <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Mô tả đặt vé: <span style={{ fontWeight: 400 }}>Phim: {earnPoints[i][2]}(c16, Suat chieu: {earnPoints[i][3].split('T')[1]}, Ngay:  {earnPoints[i][3].split('T')[0]}, Ghe: {earnPoints[i][6]}, Rap: {earnPoints[i][5]}.)</span></p>
                        <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Chi phí: <span style={{ fontWeight: 400 }}>{earnPoints[i][7]}</span></p>
                        <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Tích điểm: <span style={{ fontWeight: 400 }}>{earnPoints[i][8]}</span></p>
                    </div>
                </div >
                <hr />
            </div>
        )
        }
    }

    return (<div>
        <div className="mx-auto mt-4" >
            <h5 className="text-uppercase text-center p-2 text-white" style={{ backgroundColor: '#c23b1a' }}>Lịch sử tích điểm</h5>
            <div>
                <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Số tích điểm đã nhận: <span style={{ fontWeight: 400 }}>{totalEarnPoint} cinepoint</span> </p>
                <p style={{ fontWeight: 600, marginBottom: 8 + 'px' }}>Số tích điểm còn lại: <span style={{ fontWeight: 400 }}>{totalEarnPoint} cinepoint</span> </p>
            </div>
            <hr />
            {earnPoints?.length > 0 
            ?   <div>{mapEarnPoint}
                </div> 
            :
                <div>Không lịch sử tích điểm</div>
            }
        </div>

    </div>
    )
}
export default EarnPoints;