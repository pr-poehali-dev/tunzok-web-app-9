import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SleepData {
  bedTime: string;
  wakeTime: string;
  duration: string;
  date: string;
}

interface SleepTrackerProps {
  isPlus: boolean;
}

export function SleepTracker({ isPlus }: SleepTrackerProps) {
  const [sleepData, setSleepData] = useState<SleepData | null>(() => {
    const saved = localStorage.getItem('tunzok_sleep');
    return saved ? JSON.parse(saved) : null;
  });
  const [bedTime, setBedTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');

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

  return (
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
  );
}
