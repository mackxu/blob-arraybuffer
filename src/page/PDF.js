import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib'
import { useRef, useState } from 'react'
import './PDF.css'
import pngUrl from '../images/logo.png'

// https://pdf-lib.js.org/docs/api/
export default function PDF() {
  const fileRef = useRef(null)
  const [PDFSrc, setPDFSrc] = useState('')
  const addWatermark = async (pdfBytes) => {
    // 加载pdf
    const pdfDoc = await PDFDocument.load(pdfBytes)
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    
    // 读取水印图片
    const pngImageBytes = await fetch(pngUrl).then(res => res.arrayBuffer())
    // 为pdf嵌入水印
    const pngImage = await pdfDoc.embedPng(pngImageBytes)

    const pages = pdfDoc.getPages()
    for (let index = 0; index < pages.length; index++) {
      const page = pages[index];
      page.drawText('who is', {
        x: 100,
        y: 200,
        size: 30,
        font,
        color: rgb(1, 0, 0),
        rotate: degrees(-45),
        opacity: 0.2,
      })

      page.drawImage(pngImage, {
        x: 170,
        y: 170,
        width: pngImage.width,
        height: pngImage.height,
        opacity: 0.2,
      })
    }
    
    // const pdfResBytes = await pdfDoc.save()
    // const pdfBuffer = pdfResBytes.buffer
    // console.log(pdfBuffer instanceof ArrayBuffer);
    // const pdfBlob = new Blob([pdfBuffer])
    // setPDFSrc(URL.createObjectURL(pdfBlob))
    // saveAs(pdfBlob, 'demo-blob.pdf')

    // bytes -> blob/file -> objectUrl
    const pdfResBytes = await pdfDoc.save()
    const pdfFileObj = new File([pdfResBytes], 'demo-file-blob.pdf', { type: 'application/pdf' })
    console.log(pdfFileObj);
    setPDFSrc(URL.createObjectURL(pdfFileObj))
    // saveAs(pdfFileObj, 'demo-blob-file.pdf')
  }
  const getPDF = () => {
    const pdfFile = fileRef.current.files[0]
    const fileReader = new FileReader()
    fileReader.onload = e => {
      const pdfBytes = e.target.result
      addWatermark(pdfBytes)
    }
    fileReader.readAsArrayBuffer(pdfFile)
  }
  return (
    <div className="pdf">
      上传pdf文件 <input type="file" ref={fileRef}/>
      <br/>
      <br/>
      <div>
        <button onClick={getPDF}>添加水印</button>
      </div>
      { PDFSrc && <iframe title="pdf" src={PDFSrc} style={{ width: '100%', height: '100%' }}></iframe> }
    </div>
  )
}