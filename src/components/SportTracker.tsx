import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { t } from '@/lib/i18n';

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

export function SportTracker() {
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
      window.dispatchEvent(new Event('tunzok-data-updated'));
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
    window.dispatchEvent(new Event('tunzok-data-updated'));
    setExercises([]);
  };

  return (
    <Card className="transition-all hover:shadow-lg hover:scale-[1.01]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Dumbbell" className="h-5 w-5 text-primary" />
          {t('sportTitle')}
        </CardTitle>
        <CardDescription>{t('sportDesc')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Button
            variant={sportMode === 'walk' ? 'default' : 'outline'}
            onClick={() => setSportMode('walk')}
            className="flex-1"
          >
            <Icon name="Footprints" className="mr-2 h-4 w-4" />
            {t('walk')}
          </Button>
          <Button
            variant={sportMode === 'workout' ? 'default' : 'outline'}
            onClick={() => setSportMode('workout')}
            className="flex-1"
          >
            <Icon name="Dumbbell" className="mr-2 h-4 w-4" />
            {t('workout')}
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
                    placeholder={t('steps')}
                    className="w-32 text-center"
                    disabled={!isWalking}
                  />
                  <span className="text-muted-foreground">{t('stepsCount')}</span>
                </div>
                <div className="flex gap-2 justify-center">
                  {!isWalking ? (
                    <Button onClick={handleStartWalk} className="w-32">
                      <Icon name="Play" className="mr-2 h-4 w-4" />
                      {t('start')}
                    </Button>
                  ) : (
                    <Button onClick={handlePauseWalk} variant="outline" className="w-32">
                      <Icon name="Pause" className="mr-2 h-4 w-4" />
                      {t('pause')}
                    </Button>
                  )}
                  <Button 
                    onClick={handleFinishWalk} 
                    variant="secondary"
                    disabled={walkTimer === 0}
                    className="w-32"
                  >
                    <Icon name="Check" className="mr-2 h-4 w-4" />
                    {t('finish')}
                  </Button>
                </div>
              </div>
            </div>

            {walkHistory.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">{t('walkHistory')}</h4>
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
                        <div className="text-xs text-muted-foreground">{t('stepsCount')}</div>
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
                  placeholder={t('exercise')}
                  value={exerciseName}
                  onChange={(e) => setExerciseName(e.target.value)}
                  className="col-span-3"
                />
                <Input
                  type="number"
                  placeholder={t('sets')}
                  value={exerciseSets}
                  onChange={(e) => setExerciseSets(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder={t('reps')}
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
                <h4 className="font-semibold text-sm text-muted-foreground">{t('workout')}</h4>
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
                  {t('saveWorkout')}
                </Button>
              </div>
            )}

            {workoutHistory.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">{t('workoutHistory')}</h4>
                <div className="space-y-2">
                  {workoutHistory.slice(0, 3).map((workout, index) => (
                    <div key={index} className="p-3 bg-secondary rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-muted-foreground">{workout.date}</div>
                        <div className="text-xs text-muted-foreground">{workout.exercises.length} {t('exercises')}</div>
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
  );
}