import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/start.module.css'

function vedioPreload(urls: string[]) {
  urls.forEach((url) => {
    const video = document.createElement('video')
    video.src = url
  })
}

export function Init() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isShown, setIsShown] = useState<boolean>(true)
  const router = useRouter()
  useEffect(() => {
    vedioPreload(['/second_sing_compressed.mp4', '/third_no_compressed.mp4', '/third_yes_compressed.mp4'])
  }, [])

  return (
    <div>
      <video
        preload="auto"
        style={{ height: '100vh' }}
        ref={videoRef}
        playsInline={false}
        onEnded={() => {
          router.push({ query: { page: 'serenade' } })
        }}
      >
        <source src="/first_compressed.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        style={{
          display: isShown ? 'flex' : 'none',
        }}
        className={styles.textBox}
        onClick={() => {
          videoRef.current.play()
          setIsShown(false)
        }}
      >
        <a href="#" className={`${styles.btn} ${styles.btnWhite} ${styles.btnAnimated}`}>
          Start
        </a>
      </div>
    </div>
  )
}
