import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { SleepTracker } from '@/components/SleepTracker';
import { SportTracker } from '@/components/SportTracker';
import { ProfileCard } from '@/components/ProfileCard';
import { CommunityCard } from '@/components/CommunityCard';

function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPlus] = useState(false);

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
            <SleepTracker isPlus={isPlus} />
            <SportTracker />
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <ProfileCard />
          </TabsContent>

          <TabsContent value="news" className="animate-fade-in">
            <CommunityCard />
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
