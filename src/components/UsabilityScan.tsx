import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Download, 
  RefreshCw, 
  X, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal,
  Target,
  Maximize2
} from 'lucide-react';

export type IssueCategory = 'type' | 'font' | 'color' | 'style' | 'layout' | 'readability' | 'hygiene';
export type IssueSeverity = 'high' | 'medium' | 'low';

export interface AuditIssue {
  id: string;
  category: IssueCategory;
  severity: IssueSeverity;
  title: string;
  measured: string;
  expected: string;
  suggestedFix: string;
  selector: string;
  element: HTMLElement;
  rect: DOMRect;
}

const ALLOWED_FONT_SIZES = [12, 14, 15, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60, 64, 72, 80, 96];

const BRAND_PALETTE_HEX = [
  '#1b3b33', // Forest green
  '#122621', // Dark forest
  '#0d1c18', // Deep forest
  '#2a544a', // Light forest
  '#b8923d', // Champagne gold
  '#cba44e', // Gold hover
  '#d4af37', // Light gold
  '#e6d2a8', // Champagne
  '#f7f5ef', // Cream
  '#ece9de', // Muted cream
  '#111111', // Charcoal/black
  '#ffffff', // White
  '#000000', // Black
];

function rgbToHex(rgbStr: string): string {
  const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return rgbStr;
  const r = parseInt(match[1], 10).toString(16).padStart(2, '0');
  const g = parseInt(match[2], 10).toString(16).padStart(2, '0');
  const b = parseInt(match[3], 10).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`.toLowerCase();
}

function isColorCloseToPalette(hex: string): boolean {
  if (!hex.startsWith('#') || hex.length < 7) return true;
  // Neutral grays and transparent are allowed
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (Math.abs(r - g) < 15 && Math.abs(g - b) < 15) return true; // Grayscale neutral

  return BRAND_PALETTE_HEX.some((brandHex) => {
    const br = parseInt(brandHex.slice(1, 3), 16);
    const bg = parseInt(brandHex.slice(3, 5), 16);
    const bb = parseInt(brandHex.slice(5, 7), 16);
    const diff = Math.sqrt((r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2);
    return diff < 45; // Within perceptual color cluster
  });
}

function getCssSelector(el: HTMLElement): string {
  if (el.id) return `#${el.id}`;
  let path = el.tagName.toLowerCase();
  if (el.className && typeof el.className === 'string') {
    const primaryClass = el.className.split(' ').find((c) => c && !c.includes(':') && !c.includes('/'));
    if (primaryClass) path += `.${primaryClass}`;
  }
  return path;
}

