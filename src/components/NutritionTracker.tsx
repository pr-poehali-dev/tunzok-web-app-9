import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface MealData {
  name: string;
  calories: number;
  date: string;
  time: string;
}

export function NutritionTracker() {
  const [meals, setMeals] = useState<MealData[]>([]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const dailyGoal = 2000;

  useEffect(() => {
    const saved = localStorage.getItem('tunzok_nutrition');
    if (saved) {
      setMeals(JSON.parse(saved));
    }
  }, []);

  const handleAddMeal = () => {
    if (!mealName || !calories) return;

    const newMeal: MealData = {
      name: mealName,
      calories: Number(calories),
      date: new Date().toLocaleDateString('ru-RU'),
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMeals = [newMeal, ...meals].slice(0, 20);
    setMeals(updatedMeals);
    localStorage.setItem('tunzok_nutrition', JSON.stringify(updatedMeals));
    window.dispatchEvent(new Event('tunzok-data-updated'));
    setMealName('');
    setCalories('');
  };

  const todayMeals = meals.filter(m => m.date === new Date().toLocaleDateString('ru-RU'));
  const todayCalories = todayMeals.reduce((sum, m) => sum + m.calories, 0);
  const progress = Math.min((todayCalories / dailyGoal) * 100, 100);

  return (
    <Card className="transition-all hover:shadow-lg hover:scale-[1.01]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Apple" className="h-5 w-5 text-green-500" />
          Здоровое питание
        </CardTitle>
        <CardDescription>Отслеживайте калории и питание</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Калории сегодня</span>
            <span className="text-2xl font-bold text-green-500">{todayCalories} / {dailyGoal}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {todayCalories < dailyGoal ? `Осталось ${dailyGoal - todayCalories} ккал` : 'Цель достигнута! 🎉'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="meal-name">Название блюда</Label>
            <Input
              id="meal-name"
              type="text"
              placeholder="Овсянка с ягодами"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="transition-all focus:scale-[1.02]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="calories">Калории (ккал)</Label>
            <Input
              id="calories"
              type="number"
              placeholder="350"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="transition-all focus:scale-[1.02]"
            />
          </div>
        </div>

        <Button 
          onClick={handleAddMeal} 
          className="w-full transition-all hover:scale-[1.02]"
          disabled={!mealName || !calories}
        >
          <Icon name="Plus" className="mr-2 h-4 w-4" />
          Добавить приём пищи
        </Button>

        {todayMeals.length > 0 && (
          <div className="p-4 bg-secondary rounded-lg space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">Сегодня съедено</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {todayMeals.map((meal, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-card rounded border border-border">
                  <div className="flex items-center gap-2">
                    <Icon name="Utensils" className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">{meal.name}</p>
                      <p className="text-xs text-muted-foreground">{meal.time}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-500">{meal.calories} ккал</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
