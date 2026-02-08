import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MeditationSession {
  date: string;
  duration: number;
  type: string;
}

interface MeditationTrackerProps {
  isPlus: boolean;
}

export function MeditationTracker({ isPlus }: MeditationTrackerProps) {
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedType, setSelectedType] = useState('breathing');

  const meditationTypes: Array<{id: string; name: string; icon: string}> = [
    { id: 'breathing', name: 'Дыхание', icon: 'Wind' },
    { id: 'mindfulness', name: 'Осознанность', icon: 'Brain' },
    { id: 'body-scan', name: 'Сканирование тела', icon: 'Scan' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('tunzok_meditation');
    if (saved) {
      setSessions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const startSession = () => {
    if (!isPlus) return;
    setIsActive(true);
    setSeconds(0);
  };

  const stopSession = () => {
    setIsActive(false);
    if (seconds > 0) {
      const newSession: MeditationSession = {
        date: new Date().toISOString(),
        duration: seconds,
        type: selectedType
      };
      const updated = [newSession, ...sessions];
      setSessions(updated);
      localStorage.setItem('tunzok_meditation', JSON.stringify(updated));
      setSeconds(0);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const totalTime = sessions.reduce((acc, s) => acc + s.duration, 0);
  const todaySessions = sessions.filter(s => 
    new Date(s.date).toDateString() === new Date().toDateString()
  );

  if (!isPlus) {
    return (
      <Card className="transition-all hover:shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-sm z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center p-6 bg-card/90 backdrop-blur rounded-lg border-2 border-primary/20">
            <Icon name="Lock" className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Tunzok Plus</h3>
            <p className="text-sm text-muted-foreground">
              Медитация доступна только по подписке
            </p>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 opacity-30">
            <Icon name="Sparkles" className="h-5 w-5 text-purple-500" />
            Медитация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 opacity-30 blur-sm select-none pointer-events-none">
          <div className="text-center py-8">
            <div className="text-6xl font-bold text-primary mb-4">00:00</div>
            <Button disabled className="w-full">
              Начать сеанс
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Sparkles" className="h-5 w-5 text-purple-500" />
          Медитация
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          {meditationTypes.map(type => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType(type.id)}
              disabled={isActive}
              className="transition-all"
            >
              <Icon name={type.icon} className="h-4 w-4 mr-1" />
              {type.name}
            </Button>
          ))}
        </div>

        <div className="text-center py-8">
          <div className="text-6xl font-bold text-primary mb-4 transition-all">
            {formatTime(seconds)}
          </div>
          
          {!isActive ? (
            <Button 
              onClick={startSession}
              className="w-full transition-all hover:scale-[1.02]"
            >
              <Icon name="Play" className="mr-2 h-4 w-4" />
              Начать сеанс
            </Button>
          ) : (
            <Button 
              onClick={stopSession}
              variant="destructive"
              className="w-full transition-all hover:scale-[1.02]"
            >
              <Icon name="Square" className="mr-2 h-4 w-4" />
              Завершить
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Сегодня</p>
            <p className="text-2xl font-bold">{todaySessions.length}</p>
            <p className="text-xs text-muted-foreground">сеансов</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Всего</p>
            <p className="text-2xl font-bold">{Math.floor(totalTime / 60)}</p>
            <p className="text-xs text-muted-foreground">минут</p>
          </div>
        </div>

        {sessions.length > 0 && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {sessions.slice(0, 5).map((session, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg text-sm"
              >
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle2" className="h-4 w-4 text-green-500" />
                  <span>{meditationTypes.find(t => t.id === session.type)?.name}</span>
                </div>
                <div className="text-muted-foreground">
                  {formatTime(session.duration)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}