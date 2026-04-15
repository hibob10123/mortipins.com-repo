/**
 * Inject Glass & Metal shell into static HTML files.
 * Run from repo root: node scripts/apply-glass-shell.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const SKIP = new Set([
  "eldorado-fund-secret.html",
  "index copy.html",
  "index.html",
]);

const HEAD_INJECT = `    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap" rel="stylesheet">
    <link href="css/glass-metal.css?v=3" rel="stylesheet">
`;

const ACCOUNT_HEAD_INJECT = `    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap" rel="stylesheet">
    <link href="../css/glass-metal.css?v=3" rel="stylesheet">
`;

const HEADER_BLOCK_RE =
  /(?:<a class="skip-link" href="#main">Skip to content<\/a>\s*)?<!-- overlay for mobile-->[\s\S]*?<\/header>/;

function navRoot(active) {
  const links = [
    ["index.html", "Home", "home"],
    ["brawldle.html", "Minigames", "brawldle"],
    ["blog.html", "Blog", "blog"],
    ["stats.html", "Stats", "stats"],
    ["leaderboard.html", "Leaderboard", "leaderboard"],
  ];
  const nav = links
    .map(([href, label, key]) => {
      const cur = active === key ? ' aria-current="page"' : "";
      return `                <a href="${href}"${cur}>${label}</a>`;
    })
    .join("\n");
  return `<header class="gm-nav">
        <div class="gm-nav-inner">
            <a class="gm-brand" href="index.html"><img src="images/mortis5_mastery.png" width="36" height="36" alt="MortipinS"><span>MortipinS</span></a>
            <nav class="gm-nav-links" aria-label="Primary">
${nav}
            </nav>
            <div class="gm-nav-actions"><a class="gm-metal" href="account/signin.html">Account</a></div>
        </div>
    </header>`;
}

function navAccount(active) {
  const links = [
    ["../index.html", "Home", "home"],
    ["../brawldle.html", "Minigames", "brawldle"],
    ["../blog.html", "Blog", "blog"],
    ["../stats.html", "Stats", "stats"],
    ["../leaderboard.html", "Leaderboard", "leaderboard"],
  ];
  const nav = links
    .map(([href, label, key]) => {
      const cur = active === key ? ' aria-current="page"' : "";
      return `                <a href="${href}"${cur}>${label}</a>`;
    })
    .join("\n");
  return `<header class="gm-nav">
        <div class="gm-nav-inner">
            <a class="gm-brand" href="../index.html"><img src="../images/mortis5_mastery.png" width="36" height="36" alt="MortipinS"><span>MortipinS</span></a>
            <nav class="gm-nav-links" aria-label="Primary">
${nav}
            </nav>
            <div class="gm-nav-actions"><a class="gm-metal" href="signin.html">Account</a></div>
        </div>
    </header>`;
}

function bottomNavRoot(active) {
  const items = [
    ["index.html", "fa-house", "Home", "home"],
    ["brawldle.html", "fa-gamepad", "Play", "brawldle"],
    ["stats.html", "fa-chart-line", "Stats", "stats"],
    ["blog.html", "fa-newspaper", "Blog", "blog"],
    ["account/signin.html", "fa-user", "Account", "account"],
  ];
  const lines = items.map(([href, icon, label, key]) => {
    const cur = active === key ? ' aria-current="page"' : "";
    return `        <a href="${href}"${cur}><span class="gm-bn-icon" aria-hidden="true"><i class="fa-solid ${icon}"></i></span><span>${label}</span></a>`;
  });
  return `<nav class="gm-bottom-nav" aria-label="Quick links">
${lines.join("\n")}
    </nav>`;
}

function bottomNavAccount(active) {
  const items = [
    ["../index.html", "fa-house", "Home", "home"],
    ["../brawldle.html", "fa-gamepad", "Play", "brawldle"],
    ["../stats.html", "fa-chart-line", "Stats", "stats"],
    ["../blog.html", "fa-newspaper", "Blog", "blog"],
    ["signin.html", "fa-user", "Account", "account"],
  ];
  const lines = items.map(([href, icon, label, key]) => {
    const cur = active === key ? ' aria-current="page"' : "";
    return `        <a href="${href}"${cur}><span class="gm-bn-icon" aria-hidden="true"><i class="fa-solid ${icon}"></i></span><span>${label}</span></a>`;
  });
  return `<nav class="gm-bottom-nav" aria-label="Quick links">
${lines.join("\n")}
    </nav>`;
}

const ACTIVE = {
  "brawldle.html": "brawldle",
  "brawldle-daily.html": "brawldle",
  "brawldle-unlimited.html": "brawldle",
  "brawldle-multiplayer.html": "brawldle",
  "trophies-unlimited.html": "brawldle",
  "blog.html": "blog",
  "stats.html": "stats",
  "leaderboard.html": "leaderboard",
  "buffies.html": "blog",
  "brawlidays-2024.html": "blog",
  "brawldle-strategy.html": "blog",
  "top-10-trophy-climbing-tips.html": "blog",
  "site-update-leaderboards-stats.html": "blog",
};

const ACCOUNT_ACTIVE = {
  "signin.html": "account",
  "signup.html": "account",
  "forgot-password.html": "account",
  "dashboard.html": "account",
};

function mergeBodyClass(attrs) {
  const m = attrs.match(/class\s*=\s*"([^"]*)"/);
  if (m) {
    if (m[1].includes("glass-metal-site")) return attrs;
    return attrs.replace(/class\s*=\s*"([^"]*)"/, 'class="glass-metal-site $1"');
  }
  if (/class\s*=\s*'([^']*)'/.test(attrs)) {
    return attrs.replace(
      /class\s*=\s*'([^']*)'/,
      (_, c) =>
        c.includes("glass-metal-site")
          ? attrs
          : `class='glass-metal-site ${c}'`
    );
  }
  return ` class="glass-metal-site"${attrs}`;
}

function processFile(relPath, isAccount) {
  if (SKIP.has(path.basename(relPath))) return;
  const full = path.join(root, relPath);
  if (!fs.existsSync(full)) {
    console.warn("missing", relPath);
    return;
  }
  let html = fs.readFileSync(full, "utf8");
  if (html.includes('class="gm-nav"')) {
    console.log("already", relPath);
    return;
  }

  const base = path.basename(relPath);
  const active = isAccount
    ? ACCOUNT_ACTIVE[base] || "home"
    : ACTIVE[base] || "home";

  if (!html.includes("glass-metal.css")) {
    if (isAccount) {
      html = html.replace(
        /(<link href="\.\.\/css\/style\.css[^"]*"[^>]*>\s*)/i,
        "$1" + ACCOUNT_HEAD_INJECT
      );
    } else {
      html = html.replace(
        /(<link href="css\/style\.css[^"]*"[^>]*>\s*)/i,
        "$1" + HEAD_INJECT
      );
    }
  }

  html = html.replace(/<body([^>]*)>/, (match, attrs) => {
    if (/glass-metal-site/.test(attrs)) return match;
    return `<body${mergeBodyClass(attrs)}>`;
  });

  const newHeader = isAccount ? navAccount(active) : navRoot(active);
  if (!HEADER_BLOCK_RE.test(html)) {
    console.warn("no header block", relPath);
    return;
  }
  html = html.replace(
    HEADER_BLOCK_RE,
    '<a class="skip-link" href="#main">Skip to content</a>\n    ' + newHeader
  );

  const bn = isAccount ? bottomNavAccount(active) : bottomNavRoot(active);
  if (!html.includes('class="gm-bottom-nav"')) {
    html = html.replace(/<\/body>\s*<\/html>\s*$/i, bn + "\n</body>\n</html>");
  }

  fs.writeFileSync(full, html, "utf8");
  console.log("ok", relPath);
}

const rootFiles = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
for (const f of rootFiles) {
  processFile(f, false);
}

const accountDir = path.join(root, "account");
if (fs.existsSync(accountDir)) {
  for (const f of fs.readdirSync(accountDir)) {
    if (f.endsWith(".html")) processFile(path.join("account", f), true);
  }
}

console.log("done");
