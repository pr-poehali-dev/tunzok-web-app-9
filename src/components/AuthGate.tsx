import { useState } from 'react';
import { useAuth, User } from './extensions/auth-email/useAuth';
import LoginForm from './extensions/auth-email/LoginForm';
import RegisterForm from './extensions/auth-email/RegisterForm';

const AUTH_URL = 'https://functions.poehali.dev/75ed3b02-b0e8-4393-87f3-d0daa20914f5';

interface AuthGateProps {
  children: (user: User, logout: () => void) => React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const [showRegister, setShowRegister] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const auth = useAuth({
    apiUrls: {
      login: `${AUTH_URL}?action=login`,
      register: `${AUTH_URL}?action=register`,
      verifyEmail: `${AUTH_URL}?action=verify-email`,
      refresh: `${AUTH_URL}?action=refresh`,
      logout: `${AUTH_URL}?action=logout`,
      resetPassword: `${AUTH_URL}?action=reset-password`,
    },
  });

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (auth.isAuthenticated && auth.user) {
    return <>{children(auth.user, auth.logout)}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-md">
        {showRegister ? (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Регистрация</h1>
              <p className="text-muted-foreground">Создайте аккаунт для продолжения</p>
            </div>
            <RegisterForm
              onRegister={auth.register}
              onVerifyEmail={auth.verifyEmail}
              error={auth.error}
            />
            <div className="text-center">
              <button
                onClick={() => setShowRegister(false)}
                className="text-sm text-primary hover:underline"
              >
                Уже есть аккаунт? Войти
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Вход в аккаунт</h1>
              <p className="text-muted-foreground">Войдите для продолжения</p>
            </div>
            <LoginForm
              onLogin={auth.login}
              onResetPassword={auth.requestPasswordReset}
              error={auth.error}
              successMessage={loginSuccess ? 'Добро пожаловать!' : undefined}
            />
            <div className="text-center">
              <button
                onClick={() => setShowRegister(true)}
                className="text-sm text-primary hover:underline"
              >
                Нет аккаунта? Зарегистрироваться
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}