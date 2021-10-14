import { useState } from 'react';
// import Editor from 'property-template-editor';
import Editor from './dist';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// import './dist/index.css';
import 'antd/dist/antd.css'
import './App.css';

function App() {
  const [text, setText] = useState('');
  const contentBlock = {
    className: '',
    height: 180,
    value: '',
    // value:
    //   '${convertShow(user.$mp_wx6228eb2adfba3ab4_qr_scene_str.$code.$acc,\'{"1231":"213"}\')}123131${mask(event.$AppClick.$ip,1,1,\'*\')}程度还差${user.$mp_wx6228eb2adfba3ab4_qr_scene}',
    placeholder: '请输入',
    onChange: (value) => {
      setText(value);
      console.log(value);
    },
    maxLength: 10,
  };

  const doc = `
property-template-editor 组件 \`umd\`, 通过 \`zip\` 包提供:

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

  return (
    <Editor
      contentBlock={contentBlock}
      tools={['user', 'event', 'product', 'white']}
      proxy={} // 代理地址
      mock // 调试阶段开启 mock，不使用 urls 接口
    />
  );
};
  ~~~

### 属性 Props:

| 属性名称 | 类型 | 说明 | 默认值|
| - | - | - | - |
| contentBlock | contentBlock | 编辑器配置 | 见 contentBlock |
| tools | string[] | 支持插入属性的类型 | ['user', 'event', 'product', 'white'] |
| proxy | string | 代理 url 路径，最终请求 \`url\`：proxy + ?url={realUrl} | - |
| mock | boolean | api 未就绪启用 mock | false |
| project | string | 当前项目 | default |
| readonly | boolean | 只读模式 | false |

注意：mock 仅调试阶段使用，开发阶段传入 proxy 即可，mock 与 proxy 互斥，勿同时使用

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
          contentBlock={contentBlock}
          tools={['user', 'event', 'product', 'white']}
          mock
          project="default"
          readonly={false}
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
