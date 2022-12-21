import os from "os"
import { randomUUID } from "crypto"
import { pathToFileURL } from "url"

import {
  configEnv,
  resolveToScriptPath,
  kitPath,
} from "../core/utils.js"

let kitImport = async (...pathParts: string[]) =>
  await import(
    pathToFileURL(kitPath(...pathParts)).href +
      "?uuid=" +
      randomUUID()
  )

await kitImport("api", "global.js")
await kitImport("api", "kit.js")
await kitImport("api", "lib.js")

let platform = process.env?.PLATFORM || os.platform()

await kitImport("platform", `${platform}.js`)

configEnv()

await kitImport("target", "terminal.js")

global.core = await npm("@actions/core")
global.github = await npm("@actions/github")

await kitImport(
  resolveToScriptPath(await arg("Path to script"))
)
