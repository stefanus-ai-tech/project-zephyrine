const { BrowserWindow, app, ipcMain, dialog } = require("electron");
const path = require("path");
require("@electron/remote/main").initialize();

const os = require("os");
const platform = os.platform();
const arch = os.arch();

var win;
function createWindow() {
	win = new BrowserWindow({
		width: 1200,
		height: 810,
		minWidth: 960,
		minHeight: 600,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
			devTools: false
		},
		titleBarStyle: "hidden",
		icon: platform == "darwin" ? path.join(__dirname, "icon", "mac", "icon.icns") : path.join(__dirname, "icon", "png", "128x128.png")
	});
	require("@electron/remote/main").enable(win.webContents);

	win.loadFile(path.resolve(__dirname, "src", "index.html"));

	win.setMenu(null);
	// win.webContents.openDevTools();
}

app.on("second-instance", () => {
	if (win) {
		if (win.isMinimized()) win.restore();
		win.focus();
	}
});

app.on("ready", () => {
	createWindow();
});

app.on("window-all-closed", () => {
	app.quit();
});
app.on("activate", () => {
	if (win == null) createWindow();
});
app.on("before-quit", () => {
	if (runningShell) runningShell.kill();
});

// OS STATS

const osUtil = require("os-utils");
var threads;
var sysThreads = osUtil.cpuCount();
for (let i = 1; i < sysThreads; i = i * 2) {
	threads = i;
}
if (sysThreads == 4) {
	threads = 4;
}
ipcMain.on("cpuUsage", () => {
	osUtil.cpuUsage(function (v) {
		win.webContents.send("cpuUsage", { data: v });
	});
});
ipcMain.on("cpuFree", () => {
	osUtil.cpuFree(function (v) {
		win.webContents.send("cpuFree", { data: v });
	});
});

ipcMain.on("cpuCount", () => {
	win.webContents.send("cpuCount", {
		data: osUtil.cpuCount()
	});
});
ipcMain.on("threadUtilized", () => {
	win.webContents.send("threadUtilized", {
		data: threads
	});
});
ipcMain.on("freemem", () => {
	win.webContents.send("freemem", {
		data: Math.round(osUtil.freemem() / 102.4) / 10
	});
});
ipcMain.on("totalmem", () => {
	win.webContents.send("totalmem", {
		data: osUtil.totalmem()
	});
});
ipcMain.on("os", () => {
	win.webContents.send("os", {
		data: platform
	});
});

// SET-UP
const Store = require("electron-store");
const schema = {
	params: {
		default: {
			model_type: "alpaca",
			repeat_last_n: "64",
			repeat_penalty: "1.3",
			top_k: "40",
			top_p: "0.9",
			temp: "0.8",
			seed: "-1",
			webAccess: false,
			websearch_amount: "5"
		}
	},
	modelPath: {
		default: "undefined"
	},
	supportsAVX2: {
		default: "undefined"
	}
};
const store = new Store({ schema });
//const fs = require("fs");
var modelPath = store.get("modelPath");

function checkModelPath() {
	modelPath = store.get("modelPath");
	if (modelPath) {
		if (fs.existsSync(path.resolve(modelPath))) {
			win.webContents.send("modelPathValid", { data: true });
		} else {
			win.webContents.send("modelPathValid", { data: false });
		}
	} else {
		win.webContents.send("modelPathValid", { data: false });
	}
}
ipcMain.on("checkModelPath", checkModelPath);

ipcMain.on("checkPath", (_event, { data }) => {
	if (data) {
		if (fs.existsSync(path.resolve(data))) {
			store.set("modelPath", data);
			modelPath = store.get("modelPath");
			win.webContents.send("pathIsValid", { data: true });
		} else {
			win.webContents.send("pathIsValid", { data: false });
		}
	} else {
		win.webContents.send("pathIsValid", { data: false });
	}
});

// DUCKDUCKGO And Function SEARCH FUNCTION

const fs = require('fs');
//const path = require('path');
const util = require('util');
const PDFParser = require('pdf-parse');
const timeoutPromise = require('timeout-promise');
const _ = require('lodash');
const readPdf = require('read-pdf');
const docxReader = require('docx-reader');
const textract = require('textract');

const TIMEOUT = 2000; // Timeout for reading each file (2 seconds)

async function readPdfFile(filePath) {
  return new Promise((resolve, reject) => {
    readPdf(filePath, (err, text) => {
      if (err) reject(err);
      else resolve(text);
    });
  });
}

