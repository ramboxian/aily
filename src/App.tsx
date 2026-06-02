import type { CSSProperties } from "react";
import logo from "./assets/aily-logo.svg";
import agentBlueJacket from "./assets/agent-blue-jacket.png";
import agentBrownSweater from "./assets/agent-brown-sweater.png";
import agentCamera from "./assets/agent-camera.png";
import agentFlower from "./assets/agent-flower.png";
import agentGreenGlasses from "./assets/agent-green-glasses.png";
import agentLead from "./assets/agent-lead.png";
import agentPonytail from "./assets/agent-ponytail.png";
import agentRed from "./assets/agent-red.png";
import agentRedScarf from "./assets/agent-red-scarf.png";
import agentSkater from "./assets/agent-skater.png";
import agentStripeHat from "./assets/agent-stripe-hat.png";
import agentYellow from "./assets/agent-yellow.png";

type IconName =
  | "agent"
  | "arrow"
  | "bell"
  | "branch"
  | "calendar"
  | "check"
  | "cloud"
  | "doc"
  | "lock"
  | "message"
  | "shield"
  | "spark"
  | "tool";

type CapabilityId = "native" | "proactive" | "team" | "access" | "workspace";

type Capability = {
  id: CapabilityId;
  no: string;
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

const capabilities: Capability[] = [
  {
    id: "native",
    no: "01",
    eyebrow: "飞书原生，开箱即用",
    title: "你的专属 AI 助理，已在飞书就绪",
    intro:
      "打通飞书协同网络，所有飞书用户都能直接对话。头像、风格、技能和工作记忆都可定制，它认识你、懂你的工作，也知道你正在推进什么。",
    points: ["打开飞书就能用", "消息、文档、日程全场景打通", "内置办公 Skill 随时唤起", "记忆可管理，每日自动汇总"],
  },
  {
    id: "proactive",
    no: "02",
    eyebrow: "主动工作",
    title: "不必每次开口，Agent 已经在帮你想",
    intro:
      "从飞书 IM、审批、日历、文档等事件中识别真正值得关注的信号，在正确时机以提醒、建议或代办的方式主动触达，而不是被动等指令。",
    points: ["多源事件统一汇聚", "从噪声中提取关键信号", "提醒、建议、代办按策略触达", "静默时段和打扰频率可配置"],
  },
  {
    id: "team",
    no: "03",
    eyebrow: "Agent Team 与 Agent 协同",
    title: "一人调度一支 Agent 团队",
    intro:
      "主 Agent 理解目标后拆解任务，调研、写作、审核、执行等成员 Agent 并行推进。上下文隔离、过程可追溯，最终结果自动汇总。",
    points: ["角色分工，上下文隔离", "串行 / 并行 / 条件分支编排", "A2A 传递中间结果", "共享 Space Context 对齐目标"],
  },
  {
    id: "access",
    no: "04",
    eyebrow: "不限来源，不限框架",
    title: "不挑框架，不挑来源，统一接入",
    intro:
      "自定义智能伙伴、三方智能体、本地 Agent、云端 Agent 都能进入飞书高频办公场景，并被纳入企业统一权限和审计体系。",
    points: ["支持主流 Agent 框架与协议", "本地、云端、第三方统一纳管", "接入即纳入权限与审计", "一个场景一个伙伴"],
  },
  {
    id: "workspace",
    no: "05",
    eyebrow: "团队智能体",
    title: "团队共享、数据隔离、权限可控",
    intro:
      "面向团队的统一 Agent，会用飞书、能主动工作、有记忆，也能自定义编排工作流，通过 CLI、MCP、Skill 接入企业业务系统。",
    points: ["一个 Agent 服务整个团队", "团队间数据互不可见", "CLI / MCP / Skill 多种调用", "工作流可接入业务系统"],
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
    desc: "梳理叙事结构，提炼关键数据，输出可发送版本。",
    avatar: agentCamera,
    accent: "#59d2b2",
  },
];

function App() {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <CapabilityExperience />
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
        <a href="#native">飞书原生</a>
        <a href="#team">Agent 协同</a>
        <a href="#access">统一接入</a>
        <a href="#agents">预置 Agent</a>
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
          <h1>把一个复杂任务，交给一支 Agent 团队</h1>
          <span>
            主 Agent 理解目标、拆解任务、调度成员 Agent 并行协作。调研、写作、审核、执行各司其职，最后把结果收敛成可交付成果。
          </span>
          <div className="hero-actions">
            <a className="button primary hero-primary-action" href="#native">
              立即体验
              <Icon name="arrow" />
            </a>
          </div>
        </div>
        <HeroStoryboard />
      </div>
    </section>
  );
}

