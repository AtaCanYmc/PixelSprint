/**
 * PixelSprint Internationalization (i18n) Locales (TR, EN, FR)
 */

import { Language } from '../types';

export interface Translations {
  // App & Titles
  appTitle: string;
  dashboardTitle: string;
  boardTitle: string;

  // Dashboard Launcher
  startNewSession: string;
  sprintTitlePlaceholder: string;
  createAndJoinSessionBtn: string;
  joinByIdTitle: string;
  joinByIdPlaceholder: string;
  goToSessionBtn: string;
  mySessionsTitle: string;

  // Session Table
  colTitle: string;
  colSessionId: string;
  colCardCount: string;
  colCreatedAt: string;
  colActions: string;
  btnOpen: string;
  btnDelete: string;
  emptySessions: string;
  deleteSessionConfirm: string;

  // Toolbar & Header
  btnShareQr: string;
  btnAddCard: string;
  btnExportReport: string;
  btnClearBoard: string;
  btnInstallPwa: string;
  btnBackHome: string;
  searchPlaceholder: string;
  soundToggleTitle: string;
  aboutTitle: string;

  // Board Columns
  colWentWellTitle: string;
  colImprovementTitle: string;
  colActionTitle: string;

  // Cards
  emptyColumnMsg: string;
  cardAuthorAnonymous: string;
  upvoteTooltip: string;
  downvoteTooltip: string;
  moveCardTitle: string;
  deleteCardConfirm: string;
  clearAllConfirm: string;

  // Add Card Modal
  modalAddTitle: string;
  selectCategoryLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  btnCancel: string;
  btnSaveAndSend: string;

  // Export Modal
  modalExportTitle: string;
  exportDesc: string;
  btnCopy: string;
  btnDownloadTxt: string;
  btnDownloadCsv: string;
  btnDownloadXlsx: string;
  btnDownloadDocx: string;
  btnDownloadPdf: string;
  btnSendEmail: string;
  btnClose: string;
  copySuccess: string;

  // Share QR Modal
  modalShareTitle: string;
  shareDesc: string;
  directLinkLabel: string;
  copyLinkSuccess: string;

  // About Modal
  modalAboutTitle: string;
  aboutSubhead: string;
  aboutDesc1: string;
  aboutDesc2: string;
  aboutDesc3: string;
  aboutDesc4: string;

  // PWA Guide Modal
  modalPwaTitle: string;
  pwaHeading: string;
  pwaSubheading: string;
  iosTitle: string;
  iosStep1: string;
  iosStep2: string;
  androidTitle: string;
  androidStep1: string;
  androidStep2: string;
  btnInstallNow: string;
  btnGotIt: string;

  // Taskbar & Start Menu
  startBtnText: string;
  startMenuHome: string;
  startMenuAddCard: string;
  startMenuShareQr: string;
  startMenuExport: string;
  startMenuSound: string;
  startMenuTheme: string;
  startMenuInstall: string;
  startMenuAbout: string;
  startMenuClear: string;
  startMenuLabels: string;
  labelsToggleTitle: string;

  // Network Badges
  badgeOnline: string;
  badgeOffline: string;
  badgeP2pSync: string;

  // AI Prompt Generator Modal
  btnAiPrompt: string;
  modalAiTitle: string;
  aiModalDesc: string;
  aiAnalysisTypeLabel: string;
  aiRoleLabel: string;
  aiLangLabel: string;
  aiCustomFocusLabel: string;
  aiCustomFocusPlaceholder: string;
  aiGeneratedPromptLabel: string;
  btnCopyPrompt: string;
  btnOpenChatGpt: string;
  btnOpenClaude: string;
  btnOpenGemini: string;
  copyPromptSuccess: string;
  startMenuAiPrompt: string;

  // AI Presets & Roles
  aiPresetSummary: string;
  aiPresetActionPlan: string;
  aiPresetRootCause: string;
  aiPresetSentiment: string;
  aiPresetJira: string;

  aiRoleAgileCoach: string;
  aiRoleScrumMaster: string;
  aiRoleExecutive: string;
  aiRolePeer: string;

  // Session Manager & Roles
  badgeHost: string;
  badgeGuest: string;
  roleHostTitle: string;
  roleGuestTitle: string;
  hostOnlyActionAlert: string;
  hostOnlyTooltip: string;

