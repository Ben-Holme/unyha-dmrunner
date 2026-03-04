import {useState, useRef} from "react";
import _ITEMS         from "./data/items.md?raw";
import _SYS_WORLD     from "./data/sys-world.md?raw";
import _SYS_AGENT     from "./data/sys-agent.md?raw";
import _TPL_DISTILL   from "./data/tpl-distill.md?raw";
import _TPL_PLAN      from "./data/tpl-plan.md?raw";
import _TPL_ACT_THOUGHT  from "./data/tpl-act-thought.md?raw";
import _TPL_ACT_OUTPOST  from "./data/tpl-act-outpost.md?raw";
import _SPEC_THOUGHT  from "./data/spec-thought.md?raw";
import _SPEC_OUTPOST  from "./data/spec-outpost.md?raw";
import _TPL_QUEST_PLAN from "./data/tpl-quest-plan.md?raw";
import _TPL_QUEST_GEN  from "./data/tpl-quest-gen.md?raw";
import _ITEM_NOTES     from "./data/item-notes.md?raw";
import _QUEST_TYPES    from "./data/quest-types.md?raw";

const PRESETS = [
	{
		id: "dee_sewers",
		label: "Dee — Brimmar Sewers Entrance",
		context: `### Player profile
Dee's got this way of taking charge that makes heads turn. She's straight to the point, never one to dance around things. If there's a job to do and a mess to clean up, she's already knee-deep before anyone else even notices. That Sword of Ruin on her hip? It's not just for show.§Dee sees history like a well-worn path, but she couldn't care less about the old glory of House Meri Khans. She kicks up the dust of past laurels like it's dirt on her boots. It's not disrespect; it's her way of saying the old stories aren't her burden.§Cross Dee, and you'll find she doesn't budge an inch. She laughs in the face of those who think they can shift her stance. Try to steer her, you might as well be pushing a mountain. In House Meri Khans, we don't bend.@Looks like you need a lesson.@I'm not asking twice.@In House Meri Khans, we don't bend.

### Player events summary

### Player recent micro events

### Player stats
name: Dee
gender: Female
class: none
hp: 100/100
fame title: stranger (fame level 0 of 13)

### Player inventory
- 143 gold coins (id: goldCoin, value: 1, hp: 100/100)
- training fire staff (id: wepWandFireTraining, value: 112, hp: 100/100)
- training bow (id: wepBowTraining, value: 112, hp: 100/100)
- 20 a placebo bandages (id: newBandagePlacebo, value: 3, hp: 100/100)
- 4 empty bottles (id: emptyBottle, value: 5, hp: 100/100)
- shoes (id: bootShoes, value: 12, hp: 100/100)
- feeble rock-pine cone (id: enchantReagentDefence, value: 0, hp: 100/100)
- tome of destruction I (id: tomeDmg, value: 0, hp: 100/100)
- key for sewers lvl 2 (id: Key, value: 100, hp: 100/100)
- a cure potion (id: potionCure, value: 30, hp: 100/100)
- feeble rock-crystal (id: enchantReagentMining, value: 0, hp: 100/100)

### Player equipment
- short pants (id: clothPantsShort, value: 15, hp: 100/100)
- training sword (id: wepSwordTraining, value: 0, hp: 97/100)
- novice miner's shoes (id: bootShoes, value: 39, hp: 100/100)
- shirt (id: shirt, value: 34, hp: 100/100)
- hairLongD (id: hairLongD, value: 650, hp: 100/100)
- facialMoustacheA (id: facialMoustacheA, value: 500, hp: 100/100)

### Area
#### Current location
Brimmar Sewers Entrance: 

#### Nearby locations:
- Mani Garden (0.5km, SW): healer sanctuary, garden and shrines, middle of the trade road in the brimmar area, 
- Covey (0.7km, S): hiding place for pirates, bandits and smugglers, large cove of cliff formation, like a crack in the mountain where ships can hide, 
- Old Brimmar (0.2km, S): previously the main town, but overrun by corruption and crime, 
- Farae Ruins (0.4km, SE): mysterious overgrown ruins just outside old brimmar, 
- Barrow Beach (0.4km, N): small beach where pirates and bandits sometimes landsettle', 
- Old Lighthouse (0.3km, SW): ruins, failed building project, hiding palce for bandits and pirates, 
- Whisper Creek (0.6km, SW): secluded, small beach, pirates and bandits, secret landing. Hidden from the circle. refuge for schemers and desperates, 
- Brimmar Graveyard (0.2km, W): occasionally haunted, 
- Sewers Backdoor (0.4km, SW), 
- Whisper Bay (0.4km, W): sunken ship, pirates, small, otherside of the island opposite from brimmar town, 
- Brimmar (0.1km, E): coastal area, relatively safe and calm, trade, humans, pirates, bandits, strong presence of the order faction called "The Circle", spiritling presence.

### Road [CRITICAL]
suitable road spawn location: X=368902.000 Y=-152433.000 Z=-34260.000

### Area recent events

### Time of day in game
dawn

### Current real-wrold time (for debug)
2026-2-21, 20:20

### Season / world state
`,
	},
	{
		id: "dee_brimmar_outlander",
		label: "Dee — Brimmar, Outlander",
		context: `### Player profile
Dee's got this way of taking charge that makes heads turn. She's straight to the point, never one to dance around things. If there's a job to do and a mess to clean up, she's already knee-deep before anyone else even notices. That Sword of Ruin on her hip? It's not just for show.§Dee sees history like a well-worn path, but she couldn't care less about the old glory of House Meri Khans. She kicks up the dust of past laurels like it's dirt on her boots. It's not disrespect; it's her way of saying the old stories aren't her burden.§Cross Dee, and you'll find she doesn't budge an inch. She laughs in the face of those who think they can shift her stance. Try to steer her, you might as well be pushing a mountain. In House Meri Khans, we don't bend.@Looks like you need a lesson.@I'm not asking twice.@In House Meri Khans, we don't bend.

### Player events summary
In Brimmar, Dee claimed the Sword of Ruin and ventured below to the sewers, defeating The Vermin King. Her steady resolve and direct approach carved a place in local memory, bearing the storied relics of House Meri Khans.

### Player recent micro events

### Player stats
name: Dee
gender: female
class: none
hp: 100/100
fame title: Outlander (fame level 1 of 13)

### Player inventory
- 143 gold coins (id: goldCoin, value: 1, hp: 100/100)
- training fire staff (id: wepWandFireTraining, value: 112, hp: 100/100)
- training bow (id: wepBowTraining, value: 112, hp: 100/100)
- 89 a placebo bandages (id: newBandagePlacebo, value: 3, hp: 100/100)
- 4 empty bottles (id: emptyBottle, value: 5, hp: 100/100)
- feeble rock-pine cone (id: enchantReagentDefence, value: 0, hp: 100/100)
- tome of destruction I (id: tomeDmg, value: 0, hp: 100/100)
- a cure potion (id: potionCure, value: 30, hp: 100/100)
- feeble rock-crystal (id: enchantReagentMining, value: 0, hp: 100/100)
- key for sewers lvl 2 (id: Key, value: 100, hp: 100/100)
- 3 placebo healing potions (id: potionHealingPlacebo, value: 5, hp: 100/100)
- 2 cure potions (id: potionCure, value: 30, hp: 100/100)

### Player equipment
- short pants (id: clothPantsShort, value: 15, hp: 100/100)
- sword of ruin (id: wepSword, value: 590, hp: 93/100)
- novice miner's shoes (id: bootShoes, value: 39, hp: 100/100)
- shirt (id: shirt, value: 34, hp: 100/100)
- hairLongD (id: hairLongD, value: 650, hp: 100/100)
- facialMoustacheA (id: facialMoustacheA, value: 500, hp: 100/100)

### Area
#### Current location
Brimmar: coastal area, relatively safe and calm, trade, humans, pirates, bandits, strong presence of the order faction called "The Circle", spiritling presence

#### Nearby locations:
- Old Brimmar (0.3km, SW): previously the main town, but overrun by corruption and crime, 
- Mani Garden (0.6km, SW): healer sanctuary, garden and shrines, middle of the trade road in the brimmar area, 
- Old Lighthouse (0.3km, SW): ruins, failed building project, hiding palce for bandits and pirates, 
- Whisper Bay (0.4km, W): sunken ship, pirates, small, otherside of the island opposite from brimmar town, 
- Brimmar Graveyard (0.3km, W): occasionally haunted, 
- Barrow Beach (0.4km, SW): small beach where pirates and bandits sometimes landsettle', 
- Whisper Creek (0.6km, SW): secluded, small beach, pirates and bandits, secret landing. Hidden from the circle. refuge for schemers and desperates, 
- Sewers Backdoor (0.4km, W), 
- Brimmar Sewers Entrance (0.1km, S), 
- Covey (0.7km, S): hiding place for pirates, bandits and smugglers, large cove of cliff formation, like a crack in the mountain where ships can hide, 
- Farae Ruins (0.4km, S): mysterious overgrown ruins just outside old brimmar.

### Road [CRITICAL]
suitable road spawn location: X=0.000 Y=0.000 Z=0.000

### Area recent events

### Time of day in game
dawn

### Current real-world time (for debug)
2026-2-21, 20:24

### Season / world state`,
	},
];

