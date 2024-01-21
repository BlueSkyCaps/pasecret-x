import {Button, FloatButton, List} from "antd";
import {CopyFilled, DeleteFilled, EyeFilled, PlusOutlined, UnorderedListOutlined} from "@ant-design/icons";

// 密碼項界面
function TabsDirectoryItems({tabChangeByDirectoryItemsIconClick}) {
    const data = [
        {
            id: '1',
            name: 'Ant Design Title 1',
            remark: 'This is a reminder',
        },
        {
            id: '2',
            name: 'Ant Design Title 2',
            remark: 'This is a reminder2',

        },
        {
            id: '3',
            name: 'Ant Design Title 3',
            remark: 'This is a reminder3',

        },
    ];
    let deleteItemClick = (id) =>{
        console.log("deleteItemClick",id);
    };
    let editItemClick = (id) =>{
        console.log("editItemClick",id);
    };
    let copyItemClick = (id) =>{
        console.log("copyItemClick",id);
    };
    return(
        <>
            {/* 此按钮为本组件 覆盖 首页归类夹界面的"添加归类夹"按钮 点击时会显示归类夹界面*/}
            <FloatButton onClick={()=>{tabChangeByDirectoryItemsIconClick("1")}} size="small" style={{ right: 70,top:3 }}
                         type="default" shape="circle" icon={<UnorderedListOutlined />}  />
            {/* 此按钮为本组件添加密码项按钮*/}
            <FloatButton onClick={()=>{alert("给该归类夹添加密码项")}} size="small" style={{ right: 116,top:3 }}
                         type="default" shape="circle" icon={<PlusOutlined />}  />
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item
                        style={{ backgroundColor: "white", marginBottom: 20 }}
                        actions={[
                            <Button className="delItemBtn" onClick={()=>{deleteItemClick(item.id)}} icon={<DeleteFilled />}/>,
                            <Button  onClick={()=>{copyItemClick(item.id)}} icon={<CopyFilled />}/>,
                            <Button onClick={()=>{editItemClick(item.id)}} icon={<EyeFilled />} />]
                        }>
                        <List.Item.Meta
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={item.remark}
                        />
                    </List.Item>
                )}
            />

        </>
    )
}
export default TabsDirectoryItems