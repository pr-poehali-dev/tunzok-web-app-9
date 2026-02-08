import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export function CommunityCard() {
  return (
    <div className="animate-fade-in space-y-6">
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
    </div>
  );
}
