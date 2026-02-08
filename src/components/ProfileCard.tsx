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

interface ProfileData {
  name: string;
  height: string;
  weight: string;
  age: string;
  note: string;
  language: string;
}

export function ProfileCard() {
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
    }
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem('tunzok_profile', JSON.stringify(profile));
    window.location.reload();
  };

  return (
    <div className="space-y-6">
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

        <Button 
          onClick={handleSaveProfile} 
          className="w-full transition-all hover:scale-[1.02]"
        >
          {t('saveProfile')}
        </Button>
      </CardContent>
    </Card>

    <AchievementsCard />
    </div>
  );
}