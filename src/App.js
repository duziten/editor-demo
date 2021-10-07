import { useState } from 'react';
import Editor from 'property-template-editor';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const category = 'TEXT_MSG';
  const labelBlock = {
    text: '内容',
    className: '',
  };
  const contentBlock = {
    className: '',
    height: 180,
    // value: '123213${user.$mp_wx6228eb2adfba3ab4_qr_scene}',
    value:
      '${convertShow(user.$mp_wx6228eb2adfba3ab4_qr_scene_str.$code.$acc,\'{"1231":"213"}\')}123131${mask(event.$AppClick.$ip,1,1,\'*\')}程度还差${user.$mp_wx6228eb2adfba3ab4_qr_scene}',
    placeholder: '请输入',
    onChange: (value) => {
      setText(value);
      console.log(value);
    },
    maxLength: 10,
  };
  const urls = {
    userUrl: '/api/property/user/properties',
    eventUrl:
      '/api/v2/sf/events/all?project=default&cache=false&invisible=false&check_permission=false',
    event2Url: '/api/event/properties?events=',
    productUrl:
      '/api/v2/sf/items/type?project=default&cache=false&invisible=false&check_permission=false',
    product2Url: '/api/v2/sf/items/properties?project=default&item_type=',
    whiteUrl:
      'http://10.120.202.72:8115/sf/whiteTag/getWhiteTagList?project=production&token=$f9748a249d55b1949c01f0f098a99a92',
  };
  return (
    <div className="App">
      <h2>属性插入组件演示：</h2>
      <Editor
        category={category}
        readonly={false}
        labelBlock={labelBlock}
        contentBlock={contentBlock}
        tools={['user', 'event', 'product', 'white']}
        urls={urls}
        mock
      />
      <h3>value: </h3>
      <textarea disabled style={{ width: 850, height: 300 }} value={text} />
    </div>
  );
}

export default App;
