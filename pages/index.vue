<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center space-x-3">
            <img src="/brand/logo.png" alt="Partnergize" class="h-22 w-20 rounded-2xl object-contain bg-white/80 p-1.5 shadow-md ring-1 ring-slate-200 translate-y-2 sm:translate-y-3 -mb-3 relative z-10" />
            <div class="flex items-center gap-3">
              <!-- <h1 class="text-2xl font-bold text-primary">{{ t('app.name') }}</h1> -->
              <div class="flex items-center gap-1 bg-white/80 border border-slate-200 rounded-full p-1">
                <button
                  v-for="l in availableLocales"
                  :key="l.code"
                  type="button"
                  @click="setLocale(l.code)"
                  :class="['text-xs px-2 py-1 rounded-full', locale === l.code ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100']"
                >
                  {{ l.label }}
                </button>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-center space-x-1">
              <a href="#how-it-works" class="text-slate-600 hover:text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">{{ t('nav.howItWorks') }}</a>
              <a href="#requirements" class="text-slate-600 hover:text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">{{ t('nav.requirements') }}</a>
              <a href="#faq" class="text-slate-600 hover:text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">{{ t('nav.faq') }}</a>
              <a href="#about" class="text-slate-600 hover:text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">{{ t('nav.about') }}</a>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <NuxtLink to="/login" class="btn-outline text-sm px-4 py-2 rounded-lg">
              {{ t('auth.signIn') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-7xl mx-auto">
          <div class="text-center">
          <div class="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            {{ t('hero.badge') }}
          </div>
          
          <h1 class="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
            {{ t('hero.titleLine1') }}<br>
            <span class="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">{{ t('hero.titleLine2') }}</span>
          </h1>
          
          <p class="text-xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {{ t('hero.subtitle1') }}
          </p>
          
          <p class="text-lg text-slate-700 mb-12 max-w-3xl mx-auto font-medium">
            {{ t('hero.subtitle2') }}
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              @click="showRegistrationForm = true"
              class="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>{{ t('cta.getStarted') }}</span>
            </button>
            <button 
              @click="scrollToSection('how-it-works')"
              class="btn-outline text-lg px-8 py-4 flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-8V6a2 2 0 114 0v1M7 7h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z"></path>
              </svg>
              <span>{{ t('cta.learnMore') }}</span>
            </button>
          </div>
          
          <!-- Trust indicators -->
          <div class="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-500">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-sm font-medium">{{ t('trust.trustedBy') }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              <span class="text-sm font-medium">{{ t('trust.paidTrainingPrograms') }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
              <span class="text-sm font-medium">{{ t('trust.flexibleScheduling') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <div class="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            {{ t('hiw.badge') }}
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{{ t('hiw.title') }}</h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">{{ t('hiw.subtitle') }}</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="card p-8 text-center group hover:scale-105 transition-transform duration-300">
            <div class="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">1</div>
            <h3 class="text-xl font-semibold mb-4 text-slate-900">{{ t('hiw.step1.title') }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ t('hiw.step1.desc') }}</p>
          </div>
          
          <div class="card p-8 text-center group hover:scale-105 transition-transform duration-300">
            <div class="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
              </svg>
            </div>
            <div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">2</div>
            <h3 class="text-xl font-semibold mb-4 text-slate-900">{{ t('hiw.step2.title') }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ t('hiw.step2.desc') }}</p>
          </div>
          
          <div class="card p-8 text-center group hover:scale-105 transition-transform duration-300">
            <div class="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">3</div>
            <h3 class="text-xl font-semibold mb-4 text-slate-900">{{ t('hiw.step3.title') }}</h3>
            <p class="text-slate-600 leading-relaxed mb-3">{{ t('hiw.step3.desc') }}</p>
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p class="text-sm text-amber-800 font-medium">{{ t('hiw.step3.note') }}</p>
            </div>
          </div>
          
          <div class="card p-8 text-center group hover:scale-105 transition-transform duration-300">
            <div class="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">4</div>
            <h3 class="text-xl font-semibold mb-4 text-slate-900">{{ t('hiw.step4.title') }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ t('hiw.step4.desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-24 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <div class="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            {{ t('wcu.badge') }}
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{{ t('wcu.title') }}</h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">{{ t('hero.subtitle2') }}</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card p-8 group hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-slate-900">{{ t('wcu.card1.title') }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ t('wcu.card1.desc') }}</p>
          </div>
          
          <div class="card p-8 group hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-slate-900">{{ t('wcu.card2.title') }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ t('wcu.card2.desc') }}</p>
          </div>
          
          <div class="card p-8 group hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-slate-900">{{ t('wcu.card3.title') }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ t('wcu.card3.desc') }}</p>
          </div>
          
          <div class="card p-8 group hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-slate-900">{{ t('wcu.card4.title') }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ t('wcu.card4.desc') }}</p>
          </div>
          
          <div class="card p-8 group hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-slate-900">{{ t('wcu.card5.title') }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ t('wcu.card5.desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Requirements -->
    <section id="requirements" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ t('req.title') }}</h2>
        </div>
        
        <div class="max-w-2xl mx-auto">
          <div class="bg-gray-50 p-8 rounded-lg">
            <ul class="space-y-4">
              <li class="flex items-center">
                <span class="text-green-500 text-xl mr-3">✓</span>
                <span class="text-gray-700">{{ t('req.item.workspace') }}</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 text-xl mr-3">✓</span>
                <span class="text-gray-700">{{ t('req.item.desktop') }}</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 text-xl mr-3">✓</span>
                <span class="text-gray-700">{{ t('req.item.internet') }}</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 text-xl mr-3">✓</span>
                <span class="text-gray-700">{{ t('req.item.headset') }}</span>
              </li>
              <li class="flex items-center">
                <span class="text-green-500 text-xl mr-3">✓</span>
                <span class="text-gray-700">{{ t('req.item.training') }}</span>
              </li>
            </ul>
            <p class="text-sm text-gray-600 mt-6 italic">{{ t('req.note') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="py-20 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ t('faq.title') }}</h2>
        </div>
        
        <div class="space-y-6">
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="text-lg font-semibold mb-2">{{ t('faq.q1') }}</h3>
            <p class="text-gray-600">{{ t('faq.a1') }}</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="text-lg font-semibold mb-2">{{ t('faq.q2') }}</h3>
            <p class="text-gray-600">{{ t('faq.a2') }}</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="text-lg font-semibold mb-2">{{ t('faq.q3') }}</h3>
            <p class="text-gray-600">{{ t('faq.a3') }}</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="text-lg font-semibold mb-2">{{ t('faq.q4') }}</h3>
            <p class="text-gray-600">{{ t('faq.a4') }}</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="text-lg font-semibold mb-2">{{ t('faq.q5') }}</h3>
            <p class="text-gray-600">{{ t('faq.a5') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{{ t('about.title') }}</h2>
        
        <div class="prose prose-lg mx-auto text-gray-600">
          <p class="mb-6">
            {{ t('about.p1') }}
          </p>
          <p class="mb-6">
            {{ t('about.p2') }}
          </p>
          <p class="mb-6">
            {{ t('about.p3') }}
          </p>
          <p class="mb-8">
            {{ t('about.p4') }}
          </p>
        </div>
        
        <p class="text-xl font-semibold text-blue-600">{{ t('about.tagline') }}</p>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-20 bg-blue-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">{{ t('final.title') }}</h2>
        <p class="text-xl text-blue-100 mb-8">{{ t('final.subtitle') }}</p>
        <button 
          @click="showRegistrationForm = true"
          class="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-colors"
        >
          {{ t('final.button') }}
        </button>
        <p class="text-lg font-semibold text-white mt-6">{{ t('final.tagline') }}</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-2xl font-bold mb-4">Partnergize</h3>
            <p class="text-gray-400">{{ t('footer.mission') }}</p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">{{ t('footer.nav') }}</h4>
            <ul class="space-y-2">
              <li><a href="#how-it-works" class="text-gray-400 hover:text-white">{{ t('nav.howItWorks') }}</a></li>
              <li><a href="#requirements" class="text-gray-400 hover:text-white">{{ t('nav.requirements') }}</a></li>
              <li><a href="#faq" class="text-gray-400 hover:text-white">{{ t('nav.faq') }}</a></li>
              <li><a href="#about" class="text-gray-400 hover:text-white">{{ t('nav.about') }}</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">{{ t('footer.contact') }}</h4>
            <p class="text-gray-400">{{ t('footer.ready') }}</p>
            <button 
              @click="showRegistrationForm = true"
              class="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              {{ t('footer.apply') }}
            </button>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Partnergize. {{ t('footer.rights') }}</p>
        </div>
      </div>
    </footer>

    <!-- Registration Form Modal -->
    <div v-if="showRegistrationForm" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
        <div class="flex justify-between items-center mb-8">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-900">{{ t('reg.title') }}</h3>
          </div>
          <button @click="showRegistrationForm = false" class="text-slate-400 hover:text-slate-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="handleRegistration" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">{{ t('reg.fullName') }}</label>
            <input 
              v-model="form.name"
              type="text" 
              required
              class="input-field"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">{{ t('reg.email') }}</label>
            <input 
              v-model="form.email"
              type="email" 
              required
              class="input-field"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">{{ t('reg.phone') }}</label>
            <input 
              v-model="form.phone"
              type="tel" 
              required
              class="input-field"
              placeholder="Enter your phone number"
            />
          </div>
          
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <svg v-if="!isSubmitting" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isSubmitting ? 'Creating Account...' : t('reg.button') }}</span>
          </button>
        </form>
        
        <p class="text-sm text-slate-500 mt-6 text-center">
          {{ t('reg.policy') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '~/composables/useI18n'

const showRegistrationForm = ref(false)
const isSubmitting = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: ''
})

const { t, availableLocales, locale, setLocale } = useI18n()

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleRegistration = async () => {
  isSubmitting.value = true
  
  try {
    console.log('Starting registration for:', form.value.email)
    
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: form.value
    })
    
    console.log('Registration response:', response)
    
    if (response.success) {
      console.log('Registration successful, storing token and redirecting...')
      
      // Store token in localStorage as backup
      if (response.token) {
        localStorage.setItem('auth-token', response.token)
        console.log('Token stored in localStorage')
      }
      
      // Show success message briefly before redirect
      alert(`Welcome ${response.user.name}! You are now logged in and will be redirected to your dashboard.`)
      
      // Force a full page reload to ensure cookie is properly set
      window.location.href = '/dashboard'
    }
  } catch (error) {
    console.error('Registration failed:', error)
    const errorMessage = error.data?.statusMessage || error.message || 'Registration failed. Please try again.'
    alert(`Registration failed: ${errorMessage}`)
  } finally {
    isSubmitting.value = false
  }
}
</script>
