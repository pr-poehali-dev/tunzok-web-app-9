import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface SleepData {
  bedTime: string;
  wakeTime: string;
  duration: string;
  date: string;
}

interface ProfileData {
  name: string;
  height: string;
  weight: string;
  age: string;
  note: string;
}

function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [sleepData, setSleepData] = useState<SleepData | null>(null);
  const [bedTime, setBedTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    height: '',
    weight: '',
    age: '',
    note: ''
  });
  const [isPlus] = useState(false);

  useEffect(() => {
    const savedSleep = localStorage.getItem('tunzok_sleep');
    if (savedSleep) {
      setSleepData(JSON.parse(savedSleep));
    }

    const savedProfile = localStorage.getItem('tunzok_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const calculateDuration = (bed: string, wake: string) => {
    if (!bed || !wake) return '';
    
    const [bedHour, bedMin] = bed.split(':').map(Number);
    const [wakeHour, wakeMin] = wake.split(':').map(Number);
    
    const bedMinutes = bedHour * 60 + bedMin;
    let wakeMinutes = wakeHour * 60 + wakeMin;
    
    if (wakeMinutes < bedMinutes) {
      wakeMinutes += 24 * 60;
    }
    
    const totalMinutes = wakeMinutes - bedMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}ч ${minutes}мин`;
  };

  const handleSaveSleep = () => {
    if (!bedTime || !wakeTime) return;
    
    const duration = calculateDuration(bedTime, wakeTime);
    const newSleep: SleepData = {
      bedTime,
      wakeTime,
      duration,
      date: new Date().toLocaleDateString('ru-RU')
    };
    
    setSleepData(newSleep);
    localStorage.setItem('tunzok_sleep', JSON.stringify(newSleep));
    setBedTime('');
    setWakeTime('');
  };

  const handleSaveProfile = () => {
    localStorage.setItem('tunzok_profile', JSON.stringify(profile));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Tunzok
          </h1>
          <p className="text-muted-foreground">
            Улучшение качества жизни: сон, спорт и личные показатели
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="home" className="transition-all">
              <Icon name="Home" className="mr-2 h-4 w-4" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="profile" className="transition-all">
              <Icon name="User" className="mr-2 h-4 w-4" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="news" className="transition-all">
              <Icon name="Newspaper" className="mr-2 h-4 w-4" />
              Новости
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-fade-in">
            <Card className="transition-all hover:shadow-lg hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Moon" className="h-5 w-5 text-primary" />
                  Сон
                </CardTitle>
                <CardDescription>Отслеживайте качество вашего сна</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedtime">Время отхода ко сну</Label>
                    <Input
                      id="bedtime"
                      type="time"
                      value={bedTime}
                      onChange={(e) => setBedTime(e.target.value)}
                      className="transition-all focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waketime">Время пробуждения</Label>
                    <Input
                      id="waketime"
                      type="time"
                      value={wakeTime}
                      onChange={(e) => setWakeTime(e.target.value)}
                      className="transition-all focus:scale-[1.02]"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSaveSleep} 
                  className="w-full transition-all hover:scale-[1.02]"
                  disabled={!bedTime || !wakeTime}
                >
                  Сохранить данные о сне
                </Button>

                {sleepData && (
                  <div className="p-4 bg-secondary rounded-lg space-y-2 animate-scale-in">
                    <h3 className="font-semibold text-sm text-muted-foreground">Последний сон</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Лёг спать</p>
                        <p className="font-semibold text-lg">{sleepData.bedTime}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Проснулся</p>
                        <p className="font-semibold text-lg">{sleepData.wakeTime}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Длительность</p>
                        <p className="font-semibold text-lg text-primary">{sleepData.duration}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">{sleepData.date}</p>
                  </div>
                )}

                <div className="relative mt-6">
                  <div className={`p-6 bg-secondary/50 rounded-lg border-2 border-dashed border-border ${!isPlus ? 'blur-sm' : ''}`}>
                    <div className="h-48 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Icon name="TrendingUp" className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">График аналитики сна</p>
                      </div>
                    </div>
                  </div>
                  {!isPlus && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-card/95 backdrop-blur-sm p-6 rounded-lg border border-primary/50 shadow-xl text-center space-y-3 animate-scale-in">
                        <Icon name="Lock" className="h-8 w-8 mx-auto text-primary" />
                        <h4 className="font-semibold text-lg">Аналитика за месяц</h4>
                        <p className="text-sm text-muted-foreground">
                          Доступно в <span className="text-primary font-semibold">Tunzok Plus</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Dumbbell" className="h-5 w-5 text-primary" />
                  Спорт
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-center justify-center text-muted-foreground">
                  <div className="text-center space-y-2">
                    <Icon name="Construction" className="h-10 w-10 mx-auto" />
                    <p>В разработке</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="UserCircle" className="h-5 w-5 text-primary" />
                  Мой профиль
                </CardTitle>
                <CardDescription>Персональная информация</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    placeholder="Ваше имя"
                    className="transition-all focus:scale-[1.01]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Рост (см)</Label>
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
                    <Label htmlFor="weight">Вес (кг)</Label>
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
                    <Label htmlFor="age">Возраст</Label>
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
                  <Label htmlFor="note">Заметка о себе</Label>
                  <Textarea
                    id="note"
                    value={profile.note}
                    onChange={(e) => setProfile({...profile, note: e.target.value})}
                    placeholder="Расскажите о себе..."
                    className="min-h-24 transition-all focus:scale-[1.01]"
                  />
                </div>

                <Button 
                  onClick={handleSaveProfile} 
                  className="w-full transition-all hover:scale-[1.02]"
                >
                  Сохранить профиль
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="animate-fade-in">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sparkles" className="h-5 w-5 text-primary" />
                  Новости
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  <div className="text-center space-y-2">
                    <Icon name="Construction" className="h-10 w-10 mx-auto" />
                    <p>В разработке</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground animate-fade-in">
          <p>
            Tunzok не является медицинским сервисом. Данные хранятся в браузере пользователя.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Index;