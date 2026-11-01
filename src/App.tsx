import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { SiteLayout } from './layouts/SiteLayout'
import { WalletProvider } from './components/wallet/WalletContext'
import Home from './pages/Home'
import Agents from './pages/Agents'
import Onchain from './pages/Onchain'
import Guides from './pages/Guides'
import Pricing from './pages/Pricing'
import Topup from './pages/Topup'
import Developers from './pages/Developers'
import Access from './pages/Access'
import NotFound from './pages/NotFound'

const Chat = lazy(() => import('./pages/Chat'))

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <WalletProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="agents" element={<Agents />} />
              <Route path="onchain" element={<Onchain />} />
              <Route path="guides" element={<Guides />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="topup" element={<Topup />} />
              <Route path="developers" element={<Developers />} />
              <Route path="access" element={<Access />} />
            </Route>
            <Route
              path="chat"
              element={
                <Suspense fallback={<div className="h-[100dvh] bg-bg" />}>
                  <Chat />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </MotionConfig>
  )
}
