import {FloatButton} from "antd";
import {SettingTwoTone} from "@ant-design/icons";

function SettingFloatButton({onClickHandle}) {
    return(
        <FloatButton onClick={onClickHandle} size="small" style={{ right:24, top:3 }}
            type="default" shape="circle" icon={<SettingTwoTone />}  />
    )
}
export default SettingFloatButton;