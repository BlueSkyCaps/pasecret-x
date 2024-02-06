import {Button, Col, Progress, Row, Space} from "antd";
import {useContext, useState} from "react";
import App from "./App";
import {storagedata} from "../wailsjs/go/models.js";
import {useTranslation} from "react-i18next";
import {PassDtoContext} from "./Core";
let addClickedCounter = 0;
let addClickedStr = "";
function Lock() {
    const { t } = useTranslation();
    const {PassDtoReceived} = useContext(PassDtoContext);
    function numberBtnInputHandler(number) {
        addClickedCounter++
        setPercent(addClickedCounter*25)
        addClickedStr+=number;
        if (addClickedCounter>=4){
            if (addClickedStr===PassDtoReceived.preferences.lockPwd){
                setPass(true)
                return
                // end ignore all logic
            }else {
                // alert("密码错误")
            }
            addClickedCounter=0
            addClickedStr="";
            setPercent(addClickedCounter*25)
        }
    }
    const [percent, setPercent] = useState(0);
    const [pass, setPass] = useState(false);
    return (
            pass ? <App/>:
            <div>
                <h4 style={{color:"gray"}}>{t("lockLabelText")}</h4>
                <Space>
                    <Progress strokeColor="#7ac5cd" showInfo={false} steps={4} percent={percent} size={25} />
                </Space>
                <Row  className="numberPadding">
                    <Col span={24}>
                        <Space size="large">
                            <Button onClick={()=>numberBtnInputHandler(1)} style={{width:"70px",height:"70px"}} shape="circle"><span style={{fontSize:"40px", color:"gray"}}>1</span></Button>
                            <Button onClick={()=>numberBtnInputHandler(2)} style={{width:"70px",height:"70px"}} shape="circle"><span style={{fontSize:"40px", color:"gray"}}>2</span></Button>
                            <Button onClick={()=>numberBtnInputHandler(3)} style={{width:"70px",height:"70px"}} shape="circle"><span style={{fontSize:"40px", color:"gray"}}>3</span></Button>
                        </Space>
                    </Col>
                </Row>
                <Row  className="numberPadding">
                    <Col span={24}>
                        <Space size="large">
                            <Button onClick={()=>numberBtnInputHandler(4)} style={{width:"70px",height:"70px"}} shape="circle"><span style={{fontSize:"40px", color:"gray"}}>4</span></Button>
                            <Button onClick={()=>numberBtnInputHandler(5)} style={{width:"70px",height:"70px"}} shape="circle"><span style={{fontSize:"40px", color:"gray"}}>5</span></Button>
                            <Button onClick={()=>numberBtnInputHandler(6)} style={{width:"70px",height:"70px"}} shape="circle"><span style={{fontSize:"40px", color:"gray"}}>6</span></Button>
                        </Space>
                    </Col>
                </Row>
                <Row  className="numberPadding">
                    <Col span={24}>
                        <Space size="large">
                            <Button onClick={()=>numberBtnInputHandler(7)} style={{width:"70px",height:"70px"}} shape="circle"><span style={{fontSize:"40px", color:"gray"}}>7</span></Button>
                            <Button onClick={()=>numberBtnInputHandler(8)} style={{width:"70px",height:"70px"}} shape="circle"><span style={{fontSize:"40px", color:"gray"}}>8</span></Button>
                            <Button onClick={()=>numberBtnInputHandler(9)} style={{width:"70px",height:"70px"}} shape="circle"><span style={{fontSize:"40px", color:"gray"}}>9</span></Button>
                        </Space>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button onClick={()=>numberBtnInputHandler(0)} style={{width:"70px",height:"70px"}} shape="circle"><span style={{fontSize:"40px", color:"gray"}}>0</span></Button>
                    </Col>
                </Row>
            </div>
    );
}

export default Lock;