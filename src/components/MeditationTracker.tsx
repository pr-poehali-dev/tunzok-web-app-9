import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { t } from '@/lib/i18n';

interface MeditationSession {
  date: string;
  duration: number;
  type: string;
}

interface MeditationTrackerProps {
  isPlus: boolean;
}

export function MeditationTracker() {
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedType, setSelectedType] = useState('breathing');
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [phaseTimer, setPhaseTimer] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const meditationTypes: Array<{id: string; nameKey: keyof typeof import('@/lib/i18n').translations.ru; icon: string}> = [
    { id: 'breathing', nameKey: 'breathing', icon: 'Wind' },
    { id: 'mindfulness', nameKey: 'mindfulness', icon: 'Brain' },
    { id: 'body-scan', nameKey: 'bodyScan', icon: 'Scan' },
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

  useEffect(() => {
    if (!isActive || selectedType !== 'breathing') return;

    const phases: Array<{phase: 'inhale' | 'hold' | 'exhale' | 'rest'; duration: number}> = [
      { phase: 'inhale', duration: 4 },
      { phase: 'hold', duration: 7 },
      { phase: 'exhale', duration: 8 },
      { phase: 'rest', duration: 2 },
    ];

    let currentPhaseIndex = 0;
    let timer = 0;

    const interval = setInterval(() => {
      timer++;
      setPhaseTimer(timer);

      if (timer >= phases[currentPhaseIndex].duration) {
        playSound();
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        setBreathPhase(phases[currentPhaseIndex].phase);
        timer = 0;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, selectedType]);

  const playSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKvi7q1aFgpDmuDywmweBTSJ0vPVgywEI3fH8N+RQQoUXrTp66lWFApGnt/zvmwhBTGH0fPTgjQGHm7A7+OZSA0PVKvi7q1aFgpDmuDywmweBTSJ0vPVhCwEI3fH8N+RQgoTXrTp66lWFApGnt/zvmwhBTGH0fPTgjQGHm7A7+OZSA0PVKvi7q1aFgpDmuDywmweBTSJ0vPVhCwEI3fH8N+RQgoTXrTp66lWFApGnt/zvmwhBTGH0fPTgjQGHm7A7+OZSA0PVKvi7q1aFgpDmuDywmweBTSJ0vPVhCwEI3fH8N+RQgoTXrTp66lWFApGnt/zvmwhBTGH0fPTgjQGHm7A7+OZSA0PVKvi7q1aFgpDmuDywmweBTSJ0vPVhCwEI3fH8N+RQgoTXrTp66lWFApGnt/zvmwhBTGH0fPTgjQGHm7A7+OZSA0PVKvi7q1aFgpDmuDywmweBTSJ0vPVhCwEI3fH8N+RQgoTXrTp66lWFApGnt/zvmwhBTGH0fPTgjQGHm7A7+OZSA0PVKvi7q1aFgo=');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const startSession = () => {
    setIsActive(true);
    setSeconds(0);
    setBreathPhase('inhale');
    setPhaseTimer(0);
    playSound();
  };

  const stopSession = () => {
    setIsActive(false);
    playSound();
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



  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Sparkles" className="h-5 w-5 text-purple-500" />
          {t('meditation')}
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
              {t(type.nameKey)}
            </Button>
          ))}
        </div>

        <div className="text-center py-8 relative">
          {isActive && selectedType === 'breathing' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className={`text-4xl font-bold transition-all duration-1000 ${
                  breathPhase === 'inhale' ? 'text-blue-500 scale-110' :
                  breathPhase === 'hold' ? 'text-purple-500 scale-100' :
                  breathPhase === 'exhale' ? 'text-green-500 scale-90' :
                  'text-gray-400 scale-95'
                }`}
              >
                {breathPhase === 'inhale' && '🌬️ ' + t('inhale')}
                {breathPhase === 'hold' && '⏸️ ' + t('hold')}
                {breathPhase === 'exhale' && '💨 ' + t('exhale')}
                {breathPhase === 'rest' && '✨ ' + t('rest')}
              </div>
            </div>
          )}

          {isActive && selectedType === 'mindfulness' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl animate-pulse text-purple-500">
                🧘 {t('focusNow')}
              </div>
            </div>
          )}

          {isActive && selectedType === 'body-scan' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl animate-pulse text-blue-500">
                🌊 {t('relaxBody')}
              </div>
            </div>
          )}

          <div className={`text-6xl font-bold mb-4 transition-all ${
            isActive ? 'text-muted-foreground opacity-50' : 'text-primary'
          }`}>
            {formatTime(seconds)}
          </div>
          
          {!isActive ? (
            <Button 
              onClick={startSession}
              className="w-full transition-all hover:scale-[1.02]"
            >
              <Icon name="Play" className="mr-2 h-4 w-4" />
              {t('startSession')}
            </Button>
          ) : (
            <Button 
              onClick={stopSession}
              variant="destructive"
              className="w-full transition-all hover:scale-[1.02]"
            >
              <Icon name="Square" className="mr-2 h-4 w-4" />
              {t('stopSession')}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">{t('today')}</p>
            <p className="text-2xl font-bold">{todaySessions.length}</p>
            <p className="text-xs text-muted-foreground">{t('sessions')}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">{t('total')}</p>
            <p className="text-2xl font-bold">{Math.floor(totalTime / 60)}</p>
            <p className="text-xs text-muted-foreground">{t('minutes')}</p>
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
                  <span>{t(meditationTypes.find(mt => mt.id === session.type)?.nameKey || 'breathing')}</span>
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