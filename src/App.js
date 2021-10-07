import { useState } from 'react';
import Editor from 'property-template-editor';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import 'property-template-editor/dist/index.css';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const labelBlock = {
    text: '沟通内容：',
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

  const doc = `
property-template-editor 组件（umd）:

~~~js
// 文件结构
property-template-editor
├── index.css
├── index.js
~~~

~~~jsx
import React, { useState } from 'react';
// 引入编辑器和样式
import Editor from 'property-template-editor';
import 'property-template-editor/index.css';

const Demo = () => {
  const [text, setText] = useState('');

  // label 配置
  const labelBlock = {
    text: '沟通内容：',
    className: '', // label class
  };
  // 编辑器配置
  const contentBlock = {
    height: 180,
    value: text,
    placeholder: '请输入',
    onChange: (value) => {
      console.log('editor value: ', value);
      setText(value);
    },
  };

  // 实际接口为准
  const urls = {
    user: '',
    event: '',
    event2: '',
    product: '',
    product2: '',
    white: '',
    white2: '',
  };

  return (
    <Editor
      labelBlock={labelBlock}
      contentBlock={contentBlock}
      tools={['user', 'event', 'product', 'white']}
      urls={urls} // 属性接口地址
      mock // 调试阶段开启 mock，不使用 urls 接口
    />
  );
};
  ~~~

### 属性 Props:

| 属性名称 | 类型 | 说明 | 默认值|
| - | - | - | - |
| labelBlock | labelBlock | label 配置 | 见 labelBlock |
| contentBlock | contentBlock | 编辑器配置 | 见 contentBlock |
| tools | string[] | 支持插入属性的类型 | ['user', 'event', 'product', 'white'] |
| urls | Object | 获取属性 api 路径 | - |
| mock | boolean | api 未就绪启用 mock | false |

#### labelBlock：
| 属性名称 | 类型 | 说明 | 默认值|
| - | - | - | - |
| text | string | label 文案 | '内容' |
| className | string | 自定义 label 样式名称 | - |

#### contentBlock
| 属性名称 | 类型 | 说明 | 默认值|
| - | - | - | - |
| height | number | 编辑器高度 | 180 |
| value | string | 编辑器 value | '' |
| placeholder | string | 编辑器 placeholder | '请输入' |
| onChange | (v: string) => void | 编辑器回调，返回 value | - |
  `;

  return (
    <div className="App">
      <h2>属性编辑器演示 & 使用文档：</h2>
      <div style={{ width: 900, marginTop: 20 }}>
        <Editor
          style={{ width: 500 }}
          readonly={false}
          labelBlock={labelBlock}
          contentBlock={contentBlock}
          tools={['user', 'event', 'product', 'white']}
          urls={urls}
          mock
        />
      </div>
      <h3 style={{ margin: '20px 0' }}>编辑区获取 value: </h3>
      <textarea disabled style={{ width: 900, height: 300 }} value={text} />
      <h3 style={{ margin: '20px 0' }}>代码示例: </h3>
      <div style={{ width: 900 }}>
        <Markdown
          children={doc}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