function HeroStoryboard() {
  const agents = [
    {
      name: "调研 Agent",
      task: "检索竞品资料",
      avatar: agentYellow,
      className: "research",
      cards: ["官网", "定价", "媒体"],
      output: "竞品列表",
    },
    {
      name: "写作 Agent",
      task: "整理报告结构",
      avatar: agentPonytail,
      className: "writing",
      cards: ["大纲", "段落", "摘要"],
      output: "报告初稿",
    },
    {
      name: "审核 Agent",
      task: "检查风险遗漏",
      avatar: agentGreenGlasses,
      className: "review",
      cards: ["风险", "事实", "引用"],
      output: "风险摘要",
    },
    {
      name: "执行 Agent",
      task: "同步行动建议",
      avatar: agentRedScarf,
      className: "execute",
      cards: ["待办", "群聊", "日程"],
      output: "行动建议",
    },
  ];

  return (
    <div className="hero-film" aria-label="飞书 aily 多 Agent 协作主视觉">
      <div className="film-glow glow-a" />
      <div className="film-glow glow-b" />
      <svg className="hero-lines" viewBox="0 0 1200 630" aria-hidden="true">
        <path className="line assign-line line-research" d="M588 270 C486 300 348 326 194 360" />
        <path className="line assign-line line-writing" d="M600 300 C628 380 660 430 690 474" />
        <path className="line assign-line line-review" d="M624 252 C700 178 760 154 818 150" />
        <path className="line assign-line line-execute" d="M634 294 C760 350 884 392 1012 430" />
      </svg>
      <div className="flow-packet packet-research" />
      <div className="flow-packet packet-writing" />
      <div className="flow-packet packet-review" />
      <div className="flow-packet packet-execute" />
      <div className="incoming-task">
        <div className="scan-line" />
        <span>新任务</span>
        <strong>完成一份竞品研究包</strong>
        <div className="task-metas">
          <em>目标</em>
          <em>截止时间</em>
          <em>资料范围</em>
          <em>交付格式</em>
        </div>
      </div>

      <div className="lead-hub">
        <div className="thinking-ring ring-one" />
        <div className="thinking-ring ring-two" />
        <img src={agentLead} alt="主 Agent" />
        <strong>主 Agent</strong>
        <span>理解目标 / 拆解任务 / 调度协作</span>
        <em>执行计划已生成</em>
      </div>

      <div className="thought-bubbles">
        {["识别目标", "提取上下文", "拆解任务", "选择成员 Agent"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="subtasks">
        {["资料调研", "结构写作", "风险审核", "行动建议"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      {agents.map((agent) => (
        <div className={`agent-work ${agent.className}`} key={agent.name}>
          <img src={agent.avatar} alt={agent.name} />
          <div>
            <strong>{agent.name}</strong>
            <span>{agent.task}</span>
          </div>
          <ul>
            {agent.cards.map((card) => (
              <li key={card}>{card}</li>
            ))}
          </ul>
          <div className="work-progress">
            <span />
          </div>
          <em className="work-output">{agent.output}</em>
        </div>
      ))}

      <div className="shared-space">
        <strong>Shared Space Context</strong>
        <span>目标、进度与产出实时对齐</span>
        {["竞品列表", "报告初稿", "风险摘要", "行动建议"].map((item) => (
          <em key={item}>{item}</em>
        ))}
      </div>

      <div className="final-report">
        <span>竞品研究包已完成</span>
        <strong>报告正文、风险摘要、行动建议</strong>
        <div>
          <em>同步到文档</em>
          <em>发送群聊</em>
          <em>生成日程</em>
        </div>
      </div>
    </div>
  );
}

function CapabilityExperience() {
  return (
    <section className="capability-experience" aria-label="五大核心能力">
      <div className="capability-heading">
        <span className="eyebrow">新版 aily 能力结构</span>
        <h2>从个人助理，到企业级 Agent 协作平台</h2>
      </div>
      <CapabilityNav />
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
            <span>{item.no}</span>
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
        <CapabilitySection capability={capability} index={index} key={capability.id} />
      ))}
    </div>
  );
}

function CapabilitySection({ capability, index }: { capability: Capability; index: number }) {
  return (
    <section className={`capability-section ${index % 2 === 1 ? "is-reverse" : ""}`} id={capability.id}>
      <div className="capability-inner">
        <div className="capability-copy">
          <span className="number">{capability.no}</span>
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

function CapabilityVisual({ id }: { id: CapabilityId }) {
  if (id === "native") return <NativeVisual />;
  if (id === "proactive") return <ProactiveVisual />;
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

function ProactiveVisual() {
  const events = [
    ["IM 新消息", "message"],
    ["审批即将超时", "shield"],
    ["日程临近", "calendar"],
    ["文档更新", "doc"],
  ] as const;

  return (
    <div className="visual proactive-visual">
      <div className="event-cloud">
        {events.map(([label, icon], index) => (
          <span style={{ "--delay": `${index * 0.25}s` } as CSSProperties} key={label}>
            <Icon name={icon} />
            {label}
          </span>
        ))}
      </div>
      <div className="signal-core">
        <img src={agentYellow} alt="主动工作 Agent" />
        <strong>Signal Engine</strong>
        <span>事件收集 → 信号提取 → 服务策略</span>
      </div>
      <div className="service-stack">
        <article>
          <Icon name="bell" />
          <strong>提醒</strong>
          <span>审批即将超时</span>
        </article>
        <article>
          <Icon name="spark" />
          <strong>建议</strong>
          <span>补充会议材料</span>
        </article>
        <article>
          <Icon name="check" />
          <strong>代办</strong>
          <span>生成跟进任务</span>
        </article>
      </div>
      <div className="quiet-control">静默时段 / 打扰频率可配置</div>
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
  return (
    <section className="preset-agents" id="agents">
      <div className="section-title">
        <span className="eyebrow">预置 Agent</span>
        <h2>内置 Agent，按角色开箱可用</h2>
        <p>从运营、销售、法务到项目管理，把常见任务做成可直接唤起的 Agent，按场景加入个人或团队工作空间。</p>
      </div>
      <div className="agent-grid">
        {presetAgents.map((agent) => (
          <article className="agent-card" key={agent.name} style={{ "--accent": agent.accent } as CSSProperties}>
            <img src={agent.avatar} alt={`${agent.name} 头像`} />
            <strong>{agent.name}</strong>
            <span>{agent.role}</span>
            <p>{agent.desc}</p>
            <a href="#native">
              查看能力
              <Icon name="arrow" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClosingFlow() {
  return (
    <section className="closing-flow">
      <div className="flow-copy">
        <span className="eyebrow">企业级治理</span>
        <h2>效率提升，也要可控、可信、可追溯</h2>
        <p>权限继承、数据隔离、敏感操作确认和全流程审计，为真实企业工作流兜底。</p>
      </div>
      <div className="governance-row">
        {["权限继承", "数据隔离", "人工确认", "过程审计"].map((item) => (
          <span key={item}>
            <Icon name="shield" />
            {item}
          </span>
        ))}
      </div>
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
      {name === "bell" && <path {...stroke} d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9M10 21h4" />}
      {name === "branch" && <path {...stroke} d="M6 3v6a3 3 0 0 0 3 3h6M18 9l3 3-3 3M6 21v-6a3 3 0 0 1 3-3" />}
      {name === "calendar" && <path {...stroke} d="M5 5h14v15H5zM8 3v4M16 3v4M5 10h14" />}
      {name === "check" && <path {...stroke} d="M5 12l4 4L19 6" />}
      {name === "cloud" && <path {...stroke} d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.2-2A5 5 0 0 0 7 18Z" />}
      {name === "doc" && <path {...stroke} d="M7 3h7l4 4v14H7zM14 3v5h5M10 13h6M10 17h5" />}
      {name === "lock" && <path {...stroke} d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v10H6z" />}
      {name === "message" && <path {...stroke} d="M5 6h14v9H9l-4 3V6Z" />}
      {name === "shield" && <path {...stroke} d="M12 3l7 3v5c0 5-3.2 8.5-7 10-3.8-1.5-7-5-7-10V6l7-3Z" />}
      {name === "spark" && <path {...stroke} d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />}
      {name === "tool" && <path {...stroke} d="M14.7 6.3a4 4 0 0 0-5 5l-5.4 5.4 3 3 5.4-5.4a4 4 0 0 0 5-5l-2.8 2.8-3-3 2.8-2.8Z" />}
    </svg>
  );
}

export default App;
