import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { t } from '@/lib/i18n';

interface Achievement {
  id: string;
  nameKey: keyof typeof import('@/lib/i18n').translations.ru;
  descKey: keyof typeof import('@/lib/i18n').translations.ru;
  icon: string;
  color: string;
  requirements: {
    sleeps?: number;
    meditationTypes?: number;
    walkMinutes?: number;
    workouts?: number;
  };
}

interface AchievementProgress {
  sleeps: number;
  meditationTypes: Set<string>;
  walkMinutes: number;
  workouts: number;
}

const achievements: Achievement[] = [
  {
    id: 'beginner',
    nameKey: 'achievementBeginnerName',
    descKey: 'achievementBeginnerDesc',
    icon: 'Sparkles',
    color: 'from-blue-400 to-cyan-500',
    requirements: {
      sleeps: 5,
      meditationTypes: 3,
      walkMinutes: 3.33,
      workouts: 1,
    },
  },
  {
    id: 'prestige',
    nameKey: 'achievementPrestigeName',
    descKey: 'achievementPrestigeDesc',
    icon: 'Crown',
    color: 'from-yellow-400 to-amber-500',
    requirements: {},
  },
];

export function AchievementsCard() {
  const [progress, setProgress] = useState<AchievementProgress>({
    sleeps: 0,
    meditationTypes: new Set(),
    walkMinutes: 0,
    workouts: 0,
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  const checkProgress = () => {
    const sleepData = localStorage.getItem('tunzok_sleep');
    const sleeps = sleepData ? JSON.parse(sleepData).length : 0;

    const meditationData = localStorage.getItem('tunzok_meditation');
    const meditationTypes = new Set<string>();
    if (meditationData) {
      JSON.parse(meditationData).forEach((session: {type: string}) => {
        meditationTypes.add(session.type);
      });
    }

    const walkData = localStorage.getItem('tunzok_walk_history');
    let totalWalkMinutes = 0;
    if (walkData) {
      const walks = JSON.parse(walkData);
      totalWalkMinutes = walks.reduce((acc: number, walk: {duration: number}) => acc + (walk.duration / 60), 0);
    }

    const workoutData = localStorage.getItem('tunzok_workout_history');
    const workouts = workoutData ? JSON.parse(workoutData).length : 0;

    const savedUnlocked = localStorage.getItem('tunzok_achievements');
    const unlocked = savedUnlocked ? new Set(JSON.parse(savedUnlocked)) : new Set();

    const currentProgress = {
      sleeps,
      meditationTypes,
      walkMinutes: totalWalkMinutes,
      workouts,
    };

    setProgress(currentProgress);
    setUnlockedAchievements(unlocked);

    console.log('Achievement Progress:', {
      sleeps,
      meditationTypes: [...meditationTypes],
      walkMinutes: totalWalkMinutes,
      workouts,
    });

    achievements.forEach(achievement => {
      const isUnlocked = isAchievementUnlocked(achievement, currentProgress);
      console.log(`Achievement "${achievement.id}":`, {
        isUnlocked,
        requirements: achievement.requirements,
        currentProgress,
      });
      
      if (!unlocked.has(achievement.id) && isUnlocked) {
        unlocked.add(achievement.id);
        localStorage.setItem('tunzok_achievements', JSON.stringify([...unlocked]));
        setUnlockedAchievements(new Set(unlocked));
        console.log(`🎉 Achievement "${achievement.id}" unlocked!`);
      }
    });
  };

  useEffect(() => {
    checkProgress();

    const handleStorageChange = () => {
      checkProgress();
    };

    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(() => {
      checkProgress();
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const isAchievementUnlocked = (achievement: Achievement, prog: AchievementProgress): boolean => {
    if (achievement.id === 'prestige') {
      const hasPremium = localStorage.getItem('tunzok_premium_subscription') === 'active';
      return hasPremium;
    }
    
    const req = achievement.requirements;
    return (
      (!req.sleeps || prog.sleeps >= req.sleeps) &&
      (!req.meditationTypes || prog.meditationTypes.size >= req.meditationTypes) &&
      (!req.walkMinutes || prog.walkMinutes >= req.walkMinutes) &&
      (!req.workouts || prog.workouts >= req.workouts)
    );
  };

  const getProgressPercentage = (achievement: Achievement): number => {
    const req = achievement.requirements;
    let completed = 0;
    let total = 0;

    if (req.sleeps) {
      total++;
      if (progress.sleeps >= req.sleeps) completed++;
    }
    if (req.meditationTypes) {
      total++;
      if (progress.meditationTypes.size >= req.meditationTypes) completed++;
    }
    if (req.walkMinutes) {
      total++;
      if (progress.walkMinutes >= req.walkMinutes) completed++;
    }
    if (req.workouts) {
      total++;
      if (progress.workouts >= req.workouts) completed++;
    }

    return total > 0 ? (completed / total) * 100 : 0;
  };

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Trophy" className="h-5 w-5 text-yellow-500" />
          {t('achievements')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map(achievement => {
          const isUnlocked = unlockedAchievements.has(achievement.id);
          const progressPercent = getProgressPercentage(achievement);
          const req = achievement.requirements;

          return (
            <div
              key={achievement.id}
              className={`relative rounded-xl border p-5 transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                  : 'bg-secondary/50 border-border hover:border-primary/30'
              }`}
            >
              {isUnlocked && (
                <div className="absolute top-3 right-3">
                  <Icon name="CheckCircle2" className="h-6 w-6 text-green-500" />
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center ${
                    !isUnlocked && 'grayscale opacity-60'
                  }`}
                >
                  <Icon name={achievement.icon} className="h-7 w-7 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{t(achievement.nameKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(achievement.descKey)}</p>
                </div>
              </div>

              {!isUnlocked && achievement.id !== 'prestige' && (
                <div className="space-y-3">
                  <Progress value={progressPercent} className="h-2" />
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {req.sleeps && (
                      <div className="flex items-center gap-1.5">
                        <Icon name="Moon" className="h-3.5 w-3.5 text-primary" />
                        <span className={progress.sleeps >= req.sleeps ? 'text-green-500 font-semibold' : 'text-muted-foreground'}>
                          {progress.sleeps}/{req.sleeps} {t('sleepDataCount')}
                        </span>
                      </div>
                    )}
                    {req.meditationTypes && (
                      <div className="flex items-center gap-1.5">
                        <Icon name="Sparkles" className="h-3.5 w-3.5 text-purple-500" />
                        <span className={progress.meditationTypes.size >= req.meditationTypes ? 'text-green-500 font-semibold' : 'text-muted-foreground'}>
                          {progress.meditationTypes.size}/{req.meditationTypes} {t('meditationTypesCount')}
                        </span>
                      </div>
                    )}
                    {req.walkMinutes && (
                      <div className="flex items-center gap-1.5">
                        <Icon name="Footprints" className="h-3.5 w-3.5 text-green-500" />
                        <span className={progress.walkMinutes >= req.walkMinutes ? 'text-green-500 font-semibold' : 'text-muted-foreground'}>
                          {Math.floor(progress.walkMinutes)}:{Math.floor((progress.walkMinutes % 1) * 60).toString().padStart(2, '0')}/{Math.floor(req.walkMinutes)}:{Math.floor((req.walkMinutes % 1) * 60).toString().padStart(2, '0')} {t('walkTime')}
                        </span>
                      </div>
                    )}
                    {req.workouts && (
                      <div className="flex items-center gap-1.5">
                        <Icon name="Dumbbell" className="h-3.5 w-3.5 text-orange-500" />
                        <span className={progress.workouts >= req.workouts ? 'text-green-500 font-semibold' : 'text-muted-foreground'}>
                          {progress.workouts}/{req.workouts} {t('workoutsCount')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isUnlocked && (
                <div className="mt-3 text-center">
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                    🎉 {t('achievementUnlocked')}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}