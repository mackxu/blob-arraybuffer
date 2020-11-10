import { useEffect, useState } from 'react'
import './BlobUrl.css'
import { dataURItoBlob } from './util'

export default function BlobUrl() {
  const [previewUrl, setPreviewUrl] = useState('')
  const [pasteUrl, setPasteUrl] = useState('')
  const [dragUrl, setDragUrl] = useState('')

  // URL.createObjectURL
  // 本地上传图片 -> Blob -> Object URL
  const uploadImage = (e) => {
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)
    console.log(url);
    setPreviewUrl(url)
  }

  // 本地上传图片 -> Blob -> Data URL
  const uploadImage2 = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      const url = e.target.result
      console.log(url);
      const myBlob = dataURItoBlob(url)
      console.log(myBlob);
      setPreviewUrl(url)
    }
    reader.readAsDataURL(file)
  }

  // clipboardData
  const pasteImage = e => {
    console.log(e.clipboardData.files.length);
    console.log(e.clipboardData.items.length);
    const file = e.clipboardData.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    console.log(url);
    setPasteUrl(url)
  }

  // dataTransfer
  const handleDrop = e => {
    preventDefault(e)
    const file = e.dataTransfer.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    console.log(url);
    setDragUrl(url)
  }

  const preventDefault = e => e.preventDefault()

  // 展示粘贴版的图片
  useEffect(() => {
    document.addEventListener('paste', pasteImage, false)
  }, [])

  useEffect(() => {
    document.addEventListener('drop', handleDrop, false)
    document.addEventListener('dragover', preventDefault, false)
  }, [])
  return (
    <div className="BlobUrl">
      <div className="block">
        <div className="title">上传预览</div>
        <div className="content">
          <div className="view">
            { previewUrl && <img src={previewUrl} alt=""/> }
          </div>
          <div className="upload">
            <input type="file" onChange={uploadImage2}/>
          </div>
        </div>
      </div>
      <div className="block">
        <div className="title">粘贴图片</div>
        <div className="content">
          <div className="view">
            { pasteUrl && <img src={pasteUrl} alt=""/> }
          </div>
        </div>
      </div>
      <div className="block">
        <div className="title">拖入图片</div>
        <div className="content">
          <div className="view">
          { dragUrl && <img src={dragUrl} alt=""/> }
          </div>
        </div>
      </div>
    </div>
  )
}