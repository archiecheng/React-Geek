import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
// import { getChannelAPI } from "@/apis/article";
import { request } from "@/utils";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  // 获取频道列表
  // const [channelList, setChannelList] = useState([]);

  // useEffect(() => {
  //   // 1. 封装函数 在函数体内调用接口
  //   const getChannelList = async () => {
  //     const res = await request.get("/channels");
  //     setChannelList(res.data.channels);
  //   };
  //   // 2. 调用函数
  //   getChannelList();
  // }, []);

  const { channelList } = useChannel()

  // 提交表单
  const onFinish = async (formValue) => {
    // 校验封面类型imageType是否和实际的图片列表imageList数量相等
    if (imageList.length !== imageType) return message.warning('封面类型和图片数量不匹配')
    const { title, content, channel_id } = formValue;
    // 1. 按照接口文档的格式处理收集到的表单数据
    const reqData = {
      title,
      content,
      cover: {
        type: imageType, // 封面模式
        images: imageList.map(item => item.response.data.url), // 图片列表
      },
      channel_id,
    };
    // 2. 调用接口提交
    await request.post("/mp/articles?draft=false", reqData);
    console.log(formValue);
  };

  // 上传回调
  const [imageList, setImagelist] = useState([]);
  const onChange = (value) => {
    console.log("正在上传中...", value);
    setImagelist(value.fileList);
  };

  // 切换图片封面类型
  const [imageType, setImageType] = useState(0);
  const onTypeChange = (e) => {
    console.log("切换封面", e.target.value);
    setImageType(e.target.value);
  };

  // 回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  // 获取实例
  const [form] = Form.useForm()
  console.log(articleId);
  useEffect(() => {
    // 1. 通过 id 获取数据
    async function getArticleDetail(){
      const res = await request(`/mp/articles/${articleId}`)
      console.log(res);
      form.setFieldsValue(res.data)
      console.log(form);
    }
    // 2. 调用实例方法 完成回填
    getArticleDetail()
  }, [articleId, form])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* value属性，用户选中之后会自动收集起来作为接口的提交字段 */}
              {channelList.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* listType: 决定选择文件框的外观样式 showUploadList: 控制显示上传列表 */}
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                onChange={onChange}
                maxCount={imageType}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
