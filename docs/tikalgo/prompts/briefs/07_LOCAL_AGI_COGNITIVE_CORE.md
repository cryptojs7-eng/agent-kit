# TIKALGO AI Cognitive Core (local AGI architecture)

| | |
|---|---|
| **Area** | Cognitive core |
| **Executable version / spec** | Spec Part VII · MASTER §17 C0–C10 |
| **Use** | Original brief (as written by the project owner). For Claude Code on the server, prefer the executable prompt in `TIKALGO_MASTER_PROMPT.md`, which adds the safety rules, phases and reporting format. |

---

TIKALGO — LOCAL AGI COGNITIVE CORE
OFFLINE-FIRST GENERAL INTELLIGENCE ARCHITECTURE
MISSION
معماری فعلی TIKALGO را از یک Trading AI به یک Local General Intelligence System ارتقا بده؛ به‌گونه‌ای که هسته هوشمند آن فقط برای پیش‌بینی بازار یا تولید سیگنال طراحی نشده باشد، بلکه دارای قابلیت‌های عمومی زیر باشد:
PERCEPTION
MEMORY
LEARNING
REASONING
CAUSALITY
PLANNING
PROBLEM SOLVING
WORLD MODEL
TOOL USE
KNOWLEDGE ACQUISITION
SELF-EVALUATION
REFLECTION
HYPOTHESIS GENERATION
EXPERIMENTATION
TRANSFER LEARNING
CONTINUAL LEARNING
UNCERTAINTY ESTIMATION
SELF-DIAGNOSTICS
SKILL ACQUISITION
AUTONOMOUS TASK EXECUTION
CONTROLLED SELF-IMPROVEMENT
Trading باید یکی از Domainهای اصلی این هسته باشد، نه کل هویت سیستم.
1. مهم‌ترین محدودیت
هسته تصمیم‌گیری و یادگیری باید:
100% Local / Offline-First / Cloud-Independent
باشد.
برای هیچ‌یک از موارد زیر وابسته نباش:

* OpenAI
* Claude
* Gemini
* OpenRouter
* Anthropic API
* Google AI API
* هر Cloud LLM
* API پولی برای inference

قطع اینترنت نباید باعث از کار افتادن Cognitive Core شود.
در صورت وجود اینترنت، فقط Data Sources مجازند داده دریافت کنند؛ اما reasoning، memory، learning، planning و decision باید بتوانند کاملاً محلی اجرا شوند.
Cloud AI نباید به‌عنوان fallback مخفی استفاده شود.
2. اصل معماری
یک «مدل واحد» را به زور مسئول همه‌چیز نکن.
سیستم را به یک Cognitive Architecture متشکل از مدل‌ها، حافظه، موتورهای استدلال، ابزارها و Controllerها تبدیل کن.
معماری پیشنهادی:

```text
                    TIKALGO LOCAL AGI CORE
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
  PERCEPTION              MEMORY                KNOWLEDGE
       │                      │                      │
       └──────────────────────┼──────────────────────┘
                              │
                         WORLD MODEL
                              │
                       COGNITIVE STATE
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
    REASONING              CAUSALITY              PLANNING
       │                      │                      │
       └──────────────────────┼──────────────────────┘
                              │
                       COGNITIVE ROUTER
                              │
       ┌──────────────┬───────┼────────┬──────────────┐
       │              │       │        │              │
    LOCAL ML      LOCAL LLM  SEARCH  SYMBOLIC      STATISTICS
       │              │       │        │              │
       └──────────────┴───────┼────────┴──────────────┘
                              │
                      MULTI-AGENT CRITIC
                              │
                    COUNTERFACTUAL ENGINE
                              │
                       DECISION ENGINE
                              │
                    SAFETY / RISK GATE
                              │
                            ACTION
                              │
                         OBSERVATION
                              │
                     SELF-EVALUATION
                              │
                       LEARNING LOOP
                              │
                  CONTROLLED IMPROVEMENT

```

