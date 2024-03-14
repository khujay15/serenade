import { useRef, useState } from 'react'
import globalStyle from '../styles/global.module.css'

const chunks = []

function splitmix32(a) {
  a |= 0
  a = (a + 0x9e3779b9) | 0
  var t = a ^ (a >>> 16)
  t = Math.imul(t, 0x21f0aaad)
  t = t ^ (t >>> 15)
  t = Math.imul(t, 0x735a2d97)
  return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296
}

export function Serenade() {
  const [isShown, setIsShown] = useState<boolean>(true)
  const [mediaRecorder, setmediaRecorder] = useState<MediaRecorder>(null)
  const [resultVideo, setResultVideo] = useState<'yes' | 'no'>(null)

  const singVideoRef = useRef<HTMLVideoElement>(null)
  const yesVideoRef = useRef(null)
  const noVideoRef = useRef(null)

  function randomOutput() {
    if (Math.random() < 0.5) {
      yesVideoRef.current.play()
      setResultVideo('yes')
    } else {
      noVideoRef.current.play()
      setResultVideo('no')
    }
  }

  function getLocalStream() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        // @ts-ignore
        window.localStream = stream
        singVideoRef.current.play()

        const localMediaRecorder = new MediaRecorder(stream)

        localMediaRecorder.start()
        localMediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data)
        }

        localMediaRecorder.onstop = () => {
          const audioBlob: Blob = chunks[0]
          if (!audioBlob) {
            randomOutput()
            return
          }
          try {
            const blobMid = Math.floor(audioBlob.size / 2)
            const cropedBlob = audioBlob.slice(blobMid - 8, blobMid + 8)
            cropedBlob.arrayBuffer().then((res) => {
              const bytes = new Uint16Array(res)
              console.log(bytes[0], splitmix32(bytes[0]))
              if (splitmix32(bytes[0]) < 0.5) {
                yesVideoRef.current.play()
                setResultVideo('yes')
              } else {
                noVideoRef.current.play()
                setResultVideo('no')
              }
            })
          } catch {
            randomOutput()
          }
        }

        setmediaRecorder(localMediaRecorder)
      })
      .catch((err) => {
        console.error(`you got an error: ${err}`)
        window.alert('Audio Permission denied')
      })
  }

  return (
    <div>
      <video
        style={{ height: resultVideo ? '0px' : '100vh' }}
        ref={singVideoRef}
        playsInline={false}
        poster={'/still_shot.jpg'}
        onEnded={() => {
          console.log('chunks', chunks)

          mediaRecorder.stop()
        }}
      >
        <source src={'/second_sing_compressed.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img
        src="/serenade_btn.png"
        className={globalStyle.serenade}
        style={{ display: isShown ? undefined : 'none' }}
        onClick={() => {
          setIsShown(false)
          getLocalStream()
        }}
      />

      <video
        style={{ height: '100vh', display: resultVideo === 'yes' ? undefined : 'none' }}
        ref={yesVideoRef}
        playsInline={false}
      >
        <source src={'/third_yes_compressed.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <video
        style={{ height: '100vh', display: resultVideo === 'no' ? undefined : 'none' }}
        ref={noVideoRef}
        playsInline={false}
      >
        <source src={'/third_no_compressed.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