async function readDocxFile(filePath) {
  try {
    const content = await docxReader(filePath);
    return content;
  } catch (err) {
    throw err;
  }
}

async function readOtherFile(filePath) {
  return new Promise((resolve, reject) => {
    textract.fromFileWithPath(filePath, { timeout: TIMEOUT }, (err, text) => {
      if (err) reject(err);
      else resolve(text);
    });
  });
}

async function readAndConcatenateFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  let text;

  try {
    if (ext === '.pdf') {
      text = await readPdfFile(filePath);
    } else if (ext === '.docx') {
      text = await readDocxFile(filePath);
    } else {
      text = await readOtherFile(filePath);
    }
    return text.slice(0, 64); // Limit to 64 characters per file
  } catch (err) {
    console.error('Error reading file:', filePath);
    return '';
  }
}

async function searchAndConcatenateText() {
  const searchDir = os.homedir();
  const indexFile = path.join(searchDir, 'search_index.txt');
  const searchResult = [];
  let currentTextLength = 0;

  try {
    if (fs.existsSync(indexFile)) {
      // If an index file exists, load previous search results
      const indexData = fs.readFileSync(indexFile, 'utf-8');
      searchResult.push(...indexData.split('\n'));
      currentTextLength = searchResult.join('').length;
    }

    async function traverseDir(directory) {
      const files = fs.readdirSync(directory);

      for (const file of files) {
        const filePath = path.join(directory, file);

        if (fs.statSync(filePath).isDirectory()) {
          // Recursive call for directories
          await traverseDir(filePath);
        } else {
          // Check if the file is one of the supported types
          if (/\.(pdf|txt|docx|doc|odt|xlsx|xls|ppt)$/i.test(filePath)) {
            const text = await readAndConcatenateFile(filePath);
            if (currentTextLength + text.length <= 128) {
              searchResult.push(text);
              currentTextLength += text.length;
            }
          }
        }
      }
    }

    console.log('Starting semantic search...');
    await traverseDir(searchDir);
    console.log('Semantic search completed.');

    // Save search results to index file
    fs.writeFileSync(indexFile, searchResult.join('\n'), 'utf-8');

    return searchResult.join(''); // Final result
  } catch (err) {
    console.error('Error during semantic search:', err);
    return '';
  }
}

const { exec } = require('child_process');
function runShellCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function callLLMChildThoughtProcessor(prompt, lengthGen){
	//lengthGen is the limit of how much it need to generate
	//prompt is basically prompt :moai:
	// flag is basically at what part that callLLMChildThoughtProcessor should return the value started from.
	const platform = process.platform;
	console.log(`platform ${platform}`);
	if (platform === 'win32'){
		// Windows
		console.log(`LLMChild Basebinary Detection ${basebin}`);
		basebin = `[System.Console]::OutputEncoding=[System.Console]::InputEncoding=[System.Text.Encoding]::UTF8; ."${path.resolve(__dirname, "bin", supportsAVX2 ? "" : "no_avx2", "chat.exe")}"`;
	} else {
	// *nix (Linux, macOS, etc.)
	basebin = `"${path.resolve(__dirname, "bin", "chat")}"`;
	console.log(`LLMChild Basebinary Detection ${basebin}`);
	}
	//model = ``;

	// example 	thoughtsInstanceParamArgs = "\"___[Thoughts Processor] Only answer in Yes or No. Thoughts: Should I Search this on Local files and Internet for more context on this prompt \"{prompt}\"___[Thoughts Processor] \" -m ~/Downloads/hermeslimarp-l2-7b.ggmlv3.q2_K.bin -r \"[User]\" -n 2"
	LLMChildParam = `-p \"${startEndThoughtProcessor_Flag} ${prompt} ${startEndThoughtProcessor_Flag}\" -m ${modelPath} -n ${lengthGen}`;

	command = `${basebin} ${LLMChildParam}`;
	let output;
	try {
	console.log(`LLMChild Inference ${command}`);
	//const output = await runShellCommand(command);
	 output = await runShellCommand(command);
	console.log('LLMChild Raw output:', output);
	} catch (error) {
	console.error('Error occoured spawning LLMChild!', flag, error.message);
	}

	
	// ---------------------------------------
	const stripThoughtHeader = (str) => {
	 //or you could use the variable and add * since its regex i actually forgot about that
	 const regex = /\[ThoughtsProcessor\]_{16,}.*?\[ThoughtsProcessor\]_{16,}/g;
	//const pattern = [];
	//const regex = new RegExp(pattern, "g");
	return str.replace(regex, "");
	}
	console.log('LLMChild EE');
	let filteredOutput;
	filteredOutput = stripThoughtHeader(output);
	console.log(`Filtered Output Thought Header Debug LLM Child ${filteredOutput}`);
	//console.log('LLMChild Filtering Output');
	//return filteredOutput;
	
	return output;

}