const SYS_WORLD        = _SYS_WORLD.trim();
const SYS_AGENT        = _SYS_AGENT.trim();
const TPL_DISTILL      = _TPL_DISTILL.trim();
const TPL_PLAN         = _TPL_PLAN.trim();
const TPL_ACT_THOUGHT  = _TPL_ACT_THOUGHT.trim();
const TPL_ACT_OUTPOST  = _TPL_ACT_OUTPOST.trim();
const SPEC_THOUGHT     = _SPEC_THOUGHT.trim();
const SPEC_OUTPOST     = _SPEC_OUTPOST.trim();
const TPL_QUEST_PLAN   = _TPL_QUEST_PLAN.trim();
const TPL_QUEST_GEN    = _TPL_QUEST_GEN.trim().replace('{itemIds}', _ITEMS.trim()).replace('{itemNotes}', _ITEM_NOTES.trim()).replace('{questTypes}', _QUEST_TYPES.trim());

const DEFAULT_QUEST_TPL = {
	questPlan: {label: "01 — Quest Plan", desc: "Analyze context, choose theme", body: TPL_QUEST_PLAN},
	questGen:  {label: "02 — Quest Generate", desc: "Generate quest data", body: TPL_QUEST_GEN},
};

const DEFAULT_SYS = {
	worldContext: {label: "World Context", desc: "Unyha lore — constant", body: SYS_WORLD},
	agentRules: {label: "Agent Rules", desc: "Pipeline behavior — constant", body: SYS_AGENT},
};
const DEFAULT_TPL = {
	distill: {label: "01 — Distill", desc: "Prune raw game state", body: TPL_DISTILL},
	plan: {label: "02 — Plan", desc: "Choose an action", body: TPL_PLAN},
	act_internalThought: {
		label: "03a — Act: Thought",
		desc: "Internal monologue",
		body: TPL_ACT_THOUGHT,
	},
	act_outpost: {label: "03b — Act: Outpost", desc: "Road encounter seed", body: TPL_ACT_OUTPOST},
};
const DEFAULT_SPECS = {
	internalThoughtReqs: {label: "generateInternalThought spec", body: SPEC_THOUGHT},
	outpostRules: {label: "generateRoadOutpost spec", body: SPEC_OUTPOST},
};

