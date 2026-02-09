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
    tunzokPremium: 'Tunzok Premium',
    
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
    subscriptionNoticeText: 'Создание подписки — сложный процесс, требующий интеграции с платёжными системами. В ближайшее время подписки не будет. Функция расширенной аналитики сна, отмеченная как "Tunzok Premium", в данный момент находится в стадии разработки. Этот блок будет удалён после запуска подписки.',
    
    // Sleep Component
    sleepTitle: 'Сон',
    sleepDesc: 'Отслеживайте качество вашего сна',
    bedtimeLabel: 'Время отхода ко сну',
    wakeTimeLabel: 'Время пробуждения',
    saveSleepData: 'Сохранить данные о сне',
    lastSleep: 'Последний сон',
    wentToBed: 'Лёг спать',
    wokeUp: 'Проснулся',
    sleepDurationLabel: 'Длительность',
    monthlyAnalytics: 'Аналитика за месяц',
    availableIn: 'Доступно в',
    sleepAnalyticsChart: 'График аналитики сна',
    
    // Sport Component
    sportTitle: 'Спорт',
    sportDesc: 'Отслеживайте прогулки и тренировки',
    walk: 'Прогулка',
    workout: 'Тренировка',
    steps: 'Шаги',
    stepsCount: 'шагов',
    start: 'Старт',
    pause: 'Пауза',
    finish: 'Завершить',
    walkHistory: 'История прогулок',
    exercise: 'Упражнение',
    sets: 'Подходы',
    reps: 'Повторения',
    add: 'Добавить',
    saveWorkout: 'Сохранить тренировку',
    workoutHistory: 'История тренировок',
    exercises: 'упражнений',
    inhale: 'Вдох',
    hold: 'Задержка',
    exhale: 'Выдох',
    rest: 'Отдых',
    focusNow: 'Сфокусируйтесь',
    relaxBody: 'Расслабьте тело',
    customTimer: 'Установить свой таймер',
    
    // Community
    news: 'Новости',
    latestUpdates: 'Последние обновления Tunzok',
    officialLaunch: 'Сайт официально запущен!',
    launchDesc: 'Мы рады сообщить, что Tunzok теперь доступен для всех пользователей. Начните отслеживать свой сон и улучшайте качество жизни уже сегодня!',
    tunzokTeam: 'Tunzok Team',
    ourCommunity: 'Наше сообщество',
    joinSocial: 'Присоединяйтесь к нам в социальных сетях',
    youtubeDesc: 'Видео о здоровом образе жизни',
    telegramDesc: 'Новости и общение с командой',
    contactUs: 'По вопросам обращаться',
    
    achievementBeginnerName: 'Новичок',
    achievementBeginnerDesc: 'Ну теперь я знаю, как тут всё устроено',
    achievementPrestigeName: 'Престиж',
    achievementPrestigeDesc: 'Эксклюзивное достижение для подписчиков Tunzok Premium',
    sleepDataCount: 'снов',
    meditationTypesCount: 'видов',
    walkTime: 'прогулка',
    workoutsCount: 'тренировок',
    achievementUnlocked: 'Достижение получено!',
    totalRecords: 'Всего записей',
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
    tunzokPremium: 'Tunzok Premium',
    
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
    subscriptionNoticeText: 'Creating a subscription is a complex process that requires integration with payment systems. There will be no subscription in the near future. Advanced sleep analytics feature marked as "Tunzok Premium" is currently in development. This block will be removed after subscription launch.',
    
    // Sleep Component
    sleepTitle: 'Sleep',
    sleepDesc: 'Track your sleep quality',
    bedtimeLabel: 'Bedtime',
    wakeTimeLabel: 'Wake time',
    saveSleepData: 'Save sleep data',
    lastSleep: 'Last sleep',
    wentToBed: 'Went to bed',
    wokeUp: 'Woke up',
    sleepDurationLabel: 'Duration',
    monthlyAnalytics: 'Monthly analytics',
    availableIn: 'Available in',
    sleepAnalyticsChart: 'Sleep analytics chart',
    
    // Sport Component
    sportTitle: 'Sport',
    sportDesc: 'Track your walks and workouts',
    walk: 'Walk',
    workout: 'Workout',
    steps: 'Steps',
    stepsCount: 'steps',
    start: 'Start',
    pause: 'Pause',
    finish: 'Finish',
    walkHistory: 'Walk history',
    exercise: 'Exercise',
    sets: 'Sets',
    reps: 'Reps',
    add: 'Add',
    saveWorkout: 'Save workout',
    workoutHistory: 'Workout history',
    exercises: 'exercises',
    inhale: 'Inhale',
    hold: 'Hold',
    exhale: 'Exhale',
    rest: 'Rest',
    focusNow: 'Focus now',
    relaxBody: 'Relax body',
    customTimer: 'Set custom timer',
    
    // Community
    news: 'News',
    latestUpdates: 'Latest Tunzok Updates',
    officialLaunch: 'Website officially launched!',
    launchDesc: 'We are pleased to announce that Tunzok is now available to all users. Start tracking your sleep and improve your quality of life today!',
    tunzokTeam: 'Tunzok Team',
    ourCommunity: 'Our Community',
    joinSocial: 'Join us on social media',
    youtubeDesc: 'Videos about healthy lifestyle',
    telegramDesc: 'News and communication with the team',
    contactUs: 'For inquiries contact',
    
    achievementBeginnerName: 'Beginner',
    achievementBeginnerDesc: 'Now I know how everything works here',
    achievementPrestigeName: 'Prestige',
    achievementPrestigeDesc: 'Exclusive achievement for Tunzok Premium subscribers',
    sleepDataCount: 'sleeps',
    meditationTypesCount: 'types',
    walkTime: 'walk',
    workoutsCount: 'workouts',
    achievementUnlocked: 'Achievement unlocked!',
    totalRecords: 'Total records',
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