const startEndThoughtProcessor_Flag = "[ThoughtsProcessor]_________________";
const startEndAdditionalContext_Flag = "[AdCtx]_________________"; //global variable so every function can see and exclude it from the chat view
const DDG = require("duck-duck-scrape");
async function decisionOnDataExternalAccess(prompt){
	console.log("Deciding Whether should i search it or not");
	

	//decision if yes then do the query optimization
	// ./chat -p "___[Thoughts Processor] Only answer in Yes or No. Thoughts: Should I Search this on Local files and Internet for more context on this prompt \"What are you doing?\"___[Thoughts Processor] " -m ~/Downloads/hermeslimarp-l2-7b.ggmlv3.q2_K.bin -r "[User]" -n 2
	promptInput = `Only answer in Yes or No. Anything other than that are not accepted without exception. Thoughts: Should I Search this on Local files and Internet for more context on this prompt. ${prompt}`;
	decisionSearch = await callLLMChildThoughtProcessor(promptInput, 6);
	console.log(`decision Search LLMChild ${decisionSearch}`)

	// *nix
	//runningShell.write(`"${path.resolve(__dirname, "bin", "chat")}" ${paramArgs} ${chatArgs}\r`);
	// windows
	// runningShell.write(`[System.Console]::OutputEncoding=[System.Console]::InputEncoding=[System.Text.Encoding]::UTF8; ."${path.resolve(__dirname, "bin", supportsAVX2 ? "" : "no_avx2", "chat.exe")}" ${paramArgs} ${chatArgs}\r`);

	// if no then skip and bypass the prompt text to the shell or return question prompt -> directly to shell

	// when said no
	//pass
	// when said yes
	//./chat -p "___[Thoughts Processor] Answer only the search query. Thoughts: What is the Internet and file search query that is optimal for this prompt \"What are you doing?\" and the previous prompt \"I'm building some neutrino\"___[Thoughts Processor] " -m ~/Downloads/hermeslimarp-l2-7b.ggmlvC3.q2_K.bin -r "[User]" -n 69
	return prompt;

}
async function queryToPrompt(text) {
	console.log("query to Prompt Text Called!");
	console.log(text);
	//const keyword_trigger = ['?', 'why', 'who', 'how', 'where', 'when', 'what'];
	const keyword_trigger = ['?', 'you know', "can you tell me", "explain to me", "elaborate"];
	if (keyword_trigger.some(keyword_trigger => text.includes(keyword_trigger))){
	const searchResults = await DDG.search(text, {
		safeSearch: DDG.SafeSearchType.MODERATE
	});
	console.log("External Resources Enabled");
	if (!searchResults.noResults) {
		var convertedText = "These are additional the context: ";
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const day = String(currentDate.getDate()).padStart(2, '0');
		const hours = String(currentDate.getHours()).padStart(2, '0');
		const minutes = String(currentDate.getMinutes()).padStart(2, '0');
		const seconds = String(currentDate.getSeconds()).padStart(2, '0');

		const fullDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		var convertedText = "This is the User Prompt \""+ text + "\"" ;
		convertedText = convertedText + "." + " The current time and date is" + " " + fullDate + " " + "There are additional context to answer (in conclusion form without saying conclusion) the user prompt in \" ###INPUT:\" but dont forget the previous prompt for the context, However if the previous context with the web context isn't matching ignore the web answers the with the previous prompt context, and you are not allowed to repeat this prompt into your response or answers. ";
		convertedText = convertedText + "### INPUT: ";
		var targetResultCount = store.get("params").websearch_amount || 5;
		if (searchResults.news) {
			for (let i = 0; i < searchResults.news.length && i < targetResultCount; i++) {
				fetchedResults = `${searchResults.news[i].description.replaceAll(/<\/?b>/gi, "")} `;
				fetchedResults = fetchedResults.substring(0, 256);
				console.log(fetchedResults);
				convertedText = convertedText + fetchedResults;
				var documentReadText = searchAndConcatenateText(text);
				console.log(documentReadText);
			}
		} else {
			for (let i = 0; i < searchResults.results.length && i < targetResultCount; i++) {
				fetchedResults = `${searchResults.results[i].description.replaceAll(/<\/?b>/gi, "")} `;
				fetchedResults = fetchedResults.substring(0, 256);
				console.log(fetchedResults);
				convertedText = convertedText + fetchedResults;
				var documentReadText = searchAndConcatenateText(text);
				console.log(documentReadText);
			}
		}
		combinedText = convertedText + documentReadText;
		
		combinedText = startEndAdditionalContext_Flag + combinedText + startEndAdditionalContext_Flag;	
		console.log("Combined Contexts" + combinedText)
		return combinedText;
		// var convertedText = `Summarize the following text: `;
		// for (let i = 0; i < searchResults.results.length && i < 3; i++) {
		// 	convertedText += `${searchResults.results[i].description.replaceAll(/<\/?b>/gi, "")} `;
		// }
		// return convertedText;
	} else {
		console.log("No result returned!");
		return text;
	}} else {
		console.log("External Resources Bypass Mode");
		return text;
	}
}

