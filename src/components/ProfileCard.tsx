import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { t } from '@/lib/i18n';
import { AchievementsCard } from './AchievementsCard';
import type { User } from './extensions/auth-email/useAuth';

interface ProfileData {
  name: string;
  height: string;
  weight: string;
  age: string;
  note: string;
  language: string;
}

interface ProfileCardProps {
  user?: User;
  onLogout?: () => void;
}

export function ProfileCard({ user, onLogout }: ProfileCardProps) {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    height: '',
    weight: '',
    age: '',
    note: '',
    language: 'ru'
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('tunzok_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else if (user) {
      setProfile(prev => ({ ...prev, name: user.name || user.email }));
    }
  }, [user]);

  const handleSaveProfile = () => {
    localStorage.setItem('tunzok_profile', JSON.stringify(profile));
    window.location.reload();
  };

  return (
    <div className="space-y-6">
    {user && (
      <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {(user.name || user.email)[0].toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold">{user.name || 'Пользователь'}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )}
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="User" className="h-5 w-5 text-primary" />
          {t('profileTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('name')}</Label>
          <Input
            id="name"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            placeholder={t('namePlaceholder')}
            className="transition-all focus:scale-[1.01]"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">{t('height')}</Label>
            <Input
              id="height"
              type="number"
              value={profile.height}
              onChange={(e) => setProfile({...profile, height: e.target.value})}
              placeholder="170"
              className="transition-all focus:scale-[1.01]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">{t('weight')}</Label>
            <Input
              id="weight"
              type="number"
              value={profile.weight}
              onChange={(e) => setProfile({...profile, weight: e.target.value})}
              placeholder="70"
              className="transition-all focus:scale-[1.01]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">{t('age')}</Label>
            <Input
              id="age"
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({...profile, age: e.target.value})}
              placeholder="25"
              className="transition-all focus:scale-[1.01]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">{t('noteAbout')}</Label>
          <Textarea
            id="note"
            value={profile.note}
            onChange={(e) => setProfile({...profile, note: e.target.value})}
            placeholder={t('noteAboutPlaceholder')}
            className="min-h-24 transition-all focus:scale-[1.01]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">{t('language')}</Label>
          <Select value={profile.language} onValueChange={(value) => setProfile({...profile, language: value})}>
            <SelectTrigger className="transition-all focus:scale-[1.01]">
              <SelectValue placeholder={t('selectLanguage')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ru">🇷🇺 Русский</SelectItem>
              <SelectItem value="en">🇬🇧 English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={handleSaveProfile} 
            className="flex-1 transition-all hover:scale-[1.02]"
          >
            {t('saveProfile')}
          </Button>
          {user && onLogout && (
            <Button 
              onClick={onLogout}
              variant="outline"
              className="transition-all hover:scale-[1.02]"
            >
              <Icon name="LogOut" className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>

    <AchievementsCard />
    </div>
  );
}