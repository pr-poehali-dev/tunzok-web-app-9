import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const YOOKASSA_URL = 'https://functions.poehali.dev/dd1946bc-8316-45ea-922d-d4368e7ebd89';

interface SubscriptionButtonProps {
  userEmail: string;
  userName?: string;
  disabled?: boolean;
}

export function SubscriptionButton({ userEmail, userName, disabled }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(YOOKASSA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 279,
          user_name: userName || '',
          user_email: userEmail,
          user_phone: '',
          return_url: window.location.origin + '/?payment=success',
          description: 'Tunzok Premium - подписка на месяц',
          cart_items: [{
            id: 'premium-monthly',
            name: 'Tunzok Premium (1 месяц)',
            price: 279,
            quantity: 1
          }]
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка создания платежа');
      }

      if (data.confirmation_url) {
        window.location.href = data.confirmation_url;
      } else {
        throw new Error('Не получена ссылка для оплаты');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось создать платёж',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSubscribe}
      disabled={disabled || isLoading}
      className="w-full bg-gradient-to-r from-primary via-purple-500 to-cyan-500 hover:opacity-90 text-white font-semibold py-6 text-lg shadow-lg"
    >
      {isLoading ? (
        <>
          <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
          Подключаем оплату...
        </>
      ) : (
        <>
          <Icon name="CreditCard" className="mr-2 h-5 w-5" />
          Оплатить 279₽
        </>
      )}
    </Button>
  );
}
