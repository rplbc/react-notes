import AllNotesPage from '@/pages/AllNotes'
import EditNotePage from '@/pages/EditNote'
import NotFoundPage from '@/pages/NotFound'
import SignInPage from '@/pages/SignIn'
import SignUpPage from '@/pages/SignUp'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

export const pagePath = {
  home: '/',
  note: (id: string) => `/note/${id}`,
  signIn: '/signin',
  signUp: '/signup',
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={pagePath.home} element={<AllNotesPage />} />
      <Route path={pagePath.note(':id')} element={<EditNotePage />} />
      <Route path={pagePath.signIn} element={<SignInPage />} />
      <Route path={pagePath.signUp} element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

export default router
