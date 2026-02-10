import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { t } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/components/extensions/auth-email/useAuth';

interface SettingsProps {
  user?: User;
  onDeleteAccount?: () => Promise<boolean>;
}

export function Settings({ user, onDeleteAccount }: SettingsProps) {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const savedProfile = localStorage.getItem('tunzok_profile');
  const profile = savedProfile ? JSON.parse(savedProfile) : { language: 'ru' };
  const [language, setLanguage] = useState(profile.language || 'ru');
  const [theme] = useState('system');

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    const updatedProfile = { ...profile, language: newLanguage };
    localStorage.setItem('tunzok_profile', JSON.stringify(updatedProfile));
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
          {t('home')}
        </Button>

        <h1 className="text-4xl font-bold mb-8">Настройки</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Globe" className="h-5 w-5 text-primary" />
                {t('language')}
              </CardTitle>
              <CardDescription>
                Выберите язык интерфейса приложения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="language">{t('selectLanguage')}</Label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder={t('selectLanguage')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                    <SelectItem value="en">🇬🇧 English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Moon" className="h-5 w-5 text-primary" />
                Тема оформления
              </CardTitle>
              <CardDescription>
                Настройка внешнего вида приложения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="theme">Выберите тему</Label>
                <Select value={theme} disabled>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Выберите тему" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Светлая</SelectItem>
                    <SelectItem value="dark">Тёмная</SelectItem>
                    <SelectItem value="system">Системная</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  <Icon name="Wrench" className="h-4 w-4 inline mr-1" />
                  В разработке
                </p>
              </div>
            </CardContent>
          </Card>

          {user && onDeleteAccount && (
            <>
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <Icon name="AlertTriangle" className="h-5 w-5" />
                    Опасная зона
                  </CardTitle>
                  <CardDescription>
                    Необратимые действия с вашим аккаунтом
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Удаление аккаунта приведёт к безвозвратному удалению всех ваших данных, включая историю сна, медитаций и тренировок.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                    className="w-full"
                  >
                    <Icon name="Trash2" className="mr-2 h-4 w-4" />
                    Удалить аккаунт
                  </Button>
                </CardContent>
              </Card>

              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Вы уверены?</DialogTitle>
                    <DialogDescription>
                      Это действие нельзя отменить. Все ваши данные будут безвозвратно удалены:
                      <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
                        <li>История сна</li>
                        <li>Записи медитаций</li>
                        <li>Тренировки и прогулки</li>
                        <li>Достижения</li>
                        <li>Учётная запись</li>
                      </ul>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteDialog(false)}
                      disabled={isDeleting}
                    >
                      Отмена
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        setIsDeleting(true);
                        const success = await onDeleteAccount();
                        if (success) {
                          localStorage.clear();
                          window.location.reload();
                        }
                        setIsDeleting(false);
                      }}
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Удаление...' : 'Удалить навсегда'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
