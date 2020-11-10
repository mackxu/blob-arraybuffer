import './Compress.css'
import previewImage from '../images/compress-demo.png'
import { useState } from 'react';

// 图片上传前的压缩
// 裁剪尺寸
// 压缩图片质量（jpeg/webp）
export default function Compress() {

  const [value, setValue] = useState(100)
  const [compressImg, setCompressImg] = useState('')

  const handleRangeChange = e => {
    const quality = e.target.value
    setValue(quality)
    const $canvas = document.createElement('canvas')
    const $img = document.getElementById('img')
    $canvas.width = 488
    $canvas.height = 250
    const ctx = $canvas.getContext('2d')
    ctx.clearRect(0, 0, $canvas.width, $canvas.height)
    ctx.drawImage($img, 0, 0, $canvas.width, $canvas.height)
    console.log(quality / 100);
    // 压缩图片质量
    $canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      setCompressImg(url)
    }, 'image/jpeg', quality / 100)
  }

  return (
    <div className="Compress">
      <div className="main">
        <div className="preview-image">
          <div>预览图片</div>
          <div className="img-wrap">
            <img src={previewImage} id="img" alt="" />
          </div>
        </div>
      </div>
      <div>
        <input type="range" min="0" max="100" step="10" value={value} onChange={handleRangeChange} />
      </div>
      <div>{value}</div>
      <br/>
      <div className="compress-image">
        <div>压缩图片</div>
        <div className="img-wrap">
          {compressImg && <img src={compressImg} id="img" alt="" />}
        </div>
      </div>
    </div>
  )
}