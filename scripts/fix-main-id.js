const fs = require("fs");
const path = require("path");
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    if (f === "node_modules") continue;
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (f.endsWith(".html") && f !== "eldorado-fund-secret.html") {
      let h = fs.readFileSync(p, "utf8");
      if (h.includes("<main>") && !h.includes('<main id="main"')) {
        h = h.replace("<main>", '<main id="main">');
        fs.writeFileSync(p, h);
        console.log("main id", p);
      }
    }
  }
}
walk(path.join(__dirname, ".."));
