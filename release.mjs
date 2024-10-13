import chalk from "chalk";
import inquirer from "inquirer";
import { execSync } from "child_process";
import simpleGit from "simple-git";
import fs from "fs";

const git = simpleGit();

const packageJsonPath = "./package.json";
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
const currentVersion = packageJson.version;

let defaultVersion = currentVersion.split(".");
defaultVersion[defaultVersion.length - 1] = Number(defaultVersion[defaultVersion.length - 1]) + 1;
defaultVersion = defaultVersion.join(".");

const { version } = await inquirer.prompt([
  {
    name: "version",
    message: `Enter the version to publish (current ${currentVersion})`,
    default: defaultVersion
  }
]);

const tagVersion = `v${version}`;
const commitMessage = `feat: release ${tagVersion}`;

const execSyncOut = (command) => {
  execSync(command, { stdio: "inherit" });
};

// Run linting if script is available
if (packageJson.scripts.lint) {
  execSyncOut("npm run lint");
}

// Check for changes
const status = await git.status();
if (status.modified.length > 0) {
  await git.add(".");
  // Commit the changes
  await git.commit("chore: linted");
}

// Build the project
execSyncOut("npm run build");

// Update the version
execSyncOut(`npm version ${version} -m "${commitMessage}"`);

const commitFiles = async () => {
  await git.add(".");
  await git.commit(commitMessage);
};

const pushChanges = async () => {
  await git.push("origin", "master");
  await git.pushTags("origin");
};

const release = async () => {
  try {
    await commitFiles();
    await pushChanges();
    console.log(chalk.green(`Successfully released version ${version}`));
    console.log(chalk.green("Publishing to npm..."));
    // execSyncOut("npm login");
    execSyncOut("npm publish --access public --verbose");
  } catch (error) {
    console.error(chalk.red("Release process failed. Error:", error));
  }
};

release();
