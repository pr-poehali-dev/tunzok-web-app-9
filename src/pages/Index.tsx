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

interface WorkoutExercise {
  name: string;
  sets: number;
  reps: number;
}

interface WorkoutData {
  exercises: WorkoutExercise[];
  date: string;
}

interface WalkData {
  duration: number;
  steps: number;
  date: string;
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

  // Sport states
  const [sportMode, setSportMode] = useState<'walk' | 'workout'>('walk');
  const [isWalking, setIsWalking] = useState(false);
  const [walkTimer, setWalkTimer] = useState(0);
  const [walkSteps, setWalkSteps] = useState(0);
  const [walkHistory, setWalkHistory] = useState<WalkData[]>([]);
  
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');
  const [exerciseReps, setExerciseReps] = useState('');
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutData[]>([]);

  useEffect(() => {
    const savedSleep = localStorage.getItem('tunzok_sleep');
    if (savedSleep) {
      setSleepData(JSON.parse(savedSleep));
    }

    const savedProfile = localStorage.getItem('tunzok_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    const savedWalkHistory = localStorage.getItem('tunzok_walk_history');
    if (savedWalkHistory) {
      setWalkHistory(JSON.parse(savedWalkHistory));
    }

    const savedWorkoutHistory = localStorage.getItem('tunzok_workout_history');
    if (savedWorkoutHistory) {
      setWorkoutHistory(JSON.parse(savedWorkoutHistory));
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWalking) {
      interval = setInterval(() => {
        setWalkTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWalking]);

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

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartWalk = () => {
    setIsWalking(true);
  };

  const handlePauseWalk = () => {
    setIsWalking(false);
  };

  const handleFinishWalk = () => {
    if (walkTimer > 0) {
      const newWalk: WalkData = {
        duration: walkTimer,
        steps: walkSteps,
        date: new Date().toLocaleDateString('ru-RU')
      };
      const updatedHistory = [newWalk, ...walkHistory].slice(0, 10);
      setWalkHistory(updatedHistory);
      localStorage.setItem('tunzok_walk_history', JSON.stringify(updatedHistory));
    }
    setIsWalking(false);
    setWalkTimer(0);
    setWalkSteps(0);
  };

  const handleAddExercise = () => {
    if (!exerciseName || !exerciseSets || !exerciseReps) return;
    const newExercise: WorkoutExercise = {
      name: exerciseName,
      sets: parseInt(exerciseSets),
      reps: parseInt(exerciseReps)
    };
    setExercises([...exercises, newExercise]);
    setExerciseName('');
    setExerciseSets('');
    setExerciseReps('');
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSaveWorkout = () => {
    if (exercises.length === 0) return;
    const newWorkout: WorkoutData = {
      exercises: exercises,
      date: new Date().toLocaleDateString('ru-RU')
    };
    const updatedHistory = [newWorkout, ...workoutHistory].slice(0, 10);
    setWorkoutHistory(updatedHistory);
    localStorage.setItem('tunzok_workout_history', JSON.stringify(updatedHistory));
    setExercises([]);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-2xl animate-spin-slow"></div>
      </div>
      
      <div className="container max-w-4xl mx-auto px-4 py-8 relative z-10">
        <div className="mb-8 animate-fade-in flex items-center gap-6">
          <img 
            src="https://cdn.poehali.dev/projects/9918c3bf-a618-46d3-90d5-c97b1c1be5e2/bucket/46f61be7-3133-4039-9532-6f0440915a3a.png" 
            alt="Tunzok Logo" 
            className="w-24 h-24 object-contain drop-shadow-2xl animate-float"
          />
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Tunzok
            </h1>
            <p className="text-muted-foreground">
              Улучшение качества жизни: сон, спорт и личные показатели
            </p>
          </div>
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
              <Icon name="Users" className="mr-2 h-4 w-4" />
              Сообщество
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
                <CardDescription>Отслеживайте прогулки и тренировки</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Button
                    variant={sportMode === 'walk' ? 'default' : 'outline'}
                    onClick={() => setSportMode('walk')}
                    className="flex-1"
                  >
                    <Icon name="Footprints" className="mr-2 h-4 w-4" />
                    Прогулка
                  </Button>
                  <Button
                    variant={sportMode === 'workout' ? 'default' : 'outline'}
                    onClick={() => setSportMode('workout')}
                    className="flex-1"
                  >
                    <Icon name="Dumbbell" className="mr-2 h-4 w-4" />
                    Тренировка
                  </Button>
                </div>

                {sportMode === 'walk' && (
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-lg border border-primary/20">
                      <div className="text-center space-y-4">
                        <div className="text-5xl font-bold text-primary">
                          {formatTime(walkTimer)}
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Icon name="Footprints" className="h-5 w-5 text-muted-foreground" />
                          <Input
                            type="number"
                            value={walkSteps}
                            onChange={(e) => setWalkSteps(parseInt(e.target.value) || 0)}
                            placeholder="Шаги"
                            className="w-32 text-center"
                            disabled={!isWalking}
                          />
                          <span className="text-muted-foreground">шагов</span>
                        </div>
                        <div className="flex gap-2 justify-center">
                          {!isWalking ? (
                            <Button onClick={handleStartWalk} className="w-32">
                              <Icon name="Play" className="mr-2 h-4 w-4" />
                              Старт
                            </Button>
                          ) : (
                            <Button onClick={handlePauseWalk} variant="outline" className="w-32">
                              <Icon name="Pause" className="mr-2 h-4 w-4" />
                              Пауза
                            </Button>
                          )}
                          <Button 
                            onClick={handleFinishWalk} 
                            variant="secondary"
                            disabled={walkTimer === 0}
                            className="w-32"
                          >
                            <Icon name="Check" className="mr-2 h-4 w-4" />
                            Завершить
                          </Button>
                        </div>
                      </div>
                    </div>

                    {walkHistory.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground">История прогулок</h4>
                        <div className="space-y-2">
                          {walkHistory.slice(0, 5).map((walk, index) => (
                            <div key={index} className="p-3 bg-secondary rounded-lg flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Icon name="Footprints" className="h-4 w-4 text-primary" />
                                <div>
                                  <div className="font-semibold">{formatTime(walk.duration)}</div>
                                  <div className="text-xs text-muted-foreground">{walk.date}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">{walk.steps}</div>
                                <div className="text-xs text-muted-foreground">шагов</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {sportMode === 'workout' && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        <Input
                          placeholder="Упражнение"
                          value={exerciseName}
                          onChange={(e) => setExerciseName(e.target.value)}
                          className="col-span-3"
                        />
                        <Input
                          type="number"
                          placeholder="Подходы"
                          value={exerciseSets}
                          onChange={(e) => setExerciseSets(e.target.value)}
                        />
                        <Input
                          type="number"
                          placeholder="Повторения"
                          value={exerciseReps}
                          onChange={(e) => setExerciseReps(e.target.value)}
                        />
                        <Button 
                          onClick={handleAddExercise}
                          disabled={!exerciseName || !exerciseSets || !exerciseReps}
                        >
                          <Icon name="Plus" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {exercises.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground">Текущая тренировка</h4>
                        <div className="space-y-2">
                          {exercises.map((exercise, index) => (
                            <div key={index} className="p-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg flex items-center justify-between border border-primary/20">
                              <div className="flex items-center gap-3">
                                <Icon name="Dumbbell" className="h-4 w-4 text-primary" />
                                <div>
                                  <div className="font-semibold">{exercise.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {exercise.sets} × {exercise.reps}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveExercise(index)}
                              >
                                <Icon name="X" className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button 
                          onClick={handleSaveWorkout} 
                          className="w-full"
                        >
                          <Icon name="Check" className="mr-2 h-4 w-4" />
                          Сохранить тренировку
                        </Button>
                      </div>
                    )}

                    {workoutHistory.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground">История тренировок</h4>
                        <div className="space-y-2">
                          {workoutHistory.slice(0, 3).map((workout, index) => (
                            <div key={index} className="p-3 bg-secondary rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-xs text-muted-foreground">{workout.date}</div>
                                <div className="text-xs text-muted-foreground">{workout.exercises.length} упражнений</div>
                              </div>
                              <div className="space-y-1">
                                {workout.exercises.map((exercise, i) => (
                                  <div key={i} className="text-sm">
                                    {exercise.name}: {exercise.sets} × {exercise.reps}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
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

          <TabsContent value="news" className="animate-fade-in space-y-6">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sparkles" className="h-5 w-5 text-primary" />
                  Новости
                </CardTitle>
                <CardDescription>Последние обновления Tunzok</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Rocket" className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">Сайт официально запущен!</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Мы рады сообщить, что Tunzok теперь доступен для всех пользователей. Начните отслеживать свой сон и улучшайте качество жизни уже сегодня!
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon name="Calendar" className="h-3 w-3" />
                          <span>8 февраля 2026</span>
                          <span>•</span>
                          <span>Tunzok Team</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Heart" className="h-5 w-5 text-primary" />
                  Наше сообщество
                </CardTitle>
                <CardDescription>Присоединяйтесь к нам в социальных сетях</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <a 
                    href="https://youtube.com/@tunzok?si=6kponAiAXSPmJMub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-all hover:scale-[1.02] group"
                  >
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Icon name="Youtube" className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">YouTube</h4>
                      <p className="text-sm text-muted-foreground">Видео о здоровом образе жизни</p>
                    </div>
                    <Icon name="ArrowRight" className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>

                  <a 
                    href="https://t.me/tunzok" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-all hover:scale-[1.02] group"
                  >
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Icon name="Send" className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">Telegram</h4>
                      <p className="text-sm text-muted-foreground">Новости и общение с командой</p>
                    </div>
                    <Icon name="ArrowRight" className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Icon name="Mail" className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">По вопросам обращаться</h4>
                      <a href="mailto:tunzok@bk.ru" className="text-sm text-primary hover:underline">
                        tunzok@bk.ru
                      </a>
                    </div>
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