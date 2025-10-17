import { ref } from 'vue'

type Translations = Record<string, string>
type LocaleMap = Record<string, Translations>

const en: Translations = {
  'app.name': 'Partnergize',
  // Navigation
  'nav.howItWorks': 'How It Works',
  'nav.requirements': 'Requirements',
  'nav.faq': 'FAQ',
  'nav.about': 'About',
  'auth.userLogin': 'User Login',
  'auth.signInToAccount': 'Sign in to your account',
  'auth.email': 'Email address',
  'auth.password': 'Password',
  'auth.signIn': 'Sign in',
  'auth.dontHaveAccount': "Don't have an account?",
  'auth.registerHere': 'Register here',
  'nav.welcome': 'Welcome',
  'nav.logout': 'Logout',
  'admin.title': 'Partnergize Admin',
  'hero.badge': 'Professional Remote Work Opportunities',
  'hero.titleLine1': 'Work From Home.',
  'hero.titleLine2': 'Build Your Own Success.',
  'hero.subtitle1': 'Partner with trusted national brands and deliver customer support from the comfort of your home — on your terms.',
  'hero.subtitle2': 'You choose your client. You set your schedule. You take control of your future.',
  'cta.getStarted': 'Get Started',
  'cta.learnMore': 'Learn More',
  // Trust indicators
  'trust.trustedBy': 'Trusted by 1000+ Professionals',
  'trust.paidTrainingPrograms': 'Paid Training Programs',
  'trust.flexibleScheduling': 'Flexible Scheduling',
  // How it works
  'hiw.badge': 'Simple Process',
  'hiw.title': 'How It Works',
  'hiw.subtitle': 'Get started with our streamlined 4-step process designed to connect you with the perfect remote work opportunity.',
  'hiw.step1.title': 'Register with Our Network',
  'hiw.step1.desc': "Begin your journey by completing a quick registration. We'll guide you through connecting with available client opportunities in the virtual customer service industry.",
  'hiw.step2.title': 'Choose Your Client',
  'hiw.step2.desc': 'Browse open contracts and select the one that fits your interests, hours, and lifestyle. You pick what works for you!',
  'hiw.step3.title': 'Train and Get Certified',
  'hiw.step3.desc': 'Participate in paid training (2–5 weeks). 100% attendance is required to become certified and begin working.',
  'hiw.step3.note': '⚠️ Note: Incomplete training results in a $50 cancellation fee.',
  'hiw.step4.title': 'Start Earning from Home',
  'hiw.step4.desc': "Once certified, you'll begin taking calls for your chosen client — all from your home office setup.",
  // Why choose us
  'wcu.badge': 'Why Choose Us',
  'wcu.title': 'Why Work With Us',
  'wcu.card1.title': 'Transparent Path, No Surprises',
  'wcu.card1.desc': 'Know exactly what to expect from registration to certification. No hidden fees or confusing fine print.',
  'wcu.card2.title': 'Freedom to Choose',
  'wcu.card2.desc': 'You decide who to work with and when to work. Build your business around your life — not the other way around.',
  'wcu.card3.title': 'Paid Training',
  'wcu.card3.desc': 'Every client offers paid training before your contract begins, lasting 2–5 weeks. Compensation rates are set by each client.',
  'wcu.card4.title': 'Bring Your Own Setup',
  'wcu.card4.desc': "You'll use your own home office equipment that meets client requirements. Typical specs are provided during registration.",
  'wcu.card5.title': 'Reliable Support',
  'wcu.card5.desc': "You're never alone. Most platforms offer chat-based assistance for technical or onboarding support.",
  // Requirements
  'req.title': "What You'll Need to Get Started",
  'req.item.workspace': 'A quiet, dedicated workspace',
  'req.item.desktop': 'Desktop or laptop meeting client specifications',
  'req.item.internet': 'Wired high-speed internet connection',
  'req.item.headset': 'USB headset with noise-cancelling microphone',
  'req.item.training': 'Commitment to full attendance during training',
  'req.note': 'Equipment requirements and training duration may vary depending on the client.',
  // FAQ
  'faq.title': 'Frequently Asked Questions',
  'faq.q1': 'Do I need prior experience?',
  'faq.a1': 'No — professionalism, reliability, and a willingness to learn are what matter most.',
  'faq.q2': 'Can I choose my own hours?',
  'faq.a2': 'Yes. Each client offers flexible scheduling blocks, allowing you to work when it fits your life.',
  'faq.q3': 'Is training paid?',
  'faq.a3': "Yes — during the pre-contract phase. Training is paid at a lower rate as determined by each client's contract.",
  'faq.q4': 'Can I work more than one contract at a time?',
  'faq.a4': 'No. Only one active contract is permitted at a time.',
  'faq.q5': "What happens if I don't complete training?",
  'faq.a5': 'Failure to complete training will result in a $50 cancellation fee.',
  // About
  'about.title': 'Empowering Remote Professionals — One Opportunity at a Time',
  'about.p1': 'I started this business with one goal: to make legitimate work-from-home opportunities accessible, transparent, and empowering.',
  'about.p2': "I've been where you are — looking for flexibility, independence, and real income potential without the gimmicks or false promises.",
  'about.p3': "Here, you're not just another number in a system. You're building your own business, your own schedule, and your own success story — backed by clear expectations, fair pay, and a process that respects your time and effort.",
  'about.p4': "If you're ready to take control of your work life and earn from home with confidence — you're in the right place.",
  'about.tagline': 'Real opportunities. Real people. Real success.',
  // Final CTA
  'final.title': 'Ready to Start Working From Home?',
  'final.subtitle': 'Take the first step toward independence today.',
  'final.button': 'Apply Now',
  'final.tagline': 'Work your way. Earn your worth. Build your freedom.',
  // Footer
  'footer.nav': 'Navigation',
  'footer.contact': 'Contact',
  'footer.ready': 'Ready to get started?',
  'footer.apply': 'Apply Now',
  'footer.rights': 'All rights reserved.',
  'footer.mission': 'Connecting motivated professionals with real remote work opportunities.',
  // Registration modal
  'reg.title': 'Get Started',
  'reg.fullName': 'Full Name',
  'reg.email': 'Email Address',
  'reg.phone': 'Phone Number',
  'reg.button': 'Create Account',
  'reg.policy': 'By creating an account, you agree to our terms of service and privacy policy.',
}

