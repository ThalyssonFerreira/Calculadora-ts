import { evaluate, CalcError } from "./evaluate";


const display = document.querySelector<HTMLInputElement>("#display")!;
const historyList = document.querySelector<HTMLUListElement>("#historyList")!;
const keys = document.querySelector<HTMLDivElement>(".keys")!;
const clearHistoryBtn = document.querySelector<HTMLButtonElement>("#clearHistory")!;


const HISTORY_KEY = "calc.history.v1";
const HISTORY_LIMIT = 20;

type HistoryItem = {
  expr: string;
  result: string;
  ts: string; 
};


let history: HistoryItem[] = loadHistory();
renderHistory();

function nowISO(): string {
  return new Date().toISOString();
}

function formatDate(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const arr = raw ? (JSON.parse(raw) as HistoryItem[]) : [];
    // sanity check
    return Array.isArray(arr) ? arr.slice(0, HISTORY_LIMIT) : [];
  } catch {
    return [];
  }
}

function saveHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, HISTORY_LIMIT)));
}

function renderHistory() {
  historyList.innerHTML = "";
  for (const item of history) {
    const li = document.createElement("li");
    li.tabIndex = 0;
    li.setAttribute("role", "button");
    li.setAttribute("aria-label", `Resultado ${item.result} de ${item.expr}, em ${formatDate(item.ts)}`);
    li.innerHTML = `
      <span class="hist-expr">${item.expr}</span>
      <span class="hist-eq">=</span>
      <span class="hist-res">${item.result}</span>
      <span class="hist-ts">· ${formatDate(item.ts)}</span>
    `;
    li.addEventListener("click", () => (display.value = item.result));
    li.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        display.value = item.result;
      }
    });
    historyList.appendChild(li);
  }
}


function append(val: string) {
  // Impede que mensagens de erro sejam concatenadas
  if (display.value === "Expressão inválida." || display.value === "Erro inesperado." || display.value === "Operação inválida.") {
    display.value = "";
  }
  display.value += val;
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function clearAll() {
  display.value = "";
}

function equals() {
  try {
    const raw = display.value.trim();
    if (!raw) return;
    const result = evaluate(raw);
    const r = String(result);

    // Atualiza histórico 
    history.unshift({ expr: raw, result: r, ts: nowISO() });
    history = history.slice(0, HISTORY_LIMIT);
    saveHistory();
    renderHistory();

    display.value = r;
  } catch (e) {
    const msg = e instanceof CalcError ? e.message : "Erro inesperado.";
    display.value = msg;

    setTimeout(() => (display.value = ""), 900);
  }
}

keys.addEventListener("click", (ev) => {
  const t = ev.target as HTMLElement;
  if (t.dataset.num) return append(t.dataset.num);
  if (t.dataset.op) return append(` ${t.dataset.op} `);

  const act = t.dataset.act;
  if (act === "back") return backspace();
  if (act === "clear") return clearAll();
  if (act === "equals") return equals();
});

window.addEventListener("keydown", (e) => {
  // Números e ponto
  if (/^[0-9.]$/.test(e.key)) return append(e.key);

  // Operadores
  if (["+", "-", "*", "/"].includes(e.key)) return append(` ${e.key} `);

  // Ações
  if (e.key === "Enter") return equals();
  if (e.key === "Backspace") return backspace();
  if (e.key === "Escape") return clearAll();
// Ctrl/Cmd + L para limpar tudo
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
    e.preventDefault();
    return clearAll();
  }
});

// Limpar histórico
clearHistoryBtn.addEventListener("click", () => {
  history = [];
  saveHistory();
  renderHistory();
  clearHistoryBtn.blur();
});
