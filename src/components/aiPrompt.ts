/**
 * PixelSprint AI Prompt Generator Component (TypeScript)
 * Generates tailored prompts for LLMs (ChatGPT, Claude, Gemini) to analyze Retrospective results
 * Supports TR, EN, FR localization, multiple persona roles, analysis templates, and custom focus areas.
 */

import { store } from '../core/store';
import { audioSynth } from '../core/audio';
import { i18n } from '../i18n';
import { CATEGORIES } from '../utils/constants';
import { RetroCategory, AiAnalysisType, AiRole, Language } from '../types';

export class AiPromptComponent {
  private modalAiPrompt: HTMLElement | null;
  private btnOpenAiPrompt: HTMLElement | null;
  private smAiPrompt: HTMLElement | null;
  private selectAnalysisType: HTMLSelectElement | null;
  private selectRole: HTMLSelectElement | null;
  private selectLang: HTMLSelectElement | null;
  private inputCustomFocus: HTMLInputElement | null;
  private promptTextArea: HTMLTextAreaElement | null;
  private btnCopyPrompt: HTMLElement | null;
  private btnOpenChatGpt: HTMLElement | null;
  private btnOpenClaude: HTMLElement | null;
  private btnOpenGemini: HTMLElement | null;
  private startMenu: HTMLElement | null;

  constructor() {
    this.modalAiPrompt = document.getElementById('modal-ai-prompt');
    this.btnOpenAiPrompt = document.getElementById('btn-open-ai-prompt');
    this.smAiPrompt = document.getElementById('sm-ai-prompt');
    this.selectAnalysisType = document.getElementById('select-ai-type') as HTMLSelectElement | null;
    this.selectRole = document.getElementById('select-ai-role') as HTMLSelectElement | null;
    this.selectLang = document.getElementById('select-ai-lang') as HTMLSelectElement | null;
    this.inputCustomFocus = document.getElementById('input-ai-focus') as HTMLInputElement | null;
    this.promptTextArea = document.getElementById('ai-prompt-text-area') as HTMLTextAreaElement | null;
    this.btnCopyPrompt = document.getElementById('btn-copy-prompt');
    this.btnOpenChatGpt = document.getElementById('btn-open-chatgpt');
    this.btnOpenClaude = document.getElementById('btn-open-claude');
    this.btnOpenGemini = document.getElementById('btn-open-gemini');
    this.startMenu = document.getElementById('start-menu');
  }

  public init(): void {
    i18n.subscribe(() => this.updateLocalizedText());

    if (this.btnOpenAiPrompt) {
      this.btnOpenAiPrompt.addEventListener('click', () => this.showAiModal());
    }
    if (this.smAiPrompt) {
      this.smAiPrompt.addEventListener('click', () => this.showAiModal());
    }

    // Dynamic prompt update listeners
    [this.selectAnalysisType, this.selectRole, this.selectLang].forEach((select) => {
      if (select) {
        select.addEventListener('change', () => this.updateGeneratedPrompt());
      }
    });

    if (this.inputCustomFocus) {
      this.inputCustomFocus.addEventListener('input', () => this.updateGeneratedPrompt());
    }

    // Action buttons
    if (this.btnCopyPrompt) {
      this.btnCopyPrompt.addEventListener('click', () => this.copyPromptToClipboard());
    }

    if (this.btnOpenChatGpt) {
      this.btnOpenChatGpt.addEventListener('click', () => {
        audioSynth.playClick();
        window.open('https://chatgpt.com', '_blank');
      });
    }

    if (this.btnOpenClaude) {
      this.btnOpenClaude.addEventListener('click', () => {
        audioSynth.playClick();
        window.open('https://claude.ai', '_blank');
      });
    }

    if (this.btnOpenGemini) {
      this.btnOpenGemini.addEventListener('click', () => {
        audioSynth.playClick();
        window.open('https://gemini.google.com', '_blank');
      });
    }

    this.updateLocalizedText();
  }

