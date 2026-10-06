import React, { useState, useMemo, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { 
  CAMPAIGN_POSTS, 
  getTotals, 
  getPlatformTotals, 
  PostItem 
} from './data/campaignData';
import { 
  Eye, 
  Users, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  ExternalLink, 
  TrendingUp, 
  Layers, 
  Filter, 
  RotateCcw, 
  FileSpreadsheet, 
  Printer, 
  Search,
  MousePointerClick,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'data' | 'impressoes' | 'interacoes' | 'engajamento'>('data');
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Refs para os canvas dos gráficos
  const chartStackedRef = useRef<HTMLCanvasElement | null>(null);
  const chartDoughnutRef = useRef<HTMLCanvasElement | null>(null);
  const chartBarComparativoRef = useRef<HTMLCanvasElement | null>(null);

  // Instâncias do Chart.js
  const chartStackedInstance = useRef<Chart | null>(null);
  const chartDoughnutInstance = useRef<Chart | null>(null);
  const chartBarComparativoInstance = useRef<Chart | null>(null);

  // Filtragem dos posts
  const filteredPosts = useMemo(() => {
    return CAMPAIGN_POSTS.filter(post => {
      if (platformFilter !== 'all' && post.plataforma !== platformFilter) {
        return false;
      }
      if (dateFilter !== 'all' && post.data !== dateFilter) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchPlat = post.plataforma.toLowerCase().includes(q);
        const matchFormat = (post.formato || '').toLowerCase().includes(q);
        const matchGroup = post.grupo.toLowerCase().includes(q);
        const matchDay = post.diaSemana.toLowerCase().includes(q);
        const matchCat = post.categoria.toLowerCase().includes(q);
        if (!matchPlat && !matchFormat && !matchGroup && !matchDay && !matchCat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'impressoes') return b.impressoes - a.impressoes;
      if (sortBy === 'interacoes') return b.interacoes - a.interacoes;
      if (sortBy === 'engajamento') return b.engajamento - a.engajamento;
      return b.data.localeCompare(a.data);
    });
  }, [platformFilter, dateFilter, searchQuery, sortBy]);

  // Totais filtrados
  const totals = useMemo(() => getTotals(filteredPosts), [filteredPosts]);

  // Totais por plataforma
  const platformStats = useMemo(() => getPlatformTotals(filteredPosts), [filteredPosts]);

  // Formatação de números
  const formatNumber = (num: number) => new Intl.NumberFormat('pt-BR').format(num);

  // Dados para os Gráficos do Modelo dash-esquenta
  useEffect(() => {
    // 1. GRÁFICO 1: PERFORMANCE COMPARATIVA
    if (chartStackedRef.current) {
      if (chartStackedInstance.current) {
        chartStackedInstance.current.destroy();
      }

      let labels: string[] = [];
      let dataImpressoes: number[] = [];
      let dataAlcance: number[] = [];
      let dataInteracoes: number[] = [];

      if (platformFilter === 'all') {
        const plats = ['Instagram Feed', 'Instagram Stories', 'Facebook', 'Tiktok'];
        labels = plats;
        plats.forEach(plat => {
          const items = filteredPosts.filter(p => p.plataforma === plat);
          dataImpressoes.push(items.reduce((acc, p) => acc + p.impressoes, 0));
          dataAlcance.push(items.reduce((acc, p) => acc + p.alcance, 0));
          dataInteracoes.push(items.reduce((acc, p) => acc + p.interacoes, 0));
        });
      } else {
        const dates = ['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04'];
        labels = ['01/10 (Qui)', '02/10 (Sex)', '03/10 (Sáb)', '04/10 (Dom)'];
        dates.forEach(d => {
          const items = filteredPosts.filter(p => p.data === d);
          dataImpressoes.push(items.reduce((acc, p) => acc + p.impressoes, 0));
          dataAlcance.push(items.reduce((acc, p) => acc + p.alcance, 0));
          dataInteracoes.push(items.reduce((acc, p) => acc + p.interacoes, 0));
        });
      }

      chartStackedInstance.current = new Chart(chartStackedRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Impressões (Impactos)',
              data: dataImpressoes,
              backgroundColor: '#005599',
              borderRadius: 6
            },
            {
              label: 'Alcance Único',
              data: dataAlcance,
              backgroundColor: '#38bdf8',
              borderRadius: 6
            },
            {
              label: 'Interações',
              data: dataInteracoes,
              backgroundColor: '#F47920',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 750,
            easing: 'easeOutQuart'
          },
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#0f172a',
              titleColor: '#f8fafc',
              bodyColor: '#f8fafc',
              padding: 12,
              cornerRadius: 8,
              titleFont: { size: 13, weight: 'bold' },
              bodyFont: { size: 12 },
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';
                  if (label) label += ': ';
                  const val = context.parsed.y ?? 0;
                  return `${label}${new Intl.NumberFormat('pt-BR').format(val)}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                color: '#475569',
                font: { size: 12, weight: 'bold' }
              }
            },
            y: {
              grid: { color: '#f1f5f9' },
              ticks: {
                color: '#64748b',
                font: { size: 11 },
                callback: function (value: any) {
                  return (value / 1000000) >= 1 ? (value / 1000000).toFixed(1) + 'M' : (value / 1000) >= 1 ? (value / 1000) + 'k' : value;
                }
              }
            }
          }
        }
      });
    }

    // 2. GRÁFICO 2: ROSCA (DOUGHNUT) DAS INTERAÇÕES
    if (chartDoughnutRef.current) {
      if (chartDoughnutInstance.current) {
        chartDoughnutInstance.current.destroy();
      }

      const totalInt = totals.interacoes || 1;
      const curtidas = totals.curtidas || 0;
      const cliques = totals.cliquesLink || 0;
      const envios = totals.compartilhamentos || 0;
      const comentarios = totals.comentarios || 0;
      const salvos = totals.salvos || 0;
      const outrasAcoes = Math.max(0, totals.interacoes - (curtidas + cliques + envios + comentarios + salvos));

      const doughnutLabels = ['Curtidas / Reações', 'Cliques no Link (Stories)', 'Envios / Shares', 'Comentários / Resp.', 'Salvos', 'Outras Ações (Stories)'];
      const doughnutData = [curtidas, cliques, envios, comentarios, salvos, outrasAcoes];
      const doughnutColors = ['#F47920', '#005599', '#38bdf8', '#10B981', '#f59e0b', '#8b5cf6'];

      chartDoughnutInstance.current = new Chart(chartDoughnutRef.current, {
        type: 'doughnut',
        data: {
          labels: doughnutLabels,
          datasets: [
            {
              data: doughnutData,
              backgroundColor: doughnutColors,
              hoverOffset: 6,
              borderWidth: 2,
              borderColor: '#ffffff'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          animation: {
            animateScale: true,
            animateRotate: true,
            duration: 850
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#0f172a',
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: function (context) {
                  const label = context.label || '';
                  const val = (context.parsed as number) || 0;
                  const pct = ((val / totalInt) * 100).toFixed(1) + '%';
                  return ` ${label}: ${new Intl.NumberFormat('pt-BR').format(val)} (${pct})`;
                }
              }
            }
          }
        }
      });
    }

    // 3. GRÁFICO 3: BARRAS AGRUPADAS - ESFORÇO VS. RESULTADO
    if (chartBarComparativoRef.current) {
      if (chartBarComparativoInstance.current) {
        chartBarComparativoInstance.current.destroy();
      }

      const totalImp = totals.impressoes || 1;
      const totalInt = totals.interacoes || 1;

      const platforms = ['Instagram Feed', 'Instagram Stories', 'Facebook', 'Tiktok'];
      const pctImpactos = platforms.map(plat => {
        const sum = filteredPosts.filter(p => p.plataforma === plat).reduce((a, b) => a + b.impressoes, 0);
        return Number(((sum / totalImp) * 100).toFixed(1));
      });
      const pctInteracoes = platforms.map(plat => {
        const sum = filteredPosts.filter(p => p.plataforma === plat).reduce((a, b) => a + b.interacoes, 0);
        return Number(((sum / totalInt) * 100).toFixed(1));
      });

      chartBarComparativoInstance.current = new Chart(chartBarComparativoRef.current, {
        type: 'bar',
        data: {
          labels: platforms,
          datasets: [
            {
              label: '% Impactos (Impressões)',
              data: pctImpactos,
              backgroundColor: '#005599',
              borderRadius: 6
            },
            {
              label: '% Interações Geradas',
              data: pctInteracoes,
              backgroundColor: '#F47920',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 750,
            easing: 'easeOutQuart'
          },
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
                boxHeight: 12,
                usePointStyle: true,
                pointStyle: 'rectRounded',
                color: '#475569',
                font: { size: 11, weight: 'bold' }
              }
            },
            tooltip: {
              backgroundColor: '#0f172a',
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: function (context) {
                  return ` ${context.dataset.label}: ${context.parsed.y}%`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                color: '#475569',
                font: { size: 11, weight: 'bold' }
              }
            },
            y: {
              beginAtZero: true,
              max: 100,
              grid: { color: '#f1f5f9' },
              ticks: {
                color: '#64748b',
                callback: function (val: any) {
                  return val + '%';
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartStackedInstance.current) chartStackedInstance.current.destroy();
      if (chartDoughnutInstance.current) chartDoughnutInstance.current.destroy();
      if (chartBarComparativoInstance.current) chartBarComparativoInstance.current.destroy();
    };
  }, [filteredPosts, totals, platformFilter]);

  const handleResetFilters = () => {
    setPlatformFilter('all');
    setDateFilter('all');
    setSearchQuery('');
    setSortBy('data');
  };

  const handleCopyCsv = () => {
    const headers = 'Plataforma,Data,Dia,Categoria,Grupo,Sub Grupo,Alcance,Interações,Curtidas,Comentários,Envios,Salvos,Formato,Impressões,Engajamento';
    const rows = CAMPAIGN_POSTS.map(p => 
      `"${p.plataforma}","${p.dataDisplay}","${p.diaSemana}","${p.categoria}","${p.grupo}","${p.subGrupo || ''}",${p.alcance},${p.interacoes},${p.curtidas},${p.comentarios},${p.compartilhamentos},${p.salvos || 0},"${p.formato || ''}",${p.impressoes},"${p.engajamento}%"`
    );
    const csvContent = [headers, ...rows].join('\n');
    navigator.clipboard.writeText(csvContent).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 antialiased selection:bg-orange-100 selection:text-orange-900 pb-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">

        {/* 1. HEADER SUPERIOR */}
        <header className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 transition-all duration-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Logos & Título */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {/* Logo Assaí Atacadista */}
                <div className="flex items-center">
                  <img
                    src="https://i.imgur.com/ihchsJt.png"
                    alt="Logo Cliente - Assaí Atacadista"
                    className="h-8 sm:h-10 w-auto object-contain max-w-[140px]"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      const fallback = document.getElementById('clientLogoFallback');
                      if (fallback) fallback.style.display = 'inline-flex';
                    }}
                  />
                  <span id="clientLogoFallback" className="hidden items-center px-2.5 py-1 rounded text-xs font-bold bg-[#005599] text-white tracking-wide">
                    ASSAÍ ATACADISTA
                  </span>
                </div>

                <div className="h-6 w-px bg-gray-200"></div>

                {/* Logo Agência */}
                <div className="flex items-center">
                  <img
                    src="https://i.imgur.com/lAyMWKF.png"
                    alt="Logo Agência"
                    className="h-7 sm:h-9 w-auto object-contain max-w-[130px]"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      const fallback = document.getElementById('agencyLogoFallback');
                      if (fallback) fallback.style.display = 'inline-flex';
                    }}
                  />
                  <span id="agencyLogoFallback" className="hidden items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-800 text-white tracking-wide">
                    AGÊNCIA
                  </span>
                </div>

                {/* Tag de Contexto */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Base Oficial Atualizada: (01 a 04/10/2026)
                </span>
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#005599] tracking-tight">
                  DASHBOARD: Campanha de Aniversário 2026
                </h1>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                  <span>Grupo Ativo: <strong className="text-slate-700">ANIVERSÁRIO ASSAÍ</strong></span>
                  <span>·</span>
                  <span>Período: <strong className="text-slate-700">01/10 a 04/10/2026</strong></span>
                  <span>·</span>
                  <span>Canais: <strong className="text-slate-700">Instagram Feed, Stories, Facebook e TikTok</strong></span>
                </p>
              </div>
            </div>

            {/* Botões Rápidos */}
            <div className="flex items-center gap-2 self-start md:self-center shrink-0 no-print">
              <button
                onClick={() => {
                  document.getElementById('sectionPosts')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-[#005599] bg-[#EBF4FA] hover:bg-[#dbeafe] transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Ver {filteredPosts.length} Posts</span>
              </button>
              <button
                onClick={() => setIsCsvModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Planilha / CSV</span>
              </button>
            </div>
          </div>

          {/* Linha de Filtros Lado a Lado */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0">
              <Filter className="w-4 h-4 text-slate-400" />
              <span>Filtros:</span>
            </div>

            {/* Dropdown Período */}
            <div className="flex-1">
              <label htmlFor="filterPeriodo" className="sr-only">Período</label>
              <select
                id="filterPeriodo"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-slate-700 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#005599] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="all">Todo o Período (01/10 a 04/10/2026)</option>
                <option value="2026-10-01">01/10/2026 · Quinta-feira</option>
                <option value="2026-10-02">02/10/2026 · Sexta-feira</option>
                <option value="2026-10-03">03/10/2026 · Sábado</option>
                <option value="2026-10-04">04/10/2026 · Domingo</option>
              </select>
            </div>

            {/* Dropdown Redes Sociais */}
            <div className="flex-1">
              <label htmlFor="filterRede" className="sr-only">Redes Sociais</label>
              <select
                id="filterRede"
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-slate-700 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#005599] focus:bg-white transition-colors cursor-pointer"
              >
                <option value="all">Redes Sociais (Todas as 4 Redes - 37 posts)</option>
                <option value="Instagram Feed">Instagram Feed (8 Posts/Reels)</option>
                <option value="Instagram Stories">Instagram Stories (17 Stories)</option>
                <option value="Facebook">Facebook (6 Publicações)</option>
                <option value="Tiktok">TikTok (6 Vídeos Curtos)</option>
              </select>
            </div>

            {/* Busca Rápida */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar influenciador, campanha..."
                className="w-full bg-gray-50 border border-gray-200 text-slate-700 text-sm rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005599] focus:bg-white transition-colors"
              />
            </div>

            {/* Botão Reset Rápido */}
            <button
              onClick={handleResetFilters}
              type="button"
              title="Redefinir Filtros"
              className="text-xs text-slate-400 hover:text-[#005599] font-medium px-2 py-1 transition-colors self-end sm:self-center cursor-pointer"
            >
              Limpar
            </button>
          </div>
        </header>

        {/* 2. CARDS DE KPI (Visão Geral) */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Indicadores Chave">
          {/* Card 1: TOTAL DE IMPACTOS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-blue-100 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                TOTAL DE IMPACTOS
              </span>
              <div className="w-9 h-9 rounded-lg bg-[#EBF4FA] text-[#005599] flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                {formatNumber(totals.impressoes)}
              </span>
              <span className="inline-flex items-center text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                <Users className="w-3.5 h-3.5 mr-0.5 inline" />
                {formatNumber(totals.alcance)} Alcance
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Total consolidado de impressões e visualizações
            </p>
          </div>

          {/* Card 2: TOTAL DE INTERAÇÕES */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-orange-100 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                TOTAL DE INTERAÇÕES
              </span>
              <div className="w-9 h-9 rounded-lg bg-[#FEF3EB] text-[#F47920] flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                {formatNumber(totals.interacoes)}
              </span>
              <span className="inline-flex items-center text-xs font-bold text-[#F47920] bg-orange-50 px-2 py-0.5 rounded">
                <Heart className="w-3.5 h-3.5 mr-0.5 inline" />
                {formatNumber(totals.curtidas)} curtidas
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {formatNumber(totals.cliquesLink)} cliques · {formatNumber(totals.compartilhamentos)} envios · {formatNumber(totals.comentarios)} coments
            </p>
          </div>

          {/* Card 3: ENGAJAMENTO MÉDIO (ER) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-blue-100 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                ENGAJAMENTO MÉDIO (ER)
              </span>
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#005599] flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                {totals.erMedioRedes.toFixed(2).replace('.', ',')}%
              </span>
              <span className="inline-flex items-center text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" />
                Média das 4 Redes
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Feed: 2,81% · Stories: 1,94% · TikTok: 2,95% · FB: 2,72% (Posts: {totals.erMedio.toFixed(2).replace('.', ',')}%)
            </p>
          </div>
        </section>

        {/* FAIXA DETALHADA DE INTERAÇÕES */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Detalhamento de Interações da Base ({formatNumber(totals.interacoes)} Ações Registradas)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            {/* Curtidas */}
            <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
              <div className="text-[11px] font-semibold text-slate-500 uppercase flex items-center justify-center gap-1">
                <span>❤️ Curtidas</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 tabular-nums mt-0.5">
                {formatNumber(totals.curtidas)}
              </div>
              <div className="text-[10px] text-slate-400">Reações e likes</div>
            </div>

            {/* Cliques no Link */}
            <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
              <div className="text-[11px] font-semibold text-slate-500 uppercase flex items-center justify-center gap-1">
                <span>🔗 Cliques Link</span>
              </div>
              <div className="text-lg font-extrabold text-[#005599] tabular-nums mt-0.5">
                {formatNumber(totals.cliquesLink)}
              </div>
              <div className="text-[10px] text-slate-400">Stories da Campanha</div>
            </div>

            {/* Envios / Shares */}
            <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
              <div className="text-[11px] font-semibold text-slate-500 uppercase flex items-center justify-center gap-1">
                <span>✈️ Envios / Shares</span>
              </div>
              <div className="text-lg font-extrabold text-[#F47920] tabular-nums mt-0.5">
                {formatNumber(totals.compartilhamentos)}
              </div>
              <div className="text-[10px] text-slate-400">Compartilhamentos</div>
            </div>

            {/* Comentários */}
            <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
              <div className="text-[11px] font-semibold text-slate-500 uppercase flex items-center justify-center gap-1">
                <span>💬 Comentários</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 tabular-nums mt-0.5">
                {formatNumber(totals.comentarios)}
              </div>
              <div className="text-[10px] text-slate-400">Feed, FB e TikTok</div>
            </div>

            {/* Salvos */}
            <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100 col-span-2 sm:col-span-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase flex items-center justify-center gap-1">
                <span>🔖 Salvos</span>
              </div>
              <div className="text-lg font-extrabold text-emerald-600 tabular-nums mt-0.5">
                {formatNumber(totals.salvos)}
              </div>
              <div className="text-[10px] text-slate-400">Posts salvos</div>
            </div>
          </div>
        </section>

        {/* 3. ANÁLISE ESTRATÉGICA DE ALCANCE E ENGAJAMENTO */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 space-y-5 print-break-inside-avoid">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#EBF4FA] text-[#005599]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#005599] tracking-tight">
                  Análise de Alcance e Engajamento
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Recálculo oficial de distribuição de audiência e taxas médias de engajamento por canal
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#005599] border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005599]"></span>
                Feed: 2,81% ER Médio
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                Stories: 1,94% ER Médio
              </span>
            </div>
          </div>

          {/* Grid dos 4 Canais com Métricas e Análise */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Instagram Feed */}
            <div className="p-4 rounded-xl border border-blue-100 bg-gradient-to-b from-blue-50/40 to-white hover:border-blue-200 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#005599] uppercase tracking-wider">Instagram Feed</span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  2,81% ER
                </span>
              </div>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Alcance:</span>
                  <strong className="text-slate-900 font-bold tabular-nums">3.608.231</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Impactos:</span>
                  <strong className="text-[#005599] font-bold tabular-nums">4.874.131</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Interações:</span>
                  <strong className="text-[#F47920] font-bold tabular-nums">242.818</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Posts no Feed:</span>
                  <strong className="text-slate-700 font-semibold">8 publicações</strong>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-blue-100/70 text-[11px] text-slate-600 leading-relaxed">
                Maior entrega de impactos da campanha (75,8% do total). Alto engajamento com @nicolebahls (7,29% ER) e mecânica (8,42% ER).
              </div>
            </div>

            {/* Instagram Stories */}
            <div className="p-4 rounded-xl border border-purple-100 bg-gradient-to-b from-purple-50/40 to-white hover:border-purple-200 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Instagram Stories</span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                  1,94% ER
                </span>
              </div>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Alcance:</span>
                  <strong className="text-slate-900 font-bold tabular-nums">1.214.748</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Impactos:</span>
                  <strong className="text-[#005599] font-bold tabular-nums">1.448.832</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Interações:</span>
                  <strong className="text-[#F47920] font-bold tabular-nums">26.215</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Cliques Link:</span>
                  <strong className="text-purple-700 font-bold tabular-nums">13.359</strong>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-purple-100/70 text-[11px] text-slate-600 leading-relaxed">
                Forte alcance qualificado (1,21M contas) e alta conversão direta com 13.359 cliques no link de ofertas do Aniversário.
              </div>
            </div>

            {/* Facebook */}
            <div className="p-4 rounded-xl border border-sky-100 bg-gradient-to-b from-sky-50/30 to-white hover:border-sky-200 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">Facebook</span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                  2,72% ER
                </span>
              </div>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Alcance:</span>
                  <strong className="text-slate-900 font-bold tabular-nums">72.092</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Impactos:</span>
                  <strong className="text-[#005599] font-bold tabular-nums">102.854</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Interações:</span>
                  <strong className="text-[#F47920] font-bold tabular-nums">1.961</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Publicações:</span>
                  <strong className="text-slate-700 font-semibold">6 posts</strong>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-sky-100/70 text-[11px] text-slate-600 leading-relaxed">
                Consistência em base institucional e ofertas com vídeos e carrosséis (média aritmética dos posts: 2,62%).
              </div>
            </div>

            {/* TikTok */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gradient-to-b from-gray-50/50 to-white hover:border-gray-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">TikTok</span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                  2,95% ER
                </span>
              </div>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Alcance:</span>
                  <strong className="text-slate-900 font-bold tabular-nums">7.955</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Impactos:</span>
                  <strong className="text-[#005599] font-bold tabular-nums">7.955</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Interações:</span>
                  <strong className="text-[#F47920] font-bold tabular-nums">235</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Vídeos:</span>
                  <strong className="text-slate-700 font-semibold">6 curtos</strong>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-gray-200/70 text-[11px] text-slate-600 leading-relaxed">
                Vídeos curtos de ofertas e ativações de aniversário com alta retenção orgânica (média dos vídeos: 3,12%).
              </div>
            </div>
          </div>

          {/* Resumo Geral da Análise */}
          <div className="p-4 bg-slate-50 rounded-xl border border-gray-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-slate-900">Total Consolidado da Campanha:</span>
              <span className="text-slate-600">Alcance: <strong className="text-slate-900 font-bold">{formatNumber(totals.alcance)}</strong></span>
              <span>·</span>
              <span className="text-slate-600">Impactos: <strong className="text-[#005599] font-bold">{formatNumber(totals.impressoes)}</strong></span>
              <span>·</span>
              <span className="text-slate-600">Interações: <strong className="text-[#F47920] font-bold">{formatNumber(totals.interacoes)}</strong></span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-slate-500 font-medium">Engajamento Médio de Todas as Redes:</span>
              <span className="px-2.5 py-1 rounded font-extrabold bg-blue-50 text-blue-800 tabular-nums text-xs">
                {totals.erMedioRedes.toFixed(2).replace('.', ',')}%
              </span>
              <span className="text-slate-400 text-[11px] font-normal">
                (Média individual dos posts: {totals.erMedio.toFixed(2).replace('.', ',')}%)
              </span>
            </div>
          </div>
        </section>

        {/* 3. VISÃO CONSOLIDADA POR REDE SOCIAL (Tabela com Heatmap) */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden print-break-inside-avoid">
          <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#005599] tracking-tight">
                Visão Consolidada por Rede Social
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparativo de alcance e taxa de engajamento por plataforma na Campanha de Aniversário 2026
              </p>
            </div>
            <span className="text-xs font-medium text-slate-400 hidden sm:inline">
              Heatmap ER ativo
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" id="tableRedes">
              <thead>
                <tr className="bg-gray-50/80 text-xs font-bold uppercase text-slate-500 border-b border-gray-100 tracking-wider">
                  <th scope="col" className="py-3 px-5 sm:px-6">Rede</th>
                  <th scope="col" className="py-3 px-4 text-right">Alcance</th>
                  <th scope="col" className="py-3 px-4 text-right">Impactos (Impressões)</th>
                  <th scope="col" className="py-3 px-4 text-right">Interações</th>
                  <th scope="col" className="py-3 px-5 sm:px-6 text-right">ER Médio</th>
                </tr>
              </thead>
              <tbody id="tbodyRedes" className="divide-y divide-gray-100 font-medium text-slate-700">
                {/* Linha Instagram Feed */}
                <tr 
                  onClick={() => setPlatformFilter(platformFilter === 'Instagram Feed' ? 'all' : 'Instagram Feed')}
                  className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${
                    platformFilter === 'Instagram Feed' ? 'bg-blue-50/40' : ''
                  }`}
                >
                  <td className="py-3.5 px-5 sm:px-6 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">Instagram Feed</span>
                      <span className="block text-[11px] text-[#005599] font-medium">8 Posts · Faro, Nicole Bahls, DiaTV, Ofertas</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-slate-700 font-semibold">3.608.231</td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-slate-900 font-bold">4.874.131</td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-[#F47920] font-bold">242.818</td>
                  <td className="py-3.5 px-5 sm:px-6 text-right">
                    <span className="inline-block px-2.5 py-1 rounded bg-blue-50 text-blue-800 font-semibold tabular-nums">
                      2,81%
                    </span>
                  </td>
                </tr>

                {/* Linha Instagram Stories */}
                <tr 
                  onClick={() => setPlatformFilter(platformFilter === 'Instagram Stories' ? 'all' : 'Instagram Stories')}
                  className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${
                    platformFilter === 'Instagram Stories' ? 'bg-purple-50/40' : ''
                  }`}
                >
                  <td className="py-3.5 px-5 sm:px-6 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full p-0.5 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center shrink-0 shadow-xs">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-pink-600">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" strokeWidth="2" strokeDasharray="4 2" />
                          <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">Instagram Stories</span>
                      <span className="block text-[11px] text-purple-600 font-medium">17 Stories · 13.359 cliques no link</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-slate-700 font-semibold">1.214.748</td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-slate-900 font-bold">1.448.832</td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-[#F47920] font-bold">26.215</td>
                  <td className="py-3.5 px-5 sm:px-6 text-right">
                    <span className="inline-block px-2.5 py-1 rounded bg-purple-50 text-purple-800 font-semibold tabular-nums">
                      1,94%
                    </span>
                  </td>
                </tr>

                {/* Linha Facebook */}
                <tr 
                  onClick={() => setPlatformFilter(platformFilter === 'Facebook' ? 'all' : 'Facebook')}
                  className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${
                    platformFilter === 'Facebook' ? 'bg-blue-50/20' : ''
                  }`}
                >
                  <td className="py-3.5 px-5 sm:px-6 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Facebook</span>
                      <span className="block text-[11px] text-slate-500 font-normal">6 Publicações · Vídeos, Carrosséis e Estáticos</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-slate-700">72.092</td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-slate-900 font-semibold">102.854</td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-[#F47920] font-semibold">1.961</td>
                  <td className="py-3.5 px-5 sm:px-6 text-right">
                    <span className="inline-block px-2.5 py-1 rounded bg-blue-50 text-blue-800 font-semibold tabular-nums">
                      2,72%
                    </span>
                  </td>
                </tr>

                {/* Linha TikTok */}
                <tr 
                  onClick={() => setPlatformFilter(platformFilter === 'Tiktok' ? 'all' : 'Tiktok')}
                  className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${
                    platformFilter === 'Tiktok' ? 'bg-slate-100' : ''
                  }`}
                >
                  <td className="py-3.5 px-5 sm:px-6 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.68 6.34 6.34 0 009.34 22a6.34 6.34 0 006.34-6.32V9.32a8.3 8.3 0 005-1.63v-3.7a8.2 8.2 0 01-1.09-.3z"/></svg>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">TikTok</span>
                      <span className="block text-[11px] text-slate-500 font-normal">6 Vídeos Curtos de Ofertas e Festa</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-slate-700 font-semibold">7.955</td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-slate-900 font-bold">7.955</td>
                  <td className="py-3.5 px-4 text-right tabular-nums text-[#F47920] font-bold">235</td>
                  <td className="py-3.5 px-5 sm:px-6 text-right">
                    <span className="inline-block px-2.5 py-1 rounded bg-blue-50 text-blue-800 font-semibold tabular-nums">
                      2,95%
                    </span>
                  </td>
                </tr>
              </tbody>
              {/* Linha Total Consolidada */}
              <tfoot>
                <tr className="bg-gray-50 font-bold text-slate-900 border-t border-gray-200">
                  <td className="py-3 px-5 sm:px-6 text-[#005599]">Total / Média das Redes</td>
                  <td className="py-3 px-4 text-right tabular-nums text-slate-800">{formatNumber(totals.alcance)}</td>
                  <td className="py-3 px-4 text-right tabular-nums text-[#005599]">{formatNumber(totals.impressoes)}</td>
                  <td className="py-3 px-4 text-right tabular-nums text-[#F47920]">{formatNumber(totals.interacoes)}</td>
                  <td className="py-3 px-5 sm:px-6 text-right">
                    <span className="block tabular-nums font-bold text-slate-900">
                      {totals.erMedioRedes.toFixed(2).replace('.', ',')}%
                    </span>
                    <span className="block text-[10px] text-slate-400 font-normal">
                      (Média posts: {totals.erMedio.toFixed(2).replace('.', ',')}%)
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* 4. GRÁFICO 1: PERFORMANCE COMPARATIVA DOS CANAIS */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 space-y-6 print-break-inside-avoid">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#005599] tracking-tight">
                Performance Comparativa por Rede Social (Campanha de Aniversário 2026)
              </h2>
              <p className="text-xs text-slate-500">
                Comparativo de Impactos (Impressões), Alcance Único e Total de Interações por plataforma
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded-xs bg-[#005599]"></span> Impressões
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded-xs bg-[#38bdf8]"></span> Alcance
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded-xs bg-[#F47920]"></span> Interações
              </span>
            </div>
          </div>

          <div className="relative w-full h-72 sm:h-80">
            <canvas ref={chartStackedRef}></canvas>
          </div>

          {/* Tabela abaixo do gráfico */}
          <div className="border-t border-gray-100 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Detalhamento Consolidado por Canal
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-gray-100">
                    <th scope="col" className="py-2.5 px-4">Canal / Formato</th>
                    <th scope="col" className="py-2.5 px-4 text-right">Alcance</th>
                    <th scope="col" className="py-2.5 px-4 text-right">Impactos (Impressões)</th>
                    <th scope="col" className="py-2.5 px-4 text-right">Interações</th>
                    <th scope="col" className="py-2.5 px-4 text-right">ER (Engajamento)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-slate-700">
                  <tr className="hover:bg-blue-50/20 transition-colors">
                    <td className="py-2.5 px-4 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#005599] shrink-0"></span>
                      <span className="font-semibold text-slate-900">Instagram Feed</span>
                      <span className="text-xs text-[#005599] font-normal">(8 Posts · Nicole Bahls, Faro, Ofertas)</span>
                    </td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-slate-600 font-semibold">3.608.231</td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-[#005599] font-bold">4.874.131</td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-[#F47920] font-bold">242.818</td>
                    <td className="py-2.5 px-4 text-right tabular-nums font-semibold text-slate-800">2,81%</td>
                  </tr>
                  <tr className="hover:bg-purple-50/20 transition-colors">
                    <td className="py-2.5 px-4 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0"></span>
                      <span className="font-semibold text-slate-900">Instagram Stories</span>
                      <span className="text-xs text-purple-600 font-normal">(17 Stories · 13.359 cliques)</span>
                    </td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-slate-600 font-semibold">1.214.748</td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-[#005599] font-bold">1.448.832</td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-[#F47920] font-bold">26.215</td>
                    <td className="py-2.5 px-4 text-right tabular-nums font-semibold text-slate-800">1,94%</td>
                  </tr>
                  <tr className="hover:bg-gray-50/40 transition-colors">
                    <td className="py-2.5 px-4 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2] shrink-0"></span>
                      <span className="font-semibold text-slate-900">Facebook</span>
                      <span className="text-xs text-slate-400 font-normal">(6 Publicações)</span>
                    </td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-slate-600 font-semibold">72.092</td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-slate-600 font-semibold">102.854</td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-[#F47920] font-semibold">1.961</td>
                    <td className="py-2.5 px-4 text-right tabular-nums font-semibold text-slate-800">2,72%</td>
                  </tr>
                  <tr className="hover:bg-gray-50/40 transition-colors">
                    <td className="py-2.5 px-4 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0"></span>
                      <span className="font-semibold text-slate-900">TikTok</span>
                      <span className="text-xs text-slate-400 font-normal">(6 Vídeos Curtos)</span>
                    </td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-slate-600 font-semibold">7.955</td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-slate-600 font-semibold">7.955</td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-[#F47920] font-semibold">235</td>
                    <td className="py-2.5 px-4 text-right tabular-nums font-semibold text-slate-800">2,95%</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-bold text-slate-900 border-t border-gray-200">
                    <td className="py-2.5 px-4 text-[#005599]">Total Consolidado / Média das Redes</td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-slate-800 font-semibold">{formatNumber(totals.alcance)}</td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-[#005599] font-bold">{formatNumber(totals.impressoes)}</td>
                    <td className="py-2.5 px-4 text-right tabular-nums text-[#F47920] font-bold">{formatNumber(totals.interacoes)}</td>
                    <td className="py-2.5 px-4 text-right tabular-nums font-bold text-slate-900">
                      {totals.erMedioRedes.toFixed(2).replace('.', ',')}%
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* 5. EQUILÍBRIO EDITORIAL & MATRIZ ESFORÇO VS. RESULTADO */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 space-y-6 print-break-inside-avoid">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-base sm:text-lg font-bold text-[#005599] tracking-tight">
              Equilíbrio Editorial & Matriz Esforço vs. Resultado
            </h2>
            <p className="text-xs text-slate-500">
              Avaliação de eficiência de cada canal: proporção de impactos gerados versus volume de engajamento conquistado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gráfico 2 (Esquerda): Gráfico de Rosca */}
            <div className="flex flex-col items-center">
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 text-center">
                Composição das {formatNumber(totals.interacoes)} Interações
              </h3>
              <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                <canvas ref={chartDoughnutRef}></canvas>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F47920]"></span> Curtidas: <strong className="text-slate-900">{formatNumber(totals.curtidas)}</strong>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#005599]"></span> Cliques Link: <strong className="text-slate-900">{formatNumber(totals.cliquesLink)}</strong>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span> Envios: <strong className="text-slate-900">{formatNumber(totals.compartilhamentos)}</strong>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span> Comentários: <strong className="text-slate-900">{formatNumber(totals.comentarios)}</strong>
                </div>
              </div>
            </div>

            {/* Gráfico 3 (Direita): Gráfico de Barras Agrupadas */}
            <div>
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 text-center md:text-left">
                Comparativo: % Impactos vs. % Interações por Plataforma
              </h3>
              <div className="relative w-full h-64 sm:h-72">
                <canvas ref={chartBarComparativoRef}></canvas>
              </div>
              {/* Insight Box */}
              <div className="mt-3 p-3 bg-orange-50/70 border border-orange-100 rounded-lg text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-[#F47920]">Insight de Eficiência:</span> 
                O <strong>Instagram Feed</strong> gerou uma repercussão extraordinária com <strong>4.874.131 impactos</strong> e <strong>242.818 interações</strong>, sustentando taxa média de engajamento calibrada em <strong>2,81%</strong>, impulsionada pelo Reels da influenciadora <strong>@nicolebahls</strong> (4,18M impressões, 207K curtidas e 7,26% de ER) e pela mecânica de aniversário (8,42% de ER). O <strong>Instagram Stories</strong> demonstrou alto poder de cobertura com <strong>1.214.748 contas alcançadas</strong>, taxa média de engajamento oficial de <strong>1,94%</strong> e expressiva conversão direta de <strong>13.359 cliques no link</strong>. O <strong>Facebook</strong> e o <strong>TikTok</strong> mantiveram engajamentos consistentes de 2,72% e 2,95%.
              </div>
            </div>
          </div>
        </section>

        {/* 6. TABELA COMPLETA COM TODAS AS 37 PUBLICAÇÕES */}
        <section id="sectionPosts" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden print-break-inside-avoid">
          <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#005599]" />
                <h2 className="text-base font-bold text-[#005599] tracking-tight">
                  Base de Dados Oficial: Publicações da Campanha ({filteredPosts.length})
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Registros cadastrados no Aniversário Assaí 2026 (01 a 04/10/2026)
              </p>
            </div>

            {/* Ordenação */}
            <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
              <span className="text-slate-400 font-medium">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 text-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#005599]"
              >
                <option value="data">Data de Publicação</option>
                <option value="impressoes">Maior Impacto (Impressões)</option>
                <option value="interacoes">Mais Interações</option>
                <option value="engajamento">Maior Taxa de Engajamento</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" id="tablePosts">
              <thead>
                <tr className="bg-gray-50/80 text-[11px] font-bold uppercase text-slate-500 border-b border-gray-100 tracking-wider">
                  <th scope="col" className="py-3 px-4 sm:px-6">Publicação & Formato</th>
                  <th scope="col" className="py-3 px-3">Data / Dia</th>
                  <th scope="col" className="py-3 px-3 text-right">Alcance</th>
                  <th scope="col" className="py-3 px-3 text-right">Impactos (Impressões)</th>
                  <th scope="col" className="py-3 px-4 text-right">Interações & Ações</th>
                  <th scope="col" className="py-3 px-3 text-right">Taxa ER</th>
                  <th scope="col" className="py-3 px-4 text-center no-print">Link</th>
                </tr>
              </thead>
              <tbody id="tbodyPosts" className="divide-y divide-gray-100 font-medium text-slate-700">
                {filteredPosts.map((post) => {
                  const isStories = post.plataforma === 'Instagram Stories';
                  const isFeed = post.plataforma === 'Instagram Feed';
                  const isFb = post.plataforma === 'Facebook';
                  const isTt = post.plataforma === 'Tiktok';

                  return (
                    <tr key={post.id} className="hover:bg-blue-50/30 transition-colors">
                      {/* Plataforma */}
                      <td className="py-3 px-4 sm:px-6">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            isFeed ? 'bg-pink-500' : isStories ? 'bg-purple-600' : isFb ? 'bg-blue-600' : 'bg-slate-900'
                          }`}></span>
                          <div>
                            <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                              {post.plataforma}
                            </span>
                            <span className="text-[11px] text-slate-400 block max-w-[280px] truncate" title={post.grupo}>
                              {post.formato || post.tipo || 'Post'} · {post.grupo}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Data */}
                      <td className="py-3 px-3 text-xs whitespace-nowrap">
                        <span className="font-semibold text-slate-800 block">{post.dataDisplay}</span>
                        <span className="text-[10px] text-slate-400 capitalize block">{post.diaSemana}</span>
                      </td>

                      {/* Alcance */}
                      <td className="py-3 px-3 text-right tabular-nums text-slate-700 font-semibold text-xs sm:text-sm">
                        {formatNumber(post.alcance)}
                      </td>

                      {/* Impressões */}
                      <td className="py-3 px-3 text-right tabular-nums text-slate-900 font-bold text-xs sm:text-sm">
                        {formatNumber(post.impressoes)}
                      </td>

                      {/* Interações */}
                      <td className="py-3 px-4 text-right tabular-nums">
                        <span className="font-extrabold text-[#F47920] block text-xs sm:text-sm">
                          {formatNumber(post.interacoes)}
                        </span>
                        <span className="text-[10px] text-slate-400 block whitespace-nowrap">
                          {isStories ? (
                            `${formatNumber(post.cliquesLink || 0)} cliques · ${post.curtidas} curtidas`
                          ) : (
                            `${formatNumber(post.curtidas)} curt · ${formatNumber(post.compartilhamentos)} env · ${post.comentarios} com`
                          )}
                        </span>
                      </td>

                      {/* ER */}
                      <td className="py-3 px-3 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold tabular-nums ${
                          post.engajamento >= 10 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : post.engajamento >= 2 
                            ? 'bg-blue-50 text-blue-800' 
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {post.engajamento.toFixed(2).replace('.', ',')}%
                        </span>
                      </td>

                      {/* Link */}
                      <td className="py-3 px-4 text-center no-print">
                        {post.link ? (
                          <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#005599] hover:underline"
                            title="Abrir publicação original"
                          >
                            <span>Abrir</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[11px] text-slate-300">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. FOOTER */}
        <footer className="pt-4 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 no-print">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#005599]">ASSAÍ ATACADISTA</span>
            <span>·</span>
            <span>Campanha de Aniversário 2026 · Monitoramento Estratégico</span>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <button
              onClick={() => setIsGlossaryModalOpen(true)}
              className="text-slate-600 hover:text-[#005599] transition-colors underline decoration-slate-300 underline-offset-4 cursor-pointer"
            >
              Glossário
            </button>
            <span>·</span>
            <button
              onClick={() => window.print()}
              className="text-[#F47920] hover:text-[#d9630e] transition-colors font-bold underline decoration-orange-300 underline-offset-4 cursor-pointer"
            >
              Exportar PDF
            </button>
          </div>
        </footer>

      </div>

      {/* MODAL 1: CSV / PLANILHA */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 no-print">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-[#FEF3EB] text-[#F47920]">
                  <FileSpreadsheet className="w-5 h-5" />
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Base de Dados Oficial: Campanha de Aniversário 2026
                </h3>
              </div>
              <button
                onClick={() => setIsCsvModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              {totals.totalPosts} publicações consolidadas cobrindo Instagram Feed, Instagram Stories, Facebook e TikTok (01/10 a 04/10/2026).
            </p>

            <div className="bg-slate-900 text-slate-200 p-3 rounded-lg text-[11px] font-mono overflow-x-auto max-h-48 leading-relaxed">
              <div className="text-emerald-400 font-bold mb-1"># Resumo da Base Oficial:</div>
              Total de Publicações: {totals.totalPosts}<br />
              Total de Impactos: {formatNumber(totals.impressoes)}<br />
              Total de Alcance: {formatNumber(totals.alcance)}<br />
              Total de Interações: {formatNumber(totals.interacoes)}<br />
              Taxa de Engajamento Média: {totals.erMedio.toFixed(2).replace('.', ',')}% (Feed: 2,81% · Stories: 1,94%)
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={handleCopyCsv}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-slate-700 transition-colors cursor-pointer"
              >
                {copyFeedback ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">CSV Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Copiar CSV Completo</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsCsvModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#005599] hover:bg-[#004278] rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: GLOSSÁRIO */}
      {isGlossaryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 no-print">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#005599]">
                Glossário de Métricas & Conceitos
              </h3>
              <button
                onClick={() => setIsGlossaryModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 max-h-80 overflow-y-auto pr-1">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Impactos (Impressões)</h4>
                <p>Número total de vezes que as publicações e stories foram exibidos na tela dos usuários ({formatNumber(totals.impressoes)} impactos totais na campanha).</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Alcance</h4>
                <p>Quantidade de contas únicas alcançadas pelos posts ({formatNumber(totals.alcance)} contas no total).</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Interações</h4>
                <p>Soma de curtidas ({formatNumber(totals.curtidas)}), cliques no link ({formatNumber(totals.cliquesLink)}), comentários ({formatNumber(totals.comentarios)}), envios ({formatNumber(totals.compartilhamentos)}) e salvamentos ({formatNumber(totals.salvos)}), totalizando {formatNumber(totals.interacoes)} ações registradas na campanha.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">ER Médio (Engagement Rate)</h4>
                <p>Taxa percentual média calculada para as 4 redes sociais: <strong>{totals.erMedioRedes.toFixed(2).replace('.', ',')}%</strong> (Instagram Feed: 2,81%, Instagram Stories: 1,94%, Facebook: 2,72% e TikTok: 2,95%). A média individual de todas as {totals.totalPosts} publicações da base é de <strong>{totals.erMedio.toFixed(2).replace('.', ',')}%</strong>, e a taxa global ponderada (interações / alcance) é de <strong>{totals.erPonderadoGlobal.toFixed(2).replace('.', ',')}%</strong>.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsGlossaryModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#005599] hover:bg-[#004278] rounded-lg transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
