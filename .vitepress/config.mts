import { defineConfig } from 'vitepress';
import { guardDetachedOutline } from './outline-guard.mjs';

export default defineConfig({
  title: 'IntoChat OS',
  description:
    'Open-Source Cloud-Native Distributed AI Operating System built on DigitalBrain, .NET Aspire, and Orleans',
  base: '/os.docs/',
  cleanUrls: true,
  appearance: false,
  vite: {
    plugins: [{ name: 'guard-detached-vitepress-outline', enforce: 'pre', transform: guardDetachedOutline }],
  },
  srcExclude: ['README.md'],
  markdown: {
    config(md) {
      const fence = md.renderer.rules.fence!;
      md.renderer.rules.fence = (tokens, index, options, env, self) => {
        if (tokens[index].info.trim() === 'mermaid') {
          const source = md.utils.escapeHtml(JSON.stringify(tokens[index].content));
          return `<MermaidDiagram :source="${source}" />`;
        }
        return fence(tokens, index, options, env, self);
      };
    },
  },
  themeConfig: {
    logo: '/intochat-mark.svg',
    nav: [
      { text: 'Quickstart', link: '/getting-started' },
      { text: 'Architecture', link: '/architecture' },
      { text: 'Creator Loop', link: '/creator-self-improving-loop' },
      { text: 'Modules & Community', link: '/modules' },
      { text: 'GitHub', link: 'https://github.com/intochat/os' },
    ],
    sidebar: [
      {
        text: 'IntoChat OS',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Getting Started (Aspire)', link: '/getting-started' },
          { text: '3-Repository Architecture', link: '/architecture' },
          { text: 'Brains, Circles & Identity', link: '/concepts' },
        ],
      },
      {
        text: 'AI Native Shell & Loop',
        items: [
          { text: 'Ino Assistant & MemoryNeuron', link: '/ino-and-memory' },
          { text: 'Creator Self-Improving Loop', link: '/creator-self-improving-loop' },
          { text: 'C# Sandbox & Live Behaviors', link: '/sandbox-and-live-behaviors' },
        ],
      },
      {
        text: 'Ecosystem & Community',
        items: [
          { text: 'DDD Modules & Trending Requests', link: '/modules' },
          { text: 'Contributing', link: '/contributing' },
        ],
      },
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3] },
    docFooter: { prev: 'Previous', next: 'Next' },
    footer: {
      message: 'IntoChat OS · Open-Source Cloud-Native Distributed AI Operating System',
      copyright: 'IntoChat',
    },
  },
});
