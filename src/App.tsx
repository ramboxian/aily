import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState, type CSSProperties } from "react";
import logo from "./assets/aily-logo.svg";
import agentBlueJacket from "./assets/agent-blue-jacket.png";
import agentBrownSweater from "./assets/agent-brown-sweater.png";
import agentFlower from "./assets/agent-flower.png";
import agentGreenGlasses from "./assets/agent-green-glasses.png";
import agentLead from "./assets/agent-lead.png";
import agentPonytail from "./assets/agent-ponytail.png";
import agentRed from "./assets/agent-red.png";
import agentRedScarf from "./assets/agent-red-scarf.png";
import agentStripeHat from "./assets/agent-stripe-hat.png";
import agentYellow from "./assets/agent-yellow.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type IconName =
  | "agent"
  | "arrow"
  | "board"
  | "bell"
  | "branch"
  | "calendar"
  | "check"
  | "cloud"
  | "desktop"
  | "doc"
  | "file"
  | "lock"
  | "message"
  | "shield"
  | "spark"
  | "tool";

type CapabilityId = "native" | "proactive" | "team" | "access" | "workspace";

type Capability = {
  id: CapabilityId;
  no: string;
  icon: IconName;
  eyebrow: string;
  title: string;
  intro: string;
  points: string[];
};

type AgentPreset = {
  name: string;
  role: string;
  desc: string;
  avatar: string;
  accent: string;
};

type ProactiveScene = {
  id: string;
  tab: string;
  title: string;
  intro: string;
  trigger: string;
  events: [string, IconName][];
  signals: string[];
  actions: [string, IconName][];
  result: string;
  points: string[];
  visual: "project" | "approval" | "meeting";
};

const capabilities: Capability[] = [
  {
    id: "proactive",
    no: "01",
    icon: "bell",
    eyebrow: "主动工作",
    title: "不必每次开口，Agent 已经在帮你想",
    intro:
      "从飞书 IM、日程、文档等事件中识别真正值得关注的信号，在正确时机以提醒、建议或代办的方式主动推进，而不是被动等指令。",
    points: ["多源事件统一汇聚", "从噪声中提取关键信号", "提醒、建议、代办按策略触达", "静默时段和打扰频率可配置"],
  },
  {
    id: "native",
    no: "02",
    icon: "message",
    eyebrow: "飞书原生，开箱即用",
    title: "你的专属 AI 助理，已在飞书就绪",
    intro:
      "打通飞书协同网络，所有飞书用户都能直接对话。头像、风格、技能和工作记忆都可定制，它认识你、懂你的工作，也知道你正在推进什么。",
    points: ["打开飞书就能用", "消息、文档、日程全场景打通", "内置办公 Skill 随时唤起", "记忆可管理，每日自动汇总"],
  },
  {
    id: "team",
    no: "03",
    icon: "branch",
    eyebrow: "Agent Team 与 Agent 协同",
    title: "一人调度一支 Agent 团队",
    intro:
      "主 Agent 理解目标后拆解任务，调研、写作、审核、执行等成员 Agent 并行推进。上下文隔离、过程可追溯，最终结果自动汇总。",
    points: ["角色分工，上下文隔离", "串行 / 并行 / 条件分支编排", "A2A 传递中间结果", "共享 Space Context 对齐目标"],
  },
  {
    id: "access",
    no: "04",
    icon: "cloud",
    eyebrow: "不限来源，不限框架",
    title: "不挑框架，不挑来源，统一接入",
    intro:
      "自定义智能伙伴、三方智能体、本地 Agent、云端 Agent 都能进入飞书高频办公场景，并被纳入企业统一权限和审计体系。",
    points: ["支持主流 Agent 框架与协议", "本地、云端、第三方统一纳管", "接入即纳入权限与审计", "一个场景一个伙伴"],
  },
  {
    id: "workspace",
    no: "05",
    icon: "lock",
    eyebrow: "团队智能体",
    title: "团队共享、数据隔离、权限可控",
    intro:
      "面向团队的统一 Agent，会用飞书、能主动工作、有记忆，也能自定义编排工作流，通过 CLI、MCP、Skill 接入企业业务系统。",
    points: ["一个 Agent 服务整个团队", "团队间数据互不可见", "CLI / MCP / Skill 多种调用", "工作流可接入业务系统"],
  },
];

