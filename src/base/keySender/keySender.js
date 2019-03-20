// WINDOWS ONLY

const path = require('path');
const {exec} = require("child_process");

let createKeyMap = () => {
	let map = {};

	for (let i = 0; i <= 9; i++)
		map[String.fromCharCode(i)] = i;

	let a = 'A'.charCodeAt(), z = 'Z'.charCodeAt();
	for (let i = a; i <= z; i++)
		map[String.fromCharCode(i)] = i;

	map['{SPACE}'] = map[' '] = ' '.charCodeAt();

	map['{BACKSPACE}'] = 0x8;
	map['{TAB}'] = 0x9;
	map['{ENTER}'] = 0xd;
	map['{SHIFT}'] = 0x10;
	map['{CONTROL}'] = map['{CTRL}'] = 0x11;
	map['{ALT}'] = 0x12;
	map['{CAPITAL}'] = 0x14;
	map['{PAGE_DOWN}'] = map['{PG_DN}'] = 0x22;
	map['{END}'] = 0x23;
	map['{HOME}'] = 0x24;
	map['{LEFT}'] = 0x25;
	map['{UP}'] = 0x26;
	map['{RIGHT}'] = 0x27;
	map['{DOWN}'] = 0x28;
	map['{INSERT}'] = 0x2D;
	map['{DELETE}'] = 0x2E;
	map['{L_WIN}'] = 0x5B;
	map['{R_WIN}'] = 0x5C;
	map['{APPS}'] = 0x5D;
	map['{MULTIPLY}'] = map['*'] = 0x6A;
	map['{ADD}'] = map['+'] = 0x6B;
	map['{SUBTRACT}'] = map['-'] = 0x6D;
	map['{DECIMAL}'] = map['.'] = 0x6E;
	map['{DIVIDE}'] = map['/'] = 0x6F;
	map['{F1}'] = 0x70;
	map['{F2}'] = 0x71;
	map['{F3}'] = 0x72;
	map['{F4}'] = 0x73;
	map['{F5}'] = 0x74;
	map['{F6}'] = 0x75;
	map['{F7}'] = 0x76;
	map['{F8}'] = 0x77;
	map['{F9}'] = 0x78;
	map['{F10}'] = 0x79;
	map['{F11}'] = 0x7A;
	map['{F12}'] = 0x7B;
	map['{F13}'] = 0x7C;
	map['{F14}'] = 0x7D;
	map['{F15}'] = 0x7E;
	map['{F16}'] = 0x7F;
	map['{F17}'] = 0x80;
	map['{F18}'] = 0x81;
	map['{F19}'] = 0x82;
	map['{F20}'] = 0x83;
	map['{F21}'] = 0x84;
	map['{F22}'] = 0x85;
	map['{F23}'] = 0x86;
	map['{F24}'] = 0x87;

	return map;
};

class KeySender {
	static RELEASE = 0;
	static PRESS = 1;
	static TYPE = 2;
	static KEY_MAP = createKeyMap();

	static stringToKeys(string) {
		return string
			.match(/[^{}]|{\w+}/g)
			.map(c => c.toUpperCase())
			.map(c => KeySender.KEY_MAP[c])
			.filter(a => a);
	}

	static string(action, string) {
		KeySender.raw(action, KeySender.stringToKeys(string));
	}

	static raw(action, keys) {
		psKeySender([action, ...keys])
	}
}

let psKeySender = args =>
	new Promise((resolve, reject) =>
		exec(`powershell.exe ${path.join(__dirname, './keySender.ps1')} ${args.join(' ')}`, {},
			(err, out, errOut) => err ? reject(`${err} : ${errOut}`) : resolve(out)));

module.exports = KeySender;

// todo extract duplicate code with frontWindowTitle to powerShellExecutor
