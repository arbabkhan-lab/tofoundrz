import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import Landing from '@/pages/Landing';
import StudentSignup from '@/pages/StudentSignup';
import CompanySignup from '@/pages/CompanySignup';
import SignIn from '@/pages/SignIn';
import AdminLogin from '@/pages/AdminLogin';
import StudentDashboard from '@/pages/StudentDashboard';
import Learning from '@/pages/Learning';
import Assessment from '@/pages/Assessment';
import Jobs from '@/pages/Jobs';
import MyGigs from '@/pages/MyGigs';
import Messages from '@/pages/Messages';
import MyProfile from '@/pages/MyProfile';
import CompanyDashboard from '@/pages/CompanyDashboard';
import CompanyJobs from '@/pages/CompanyJobs';
import CompanyBrowseStudents from '@/pages/CompanyBrowseStudents';
import CompanyPayments from '@/pages/CompanyPayments';
import AdminDashboard from '@/pages/AdminDashboard';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup/student" element={<StudentSignup />} />
      <Route path="/signup/company" element={<CompanySignup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Student */}
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/learning" element={<Learning />} />
      <Route path="/assessment/:level" element={<Assessment />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/my-gigs" element={<MyGigs />} />
      <Route path="/my-profile" element={<MyProfile />} />

      {/* Shared */}
      <Route path="/messages" element={<Messages />} />

      {/* Company */}
      <Route path="/company" element={<CompanyDashboard />} />
      <Route path="/company/jobs" element={<CompanyJobs />} />
      <Route path="/company/browse-students" element={<CompanyBrowseStudents />} />
      <Route path="/company/payments" element={<CompanyPayments />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <SonnerToaster position="top-right" richColors />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App