const ACTION_COLORS = {
	generateInternalThought: "#7a9abf",
	generateRoadOutpost: "#c4883a",
	outpost: "#c4883a",
	none: "#555",
};
const lbl = {
	color: "#5a4e3a",
	fontSize: 10,
	textTransform: "uppercase",
	letterSpacing: 1,
	marginBottom: 4,
};
const btnS = (bg, bd) => ({
	background: bg,
	border: `1px solid ${bd}`,
	color: "#d4c9b8",
	padding: "7px 16px",
	borderRadius: 3,
	cursor: "pointer",
	fontSize: 11,
	letterSpacing: 2,
	textTransform: "uppercase",
	fontFamily: "monospace",
});

function FileItem({label, desc, body, def, onClick}) {
	const dirty = body !== def;
	return (
		<button
			onClick={onClick}
			style={{
				background: "#0a0908",
				border: `1px solid ${dirty ? "#6a3a1a" : "#2a2520"}`,
				borderRadius: 4,
				padding: "11px 16px",
				cursor: "pointer",
				textAlign: "left",
				display: "flex",
				alignItems: "center",
				gap: 12,
				width: "100%",
			}}
			onMouseEnter={(e) => (e.currentTarget.style.background = "#141210")}
			onMouseLeave={(e) => (e.currentTarget.style.background = "#0a0908")}
		>
			<div style={{fontSize: 13, opacity: 0.2, color: "#c4a86a"}}>◈</div>
			<div style={{flex: 1}}>
				<div style={{color: "#c4a86a", fontSize: 12, marginBottom: 1}}>{label}</div>
				{desc && <div style={{color: "#5a4e3a", fontSize: 11}}>{desc}</div>}
			</div>
			{dirty && (
				<div
					style={{
						color: "#c4883a",
						fontSize: 9,
						fontFamily: "monospace",
						letterSpacing: 1,
					}}
				>
					MOD
				</div>
			)}
			<div style={{color: "#3a3228"}}>›</div>
		</button>
	);
}

