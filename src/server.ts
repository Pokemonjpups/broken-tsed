import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import {GlobalAcceptMimesMiddleware} from "@tsed/platform-express";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import "@tsed/swagger"; // import swagger Ts.ED module

const rootDir = __dirname;

@Configuration({
  rootDir,
  mount: {
    "/": [
      `${rootDir}/controllers/*.ts`
    ],
},
  acceptMimes: ["application/json"],
  swagger: [
    {
      path: "/api-docs"
    }
  ],
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(GlobalAcceptMimesMiddleware) // optional
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}
