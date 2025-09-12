import React, { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Info, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function AnimatedPrice({ target, prefix = "R$ " }: { target: number; prefix?: string }) {
  const [value, setValue] = useState(0);
  const raf = useRef<number>();

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    function update() {
      start += increment;
      if (start >= target) {
        setValue(target);
        return;
      }
      setValue(Math.round(start));
      raf.current = requestAnimationFrame(update);
    }
    update();
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [target]);

  return (
    <span className="font-extrabold text-3xl md:text-5xl text-[#FF0000] drop-shadow-lg tracking-tight">
      {prefix}
      {value.toLocaleString("pt-BR")}
    </span>
  );
}

const CheckIcon = () => (
  <CheckCircle2 className="text-[#FF0000] w-6 h-6 mr-2" />
);

const InfoIcon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "flex justify-center items-center w-6 h-6 rounded-full bg-[#232224] text-[#FF0000] font-bold cursor-pointer transition-colors hover:bg-[#2a2a2a]",
        className
      )}
      {...props}
    >
      <Info size={18} />
    </span>
  )
);
InfoIcon.displayName = "InfoIcon";

const timelineSteps = [
  {
    title: "Atendimento",
    desc: "Primeiro contato ágil e profissional, garantindo que nenhuma oportunidade seja perdida.",
  },
  {
    title: "Qualificação de Leads",
    desc: "Método validado por centenas de empresários que conduz leads de forma persuasiva até a compra",
  },
  {
    title: "Agendamento",
    desc: "Convertemos o interesse em compromisso, inserindo o lead na agenda do vendedor.",
  },
  {
    title: "Repasse Estratégico",
    desc: "Entregamos o lead \"aquecido\" com todo o histórico para um fechamento de alta performance.",
  },
];

