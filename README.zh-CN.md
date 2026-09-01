# SANYALnet Labs Kimi Code CLI 软件开发公司

> **[MoonshotAI/kimi-code](https://github.com/MoonshotAI/kimi-code) 的个人下游分支，包含本地改动，不打算回合并到上游。**

一个经过调优的 Kimi Code CLI 构建版，开箱即用地提供一个预配置的六角色 AI **软件开发公司** —— 灵感来自 [ChatDev](https://github.com/OpenBMB/ChatDev)。六个专业子代理（CEO、CPO、CTO、程序员、评审员、测试员）通过五阶段 SDLC 流水线协作，把自然语言产品需求变成经过评审和测试的可运行代码。

**➡ [下载最新分支发行版](https://github.com/tuklusan/kimi-code/releases/latest)** —— 覆盖 linux-x64 / linux-arm64 / darwin-x64 / darwin-arm64 / win32-x64 / win32-arm64 的原生二进制，标签为 `kimi-code-sanyalnet-cli-vX.Y.Z`。当前推荐基线为 **rev 1.0.0**（Nemotron 3 Ultra 550B A55B 作为默认模型，文件系统驱动的初始提示自动加载，完整的六角色 SDLC 软件公司）。

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE) [![CI](https://img.shields.io/github/actions/workflow/status/tuklusan/kimi-code/ci.yml?branch=main&label=CI)](https://github.com/tuklusan/kimi-code/actions/workflows/ci.yml) [![Smoke](https://img.shields.io/github/actions/workflow/status/tuklusan/kimi-code/sanyalnet-smoke.yml?branch=main&label=Company%20smoke%20%C3%97%206%20platforms)](https://github.com/tuklusan/kimi-code/actions/workflows/sanyalnet-smoke.yml) [![Release](https://img.shields.io/github/v/release/tuklusan/kimi-code?label=fork%20release&color=blue)](https://github.com/tuklusan/kimi-code/releases/latest)

关于底层 Kimi Code CLI 产品 —— 安装脚本、快速上手、编辑器/IDE 集成（ACP）、`/mcp-config`、视频输入、hooks、插件市场、通用命令参考 —— 请参见 [上游 README](https://github.com/MoonshotAI/kimi-code#readme) 和 [上游文档](https://moonshotai.github.io/kimi-code/zh/)。本 README 只介绍本分支在其之上新增的部分。

## 实际运行截图

<video src="https://github.com/tuklusan/kimi-code/releases/download/kimi-code-sanyalnet-cli-v1.0.0/sanyalnet-company-1.0.0.mp4" poster="docs/media/linux-x64-company-active.png" controls muted playsinline width="900">
  您的浏览器不支持 HTML5 视频。
  <a href="https://github.com/tuklusan/kimi-code/releases/download/kimi-code-sanyalnet-cli-v1.0.0/sanyalnet-company-1.0.0.mp4">下载 MP4 演示（20 MB）</a>
  或查看下方静态截图。
</video>

▶ 如果内嵌播放器无法加载，请[直接下载 MP4（rev 1.0.0）](https://github.com/tuklusan/kimi-code/releases/download/kimi-code-sanyalnet-cli-v1.0.0/sanyalnet-company-1.0.0.mp4)。较早的 rev 0.0.3 演示作为[历史归档](https://github.com/tuklusan/kimi-code/releases/download/kimi-code-sanyalnet-cli-v0.0.3/snake-ladders-kimi-1.mp4)保留。

![SANYALnet Labs 软件开发公司在 Linux x64 上运行，六个子代理全部活跃——CEO 正在召开内部全员会议修复回归问题，explore / CTO / programmer / reviewer 已完成，tester 正在跑验证套件。模型为经 NVIDIA NIM 的 Nemotron 3 Super 120B。](docs/media/linux-x64-company-active.png)

SANYALnet 实验机上的一次真实会话，运行中，对象是 `snakes-and-ladders` 工作区。操作员上报了一个严重回归（"棋子不移动、梯子长得像梯子、蛇的样子不对"），要求 CEO 召开内部全员会议。从上到下阅读代理树：

- **`ceo`** —— 已运行 62 分 17 秒，25.8k tokens，正在使用 Agent 工具触发 tester 的验证套件 —— 主持全员会议。
- **`explore`** —— 2 分 8 秒完成，35.3k tokens —— 审查了 `gameView.js` 的渲染问题。
- **`cto`** —— 2 分 59 秒完成，51.3k tokens —— 确认了架构。
- **`programmer`** —— 9 分 46 秒完成，77.5k tokens，26 次工具调用 —— 应用了渲染 + 移动的修复。
- **`reviewer`** —— 2 分 21 秒完成，44.3k tokens —— 审计了变更。
- **`tester`** —— 已运行 43 分 44 秒，105k tokens，153 次工具调用，正在执行 `node verify_tests.js` —— 在 CEO 结束会议前完成验证套件的签字。

上下文占用：模型 977k 上下文窗口中已用 25.4k（3%）。六个代理都固定在同一个 NVIDIA NIM 的 Nemotron 3 Super 120B 上，thinking effort 为 high —— 前面没有代理（本分支的 `send_prompt_cache_key = false` 选项已退休了分支之前的 NIM 代理变通方案），六个角色在同一个会话里全部活跃。

其余五个平台（linux-arm64、darwin-x64、darwin-arm64、win32-x64、win32-arm64）的截图将随拍随传。

## 软件公司的工作原理

任何全新会话启动时，kimi 都会通过本分支的 [`KIMI_INITIAL_PROMPT_FILE`](docs/en/configuration/env-vars.md#initial-prompt-autoload-downstream-fork-only) 自动加载 `~/.kimi-code/SDLC-Multi-Agent-Project-Directive.md`，并把 `~/.kimi-code/agents/` 下的六个角色文件当作可绑定子代理。当你在预加载的指令上按回车后，CEO 与 CPO **自动执行第 1 阶段** —— 阅读当前项目文件夹、综合出一份 **项目状态简报**，然后 **暂停等待你的指示**。第 2 到第 5 阶段有定义但受控：没有你明确指出进入哪个阶段、追求什么目标，它们绝不启动。

| 阶段 | 代理 | 输出 | 触发条件 |
|---|---|---|---|
| 1 — 立项与状态审计 | `ceo` + `cpo` | 项目状态简报 + 下一步候选任务菜单 | 会话启动时自动进入；末尾暂停 |
| 2 — 架构蓝图 | `cto` | 技术栈选型 + 架构签字 | 操作员核准了第 1 阶段的某个目标 |
| 3 — 实现 | `programmer` | 按蓝图增量编写源代码 | 操作员核准了第 2 阶段的蓝图 |
| 4 — 静态评审 | `reviewer` | 与程序员循环反馈，直到零关键缺陷 | 程序员报告第 3 阶段完成 |
| 5 — QA | `tester` | 单元 / 集成 / 边界测试 + 合规证书 | 评审员完成第 4 阶段签字 |

每个阶段的输出即下一阶段的输入；子代理在隔离上下文中运行并把结构化结果交回主会话，所以主会话记录保持清晰易读。完整指令（包含"第 1 阶段后暂停"规则及各下游阶段的前置条件）位于 [`sanyalnet-lab/SDLC-Multi-Agent-Project-Directive.md`](sanyalnet-lab/SDLC-Multi-Agent-Project-Directive.md)；每个角色定义在 [`sanyalnet-lab/agents/`](sanyalnet-lab/agents/) 下。

## 在新机器上安装本分支

两步走：安装分支二进制，然后安装软件公司配置。

**1. 分支二进制。** 从 [最新发行版](https://github.com/tuklusan/kimi-code/releases/latest) 下载对应平台的 zip，解压，把 `kimi` 放到 `PATH` 上。macOS 首次启动前必须清除隔离标记：

```sh
xattr -d com.apple.quarantine kimi
```

验证：

```sh
kimi --version
```

**2. 公司配置。** 克隆本分支并运行安装脚本 —— 它把六个代理角色和 SDLC 指令软链到 `$KIMI_CODE_HOME`（默认 `~/.kimi-code`），并在 `--autoload` 模式下把初始提示环境变量写入 `~/.bashrc`，让每个全新 kimi 会话打开时编辑器就已经预填好指令。幂等 —— `git pull` 后重跑即可刷新。

```sh
git clone https://github.com/tuklusan/kimi-code.git
cd kimi-code/sanyalnet-lab
./bin/install.sh --autoload
```

首次运行时安装脚本会（一次性、静默地）询问你的 NVIDIA NIM API key，并根据脱敏模板生成 `~/.kimi-code/config.toml`。

## 本分支在上游之上新增的内容

- **`sanyalnet-lab/`** —— 六个代理角色 + 五阶段 SDLC 指令 + 一个幂等安装脚本，把整个软件开发公司部署到任意 Linux / macOS / Windows 机器。参见 [`sanyalnet-lab/README.md`](sanyalnet-lab/README.md)。
- **初始提示自动加载** —— 每次全新会话（永不在恢复时）预填 TUI 编辑器，按顺序查找：(1) `KIMI_INITIAL_PROMPT_FILE` 环境变量；(2) 规范化文件路径 `$KIMI_CODE_HOME/initial-prompt.md`。第二条是"文件系统自动加载"—— 只要该文件存在，下一次 kimi 启动就会自动加载它，不需要环境变量，也不需要重开 shell。`sanyalnet-lab/bin/install.sh` 把它建成指向 SDLC 指令的符号链接，因此已安装的公司配置开箱即可自动加载。文档：[env-vars.md](docs/en/configuration/env-vars.md#initial-prompt-autoload-downstream-fork-only)。
- **按 provider 的 `send_prompt_cache_key` 开关** —— 针对严格校验请求体的 OpenAI 兼容网关（NVIDIA NIM、部分 vLLM 部署）—— 它们会用 HTTP 400 拒绝未知参数。已知严格端点在 `provider catalog add` 时自动关闭；可通过 `kimi provider set <id> --send-prompt-cache-key <true|false>` 或手工编辑 `config.toml` 覆盖。取代了分支之前的 `nim_proxy.py` 变通方案（保留在 [`sanyalnet-lab/legacy/`](sanyalnet-lab/legacy/) 作为存档）。
- **`KIMI_OUTBOUND_MIN_INTERVAL_MS`** —— 模型驱动的对外网络调用（`fetch_url`、`web_search`）之间最小 1 秒的间隔。两个工具共用同一节流器，跨工具的失控循环也会被限速。默认 `1000`；设为 `0` 关闭。
- **自动更新默认关闭** —— 本分支通过 `kimi-code-sanyalnet-cli-v*` 标签发布自己的原生二进制；上游更新通道是独立发行渠道，若不关闭会静默把分支二进制替换为上游版本。用 `KIMI_CODE_AUTO_UPDATE=1` 显式打开。手动 `kimi upgrade` 仍然可用。
- **下游发行工作流** —— [`.github/workflows/sanyalnet-release.yml`](.github/workflows/sanyalnet-release.yml) 发布带标签的 `kimi-code-sanyalnet-cli-vX.Y.Z` 版本，包含六平台 SEA 二进制，不需要 macOS 签名。
- **公司代码评审工作流** —— [`sanyalnet-lab/review-workflows/`](sanyalnet-lab/review-workflows/) 提供语言中立、带裁决机制的评审流程，由完整的软件公司对当前代码库运行。已随分支发布两个：[`deepseek-v4-pro-software-company-review-workflow-v31-draft.md`](sanyalnet-lab/review-workflows/deepseek-v4-pro-software-company-review-workflow-v31-draft.md)（面向 DeepSeek V4 Pro，需要 `DEEPSEEK_API_KEY`）和 [`nvidia-nim-nemotron3-ultra-software-company-review-workflow-final.md`](sanyalnet-lab/review-workflows/nvidia-nim-nemotron3-ultra-software-company-review-workflow-final.md)（面向 Nemotron 3 Ultra 550B A55B，需要 `NVIDIA_API_KEY_CODING`）。`install.sh` 会把两者软链到 `$KIMI_CODE_HOME`，任何 kimi 会话只需一次 `cat` + 粘贴即可调用。
- **模型 404 视为可重试** —— 一些模型网关在端点预热或自动扩缩时会短暂返回 HTTP 404（尤其是 NVIDIA NIM 目录端点在 Nemotron 自动扩缩期间）。上游把 404 当作确定性错误快速失败；本分支把 404 归为与 429 同类的可重试，一次自动扩缩抖动不再让整个公司流水线中止。
- **`WaitFor` 工具等待上限** —— 本分支评估过把这个上限从上游默认的 10 分钟（600 秒）提高。经过 bisect（见 commit `be9dc8dc`、`2b0a66d2`、`1d3b7627`）验证有两个阻塞：(1) 常量出现的两个位置 —— zod `.max()` 与 `.describe()` 文本 —— 都会被写入工具 JSON 并进入 LLM 系统提示，任何数值调整都会让压缩（compaction）提示的 tokenization 偏移约 1 个 token，从而让 `fullCompaction.test.ts` 中多个对 token 数敏感的上游测试报错；(2) 两个上游内联快照（`test/tool/tool.test.ts` 与 `test/agent/loop/loop.test.ts`）逐字嵌入工具 JSON，包括整个工具 schema 的 SHA-256 哈希，任何数值改动都会导致快照相等性检查失败。安全提升上限需要通过 `vitest -u` 在 CI 中重新生成这些快照。为此本分支保留上游的 600 秒上限。工具自身的描述已经告诉调用方"超时不是错误：该工具返回仍在运行的任务列表，你可以再次调用以继续等待" —— 长时间等待就是以 10 分钟为步长的轮询循环。

## 多平台测试结果

每次向 `main` 推送、且触及 `sanyalnet-lab/`、冒烟工作流本身或分支自动加载源码时，都会通过 [`sanyalnet-lab/bin/install.sh`](sanyalnet-lab/bin/install.sh) 把软件开发公司部署到六台发行 runner 的沙箱 `KIMI_CODE_HOME`，然后断言每个角色文件和指令都到位、种子 `config.toml` 携带 `REPLACE_ME` 占位符（永远不是真 key）、安装脚本幂等、并且分支的 `KIMI_INITIAL_PROMPT_FILE` 自动加载布线仍存在于构建源码中。不调用 LLM —— 这是一个快速、确定性的布线检查，六台 runner 并行大约一分钟完成。

| Runner | OS 镜像 | 公司安装 | 用时 |
|---|---|---|---|
| linux-x64 | `ubuntu-24.04` | ✅ 通过 | ~10 秒 |
| linux-arm64 | `ubuntu-24.04-arm` | ✅ 通过 | ~10 秒 |
| darwin-x64 (Intel) | `macos-15-intel` | ✅ 通过 | ~15 秒 |
| darwin-arm64 (Apple Silicon) | `macos-15` | ✅ 通过 | ~15 秒 |
| win32-x64 | `windows-2025-vs2026` | ✅ 通过 | ~25 秒 |
| win32-arm64 | `windows-11-arm` | ✅ 通过 | ~25 秒 |

实时状态见上方"Company smoke × 6 platforms"徽章；完整运行历史见 [Actions → Sanyalnet Company Smoke Test](https://github.com/tuklusan/kimi-code/actions/workflows/sanyalnet-smoke.yml)。

配套的 [Sanyalnet E2E Fibonacci](https://github.com/tuklusan/kimi-code/actions/workflows/sanyalnet-e2e-fibonacci.yml) 工作流（手动触发）以真实 NVIDIA NIM 模型运行完整的五阶段流水线，并断言公司交付了一个可工作的 Fibonacci 程序 + 文档 —— 验收标准见 [`.github/workflows/sanyalnet-e2e-fibonacci.yml`](.github/workflows/sanyalnet-e2e-fibonacci.yml)。它依赖 `NVIDIA_API_KEY` 仓库 secret，在 secret 未设置时是绿色的空操作。

## 开发本分支

```sh
git clone https://github.com/tuklusan/kimi-code.git
cd kimi-code
pnpm install
pnpm build
pnpm test
```

Node.js `≥ 24.15.0`，pnpm `10.33.0`。与上游同一工具链 —— 本分支未引入新的构建时依赖。

## 社区

- 分支专属 issues：[tuklusan/kimi-code/issues](https://github.com/tuklusan/kimi-code/issues)
- 上游 Kimi Code CLI issues：[MoonshotAI/kimi-code/issues](https://github.com/MoonshotAI/kimi-code/issues)
- 安全：见 [SECURITY.md](SECURITY.md)。

## 鸣谢

- [MoonshotAI/kimi-code](https://github.com/MoonshotAI/kimi-code) —— 本分支所基于的上游项目。
- [ChatDev](https://github.com/OpenBMB/ChatDev) —— 多角色 SDLC 流水线的灵感来源。
- [`pi-tui`](https://github.com/earendil-works/pi-mono/tree/main/packages/tui) —— 经由上游继承的 TUI 基础库。

## 许可

在 [MIT License](LICENSE) 下发布。
