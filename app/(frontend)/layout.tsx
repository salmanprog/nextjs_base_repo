export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Arial, sans-serif', margin: 0 }}>
        <header style={{ background: '#0B1B48', color: '#fff', padding: '15px' }}>
          <h2>🛍 Never Forget Store</h2>
        </header>
        <main style={{ padding: '20px' }}>{children}</main>
        <footer style={{ background: '#f2f2f2', textAlign: 'center', padding: '10px' }}>
          © {new Date().getFullYear()} Never Forget
        </footer>
      </body>
    </html>
  )
}
