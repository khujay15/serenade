import { PageContextProvider } from '../components/usePage'

export default function App({ Component, pageProps }) {
  return (
    <PageContextProvider>
      <Component {...pageProps} />
    </PageContextProvider>
  )
}