export default function Index() {
  const [agenteAtendimentoBasePrice] = useState(1500); // Preço base fixo
  const [isFollowUpActive, setIsFollowUpActive] = useState(false);

  // Calcula o preço total do Agente de Atendimento
  const totalAgenteAtendimentoPrice = agenteAtendimentoBasePrice + (isFollowUpActive ? 700 : 0);

  // Preço fixo da Gestão de Marketing, sem canais adicionais interativos
  const totalMarketingPrice = 2000; 

  const handleToggleFollowUp = () => {
    setIsFollowUpActive(!isFollowUpActive);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full bg-[#141212] relative overflow-x-hidden">
        {/* Gradiente de fundo */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-radial from-[#FF0000]/40 to-transparent rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-[#FF0000]/30 to-transparent rounded-full blur-2xl opacity-60" />
        </div>
        <div className="relative z-10 flex flex-col items-center px-4 py-10">
          {/* Header */}
          <header className="w-full max-w-2xl flex flex-col items-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg text-center">
              Proposta <span className="text-[#FF0000]">Exclusiva</span> <br />
              <span className="text-white">Óticas Ética</span>
            </h1>
            <p className="text-base md:text-lg text-neutral-300 max-w-xl text-center">
              Soluções de marketing e atendimento com tecnologia, transparência e performance.
            </p>
          </header>

          {/* Blocos principais: Gestão de Marketing primeiro, depois Agente de Atendimento */}
          <section className="w-full flex flex-col gap-8 mb-12 items-center">
            {/* Gestão de Marketing */}
            <div className="w-full max-w-2xl bg-gradient-to-br from-[#1a181a] via-[#1a181a]/80 to-[#2a181a]/60 rounded-2xl p-8 shadow-xl border border-white/10 relative overflow-hidden">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                Gestão de Marketing
              </h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-sm md:text-base text-neutral-200">
                  <CheckIcon />
                  Planejamento Estratégico de Campanha
                </li>
                <li className="flex items-center text-sm md:text-base text-neutral-200">
                  <CheckIcon />
                  Gestão Inteligente de Tráfego
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="ml-2" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-center bg-[#232224] text-white border border-[#FF0000]/30">
                      Acréscimo de R$ 500 por canal de tráfego adicional. O plano principal inclui anúncios no Instagram. Canais como Google Ads são adicionais.
                    </TooltipContent>
                  </Tooltip>
                </li>
                <li className="flex items-center text-sm md:text-base text-neutral-200">
                  <CheckIcon />
                  Sistema Avançado de Rastreamento
                </li>
                <li className="flex items-center text-sm md:text-base text-neutral-200">
                  <CheckIcon />
                  Grupo de Acompanhamento vis WhatsApp
                </li>
                <li className="flex items-center text-sm md:text-base text-neutral-200">
                  <CheckIcon />
                  Reuniões Estratégicas Mensais
                </li>
              </ul>
              <div className="flex flex-col items-end border-t border-white/10 pt-6">
                <AnimatedPrice target={totalMarketingPrice} />
                <span className="text-sm md:text-base text-neutral-400 mt-1">Para até 3 Lojas</span>
              </div>
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-radial from-[#FF0000]/30 to-transparent rounded-full blur-2xl opacity-60 pointer-events-none" />
            </div>

            {/* Agente de Atendimento */}
            <div className="w-full max-w-2xl bg-gradient-to-br from-[#1a181a] via-[#1a181a]/80 to-[#2a181a]/60 rounded-2xl p-8 shadow-xl border border-white/10 relative overflow-hidden">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                Agente de Atendimento
              </h2>

              {/* Timeline com UI/UX aprimorado */}
              <div className="flex flex-col space-y-6">
                {timelineSteps.map((step, idx) => (
                  <div key={step.title} className="relative flex items-start">
                    {/* Linha vertical conectora */}
                    {idx < timelineSteps.length - 1 && (
                      <div className="absolute top-4 left-4 -ml-px mt-1 w-0.5 h-full bg-gradient-to-b from-[#FF0000] via-[#FF0000]/50 to-[#FF0000]/20"></div>
                    )}
                    {/* Círculo com número */}
                    <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white font-bold shadow-md ring-4 ring-[#1a181a]">
                      {idx + 1}
                    </div>
                    {/* Conteúdo */}
                    <div className="ml-6">
                      <h3 className="font-semibold text-white text-base md:text-lg -mt-1">{step.title}</h3>
                      <p className="text-sm text-neutral-300 mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Addon Upgrade - Follow-Up Estratégico */}
              <div className="mt-8 bg-gradient-to-br from-[#2a181a]/80 via-[#FF0000]/10 to-[#232224]/60 border border-[#FF0000]/30 rounded-xl p-5 text-center shadow-lg">
                <div className="font-bold text-base md:text-lg flex items-center justify-center gap-2 text-white mb-2">
                  <span className="text-2xl text-[#FF0000]">🚀</span>
                  <div className="flex flex-col items-start"> {/* Use flex-col for stacking text */}
                    <span>Potencializador:</span>
                    <span className="text-[#FF0000]">Follow-Up Estratégico</span>
                  </div>
                </div>
                <p className="text-sm md:text-base text-neutral-200 mb-4">
                  Maximize cada lead: Sistema avançado de reengajamento que transforma "talvez" em "sim" através de sequências personalizadas.
                </p>
                <ul className="text-left text-sm md:text-base text-neutral-200 max-w-md mx-auto mb-2 mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckIcon />
                    Sequências automatizadas testadas
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    Integração total com WhatsApp
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    Relatórios de performance
                  </li>
                  <li className="flex items-center">
                    <CheckIcon />
                    Aumento médio de 35% na conversão
                  </li>
                </ul>
                <div className="mt-4">
                  <Button
                    onClick={handleToggleFollowUp}
                    className={cn(
                      "w-full max-w-xs py-2 rounded-lg font-bold text-base md:text-lg transition-colors",
                      isFollowUpActive
                        ? "bg-red-700 hover:bg-red-800 text-white"
                        : "bg-[#FF0000] hover:bg-[#d90000] text-white"
                    )}
                  >
                    {isFollowUpActive ? "Desativar Follow-Up (- R$ 700)" : "Ativar Follow-Up (+ R$ 700)"}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-end border-t border-white/10 pt-6 mt-8">
                <span className="text-sm md:text-base text-neutral-400 mb-1">Taxa de Setup: <span className="text-white">R$ 2000</span></span>
                <AnimatedPrice target={totalAgenteAtendimentoPrice} />
                <span className="text-sm md:text-base text-neutral-400 mt-1">Valor Base Mensal</span>
              </div>
              <div className="absolute left-0 top-0 w-32 h-32 bg-gradient-radial from-[#FF0000]/20 to-transparent rounded-full blur-2xl opacity-60 pointer-events-none" />
            </div>
          </section>

          {/* Observações Importantes - mais sutil */}
          <section className="w-full flex flex-col items-center mb-10">
            <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-none">
              <h2 className="text-base md:text-lg font-semibold text-white mb-2">
                Observações Importantes
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                O plano de <span className="text-white font-semibold">Gestão de Marketing (R$ 2000)</span> e a <span className="text-white font-semibold">Taxa de Setup (R$ 2000)</span> são pré-pagos. A primeira mensalidade do <span className="text-white font-semibold">Agente de Atendimento (R$ 1500)</span> será cobrada somente após 30 dias do início dos serviços.
              </p>
            </div>
          </section>

          {/* Bônus Exclusivos */}
          <section className="w-full flex flex-col items-center">
            <div className="w-full max-w-2xl bg-gradient-to-br from-[#2a181a]/80 via-[#FF0000]/10 to-[#232224]/60 border border-[#FFD700]/30 rounded-2xl p-8 shadow-xl flex flex-col items-center">
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-2 text-[#FFD700]">🎁</span>
                <h2 className="text-xl md:text-3xl font-bold text-[#FFD700] m-0 drop-shadow">
                  Bônus Exclusivos Inclusos
                </h2>
              </div>
              <ul className="list-none p-0 space-y-6 w-full">
                <li>
                  <div className="flex items-center justify-between mb-1 font-semibold text-white text-base md:text-lg">
                    <span>Especialista em Óticas</span>
                    <span className="text-[#FFD700] text-sm md:text-base">Valor Imensurável</span>
                  </div>
                  <div className="text-sm md:text-base text-neutral-200">
                    Com 8 anos de experiência no mercado de óticas, ajudei lojas a crescerem de 0 para 7 unidades, atingindo um faturamento superior a R$ 4,2 milhões por mês.
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between mb-1 font-semibold text-white text-base md:text-lg">
                    <span>Disparador Inteligente de WhatsApp</span>
                    <span className="text-[#FFD700] text-sm md:text-base">R$ 497/mês</span>
                  </div>
                  <div className="text-sm md:text-base text-neutral-200">
                    Sistema automatizado para reativar sua base de clientes existente e aumentar vendas recorrentes.
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between mb-1 font-semibold text-white text-base md:text-lg">
                    <span>Relatório Executivo Diário</span>
                    <span className="text-[#FFD700] text-sm md:text-base">R$ 97/mês</span>
                  </div>
                  <div className="text-sm md:text-base text-neutral-200">
                    Métricas detalhadas das 3 lojas direto no seu WhatsApp todos os dias.
                  </div>
                </li>
              </ul>
              <div className="w-full border-t border-[#FFD700]/30 mt-8 pt-6 text-center">
                <p className="text-neutral-200 text-base md:text-lg">
                  Total em bônus que você recebe:
                </p>
                <p className="text-2xl md:text-4xl font-bold text-[#FFD700] drop-shadow-lg mt-2">
                  R$ 594/mês
                </p>
              </div>
            </div>
          </section>

          {/* Botão de destaque no final */}
          <div className="w-full max-w-2xl flex justify-center mt-12">
            <a 
              href="https://wa.me/5585987219713?text=Falaa%20Gabriel%2C%20quero%20fechar%20a%20solu%C3%A7%C3%A3o%20apresentada!" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#FF0000] hover:bg-[#d90000] text-white font-bold px-10 py-4 rounded-2xl shadow-xl text-base md:text-lg flex items-center gap-3 transition-all tracking-wide uppercase"
            >
              Falar sobre a solução! <ArrowRight size={22} />
            </a>
          </div>
        </div>
      </div>
      <style>
        {`
        html, body {
          font-family: 'Gilroy', 'Montserrat', 'Inter', Arial, sans-serif;
        }
        `}
      </style>
    </TooltipProvider>
  );
}