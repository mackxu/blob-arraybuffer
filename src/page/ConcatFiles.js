import { useState } from "react"
import audioFile2 from '../images/recorder-1.mp3'
import audioFile1 from '../images/recorder-2.mp3'

export default function ConcatFiles() {
  const [audioUrl, setAudioUrl] = useState('')
  const concatAudio = async () => {
    const res = await fetch(audioFile1)
    const buffer = await res.arrayBuffer()

    const res2 = await fetch(audioFile2)
    const buffer2 = await res2.arrayBuffer()

    const bLen = buffer.byteLength + buffer2.byteLength
    const bufferTarget = new ArrayBuffer(bLen)
    const typedArrayTarget = new Uint8Array(bufferTarget)
    // 拼接音频
    const typedArrayOrigin = new Uint8Array(buffer)
    console.log(readMp3Info(typedArrayOrigin))
    typedArrayTarget.set(typedArrayOrigin, 0)   // 拼接第一份

    const typedArrayOrigin2 = new Uint8Array(buffer2)
    console.log(readMp3Info(typedArrayOrigin2))
    typedArrayTarget.set(typedArrayOrigin2, buffer.byteLength)    // 拼接第二份
    // ArrayBuffer 转 File
    const newAudioFile = new File([bufferTarget], 'temp.mp3', { type: 'audio/mpeg' })
    console.log(newAudioFile);
    setAudioUrl(URL.createObjectURL(newAudioFile))
    // ArrayBuffer 转 Blob
    // const audioBlob = new Blob([abTarget])
    // setAudioUrl(URL.createObjectURL(audioBlob))
  }

  const concatAudios = async () => {
    const res = await fetch(audioFile1)
    const audioBytes = await res.arrayBuffer()

    const res2 = await fetch(audioFile2)
    const audioBytes2 = await res2.arrayBuffer()

    const bLen = audioBytes.byteLength + audioBytes2.byteLength
    console.log(audioBytes.byteLength, audioBytes2.byteLength, bLen);
    const bufferTarget = new ArrayBuffer(bLen)
    const viewTarget = new DataView(bufferTarget)
    console.log(viewTarget.byteLength);

    const viewOrigin = new DataView(audioBytes)
    for (let index = 0; index < audioBytes.byteLength; index++) {
      viewTarget.setUint8(index, viewOrigin.getUint8(index))
    }
    const viewOrigin2 = new DataView(audioBytes2)
    for (let index = audioBytes.byteLength; index < bufferTarget.byteLength; index++) {
      viewTarget.setUint8(index, viewOrigin2.getUint8(index))
    }
    // ArrayTarget -> Blob
    const audioBlob = new Blob([bufferTarget])
    console.log(audioBlob);
    setAudioUrl(URL.createObjectURL(audioBlob))
  }
  return (
    <div className="ConcatFiles">
      
      <div>音频1: <audio controls src={audioFile1}></audio></div>
      <br/>
      <div>音频2: <audio controls src={audioFile2}></audio></div>
      <br/>
      <br/>
      <div><button onClick={concatAudio}>合并音频</button></div>
      { audioUrl && <audio controls src={audioUrl}></audio> }
    </div>
  )
}

const readMp3Info=function(bytes){
	if(bytes.byteLength<4){
		return null;
	};
	var byteAt=function(idx,u8){
		return ("0000000"+((u8||bytes)[idx]||0).toString(2)).substr(-8);
	};
	var b2=byteAt(0)+byteAt(1);
	var b4=byteAt(2)+byteAt(3);
	
	if(!/^1{11}/.test(b2)){//未发现帧同步
		return null;
	};
	var version=({"00":2.5,"10":2,"11":1})[b2.substr(11,2)];
	var layer=({"01":3})[b2.substr(13,2)];//仅支持Layer3
	var sampleRate=({ //lamejs -> Tables.samplerate_table
		"1":[44100, 48000, 32000]
		,"2":[22050, 24000, 16000]
		,"2.5":[11025, 12000, 8000]
	})[version];
	sampleRate&&(sampleRate=sampleRate[parseInt(b4.substr(4,2),2)]);
	var bitRate=[ //lamejs -> Tables.bitrate_table
		[0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160] //MPEG 2 2.5
		,[0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320]//MPEG 1
	][version==1?1:0][parseInt(b4.substr(0,4),2)];
	
	if(!version || !layer || !bitRate || !sampleRate){
		return null;
	};
	
	return {
		version:version //1 2 2.5 -> MPEG1 MPEG2 MPEG2.5
		,layer:layer//3 -> Layer3
		,sampleRate:sampleRate //采样率 hz
		,bitRate:bitRate //比特率 kbps
  }
}