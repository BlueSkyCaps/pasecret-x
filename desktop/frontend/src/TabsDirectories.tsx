import {Alert, Row, Spin} from "antd";
import DirectoryListRender from "./com/DirectoryListRender.js";
import {storagedata} from "../wailsjs/go/models";
import {useContext} from "react";
import {PassDtoContext} from "./Core";
import {isNullOrEmpty} from "./utils";
// 接受父组件传递的tabChangeByDirectoryClick回调函数 再次传给子组件DirectoryListRender
const TabsDirectories=({tabChangeByDirectoryClick}) =>{
    const {PassDtoReceived}=useContext(PassDtoContext);
    return(
        <div>
            {
                isNullOrEmpty(PassDtoReceived.loadedItems.category)?
                    <Spin tip="Loading..." size="large">
                        <Alert
                            message="Loading category..."
                            description="Loading category..."
                            type="info"
                        />
                    </Spin>:
                    <Row gutter={[16,16]}>
                        <DirectoryListRender tabChangeByDirectoryClick={tabChangeByDirectoryClick}/>
                    </Row>

            }
        </div>
    )
};
export default TabsDirectories