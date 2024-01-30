import {Row} from "antd";
import DirectoryListRender from "./com/DirectoryListRender.jsx";
import {storagedata} from "../wailsjs/go/models";
// 接受父组件传递的tabChangeByDirectoryClick回调函数 再次传给子组件DirectoryListRender
// 当点击了某个归类夹 将tabs key激活为3 显示密码项界面
const TabsDirectories: React.FC<{ data: storagedata.PassDto,tabChangeByDirectoryClick:any }> = ({ data,tabChangeByDirectoryClick}) =>(
    <div>
        {/*如果一个 row 中的 col 总和超过 24，那么多余的 col 会作为一个整体另起一行排列。 span={8} 3个一行凑够24*/}
        <Row gutter={[16,16]}>
            {
                data==null?<></>:<DirectoryListRender ds={data.loadedItems.category} tabChangeByDirectoryClick={tabChangeByDirectoryClick}/>
            }
        </Row>
    </div>
);
export default TabsDirectories