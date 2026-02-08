import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
          Назад
        </Button>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">Политика конфиденциальности</h1>
          
          <p className="text-muted-foreground mb-6">
            Последнее обновление: 8 февраля 2026 года
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
            <p className="mb-4">
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных 
              пользователей сервиса Tunzok (далее — «Сервис»).
            </p>
            <p>
              Используя Сервис, вы соглашаетесь с условиями настоящей Политики конфиденциальности.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Какие данные мы собираем</h2>
            <p className="mb-4">Сервис собирает и обрабатывает следующие данные:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Данные о сне (время отхода ко сну, время пробуждения)</li>
              <li>Данные о физической активности (прогулки, тренировки)</li>
              <li>Личная информация в профиле (имя, рост, вес, возраст, заметки)</li>
            </ul>
            <p>
              <strong>Важно:</strong> Все данные хранятся локально в браузере пользователя (localStorage) 
              и не передаются на внешние серверы.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Как мы используем данные</h2>
            <p className="mb-4">Данные используются исключительно для:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Отслеживания показателей здоровья пользователя</li>
              <li>Предоставления статистики и аналитики</li>
              <li>Улучшения функциональности Сервиса</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Хранение данных</h2>
            <p className="mb-4">
              Все персональные данные хранятся локально в браузере пользователя. 
              Сервис не имеет доступа к вашим данным и не передает их третьим лицам.
            </p>
            <p>
              Вы можете удалить все данные в любой момент, очистив кэш браузера или 
              удалив данные через настройки браузера.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Безопасность данных</h2>
            <p>
              Мы применяем современные технологии для защиты данных пользователей. 
              Однако, так как данные хранятся локально в браузере, безопасность зависит 
              от настроек вашего устройства и браузера.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies и технологии отслеживания</h2>
            <p className="mb-4">
              Сервис использует localStorage для хранения данных пользователя в браузере. 
              Мы не используем сторонние cookies для отслеживания или рекламы.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Права пользователей</h2>
            <p className="mb-4">Вы имеете право:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Получать информацию о своих данных</li>
              <li>Изменять свои данные в любое время</li>
              <li>Удалять свои данные через настройки браузера</li>
              <li>Отказаться от использования Сервиса в любой момент</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Изменения в Политике</h2>
            <p>
              Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
              Обновления будут опубликованы на этой странице с указанием даты последнего изменения.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Медицинский дисклеймер</h2>
            <p>
              <strong>Важно:</strong> Tunzok не является медицинским сервисом и не предоставляет 
              медицинские консультации. Для получения медицинской помощи обратитесь к квалифицированному 
              специалисту.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Контакты</h2>
            <p className="mb-4">
              По всем вопросам, связанным с Политикой конфиденциальности, обращайтесь:
            </p>
            <p>
              Email: <a href="mailto:tunzok@bk.ru" className="text-primary hover:underline">tunzok@bk.ru</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
