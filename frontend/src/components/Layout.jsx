import Sidebar from './Sidebar'

function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main style={{background: 'var(--bg)'}} className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  )
}

export default Layout