export const UsabilityScan: React.FC = () => {
  const [isAuditActive, setIsAuditActive] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSeverity, setActiveSeverity] = useState<string>('all');
  const [hoveredIssue, setHoveredIssue] = useState<AuditIssue | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<AuditIssue | null>(null);
  const [issues, setIssues] = useState<AuditIssue[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Check URL param ?audit=1 or localStorage dev flag
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const auditParam = urlParams.get('audit') === '1';
    const localFlag = localStorage.getItem('velmo_audit_mode') === 'true';

    if (auditParam || localFlag) {
      setIsAuditActive(true);
      setIsDrawerOpen(true);
    }

    // Keyboard shortcut for internal engineers: Ctrl+Shift+U
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        setIsAuditActive((prev) => {
          const next = !prev;
          localStorage.setItem('velmo_audit_mode', next ? 'true' : 'false');
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Live computed DOM and CSS Audit Engine
  const runLiveAudit = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    setIsScanning(true);

    const detectedIssues: AuditIssue[] = [];
    let issueCounter = 1;

    // Scan all visible rendered content inside main, header, footer
    const targetElements = document.querySelectorAll<HTMLElement>('main *, header *, footer *');

    targetElements.forEach((el) => {
      // Ignore elements inside the audit overlay itself
      if (el.closest('[data-audit-ignore]')) return;
      if (el.offsetParent === null) return; // Hidden elements

      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const fontSize = parseFloat(computed.fontSize);
      const lineHeight = parseFloat(computed.lineHeight);
      const textContent = el.innerText?.trim() || '';
      const selector = getCssSelector(el);

      // 1. TYPE SCALE CHECKS
      if (textContent.length > 0 && el.children.length === 0) {
        // Flag arbitrary non-scale font sizes
        const isStandardSize = ALLOWED_FONT_SIZES.some((s) => Math.abs(s - fontSize) < 0.6);
        if (!isStandardSize) {
          detectedIssues.push({
            id: `issue-${issueCounter++}`,
            category: 'type',
            severity: 'medium',
            title: 'Font size outside standard type scale',
            measured: `${fontSize.toFixed(1)}px`,
            expected: 'Scale: 12, 14, 15, 16, 18, 24, 32, 48, 64px',
            suggestedFix: `Round to nearest standard token (e.g. text-xs for 12px, text-[15px] for body)`,
            selector,
            element: el,
            rect,
          });
        }

        // Flag body text under 14px (excluding small labels and badges)
        const isLabelOrBadge = el.tagName === 'SPAN' || el.tagName === 'CODE' || computed.textTransform === 'uppercase';
        if (!isLabelOrBadge && fontSize < 14) {
          detectedIssues.push({
            id: `issue-${issueCounter++}`,
            category: 'type',
            severity: 'high',
            title: 'Body copy is very small',
            measured: `font-size: ${fontSize.toFixed(0)}px`,
            expected: 'Body copy ≥ 15px',
            suggestedFix: 'Increase to text-[15px] (or text-base) for optimal architectural readability',
            selector,
            element: el,
            rect,
          });
        }

        // Flag label / mono text under 12px
        if (isLabelOrBadge && fontSize < 11.5) {
          detectedIssues.push({
            id: `issue-${issueCounter++}`,
            category: 'type',
            severity: 'medium',
            title: 'Micro label text under 12px',
            measured: `font-size: ${fontSize.toFixed(0)}px`,
            expected: 'Micro labels ≥ 12px (text-xs)',
            suggestedFix: 'Set font size to at least 12px with uppercase tracking',
            selector,
            element: el,
            rect,
          });
        }
      }

      // 2. FONT CONSISTENCY
      if (textContent.length > 0 && el.children.length === 0) {
        const family = computed.fontFamily.toLowerCase();
        const isPermittedFont = 
          family.includes('cormorant') || 
          family.includes('jakarta') || 
          family.includes('mono') || 
          family.includes('system-ui') || 
          family.includes('sans-serif') || 
          family.includes('serif');

        if (!isPermittedFont) {
          detectedIssues.push({
            id: `issue-${issueCounter++}`,
            category: 'font',
            severity: 'high',
            title: 'Unregistered font family in use',
            measured: computed.fontFamily,
            expected: 'Cormorant Garamond (Serif) or Plus Jakarta Sans or Space Mono',
            suggestedFix: 'Standardize to var(--font-serif), var(--font-sans), or var(--font-mono)',
            selector,
            element: el,
            rect,
          });
        }
      }

      // 3. COLOR PALETTE CONSISTENCY
      if (textContent.length > 0 && el.children.length === 0) {
        const textColorHex = rgbToHex(computed.color);
        if (!isColorCloseToPalette(textColorHex)) {
          detectedIssues.push({
            id: `issue-${issueCounter++}`,
            category: 'color',
            severity: 'medium',
            title: 'Off-palette text color detected',
            measured: `color: ${textColorHex}`,
            expected: 'Forest (#1B3B33), Gold (#B8923D), Cream (#F7F5EF), or neutral dark (#111111)',
            suggestedFix: 'Use brand CSS custom property --color-velmo-* token',
            selector,
            element: el,
            rect,
          });
        }
      }

      // 4. STYLE & BUTTON TAP TARGET CONSISTENCY
      if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.getAttribute('role') === 'button') {
        if (rect.height > 0 && rect.height < 40 && rect.width < 40) {
          detectedIssues.push({
            id: `issue-${issueCounter++}`,
            category: 'style',
            severity: 'high',
            title: 'Sub-44px interactive tap target',
            measured: `${Math.round(rect.width)}×${Math.round(rect.height)}px`,
            expected: 'Minimum 44×44px touch target (WCAG 2.5.5)',
            suggestedFix: 'Increase padding or set min-height: 44px on interactive controls',
            selector,
            element: el,
            rect,
          });
        }
      }

      // 5. READABILITY & ALL-CAPS STRINGS
      if (textContent.length > 28 && el.children.length === 0) {
        // Flag long runs of uppercase text (>25 chars)
        if (textContent === textContent.toUpperCase() && /[A-Z]/.test(textContent)) {
          detectedIssues.push({
            id: `issue-${issueCounter++}`,
            category: 'readability',
            severity: 'medium',
            title: 'Long run of uppercase text',
            measured: `${textContent.length} uppercase characters`,
            expected: 'Sentence case for phrases over 25 characters',
            suggestedFix: 'Reserve all-caps for short 2-4 word tags or indicators',
            selector,
            element: el,
            rect,
          });
        }

        // Body line-height ratio
        if (fontSize >= 14 && lineHeight > 0 && lineHeight / fontSize < 1.35) {
          detectedIssues.push({
            id: `issue-${issueCounter++}`,
            category: 'readability',
            severity: 'low',
            title: 'Dense line-height for multi-line copy',
            measured: `line-height ratio ${(lineHeight / fontSize).toFixed(2)}`,
            expected: 'Line-height ratio ≥ 1.45 for body prose',
            suggestedFix: 'Apply leading-relaxed or leading-normal',
            selector,
            element: el,
            rect,
          });
        }
      }

      // 6. CONTENT HYGIENE & LEFTOVER DEV BADGES
      if (textContent.length > 0 && el.children.length === 0) {
        if (
          textContent.includes('Contrast:') ||
          textContent.includes('Font: Plus') ||
          textContent.includes('Tier 1 Gold') ||
          textContent.includes('Button: Outlined') ||
          textContent.includes('Lorem ipsum')
        ) {
          detectedIssues.push({
            id: `issue-${issueCounter++}`,
            category: 'hygiene',
            severity: 'high',
            title: 'Leftover dev label or placeholder text on public view',
            measured: `"${textContent.slice(0, 30)}..."`,
            expected: 'Clean production copy without dev annotations',
            suggestedFix: 'Remove dev tag badge from public markup',
            selector,
            element: el,
            rect,
          });
        }
      }
    });

    // 7. LAYOUT: CHECK HORIZONTAL OVERFLOW
    const docWidth = document.documentElement.clientWidth;
    const bodyWidth = document.body.scrollWidth;
    if (bodyWidth > docWidth + 3) {
      detectedIssues.push({
        id: `issue-${issueCounter++}`,
        category: 'layout',
        severity: 'high',
        title: 'Horizontal layout overflow detected',
        measured: `Page width ${bodyWidth}px > Viewport ${docWidth}px`,
        expected: 'Page width ≤ viewport width (zero horizontal scroll)',
        suggestedFix: 'Add overflow-x-hidden to main wrapper or adjust wide flex elements',
        selector: 'body',
        element: document.body,
        rect: document.body.getBoundingClientRect(),
      });
    }

    setIssues(detectedIssues);
    setIsScanning(false);
  }, []);

  // Re-run scan when active or window resizes
  useEffect(() => {
    if (!isAuditActive) return;
    runLiveAudit();

    const handleResize = () => runLiveAudit();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [isAuditActive, runLiveAudit]);

  // Scroll to element and highlight
  const scrollToIssueElement = (issue: AuditIssue) => {
    setSelectedIssue(issue);
    issue.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Add brief highlight animation
    issue.element.classList.add('velmo-audit-pulse');
    setTimeout(() => {
      issue.element.classList.remove('velmo-audit-pulse');
    }, 2000);
  };

  // Filter issues
  const filteredIssues = useMemo(() => {
    return issues.filter((iss) => {
      const matchCat = activeCategory === 'all' || iss.category === activeCategory;
      const matchSev = activeSeverity === 'all' || iss.severity === activeSeverity;
      return matchCat && matchSev;
    });
  }, [issues, activeCategory, activeSeverity]);

  // Counts by severity and category
  const severityCounts = useMemo(() => {
    return {
      high: issues.filter((i) => i.severity === 'high').length,
      medium: issues.filter((i) => i.severity === 'medium').length,
      low: issues.filter((i) => i.severity === 'low').length,
      total: issues.length,
    };
  }, [issues]);

  // Export report as JSON or Markdown
  const handleExportReport = (format: 'markdown' | 'json') => {
    let content = '';
    let filename = `velmo-usability-audit-${new Date().toISOString().slice(0, 10)}`;

    if (format === 'json') {
      content = JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          url: window.location.href,
          summary: severityCounts,
          issues: issues.map(({ id, category, severity, title, measured, expected, suggestedFix, selector }) => ({
            id,
            category,
            severity,
            title,
            measured,
            expected,
            suggestedFix,
            selector,
          })),
        },
        null,
        2
      );
      filename += '.json';
    } else {
      content = `# VELMO Elevators — Usability & Consistency Audit Report\n\n`;
      content += `**Date:** ${new Date().toLocaleString()}\n`;
      content += `**URL:** ${window.location.href}\n\n`;
      content += `## Summary Metrics\n`;
      content += `- **Total Issues:** ${severityCounts.total}\n`;
      content += `- **High Severity:** ${severityCounts.high}\n`;
      content += `- **Medium Severity:** ${severityCounts.medium}\n`;
      content += `- **Low Severity:** ${severityCounts.low}\n\n`;
      content += `## Detected Issues by Category\n\n`;

      issues.forEach((iss, idx) => {
        content += `### ${idx + 1}. [${iss.severity.toUpperCase()}] ${iss.title}\n`;
        content += `- **Category:** ${iss.category}\n`;
        content += `- **Selector:** \`${iss.selector}\`\n`;
        content += `- **Measured Value:** ${iss.measured}\n`;
        content += `- **Expected Value:** ${iss.expected}\n`;
        content += `- **Suggested Fix:** ${iss.suggestedFix}\n\n`;
      });
      filename += '.md';
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // If not enabled and no search param, show nothing or only a tiny unobtrusive dev trigger
  if (!isAuditActive) {
    return (
      <div data-audit-ignore className="fixed bottom-3 right-3 z-50 print:hidden opacity-40 hover:opacity-100 transition-opacity">
        <button
          onClick={() => {
            setIsAuditActive(true);
            setIsDrawerOpen(true);
            localStorage.setItem('velmo_audit_mode', 'true');
          }}
          title="Enable Usability & Consistency Audit (Ctrl+Shift+U or ?audit=1)"
          className="w-7 h-7 rounded-full bg-[#1B3B33] text-[#B8923D] border border-[#B8923D]/40 flex items-center justify-center text-xs shadow-lg cursor-pointer font-mono"
        >
          ⚙
        </button>
      </div>
    );
  }

  return (
    <>
      {/* 
        ========================================================================
        ON-PAGE ISSUE HIGHLIGHT OVERLAY
        Anchors outline + small numbered badge right on every flagged element
        ========================================================================
      */}
      <div data-audit-ignore className="fixed inset-0 pointer-events-none z-40">
        {filteredIssues.map((issue, idx) => {
          const isSelected = selectedIssue?.id === issue.id;
          const isHovered = hoveredIssue?.id === issue.id;
          const rect = issue.element.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return null;

          // Severity colors
          const badgeBg =
            issue.severity === 'high'
              ? 'bg-rose-600 text-white border-rose-700'
              : issue.severity === 'medium'
              ? 'bg-amber-600 text-white border-amber-700'
              : 'bg-emerald-700 text-white border-emerald-800';

          const outlineBorder =
            issue.severity === 'high'
              ? 'border-rose-500'
              : issue.severity === 'medium'
              ? 'border-amber-500'
              : 'border-emerald-500';

          return (
            <div
              key={issue.id}
              style={{
                position: 'fixed',
                top: `${rect.top}px`,
                left: `${rect.left}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
              }}
              className={`pointer-events-auto border-2 ${outlineBorder} ${
                isSelected || isHovered ? 'ring-4 ring-amber-400 bg-amber-400/10' : 'opacity-85'
              } transition-all duration-150 rounded-xs`}
            >
              {/* Numbered Marker Badge anchored on top-left of element */}
              <button
                type="button"
                onClick={() => setSelectedIssue(issue)}
                onMouseEnter={() => setHoveredIssue(issue)}
                onMouseLeave={() => setHoveredIssue(null)}
                className={`absolute -top-3.5 -left-2.5 px-1.5 py-0.5 rounded-full ${badgeBg} border text-[10px] font-mono font-bold shadow-md cursor-pointer flex items-center justify-center min-w-[20px] h-[20px] transition-transform hover:scale-125 z-50`}
                title={`${issue.severity.toUpperCase()}: ${issue.title}`}
              >
                {idx + 1}
              </button>

              {/* Interactive Tooltip on Hover / Selected */}
              {(isHovered || isSelected) && (
                <div
                  className="absolute bottom-full left-0 mb-2 w-72 sm:w-80 p-3.5 bg-[#122621] text-white rounded-lg shadow-2xl border border-[#B8923D]/60 text-xs space-y-2 pointer-events-auto z-50 animate-fadeIn"
                  style={{ transform: 'translateY(-4px)' }}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#B8923D]">
                      Issue #{idx + 1} · {issue.category.toUpperCase()}
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-mono uppercase font-bold ${
                        issue.severity === 'high'
                          ? 'bg-rose-900/80 text-rose-200'
                          : issue.severity === 'medium'
                          ? 'bg-amber-900/80 text-amber-200'
                          : 'bg-emerald-900/80 text-emerald-200'
                      }`}
                    >
                      {issue.severity}
                    </span>
                  </div>

                  <p className="font-semibold text-white leading-snug">{issue.title}</p>

                  <div className="space-y-1 font-mono text-[11px] bg-black/40 p-2 rounded border border-white/5">
                    <div className="text-rose-300">Measured: {issue.measured}</div>
                    <div className="text-emerald-300">Expected: {issue.expected}</div>
                  </div>

                  <p className="text-neutral-300 font-sans text-[11px] leading-relaxed">
                    💡 <span className="text-[#E6D2A8]">Fix:</span> {issue.suggestedFix}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 
        ========================================================================
        DEV DOCK & INSPECTOR DRAWER PANEL
        ========================================================================
      */}
      <aside
        data-audit-ignore
        aria-label="Usability inspector dock"
        className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 pointer-events-auto select-none print:hidden"
      >
        {isDrawerOpen && (
          <div className="w-[380px] sm:w-[460px] max-h-[85vh] overflow-y-auto bg-[#F7F5EF] text-[#111111] rounded-2xl border-2 border-[#1B3B33]/25 shadow-2xl p-5 mb-2 backdrop-blur-md animate-fadeIn">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#1B3B33]/15 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#B8923D] font-bold">
                    Usability &amp; Consistency Scan
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1B3B33]">
                  Live DOM Heuristics Audit
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={runLiveAudit}
                  disabled={isScanning}
                  className="p-1.5 rounded-md text-neutral-600 hover:text-[#111111] hover:bg-neutral-200 transition-colors cursor-pointer"
                  title="Re-run live scan"
                >
                  <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-md text-neutral-600 hover:text-[#111111] hover:bg-neutral-200 transition-colors cursor-pointer"
                  title="Minimize drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Severity Status Card */}
            <div className="my-3.5 p-3.5 rounded-xl bg-[#1B3B33] text-[#F7F5EF] shadow-md space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-wider text-[#B8923D] font-bold">
                  Audit Health Status:
                </span>
                <span className="text-neutral-300 font-sans">
                  {severityCounts.high === 0 && severityCounts.medium === 0
                    ? '✓ Immaculate (Production Grade)'
                    : 'Action Recommended'}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                <button
                  type="button"
                  onClick={() => setActiveSeverity('all')}
                  className={`p-1.5 rounded bg-white/5 border border-white/10 ${
                    activeSeverity === 'all' ? 'ring-2 ring-[#B8923D]' : ''
                  }`}
                >
                  <div className="text-base font-bold text-white">{severityCounts.total}</div>
                  <div className="text-[10px] text-neutral-400">Total</div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSeverity('high')}
                  className={`p-1.5 rounded bg-rose-950/60 border border-rose-800/60 ${
                    activeSeverity === 'high' ? 'ring-2 ring-rose-400' : ''
                  }`}
                >
                  <div className="text-base font-bold text-rose-300">{severityCounts.high}</div>
                  <div className="text-[10px] text-rose-300">High</div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSeverity('medium')}
                  className={`p-1.5 rounded bg-amber-950/60 border border-amber-800/60 ${
                    activeSeverity === 'medium' ? 'ring-2 ring-amber-400' : ''
                  }`}
                >
                  <div className="text-base font-bold text-amber-300">{severityCounts.medium}</div>
                  <div className="text-[10px] text-amber-300">Med</div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSeverity('low')}
                  className={`p-1.5 rounded bg-emerald-950/60 border border-emerald-800/60 ${
                    activeSeverity === 'low' ? 'ring-2 ring-emerald-400' : ''
                  }`}
                >
                  <div className="text-base font-bold text-emerald-300">{severityCounts.low}</div>
                  <div className="text-[10px] text-emerald-300">Low</div>
                </button>
              </div>
            </div>

            {/* Filter by Category */}
            <div className="space-y-1.5 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block">
                Filter by Category:
              </span>
              <div className="flex flex-wrap gap-1 text-[11px]">
                {['all', 'type', 'font', 'color', 'style', 'layout', 'readability', 'hygiene'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2 py-1 rounded capitalize transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#1B3B33] text-[#F7F5EF] font-bold shadow-2xs'
                        : 'bg-neutral-200/80 hover:bg-neutral-300 text-neutral-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Issue List with Click-to-Scroll */}
            <div className="space-y-2 my-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>FLAGGED ELEMENTS ({filteredIssues.length}):</span>
                <span>Click item to jump & highlight</span>
              </div>

              {filteredIssues.length === 0 ? (
                <div className="p-6 bg-white rounded-xl border border-emerald-300/70 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-semibold text-emerald-900">
                    No issues found in this filter!
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    The layout, typography, colors, and touch targets meet all usability heuristics.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[36vh] overflow-y-auto pr-1">
                  {filteredIssues.map((iss, idx) => (
                    <div
                      key={iss.id}
                      onClick={() => scrollToIssueElement(iss)}
                      className={`p-3 bg-white rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                        selectedIssue?.id === iss.id
                          ? 'border-[#B8923D] ring-2 ring-[#B8923D]/50 bg-amber-50/40'
                          : 'border-neutral-200 hover:border-[#1B3B33]/40 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-[#1B3B33]">
                          <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-700 font-mono text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="truncate max-w-[200px]">{iss.title}</span>
                        </div>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                            iss.severity === 'high'
                              ? 'bg-rose-100 text-rose-800'
                              : iss.severity === 'medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {iss.severity}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-neutral-600 bg-neutral-100 p-1.5 rounded">
                        <div>Measured: {iss.measured}</div>
                        <div className="text-neutral-500">Target: {iss.expected}</div>
                      </div>

                      <p className="text-[11px] text-neutral-600 font-sans leading-relaxed">
                        Fix: {iss.suggestedFix}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Export Report Actions */}
            <div className="mt-4 pt-3 border-t border-[#1B3B33]/15 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-500">Export Report:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleExportReport('markdown')}
                  className="px-2.5 py-1 rounded bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 font-medium inline-flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <Download className="w-3 h-3 text-[#B8923D]" />
                  <span>Markdown</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportReport('json')}
                  className="px-2.5 py-1 rounded bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 font-medium inline-flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <Download className="w-3 h-3 text-[#B8923D]" />
                  <span>JSON</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Quick Action Pill */}
        <div className="flex items-center gap-2 bg-[#1B3B33] text-[#F7F5EF] p-1.5 pl-3.5 rounded-full border border-[#B8923D]/50 shadow-2xl backdrop-blur-md">
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="flex items-center gap-2 cursor-pointer py-1"
            aria-label="Toggle Usability & Consistency Inspector"
          >
            <span className={`w-2 h-2 rounded-full ${severityCounts.high > 0 ? 'bg-rose-400 animate-ping' : 'bg-emerald-400'}`} />
            <span className="font-mono text-xs font-bold tracking-wider text-[#F7F5EF]">
              Audit Mode
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#B8923D] text-[#111111] font-mono text-xs font-bold">
              {severityCounts.high}H · {severityCounts.medium}M · {severityCounts.low}L
            </span>
          </button>

          <button
            onClick={() => {
              setIsAuditActive(false);
              localStorage.setItem('velmo_audit_mode', 'false');
            }}
            className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Disable audit overlay"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Global pulse style for jump-to-element */}
      <style>{`
        .velmo-audit-pulse {
          outline: 3px solid #B8923D !important;
          outline-offset: 4px !important;
          animation: auditPulseAnim 1.5s ease-in-out infinite alternate !important;
        }
        @keyframes auditPulseAnim {
          from { box-shadow: 0 0 0 4px rgba(184, 146, 61, 0.4); }
          to { box-shadow: 0 0 0 12px rgba(184, 146, 61, 0); }
        }
      `}</style>
    </>
  );
};
