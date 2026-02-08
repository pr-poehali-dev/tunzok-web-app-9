import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { SleepTracker } from '@/components/SleepTracker';
import { SportTracker } from '@/components/SportTracker';
import { MeditationTracker } from '@/components/MeditationTracker';
import { ProfileCard } from '@/components/ProfileCard';
import { CommunityCard } from '@/components/CommunityCard';
import { t } from '@/lib/i18n';

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
              {t('appName')}
            </h1>
            <p className="text-muted-foreground">
              {t('appDescription')}
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="home" className="transition-all">
              <Icon name="Home" className="mr-2 h-4 w-4" />
              {t('home')}
            </TabsTrigger>
            <TabsTrigger value="profile" className="transition-all">
              <Icon name="User" className="mr-2 h-4 w-4" />
              {t('profile')}
            </TabsTrigger>
            <TabsTrigger value="news" className="transition-all">
              <Icon name="Users" className="mr-2 h-4 w-4" />
              {t('community')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-fade-in">
            <SleepTracker isPlus={isPlus} />
            <MeditationTracker />
            <SportTracker />
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <ProfileCard />
          </TabsContent>

          <TabsContent value="news" className="animate-fade-in">
            <CommunityCard />
          </TabsContent>
        </Tabs>

        <div className="mt-12 p-6 bg-amber-500/10 border border-amber-500/20 rounded-lg text-center animate-fade-in">
          <Icon name="Info" className="h-6 w-6 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2 text-amber-600 dark:text-amber-400">
            {t('subscriptionNoticeTitle')}
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t('subscriptionNoticeText')}
          </p>
        </div>

        <footer className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground animate-fade-in">
          <p className="mb-3">
            {t('disclaimer')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="/privacy" 
              className="hover:text-primary transition-colors underline"
            >
              {t('privacyPolicy')}
            </a>
            <span>•</span>
            <a 
              href="/terms" 
              className="hover:text-primary transition-colors underline"
            >
              {t('terms')}
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Index;