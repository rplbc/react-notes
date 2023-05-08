import AuthRoute from '@/components/AuthRoute'
import ProtectedRoute from '@/components/ProtectedRoute'
import RootRoute from '@/components/RootRoute'
import AllNotesPage from '@/pages/AllNotes'
import EditNotePage from '@/pages/EditNote'
import NotFoundPage from '@/pages/NotFound'
import ResetPasswordPage from '@/pages/ResetPassword'
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
  resetPassword: '/reset-password',
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootRoute />}>
      <Route element={<ProtectedRoute />}>
        <Route path={pagePath.home} element={<AllNotesPage />} />
        <Route path={pagePath.note(':id')} element={<EditNotePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<AuthRoute />}>
        <Route path={pagePath.signIn} element={<SignInPage />} />
        <Route path={pagePath.signUp} element={<SignUpPage />} />
        <Route path={pagePath.resetPassword} element={<ResetPasswordPage />} />
      </Route>
    </Route>
  )
)

export default router