const es: Translations = {
  'app.name': 'Partnergize',
  // Navigation
  'nav.howItWorks': 'Cómo Funciona',
  'nav.requirements': 'Requisitos',
  'nav.faq': 'Preguntas',
  'nav.about': 'Acerca de',
  'auth.userLogin': 'Inicio de sesión',
  'auth.signInToAccount': 'Inicia sesión en tu cuenta',
  'auth.email': 'Correo electrónico',
  'auth.password': 'Contraseña',
  'auth.signIn': 'Iniciar sesión',
  'auth.dontHaveAccount': '¿No tienes una cuenta?',
  'auth.registerHere': 'Regístrate aquí',
  'nav.welcome': 'Bienvenido',
  'nav.logout': 'Cerrar sesión',
  'admin.title': 'Administración Partnergize',
  'hero.badge': 'Oportunidades Profesionales de Trabajo Remoto',
  'hero.titleLine1': 'Trabaja Desde Casa.',
  'hero.titleLine2': 'Construye Tu Propio Éxito.',
  'hero.subtitle1': 'Colabora con marcas nacionales de confianza y brinda soporte al cliente desde tu hogar — en tus propios términos.',
  'hero.subtitle2': 'Tú eliges el cliente. Tú defines tu horario. Tú controlas tu futuro.',
  'cta.getStarted': 'Comenzar',
  'cta.learnMore': 'Saber más',
  // Trust indicators
  'trust.trustedBy': 'Con la confianza de más de 1000 profesionales',
  'trust.paidTrainingPrograms': 'Programas de capacitación pagada',
  'trust.flexibleScheduling': 'Horarios flexibles',
  // How it works
  'hiw.badge': 'Proceso Sencillo',
  'hiw.title': 'Cómo Funciona',
  'hiw.subtitle': 'Comienza con nuestro proceso de 4 pasos para conectarte con la oportunidad remota perfecta.',
  'hiw.step1.title': 'Regístrate en Nuestra Red',
  'hiw.step1.desc': 'Comienza completando un registro rápido. Te guiaremos para conectarte con oportunidades de clientes en el sector de atención al cliente virtual.',
  'hiw.step2.title': 'Elige Tu Cliente',
  'hiw.step2.desc': 'Revisa contratos disponibles y selecciona el que se ajuste a tus intereses y horario. ¡Tú eliges lo que te conviene!',
  'hiw.step3.title': 'Capacítate y Certifícate',
  'hiw.step3.desc': 'Participa en capacitación pagada (2–5 semanas). Se requiere 100% de asistencia para obtener la certificación y comenzar a trabajar.',
  'hiw.step3.note': '⚠️ Nota: No completar la capacitación genera una multa de $50.',
  'hiw.step4.title': 'Comienza a Ganar Desde Casa',
  'hiw.step4.desc': 'Una vez certificado, comenzarás a atender llamadas para tu cliente elegido — todo desde tu oficina en casa.',
  // Why choose us
  'wcu.badge': 'Por Qué Elegirnos',
  'wcu.title': 'Por Qué Trabajar Con Nosotros',
  'wcu.card1.title': 'Camino Transparente, Sin Sorpresas',
  'wcu.card1.desc': 'Sabrás exactamente qué esperar desde el registro hasta la certificación. Sin costos ocultos ni letras pequeñas confusas.',
  'wcu.card2.title': 'Libertad para Elegir',
  'wcu.card2.desc': 'Tú decides con quién trabajar y cuándo trabajar. Construye tu negocio alrededor de tu vida.',
  'wcu.card3.title': 'Capacitación Pagada',
  'wcu.card3.desc': 'Cada cliente ofrece capacitación pagada antes de iniciar el contrato, de 2 a 5 semanas. Las tarifas las define cada cliente.',
  'wcu.card4.title': 'Usa Tu Propio Equipo',
  'wcu.card4.desc': 'Usarás tu propio equipo de oficina en casa que cumpla los requisitos del cliente. Se proporcionan especificaciones durante el registro.',
  'wcu.card5.title': 'Soporte Confiable',
  'wcu.card5.desc': 'Nunca estarás solo. La mayoría de las plataformas ofrecen asistencia por chat para temas técnicos o de incorporación.',
  // Requirements
  'req.title': 'Lo que Necesitas para Empezar',
  'req.item.workspace': 'Un espacio de trabajo silencioso y dedicado',
  'req.item.desktop': 'Computadora de escritorio o portátil que cumpla con los requisitos',
  'req.item.internet': 'Conexión a internet de alta velocidad por cable',
  'req.item.headset': 'Diadema USB con micrófono con cancelación de ruido',
  'req.item.training': 'Compromiso de asistencia completa durante la capacitación',
  'req.note': 'Los requisitos de equipo y la duración de la capacitación pueden variar según el cliente.',
  // FAQ
  'faq.title': 'Preguntas Frecuentes',
  'faq.q1': '¿Necesito experiencia previa?',
  'faq.a1': 'No — lo más importante es profesionalismo, responsabilidad y ganas de aprender.',
  'faq.q2': '¿Puedo elegir mi propio horario?',
  'faq.a2': 'Sí. Cada cliente ofrece bloques de horarios flexibles para adaptarse a tu vida.',
  'faq.q3': '¿La capacitación es pagada?',
  'faq.a3': 'Sí — durante la fase previa al contrato. La tarifa la determina cada cliente.',
  'faq.q4': '¿Puedo trabajar en más de un contrato a la vez?',
  'faq.a4': 'No. Solo se permite un contrato activo a la vez.',
  'faq.q5': '¿Qué pasa si no completo la capacitación?',
  'faq.a5': 'No completar la capacitación generará una multa de $50.',
  // About
  'about.title': 'Empoderando Profesionales Remotos — Una Oportunidad a la Vez',
  'about.p1': 'Comencé este negocio con un objetivo: hacer accesibles, transparentes y poderosas las oportunidades legítimas de trabajo desde casa.',
  'about.p2': 'Yo también he estado en tu lugar — buscando flexibilidad, independencia y verdadero potencial de ingresos sin trucos ni falsas promesas.',
  'about.p3': 'Aquí no eres un número más. Estás construyendo tu propio negocio, tu propio horario y tu propia historia de éxito — con expectativas claras, pago justo y un proceso que respeta tu tiempo y esfuerzo.',
  'about.p4': 'Si estás listo para tomar el control de tu vida laboral y ganar desde casa con confianza — estás en el lugar correcto.',
  'about.tagline': 'Oportunidades reales. Personas reales. Éxitos reales.',
  // Final CTA
  'final.title': '¿Listo para Trabajar Desde Casa?',
  'final.subtitle': 'Da el primer paso hacia la independencia hoy.',
  'final.button': 'Postúlate Ahora',
  'final.tagline': 'Trabaja a tu manera. Gana lo que mereces. Construye tu libertad.',
  // Footer
  'footer.nav': 'Navegación',
  'footer.contact': 'Contacto',
  'footer.ready': '¿Listo para empezar?',
  'footer.apply': 'Postúlate Ahora',
  'footer.rights': 'Todos los derechos reservados.',
  'footer.mission': 'Conectamos profesionales motivados con oportunidades reales de trabajo remoto.',
  // Registration modal
  'reg.title': 'Comienza',
  'reg.fullName': 'Nombre Completo',
  'reg.email': 'Correo Electrónico',
  'reg.phone': 'Número de Teléfono',
  'reg.button': 'Crear Cuenta',
  'reg.policy': 'Al crear una cuenta, aceptas nuestros términos de servicio y política de privacidad.',
}

const locales: LocaleMap = { en, es }
const availableLocales = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' }
]

export function useI18n() {
  const locale = useState<string>('pgz-locale', () => {
    if (process.client) {
      return localStorage.getItem('pgz-locale') || 'en'
    }
    return 'en'
  })

  const setLocale = (code: string) => {
    if (!locales[code]) return
    locale.value = code
    if (process.client) localStorage.setItem('pgz-locale', code)
  }

  const t = (key: string): string => {
    const dict = locales[locale.value] || en
    return dict[key] || en[key] || key
  }

  return { t, locale, setLocale, availableLocales }
}


