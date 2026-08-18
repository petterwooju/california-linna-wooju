"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";

type Currency = "USD" | "CNY";

type Expense = {
  id: string;
  date: string;
  category: string;
  item: string;
  paidBy: string;
  currency: Currency;
  amount: string;
  notes: string;
};

const STORAGE_KEY = "california-trip-expenses-v1";
const categories = ["酒店", "餐饮", "交通", "加油", "停车", "门票", "购物", "其他"];
const payers = ["共同", "Linna", "Wooju"];

function createExpense(): Expense {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    date: "2026-09-21",
    category: "餐饮",
    item: "",
    paidBy: "共同",
    currency: "USD",
    amount: "",
    notes: "",
  };
}

function isExpense(value: unknown): value is Expense {
  if (!value || typeof value !== "object") return false;
  const row = value as Partial<Expense>;
  return typeof row.id === "string"
    && typeof row.date === "string"
    && typeof row.category === "string"
    && typeof row.item === "string"
    && typeof row.paidBy === "string"
    && (row.currency === "USD" || row.currency === "CNY")
    && typeof row.amount === "string"
    && typeof row.notes === "string";
}

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
}

function money(value: number, currency: Currency) {
  return new Intl.NumberFormat(currency === "USD" ? "en-US" : "zh-CN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ExpenseSheet() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [importMessage, setImportMessage] = useState("");

  useEffect(() => {
    let active = true;
    window.setTimeout(() => {
      if (!active) return;
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: unknown = JSON.parse(saved);
          if (Array.isArray(parsed)) setExpenses(parsed.filter(isExpense));
        }
      } catch {
        setImportMessage("未能读取本机记录，可重新导入 CSV。");
      } finally {
        setStorageReady(true);
      }
    }, 0);

    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.warn("Expense sheet could not be saved locally", error);
    }
  }, [expenses, storageReady]);

  const totals = useMemo(() => expenses.reduce(
    (sum, expense) => {
      const amount = Number(expense.amount);
      if (Number.isFinite(amount)) sum[expense.currency] += amount;
      return sum;
    },
    { USD: 0, CNY: 0 } as Record<Currency, number>,
  ), [expenses]);

  const filledRows = expenses.filter((expense) => expense.item.trim() || Number(expense.amount) > 0).length;

  function updateExpense(id: string, field: keyof Omit<Expense, "id">, value: string) {
    setExpenses((current) => current.map((expense) => expense.id === id ? { ...expense, [field]: value } : expense));
  }

  function removeExpense(id: string) {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  }

  function clearExpenses() {
    if (!expenses.length || !window.confirm("确定清空当前浏览器中的全部消费记录吗？请先导出 CSV 备份。")) return;
    setExpenses([]);
    setImportMessage("全部本机记录已清空。");
  }

  function exportCsv() {
    const header = ["Date", "Category", "Item", "Paid By", "Currency", "Amount", "Notes"];
    const body = expenses.map((expense) => [
      expense.date,
      expense.category,
      expense.item,
      expense.paidBy,
      expense.currency,
      expense.amount,
      expense.notes,
    ]);
    const csv = `\uFEFF${[header, ...body].map((row) => row.map(csvCell).join(",")).join("\r\n")}`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "california-trip-expenses.csv";
    link.click();
    URL.revokeObjectURL(url);
    setImportMessage(`已导出 ${expenses.length} 条记录。`);
  }

  async function importCsv(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    try {
      const rows = parseCsv((await file.text()).replace(/^\uFEFF/, ""));
      const imported = rows.slice(1).map((row) => {
        const category = row[1]?.trim();
        const paidBy = row[3]?.trim();
        return {
          ...createExpense(),
          date: row[0]?.trim() || "2026-09-21",
          category: category && categories.includes(category) ? category : "其他",
          item: row[2]?.trim() || "",
          paidBy: paidBy && payers.includes(paidBy) ? paidBy : "共同",
          currency: row[4]?.trim().toUpperCase() === "CNY" ? "CNY" as const : "USD" as const,
          amount: row[5]?.trim() || "",
          notes: row[6]?.trim() || "",
        };
      }).filter((expense) => expense.item || expense.amount);

      setExpenses((current) => [...current, ...imported]);
      setImportMessage(`已导入 ${imported.length} 条记录。`);
    } catch {
      setImportMessage("CSV 导入失败，请使用本页面导出的文件格式。");
    } finally {
      input.value = "";
    }
  }

  return (
    <section className="expense-section" id="expenses">
      <div className="expense-heading">
        <div>
          <p className="eyebrow red">TRAVEL EXPENSE SHEET / LOCAL &amp; PRIVATE</p>
          <h2>把每一笔花费，<br />记在路上</h2>
        </div>
        <div className="expense-intro">
          <p>表格会自动保存在当前浏览器，不需要登录。公开网页的其他访客看不到你填写的内容；换设备前请先导出 CSV。</p>
          <span className="expense-save-state"><i />{storageReady ? "浏览器本地保存已开启" : "正在读取本机记录…"}</span>
        </div>
      </div>

      <div className="expense-summary" aria-label="消费汇总">
        <div><span>USD TOTAL</span><b>{money(totals.USD, "USD")}</b><small>美元消费</small></div>
        <div><span>CNY TOTAL</span><b>{money(totals.CNY, "CNY")}</b><small>人民币消费</small></div>
        <div><span>ENTRIES</span><b>{String(filledRows).padStart(2, "0")}</b><small>已记录项目</small></div>
        <div className="expense-summary-note"><span>PRIVATE BY DEFAULT</span><p>数据不会上传到服务器。CSV 可以用 Excel、Numbers 或 Google Sheets 打开。</p></div>
      </div>

      <div className="expense-sheet-card">
        <div className="expense-toolbar">
          <div>
            <button type="button" className="expense-primary" onClick={() => setExpenses((current) => [...current, createExpense()])}>＋ 新增一笔</button>
            <label className="expense-button">
              导入 CSV
              <input type="file" accept=".csv,text/csv" onChange={importCsv} />
            </label>
            <button type="button" className="expense-button" onClick={exportCsv}>导出 CSV</button>
          </div>
          <button type="button" className="expense-clear" onClick={clearExpenses}>清空记录</button>
        </div>

        {importMessage && <p className="expense-message" role="status">{importMessage}</p>}

        <div className="expense-table-wrap">
          <table className="expense-table">
            <thead>
              <tr>
                <th>日期</th>
                <th>类别</th>
                <th>消费项目</th>
                <th>付款人</th>
                <th>币种</th>
                <th>金额</th>
                <th>备注</th>
                <th><span className="sr-only">操作</span></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td><input aria-label="日期" type="date" value={expense.date} onChange={(event) => updateExpense(expense.id, "date", event.target.value)} /></td>
                  <td>
                    <select aria-label="类别" value={expense.category} onChange={(event) => updateExpense(expense.id, "category", event.target.value)}>
                      {categories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                  </td>
                  <td><input aria-label="消费项目" placeholder="例如：晚餐" value={expense.item} onChange={(event) => updateExpense(expense.id, "item", event.target.value)} /></td>
                  <td>
                    <select aria-label="付款人" value={expense.paidBy} onChange={(event) => updateExpense(expense.id, "paidBy", event.target.value)}>
                      {payers.map((payer) => <option key={payer}>{payer}</option>)}
                    </select>
                  </td>
                  <td>
                    <select aria-label="币种" value={expense.currency} onChange={(event) => updateExpense(expense.id, "currency", event.target.value)}>
                      <option value="USD">USD</option>
                      <option value="CNY">CNY</option>
                    </select>
                  </td>
                  <td><input aria-label="金额" inputMode="decimal" min="0" step="0.01" type="number" placeholder="0.00" value={expense.amount} onChange={(event) => updateExpense(expense.id, "amount", event.target.value)} /></td>
                  <td><input aria-label="备注" placeholder="可选" value={expense.notes} onChange={(event) => updateExpense(expense.id, "notes", event.target.value)} /></td>
                  <td><button type="button" className="expense-delete" onClick={() => removeExpense(expense.id)} aria-label={`删除 ${expense.item || "这条记录"}`}>×</button></td>
                </tr>
              ))}
              {!expenses.length && (
                <tr className="expense-empty">
                  <td colSpan={8}><b>还没有消费记录</b><span>点击“新增一笔”开始，填写后会自动保存在这个浏览器。</span></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
