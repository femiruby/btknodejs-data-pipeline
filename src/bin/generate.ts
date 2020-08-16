import {dataFrom} from "../tasks/data.js";
import {Cmd, FileType, Frame} from "../interface.js";
import fs from "fs"
import {dataDir} from "../tasks/file.js";

if (!fs.existsSync(dataDir())) {
    fs.mkdirSync(dataDir())
}

dataFrom(2018,Frame.H4, FileType.Data, Cmd.Run)