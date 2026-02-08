export type Language = 'ru' | 'en';

export const translations = {
  ru: {
    // Header
    appName: 'Tunzok',
    appDescription: 'Улучшение качества жизни: сон, спорт и личные показатели',
    
    // Tabs
    home: 'Главная',
    profile: 'Профиль',
    community: 'Сообщество',
    
    // Sleep Tracker
    sleepTracker: 'Трекер сна',
    sleepQuality: 'Качество сна',
    sleepDuration: 'Продолжительность',
    bedtime: 'Время сна',
    wakeTime: 'Время пробуждения',
    saveSleep: 'Сохранить',
    hours: 'ч',
    totalSleep: 'Всего сна',
    avgQuality: 'Средн. качество',
    excellent: 'Отлично',
    good: 'Хорошо',
    fair: 'Нормально',
    poor: 'Плохо',
    
    // Meditation Tracker
    meditation: 'Медитация',
    breathing: 'Дыхание',
    mindfulness: 'Осознанность',
    bodyScan: 'Сканирование тела',
    startSession: 'Начать сеанс',
    stopSession: 'Завершить',
    today: 'Сегодня',
    sessions: 'сеансов',
    total: 'Всего',
    minutes: 'минут',
    plusRequired: 'Медитация доступна только по подписке',
    tunzokPlus: 'Tunzok Plus',
    
    // Sport Tracker
    sportTracker: 'Трекер спорта',
    activityType: 'Тип активности',
    running: 'Бег',
    gym: 'Зал',
    yoga: 'Йога',
    swimming: 'Плавание',
    cycling: 'Велосипед',
    duration: 'Продолжительность (мин)',
    notes: 'Заметки',
    addActivity: 'Добавить активность',
    activities: 'активностей',
    
    // Profile
    profileTitle: 'Профиль',
    name: 'Имя',
    namePlaceholder: 'Введите имя',
    height: 'Рост (см)',
    weight: 'Вес (кг)',
    age: 'Возраст',
    noteAbout: 'Заметка о себе',
    noteAboutPlaceholder: 'Расскажите о себе...',
    language: 'Язык интерфейса',
    selectLanguage: 'Выберите язык',
    saveProfile: 'Сохранить профиль',
    achievements: 'Достижения',
    achievementsInDev: 'В разработке',
    achievementsDesc: 'Скоро здесь появятся ваши достижения и награды за регулярные тренировки, качественный сон и медитации',
    
    // Community
    communityTitle: 'Сообщество',
    communityDesc: 'Здесь будут советы, статьи и истории успеха других пользователей. Следите за обновлениями!',
    comingSoon: 'Скоро',
    
    // Footer
    disclaimer: 'Tunzok не является медицинским сервисом. Данные хранятся в браузере пользователя.',
    privacyPolicy: 'Политика конфиденциальности',
    terms: 'Пользовательское соглашение',
    
    // Subscription Notice
    subscriptionNoticeTitle: 'Важная информация о подписке',
    subscriptionNoticeText: 'Создание подписки — сложный процесс, требующий интеграции с платёжными системами. В ближайшее время подписки не будет. Все функции, отмеченные как "Tunzok Plus" (медитация, расширенная аналитика сна), в данный момент находятся в стадии разработки. Этот блок будет удалён после запуска подписки.',
  },
  en: {
    // Header
    appName: 'Tunzok',
    appDescription: 'Improving quality of life: sleep, sports and personal metrics',
    
    // Tabs
    home: 'Home',
    profile: 'Profile',
    community: 'Community',
    
    // Sleep Tracker
    sleepTracker: 'Sleep Tracker',
    sleepQuality: 'Sleep Quality',
    sleepDuration: 'Duration',
    bedtime: 'Bedtime',
    wakeTime: 'Wake Time',
    saveSleep: 'Save',
    hours: 'h',
    totalSleep: 'Total Sleep',
    avgQuality: 'Avg Quality',
    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    poor: 'Poor',
    
    // Meditation Tracker
    meditation: 'Meditation',
    breathing: 'Breathing',
    mindfulness: 'Mindfulness',
    bodyScan: 'Body Scan',
    startSession: 'Start Session',
    stopSession: 'Stop',
    today: 'Today',
    sessions: 'sessions',
    total: 'Total',
    minutes: 'minutes',
    plusRequired: 'Meditation available with subscription only',
    tunzokPlus: 'Tunzok Plus',
    
    // Sport Tracker
    sportTracker: 'Sport Tracker',
    activityType: 'Activity Type',
    running: 'Running',
    gym: 'Gym',
    yoga: 'Yoga',
    swimming: 'Swimming',
    cycling: 'Cycling',
    duration: 'Duration (min)',
    notes: 'Notes',
    addActivity: 'Add Activity',
    activities: 'activities',
    
    // Profile
    profileTitle: 'Profile',
    name: 'Name',
    namePlaceholder: 'Enter name',
    height: 'Height (cm)',
    weight: 'Weight (kg)',
    age: 'Age',
    noteAbout: 'Note about yourself',
    noteAboutPlaceholder: 'Tell about yourself...',
    language: 'Interface Language',
    selectLanguage: 'Select language',
    saveProfile: 'Save Profile',
    achievements: 'Achievements',
    achievementsInDev: 'In Development',
    achievementsDesc: 'Soon your achievements and rewards for regular workouts, quality sleep and meditations will appear here',
    
    // Community
    communityTitle: 'Community',
    communityDesc: 'Tips, articles and success stories from other users will be here. Stay tuned!',
    comingSoon: 'Coming Soon',
    
    // Footer
    disclaimer: 'Tunzok is not a medical service. Data is stored in user browser.',
    privacyPolicy: 'Privacy Policy',
    terms: 'Terms of Service',
    
    // Subscription Notice
    subscriptionNoticeTitle: 'Important Information About Subscription',
    subscriptionNoticeText: 'Creating a subscription is a complex process that requires integration with payment systems. There will be no subscription in the near future. All features marked as "Tunzok Plus" (meditation, advanced sleep analytics) are currently in development. This block will be removed after subscription launch.',
  }
};

export function getLanguage(): Language {
  const saved = localStorage.getItem('tunzok_profile');
  if (saved) {
    const profile = JSON.parse(saved);
    return profile.language || 'ru';
  }
  return 'ru';
}

export function t(key: keyof typeof translations.ru): string {
  const lang = getLanguage();
  return translations[lang][key];
}
