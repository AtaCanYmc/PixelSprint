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

  // Network Badges
  badgeOnline: string;
  badgeOffline: string;
  badgeP2pSync: string;
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

    btnShareQr: 'Paylaş (QR)',
    btnAddCard: 'Yeni Kart',
    btnExportReport: 'Rapor İndir',
    btnClearBoard: 'Temizle',
    btnInstallPwa: 'Uygulamayı Yükle',
    btnBackHome: 'Ana Sayfaya Dön (Dashboard)',
    searchPlaceholder: 'Filtrele veya ara...',
    soundToggleTitle: 'Ses Efektlerini Aç/Kapat',
    aboutTitle: 'Hakkında',

    colWentWellTitle: '🟢 Neyi İyi Yaptık? (Went Well)',
    colImprovementTitle: '🔴 Neyi Batırdık / Gelişmeli? (Needs Improvement)',
    colActionTitle: '💡 Aksiyonlar & Fikirler (Action Items)',

    emptyColumnMsg: '[Henüz bu kategoride bir anonim kart yok. İlk kartı ekleyen sen ol!]',
    cardAuthorAnonymous: 'Anonim Retro Sakini',
    upvoteTooltip: 'Beğen (Upvote)',
    downvoteTooltip: 'Beğenme (Downvote)',
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
    btnCopy: '📋 Kopyala',
    btnDownloadTxt: '.TXT',
    btnDownloadCsv: '.CSV',
    btnDownloadXlsx: '.XLSX',
    btnClose: 'Kapat',
    copySuccess: 'Retro özet raporu panoya kopyalandı!',

    modalShareTitle: 'Retro Oturumunu Paylaş (QR Kod)',
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

    startBtnText: 'Başlat',
    startMenuHome: 'Ana Sayfaya Dön (Dashboard)',
    startMenuAddCard: 'Yeni Anonim Kart Ekle',
    startMenuShareQr: 'Retro Oturumunu Paylaş (QR Kod)',
    startMenuExport: 'Retro Raporunu İndir (.txt)',
    startMenuSound: 'Ses Efektleri (Açık/Kapalı)',
    startMenuTheme: 'Koyu Tema / Light Mode',
    startMenuInstall: 'PixelSprint.exe Yükle (PWA)',
    startMenuAbout: 'Hakkında',
    startMenuClear: 'Panoyu Temizle',

    badgeOnline: '🛜 ONLINE',
    badgeOffline: '📡❌ ERR_RETRO_OFFLINE',
    badgeP2pSync: '🟢 P2P SYNC'
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

    btnShareQr: 'Share (QR)',
    btnAddCard: 'New Card',
    btnExportReport: 'Export Report',
    btnClearBoard: 'Clear Board',
    btnInstallPwa: 'Install App',
    btnBackHome: 'Return to Home (Dashboard)',
    searchPlaceholder: 'Filter or search...',
    soundToggleTitle: 'Toggle Sound Effects',
    aboutTitle: 'About',

    colWentWellTitle: '🟢 What Went Well? (Went Well)',
    colImprovementTitle: '🔴 What Needs Improvement? (Bugs & Fixes)',
    colActionTitle: '💡 Action Items & Ideas (Action Items)',

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
    btnCopy: '📋 Copy',
    btnDownloadTxt: '.TXT',
    btnDownloadCsv: '.CSV',
    btnDownloadXlsx: '.XLSX',
    btnClose: 'Close',
    copySuccess: 'Retro summary report copied to clipboard!',

    modalShareTitle: 'Share Retro Session (QR Code)',
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

    startBtnText: 'Start',
    startMenuHome: 'Return to Home (Dashboard)',
    startMenuAddCard: 'Add New Anonymous Card',
    startMenuShareQr: 'Share Retro Session (QR Code)',
    startMenuExport: 'Export Retro Report (.txt)',
    startMenuSound: 'Sound Effects (On/Off)',
    startMenuTheme: 'Dark / Light Mode',
    startMenuInstall: 'Install PixelSprint.exe (PWA)',
    startMenuAbout: 'About',
    startMenuClear: 'Clear Board',

    badgeOnline: '🛜 ONLINE',
    badgeOffline: '📡❌ ERR_RETRO_OFFLINE',
    badgeP2pSync: '🟢 P2P SYNC'
  },

  fr: {
    appTitle: 'PixelSprint v1.0 - Rétrospective Sprint Rétro',
    dashboardTitle: 'PixelSprint v1.0 - Gestionnaire de Session (Tableau de Bord)',
    boardTitle: 'PixelSprint - Tableau Rétro',

    startNewSession: 'Démarrer une Nouvelle Session Rétro',
    sprintTitlePlaceholder: 'Titre du Sprint (ex. Rétrospective Sprint 45)',
    createAndJoinSessionBtn: '[🚀 Créer & Rejoindre Rétro]',
    joinByIdTitle: 'Rejoindre par ID de Session',
    joinByIdPlaceholder: "Coller l'ID de Session (ex. retro-demo-sprint-1)...",
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
    deleteSessionConfirm: 'Voulez-vous vraiment supprimer cette session Rétro ?',

    btnShareQr: 'Partager (QR)',
    btnAddCard: 'Nouvelle Carte',
    btnExportReport: 'Exporter Rapport',
    btnClearBoard: 'Effacer Tableau',
    btnInstallPwa: "Installer l'App",
    btnBackHome: "Retour à l'Accueil (Tableau de Bord)",
    searchPlaceholder: 'Filtrer ou rechercher...',
    soundToggleTitle: 'Activer/Désactiver les Effets Sonores',
    aboutTitle: 'À propos',

    colWentWellTitle: "🟢 Ce Qui S'est Bien Passé ? (Went Well)",
    colImprovementTitle: '🔴 Ce Qui Doit Être Amélioré ? (Bugs & Fixes)',
    colActionTitle: '💡 Actions & Idées (Action Items)',

    emptyColumnMsg: '[Aucune carte anonyme dans cette colonne. Soyez le premier à en ajouter une !]',
    cardAuthorAnonymous: 'Résident Rétro Anonyme',
    upvoteTooltip: 'Voter pour (Upvote)',
    downvoteTooltip: 'Voter contre (Downvote)',
    moveCardTitle: 'Changer de Catégorie',
    deleteCardConfirm: 'Voulez-vous vraiment supprimer cette carte rétro ?',
    clearAllConfirm: 'Voulez-vous vraiment supprimer toutes les cartes rétro ? Cette action est irréversible !',

    modalAddTitle: 'Ajouter une Carte Rétro Anonyme',
    selectCategoryLabel: 'Sélectionner Catégorie / Colonne :',
    messageLabel: 'Votre Message (100% Anonyme) :',
    messagePlaceholder: 'Écrivez vos pensées sur le sprint...',
    btnCancel: 'Annuler',
    btnSaveAndSend: '[💾 Enregistrer & Envoyer]',

    modalExportTitle: 'Rapport Synthétique Rétro',
    exportDesc: 'Téléchargez le résumé de votre Rétrospective au format Texte, CSV ou Excel (XLSX) :',
    btnCopy: '📋 Copier',
    btnDownloadTxt: '.TXT',
    btnDownloadCsv: '.CSV',
    btnDownloadXlsx: '.XLSX',
    btnClose: 'Fermer',
    copySuccess: 'Rapport résumé copié dans le presse-papiers !',

    modalShareTitle: 'Partager Session Rétro (Code QR)',
    shareDesc:
      "Les membres de l'équipe peuvent scanner ce code QR avec l'appareil photo de leur téléphone pour rejoindre ce tableau Rétro :",
    directLinkLabel: "Lien d'Accès Direct :",
    copyLinkSuccess: "Lien d'accès copié dans le presse-papiers ! 🔗",

    modalAboutTitle: 'À propos de PixelSprint v1.0',
    aboutSubhead: 'Tableau de Rétrospective Sprint Rétro',
    aboutDesc1:
      'PixelSprint est une application de Rétrospective anonyme conçue avec une esthétique Windows 95 et Terminal des années 90 pour les équipes agiles.',
    aboutDesc2: "100% Anonyme : Aucun nom d'utilisateur ni ID stocké.",
    aboutDesc3: 'WebRTC P2P Sync Temps Réel : Synchronisation en direct entre appareils.',
    aboutDesc4: 'Prêt pour le Mode Hors Ligne (PWA) : Fonctionne entièrement sans connexion Internet.',

    startBtnText: 'Démarrer',
    startMenuHome: "Retour à l'Accueil (Tableau de Bord)",
    startMenuAddCard: 'Ajouter une Carte Anonyme',
    startMenuShareQr: 'Partager Session Rétro (Code QR)',
    startMenuExport: 'Exporter Rapport Rétro (.txt)',
    startMenuSound: 'Effets Sonores (Activé/Désactivé)',
    startMenuTheme: 'Thème Sombre / Clair',
    startMenuInstall: 'Installer PixelSprint.exe (PWA)',
    startMenuAbout: 'À propos',
    startMenuClear: 'Effacer Tableau',

    badgeOnline: '🛜 EN LIGNE',
    badgeOffline: '📡❌ ERR_RETRO_HORS_LIGNE',
    badgeP2pSync: '🟢 SYNC P2P'
  }
};
