import AuthRoute from '@/components/layouts/AuthRoute'
import ProtectedRoute from '@/components/layouts/ProtectedRoute'
import RootRoute from '@/components/layouts/RootRoute'
import { pagePath } from '@/lib/utils'
import AllNotesPage from '@/pages/AllNotes'
import EditNotePage from '@/pages/EditNote'
import NotFoundPage from '@/pages/NotFound'
import ProfilePage from '@/pages/Profile'
import ResetPasswordPage from '@/pages/ResetPassword'
import SignInPage from '@/pages/SignIn'
import SignUpPage from '@/pages/SignUp'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootRoute />}>
      <Route element={<ProtectedRoute />}>
        <Route path={pagePath.home} element={<AllNotesPage />} />
        <Route path={pagePath.note(':id')} element={<EditNotePage />} />
        <Route path={pagePath.profile} element={<ProfilePage />} />
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