const proactiveScenes: ProactiveScene[] = [
  {
    id: "project",
    tab: "项目风险推进",
    title: "风险刚冒头，Agent 就把推进建议送到人",
    intro: "群聊里出现延期线索、文档被更新、待办临近截止时，Agent 会把碎片事件合并成一个可判断的项目风险，而不是让你从消息流里自己捞。",
    trigger: "供应商延期信号出现",
    events: [
      ["群聊提到延期", "message"],
      ["项目文档更新", "doc"],
      ["关键待办临期", "check"],
    ],
    signals: ["合并相同风险", "定位责任人", "判断触达时机"],
    actions: [
      ["提醒项目负责人", "bell"],
      ["建议调整排期", "spark"],
      ["创建跟进待办", "check"],
    ],
    result: "项目风险已转成推进动作",
    points: ["多源事件合并成一个风险判断", "从群聊噪声里提取真正变化", "按角色把建议推给正确的人", "同步待办并持续跟进闭环"],
    visual: "project",
  },
  {
    id: "approval",
    tab: "审批与合规提醒",
    title: "关键审批卡住前，Agent 主动补齐判断依据",
    intro: "审批流、合同文档和历史规则同时变化时，Agent 会提前识别缺失材料和敏感条款，把可执行的提醒送到审批人和提交人。",
    trigger: "合同审批停留 18 小时",
    events: [
      ["审批长时间停留", "shield"],
      ["合同条款变更", "doc"],
      ["预算日程临近", "calendar"],
    ],
    signals: ["识别阻塞原因", "检查敏感条款", "匹配审批策略"],
    actions: [
      ["提醒补充材料", "bell"],
      ["标出风险条款", "shield"],
      ["建议下一步处理", "spark"],
    ],
    result: "审批阻塞已被提前处理",
    points: ["审批、合同、日程事件统一汇聚", "从流程停滞中识别真实阻塞", "对敏感动作保留人工确认", "提醒频率与静默时段可配置"],
    visual: "approval",
  },
  {
    id: "meeting",
    tab: "会后跟进",
    title: "会议结束后，Agent 把结论变成可执行动作",
    intro: "会议结束不是工作的终点。Agent 会把纪要、待办、负责人和截止时间串起来，持续跟进直到事项闭环。",
    trigger: "项目周会结束",
    events: [
      ["会议纪要生成", "doc"],
      ["行动项待认领", "check"],
      ["下次日程待同步", "calendar"],
    ],
    signals: ["提取决策结论", "匹配责任人", "识别跟进节奏"],
    actions: [
      ["分发会议纪要", "message"],
      ["同步任务看板", "check"],
      ["预约复盘日程", "calendar"],
    ],
    result: "会后跟进已进入自动推进",
    points: ["纪要自动沉淀为长期知识", "行动项自动分发到人", "根据截止时间持续提醒", "静默时段和频率可配置"],
    visual: "meeting",
  },
];

