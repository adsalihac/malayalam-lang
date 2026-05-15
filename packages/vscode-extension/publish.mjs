#!/usr/bin/env node

/**
 * Malayalam VSCode Extension Publisher
 * This script handles packaging and publishing the extension to VS Code Marketplace
 */

import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

const packagePath = process.cwd();
const packageJsonPath = path.join(packagePath, "package.json");

async function readPackageJson() {
  const data = fs.readFileSync(packageJsonPath, "utf-8");
  return JSON.parse(data);
}

async function checkPrerequisites() {
  console.log("📋 Checking prerequisites...\n");

  // Check vsce is installed
  try {
    await execAsync("vsce --version");
    console.log("✅ vsce CLI is installed\n");
  } catch (error) {
    console.error("❌ vsce CLI not found. Install with: npm install -g vsce\n");
    process.exit(1);
  }

  // Check git status
  try {
    const { stdout } = await execAsync("git status --porcelain");
    if (stdout.trim()) {
      console.warn(
        "⚠️  Working directory has uncommitted changes:\n" + stdout
      );
      console.warn("💡 Commit changes before publishing\n");
    }
  } catch (error) {
    console.warn("⚠️  Could not check git status\n");
  }
}

async function build() {
  console.log("🔨 Building extension...\n");
  try {
    await execAsync("pnpm build");
    console.log("✅ Build successful\n");
  } catch (error) {
    console.error("❌ Build failed:\n", error.message);
    process.exit(1);
  }
}

async function runTests() {
  console.log("🧪 Running tests...\n");
  try {
    await execAsync("pnpm test:run");
    console.log("✅ Tests passed\n");
  } catch (error) {
    console.warn("⚠️  Tests failed (non-blocking):\n", error.message);
  }
}

async function checkIcon() {
  console.log("🖼️  Checking icon...\n");

  const iconPng = path.join(packagePath, "icon.png");
  const iconSvg = path.join(packagePath, "icon.svg");

  if (!fs.existsSync(iconPng) && !fs.existsSync(iconSvg)) {
    console.error(
      "❌ Icon not found. Please add icon.png or icon.svg (128x128 or larger)\n"
    );
    process.exit(1);
  }

  if (fs.existsSync(iconPng)) {
    console.log("✅ Found icon.png\n");
  } else if (fs.existsSync(iconSvg)) {
    console.log("⚠️  Found icon.svg (convert to PNG for better marketplace appearance)\n");
  }
}

async function packageExtension() {
  console.log("📦 Packaging extension...\n");
  try {
    await execAsync("vsce package");
    const pkg = await readPackageJson();
    console.log(`✅ Package created: malayalam-language-${pkg.version}.vsix\n`);
  } catch (error) {
    console.error("❌ Packaging failed:\n", error.message);
    process.exit(1);
  }
}

async function promptForPublish() {
  return new Promise((resolve) => {
    process.stdout.write(
      "📤 Publish to VS Code Marketplace now? (y/n): "
    );
    process.stdin.once("data", (answer) => {
      resolve(answer.toString().trim().toLowerCase() === "y");
    });
  });
}

async function publish() {
  console.log("\n🚀 Publishing to VS Code Marketplace...\n");

  // Check if PAT is provided via environment variable
  const pat = process.env.VSCE_PAT;

  try {
    if (pat) {
      await execAsync(`vsce publish -p ${pat}`);
    } else {
      console.log("💡 You'll be prompted for your Personal Access Token (PAT)");
      console.log("   Get one at: https://dev.azure.com/malayalamlang/_usersSettings/tokens\n");
      await execAsync("vsce publish");
    }

    const pkg = await readPackageJson();
    console.log(`\n✅ Published v${pkg.version} successfully!\n`);
    console.log(
      "📍 Available at: https://marketplace.visualstudio.com/items?itemName=malayalamlang.malayalam-language\n"
    );
  } catch (error) {
    console.error("❌ Publishing failed:\n", error.message);
    process.exit(1);
  }
}

async function main() {
  console.log("🌐 Malayalam Language Extension Publisher\n");
  console.log("=".repeat(50) + "\n");

  await checkPrerequisites();
  await build();
  await runTests();
  await checkIcon();
  await packageExtension();

  const pkg = await readPackageJson();
  console.log(
    `📋 Ready to publish Malayalam Language v${pkg.version}\n`
  );

  const shouldPublish = process.argv.includes("--publish");

  if (!shouldPublish) {
    const confirmPublish = await promptForPublish();
    if (!confirmPublish) {
      console.log("⏭️  Skipping publication. VSIX file is ready for manual upload.\n");
      process.exit(0);
    }
  }

  await publish();
  console.log("=".repeat(50));
  console.log("✨ Release completed successfully!\n");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
