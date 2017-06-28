import * as promisify from "es6-promisify";
import * as fs from "fs";
import * as mkdirpCallback from "mkdirp";
import * as simpleGit from "simple-git/promise";
import { logger } from "../utils";

// const repo = "git@git:praguedocs.git";
// const storagePath = "/var/lib/prague";

const repo = "https://github.com/kurtb/praguedocs.git";
const storagePath = "/Users/kurtb/dev/tmp";

function pathExists(path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        fs.exists(path, (exists) => {
            resolve(exists);
        });
    });
}

const mkdirp = promisify(mkdirpCallback);

class GitManager {
    private static async getClient(id: string, repository: string, basePath: string): Promise<simpleGit.SimpleGit> {
        const repositoryPath = `${basePath}/${id}`;

        const exists = await pathExists(repositoryPath);
        if (!exists) {
            await mkdirp(basePath);
            const gitClient = simpleGit(basePath);
            await gitClient.clone(repository, id, ["--no-checkout"]);
        }

        const client = simpleGit(repositoryPath);
        const remotes: string[] = await (<any> client).listRemote();
        logger.info("Remotes", remotes);

        if (remotes.indexOf(id) !== -1) {
            await client.checkout(id);
        } else {
            await client.checkout(["--orphan", id]);
        }

        await Promise.all([
            (<any> client).addConfig("user.name", "Kurt Berglund"),
            (<any> client).addConfig("user.email", "kurtb@microsoft.com")]);

        return client;
    }

    private clientP: Promise<simpleGit.SimpleGit>;

    constructor(repository: string, basePath: string) {
        this.clientP = GitManager.getClient("docs", repository, basePath);
    }

    /**
     * Reads the object with the given ID. We defer to the client implementation to do the actual read.
     */
    public async getCommits(id: string, branch: string): Promise<any> {
        const client = await this.clientP;

        const commits = await (<any> client).log([`refs/remotes/origin/${id}`, "-n", "10"]);

        return commits.all;
    }
}

const manager = new GitManager(repo, storagePath);

export async function getCommits(id: string, branch: string): Promise<any> {
    return manager.getCommits(id, branch);
}