const presetAgents: AgentPreset[] = [
  {
    name: "社媒运营",
    role: "内容增长 Agent",
    desc: "撰写笔记、排期推文、生成内容日历并追踪表现。",
    avatar: agentRed,
    accent: "#8b78ff",
  },
  {
    name: "冷触达专员",
    role: "销售拓展 Agent",
    desc: "寻找目标客户，撰写触达邮件，管理跟进漏斗。",
    avatar: agentBlueJacket,
    accent: "#38cfc6",
  },
  {
    name: "合同审查员",
    role: "法务审核 Agent",
    desc: "扫描风险条款，对比修改痕迹，总结核心条款。",
    avatar: agentLead,
    accent: "#6388fd",
  },
  {
    name: "竞品监控",
    role: "市场情报 Agent",
    desc: "监控官网、定价、新品发布与媒体报道。",
    avatar: agentGreenGlasses,
    accent: "#69b9ff",
  },
  {
    name: "线索评估员",
    role: "销售线索 Agent",
    desc: "评分入站线索，补齐企业信息并同步给销售。",
    avatar: agentBrownSweater,
    accent: "#7bd6a6",
  },
  {
    name: "简历筛选员",
    role: "招聘 Agent",
    desc: "解析简历、匹配岗位要求、标记风险点。",
    avatar: agentPonytail,
    accent: "#a58cff",
  },
  {
    name: "多项目追踪",
    role: "PMO Agent",
    desc: "追踪截止日期，发送状态更新，生成周报。",
    avatar: agentStripeHat,
    accent: "#74c8f4",
  },
  {
    name: "路演材料撰写",
    role: "融资材料 Agent",
    desc: "梳理投资人关注点，生成路演结构和可发送材料。",
    avatar: agentRedScarf,
    accent: "#ff9b73",
  },
  {
    name: "客户成功跟进",
    role: "客成运营 Agent",
    desc: "汇总客户反馈，识别续约风险，生成跟进建议。",
    avatar: agentFlower,
    accent: "#55c7a6",
  },
  {
    name: "知识库整理员",
    role: "知识运营 Agent",
    desc: "沉淀问答、更新文档目录，把零散经验变成知识库。",
    avatar: agentYellow,
    accent: "#f3b64e",
  },
  {
    name: "财务报销助手",
    role: "财务流程 Agent",
    desc: "检查票据、补齐字段，提醒异常报销和审批卡点。",
    avatar: agentPonytail,
    accent: "#8bc7ff",
  },
  {
    name: "舆情简报员",
    role: "公关监测 Agent",
    desc: "聚合媒体动态，提炼风险信号，生成每日舆情简报。",
    avatar: agentBrownSweater,
    accent: "#7bd6a6",
  },
];

function App() {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <CapabilityExperience />
        <EnterpriseGovernance />
        <PresetAgents />
        <ClosingFlow />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="飞书 aily 首页">
        <img src={logo} alt="飞书 aily M3" />
      </a>
      <nav>
        <a href="#proactive">主动工作</a>
        <a href="#native">飞书原生</a>
        <a href="#team">Agent 协同</a>
        <a href="#access">统一接入</a>
      </nav>
      <a className="topbar-action" href="#team">登录</a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-copy">
          <img src={logo} alt="飞书 aily M3" />
          <p>飞书原生的企业级 Agent 协作平台</p>
          <h1>让 Agent Team 主动完成日常办公任务</h1>
          <span>
            从会议准备、项目推进到会后跟进，主 Agent 识别目标、拆解任务并调度成员 Agent 协同工作，把结果同步回飞书。
          </span>
          <div className="hero-actions">
            <a className="button primary hero-primary-action" href="#proactive">
              立即体验
              <Icon name="arrow" />
            </a>
          </div>
        </div>
        <HeroHyperframes />
      </div>
    </section>
  );
}

function HeroHyperframes() {
  return (
    <div className="hero-scene hero-hyperframes" aria-label="飞书 aily Agent Team 动态插图">
      <iframe
        title="飞书 aily Agent Team 动态插图"
        src="/hyperframes/aily-hero/index.html"
        loading="eager"
        allow="autoplay"
      />
    </div>
  );
}



function CapabilityExperience() {
  return (
    <section className="capability-experience" aria-label="五大核心能力">
      <CapabilitySections />
    </section>
  );
}

function CapabilityNav() {
  return (
    <div className="capability-tabs" aria-label="五大能力导航">
      <div className="capability-nav-list">
        {capabilities.map((item) => (
          <a href={`#${item.id}`} key={item.id}>
            <span>
              <Icon name={item.icon} />
            </span>
            <strong>{item.eyebrow}</strong>
          </a>
        ))}
      </div>
    </div>
  );
}

function CapabilitySections() {
  return (
    <div className="capability-story">
      {capabilities.map((capability, index) => (
        <CapabilitySection capability={capability} key={capability.id} />
      ))}
    </div>
  );
}