  // Timer Keys
  timerTitle: string;
  timerDesc: string;
  timerPreset3m: string;
  timerPreset5m: string;
  timerPreset10m: string;
  timerPreset15m: string;
  btnTimerStart: string;
  btnTimerPause: string;
  btnTimerResume: string;
  btnTimerExtend2m: string;
  btnTimerExtend5m: string;
  btnTimerReset: string;
  timerStatusRunning: string;
  timerStatusPaused: string;
  timerStatusExpired: string;
  timerStatusUnset: string;
  timerExpiredAlert: string;

  // Masking & Reveal Cards Phase
  btnToggleReveal: string;
  btnToggleMask: string;
  badgeMaskedPhase: string;
  badgeRevealedPhase: string;
}

export const locales: Record<Language, Translations> = {
  tr: {
    appTitle: 'PixelSprint v1.0 - Retro Sprint Retrospective',
    dashboardTitle: 'PixelSprint v1.0 - Retro Oturum Yöneticisi (Dashboard)',
    boardTitle: 'PixelSprint - Retro Board',

    startNewSession: 'Yeni Retro Oturumu Başlat',
    sprintTitlePlaceholder: 'Sprint Başlığı (örn. Sprint 45 Retrospektif)',
    createAndJoinSessionBtn: '[🚀 Retro Oluştur & Katıl]',
    joinByIdTitle: 'Oturum Kimliği (Session ID) ile Katıl',
    joinByIdPlaceholder: 'Session ID yapıştır (örn. retro-demo-sprint-1)...',
    goToSessionBtn: '[▶ Oturuma Git]',
    mySessionsTitle: 'Mevcut Retro Oturumlarınız',

    colTitle: 'Retro Başlığı',
    colSessionId: 'Oturum Kimliği (Session ID)',
    colCardCount: 'Kart Sayısı',
    colCreatedAt: 'Oluşturulma',
    colActions: 'İşlem',
    btnOpen: '▶ Aç',
    btnDelete: '❌',
    emptySessions: '[Henüz kaydedilmiş bir Retro Oturumu yok. Yukarıdan yeni bir tane oluşturun!]',
    deleteSessionConfirm: 'Bu Retro Oturumunu silmek istediğinize emin misiniz?',
    btnShareQr: 'Paylaş',

    btnAddCard: 'Yeni Kart',
    btnExportReport: 'Rapor İndir',
    btnClearBoard: 'Temizle',
    btnInstallPwa: 'Uygulamayı Yükle',
    btnBackHome: 'Ana Sayfaya Dön',
    searchPlaceholder: 'Filtrele veya ara...',
    soundToggleTitle: 'Ses Efektlerini Aç/Kapat',
    aboutTitle: 'Hakkında',

    colWentWellTitle: '🟢',
    colImprovementTitle: '🔴',
    colActionTitle: '💡',

    emptyColumnMsg: '[Henüz bu kategoride bir anonim kart yok. İlk kartı ekleyen sen ol!]',
    cardAuthorAnonymous: 'Anonim Retro Sakini',
    upvoteTooltip: 'Beğen',
    downvoteTooltip: 'Beğenme',
    moveCardTitle: 'Kategori Değiştir',
    deleteCardConfirm: 'Bu retro kartını silmek istediğinize emin misiniz?',
    clearAllConfirm: 'Tüm retro kartlarını silmek istediğinize emin misiniz? Bu işlem geri alınamaz!',

    modalAddTitle: 'Yeni Anonim Retro Kartı',
    selectCategoryLabel: 'Kategori / Sütun Seçin:',
    messageLabel: 'Mesajınız (Tamamen Anonim):',
    messagePlaceholder: 'Sprint ile ilgili düşüncelerini yaz...',
    btnCancel: 'İptal',
    btnSaveAndSend: '[💾 Kaydet ve Gönder]',

    modalExportTitle: 'Retro Özet Raporu',
    exportDesc: 'Sprint Retrospektif özetini metin, CSV veya Excel (XLSX) formatında indirebilirsiniz:',
    btnCopy: 'Kopyala',
    btnDownloadTxt: '.TXT',
    btnDownloadCsv: '.CSV',
    btnDownloadXlsx: '.XLSX',
    btnDownloadDocx: '.DOCX',
    btnDownloadPdf: '.PDF',
    btnSendEmail: 'E-Posta',
    btnClose: 'Kapat',

    copySuccess: 'Retro özet raporu panoya kopyalandı!',

    modalShareTitle: 'Retro Oturumunu Paylaş',
    shareDesc:
      'Ekip arkadaşlarınız telefon kameraları ile aşağıdaki QR kodu okutarak bu Retro panosuna anında katılabilir:',
    directLinkLabel: 'Doğrudan Katılım Linki:',
    copyLinkSuccess: 'Retro katılım bağlantısı panoya kopyalandı! 🔗',

    modalAboutTitle: 'PixelSprint v1.0 Hakkında',
    aboutSubhead: 'Retro Sprint Retrospective Board',
    aboutDesc1:
      "PixelSprint, yazılım ekipleri için 90'lar Windows 95 ve Terminal estetiğinde hazırlanmış anonim bir Sprint Sonu Retrospektif uygulamasıdır.",
    aboutDesc2: '%100 Anonim: Hiçbir kullanıcı adı veya ID kaydedilmez.',
    aboutDesc3: 'WebRTC P2P Real-time Sync: Cihazlar arası anlık canlı senkronizasyon.',
    aboutDesc4: 'Offline Destekli (PWA): İnternet bağlantısı olmadan da çalışır.',

    modalPwaTitle: 'PixelSprint.exe - Mobil Kurulum Rehberi',
    pwaHeading: 'Ana Ekrana Uygulama Olarak Ekle',
    pwaSubheading: "PixelSprint'i tek tıkla tam ekran kullanın!",
    iosTitle: '🍏 iOS (Safari) Kullanıcıları:',
    iosStep1: 'Ekranın altındaki Paylaş (Share ⎋) butonuna dokunun.',
    iosStep2: 'Açılan menüde "Ana Ekrana Ekle" seçeneğini seçin.',
    androidTitle: '🤖 Android (Chrome) Kullanıcıları:',
    androidStep1: 'Sağ üstteki Seçenekler (⋮) menüsüne dokunun.',
    androidStep2: '"Uygulamayı Yükle" veya "Ana Ekrana Ekle" butonuna basın.',
    btnInstallNow: '📱 Uygulamayı Şimdi Yükle',
    btnGotIt: '[👍 Anladım]',

    startBtnText: 'Başlat',
    startMenuHome: 'Ana Sayfaya Dön',
    startMenuAddCard: 'Yeni Anonim Kart Ekle',
    startMenuShareQr: 'Retro Oturumunu Paylaş',
    startMenuExport: 'Retro Raporunu İndir',
    startMenuSound: 'Ses Efektleri',
    startMenuTheme: 'Koyu / Açık Tema',
    startMenuInstall: 'PixelSprint.exe Yükle',
    startMenuAbout: 'Hakkında',
    startMenuClear: 'Panoyu Temizle',
    startMenuLabels: 'Buton Metinleri',
    labelsToggleTitle: 'Buton Metinlerini Göster/Gizle',

    badgeOnline: '🛜 ONLINE',
    badgeOffline: '📡❌ ERR_RETRO_OFFLINE',
    badgeP2pSync: '🟢 P2P SYNC',

    btnAiPrompt: 'AI Analiz Promptu',
    modalAiTitle: '🤖 AI Retrospektif Prompt Oluşturucu',
    aiModalDesc:
      "Retro sonuçlarınızı ChatGPT, Claude veya Gemini'ye analiz ettirmek için özelleştirilmiş AI promptu oluşturun:",
    aiAnalysisTypeLabel: 'Analiz Türü / Hedef:',
    aiRoleLabel: 'AI Rolü / Perspektif:',
    aiLangLabel: 'Dil / Language:',
    aiCustomFocusLabel: 'Özel Odak Noktası (İsteğe Bağlı):',
    aiCustomFocusPlaceholder: 'Örn: Özellikle sprint içi iletişim sorunlarına ve CI/CD süreçlerine odaklan...',
    aiGeneratedPromptLabel: 'Hazırlanan AI Prompt Metni:',
    btnCopyPrompt: 'Promptu Kopyala',
    btnOpenChatGpt: "ChatGPT'de Aç",
    btnOpenClaude: "Claude'da Aç",
    btnOpenGemini: "Gemini'de Aç",
    copyPromptSuccess: "AI promptu panoya kopyalandı! Şimdi yapıştırıp AI'a analiz ettirebilirsiniz.",
    startMenuAiPrompt: 'AI Analiz Promptu Oluştur',

    aiPresetSummary: '📊 Genel Özet ve Sentez',
    aiPresetActionPlan: '🎯 Aksiyon Planı ve Önceliklendirme',
    aiPresetRootCause: '🔍 Kök Neden & Problem Analizi',
    aiPresetSentiment: '😊 Ekip Duygu Durumu / Moral Analizi',
    aiPresetJira: '📝 Jira Task / Aksiyon Biletleri Formatı',

    aiRoleAgileCoach: '🏆 Kıdemli Agile Coach',
    aiRoleScrumMaster: '⏱️ Scrum Master',
    aiRoleExecutive: '📊 Mühendislik Direktörü / Executive',
    aiRolePeer: '🤝 Ekip Arkadaşı / Yazılımcı',

    badgeHost: '👑 HOST',
    badgeGuest: '👤 KATILIMCI',
    roleHostTitle: '👑 Oturum Yöneticisi',
    roleGuestTitle: '👤 Katılımcı',
    hostOnlyActionAlert:
      'Bu işlem (kart taşıma, silme, panoyu temizle) sadece Oturum Yöneticisi tarafından yapılabilir.',
    hostOnlyTooltip: 'Sadece Oturum Yöneticisi tarafından yapılabilir',

    timerTitle: '⏱️ Retro Zamanlayıcısı',
    timerDesc: 'Oturum süresini ayarlayın. Süre tamamlandığında katılımcıların kart girişi otomatik kilitlenir.',
    timerPreset3m: '3 Dakika',
    timerPreset5m: '5 Dakika',
    timerPreset10m: '10 Dakika',
    timerPreset15m: '15 Dakika',
    btnTimerStart: '▶ Başlat',
    btnTimerPause: '⏸️ Duraklat',
    btnTimerResume: '▶ Devam Et',
    btnTimerExtend2m: '➕ +2 Dk Uzat',
    btnTimerExtend5m: '➕ +5 Dk Uzat',
    btnTimerReset: '🔄 Sıfırla',
    timerStatusRunning: '⏱️ Çalışıyor',
    timerStatusPaused: '⏸️ Duraklatıldı',
    timerStatusExpired: '🔒 Süre Doldu',
    timerStatusUnset: '⏱️ Ayarlanmadı',
    timerExpiredAlert: '⏱️ Retro süresi doldu! Katılımcılar yeni kart ekleyemez. Oturum yöneticisi süreyi uzatabilir.',

    btnToggleReveal: 'Kartları Göster',
    btnToggleMask: 'Kartları Gizle',
    badgeMaskedPhase: 'Kartlar Gizli',
    badgeRevealedPhase: 'Kartlar Görünür'
  },

  en: {
    appTitle: 'PixelSprint v1.0 - Retro Sprint Retrospective',
    dashboardTitle: 'PixelSprint v1.0 - Retro Session Manager (Dashboard)',
    boardTitle: 'PixelSprint - Retro Board',

    startNewSession: 'Start New Retro Session',
    sprintTitlePlaceholder: 'Sprint Title (e.g. Sprint 45 Retrospective)',
    createAndJoinSessionBtn: '[🚀 Create & Join Retro]',
    joinByIdTitle: 'Join by Session ID',
    joinByIdPlaceholder: 'Paste Session ID (e.g. retro-demo-sprint-1)...',
    goToSessionBtn: '[▶ Go to Session]',
    mySessionsTitle: 'Your Saved Retro Sessions',

    colTitle: 'Retro Title',
    colSessionId: 'Session ID',
    colCardCount: 'Cards',
    colCreatedAt: 'Created At',
    colActions: 'Action',
    btnOpen: '▶ Open',
    btnDelete: '❌',
    emptySessions: '[No saved Retro sessions found. Create a new one above!]',
    deleteSessionConfirm: 'Are you sure you want to delete this Retro session?',

    btnShareQr: 'Share',
    btnAddCard: 'New Card',
    btnExportReport: 'Export Report',
    btnClearBoard: 'Clear Board',
    btnInstallPwa: 'Install App',
    btnBackHome: 'Return to Home',
    searchPlaceholder: 'Filter or search...',
    soundToggleTitle: 'Toggle Sound Effects',
    aboutTitle: 'About',

    colWentWellTitle: '🟢',
    colImprovementTitle: '🔴',
    colActionTitle: '💡',

    emptyColumnMsg: '[No anonymous cards in this column yet. Be the first to add one!]',
    cardAuthorAnonymous: 'Anonymous Retro Resident',
    upvoteTooltip: 'Upvote',
    downvoteTooltip: 'Downvote',
    moveCardTitle: 'Move Category',
    deleteCardConfirm: 'Are you sure you want to delete this retro card?',
    clearAllConfirm: 'Are you sure you want to delete all retro cards? This action cannot be undone!',

    modalAddTitle: 'Add Anonymous Retro Card',
    selectCategoryLabel: 'Select Category / Column:',
    messageLabel: 'Your Message (100% Anonymous):',
    messagePlaceholder: 'Write your thoughts about the sprint...',
    btnCancel: 'Cancel',
    btnSaveAndSend: '[💾 Save & Send]',

    modalExportTitle: 'Retro Summary Report',
    exportDesc: 'Download your Sprint Retrospective summary as Text, CSV, or Excel (XLSX):',
    btnCopy: 'Copy',
    btnDownloadTxt: '.TXT',
    btnDownloadCsv: '.CSV',
    btnDownloadXlsx: '.XLSX',
    btnDownloadDocx: '.DOCX',
    btnDownloadPdf: '.PDF',
    btnSendEmail: '📧 Email',
    btnClose: 'Close',

    copySuccess: 'Retro summary report copied to clipboard!',

    modalShareTitle: 'Share Retro Session',
    shareDesc: 'Team members can scan this QR code with their phone camera to instantly join this Retro board:',
    directLinkLabel: 'Direct Join Link:',
    copyLinkSuccess: 'Retro join link copied to clipboard! 🔗',

    modalAboutTitle: 'About PixelSprint v1.0',
    aboutSubhead: 'Retro Sprint Retrospective Board',
    aboutDesc1:
      'PixelSprint is an anonymous Sprint Retrospective app built with a 90s Windows 95 and Terminal aesthetic for agile software teams.',
    aboutDesc2: '100% Anonymous: No usernames or user IDs stored.',
    aboutDesc3: 'WebRTC P2P Real-time Sync: Instant multi-device live sync.',
    aboutDesc4: 'Offline Ready (PWA): Works completely without an internet connection.',

    modalPwaTitle: 'PixelSprint.exe - Mobile Setup Guide',
    pwaHeading: 'Add to Home Screen as an App',
    pwaSubheading: 'Use PixelSprint fullscreen with one click!',
    iosTitle: '🍏 iOS (Safari) Users:',
    iosStep1: 'Tap the Share (⎋) button at the bottom of the screen.',
    iosStep2: 'Choose "Add to Home Screen" from the menu.',
    androidTitle: '🤖 Android (Chrome) Users:',
    androidStep1: 'Tap the Options (⋮) menu in the top right corner.',
    androidStep2: 'Tap "Install App" or "Add to Home Screen".',
    btnInstallNow: '📱 Install App Now',
    btnGotIt: '[👍 Got It]',

    startBtnText: 'Start',
    startMenuHome: 'Return to Home',
    startMenuAddCard: 'Add New Anonymous Card',
    startMenuShareQr: 'Share Retro Session',
    startMenuExport: 'Export Retro Report',
    startMenuSound: 'Sound Effects',
    startMenuTheme: 'Dark / Light Mode',
    startMenuInstall: 'Install PixelSprint.exe',
    startMenuAbout: 'About',
    startMenuClear: 'Clear Board',
    startMenuLabels: 'Button Labels',
    labelsToggleTitle: 'Toggle Button Text Labels',

    badgeOnline: '🛜 ONLINE',
    badgeOffline: '📡❌ ERR_RETRO_OFFLINE',
    badgeP2pSync: '🟢 P2P SYNC',

    btnAiPrompt: 'AI Prompt',
    modalAiTitle: '🤖 AI Retrospective Prompt Generator',
    aiModalDesc: 'Generate a customized AI prompt to analyze your retro board results with ChatGPT, Claude, or Gemini:',
    aiAnalysisTypeLabel: 'Analysis Type / Goal:',
    aiRoleLabel: 'AI Role / Perspective:',
    aiLangLabel: 'Language:',
    aiCustomFocusLabel: 'Custom Focus (Optional):',
    aiCustomFocusPlaceholder: 'e.g., Focus especially on team communication issues and CI/CD pipelines...',
    aiGeneratedPromptLabel: 'Generated AI Prompt Text:',
    btnCopyPrompt: 'Copy Prompt',
    btnOpenChatGpt: 'Open ChatGPT',
    btnOpenClaude: 'Open Claude',
    btnOpenGemini: 'Open Gemini',
    copyPromptSuccess: 'AI prompt copied to clipboard! Paste it into your AI assistant for analysis.',
    startMenuAiPrompt: 'Generate AI Analysis Prompt',

    aiPresetSummary: '📊 General Summary & Synthesis',
    aiPresetActionPlan: '🎯 Action Plan & Prioritization',
    aiPresetRootCause: '🔍 Root Cause & Problem Analysis',
    aiPresetSentiment: '😊 Team Sentiment & Spirit Analysis',
    aiPresetJira: '📝 Jira Task Tickets Format',

    aiRoleAgileCoach: '🏆 Senior Agile Coach',
    aiRoleScrumMaster: '⏱️ Scrum Master',
    aiRoleExecutive: '📊 Engineering Director / Executive',
    aiRolePeer: '🤝 Teammate / Engineer',

    badgeHost: '👑 HOST',
    badgeGuest: '👤 GUEST',
    roleHostTitle: '👑 Session Manager',
    roleGuestTitle: '👤 Participant',
    hostOnlyActionAlert:
      'This action (moving/deleting cards, clearing board) can only be performed by the Session Manager.',
    hostOnlyTooltip: 'Session Manager only',

    timerTitle: '⏱️ Retro Timer',
    timerDesc: 'Set session duration. When the timer expires, participant card entry is automatically locked.',
    timerPreset3m: '3 Minutes',
    timerPreset5m: '5 Minutes',
    timerPreset10m: '10 Minutes',
    timerPreset15m: '15 Minutes',
    btnTimerStart: '▶ Start',
    btnTimerPause: '⏸️ Pause',
    btnTimerResume: '▶ Resume',
    btnTimerExtend2m: '➕ +2 Min',
    btnTimerExtend5m: '➕ +5 Min',
    btnTimerReset: '🔄 Reset',
    timerStatusRunning: '⏱️ Running',
    timerStatusPaused: '⏸️ Paused',
    timerStatusExpired: '🔒 Time Up',
    timerStatusUnset: '⏱️ Not Set',
    timerExpiredAlert: '⏱️ Retro time is up! Participants cannot add new cards. Session host can extend time.',

    btnToggleReveal: 'Reveal Cards',
    btnToggleMask: 'Mask Cards',
    badgeMaskedPhase: 'Cards Masked',
    badgeRevealedPhase: 'Cards Revealed'
  },

  fr: {
    appTitle: 'PixelSprint v1.0 - Rétrospective Sprint Rétro',
    dashboardTitle: 'PixelSprint v1.0 - Gestionnaire de Session',
    boardTitle: 'PixelSprint - Tableau Rétro',

    startNewSession: 'Démarrer une Nouvelle Session Rétro',
    sprintTitlePlaceholder: 'Titre du Sprint',
    createAndJoinSessionBtn: '[🚀 Créer & Rejoindre Rétro]',
    joinByIdTitle: 'Rejoindre par ID de Session',
    joinByIdPlaceholder: "Coller l'ID de Session...",
    goToSessionBtn: '[▶ Accéder à la Session]',
    mySessionsTitle: 'Vos Sessions Rétro Enregistrées',

    colTitle: 'Titre de la Rétro',
    colSessionId: 'ID de Session',
    colCardCount: 'Cartes',
    colCreatedAt: 'Créé le',
    colActions: 'Action',
    btnOpen: '▶ Ouvrir',
    btnDelete: '❌',
    emptySessions: '[Aucune session Rétro enregistrée. Créez-en une nouvelle ci-dessus !]',
    deleteSessionConfirm: 'Voulez-vous supprimer cette session Rétro ?',

    btnShareQr: 'Partager',
    btnAddCard: 'Nouvelle Carte',
    btnExportReport: 'Exporter Rapport',
    btnClearBoard: 'Effacer Tableau',
    btnInstallPwa: "Installer l'App",
    btnBackHome: "Retour à l'Accueil",
    searchPlaceholder: 'Filtrer ou rechercher...',
    soundToggleTitle: 'Activer/Désactiver les Effets Sonores',
    aboutTitle: 'À propos',

    colWentWellTitle: '🟢',
    colImprovementTitle: '🔴',
    colActionTitle: '💡',

    emptyColumnMsg: '[Aucune carte anonyme dans cette colonne. Soyez le premier à en ajouter une !]',
    cardAuthorAnonymous: 'Résident Rétro Anonyme',
    upvoteTooltip: 'Voter pour',
    downvoteTooltip: 'Voter contre',
    moveCardTitle: 'Changer de Catégorie',
    deleteCardConfirm: 'Voulez-vous vraiment supprimer cette carte rétro ?',
    clearAllConfirm: 'Voulez-vous vraiment supprimer toutes les cartes rétro ? Cette action est irréversible !',

    modalAddTitle: 'Ajouter une Carte Rétro Anonyme',
    selectCategoryLabel: 'Sélectionner Catégorie / Colonne :',
    messageLabel: 'Votre Message (100% Anonyme) :',
    messagePlaceholder: 'Écrivez vos pensées sur le sprint...',
    btnCancel: 'Annuler',
    btnSaveAndSend: '[💾 Enregistrer & Envoyer]',

    modalExportTitle: 'Rapport de Synthèse Rétro',
    exportDesc: 'Téléchargez votre résumé de rétrospective au format Texte, CSV ou Excel (XLSX) :',
    btnCopy: '📋 Copier',
    btnDownloadTxt: '.TXT',
    btnDownloadCsv: '.CSV',
    btnDownloadXlsx: '.XLSX',
    btnDownloadDocx: '.DOCX',
    btnDownloadPdf: '.PDF',
    btnSendEmail: 'E-Mail',
    btnClose: 'Fermer',

    copySuccess: 'Rapport de synthèse rétro copié dans le presse-papiers !',

    modalShareTitle: 'Partager Session Rétro',
    shareDesc: "Les membres de l'équipe peuvent scanner ce code QR pour rejoindre instantanément ce tableau Rétro :",
    directLinkLabel: 'Lien d Accès Direct :',
    copyLinkSuccess: 'Lien de participation rétro copié dans le presse-papiers ! 🔗',

    modalAboutTitle: 'À propos de PixelSprint v1.0',
    aboutSubhead: 'Tableau de Rétrospective Sprint Rétro',
    aboutDesc1:
      'PixelSprint est une application de Rétrospective anonyme conçue avec une esthétique Windows 95 et Terminal des années 90 pour les équipes agiles.',
    aboutDesc2: "100% Anonyme : Aucun nom d'utilisateur ni ID stocké.",
    aboutDesc3: 'WebRTC P2P Sync Temps Réel : Synchronisation en direct entre appareils.',
    aboutDesc4: 'Prêt pour le Mode Hors Ligne (PWA) : Fonctionne entièrement sans connexion Internet.',

    modalPwaTitle: "PixelSprint.exe - Guide d'Installation Mobile",
    pwaHeading: "Ajouter à l'Écran d'Accueil",
    pwaSubheading: 'Utilisez PixelSprint en plein écran en un clic !',
    iosTitle: '🍏 Utilisateurs iOS (Safari) :',
    iosStep1: "Appuyez sur le bouton Partager (⎋) en bas de l'écran.",
    iosStep2: 'Sélectionnez "Sur l\'écran d\'accueil" dans le menu.',
    androidTitle: '🤖 Utilisateurs Android (Chrome) :',
    androidStep1: 'Appuyez sur le menu Options (⋮) en haut à droite.',
    androidStep2: 'Appuyez sur "Installer l\'application" ou "Ajouter à l\'écran d\'accueil".',
    btnInstallNow: "📱 Installer l'Application Maintenant",
    btnGotIt: '[👍 Compris]',

    startBtnText: 'Démarrer',
    startMenuHome: "Retour à l'Accueil",
    startMenuAddCard: 'Ajouter une Carte Anonyme',
    startMenuShareQr: 'Partager Session Rétro',
    startMenuExport: 'Exporter Rapport Rétro',
    startMenuSound: 'Effets Sonores',
    startMenuTheme: 'Thème Sombre / Clair',
    startMenuInstall: 'Installer PixelSprint.exe',
    startMenuAbout: 'À propos',
    startMenuClear: 'Effacer Tableau',
    startMenuLabels: 'Étiquettes de Bouton',
    labelsToggleTitle: 'Afficher/Masquer les Étiquettes de Bouton',

    badgeOnline: '🛜 EN LIGNE',
    badgeOffline: '📡❌ ERR_RETRO_HORS_LIGNE',
    badgeP2pSync: '🟢 SYNC P2P',

    btnAiPrompt: 'Prompt AI',
    modalAiTitle: '🤖 Générateur de Prompt Rétrospective AI',
    aiModalDesc: 'Générez un prompt AI personnalisé pour analyser vos résultats rétro avec ChatGPT, Claude ou Gemini :',
    aiAnalysisTypeLabel: "Type d'Analyse / Objectif :",
    aiRoleLabel: 'Rôle AI / Perspective :',
    aiLangLabel: 'Langue / Language :',
    aiCustomFocusLabel: 'Focus Personnalisé (Optionnel) :',
    aiCustomFocusPlaceholder: 'ex. Se concentrer particulièrement sur la communication...',
    aiGeneratedPromptLabel: 'Texte du Prompt AI Généré :',
    btnCopyPrompt: 'Copier le Prompt',
    btnOpenChatGpt: 'Ouvrir ChatGPT',
    btnOpenClaude: 'Ouvrir Claude',
    btnOpenGemini: 'Ouvrir Gemini',
    copyPromptSuccess: 'Prompt AI copié dans le presse-papiers !',
    startMenuAiPrompt: "Générer Prompt d'Analyse AI",

    aiPresetSummary: '📊 Synthèse et Résumé Général',
    aiPresetActionPlan: "🎯 Plan d'Action & Priorisation",
    aiPresetRootCause: '🔍 Analyse des Causes Racines',
    aiPresetSentiment: "😊 Analyse du Moral de l'Équipe",
    aiPresetJira: '📝 Format Tickets Jira',

    aiRoleAgileCoach: '🏆 Coach Agile Senior',
    aiRoleScrumMaster: '⏱️ Scrum Master',
    aiRoleExecutive: '📊 Directeur Ingénierie',
    aiRolePeer: '🤝 Coéquipier / Développeur',

    badgeHost: '👑 HÔTE',
    badgeGuest: '👤 INVITÉ',
    roleHostTitle: '👑 Gestionnaire de Session',
    roleGuestTitle: '👤 Participant',
    hostOnlyActionAlert: 'Cette action ne peut être effectuée que par le gestionnaire de session.',
    hostOnlyTooltip: 'Gestionnaire uniquement',

    timerTitle: '⏱️ Minuteur Rétro',
    timerDesc: 'Définissez la durée de la session.',
    timerPreset3m: '3 Minutes',
    timerPreset5m: '5 Minutes',
    timerPreset10m: '10 Minutes',
    timerPreset15m: '15 Minutes',
    btnTimerStart: '▶ Démarrer',
    btnTimerPause: '⏸️ Pause',
    btnTimerResume: '▶ Reprendre',
    btnTimerExtend2m: '➕ +2 Min',
    btnTimerExtend5m: '➕ +5 Min',
    btnTimerReset: '🔄 Réinitialiser',
    timerStatusRunning: '⏱️ En Cours',
    timerStatusPaused: '⏸️ En Pause',
    timerStatusExpired: '🔒 Temps Écoulé',
    timerStatusUnset: '⏱️ Non Défini',
    timerExpiredAlert: '⏱️ Le temps rétro est écoulé !',

    btnToggleReveal: 'Révéler les Cartes',
    btnToggleMask: 'Masquer les Cartes',
    badgeMaskedPhase: 'Cartes Masquées',
    badgeRevealedPhase: 'Cartes Visibles'
  }
};