  private updateLocalizedText(): void {
    if (this.btnOpenAiPrompt) {
      this.btnOpenAiPrompt.innerHTML = `<span>🤖</span> ${i18n.t('btnAiPrompt')}`;
    }

    const txtModalAiTitle = document.getElementById('txt-modal-ai-title');
    const txtAiModalDesc = document.getElementById('txt-ai-modal-desc');
    const txtLabelAiType = document.getElementById('txt-label-ai-type');
    const txtLabelAiRole = document.getElementById('txt-label-ai-role');
    const txtLabelAiLang = document.getElementById('txt-label-ai-lang');
    const txtLabelAiFocus = document.getElementById('txt-label-ai-focus');
    const txtLabelAiGenerated = document.getElementById('txt-label-ai-generated');

    if (txtModalAiTitle) txtModalAiTitle.textContent = i18n.t('modalAiTitle');
    if (txtAiModalDesc) txtAiModalDesc.textContent = i18n.t('aiModalDesc');
    if (txtLabelAiType) txtLabelAiType.textContent = i18n.t('aiAnalysisTypeLabel');
    if (txtLabelAiRole) txtLabelAiRole.textContent = i18n.t('aiRoleLabel');
    if (txtLabelAiLang) txtLabelAiLang.textContent = i18n.t('aiLangLabel');
    if (txtLabelAiFocus) txtLabelAiFocus.textContent = i18n.t('aiCustomFocusLabel');
    if (txtLabelAiGenerated) txtLabelAiGenerated.textContent = i18n.t('aiGeneratedPromptLabel');

    if (this.inputCustomFocus) {
      this.inputCustomFocus.placeholder = i18n.t('aiCustomFocusPlaceholder');
    }

    if (this.btnCopyPrompt) this.btnCopyPrompt.textContent = i18n.t('btnCopyPrompt');
    if (this.btnOpenChatGpt) this.btnOpenChatGpt.textContent = i18n.t('btnOpenChatGpt');
    if (this.btnOpenClaude) this.btnOpenClaude.textContent = i18n.t('btnOpenClaude');
    if (this.btnOpenGemini) this.btnOpenGemini.textContent = i18n.t('btnOpenGemini');

    // Update preset option texts
    const optSummary = document.getElementById('opt-ai-summary');
    const optActionPlan = document.getElementById('opt-ai-action-plan');
    const optRootCause = document.getElementById('opt-ai-root-cause');
    const optSentiment = document.getElementById('opt-ai-sentiment');
    const optJira = document.getElementById('opt-ai-jira');

    if (optSummary) optSummary.textContent = i18n.t('aiPresetSummary');
    if (optActionPlan) optActionPlan.textContent = i18n.t('aiPresetActionPlan');
    if (optRootCause) optRootCause.textContent = i18n.t('aiPresetRootCause');
    if (optSentiment) optSentiment.textContent = i18n.t('aiPresetSentiment');
    if (optJira) optJira.textContent = i18n.t('aiPresetJira');

    // Update role option texts
    const optCoach = document.getElementById('opt-role-coach');
    const optScrum = document.getElementById('opt-role-scrum');
    const optExec = document.getElementById('opt-role-exec');
    const optPeer = document.getElementById('opt-role-peer');

    if (optCoach) optCoach.textContent = i18n.t('aiRoleAgileCoach');
    if (optScrum) optScrum.textContent = i18n.t('aiRoleScrumMaster');
    if (optExec) optExec.textContent = i18n.t('aiRoleExecutive');
    if (optPeer) optPeer.textContent = i18n.t('aiRolePeer');
  }

  public showAiModal(): void {
    audioSynth.playClick();

    // Default select current app language if not set
    if (this.selectLang && !this.selectLang.value) {
      this.selectLang.value = i18n.getLanguage();
    }

    this.updateGeneratedPrompt();

    if (this.startMenu) this.startMenu.classList.add('hidden');
    if (this.modalAiPrompt) this.modalAiPrompt.classList.remove('hidden');
  }

  public updateGeneratedPrompt(): void {
    if (!this.promptTextArea) return;
    this.promptTextArea.value = this.buildPrompt();
  }

  public buildPrompt(): string {
    const cards = store.getCards();
    const activeSession = store.getActiveSession();
    const sessionTitle = activeSession ? activeSession.title : 'Sprint Retrospective';
    const analysisType = (this.selectAnalysisType?.value || 'summary') as AiAnalysisType;
    const role = (this.selectRole?.value || 'agile_coach') as AiRole;
    const lang = (this.selectLang?.value || i18n.getLanguage()) as Language;
    const customFocus = this.inputCustomFocus?.value.trim() || '';

    return generateAiPromptText({
      sessionTitle,
      cards,
      analysisType,
      role,
      targetLanguage: lang,
      customFocus
    });
  }

  public copyPromptToClipboard(): void {
    if (!this.promptTextArea) return;
    this.promptTextArea.select();
    navigator.clipboard.writeText(this.promptTextArea.value).then(() => {
      audioSynth.playSuccess();
      alert(i18n.t('copyPromptSuccess'));
    });
  }
}

interface PromptBuilderOptions {
  sessionTitle: string;
  cards: ReturnType<typeof store.getCards>;
  analysisType: AiAnalysisType;
  role: AiRole;
  targetLanguage: Language;
  customFocus: string;
}

