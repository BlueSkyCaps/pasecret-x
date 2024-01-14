import {Card, Col} from "antd";
import {DeleteOutlined, EditOutlined, InfoOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";

function DirectoryListRender({ds}) {
    return(
        ds.map(b=>(
            <Col span={8}>
                <Card
                    style={{ width: 320 }}
                    hoverable={true}
                    onClick={() => {{alert('clicked')}}}
                    actions={[
                        <InfoOutlined  key="info" onClick={()=>{alert("")}}/>,
                        <EditOutlined key="edit" />,
                        <DeleteOutlined key="delete" />,
                    ]}>
                    <Meta
                        title={b.title}
                        description={b.description}
                    />
                </Card>
            </Col>
        ))

    )
}
export  default  DirectoryListRender