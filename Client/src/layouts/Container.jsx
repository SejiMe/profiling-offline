import React from 'react'

const Container = ({children}) => {
  return (
    <main className="bg-slate-100">
        <div className="flex flex-col items-center justify-center min-h-screen layout">
            {children}
        </div>
    </main>
  )
}

export default Container