3. AGI باید Capability-Based باشد
از چارچوب Google DeepMind برای ارزیابی مسیر AGI استفاده کن.
Reference:
[Google DeepMind — Levels of AGI](https://deepmind.google/research/publications/66938/?utm_source=chatgpt.com)
[ICML/PMLR — Levels of AGI](https://proceedings.mlr.press/v235/morris24b.html?utm_source=chatgpt.com)
سیستم باید به‌جای اینکه صرفاً «مدل بزرگ‌تری» داشته باشد، capabilityهای قابل اندازه‌گیری پیدا کند.
برای هر قابلیت:

```text
Capability
Current Level
Target Level
Benchmark
Score
Failure Rate
Confidence
Generalization

```

ثبت کن.
4. PERCEPTION / ENVIRONMENT UNDERSTANDING
تمام داده‌های TIKALGO را به یک Perception Layer استاندارد متصل کن:

* market data
* price
* volume
* order book
* DOM
* footprint
* CVD
* delta
* liquidity
* OI
* funding
* liquidations
* whale data
* on-chain
* macro
* news
* sentiment
* social
* economic calendar
* portfolio
* account state
* execution state

اما Perception فقط داده خام نباشد.
باید:

```text
RAW DATA
→ FEATURES
→ EVENTS
→ ENTITIES
→ RELATIONSHIPS
→ STATE
→ WORLD MODEL

```

بسازد.
5. WORLD MODEL
یک Local World Model بساز که وضعیت و Dynamics محیط را مدل کند.
World Model باید بتواند:

* current state
* historical state
* hidden state
* transitions
* dependencies
* possible future states
* uncertainty

را نگهداری و تخمین بزند.
برای طراحی از تحقیقات World Models و Model-Based RL استفاده کن:
[World Models — Ha & Schmidhuber](https://arxiv.org/abs/1803.10122?utm_source=chatgpt.com)
[Model-Based Reinforcement Learning Survey](https://doi.org/10.1561/2200000086?utm_source=chatgpt.com)
[2026 — A Definition and Roadmap for World Models](https://arxiv.org/abs/2607.06401?utm_source=chatgpt.com)
برای TIKALGO، World Model مالی باید بتواند سناریوهای:

```text
TREND
RANGE
BREAKOUT
REVERSAL
LIQUIDITY EVENT
NEWS SHOCK
VOLATILITY EXPANSION
VOLATILITY CONTRACTION
REGIME TRANSITION

```

را مدل کند.
6. MEMORY SYSTEM
حافظه را به چند نوع تقسیم کن:
Working Memory
Context فعلی.
Episodic Memory
تجربیات واقعی سیستم.
Semantic Memory
دانش عمومی و مفاهیم.
Procedural Memory
روش‌ها و مهارت‌های قابل اجرا.
Historical Market Memory
تجربیات گذشته بازار.
Self-Memory
دانش درباره نقاط قوت/ضعف خود سیستم.
حافظه باید:
STORE
→ INDEX
→ RETRIEVE
→ CONSOLIDATE
→ REFLECT
→ UPDATE
کند.
از ایده‌های معماری حافظه سلسله‌مراتبی نیز استفاده کن:
[MemGPT — Towards LLMs as Operating Systems](https://arxiv.org/abs/2310.08560?utm_source=chatgpt.com)
[Generative Agents — Observation, Planning, Reflection and Memory](https://arxiv.org/abs/2304.03442?utm_source=chatgpt.com)
این ایده‌ها را برای معماری Local TIKALGO تطبیق بده؛ وابستگی به LLM آنلاین را حذف کن.
7. KNOWLEDGE GRAPH
یک Knowledge Graph محلی بساز/از Graphify فعلی استفاده کن.
Entities:

* assets
* exchanges
* brokers
* companies
* projects
* tokens
* sectors
* economies
* currencies
* macro indicators
* people/organizations
* news events
* strategies
* signals
* trades

Relations:

```text
correlates_with
causes
influences
depends_on
belongs_to
contradicts
supports
preceded_by
followed_by
similar_to

```

Graphify موجود را بررسی و reuse کن.
8. REASONING CORE
Reasoning باید فقط text generation نباشد.
حداقل این روش‌ها را پشتیبانی کن:

* deductive reasoning
* inductive reasoning
* abductive reasoning
* probabilistic reasoning
* temporal reasoning
* causal reasoning
* analogical reasoning
* constraint reasoning
* symbolic reasoning
* numerical reasoning
* counterfactual reasoning

9. CAUSAL REASONING
Correlation را با Causality اشتباه نکن.
یک Causal Engine اضافه کن که بتواند:

```text
CAUSE
→ MECHANISM
→ EFFECT
→ ALTERNATIVE EXPLANATION
→ COUNTERFACTUAL

```

را بررسی کند.
مرجع اصلی:
[Cambridge University Press — Causality / Judea Pearl](https://www.cambridge.org/core/books/causality/B0046844FAE10CBF274D4ACBDAEB5F5B/listing?utm_source=chatgpt.com)
در بازار مثلاً تفاوت بین:

```text
BTC ↑ because ETH ↑

```

و

```text
BTC/ETH move together because a common macro/liquidity factor changed

```

را در مدل‌سازی لحاظ کن.
10. COUNTERFACTUAL ENGINE
برای هر تصمیم چند جهان ممکن را بررسی کن.
مثلاً:

```text
ACTION A
ACTION B
WAIT
DO NOTHING

```

و:

```text
Expected Outcome
Risk
Uncertainty
Opportunity Cost

```

را مقایسه کن.
در Trading:

```text
LONG
SHORT
WAIT
REDUCE
EXIT

```

ولی این موتور باید Generic باشد تا برای مسائل غیرمعاملاتی نیز قابل استفاده باشد.
11. PLANNING ENGINE
سیستم فقط پاسخ ندهد؛ برنامه بسازد.

```text
GOAL
 ↓
SUBGOALS
 ↓
PLAN
 ↓
ACTION
 ↓
OBSERVE
 ↓
EVALUATE
 ↓
REPLAN

```

Planning باید:

* short-horizon
* medium-horizon
* long-horizon
* hierarchical
* contingency-aware

باشد.
برای تصمیم‌گیری چندمرحله‌ای، جستجوی چند مسیر و بازگشت از مسیر ناموفق را پشتیبانی کن.
مرجع:
[Tree of Thoughts](https://arxiv.org/abs/2305.10601?utm_source=chatgpt.com)
12. TOOL USE
Cognitive Core باید Tool-Aware باشد.
ابزارهای فعلی:

* DB
* Redis
* WebSocket
* market data adapters
* scanners
* backtester
* execution engine
* risk engine
* news engine
* on-chain engine
* whale engine
* analytics
* Python execution
* local files
* knowledge graph

را به Tool Registry استاندارد تبدیل کن.
برای هر tool:

```text
tool
purpose
input_schema
output_schema
cost
latency
reliability
permissions
risk_level

```

ثبت شود.
Tool انتخابی باید بر اساس هدف و وضعیت محیط انتخاب شود، نه تصادفی.
ایده grounding بین reasoning و action را از ReAct و SayCan بررسی و متناسب با TIKALGO پیاده کن:
[ReAct — Google Research / Princeton](https://arxiv.org/abs/2210.03629?utm_source=chatgpt.com)
[Google Research — SayCan](https://research.google/pubs/do-as-i-can-not-as-i-say-grounding-language-in-robotic-affordances/?utm_source=chatgpt.com)
13. COGNITIVE ROUTER
یک Router مرکزی بساز.
قبل از حل مسئله تصمیم بگیرد:

```text
What kind of problem is this?

```

و بهترین Solver را انتخاب کند:

```text
Math
→ Numerical Solver

Prediction
→ ML Model

Optimization
→ Optimizer

Causal Question
→ Causal Engine

Planning
→ Planning Engine

Pattern Recognition
→ Local ML

Text Understanding
→ Local LLM

Historical Question
→ Memory/Retrieval

Trading Decision
→ Trading Intelligence Stack

```

هیچ مدل واحدی را مجبور به انجام تمام کارها نکن.
14. LOCAL MODEL STACK
اولویت:

* LightGBM
* XGBoost
* CatBoost
* sklearn
* PyTorch
* ONNX Runtime

برای CPU VPS مدل‌های کوچک و efficient انتخاب کن.
Local LLM:

* Ollama
* مدل‌های quantized
* ONNX/llama.cpp-compatible models

فقط در صورت توجیه معماری.
اما Local LLM:
نباید Single Point of Failure باشد.
حتی با:

```text
OLLAMA = OFF

```

سیستم باید همچنان:
REASON
PLAN
DECIDE
TRADE
LEARN
را تا جایی که مدل‌های structured آن قادرند انجام دهد.
15. SELF-REFLECTION
بعد از هر تصمیم، سیستم خودش را ارزیابی کند:

```text
What did I believe?
Why did I believe it?
What evidence did I use?
What evidence did I ignore?
What alternatives existed?
What happened?
Where was the error?

```

برای iterative self-evaluation از ایده Reflexion و Self-Refine تحقیق کن:
[Reflexion](https://arxiv.org/abs/2303.11366?utm_source=chatgpt.com)
[Self-Refine](https://arxiv.org/abs/2303.17651?utm_source=chatgpt.com)
اما self-reflection را به structured records تبدیل کن، نه صرفاً متن‌های آزاد.
16. HYPOTHESIS ENGINE
سیستم باید خودش بتواند سؤال تحقیقاتی ایجاد کند.
مثلاً:

```text
Hypothesis:
Funding extremes combined with positive CVD
may predict failed continuation during RANGE regimes.

```

سپس:

```text
Hypothesis
→ Dataset
→ Experiment
→ Backtest
→ Statistical Test
→ OOS
→ Walk Forward
→ Decision

```

انجام دهد.
Hypothesis بدون validation وارد Production نشود.
17. EXPERIMENT ENGINE
یک Research Scientist Loop بساز:

```text
OBSERVATION
→ QUESTION
→ HYPOTHESIS
→ EXPERIMENT
→ RESULT
→ CRITIQUE
→ REPLICATION
→ ACCEPT / REJECT

```

هر experiment باید versioned و reproducible باشد.
18. CONTINUAL LEARNING
سیستم باید در طول زمان یاد بگیرد ولی catastrophic forgetting ایجاد نکند.
مطالعه و استفاده از اصول continual learning:
[A Comprehensive Survey of Continual Learning](https://arxiv.org/abs/2302.00487?utm_source=chatgpt.com)
هر تغییر مدل ابتدا:
TRAIN
→ VALIDATION
→ OOS
→ WALK-FORWARD
→ STRESS
→ PAPER
→ SHADOW
→ APPROVAL
سپس Production.
هرگز:
`LOSS → AUTOMATIC LIVE RETRAIN → LIVE`
19. SKILL LIBRARY
سیستم باید مهارت‌های خود را ذخیره کند.
مثلاً:

```text
Skill:
Detect liquidity sweep

Inputs:
...

Procedure:
...

Validation:
...

Performance:
...

Applicable Regimes:
...

Known Failures:
...

```

مهارت‌ها باید composable باشند.
ایده Skill Library را از Voyager مطالعه کن، اما نسخه TIKALGO را کاملاً Offline طراحی کن:
[Voyager — Lifelong Learning and Skill Library](https://arxiv.org/abs/2305.16291?utm_source=chatgpt.com)
20. GENERALIZATION / TRANSFER
دانش نباید فقط برای BTCUSDT باشد.
سیستم باید بتواند دانش را بین:
Crypto
Forex
US Stocks
Metals
ETFs
انتقال دهد.
همچنین:

```text
BTC Regime Skill
→ ETH
→ Gold
→ SPX

```

را فقط وقتی انجام دهد که feature/causal structure نشان دهد transfer معتبر است.
Transfer باید empirically validated باشد.
21. UNCERTAINTY + "I DON'T KNOW"
یکی از مهم‌ترین قابلیت‌ها:
سیستم باید بتواند بگوید:

```text
I DON'T KNOW

```

یا:

```text
INSUFFICIENT EVIDENCE

```

اگر:

* uncertainty بالا
* distribution shift
* missing data
* conflicting evidence
* unknown regime
* weak historical analogues
* poor model calibration

وجود دارد، سیستم نباید hallucinate کند.
22. META-LEARNING
سیستم فقط market را یاد نگیرد.
یاد بگیرد:
کدام روش حل مسئله در چه شرایطی بهتر کار می‌کند.
مثلاً:

```text
Regime Classification
→ Model A best

Direction Prediction
→ Model B best

Rare Event Detection
→ Model C best

News Interpretation
→ Local LLM best

```

و این Meta-Knowledge را ذخیره کند.
23. MULTI-AGENT COGNITIVE DEBATE
به‌جای یک Agent:

```text
Analyst
Critic
Researcher
Risk Analyst
Causal Analyst
Portfolio Analyst
Execution Analyst
Judge

```

ایجاد کن.
ولی Agentها نباید فقط چند prompt مشابه باشند.
هر Agent باید objective متفاوت داشته باشد.
در نهایت:

```text
Evidence
→ Debate
→ Criticism
→ Resolution
→ Judge

```

و Judge نیز باید uncertainty را در نظر بگیرد.
24. TRADING DOMAIN LAYER
هسته عمومی بالا باید با ماژول‌های موجود TIKALGO متصل شود:

```text
Signal Engine
Strategy Engine
SMC/ICT
Feature Engine
Entry Engine
Exit Engine
Risk Engine
Portfolio Engine
Order Flow
Whale Engine
On-chain
Funding
OI
Liquidations
Macro
News
Sentiment
Scanner
Backtest
Execution
Journal

```

Trading Decision:

```text
Observe
→ Understand Regime
→ Retrieve History
→ Generate Candidates
→ Evaluate Evidence
→ Causal/Counterfactual Analysis
→ Critic
→ Portfolio Analysis
→ Risk Gate
→ Execute / WAIT

```

25. DECISION CRITIC
برای هر تصمیم یک Critic مستقل ایجاد کن که مأموریتش مخالفت با تصمیم باشد.

```text
WHY IS THIS DECISION WRONG?

```

آن را بررسی کند.
Critic باید به‌صورت مستقل به دنبال:

* traps
* regime errors
* data problems
* correlation illusion
* late entry
* poor liquidity
* poor R:R
* model uncertainty
* execution problems
* macro/news risks

بگردد.
26. SELF-DIAGNOSTICS
سیستم سلامت خودش را پایش کند:

```text
Data Health
Model Health
Memory Health
Knowledge Health
Tool Health
World Model Health
Decision Health
Drift
Calibration
Latency
Resource Usage

```

مثلاً:

```text
World Model Health: 81%
Memory Health: 94%
Model Calibration: 76%
Data Quality: 92%
Decision Confidence: 68%

```

27. RESOURCE-AWARE INTELLIGENCE
با توجه به VPS واقعی، سیستم باید Compute-Aware باشد.
اگر RAM/CPU محدود شد:

* مدل سبک‌تر
* batch کوچک‌تر
* inference محدودتر
* cache بیشتر
* low-frequency reasoning

استفاده کند.
از اجرای مدل‌های عظیم غیرضروری جلوگیری کن.
هدف:
Maximum Intelligence per Watt / CPU / RAM
باشد.
28. AGI EVALUATION SUITE
یک Evaluation Framework داخلی بساز.
فقط Trading را تست نکن.
حداقل:
Reasoning
logic / math / abstraction / planning
Generalization
task unseen
Memory
long-horizon retrieval
Transfer
knowledge transfer
Tool Use
correct tool selection
Causality
cause vs correlation
Counterfactual
alternative-world reasoning
Planning
multi-step execution
Learning
improvement after feedback
Self-Correction
error detection
Uncertainty
knows when it does not know
Finance
market reasoning and trading
Safety
risk-aware decisions
برای ارزیابی عمومی reasoning و abstraction، ARC-AGI را نیز بررسی کن:
[ARC-AGI official site](https://arcprize.org/?utm_source=chatgpt.com)
[ARC-AGI-2 Technical Report](https://arcprize.org/blog/arc-agi-2-technical-report?utm_source=chatgpt.com)
ملاک مهم:
Performance on unseen tasks, not memorization.
29. AGI SCORECARD
یک dashboard بساز:

```text
GENERAL INTELLIGENCE SCORE

Reasoning             0-100
Planning              0-100
Memory                0-100
Learning              0-100
Generalization        0-100
Transfer              0-100
Causality             0-100
Tool Use              0-100
Self-Correction       0-100
Uncertainty           0-100
World Modeling        0-100
Autonomy              0-100
Safety                0-100
Trading Intelligence  0-100

```

ولی این امتیاز را «اثبات AGI» معرفی نکن.
AGI را به‌عنوان یک ادعای تحقیقاتی تلقی کن و capability evidence ارائه بده.
30. SECURITY / GOVERNANCE
هسته AGI نباید آزادانه Production خودش را تغییر دهد.
باید دارای:

* permission boundaries
* tool permissions
* action limits
* model approval
* audit log
* immutable decision history
* kill switch
* risk veto
* human override
* sandbox

باشد.
برای governance و trustworthiness از NIST AI RMF استفاده کن:
[NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework?utm_source=chatgpt.com)
[NIST AI RMF Playbook](https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook?utm_source=chatgpt.com)
31. SELF-IMPROVEMENT ARCHITECTURE
Self-improvement باید:
SAFE + CONTROLLED + MEASURABLE
باشد.
چرخه:

```text
OBSERVE
→ DETECT WEAKNESS
→ FORM HYPOTHESIS
→ DESIGN EXPERIMENT
→ TRAIN/BUILD CANDIDATE
→ TEST
→ COMPARE
→ OOS
→ STRESS
→ SHADOW
→ APPROVE
→ DEPLOY

```

سیستم حق ندارد برای جبران Loss خودش را مستقیماً در LIVE تغییر دهد.
32. LOCAL AGI DOES NOT MEAN TRAINING A GIANT MODEL
از ساخت foundation model عظیم از صفر روی VPS خودداری کن مگر اینکه شواهد فنی و منابع لازم وجود داشته باشد.
هدف فعلی:

```text
SMALL LOCAL MODELS
+
SPECIALISTS
+
MEMORY
+
WORLD MODEL
+
KNOWLEDGE GRAPH
+
REASONING
+
PLANNING
+
TOOLS
+
LEARNING
+
META-CONTROLLER

```

است.
سیستم هوشمند حاصل جمع معماری است، نه فقط تعداد پارامترهای یک مدل.
مطالعه اصول محاسباتی و general methods را نیز با توجه به «Bitter Lesson» در طراحی trade-offها انجام بده:
[The Bitter Lesson — Richard Sutton](https://bitterlesson.ai/?utm_source=chatgpt.com)
33. OFFLINE AI CONTRACT
یک تست قطعی ایجاد کن:
تمام Cloud AI credentials و access را غیرفعال کن.
سپس:

```text
TIKALGO
→ START
→ LOAD LOCAL MODELS
→ LOAD MEMORY
→ LOAD KNOWLEDGE
→ PROCESS DATA
→ REASON
→ PLAN
→ DECIDE
→ PAPER TRADE
→ LEARN

```

باید اجرا شود.
تست automated:
`test_no_cloud_ai_dependency`
ایجاد کن.
همچنین network isolation test اجرا کن.
34. LOGGING / AUDIT
برای هر reasoning cycle ثبت کن:

```text
goal
observations
retrieved_memory
world_state
hypotheses
tools_used
models_used
reasoning_result
alternatives
critic
uncertainty
decision
action
result
error
learning
version
timestamp

```

از ثبت Chain-of-Thought خصوصی/خام به‌عنوان محصول یا لاگ حساس خودداری کن؛ به‌جای آن Decision Trace ساختاریافته و قابل Audit ذخیره کن.
35. FINAL TIKALGO COGNITIVE LOOP
در نهایت این Loop را پیاده کن:

```text
PERCEIVE
   ↓
UNDERSTAND
   ↓
REMEMBER
   ↓
RETRIEVE
   ↓
MODEL WORLD
   ↓
REASON
   ↓
GENERATE HYPOTHESES
   ↓
PREDICT
   ↓
PLAN
   ↓
SIMULATE COUNTERFACTUALS
   ↓
CRITICIZE
   ↓
ESTIMATE UNCERTAINTY
   ↓
SELECT ACTION
   ↓
RISK CHECK
   ↓
ACT / WAIT
   ↓
OBSERVE RESULT
   ↓
EVALUATE
   ↓
REFLECT
   ↓
LEARN
   ↓
UPDATE SKILLS / MEMORY
   ↓
TEST IMPROVEMENT
   ↓
RETURN TO PERCEPTION

```

36. IMPLEMENTATION REQUIREMENTS
قبل از کدنویسی:

1. کل TIKALGO repository و Graphify را Audit کن.
2. ماژول‌های موجود را map کن.
3. duplicate functionality را شناسایی کن.
4. dependency graph بساز.
5. Gap Analysis بین معماری فعلی و Local AGI Core انجام بده.
6. implementation roadmap تولید کن.
7. سپس به‌صورت incremental پیاده‌سازی کن.

هر قابلیت جدید باید:

* production-oriented
* typed
* tested
* observable
* versioned
* fault tolerant

باشد.
APIهای فعلی را بدون ضرورت نشکن.
37. IMPORTANT ARCHITECTURAL PRINCIPLE
Trading AI ≠ AGI
Trading Decision Engine = یک Domain Specialist
Local AGI Core = General Cognitive System
بنابراین:

```text
                 LOCAL AGI CORE
                        │
       ┌────────────────┼────────────────┐
       │                │                │
    TRADING          RESEARCH         GENERAL
    DOMAIN           DOMAIN           PROBLEMS

```

Trading باید از Cognitive Core استفاده کند؛ نه اینکه Cognitive Core فقط به Trading محدود شود.
38. FINAL DELIVERABLE
پس از implementation گزارش کامل بده:

```text
AGI CORE STATUS

Architecture:
...

Existing Modules Reused:
...

New Modules:
...

Local Models:
...

Memory:
...

World Model:
...

Knowledge Graph:
...

Reasoning:
...

Planning:
...

Causal Engine:
...

Counterfactual Engine:
...

Tool System:
...

Skill Library:
...

Continual Learning:
...

Self-Reflection:
...

Self-Improvement:
...

Generalization:
...

Evaluation Scores:
...

Offline Verification:
PASS/FAIL

Cloud AI Dependency:
NONE / FOUND

Trading Integration:
...

Safety:
...

Tests:
...

Known Limitations:
...

Next Capability:
...

```

FINAL RULE
هدف پروژه این نیست که صرفاً یک chatbot محلی یا یک trading bot با LLM ساخته شود.
هدف ساخت:
TIKALGO LOCAL GENERAL INTELLIGENCE CORE
است؛
یک معماری هوشمند محلی که بتواند:
ادراک کند، حافظه داشته باشد، جهان را مدل کند، استدلال کند، علت و معلول را بررسی کند، فرضیه بسازد، برنامه‌ریزی کند، از ابزارها استفاده کند، از تجربه یاد بگیرد، خطای خودش را تشخیص دهد، مهارت جدید ایجاد کند، دانش را بین حوزه‌ها منتقل کند، عدم‌قطعیت خود را بشناسد و در محیط واقعی با محدودیت‌های ایمن عمل کند.
در عین حال:
هیچ Cloud AI یا مدل آنلاین پولی نباید برای عملکرد اصلی آن ضروری باشد.
از منابع علمی ذکرشده در این سند به‌عنوان inspiration و technical references استفاده کن، اما هیچ روش، benchmark یا ادعایی را کورکورانه کپی نکن. هر قابلیت را در TIKALGO با معیار قابل اندازه‌گیری، تست، validation و evidence پیاده‌سازی کن.  اینم اضافه کن
