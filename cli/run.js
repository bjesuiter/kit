// Description: Run the selected script
import { scriptValue } from "kit-bridge/esm/db";
let command = await arg(`Which script do you want to run?`, scriptValue("command"));
await run(command);
