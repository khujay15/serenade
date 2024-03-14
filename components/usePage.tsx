import React, { useContext, useState } from 'react'

export const PageContext = React.createContext<{
  page: string
  setPage: Function
  query: string
  setQuery: Function
  lang: string
  setLang: Function
  isKorean: boolean
}>(null)

export function usePage() {
  return useContext(PageContext)
}

export function PageContextProvider({ children }) {
  const [page, setPage] = useState<string>()
  const [query, setQuery] = useState<string>()
  const [lang, setLang] = useState<'ko' | 'en'>('en')

  const isKorean = lang === 'ko'
  return (
    <PageContext.Provider
      value={{
        page,
        setPage,
        query,
        setQuery,
        lang,
        setLang,
        isKorean,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}
