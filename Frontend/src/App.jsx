import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import FaceExpression from './features/expression/components/FaceExpression'
import { RouterProvider } from 'react-router'
import { router } from './App.routes.jsx'
import './features/shared/style/global.scss'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { SongContextProvider } from './features/home/song.context.jsx'


function App() {

  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App