export default function App() {
	const [tab, setTab] = useState("context");
	const [preset, setPreset] = useState(PRESETS[0].id);
	const [ctx, setCtx] = useState(PRESETS[0].context);
	const [sys, setSys] = useState(() => JSON.parse(JSON.stringify(DEFAULT_SYS)));
	const [tpl, setTpl] = useState(() => JSON.parse(JSON.stringify(DEFAULT_TPL)));
	const [specs, setSpecs] = useState(() => JSON.parse(JSON.stringify(DEFAULT_SPECS)));
	const [editor, setEditor] = useState(null);
	const apiKey = import.meta.env.VITE_OPENAI_API_KEY ?? "";
	const [running, setRunning] = useState(false);
	const [stages, setStages] = useState([]);
	const [active, setActive] = useState(null);
	const [done, setDone] = useState(false);
	const [log, setLog] = useState([]);
	const abort = useRef(false);

	const [qTab, setQTab] = useState("context");
	const [qCtx, setQCtx] = useState("");
	const [qTpl, setQTpl] = useState(() => JSON.parse(JSON.stringify(DEFAULT_QUEST_TPL)));
	const [qRunning, setQRunning] = useState(false);
	const [qStages, setQStages] = useState([]);
	const [qActive, setQActive] = useState(null);
	const [qDone, setQDone] = useState(false);
	const [qLog, setQLog] = useState([]);
	const qAbort = useRef(false);

	const addLog = (m) => setLog((d) => [...d, `${new Date().toISOString().slice(11, 19)} ${m}`]);

	const eGet = () =>
		!editor
			? ""
			: editor.t === "sys"
				? sys[editor.id].body
				: editor.t === "tpl"
					? tpl[editor.id].body
					: editor.t === "qtpl"
						? qTpl[editor.id].body
						: specs[editor.id].body;
	const eDef = () =>
		!editor
			? ""
			: editor.t === "sys"
				? DEFAULT_SYS[editor.id].body
				: editor.t === "tpl"
					? DEFAULT_TPL[editor.id].body
					: editor.t === "qtpl"
						? DEFAULT_QUEST_TPL[editor.id].body
						: DEFAULT_SPECS[editor.id].body;
	const eLbl = () =>
		!editor
			? ""
			: editor.t === "sys"
				? sys[editor.id].label
				: editor.t === "tpl"
					? tpl[editor.id].label
					: editor.t === "qtpl"
						? qTpl[editor.id].label
						: specs[editor.id].label;
	const eSet = (v) => {
		if (!editor) return;
		if (editor.t === "sys") setSys((s) => ({...s, [editor.id]: {...s[editor.id], body: v}}));
		else if (editor.t === "tpl")
			setTpl((s) => ({...s, [editor.id]: {...s[editor.id], body: v}}));
		else if (editor.t === "qtpl")
			setQTpl((s) => ({...s, [editor.id]: {...s[editor.id], body: v}}));
		else setSpecs((s) => ({...s, [editor.id]: {...s[editor.id], body: v}}));
	};

	const buildSys = () => sys.worldContext.body + "\n\n" + sys.agentRules.body;

	const call = async (key, userMsg) => {
		setActive(key);
		addLog(`START ${key}`);
		const msg = userMsg.replace(/\(\$/g, "{").replace(/\$\)/g, "}");
		let res;
		try {
			res = await fetch("https://api.openai.com/v1/chat/completions", {
				method: "POST",
				headers: {"Content-Type": "application/json", Authorization: `Bearer ${apiKey}`},
				body: JSON.stringify({
					model: "gpt-4o",
					max_tokens: 1500,
					messages: [
						{role: "system", content: buildSys()},
						{role: "user", content: msg},
					],
				}),
			});
			addLog(`HTTP ${res.status} ${key}`);
		} catch (e) {
			addLog(`FETCH ERROR ${key}: ${e.message}`);
			return "";
		}
		try {
			const raw = await res.text();
			addLog(`RAW ${key}: ${raw.slice(0, 120).replace(/\n/g, " ")}`);
			const d = JSON.parse(raw);
			if (d.error) {
				addLog(`API ERROR ${key}: ${d.error.message}`);
				return "";
			}
			addLog(`DONE ${key} stop:${d.choices?.[0]?.finish_reason}`);
			const text = d.choices?.[0]?.message?.content || "";
			return text
				.replace(/^```json\s*/i, "")
				.replace(/^```\s*/i, "")
				.replace(/```\s*$/i, "")
				.trim();
		} catch (e) {
			addLog(`PARSE ERROR ${key}: ${e.message}`);
			return "";
		}
	};

	const run = async () => {
		if (!ctx.trim()) return;
		setLog([]);
		setRunning(true);
		setDone(false);
		setStages([]);
		setActive(null);
		setTab("pipeline");
		abort.current = false;

		const dRaw = await call("distill", tpl.distill.body.replace("{raw_data_dump}", ctx));
		if (abort.current) {
			setRunning(false);
			return;
		}
		let dParsed = null,
			dContent = dRaw;
		try {
			dParsed = JSON.parse(dRaw);
			dContent = dParsed.content || dRaw;
		} catch {}
		setStages((s) => [...s, {key: "distill", text: dRaw, parsed: dParsed}]);

		const pRaw = await call(
			"plan",
			tpl.plan.body
				.replace("{internalThoughtReqs}", specs.internalThoughtReqs.body)
				.replace("{outpostRules}", specs.outpostRules.body)
				.replace("{situation_context}", dContent),
		);
		if (abort.current) {
			setRunning(false);
			return;
		}
		let pParsed = null;
		try {
			pParsed = JSON.parse(pRaw);
		} catch {}
		const action = pParsed?.action || "none";
		setStages((s) => [...s, {key: "plan", text: pRaw, parsed: pParsed, action}]);

		if (action !== "none") {
			const ana = pParsed?.analysis || "",
				reas = pParsed?.reason || "";
			let actMsg = null;
			if (action === "generateInternalThought")
				actMsg = tpl.act_internalThought.body
					.replace("{prior_analysis}", ana)
					.replace("{prior_reason}", reas)
					.replace("{situation_context}", dContent);
			if (action === "generateRoadOutpost")
				actMsg = tpl.act_outpost.body
					.replace("{ana}", ana)
					.replace("{reas}", reas)
					.replace("{situation_context_json}", dContent);
			if (actMsg) {
				const aRaw = await call("act", actMsg);
				if (abort.current) {
					setRunning(false);
					return;
				}
				let aParsed = null;
				try {
					aParsed = JSON.parse(aRaw);
				} catch {}
				setStages((s) => [...s, {key: "act", text: aRaw, parsed: aParsed, action}]);
			}
		} else {
			setStages((s) => [
				...s,
				{key: "act", text: null, parsed: {action: "none"}, action: "none"},
			]);
		}
		setDone(true);
		setActive(null);
		setRunning(false);
	};

	const stop = () => {
		abort.current = true;
		setRunning(false);
		setActive(null);
	};
	const reset = () => {
		setStages([]);
		setActive(null);
		setDone(false);
		setRunning(false);
		setLog([]);
		abort.current = false;
	};

	// ─── Quest pipeline ──────────────────────────────────────────────────────────

	const qAddLog = (m) => setQLog((d) => [...d, `${new Date().toISOString().slice(11, 19)} ${m}`]);

	const qCall = async (key, userMsg) => {
		setQActive(key);
		qAddLog(`START ${key}`);
		const msg = userMsg.replace(/\(\$/g, "{").replace(/\$\)/g, "}");
		let res;
		try {
			res = await fetch("https://api.openai.com/v1/chat/completions", {
				method: "POST",
				headers: {"Content-Type": "application/json", Authorization: `Bearer ${apiKey}`},
				body: JSON.stringify({
					model: "gpt-4o",
					max_tokens: 1500,
					messages: [{role: "user", content: msg}],
				}),
			});
			qAddLog(`HTTP ${res.status} ${key}`);
		} catch (e) {
			qAddLog(`FETCH ERROR ${key}: ${e.message}`);
			return "";
		}
		try {
			const raw = await res.text();
			qAddLog(`RAW ${key}: ${raw.slice(0, 120).replace(/\n/g, " ")}`);
			const d = JSON.parse(raw);
			if (d.error) {
				qAddLog(`API ERROR ${key}: ${d.error.message}`);
				return "";
			}
			qAddLog(`DONE ${key} stop:${d.choices?.[0]?.finish_reason}`);
			const text = d.choices?.[0]?.message?.content || "";
			return text
				.replace(/^```json\s*/i, "")
				.replace(/^```\s*/i, "")
				.replace(/```\s*$/i, "")
				.trim();
		} catch (e) {
			qAddLog(`PARSE ERROR ${key}: ${e.message}`);
			return "";
		}
	};

	const qRun = async () => {
		if (!qCtx.trim()) return;
		setQLog([]);
		setQRunning(true);
		setQDone(false);
		setQStages([]);
		setQActive(null);
		setQTab("pipeline");
		qAbort.current = false;

		const planRaw = await qCall("plan", qTpl.questPlan.body.replace("{context}", qCtx));
		if (qAbort.current) { setQRunning(false); return; }
		let planParsed = null;
		try { planParsed = JSON.parse(planRaw); } catch {}
		setQStages((s) => [...s, {key: "plan", text: planRaw, parsed: planParsed}]);

		const theme = planParsed?.theme || "";
		const reasoning = planParsed?.reasoning || "";
		const genRaw = await qCall(
			"generate",
			qTpl.questGen.body
				.replace("{theme}", theme)
				.replace("{reasoning}", reasoning)
				.replace("{context}", qCtx),
		);
		if (qAbort.current) { setQRunning(false); return; }
		let genParsed = null;
		try { genParsed = JSON.parse(genRaw); } catch {}
		setQStages((s) => [...s, {key: "generate", text: genRaw, parsed: genParsed}]);

		setQDone(true);
		setQActive(null);
		setQRunning(false);
	};

	const qStop = () => {
		qAbort.current = true;
		setQRunning(false);
		setQActive(null);
	};

	const qReset = () => {
		setQStages([]);
		setQActive(null);
		setQDone(false);
		setQRunning(false);
		setQLog([]);
		qAbort.current = false;
	};

	const qRenderStage = (stage) => {
		const {key, text, parsed} = stage;
		if (key === "plan" && parsed) {
			return (
				<div>
					{parsed.theme && (
						<div style={{marginBottom: 10}}>
							<div style={lbl}>Theme</div>
							<span
								style={{
									background: "#7a9abf22",
									border: "1px solid #7a9abf66",
									color: "#7a9abf",
									padding: "2px 10px",
									borderRadius: 3,
									fontSize: 10,
									letterSpacing: 2,
									textTransform: "uppercase",
									fontFamily: "monospace",
								}}
							>
								{parsed.theme}
							</span>
						</div>
					)}
					{parsed.reasoning && (
						<div>
							<div style={lbl}>Reasoning</div>
							<div style={{color: "#a89878", fontSize: 13, lineHeight: 1.6}}>
								{parsed.reasoning}
							</div>
						</div>
					)}
				</div>
			);
		}
		if (key === "generate") {
			if (parsed?.quests?.length)
				return parsed.quests.map((q, i) => (
					<div key={i}>
						<div style={{color: "#6b5e4e", fontSize: 11, marginBottom: 2}}>Step {i + 1}</div>
						<pre style={{color: "#d4c9b8", fontSize: 12, whiteSpace: "pre-wrap", margin: "0 0 12px"}}>
							{JSON.stringify(q, null, 2)}
						</pre>
					</div>
				));
			if (parsed?.quest)
				return (
					<pre style={{color: "#d4c9b8", fontSize: 12, whiteSpace: "pre-wrap", margin: 0}}>
						{JSON.stringify(parsed.quest, null, 2)}
					</pre>
				);
			return (
				<pre style={{color: "#a89878", fontSize: 12, whiteSpace: "pre-wrap", margin: 0}}>
					{text}
				</pre>
			);
		}
		return (
			<pre style={{color: "#a89878", fontSize: 12, whiteSpace: "pre-wrap", margin: 0}}>
				{text}
			</pre>
		);
	};

	const renderStage = (stage) => {
		const {key, text, parsed} = stage;
		if (key === "distill") {
			const c = parsed?.content ? parsed.content.replace(/\\n/g, "\n") : text;
			return (
				<div
					style={{
						color: "#a89878",
						fontSize: 12,
						lineHeight: 1.7,
						whiteSpace: "pre-wrap",
						borderLeft: "2px solid #2a2520",
						paddingLeft: 12,
					}}
				>
					{c}
				</div>
			);
		}
		if (key === "plan" && parsed) {
			const col = ACTION_COLORS[parsed.action] || "#555";
			return (
				<div>
					{parsed.analysis && (
						<div style={{marginBottom: 10}}>
							<div style={lbl}>Analysis</div>
							<div style={{color: "#a89878", fontSize: 13, lineHeight: 1.6}}>
								{parsed.analysis}
							</div>
						</div>
					)}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
							marginBottom: parsed.reason ? 10 : 0,
						}}
					>
						<div style={lbl}>Action</div>
						<span
							style={{
								background: col + "22",
								border: `1px solid ${col}66`,
								color: col,
								padding: "2px 10px",
								borderRadius: 3,
								fontSize: 10,
								letterSpacing: 2,
								textTransform: "uppercase",
								fontFamily: "monospace",
							}}
						>
							{parsed.action}
						</span>
					</div>
					{parsed.reason && (
						<div>
							<div style={lbl}>Reason</div>
							<div style={{color: "#a89878", fontSize: 13, lineHeight: 1.6}}>
								{parsed.reason}
							</div>
						</div>
					)}
				</div>
			);
		}
		if (key === "act" && parsed) {
			if (parsed.action === "none" || !text)
				return (
					<div style={{color: "#555", fontSize: 12, fontStyle: "italic"}}>
						No action taken.
					</div>
				);
			if (parsed.thought)
				return (
					<div>
						<div style={lbl}>Internal Thought</div>
						<div
							style={{
								color: "#d4c9b8",
								fontSize: 14,
								lineHeight: 1.7,
								fontStyle: "italic",
								borderLeft: "2px solid #7a9abf",
								paddingLeft: 14,
							}}
						>
							"{parsed.thought}"
						</div>
					</div>
				);
			if (parsed.dialogSeed)
				return (
					<div>
						<div style={{marginBottom: 10}}>
							<div style={lbl}>Faction</div>
							<span
								style={{
									background: "#c4883a22",
									border: "1px solid #c4883a66",
									color: "#c4883a",
									padding: "2px 10px",
									borderRadius: 3,
									fontSize: 10,
									letterSpacing: 2,
									textTransform: "uppercase",
									fontFamily: "monospace",
								}}
							>
								{parsed.dialogSeed.faction}
							</span>
						</div>
						<div>
							<div style={lbl}>Story Seed</div>
							<div style={{color: "#d4c9b8", fontSize: 13, lineHeight: 1.7}}>
								{parsed.dialogSeed.story_seed}
							</div>
						</div>
					</div>
				);
			return (
				<pre style={{color: "#d4c9b8", fontSize: 12, whiteSpace: "pre-wrap", margin: 0}}>
					{text}
				</pre>
			);
		}
		return (
			<pre style={{color: "#a89878", fontSize: 12, whiteSpace: "pre-wrap", margin: 0}}>
				{text}
			</pre>
		);
	};

	const Modal = () => {
		if (!editor) return null;
		const dirty = eGet() !== eDef();
		return (
			<div
				style={{
					position: "fixed",
					inset: 0,
					background: "#000c",
					zIndex: 100,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						background: "#0e0c0a",
						border: "1px solid #3a3228",
						borderRadius: 6,
						width: "82%",
						maxWidth: 780,
						height: "74vh",
						display: "flex",
						flexDirection: "column",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							padding: "11px 16px",
							borderBottom: "1px solid #2a2520",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							background: "#0a0908",
						}}
					>
						<div style={{color: "#c4a86a", fontSize: 13}}>{eLbl()}</div>
						<div style={{display: "flex", gap: 8, alignItems: "center"}}>
							{dirty && (
								<span
									style={{
										color: "#c4883a",
										fontSize: 9,
										fontFamily: "monospace",
										letterSpacing: 1,
									}}
								>
									MODIFIED
								</span>
							)}
							{dirty && (
								<button
									onClick={() => eSet(eDef())}
									style={btnS("#2a1a0a", "#6a3a1a")}
								>
									↺ Reset
								</button>
							)}
							<button
								onClick={() => setEditor(null)}
								style={btnS("#1e1a16", "#3a3228")}
							>
								✕ Close
							</button>
						</div>
					</div>
					<textarea
						value={eGet()}
						onChange={(e) => eSet(e.target.value)}
						style={{
							flex: 1,
							background: "#0a0908",
							border: "none",
							color: "#a89878",
							fontFamily: "monospace",
							fontSize: 12,
							lineHeight: 1.7,
							padding: 16,
							resize: "none",
							outline: "none",
						}}
						spellCheck={false}
					/>
				</div>
			</div>
		);
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "#0e0c0a",
				color: "#d4c9b8",
				fontFamily: "Georgia,serif",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Modal />
			<div
				style={{
					borderBottom: "1px solid #2a2520",
					padding: "12px 20px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					background: "#0a0908",
				}}
			>
				<div>
					<div
						style={{
							fontSize: 9,
							letterSpacing: 4,
							color: "#5a4e3a",
							textTransform: "uppercase",
							fontFamily: "monospace",
							marginBottom: 2,
						}}
					>
						Unyha — Agentic Systems
					</div>
					<div style={{fontSize: 18, color: "#c4a86a"}}>DMRunner Simulator</div>
				</div>
				<div style={{display: "flex", gap: 8, alignItems: "center"}}>
					{tab === "quest" ? (
						<>
							{qRunning ? (
								<button onClick={qStop} style={btnS("#8b2020", "#c43030")}>
									■ Abort
								</button>
							) : (
								<button
									onClick={qRun}
									disabled={!apiKey || !qCtx.trim()}
									style={btnS(
										!apiKey || !qCtx.trim() ? "#1a1a1a" : "#1e2d38",
										!apiKey || !qCtx.trim() ? "#2a2520" : "#3a6a8a",
									)}
								>
									▶ Run Quest
								</button>
							)}
							<button onClick={qReset} disabled={qRunning} style={btnS("#1e1a16", "#3a3228")}>
								Reset
							</button>
						</>
					) : (
						<>
							{running ? (
								<button onClick={stop} style={btnS("#8b2020", "#c43030")}>
									■ Abort
								</button>
							) : (
								<button
									onClick={run}
									disabled={!apiKey}
									style={btnS(
										!apiKey ? "#1a1a1a" : "#2a3d1e",
										!apiKey ? "#2a2520" : "#4a7a2e",
									)}
								>
									▶ Run Pipeline
								</button>
							)}
							<button onClick={reset} disabled={running} style={btnS("#1e1a16", "#3a3228")}>
								Reset
							</button>
						</>
					)}
				</div>
			</div>

			<div
				style={{
					display: "flex",
					borderBottom: "1px solid #2a2520",
					background: "#0a0908",
					padding: "0 20px",
				}}
			>
				{["context", "templates", "pipeline", "debug", "quest"].map((t) => (
					<button
						key={t}
						onClick={() => setTab(t)}
						style={{
							background: "none",
							border: "none",
							borderBottom: tab === t ? "2px solid #c4a86a" : "2px solid transparent",
							color: tab === t ? "#c4a86a" : "#5a4e3a",
							padding: "9px 14px",
							cursor: "pointer",
							fontSize: 10,
							letterSpacing: 2,
							textTransform: "uppercase",
							fontFamily: "monospace",
						}}
					>
						{t}
					</button>
				))}
			</div>

			<div style={{flex: 1, display: "flex", overflow: "hidden"}}>
				{tab === "context" && (
					<div
						style={{
							flex: 1,
							padding: 20,
							display: "flex",
							flexDirection: "column",
							gap: 10,
						}}
					>
						<div style={{display: "flex", alignItems: "center", gap: 10}}>
							<div
								style={{
									fontSize: 10,
									color: "#5a4e3a",
									letterSpacing: 2,
									textTransform: "uppercase",
									fontFamily: "monospace",
									flexShrink: 0,
								}}
							>
								Preset
							</div>
							<select
								value={preset}
								onChange={(e) => {
									const p = PRESETS.find((p) => p.id === e.target.value);
									if (p) {
										setPreset(p.id);
										setCtx(p.context);
									}
								}}
								style={{
									background: "#0a0908",
									border: "1px solid #2a2520",
									color: "#a89878",
									fontFamily: "monospace",
									fontSize: 11,
									padding: "4px 10px",
									borderRadius: 3,
									outline: "none",
									cursor: "pointer",
								}}
							>
								{PRESETS.map((p) => (
									<option
										key={p.id}
										value={p.id}
									>
										{p.label}
									</option>
								))}
								<option value="__custom__">— custom —</option>
							</select>
						</div>
						<textarea
							value={ctx}
							onChange={(e) => {
								setCtx(e.target.value);
								setPreset("__custom__");
							}}
							style={{
								flex: 1,
								background: "#0a0908",
								border: "1px solid #2a2520",
								borderRadius: 4,
								color: "#a89878",
								fontFamily: "monospace",
								fontSize: 12,
								lineHeight: 1.6,
								padding: 14,
								resize: "none",
								outline: "none",
							}}
							spellCheck={false}
						/>
					</div>
				)}

				{tab === "templates" && (
					<div
						style={{
							flex: 1,
							overflowY: "auto",
							padding: 20,
							display: "flex",
							flexDirection: "column",
							gap: 18,
						}}
					>
						<div>
							<div
								style={{
									fontSize: 10,
									color: "#5a4e3a",
									letterSpacing: 2,
									textTransform: "uppercase",
									fontFamily: "monospace",
									marginBottom: 8,
								}}
							>
								System — constant
							</div>
							<div style={{display: "flex", flexDirection: "column", gap: 5}}>
								{Object.entries(DEFAULT_SYS).map(([id, d]) => (
									<FileItem
										key={id}
										label={sys[id].label}
										desc={d.desc}
										body={sys[id].body}
										def={d.body}
										onClick={() => setEditor({t: "sys", id})}
									/>
								))}
							</div>
						</div>
						<div>
							<div
								style={{
									fontSize: 10,
									color: "#5a4e3a",
									letterSpacing: 2,
									textTransform: "uppercase",
									fontFamily: "monospace",
									marginBottom: 8,
								}}
							>
								Stage Templates
							</div>
							<div style={{display: "flex", flexDirection: "column", gap: 5}}>
								{["distill", "plan", "act_internalThought", "act_outpost"].map(
									(id) => (
										<FileItem
											key={id}
											label={tpl[id].label}
											desc={tpl[id].desc}
											body={tpl[id].body}
											def={DEFAULT_TPL[id].body}
											onClick={() => setEditor({t: "tpl", id})}
										/>
									),
								)}
							</div>
						</div>
						<div>
							<div
								style={{
									fontSize: 10,
									color: "#5a4e3a",
									letterSpacing: 2,
									textTransform: "uppercase",
									fontFamily: "monospace",
									marginBottom: 8,
								}}
							>
								Action Specs
							</div>
							<div style={{display: "flex", flexDirection: "column", gap: 5}}>
								{Object.entries(DEFAULT_SPECS).map(([id, d]) => (
									<FileItem
										key={id}
										label={specs[id].label}
										desc={null}
										body={specs[id].body}
										def={d.body}
										onClick={() => setEditor({t: "spec", id})}
									/>
								))}
							</div>
						</div>
					</div>
				)}

				{tab === "pipeline" && (
					<div
						style={{
							flex: 1,
							overflowY: "auto",
							padding: 20,
							display: "flex",
							flexDirection: "column",
							gap: 12,
						}}
					>
						{stages.length === 0 && !running && (
							<div
								style={{
									color: "#3a3228",
									fontSize: 13,
									fontStyle: "italic",
									marginTop: 40,
									textAlign: "center",
								}}
							>
								No run yet. Set context and press Run Pipeline.
							</div>
						)}
						{["distill", "plan", "act"].map((key) => {
							const stage = stages.find((s) => s.key === key);
							const isActive = active === key;
							if (!stage && !isActive && !running) return null;
							const col = ACTION_COLORS[stage?.action] || "#555";
							return (
								<div
									key={key}
									style={{
										border: `1px solid ${isActive ? "#5a4e3a" : stage ? "#2a2520" : "#1a1814"}`,
										borderRadius: 4,
										overflow: "hidden",
									}}
								>
									<div
										style={{
											padding: "7px 12px",
											background: isActive ? "#1a1610" : "#0e0c0a",
											display: "flex",
											alignItems: "center",
											gap: 10,
											borderBottom: `1px solid ${isActive ? "#3a3228" : "#1a1814"}`,
										}}
									>
										<div
											style={{
												width: 6,
												height: 6,
												borderRadius: "50%",
												background: isActive
													? "#c4a86a"
													: stage
														? "#4a7a2e"
														: "#2a2520",
												boxShadow: isActive ? "0 0 8px #c4a86a88" : "none",
												flexShrink: 0,
											}}
										/>
										<span
											style={{
												fontSize: 10,
												letterSpacing: 2,
												textTransform: "uppercase",
												fontFamily: "monospace",
												color: isActive
													? "#c4a86a"
													: stage
														? "#7a9a5a"
														: "#3a3228",
											}}
										>
											{key}
										</span>
										{stage?.action && stage.action !== "none" && (
											<span
												style={{
													background: col + "22",
													border: `1px solid ${col}66`,
													color: col,
													padding: "1px 8px",
													borderRadius: 2,
													fontSize: 10,
													letterSpacing: 1,
													textTransform: "uppercase",
													fontFamily: "monospace",
												}}
											>
												{stage.action}
											</span>
										)}
									</div>
									<div style={{padding: "12px 14px"}}>
										{isActive && (
											<div
												style={{
													color: "#5a4e3a",
													fontSize: 12,
													fontStyle: "italic",
													display: "flex",
													gap: 8,
													alignItems: "center",
												}}
											>
												<span style={{animation: "blink 1s infinite"}}>
													▊
												</span>
												thinking…
											</div>
										)}
										{stage && !isActive && renderStage(stage)}
									</div>
								</div>
							);
						})}
						{done && stages.length > 0 && (
							<div
								style={{
									textAlign: "center",
									padding: 14,
									color: "#4a7a2e",
									fontSize: 11,
									letterSpacing: 3,
									textTransform: "uppercase",
									fontFamily: "monospace",
								}}
							>
								✓ Pipeline complete
							</div>
						)}
					</div>
				)}

				{tab === "debug" && (
					<div style={{flex: 1, overflowY: "auto", padding: 20}}>
						<div
							style={{
								fontSize: 11,
								color: "#5a4e3a",
								letterSpacing: 2,
								textTransform: "uppercase",
								fontFamily: "monospace",
								marginBottom: 12,
							}}
						>
							Debug Log
						</div>
						{log.length === 0 && (
							<div style={{color: "#3a3228", fontSize: 12, fontStyle: "italic"}}>
								No runs yet.
							</div>
						)}
						{log.map((e, i) => (
							<div
								key={i}
								style={{
									fontFamily: "monospace",
									fontSize: 12,
									color: e.includes("ERROR")
										? "#c44"
										: e.includes("DONE")
											? "#4a7a2e"
											: "#7a6e60",
									lineHeight: 1.8,
								}}
							>
								{e}
							</div>
						))}
					</div>
				)}
				{tab === "quest" && (
					<div style={{flex: 1, display: "flex", flexDirection: "column", overflow: "hidden"}}>
						<div
							style={{
								display: "flex",
								borderBottom: "1px solid #2a2520",
								background: "#0a0908",
								padding: "0 20px",
							}}
						>
							{["context", "templates", "pipeline", "debug"].map((t) => (
								<button
									key={t}
									onClick={() => setQTab(t)}
									style={{
										background: "none",
										border: "none",
										borderBottom:
											qTab === t ? "2px solid #7a9abf" : "2px solid transparent",
										color: qTab === t ? "#7a9abf" : "#5a4e3a",
										padding: "9px 14px",
										cursor: "pointer",
										fontSize: 10,
										letterSpacing: 2,
										textTransform: "uppercase",
										fontFamily: "monospace",
									}}
								>
									{t}
								</button>
							))}
						</div>

						<div style={{flex: 1, overflow: "hidden", display: "flex"}}>
							{qTab === "context" && (
								<div
									style={{
										flex: 1,
										padding: 20,
										display: "flex",
										flexDirection: "column",
									}}
								>
									<textarea
										value={qCtx}
										onChange={(e) => setQCtx(e.target.value)}
										placeholder="Paste world / player context here…"
										style={{
											flex: 1,
											background: "#0a0908",
											border: "1px solid #2a2520",
											borderRadius: 4,
											color: "#a89878",
											fontFamily: "monospace",
											fontSize: 12,
											lineHeight: 1.6,
											padding: 14,
											resize: "none",
											outline: "none",
										}}
										spellCheck={false}
									/>
								</div>
							)}

							{qTab === "templates" && (
								<div
									style={{
										flex: 1,
										overflowY: "auto",
										padding: 20,
										display: "flex",
										flexDirection: "column",
										gap: 5,
									}}
								>
									{Object.entries(DEFAULT_QUEST_TPL).map(([id, d]) => (
										<FileItem
											key={id}
											label={qTpl[id].label}
											desc={d.desc}
											body={qTpl[id].body}
											def={d.body}
											onClick={() => setEditor({t: "qtpl", id})}
										/>
									))}
								</div>
							)}

							{qTab === "pipeline" && (
								<div
									style={{
										flex: 1,
										overflowY: "auto",
										padding: 20,
										display: "flex",
										flexDirection: "column",
										gap: 12,
									}}
								>
									{qStages.length === 0 && !qRunning && (
										<div
											style={{
												color: "#3a3228",
												fontSize: 13,
												fontStyle: "italic",
												marginTop: 40,
												textAlign: "center",
											}}
										>
											No run yet. Add context and press Run Quest.
										</div>
									)}
									{["plan", "generate"].map((key) => {
										const stage = qStages.find((s) => s.key === key);
										const isActive = qActive === key;
										if (!stage && !isActive && !qRunning) return null;
										return (
											<div
												key={key}
												style={{
													border: `1px solid ${isActive ? "#5a4e3a" : stage ? "#2a2520" : "#1a1814"}`,
													borderRadius: 4,
													overflow: "hidden",
												}}
											>
												<div
													style={{
														padding: "7px 12px",
														background: isActive ? "#1a1610" : "#0e0c0a",
														display: "flex",
														alignItems: "center",
														gap: 10,
														borderBottom: `1px solid ${isActive ? "#3a3228" : "#1a1814"}`,
													}}
												>
													<div
														style={{
															width: 6,
															height: 6,
															borderRadius: "50%",
															background: isActive
																? "#7a9abf"
																: stage
																	? "#4a7a2e"
																	: "#2a2520",
															boxShadow: isActive
																? "0 0 8px #7a9abf88"
																: "none",
															flexShrink: 0,
														}}
													/>
													<span
														style={{
															fontSize: 10,
															letterSpacing: 2,
															textTransform: "uppercase",
															fontFamily: "monospace",
															color: isActive
																? "#7a9abf"
																: stage
																	? "#7a9a5a"
																	: "#3a3228",
														}}
													>
														{key}
													</span>
												</div>
												<div style={{padding: "12px 14px"}}>
													{isActive && (
														<div
															style={{
																color: "#5a4e3a",
																fontSize: 12,
																fontStyle: "italic",
																display: "flex",
																gap: 8,
																alignItems: "center",
															}}
														>
															<span style={{animation: "blink 1s infinite"}}>
																▊
															</span>
															thinking…
														</div>
													)}
													{stage && !isActive && qRenderStage(stage)}
												</div>
											</div>
										);
									})}
									{qDone && qStages.length > 0 && (
										<div
											style={{
												textAlign: "center",
												padding: 14,
												color: "#4a7a2e",
												fontSize: 11,
												letterSpacing: 3,
												textTransform: "uppercase",
												fontFamily: "monospace",
											}}
										>
											✓ Quest generated
										</div>
									)}
								</div>
							)}

							{qTab === "debug" && (
								<div style={{flex: 1, overflowY: "auto", padding: 20}}>
									<div
										style={{
											fontSize: 11,
											color: "#5a4e3a",
											letterSpacing: 2,
											textTransform: "uppercase",
											fontFamily: "monospace",
											marginBottom: 12,
										}}
									>
										Quest Debug Log
									</div>
									{qLog.length === 0 && (
										<div style={{color: "#3a3228", fontSize: 12, fontStyle: "italic"}}>
											No runs yet.
										</div>
									)}
									{qLog.map((e, i) => (
										<div
											key={i}
											style={{
												fontFamily: "monospace",
												fontSize: 12,
												color: e.includes("ERROR")
													? "#c44"
													: e.includes("DONE")
														? "#4a7a2e"
														: "#7a6e60",
												lineHeight: 1.8,
											}}
										>
											{e}
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
			<style>{"@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}"}</style>
		</div>
	);
}
