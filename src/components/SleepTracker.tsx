import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { t } from '@/lib/i18n';

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
  const [sleepHistory, setSleepHistory] = useState<SleepData[]>([]);
  const [bedTime, setBedTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tunzok_sleep');
    if (saved) {
      const data = JSON.parse(saved);
      setSleepHistory(Array.isArray(data) ? data : [data]);
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
    
    const updatedHistory = [newSleep, ...sleepHistory].slice(0, 10);
    setSleepHistory(updatedHistory);
    localStorage.setItem('tunzok_sleep', JSON.stringify(updatedHistory));
    window.dispatchEvent(new Event('tunzok-data-updated'));
    setBedTime('');
    setWakeTime('');
  };

  return (
    <Card className="transition-all hover:shadow-lg hover:scale-[1.01]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Moon" className="h-5 w-5 text-primary" />
          {t('sleepTitle')}
        </CardTitle>
        <CardDescription>{t('sleepDesc')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedtime">{t('bedtimeLabel')}</Label>
            <Input
              id="bedtime"
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="transition-all focus:scale-[1.02]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="waketime">{t('wakeTimeLabel')}</Label>
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
          {t('saveSleepData')}
        </Button>

        {sleepHistory.length > 0 && (
          <div className="p-4 bg-secondary rounded-lg space-y-2 animate-scale-in">
            <h3 className="font-semibold text-sm text-muted-foreground">{t('lastSleep')}</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">{t('wentToBed')}</p>
                <p className="font-semibold text-lg">{sleepHistory[0].bedTime}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('wokeUp')}</p>
                <p className="font-semibold text-lg">{sleepHistory[0].wakeTime}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t('sleepDurationLabel')}</p>
                <p className="font-semibold text-lg text-primary">{sleepHistory[0].duration}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <p className="text-xs text-muted-foreground">{sleepHistory[0].date}</p>
              {sleepHistory.length > 1 && (
                <p className="text-xs font-semibold text-primary">
                  {t('totalRecords')}: {sleepHistory.length}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="relative mt-6">
          <div className={`p-6 bg-secondary/50 rounded-lg border-2 border-dashed border-border ${!isPlus ? 'blur-sm' : ''}`}>
            <div className="h-48 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Icon name="TrendingUp" className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{t('sleepAnalyticsChart')}</p>
              </div>
            </div>
          </div>
          {!isPlus && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-card/95 backdrop-blur-sm p-6 rounded-lg border border-primary/50 shadow-xl text-center space-y-3 animate-scale-in">
                <Icon name="Lock" className="h-8 w-8 mx-auto text-primary" />
                <h4 className="font-semibold text-lg">{t('monthlyAnalytics')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('availableIn')} <span className="text-primary font-semibold">{t('tunzokPremium')}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}