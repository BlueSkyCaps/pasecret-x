import {useNavigate} from "react-router-dom";

function DirectoryItems() {
    let navigate = useNavigate(); // 获取导航函数)
    function toHome() {
        navigate("/") // 回到首页
    }
    return(
        <>
            <h1>DirectoryItems</h1>
            <button onClick={toHome}>回到首页</button>
        </>
    )
}
export default DirectoryItems