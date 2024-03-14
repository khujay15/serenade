/* eslint-disable react/no-unknown-property */
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Init } from '../components/init'
import { Serenade } from '../components/Serenade'

const IndexPage = () => {
  const router = useRouter()
  const { query } = router

  function renderPage() {
    switch (query.page) {
      case 'serenade':
        return <Serenade />

      default:
        return <Init />
    }
  }
  return (
    <>
      <Head>
        <link rel="preload" href="/first_compressed.mp4" as="video" />
        <link rel="preload" href="/second_sing_compressed.mp4" as="video" />
        <link rel="preload" href="/third_no_compressed.mp4" as="video" />
        <link rel="preload" href="/third_yes_compressed.mp4" as="video" />

        <link rel="preload" href="/still_shot.jpg" as="image" />
        <link rel="preload" href="/serenade_btn.png" as="image" />
      </Head>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <style jsx global>{`
          body {
            padding: 0px;
            margin: 0px;
          }
        `}</style>
        {renderPage()}
      </div>
    </>
  )
}

export default IndexPage
