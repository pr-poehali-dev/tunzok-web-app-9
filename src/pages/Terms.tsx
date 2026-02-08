import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function Terms() {
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
          <h1 className="text-4xl font-bold mb-8">Пользовательское соглашение (Оферта)</h1>
          
          <p className="text-muted-foreground mb-6">
            Последнее обновление: 8 февраля 2026 года
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Общие условия</h2>
            <p className="mb-4">
              Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между 
              пользователями и сервисом Tunzok (далее — «Сервис»).
            </p>
            <p>
              Начиная использовать Сервис, вы принимаете условия настоящего Соглашения в полном объеме.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Описание Сервиса</h2>
            <p className="mb-4">
              Tunzok — это веб-приложение для отслеживания показателей здоровья, включающее:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Мониторинг качества сна</li>
              <li>Отслеживание физической активности (прогулки, тренировки)</li>
              <li>Ведение личного профиля со статистикой</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Условия использования</h2>
            <p className="mb-4">Пользователь обязуется:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Использовать Сервис исключительно в законных целях</li>
              <li>Не пытаться нарушить безопасность Сервиса</li>
              <li>Не использовать автоматизированные средства для доступа к Сервису</li>
              <li>Соблюдать условия настоящего Соглашения</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Права и обязанности Сервиса</h2>
            <p className="mb-4">Сервис имеет право:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Изменять функциональность Сервиса без предварительного уведомления</li>
              <li>Приостанавливать работу Сервиса для технического обслуживания</li>
              <li>Изменять условия настоящего Соглашения</li>
            </ul>
            <p className="mb-4">Сервис обязуется:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Обеспечивать работоспособность Сервиса в разумных пределах</li>
              <li>Соблюдать конфиденциальность данных пользователей</li>
              <li>Своевременно информировать о существенных изменениях</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Ограничение ответственности</h2>
            <p className="mb-4">
              Сервис предоставляется «как есть» без каких-либо гарантий. 
              Администрация не несет ответственности за:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Любые убытки, связанные с использованием или невозможностью использования Сервиса</li>
              <li>Потерю данных из-за технических сбоев или действий пользователя</li>
              <li>Решения, принятые пользователем на основе данных из Сервиса</li>
              <li>Медицинские последствия, связанные с использованием Сервиса</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Медицинский дисклеймер</h2>
            <p className="mb-4">
              <strong>Важно:</strong> Tunzok не является медицинским устройством или сервисом 
              и не предназначен для диагностики, лечения или профилактики каких-либо заболеваний.
            </p>
            <p className="mb-4">
              Данные, предоставляемые Сервисом, носят исключительно информационный характер 
              и не заменяют консультацию квалифицированного медицинского специалista.
            </p>
            <p>
              При наличии проблем со здоровьем обратитесь к врачу.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Интеллектуальная собственность</h2>
            <p>
              Все права на Сервис, включая его дизайн, код и контент, принадлежат Tunzok Team. 
              Использование материалов Сервиса без письменного разрешения запрещено.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Бесплатность использования</h2>
            <p className="mb-4">
              Базовый функционал Сервиса предоставляется бесплатно. В будущем могут быть 
              добавлены дополнительные платные функции (Tunzok Plus).
            </p>
            <p>
              Условия платных функций будут опубликованы отдельно.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Прекращение использования</h2>
            <p>
              Пользователь может прекратить использование Сервиса в любой момент, 
              удалив данные из браузера. Администрация может прекратить предоставление 
              доступа к Сервису без объяснения причин.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Изменения в Соглашении</h2>
            <p>
              Администрация оставляет за собой право изменять условия настоящего Соглашения. 
              Изменения вступают в силу с момента публикации новой версии на данной странице.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Применимое право</h2>
            <p>
              К настоящему Соглашению применяется законодательство Российской Федерации. 
              Все споры разрешаются в соответствии с действующим законодательством.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Контакты</h2>
            <p className="mb-4">
              По всем вопросам, связанным с настоящим Соглашением, обращайтесь:
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

export default Terms;