function CapabilitySection({ capability }: { capability: Capability }) {
  if (capability.id === "proactive") return <ProactiveSection capability={capability} />;

  const isReverse = capability.id === "access";

  return (
    <section className={`capability-section ${isReverse ? "is-reverse" : ""}`} id={capability.id}>
      <div className="capability-inner">
        <div className="capability-copy">
          <span className="capability-icon">
            <Icon name={capability.icon} />
          </span>
          <span className="eyebrow">{capability.eyebrow}</span>
          <h2>{capability.title}</h2>
          <p>{capability.intro}</p>
          <div className="point-list">
            {capability.points.map((point) => (
              <span key={point}>
                <Icon name="check" />
                {point}
              </span>
            ))}
          </div>
        </div>
        <CapabilityVisual id={capability.id} />
      </div>
    </section>
  );
}

function ProactiveSection({ capability }: { capability: Capability }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const panels = gsap.utils.toArray<HTMLElement>(".proactive-panel", section);
      if (reduceMotion || panels.length < 2) {
        gsap.set(track, { clearProps: "transform" });
        setActiveIndex(0);
        return;
      }

      let currentIndex = 0;
      const total = panels.length - 1;

      const revealPanel = (index: number) => {
        const panel = panels[index];
        if (!panel) return;
        gsap.fromTo(
          panel.querySelectorAll(".proactive-scene-text > span, .proactive-scene-text h3, .proactive-scene-text p, .proactive-points span, .proactive-visual"),
          { autoAlpha: 0.72, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            stagger: 0.045,
            ease: "power2.out",
            overwrite: true,
          },
        );
      };

      revealPanel(0);

      const horizontalDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

      gsap.to(track, {
        x: () => -horizontalDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${horizontalDistance() + window.innerHeight * 0.35}`,
          scrub: 0.85,
          pin: ".proactive-pin",
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => Math.round(value * total) / total,
            duration: { min: 0.22, max: 0.48 },
            ease: "power2.out",
          },
          onUpdate: (self) => {
            const nextIndex = Math.min(total, Math.max(0, Math.round(self.progress * total)));
            if (nextIndex !== currentIndex) {
              currentIndex = nextIndex;
              setActiveIndex(nextIndex);
              revealPanel(nextIndex);
            }
          },
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section className="capability-section proactive-section proactive-horizontal-section" id={capability.id} ref={sectionRef}>
      <div className="proactive-pin">
        <div className="proactive-horizontal-head">
          <div>
            <span className="capability-icon">
              <Icon name={capability.icon} />
            </span>
            <span className="eyebrow">{capability.eyebrow}</span>
          </div>
          <h2>{capability.title}</h2>
          <p>{capability.intro}</p>
        </div>
        <div className="proactive-track-viewport">
          <div className="proactive-track" ref={trackRef}>
            {proactiveScenes.map((item, index) => (
              <article className={`proactive-panel ${activeIndex === index ? "is-active" : ""}`} id={`proactive-${item.id}`} key={item.id}>
                <div className="proactive-panel-inner">
                  <div className="proactive-scene-text">
                    <span>{item.tab}</span>
                    <h3>{item.title}</h3>
                    <p>{item.intro}</p>
                    <div className="point-list proactive-points">
                      {item.points.map((point) => (
                        <span key={point}>
                          <Icon name="check" />
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ProactiveVisual scene={item} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityVisual({ id }: { id: CapabilityId }) {
  if (id === "native") return <NativeVisual />;
  if (id === "proactive") return <ProactiveVisual scene={proactiveScenes[1]} />;
  if (id === "team") return <TeamVisual />;
  if (id === "access") return <AccessVisual />;
  return <WorkspaceVisual />;
}

function NativeVisual() {
  return (
    <div className="visual native-visual">
      <div className="native-product">
        <div className="avatar-stack">
          {[agentYellow, agentRed, agentLead].map((avatar, index) => (
            <img src={avatar} alt="" key={index} />
          ))}
        </div>
        <div className="conversation">
          <span>今天项目例会有哪些风险？</span>
          <strong>已结合群聊、文档和日程整理 3 个重点。</strong>
        </div>
        <div className="skill-row">
          <em>
            <Icon name="message" />
            消息
          </em>
          <em>
            <Icon name="doc" />
            文档
          </em>
          <em>
            <Icon name="calendar" />
            日程
          </em>
          <em>
            <Icon name="tool" />
            Skill
          </em>
        </div>
      </div>
      <div className="memory-note">
        <strong>认识你的工作</strong>
        <span>头像、语气、技能、记忆都可自定义</span>
      </div>
      <img className="native-agent" src={agentYellow} alt="专属 Agent" />
      <div className="calendar-note">
        <Icon name="calendar" />
        <strong>10:30 项目例会</strong>
        <span>自动关联群聊与文档</span>
      </div>
    </div>
  );
}

function ProactiveVisual({ scene }: { scene: ProactiveScene }) {
  if (scene.visual === "approval") return <ApprovalGuardScene scene={scene} />;
  if (scene.visual === "meeting") return <MeetingFollowScene scene={scene} />;
  return <ProjectRiskScene scene={scene} />;
}

function ProjectRiskScene({ scene }: { scene: ProactiveScene }) {
  return (
    <div className="proactive-visual risk-map" aria-label={`${scene.tab}主动工作场景插画`}>
      <div className="risk-message-stream">
        <span>消息流</span>
        {scene.events.map(([label, icon]) => (
          <em key={label}>
            <Icon name={icon} />
            {label}
          </em>
        ))}
      </div>
      <div className="risk-radar">
        <div className="radar-sweep" />
        <i className="radar-dot dot-a" />
        <i className="radar-dot dot-b" />
        <i className="radar-dot dot-c" />
        <strong>风险雷达</strong>
        <span>{scene.trigger}</span>
      </div>
      <div className="risk-owner">
        <img src={agentBlueJacket} alt="主动工作 Agent" />
        <strong>项目负责人</strong>
        <span>建议触达</span>
      </div>
      <div className="risk-signals">
        {scene.signals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>
      <div className="risk-timeline">
        {["需求确认", "供应商交付", "联调验收", "上线复盘"].map((item, index) => (
          <span style={{ "--step": index } as CSSProperties} key={item}>{item}</span>
        ))}
      </div>
      <div className="risk-actions">
        {scene.actions.map(([label, icon]) => (
          <article key={label}>
            <Icon name={icon} />
            <strong>{label}</strong>
          </article>
        ))}
      </div>
      <div className="risk-result">
        <strong>{scene.result}</strong>
        <span>从消息噪声收束为可执行项目动作</span>
      </div>
    </div>
  );
}

function ApprovalGuardScene({ scene }: { scene: ProactiveScene }) {
  return (
    <div className="proactive-visual approval-flow" aria-label={`${scene.tab}主动工作场景插画`}>
      <div className="contract-page">
        <span>合同文档</span>
        <strong>服务采购合同</strong>
        <p>付款节点与预算科目待确认</p>
        <i />
        <i />
        <i className="is-highlight" />
        <i />
      </div>
      <div className="approval-path">
        {["提交", "法务", "财务", "负责人"].map((item, index) => (
          <span className={index === 2 ? "is-waiting" : ""} key={item}>{item}</span>
        ))}
      </div>
      <div className="guard-shield">
        <Icon name="shield" />
        <strong>策略检查</strong>
        {scene.signals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>
      <img className="guard-agent" src={agentGreenGlasses} alt="合规 Agent" />
      <div className="guard-stamp">需补材料</div>
      <div className="guard-actions">
        {scene.actions.map(([label, icon]) => (
          <article key={label}>
            <Icon name={icon} />
            <strong>{label}</strong>
          </article>
        ))}
      </div>
      <div className="guard-result">
        <Icon name="check" />
        <strong>{scene.result}</strong>
        <span>敏感动作保留人工确认</span>
      </div>
    </div>
  );
}

function MeetingFollowScene({ scene }: { scene: ProactiveScene }) {
  return (
    <div className="proactive-visual follow-up-board" aria-label={`${scene.tab}主动工作场景插画`}>
      <div className="meeting-table">
        {[agentPonytail, agentYellow, agentRedScarf].map((avatar, index) => (
          <img src={avatar} alt="" key={index} />
        ))}
        <strong>项目周会</strong>
      </div>
      <div className="minutes-paper">
        <span>会议纪要</span>
        <strong>{scene.trigger}</strong>
        {scene.signals.map((signal) => (
          <em key={signal}>{signal}</em>
        ))}
      </div>
      <div className="flying-actions">
        {scene.actions.map(([label, icon]) => (
          <article key={label}>
            <Icon name={icon} />
            <strong>{label}</strong>
          </article>
        ))}
      </div>
      <div className="task-board-mini">
        <span>待认领</span>
        <span>推进中</span>
        <span>已同步</span>
      </div>
      <div className="follow-calendar">
        <Icon name="calendar" />
        <strong>下次复盘已预约</strong>
        <span>提醒节奏自动生成</span>
      </div>
      <div className="follow-result">
        <strong>{scene.result}</strong>
        <span>纪要、待办、负责人持续联动</span>
      </div>
    </div>
  );
}

function TeamVisual() {
  const members = [
    ["调研", "收集资料", agentFlower, "a"],
    ["写作", "生成初稿", agentPonytail, "b"],
    ["审核", "复核风险", agentGreenGlasses, "c"],
    ["执行", "同步跟进", agentRedScarf, "d"],
  ] as const;

  return (
    <div className="visual team-visual">
      <div className="mission-title">
        <span>任务目标</span>
        <strong>完成竞品研究包</strong>
      </div>
      <div className="team-lead">
        <img src={agentLead} alt="主 Agent" />
        <strong>主 Agent</strong>
        <span>拆解任务并分派</span>
      </div>
      {members.map(([name, task, avatar, position]) => (
        <div className={`team-agent pos-${position}`} key={name}>
          <img src={avatar} alt={`${name} Agent`} />
          <strong>{name}</strong>
          <span>{task}</span>
          <i />
        </div>
      ))}
      <div className="team-context">Shared Space Context</div>
      <div className="trace-note">A2A 中间结果可追溯</div>
    </div>
  );
}

function AccessVisual() {
  return (
    <div className="visual access-visual">
      <div className="source-column">
        {["自定义伙伴", "本地 Agent", "云端 Agent", "三方智能体"].map((item) => (
          <span key={item}>
            <Icon name="agent" />
            {item}
          </span>
        ))}
      </div>
      <div className="gateway">
        <img src={logo} alt="飞书 aily M3" />
        <strong>统一接入层</strong>
        <span>协议 / 权限 / 审计</span>
      </div>
      <div className="feishu-scenes">
        <span>
          <Icon name="message" />
          飞书消息
        </span>
        <span>
          <Icon name="doc" />
          云文档
        </span>
        <span>
          <Icon name="shield" />
          审批
        </span>
        <span>
          <Icon name="cloud" />
          业务系统
        </span>
      </div>
      <div className="audit-ribbon">
        <Icon name="shield" />
        企业权限审计
      </div>
    </div>
  );
}

function WorkspaceVisual() {
  return (
    <div className="visual workspace-visual">
      <div className="space market">
        <Icon name="lock" />
        <strong>市场团队</strong>
        <span>数据隔离</span>
      </div>
      <div className="space sales">
        <Icon name="lock" />
        <strong>销售团队</strong>
        <span>数据隔离</span>
      </div>
      <div className="space project">
        <Icon name="lock" />
        <strong>项目团队</strong>
        <span>数据隔离</span>
      </div>
      <div className="workspace-agent">
        <img src={agentRed} alt="团队智能体" />
        <strong>团队智能体</strong>
        <span>团队知识 / 记忆 / 工作流</span>
      </div>
      <div className="workflow">
        {["触发器", "审批数据", "MCP 调用", "结果回写"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="integration">CLI · MCP · Skill</div>
    </div>
  );
}

function PresetAgents() {
  const agentsRef = useRef<HTMLElement | null>(null);
  const rowOne = presetAgents.slice(0, 6);
  const rowTwo = presetAgents.slice(6, 12);

  useGSAP(
    () => {
      const section = agentsRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rows = gsap.utils.toArray<HTMLElement>(".agent-marquee-track", section);
      const cards = gsap.utils.toArray<HTMLElement>(".agent-card", section);
      const rowTweens: gsap.core.Tween[] = [];
      const listeners: Array<() => void> = [];

      if (!reduceMotion) {
        rows.forEach((row, index) => {
          const distance = row.scrollWidth / 2;
          if (!distance) return;
          const reverse = row.closest(".agent-marquee-row")?.classList.contains("is-reverse");
          const tween = gsap.fromTo(
            row,
            { x: reverse ? -distance : 0 },
            {
              x: reverse ? 0 : -distance,
              duration: index === 0 ? 34 : 42,
              ease: "none",
              repeat: -1,
            },
          );
          rowTweens.push(tween);
        });

        const marquee = section.querySelector(".agent-marquee");
        if (marquee) {
          const pause = () => rowTweens.forEach((tween) => tween.pause());
          const resume = () => rowTweens.forEach((tween) => tween.resume());
          marquee.addEventListener("mouseenter", pause);
          marquee.addEventListener("mouseleave", resume);
          marquee.addEventListener("focusin", pause);
          marquee.addEventListener("focusout", resume);
          listeners.push(() => {
            marquee.removeEventListener("mouseenter", pause);
            marquee.removeEventListener("mouseleave", resume);
            marquee.removeEventListener("focusin", pause);
            marquee.removeEventListener("focusout", resume);
          });
        }
      }

      cards.forEach((card) => {
        const enter = () =>
          gsap.to(card, {
            y: -8,
            scale: 1.018,
            duration: 0.28,
            ease: "power2.out",
            overwrite: true,
          });
        const leave = () =>
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.24,
            ease: "power2.out",
            overwrite: true,
          });
        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        card.addEventListener("focusin", enter);
        card.addEventListener("focusout", leave);
        listeners.push(() => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
          card.removeEventListener("focusin", enter);
          card.removeEventListener("focusout", leave);
        });
      });

      return () => {
        listeners.forEach((cleanup) => cleanup());
        rowTweens.forEach((tween) => tween.kill());
      };
    },
    { scope: agentsRef },
  );

  return (
    <section className="preset-agents" id="agents" ref={agentsRef}>
      <div className="section-title">
        <span className="eyebrow">预置 Agent</span>
        <h2>内置 Agent，按角色开箱可用</h2>
        <p>从运营、销售、法务到项目管理，把常见任务做成可直接唤起的 Agent，按场景加入个人或团队工作空间。</p>
      </div>
      <div className="agent-marquee" aria-label="内置 Agent 横向展示墙">
        <AgentMarqueeRow items={rowOne} speed={38} />
        <AgentMarqueeRow items={rowTwo} reverse speed={44} />
      </div>
    </section>
  );
}

function AgentMarqueeRow({
  items,
  reverse = false,
  speed,
}: {
  items: AgentPreset[];
  reverse?: boolean;
  speed: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className={`agent-marquee-row ${reverse ? "is-reverse" : ""}`}>
      <div className="agent-marquee-track" style={{ "--marquee-speed": `${speed}s` } as CSSProperties}>
        {doubled.map((agent, index) => (
          <AgentPresetCard agent={agent} key={`${agent.name}-${reverse ? "reverse" : "normal"}-${index}`} />
        ))}
      </div>
    </div>
  );
}

function AgentPresetCard({ agent }: { agent: AgentPreset }) {
  return (
    <article className="agent-card" style={{ "--accent": agent.accent } as CSSProperties}>
      <div className="agent-card-head">
        <img src={agent.avatar} alt={`${agent.name} 头像`} />
        <div>
          <div className="agent-name-line">
            <strong>{agent.name}</strong>
            <span className="agent-verify" aria-hidden="true">
              <Icon name="check" />
            </span>
          </div>
          <span className="agent-card-role">{agent.role}</span>
        </div>
      </div>
      <p>{agent.desc}</p>
      <div className="agent-actions">
        <a href="#native">查看能力</a>
        <a href="#agents">制作同款</a>
      </div>
    </article>
  );
}

function EnterpriseGovernance() {
  return (
    <section className="governance-section" id="governance">
      <div className="flow-copy">
        <span className="eyebrow">企业级治理</span>
        <h2>效率提升，也要可控、可信、可追溯</h2>
        <p>把 Agent 放进真实企业工作流之前，权限、数据、人工确认和审计链路都要先到位。</p>
      </div>
      <div className="governance-panel">
        {[
          ["权限继承", "沿用飞书组织架构与空间权限，Agent 只能访问被授权的信息。", "lock"],
          ["数据隔离", "个人、团队、业务系统数据分域管理，跨团队不可见。", "shield"],
          ["人工确认", "敏感动作先建议后执行，关键节点保留人工确认。", "check"],
          ["过程审计", "任务拆解、工具调用、中间结果和最终动作都可追溯。", "doc"],
        ].map(([title, desc, icon]) => (
          <article key={title}>
            <Icon name={icon as IconName} />
            <strong>{title}</strong>
            <span>{desc}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClosingFlow() {
  return (
    <section className="closing-flow">
      <div className="final-cta">
        <strong>从一个任务开始，把 Agent 真正带进飞书工作流</strong>
        <div className="final-actions">
          <a className="button primary" href="#top">免费体验</a>
          <a className="button outline" href="#agents">立即购买</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" aria-label="页脚">
      <div className="footer-main">
        <div className="footer-brand">
          <img src={logo} alt="飞书 aily M3" />
        </div>
        <div className="footer-column">
          <strong>热门链接</strong>
          <a href="#top">飞书官网</a>
          <a href="#agents">飞书 aPaaS</a>
        </div>
        <div className="footer-column">
          <strong>帮助与支持</strong>
          <a href="#native">帮助中心</a>
          <a href="#access">联系我们</a>
        </div>
        <div className="footer-column">
          <strong>法律与合规</strong>
          <a href="#top">服务协议</a>
          <a href="#top">政策隐私</a>
          <a href="#top">安全与合规</a>
        </div>
      </div>
      <div className="footer-legal">
        Copyright © 2026 北京飞书科技有限公司　京ICP备16045432号-4　京公网安备 11010802029085号　增值电信业务经营许可证：京B2-20190249
      </div>
    </footer>
  );
}

function Icon({ name }: { name: IconName }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
  } as const;

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {name === "agent" && <path {...stroke} d="M16 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M20 20v-1a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />}
      {name === "arrow" && <path {...stroke} d="M5 12h14M13 6l6 6-6 6" />}
      {name === "board" && <path {...stroke} d="M5 5h14v14H5zM8 9h3M8 13h4M15 9h1M15 13h1M8 17h8" />}
      {name === "bell" && <path {...stroke} d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9M10 21h4" />}
      {name === "branch" && <path {...stroke} d="M6 3v6a3 3 0 0 0 3 3h6M18 9l3 3-3 3M6 21v-6a3 3 0 0 1 3-3" />}
      {name === "calendar" && <path {...stroke} d="M5 5h14v15H5zM8 3v4M16 3v4M5 10h14" />}
      {name === "check" && <path {...stroke} d="M5 12l4 4L19 6" />}
      {name === "cloud" && <path {...stroke} d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.2-2A5 5 0 0 0 7 18Z" />}
      {name === "desktop" && <path {...stroke} d="M4 5h16v11H4zM9 20h6M12 16v4" />}
      {name === "doc" && <path {...stroke} d="M7 3h7l4 4v14H7zM14 3v5h5M10 13h6M10 17h5" />}
      {name === "file" && <path {...stroke} d="M8 3h6l4 4v14H8zM14 3v5h4M11 13h4M11 17h5" />}
      {name === "lock" && <path {...stroke} d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v10H6z" />}
      {name === "message" && <path {...stroke} d="M5 6h14v9H9l-4 3V6Z" />}
      {name === "shield" && <path {...stroke} d="M12 3l7 3v5c0 5-3.2 8.5-7 10-3.8-1.5-7-5-7-10V6l7-3Z" />}
      {name === "spark" && <path {...stroke} d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />}
      {name === "tool" && <path {...stroke} d="M14.7 6.3a4 4 0 0 0-5 5l-5.4 5.4 3 3 5.4-5.4a4 4 0 0 0 5-5l-2.8 2.8-3-3 2.8-2.8Z" />}
    </svg>
  );
}

export default App;
