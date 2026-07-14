import { access, readFile } from "node:fs/promises";

const expectedName = "mcp-precheck";
const expectedVersion = "1.0.0";
const skillPath = "skills/mcp-precheck/SKILL.md";
const manifests = [
  ".claude-plugin/plugin.json",
  ".codex-plugin/plugin.json",
  ".cursor-plugin/plugin.json",
  "gemini-extension.json",
];

const fail = (message) => {
  throw new Error(message);
};

await access(skillPath);

for (const path of manifests) {
  const manifest = JSON.parse(await readFile(path, "utf8"));
  if (manifest.name !== expectedName) {
    fail(`${path}: expected name ${expectedName}`);
  }
  if (manifest.version !== expectedVersion) {
    fail(`${path}: expected version ${expectedVersion}`);
  }
  if (!manifest.description?.trim()) {
    fail(`${path}: description is required`);
  }
  if ("skills" in manifest && manifest.skills !== "./skills/") {
    fail(`${path}: skills must point to ./skills/`);
  }
}

const skill = await readFile(skillPath, "utf8");
const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/u)?.[1];
if (!frontmatter) {
  fail(`${skillPath}: YAML frontmatter is required`);
}
if (!frontmatter.match(/^name:\s*mcp-precheck\s*$/mu)) {
  fail(`${skillPath}: frontmatter name must be mcp-precheck`);
}
if (!frontmatter.match(/^description:\s*>-/mu)) {
  fail(`${skillPath}: a folded description is required`);
}

const readme = await readFile("README.md", "utf8");
if (!readme.includes("npx skills add PolicyLayer/mcp-precheck")) {
  fail("README.md: canonical repository install command is missing");
}

console.log(`Validated ${manifests.length} manifests and ${skillPath}`);
