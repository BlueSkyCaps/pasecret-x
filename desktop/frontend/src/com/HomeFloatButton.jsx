import {FloatButton} from "antd";
import {HomeTwoTone, SettingTwoTone} from "@ant-design/icons";

function HomeFloatButton({onClickHandle}) {
    return(
        <FloatButton onClick={onClickHandle} size="small" style={{ right: 24,top:3 }}
            type="default" shape="circle" icon={<HomeTwoTone />}  />
    )
}
export default HomeFloatButton;