// RUNNING CHAT
const pty = require("node-pty-prebuilt-multiarch");
var runningShell, currentPrompt;
var alpacaReady,
	alpacaHalfReady = false;
var checkAVX,
	isAVX2 = false;
if (store.get("supportsAVX2") == undefined) {
	store.set("supportsAVX2", true);
}
var supportsAVX2 = store.get("supportsAVX2");
const config = {
	name: "xterm-color",
	cols: 69420,
	rows: 30
};

const shell = platform === "win32" ? "powershell.exe" : "bash";
const stripAnsi = (str) => {
	const pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");

	const regex = new RegExp(pattern, "g");
	return str.replace(regex, "");
};

const stripAdCtx = (str) => {
	const regex = /\[AdCtx\]_{16,}.*?\[AdCtx\]_{16,}/g; //or you could use the variable and add * since its regex i actually forgot about that
	//const pattern = [];
	//const regex = new RegExp(pattern, "g");
	return str.replace(regex, "")
}

function restart() {
	console.log("restarting");
	win.webContents.send("result", {
		data: "\n\n<end>"
	});
	if (runningShell) runningShell.kill();
	runningShell = undefined;
	currentPrompt = undefined;
	alpacaReady = false;
	alpacaHalfReady = false;
	initChat();
}


//const splashScreen = document.getElementById('splash-screen-overlay'); //blocking overlay which prevent person and shows peopleexactly that the bot is loading
function initChat() {
	if (runningShell) {
		win.webContents.send("ready");
		return;
	}
	const ptyProcess = pty.spawn(shell, [], config);
	runningShell = ptyProcess;
	ptyProcess.onData((res) => {
		res = stripAnsi(res);
		//res = stripAdCtx(res);
		console.log(`//> ${res}`);
		if ((res.includes("invalid model file") || res.includes("failed to open") || res.includes("failed to load model")) && res.includes("main: error: failed to load model")) {
			if (runningShell) runningShell.kill();
			win.webContents.send("modelPathValid", { data: false });
		} else if (res.includes("\n>") && !alpacaReady) {
			alpacaHalfReady = true;
			console.log("Chatbot is ready after initialization!")
		//	splashScreen.style.display = 'flex';
		} else if (alpacaHalfReady && !alpacaReady) {
			//when alpaca ready removes the splash screen
			console.log("Chatbot is ready!")
			//splashScreen.style.display = 'none';
			alpacaReady = true;
			checkAVX = false;
			win.webContents.send("ready");
			console.log("ready!");
		} else if (((res.startsWith("llama_model_load:") && res.includes("sampling parameters: ")) || (res.startsWith("main: interactive mode") && res.includes("sampling parameters: "))) && !checkAVX) {
			checkAVX = true;
			console.log("checking avx compat");
		} else if (res.match(/PS [A-Z]:.*>/) && checkAVX) {
			console.log("avx2 incompatible, retrying with avx1");
			if (runningShell) runningShell.kill();
			runningShell = undefined;
			currentPrompt = undefined;
			alpacaReady = false;
			alpacaHalfReady = false;
			supportsAVX2 = false;
			checkAVX = false;
			store.set("supportsAVX2", false);
			initChat();
		} else if (((res.match(/PS [A-Z]:.*>/) && platform == "win32") || (res.match(/bash-[0-9]+\.?[0-9]*\$/) && platform == "darwin") || (res.match(/([a-zA-Z0-9]|_|-)+@([a-zA-Z0-9]|_|-)+:?~(\$|#)/) && platform == "linux")) && alpacaReady) {
			restart();
		} else if (res.includes("\n>") && alpacaReady) {
			win.webContents.send("result", {
				data: "\n\n<end>"
			});
		} else if (!res.startsWith(currentPrompt) && !res.startsWith(startEndAdditionalContext_Flag) && alpacaReady) {
			if (platform == "darwin") res = res.replaceAll("^C", "");
			win.webContents.send("result", {
				data: res
			});
		}
	});

	const params = store.get("params");
	if (params.model_type == "alpaca") {
		var revPrompt = "### Instruction:";
	} else if (params.model_type == "vicuna") {
		var revPrompt = "### Human:";
	} else {
		var revPrompt = "User:";
	}
	if (params.model_type == "alpaca") {
		var promptFile = "universalPrompt.txt";
	}
	const chatArgs = `-i --interactive-first -ins -r "${revPrompt}" -f "${path.resolve(__dirname, "bin", "prompts", promptFile)}"`;
	const paramArgs = `-m "${modelPath}" -n -1 --temp ${params.temp} --top_k ${params.top_k} --top_p ${params.top_p} --threads ${threads} --seed ${params.seed} -c 4096`; // This program require big context window set it to max common ctx window which is 4096 so additional context can be parsed stabily and not causes crashes
	if (platform == "win32") {
		runningShell.write(`[System.Console]::OutputEncoding=[System.Console]::InputEncoding=[System.Text.Encoding]::UTF8; ."${path.resolve(__dirname, "bin", supportsAVX2 ? "" : "no_avx2", "chat.exe")}" ${paramArgs} ${chatArgs}\r`);
	} else if (platform == "darwin") {
		const macArch = arch == "x64" ? "chat" : "chat";
		runningShell.write(`"${path.resolve(__dirname, "bin", macArch)}" ${paramArgs} ${chatArgs}\r`);
	} else {
		runningShell.write(`"${path.resolve(__dirname, "bin", "chat")}" ${paramArgs} ${chatArgs}\r`);
	}
}
ipcMain.on("startChat", () => {
	initChat();
});

ipcMain.on("message", async (_event, { data }) => {
	currentPrompt = data;
	if (runningShell) {
		if (store.get("params").webAccess) {
			//runningShell.write(`${await queryToPrompt(data)}\r`);
			runningShell.write(`${await decisionOnDataExternalAccess(data)}\r`);
		} else {
			runningShell.write(`${data}\r`);
		}
	}
});
ipcMain.on("stopGeneration", () => {
	if (runningShell) {
		if (runningShell) runningShell.kill();
		runningShell = undefined;
		currentPrompt = undefined;
		alpacaReady = false;
		alpacaHalfReady = false;
		initChat();
		setTimeout(() => {
			win.webContents.send("result", {
				data: "\n\n<end>"
			});
		}, 200);
	}
});
ipcMain.on("getCurrentModel", () => {
	win.webContents.send("currentModel", {
		data: store.get("modelPath")
	});
});

ipcMain.on("pickFile", () => {
	dialog
		.showOpenDialog(win, {
			title: "Choose Alpaca GGML model",
			filters: [
				{
					name: "GGML model",
					extensions: ["bin"]
				}
			],
			properties: ["dontAddToRecent", "openFile"]
		})
		.then((obj) => {
			if (!obj.canceled) {
				win.webContents.send("pickedFile", {
					data: obj.filePaths[0]
				});
			}
		});
});

ipcMain.on("storeParams", (_event, { params }) => {
	console.log(params);
	store.set("params", params);
	restart();
});
ipcMain.on("getParams", () => {
	win.webContents.send("params", store.get("params"));
});

ipcMain.on("webAccess", (_event, value) => {
	store.set("params", {
		...store.get("params"),
		webAccess: value
	});
});

ipcMain.on("restart", restart);

process.on("unhandledRejection", () => {});
process.on("uncaughtException", () => {});
process.on("uncaughtExceptionMonitor", () => {});
process.on("multipleResolves", () => {});
