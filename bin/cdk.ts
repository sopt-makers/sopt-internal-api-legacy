import { App } from "aws-cdk-lib";

import { ServerStack } from "../lib/server-stack";

const app = new App();
new ServerStack(app, "CdkServerStack");