export function generateAiPromptText(opts: PromptBuilderOptions): string {
  const { sessionTitle, cards, analysisType, role, targetLanguage, customFocus } = opts;

  // 1. Role / Persona Directive
  const roleInstructions: Record<AiRole, Record<Language, string>> = {
    agile_coach: {
      tr: "Sen kıdemli ve deneyimli bir Agile Coach'sun. Amacın ekibin sürekli gelişimine, psikolojik güvenliğine ve retrospektif verilerinden somut içgörüler çıkarmaya rehberlik etmektir.",
      en: 'You are a senior and experienced Agile Coach. Your goal is to guide continuous team improvement, psychological safety, and extract actionable insights from retro data.',
      fr: "Vous êtes un Coach Agile senior et expérimenté. Votre objectif est de guider l'amélioration continue de l'équipe, la sécurité psychologique et d'extraire des enseignements probants des données rétro."
    },
    scrum_master: {
      tr: "Sen pratik bir Scrum Master'sın. Amacın sprint engellerini kaldırmak, süreç aksaklıklarını netleştirmek ve sonraki sprint için gerçekçi aksiyon maddeleri belirlemektir.",
      en: 'You are a pragmatic Scrum Master. Your goal is to remove sprint blockers, address process bottlenecks, and define realistic action items for the upcoming sprint.',
      fr: "Vous êtes un Scrum Master pragmatique. Votre objectif est d'éliminer les obstacles du sprint, de traiter les goulots d'étranglement et de définir des actions réalistes pour le prochain sprint."
    },
    executive: {
      tr: 'Sen bir Mühendislik Direktörü / VP of Engineering sin. Amacın sprint sonuçlarını üst düzey stratejik riskler, ekip verimliliği ve çıktılar açısından öz ve net şekilde değerlendirmektir.',
      en: 'You are an Engineering Director / VP of Engineering. Your goal is to evaluate retro results concisely from an executive perspective of strategic risks, team velocity, and outcomes.',
      fr: "Vous êtes un Directeur de l'Ingénierie. Votre objectif est d'évaluer les résultats de la rétro de manière concise du point de vue de la direction (risques stratégiques, efficacité)."
    },
    peer: {
      tr: 'Sen ekibin içinde çalışan empati sahibi, doğrudan ve yapıcı bir Kıdemli Yazılım Geliştiricisisin. İletişim dilin samimi, pratik ve çözüm odaklı olmalıdır.',
      en: 'You are an empathetic, direct, and constructive Senior Software Engineer on the team. Your communication style is supportive, practical, and solution-focused.',
      fr: "Vous êtes un développeur senior empathique, direct et constructif dans l'équipe. Votre communication est bienveillante, pratique et axée sur les solutions."
    }
  };

  // 2. Goal / Analysis Type Directive
  const analysisDirectives: Record<AiAnalysisType, Record<Language, string>> = {
    summary: {
      tr: `Lütfen aşağıdaki Retrospektif verilerini analiz et ve şu bölümleri içeren kapsamlı bir özet sun:
1. 🌟 **Öne Çıkan Başarılar & Neyi İyi Yaptık**: Ekibin en çok takdir ettiği noktalar ve güç kaynakları.
2. ⚠️ **Temel Sorunlar & İyileştirme Alanları**: Ekibi yavaşlatan ana aksaklıklar ve tekrarlayan temalar.
3. 🎯 **En Kritik 3 Çıkarım & Tavsiye**: Ekibin hemen odaklanması gereken ana konular.`,
      en: `Please analyze the Retrospective data below and provide a comprehensive summary including:
1. 🌟 **Highlights & What Went Well**: Key team achievements and strengths.
2. ⚠️ **Core Issues & Areas for Improvement**: Main bottlenecks slowing down the team and recurring themes.
3. 🎯 **Top 3 Insights & Recommendations**: Key focus areas for the team.`,
      fr: `Veuillez analyser les données de rétrospective ci-dessous et fournir un résumé complet comprenant :
1. 🌟 **Points Forts & Ce Qui S'est Bien Passé** : Principales réussites et forces de l'équipe.
2. ⚠️ **Problèmes Majeurs & Axes d'Amélioration** : Goulots d'étranglement majeurs et thèmes récurrents.
3. 🎯 **Top 3 Enseignements & Recommandations** : Domaines prioritaires d'attention pour l'équipe.`
    },
    action_plan: {
      tr: `Lütfen aşağıdaki Retrospektif verilerinden yola çıkarak uygulanabilir, önceliklendirilmiş bir Aksiyon Planı hazırla:
1. 🚀 **SMART Aksiyon Maddeleri**: (Spesifik, Ölçülebilir, Ulaşılabilir, İlgili, Zamana Bağlı).
2. 📌 **Öncelik Seviyesi**: (Yüksek / Orta / Düşük) - Oy sayılarını ve oy skorlarını göz önüne al.
3. 👤 **Önerilen Sorumlu Rol**: (Örn. Tech Lead, Scrum Master, QA Lead, Tüm Ekip).
4. 📏 **Başarı Kriteri**: Aksiyonun tamamlandığını nasıl anlayacağız?`,
      en: `Based on the Retrospective data below, please construct an actionable, prioritized Action Plan:
1. 🚀 **SMART Action Items**: (Specific, Measurable, Achievable, Relevant, Time-bound).
2. 📌 **Priority Levels**: (High / Medium / Low) - Taking upvotes and score into consideration.
3. 👤 **Suggested Owner Role**: (e.g., Tech Lead, Scrum Master, QA Lead, Whole Team).
4. 📏 **Success Metric**: How will we verify that the action item is fulfilled?`,
      fr: `À partir des données de rétrospective ci-dessous, veuillez élaborer un plan d'action opérationnel et priorisé :
1. 🚀 **Actions SMART** : (Spécifiques, Mesurables, Atteignables, Réalistes, Temporelles).
2. 📌 **Niveaux de Priorité** : (Élevé / Moyen / Bas) - En tenant compte des votes et des scores.
3. 👤 **Rôle du Responsable Suggéré** : (ex. Tech Lead, Scrum Master, QA Lead, Équipe).
4. 📏 **Critère de Succès** : Comment vérifierons-nous la réalisation de l'action ?`
    },
    root_cause: {
      tr: `Lütfen özellikle "İyileştirme" (Needs Improvement) sütunundaki verilere odaklanarak bir Kök Neden Analizi yap:
1. 🔍 **5-Whys (5 Neden) Analizi**: En çok oy alan veya en kritik sorunların derindeki kök nedenlerini sorgula.
2. ⚙️ **Süreç & Sistemik Aksaklıklar**: Bireysel hatalardan ziyade sistemik/süreçsel eksiklikleri tespit et.
3. 🛠️ **Önleyici Tedbirler**: Benzer sorunların gelecek sprintlerde tekrarlanmaması için uzun vadeli çözümler öner.`,
      en: `Focusing primarily on items in the "Needs Improvement" column, please perform a Root Cause Analysis:
1. 🔍 **5-Whys Analysis**: Explore the underlying root causes behind the highest-voted or most critical problems.
2. ⚙️ **Process & Systemic Friction**: Identify systemic and process gaps rather than individual blame.
3. 🛠️ **Preventive Safeguards**: Propose long-term solutions to prevent recurrence in future sprints.`,
      fr: `En vous concentrant principalement sur les éléments de la colonne "Améliorations", effectuez une analyse des causes racines :
1. 🔍 **Analyse des 5 Pourquoi** : Explorez les causes sous-jacentes des problèmes les plus critiques.
2. ⚙️ **Frictions Systémiques & Processus** : Identifiez les lacunes organisationnelles.
3. 🛠️ **Mesures Préventives** : Proposez des solutions à long terme pour éviter toute récidive.`
    },
    sentiment: {
      tr: `Lütfen aşağıdaki Retrospektif verilerini ekip duygu durumu, psikolojik güvenlik ve moral açısından analiz et:
1. 🌡️ **Genel Ekip Morali & Atmosfer**: Ekibin enerjisi ve genel hissi pozitif mi, kaygılı mı, tükenmiş mi?
2. 🛡️ **Psikolojik Güvenlik Göstergeleri**: Ekip üyeleri sorunları açıkça ifade edebilmiş mi? Şeffaflık seviyesi nasıl?
3. 💡 **Ekip Ruhunu Yükseltecek Öneriler**: Motivasyonu ve birlikteliği artırmak için somut adımlar.`,
      en: `Please analyze the Retrospective data below from a Team Sentiment, Psychological Safety, and Morale perspective:
1. 🌡️ **Overall Team Morale & Atmosphere**: Is the team energy positive, anxious, burnout-prone, or constructive?
2. 🛡️ **Psychological Safety Signals**: Did team members feel safe expressing blockers and frustrations openly?
3. 💡 **Morale-Boosting Recommendations**: Tangible steps to boost motivation and team spirit.`,
      fr: `Veuillez analyser les données ci-dessous sous l'angle du moral de l'équipe et de la sécurité psychologique :
1. 🌡️ **Moral Général & Climat de l'Équipe** : L'énergie globale est-elle positive, anxieuse ou motivée ?
2. 🛡️ **Signaux de Sécurité Psychologique** : Les membres ont-ils pu s'exprimer librement ?
3. 💡 **Recommandations pour Stimuler le Moral** : Mesures concrètes pour renforcer l'esprit d'équipe.`
    },
    jira: {
      tr: `Lütfen aşağıdaki Aksiyon ve İyileştirme maddelerini Jira / Issue Tracker formatına dönüştür:
1. 🎫 **Jira Bilet Başlığı**: Clear and concise title.
2. 📝 **Açıklama & Problem Tanımı**: Maddenin özeti.
3. ✅ **Kabul Kriterleri (Acceptance Criteria)**: Given / When / Then formatında net teslimat şartları.
4. 🏷️ **Önerilen Etiketler & Tür**: (Bug, Story, Task, Improvement).`,
      en: `Please convert the Action and Improvement items below into structured Jira / Issue Tracker tickets:
1. 🎫 **Ticket Summary**: Clear, concise issue summary.
2. 📝 **Description & Problem Statement**: Context from retro cards.
3. ✅ **Acceptance Criteria**: Concrete Given / When / Then criteria.
4. 🏷️ **Labels & Issue Type**: (Bug, Story, Task, Process Improvement).`,
      fr: `Veuillez convertir les éléments d'action et d'amélioration ci-dessous en tickets Jira structurés :
1. 🎫 **Résumé du Ticket** : Titre clair et précis.
2. 📝 **Description & Problématique** : Contexte issu des cartes rétro.
3. ✅ **Critères d'Acceptation** : Conditions de validation explicites.
4. 🏷️ **Étiquettes & Type de Ticket** : (Bug, Story, Task, Amélioration).`
    }
  };

  // 3. Language Directive
  const langDirectives: Record<Language, string> = {
    tr: 'Lütfen tüm yanıtını Türkçe dilinde ver.',
    en: 'Please provide your entire response in English.',
    fr: 'Veuillez fournir toute votre réponse en français.'
  };

  // 4. Formatting Retro Cards Data
  let dataText = '';
  CATEGORIES.forEach((cat) => {
    const catCards = cards.filter((c) => c.category === cat.key);
    const catTitleMap: Record<RetroCategory, string> = {
      went_well: '🟢 Went Well / Neyi İyi Yaptık',
      improvement: '🔴 Needs Improvement / İyileştirilmeli',
      action: '💡 Action Items / Aksiyonlar & Fikirler'
    };

    dataText += `### ${catTitleMap[cat.key]} (${catCards.length})\n`;
    if (catCards.length === 0) {
      dataText += `*(Yok / Empty)*\n\n`;
    } else {
      catCards.forEach((card, idx) => {
        const up = card.upvotes || 0;
        const down = card.downvotes || 0;
        const score = up - down;
        const scoreStr = score > 0 ? `+${score}` : `${score}`;
        dataText += `${idx + 1}. [${card.author}] [Score: ${scoreStr} (▲${up} / ▼${down})]\n   "${card.text.replace(/\n/g, '\n   ')}"\n`;
      });
      dataText += `\n`;
    }
  });

  // Assemble full Prompt
  let prompt = `===================================================\n`;
  prompt += `🤖 PIXELSPRINT - AI RETROSPECTIVE ANALYSIS PROMPT\n`;
  prompt += `===================================================\n\n`;

  prompt += `## 1. ROL VE KİMLİK / ROLE DIRECTIVE\n`;
  prompt += `${roleInstructions[role][targetLanguage]}\n\n`;

  prompt += `## 2. GÖREV VE HEDEF / GOAL & TASK\n`;
  prompt += `${analysisDirectives[analysisType][targetLanguage]}\n\n`;

  if (customFocus) {
    prompt += `## 3. ÖZEL ODAK NOKTASI / CUSTOM FOCUS INSTRUCTIONS\n`;
    prompt += `📌 ${customFocus}\n\n`;
  }

  prompt += `## 4. DİL TALİMATI / LANGUAGE DIRECTIVE\n`;
  prompt += `${langDirectives[targetLanguage]}\n\n`;

  prompt += `## 5. SPRINT RETROSPEKTİF VERİLERİ / RETRO DATA\n`;
  prompt += `**Sprint Title:** ${sessionTitle}\n`;
  prompt += `**Total Notes:** ${cards.length}\n\n`;
  prompt += dataText;

  prompt += `===================================================\n`;
  prompt += `Lütfen yukarıdaki talimatları göz önüne alarak analiz raporunu sun.\n`;

  return prompt;
}
