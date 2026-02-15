import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AdminGrantPremium() {
  const [email, setEmail] = useState('qwerrpglushkov@yandex.ru');
  const [loading, setLoading] = useState(false);

  const grantPremium = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/dd1946bc-8316-45ea-922d-d4368e7ebd89', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'grant_premium',
          email: email,
          days: 365,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success(`Premium выдан для ${email} на 365 дней!`);
      } else {
        toast.error(data.error || 'Ошибка при выдаче premium');
      }
    } catch (error) {
      toast.error('Ошибка сети');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold">Admin: Grant Premium</h1>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email пользователя"
          className="bg-gray-900 border-gray-800"
        />
        <Button
          onClick={grantPremium}
          disabled={loading || !email}
          className="w-full"
        >
          {loading ? 'Обработка...' : 'Выдать Premium на 365 дней'}
        </Button>
      </div>
    </div>
  );
}
