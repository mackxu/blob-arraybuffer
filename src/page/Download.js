import { useState } from 'react'
import './Download.css'
import { saveFile } from './util'

export default function Download() {
  const [content, setContent] = useState('')
  const saveText = () => {
    const myBlob = new Blob([content], { type: 'text/plain' })
    saveFile('blob.text', myBlob)
  }
  const updateTextareaContent = e => setContent(e.target.value)

  const saveAudio = async () => {
    const res = await fetch('https://parrot-1251479438.cos.ap-beijing.myqcloud.com/parrot_test%2Fr%2F1155a8fd74f698c9ef2bc914ba034a8d%2F1i8KmKkKuXdfFNO7GJQxgVjmUGd%2Faudio.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDpUx4HvL4vdEqLbNxz21vDQabTIg58SPF%26q-sign-time%3D1604996619%3B1605083019%26q-key-time%3D1604996619%3B1605083019%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D2e6521ba939e88c5c2bf9886a086f3952929dbf0')
    const myBlob = await res.blob()
    saveFile('blob.mp3', myBlob)
  }
  return (
    <div className="Download">
      <div className="title">演示一：保存文件</div>
      <textarea
        value={content}
        onChange={updateTextareaContent}
        placeholder="请输入文本"
        rows="10" cols="120"
      />
      <div>
        <button onClick={saveText}>保存文本</button>
      </div>

      <br/>
      <div className="title">演示二：保存腾讯云文件</div>
      <div>https://parrot-1251479438.cos.ap-beijing.myqcloud.com/parrot_test%2Fr%2F1155a8fd74f698c9ef2bc914ba034a8d%2F1i8KmKkKuXdfFNO7GJQxgVjmUGd%2Faudio.mp3?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDpUx4HvL4vdEqLbNxz21vDQabTIg58SPF%26q-sign-time%3D1604996619%3B1605083019%26q-key-time%3D1604996619%3B1605083019%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D2e6521ba939e88c5c2bf9886a086f3952929dbf0</div>
      <br/>
      <button onClick={saveAudio}>保存文件</button>
    </div>
  )
}