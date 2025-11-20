// --- CONFIGURATION ---
const MAIN_SHEET_ID = "1sfpHSLhcojV8QyFjO3x5PPgfPLhaNckwRF0rOv9DDIk";
const HOME_SHEET_ID = "1qaPPrvbU7TW5OPeb_U3kxWffE26Ob7vK4Z9tkc8HlZ8";
const PROFILE_SHEET_ID = "1_Kgl8UQXRsVATt_BOHYQjVWYKkRIBA12R-qnsBoSUzc";
let GOOGLE_API_KEY = "AIzaSyDX3DGMjYiuPlaiCDlk0KCm-0JQVcCwUJY";

const RANGES = {
  info: "'INFO'!A8:O",
  leave: "'ច្បាប់សម្រាក'!A2:K",
  home: "'ច្បាប់ទៅផ្ទះ'!B564:Q",
  profiles: "'បញ្ជឺឈ្មោះរួម'!E9:W",
};

// --- THEME CONFIG ---
const themes = {
  blue: {
    50: "239 246 255",
    100: "219 234 254",
    200: "191 219 254",
    300: "147 197 253",
    400: "96 165 250",
    500: "59 130 246",
    600: "37 99 235",
    700: "29 78 216",
    800: "30 64 175",
    900: "30 58 138",
    color: "#2563eb",
  },
  purple: {
    50: "245 243 255",
    100: "237 233 254",
    200: "221 214 254",
    300: "196 181 253",
    400: "167 139 250",
    500: "139 92 246",
    600: "124 58 237",
    700: "109 40 217",
    800: "91 33 182",
    900: "76 29 149",
    color: "#7c3aed",
  },
  teal: {
    50: "240 253 250",
    100: "204 251 241",
    200: "153 246 228",
    300: "94 234 212",
    400: "45 212 191",
    500: "20 184 166",
    600: "13 148 136",
    700: "15 118 110",
    800: "17 94 89",
    900: "19 78 74",
    color: "#0d9488",
  },
  rose: {
    50: "255 241 242",
    100: "255 228 230",
    200: "254 205 211",
    300: "253 164 175",
    400: "251 113 133",
    500: "244 63 94",
    600: "225 29 72",
    700: "190 18 60",
    800: "159 18 57",
    900: "136 19 55",
    color: "#e11d48",
  },
  orange: {
    50: "255 247 237",
    100: "255 237 213",
    200: "254 215 170",
    300: "253 186 116",
    400: "251 146 60",
    500: "249 115 22",
    600: "234 88 12",
    700: "194 65 12",
    800: "154 52 18",
    900: "124 45 18",
    color: "#ea580c",
  },
  green: {
    50: "240 253 244",
    100: "220 252 231",
    200: "187 247 208",
    300: "134 239 172",
    400: "74 222 128",
    500: "34 197 94",
    600: "22 163 74",
    700: "21 128 61",
    800: "22 101 52",
    900: "20 83 45",
    color: "#16a34a",
  },
  slate: {
    50: "248 250 252",
    100: "241 245 249",
    200: "226 232 240",
    300: "203 213 225",
    400: "148 163 184",
    500: "100 116 139",
    600: "71 85 105",
    700: "51 65 85",
    800: "30 41 59",
    900: "15 23 42",
    color: "#475569",
  },
  fuchsia: {
    50: "253 244 255",
    100: "250 232 255",
    200: "245 208 254",
    300: "240 171 252",
    400: "232 121 249",
    500: "217 70 239",
    600: "192 38 211",
    700: "162 27 182",
    800: "134 25 143",
    900: "112 26 117",
    color: "#c026d3",
  },
};

// --- DOM ELEMENTS ---
const apiKeySection = document.getElementById("apiKeySection");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveApiKeyButton = document.getElementById("saveApiKeyButton");
const mainContent = document.getElementById("mainContent");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");
const dataContainer = document.getElementById("data-container");
const searchInput = document.getElementById("searchInput");
const summaryText = document.getElementById("summaryText");
const activeFilterBadge = document.getElementById("activeFilterBadge");
const filterBadgeText = document.getElementById("filterBadgeText");
const resetFilterButton = document.getElementById("resetFilterButton");
const dataView = document.getElementById("data-view");
const settingsPage = document.getElementById("settings-page");
const tabInfo = document.getElementById("tab-info");
const tabLeave = document.getElementById("tab-leave");
const tabHome = document.getElementById("tab-home");
const tabCombined = document.getElementById("tab-combined");
const tabSettings = document.getElementById("tab-settings");
const navBtnInfo = document.getElementById("nav-btn-info");
const navBtnLeave = document.getElementById("nav-btn-leave");
const navBtnHome = document.getElementById("nav-btn-home");
const navBtnCombined = document.getElementById("nav-btn-combined");
const navBtnSettings = document.getElementById("nav-btn-settings");
const monthFilter = document.getElementById("monthFilter");
const yearFilter = document.getElementById("yearFilter");
const startDateFilter = document.getElementById("startDateFilter");
const endDateFilter = document.getElementById("endDateFilter");
const applyFilterButton = document.getElementById("applyFilterButton");
const modalContainer = document.getElementById("modal-container");
const modalContent = document.getElementById("modal-content");
const refreshButton = document.getElementById("refreshButton");
const summaryButton = document.getElementById("summaryButton");
const notReturnedButton = document.getElementById("notReturnedButton");
const notReturnedBadge = document.getElementById("notReturnedBadge");
const todayButton = document.getElementById("todayButton");
const changeApiKeyButton = document.getElementById("changeApiKeyButton");

let allData = { info: [], leave: [], home: [], combined: [] };
let profileData = {};
let currentTab = "info";
let currentPage = 1;
let cardsPerPage = 14;
let filterDate = null;
let touchStartX = 0;
let touchEndX = 0;
let homeVerificationMap = {}; // Store Home Verification Data

// --- FUNCTIONS START ---

function setTheme(themeName) {
  const theme = themes[themeName] || themes.blue;
  const root = document.documentElement;
  Object.keys(theme).forEach((key) => {
    if (key !== "color")
      root.style.setProperty(`--color-primary-${key}`, theme[key]);
  });
  localStorage.setItem("appTheme", themeName);
  renderThemeSelector(themeName);
}

function renderThemeSelector(activeTheme) {
  const container = document.getElementById("theme-selector");
  if (!container) return;
  container.innerHTML = Object.keys(themes)
    .map(
      (name) => `
          <button onclick="setTheme('${name}')" class="theme-btn w-12 h-12 rounded-full shadow-sm hover:scale-110 transition-all duration-200 ${
        activeTheme === name
          ? "active ring-2 ring-offset-2 ring-primary-600"
          : ""
      }" style="background-color: ${themes[name].color};"></button>
        `
    )
    .join("");
}

const toKhmerNumber = (num) => {
  if (num === null || num === undefined || num === "") return "N/A";
  const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  return String(num).replace(/[0-9]/g, (digit) => khmerDigits[parseInt(digit)]);
};

const toEnglishNumber = (numStr) => {
  if (numStr === null || numStr === undefined) return "";
  const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  let result = String(numStr);
  khmerDigits.forEach((digit, index) => {
    result = result.replace(new RegExp(digit, "g"), index);
  });
  return result;
};

const parseDateForSort = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string") return new Date(0);
  const englishDateStr = toEnglishNumber(dateStr);
  const parsed = new Date(englishDateStr);
  if (!isNaN(parsed.getTime())) return parsed;
  const parts = englishDateStr.split("/");
  if (parts.length === 3) {
    const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    if (!isNaN(date.getTime())) return date;
  }
  return new Date(0);
};

function hideModal() {
  modalContainer.classList.add("hidden");
  modalContainer.classList.remove("flex");
}
window.hideModal = hideModal;

function showNotReturnedModal() {
  const selectedYear = yearFilter.value;
  const selectedMonth = monthFilter.value;
  const notReturnedList = allData.info.filter((item) => {
    if (item.timeIn && item.timeIn.trim() !== "") return false;
    const itemDate = parseDateForSort(item.dateOut);
    return (
      itemDate.getFullYear() == selectedYear &&
      itemDate.getMonth() + 1 == selectedMonth
    );
  });

  let modalHTML = `
            <div class="bg-orange-50 p-5 border-b border-orange-100 flex justify-between items-center rounded-t-2xl">
                <h2 class="font-bold text-lg text-orange-800">អ្នកមិនទាន់ចូលមកវិញ (${toKhmerNumber(
                  notReturnedList.length
                )})</h2>
                  <button class="modal-close-btn text-orange-400 hover:text-orange-600 bg-white rounded-full p-1.5 transition shadow-sm">&times;</button>
            </div>
            <div class="p-4 max-h-[70vh] overflow-y-auto space-y-3">`;

  if (notReturnedList.length === 0) {
    modalHTML += `<div class="text-center py-12"><div class="text-orange-200 mb-2"><svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><p class="text-slate-500 font-medium">ល្អណាស់! គ្មានបុគ្គលិកដែលមិនទាន់ចូលមកវិញទេ។</p></div>`;
  } else {
    notReturnedList.forEach((item) => {
      const profile = profileData[item.id.trim()] || {
        photo: "",
        department: "",
      };
      const placeholderImg = `https://placehold.co/60x60/e2e8f0/64748b?text=${(
        item.name || "?"
      ).charAt(0)}`;
      modalHTML += `
                    <div class="bg-white border border-orange-100 p-3.5 rounded-xl shadow-sm flex items-start gap-3.5">
                        <img src="${
                          profile.photo || placeholderImg
                        }" onerror="this.onerror=null;this.src='${placeholderImg}';" class="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-orange-100 shadow-sm">
                        <div class="flex-grow">
                            <p class="font-bold text-slate-800">${
                              item.name
                            }</p>
                            <p class="text-xs text-slate-400 mb-1 font-mono">${toKhmerNumber(
                              item.id
                            )}</p>
                            <div class="text-sm text-slate-600 space-y-0.5">
                                  <p>ចេញ: <span class="font-medium">${toKhmerNumber(
                                    item.dateOut
                                  )}</span> ម៉ោង: <span class="font-medium text-orange-600">${toKhmerNumber(
        item.timeOut
      )}</span></p>
                            </div>
                        </div>
                    </div>`;
    });
  }
  modalHTML += "</div>";
  modalContent.innerHTML = modalHTML;
  modalContainer.classList.remove("hidden");
  modalContainer.classList.add("flex");
}

function showSummaryModal(summaryArray) {
  // Calculate if not passed, otherwise reuse existing calculation logic
  if (!summaryArray) {
    const data = allData.leave.filter((item) => {
      const itemDate = parseDateForSort(item.date);
      return (
        itemDate.getFullYear() == yearFilter.value &&
        itemDate.getMonth() + 1 == monthFilter.value
      );
    });

    const summary = data.reduce((acc, item) => {
      if (!acc[item.id])
        acc[item.id] = {
          count: 0,
          days: 0,
          name: item.name,
          id: item.id,
        };
      acc[item.id].count++;
      const durationStr = item.duration || "";
      if (
        durationStr.includes("ព្រឹក") ||
        durationStr.includes("រសៀល") ||
        durationStr.includes("យប់")
      )
        acc[item.id].days += 0.5;
      else {
        const days = parseFloat(durationStr);
        acc[item.id].days += isNaN(days) ? 1 : days;
      }
      return acc;
    }, {});
    summaryArray = Object.values(summary).sort((a, b) => b.days - a.days);
  }

  let modalHTML = `
            <div class="bg-green-50 p-5 border-b border-green-100 flex justify-between items-center rounded-t-2xl">
                <h2 class="font-bold text-lg text-green-800">សរុបការឈប់សម្រាកប្រចាំខែ</h2>
                  <button class="modal-close-btn text-green-400 hover:text-green-600 bg-white rounded-full p-1.5 transition shadow-sm">&times;</button>
            </div>
            <div class="p-0 max-h-[70vh] overflow-y-auto">
                <table class="w-full text-sm text-left text-slate-600">
                    <thead class="text-xs text-slate-500 uppercase bg-green-50/50 sticky top-0 shadow-sm">
                        <tr>
                            <th scope="col" class="px-5 py-3.5">បុគ្គលិក</th>
                            <th scope="col" class="px-5 py-3.5 text-center">ដង</th>
                            <th scope="col" class="px-5 py-3.5 text-center">ថ្ងៃ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">`;

  if (summaryArray.length === 0) {
    modalHTML += `<tr><td colspan="3" class="text-center py-12 text-slate-400">គ្មានទិន្នន័យឈប់សម្រាកក្នុងខែនេះទេ។</td></tr>`;
  } else {
    summaryArray.forEach((emp) => {
      modalHTML += `
                    <tr class="bg-white hover:bg-slate-50">
                        <td class="px-5 py-3.5 font-medium text-slate-900">
                            <div class="flex flex-col">
                                <span>${emp.name}</span>
                                <span class="text-[10px] text-slate-400 font-mono">${toKhmerNumber(
                                  emp.id
                                )}</span>
                            </div>
                        </td>
                        <td class="px-5 py-3.5 text-center font-medium text-slate-600">${toKhmerNumber(
                          emp.count
                        )}</td>
                        <td class="px-5 py-3.5 text-center font-bold text-green-600">${toKhmerNumber(
                          emp.days
                        )}</td>
                    </tr>`;
    });
  }
  modalHTML += "</tbody></table></div>";
  modalContent.innerHTML = modalHTML;
  modalContainer.classList.remove("hidden");
  modalContainer.classList.add("flex");
}

function showModal(item, profile) {
  const personId = item.id;
  const selectedYear = yearFilter.value;
  const selectedMonth = monthFilter.value;
  const start = startDateFilter.value
    ? new Date(startDateFilter.value)
    : null;
  const end = endDateFilter.value ? new Date(endDateFilter.value) : null;
  if (start) start.setHours(0, 0, 0, 0);
  if (end) end.setHours(23, 59, 59, 999);

  const allRecordsForPersonThisMonth = allData.combined.filter(
    (record) => {
      if (record.id !== personId) return false;
      const itemDateStr = record.dateOut || record.date;
      const itemDate = parseDateForSort(itemDateStr);
      itemDate.setHours(12, 0, 0, 0);
      if (start && end) return itemDate >= start && itemDate <= end;
      else if (filterDate) {
        const filterD = new Date(filterDate);
        filterD.setHours(12, 0, 0, 0);
        return itemDate.getTime() === filterD.getTime();
      } else
        return (
          itemDate.getFullYear() == selectedYear &&
          itemDate.getMonth() + 1 == selectedMonth
        );
    }
  );

  const leaveRecords = allRecordsForPersonThisMonth.filter(
    (r) => r.type === "leave"
  );
  const infoRecords = allRecordsForPersonThisMonth.filter(
    (r) => r.type === "info"
  );
  const homeRecords = allData.home.filter(
    (r) =>
      r.id === personId &&
      (start && end
        ? parseDateForSort(r.dateOut) >= start &&
          parseDateForSort(r.dateOut) <= end
        : filterDate
        ? parseDateForSort(r.dateOut).getTime() ===
          new Date(filterDate).getTime()
        : parseDateForSort(r.dateOut).getFullYear() == selectedYear &&
          parseDateForSort(r.dateOut).getMonth() + 1 == selectedMonth)
  );

  let totalDays = 0;
  leaveRecords.forEach((record) => {
    const durationStr = record.duration || "";
    if (
      durationStr.includes("ព្រឹក") ||
      durationStr.includes("រសៀល") ||
      durationStr.includes("យប់")
    )
      totalDays += 0.5;
    else {
      const days = parseFloat(durationStr);
      totalDays += isNaN(days) ? 1 : days;
    }
  });

  const placeholderImg = `https://placehold.co/120x120/e2e8f0/64748b?text=${(
    item.name || "?"
  ).charAt(0)}`;

  // **CHECK IF ID IS NUMERIC**
  // Returns true if ID contains only digits, false if it has letters
  const isNumericId = /^\d+$/.test(item.id.trim());
  
  // Determine grid columns based on visibility of Leave/Home box
  // If not numeric, we only show 1 column (Info)
  const gridCols = isNumericId ? 'grid-cols-3' : 'grid-cols-1';

  let modalHTML = `
            <div class="relative">
                <div class="h-28 bg-gradient-to-r from-primary-600 to-primary-500 rounded-t-2xl"></div>
                <button class="modal-close-btn absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition">&times;</button>
                <div class="absolute top-14 left-1/2 transform -translate-x-1/2">
                    <img src="${
                      profile.photo || placeholderImg
                    }" onerror="this.onerror=null;this.src='${placeholderImg}';" class="w-24 h-24 rounded-full object-cover border-[4px] border-white shadow-lg bg-white">
                </div>
            </div>
            
            <div class="pt-14 pb-6 px-6 text-center">
                  <h2 class="text-xl font-bold text-slate-800 flex justify-center items-center gap-2">
                    ${item.name}
                    ${
                      profile.telegram
                        ? `<a href="${profile.telegram}" target="_blank" class="text-blue-500 hover:text-blue-600 transition-transform hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.1-.42-1.06-.88.02-.24.36-.48.99-.74 3.88-1.69 6.48-2.81 7.77-3.34 3.68-1.54 4.45-1.8 4.95-1.81.11 0 .35.03.51.16.13.1.17.25.19.42-.01.05 0 .15 0 .17z"/></svg></a>`
                        : ""
                    }
                  </h2>
                  <p class="text-slate-500 text-sm font-medium">${
                    profile.department || item.class
                  }</p>
                  <p class="text-slate-400 text-xs mt-0.5">ក្រុម: ${
                    profile.group || "N/A"
                  }</p>
                  <p class="text-xs text-slate-400 font-mono mt-0.5">ID: ${toKhmerNumber(
                    item.id
                  )}</p>
            </div>
            
            <div class="px-6 mb-6">
                <div class="grid ${gridCols} gap-2 text-center">
                    ${ isNumericId ? `
                    <div class="bg-green-50 p-2 rounded-xl border border-green-100">
                        <p class="font-bold text-lg text-green-600">${toKhmerNumber(
                          leaveRecords.length
                        )}</p>
                        <p class="text-[10px] font-bold text-green-800 uppercase tracking-wide mt-0.5">ឈប់សម្រាក</p>
                         <span class="text-[9px] bg-white text-green-700 px-1.5 py-0.5 rounded-md mt-1 inline-block border border-green-100 font-semibold shadow-sm">${toKhmerNumber(
                           totalDays
                         )} ថ្ងៃ</span>
                    </div>` : '' }
                    <div class="bg-blue-50 p-2 rounded-xl border border-blue-100 flex flex-col justify-center">
                        <p class="font-bold text-lg text-blue-600">${toKhmerNumber(
                          infoRecords.length
                        )}</p>
                        <p class="text-[10px] font-bold text-blue-800 uppercase tracking-wide mt-0.5">ចេញក្រៅ</p>
                    </div>
                    ${ isNumericId ? `
                      <div class="bg-purple-50 p-2 rounded-xl border border-purple-100 flex flex-col justify-center">
                        <p class="font-bold text-lg text-purple-600">${toKhmerNumber(
                          homeRecords.length
                        )}</p>
                        <p class="text-[10px] font-bold text-purple-800 uppercase tracking-wide mt-0.5">ទៅផ្ទះ</p>
                    </div>` : '' }
                </div>
            </div>

            <div class="px-6 pb-6 max-h-[40vh] overflow-y-auto space-y-4">`;

  // **CONDITIONALLY SHOW LEAVE HISTORY**
  if (leaveRecords.length > 0 && isNumericId) {
    modalHTML += `<div><h3 class="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2 uppercase tracking-wide"><span class="w-1.5 h-4 bg-green-500 rounded-full"></span>ប្រវត្តិការឈប់សម្រាក</h3><div class="space-y-2.5">`;
    leaveRecords.forEach((record) => {
      modalHTML += `
                    <div class="bg-slate-50 p-3 rounded-xl text-sm border border-slate-100">
                        ${(() => {
                          const singleDayKeywords = [
                            "មួយព្រឹក",
                            "មួយរសៀល",
                            "ពេលយប់",
                            "មួយថ្ងៃ",
                          ];
                          const isSingleDay =
                            !record.duration ||
                            singleDayKeywords.some((keyword) =>
                              (record.duration || "").includes(keyword)
                            );
                          if (
                            isSingleDay ||
                            !record.dateEnd ||
                            record.dateEnd.trim() === ""
                          ) {
                            return `<p class="font-semibold text-slate-800 flex justify-between">${toKhmerNumber(
                              record.date
                            )} <span class="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">${toKhmerNumber(
                              record.duration
                            )}</span></p>`;
                          } else {
                            return `<p class="font-semibold text-slate-800 flex flex-col">${toKhmerNumber(
                              record.date
                            )} - ${toKhmerNumber(
                              record.dateEnd
                            )} <span class="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium w-fit mt-1">${toKhmerNumber(
                              record.duration
                            )}</span></p>`;
                          }
                        })()}
                         <div class="flex justify-between items-center mt-1.5 pt-1.5 border-t border-slate-200/60">
                            <p class="text-xs text-slate-500 truncate flex-grow"><span class="font-bold text-slate-600 mr-1">មូលហេតុ:</span> ${
                              record.reason || "N/A"
                            }</p>
                        </div>
                    </div>`;
    });
    modalHTML += `</div></div>`;
  }

  if (infoRecords.length > 0) {
    modalHTML += `<div><h3 class="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2 uppercase tracking-wide"><span class="w-1.5 h-4 bg-blue-500 rounded-full"></span>ប្រវត្តិការចេញក្រៅ</h3><div class="space-y-2.5">`;
    infoRecords.forEach((record) => {
      modalHTML += `
                    <div class="bg-slate-50 p-3 rounded-xl text-sm border border-slate-100">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="font-semibold text-slate-800 text-base">${toKhmerNumber(
                                  record.dateOut
                                )}</p>
                                <div class="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                                    <span class="bg-white px-1.5 py-0.5 rounded border text-blue-600 font-medium">${toKhmerNumber(
                                      record.timeOut
                                    )}</span> &rarr; <span class="bg-white px-1.5 py-0.5 rounded border text-blue-600 font-medium">${toKhmerNumber(
        record.timeIn
      )}</span>
                                </div>
                            </div>
                            <div class="flex flex-col items-end">
                                 <span class="text-[10px] text-slate-400 mb-0.5">រយៈពេល</span>
                                 <span class="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">${
                                   toKhmerNumber(record.duration) || "N/A"
                                 }</span>
                            </div>
                        </div>
                        <p class="text-xs text-slate-500 pt-1.5 border-t border-slate-200/60 truncate"><span class="font-bold text-slate-600 mr-1">មូលហេតុ:</span> ${
                          record.reason || "N/A"
                        }</p>
                    </div>`;
    });
    modalHTML += `</div></div>`;
  }

  // **CONDITIONALLY SHOW HOME HISTORY**
  if (homeRecords.length > 0 && isNumericId) {
    modalHTML += `<div><h3 class="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2 uppercase tracking-wide"><span class="w-1.5 h-4 bg-purple-500 rounded-full"></span>ប្រវត្តិការទៅផ្ទះ</h3><div class="space-y-2.5">`;
    homeRecords.forEach((record) => {
      const durationText = record.duration
        ? `${toKhmerNumber(record.duration)} ថ្ងៃ`
        : "N/A";

      modalHTML += `
                    <div class="bg-slate-50 p-3 rounded-xl text-sm border border-slate-100">
                        <div class="flex justify-between items-start mb-2">
                            <div class="space-y-1.5">
                                <div class="flex flex-wrap items-center gap-2">
                                    <span class="text-slate-500 text-xs min-w-[25px]">ចេញ:</span>
                                    <span class="font-semibold text-slate-800">${toKhmerNumber(
                                      record.dateOut
                                    )}</span>
                                    <span class="bg-white px-1.5 py-0.5 rounded border border-purple-200 text-purple-600 font-bold text-xs shadow-sm">${toKhmerNumber(
                                      record.timeOut
                                    )}</span>
                                </div>
                                <div class="flex flex-wrap items-center gap-2">
                                    <span class="text-slate-500 text-xs min-w-[25px]">ចូល:</span>
                                    <span class="font-semibold text-slate-800">${toKhmerNumber(
                                      record.dateIn
                                    )}</span>
                                    <span class="bg-white px-1.5 py-0.5 rounded border border-purple-200 text-purple-600 font-bold text-xs shadow-sm">${toKhmerNumber(
                                      record.timeIn
                                    )}</span>
                                </div>
                            </div>

                            <div class="flex flex-col items-end pl-2">
                                 <span class="text-[10px] text-slate-400 mb-0.5">រយៈពេល</span>
                                 <span class="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded-lg whitespace-nowrap">
                                    ${durationText}
                                 </span>
                            </div>
                        </div>
                        <p class="text-xs text-slate-500 pt-2 border-t border-slate-200/60 mt-2 truncate"><span class="font-bold text-slate-600 mr-1">មូលហេតុ:</span> ${
                          record.reason || "N/A"
                        }</p>
                    </div>`;
    });
    modalHTML += `</div></div>`;
  }

  if (
    (leaveRecords.length === 0 || !isNumericId) &&
    infoRecords.length === 0 &&
    (homeRecords.length === 0 || !isNumericId)
  ) {
    modalHTML += `<div class="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200"><p class="text-slate-400 text-sm">គ្មានកំណត់ត្រាលម្អិតសម្រាប់ខែនេះ</p></div>`;
  }
  modalHTML += `</div>`;
  modalContent.innerHTML = modalHTML;
  modalContainer.classList.remove("hidden");
  modalContainer.classList.add("flex");
}

window.showModal = showModal;

// --- API & DATA HANDLING ---
async function fetchSheetData(
  spreadsheetId,
  range,
  valueRenderOption = "FORMATTED_VALUE"
) {
  if (!GOOGLE_API_KEY) {
    showError("សូមបញ្ចូល API Key ជាមុនសិន។");
    return null;
  }
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueRenderOption=${valueRenderOption}&key=${GOOGLE_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      const message =
        errorData.error?.message || `HTTP error! status: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data.values || [];
  } catch (error) {
    console.error("Fetch error:", error);
    showError(`មិនអាចទាញទិន្នន័យបានទេ: ${error.message}`);
    return null;
  }
}

async function init() {
  loader.classList.remove("hidden");
  hideError();
  dataContainer.innerHTML = "";
  const [infoRows, leaveRows, homeRows, profileRows] = await Promise.all([
    fetchSheetData(MAIN_SHEET_ID, RANGES.info),
    fetchSheetData(MAIN_SHEET_ID, RANGES.leave),
    fetchSheetData(HOME_SHEET_ID, RANGES.home),
    fetchSheetData(PROFILE_SHEET_ID, RANGES.profiles, "FORMULA"),
  ]);

  if (profileRows) profileData = parseProfileData(profileRows);
  if (infoRows) allData.info = parseInfoData(infoRows);
  if (leaveRows) allData.leave = parseLeaveData(leaveRows);
  if (homeRows) allData.home = parseHomeData(homeRows);

  combineAndSortData();
  loader.classList.add("hidden");

  const savedTheme = localStorage.getItem("appTheme");
  if (savedTheme) setTheme(savedTheme);
  else renderThemeSelector("blue");

  if (currentTab === "settings") render();
  else switchTab(currentTab);
}

function parseInfoData(rows) {
  return rows
    .slice()
    .reverse()
    .map((row) => ({
      type: "info",
      id: String(row[3] || ""),
      name: row[4] || "",
      gender: row[5] || "",
      class: row[7] || "",
      dateOut: row[0] || "",
      timeOut: row[12] || "",
      dateIn: row[14] || "",
      timeIn: row[13] || "",
      reason: row[9] || "",
      duration: row[10] || "",
      sortDate: parseDateForSort(row[0]),
    }))
    .filter((item) => item.name);
}

function parseLeaveData(rows) {
  return rows
    .slice()
    .reverse()
    .map((row) => ({
      type: "leave",
      id: String(row[1] || ""),
      name: row[2] || "",
      gender: row[3] || "",
      class: row[5] || "",
      date: row[0] || "",
      reason: row[6] || "",
      duration: row[7] || "",
      dateEnd: row[10] || "",
      sortDate: parseDateForSort(row[0]),
    }))
    .filter((item) => item.name);
}

function parseHomeData(rows) {
  return rows
    .slice()
    .reverse()
    .map((row) => {
      const homeId = String(row[6] || "").trim(); // Col H from Home

      // NEW CHECK ADDED HERE
      if (!homeId || homeId === "មិនមាន") return null;

      // Filter Logic
      const verification = homeVerificationMap[homeId];
      if (!verification) return null; // If no ID match, don't show
      if (verification.status === "NO") return null; // If ID matches but Status is NO, don't show

      // Use main ID for profile lookup if available, else use home ID
      const finalId = verification.mainId;

      return {
        type: "home",
        id: finalId,
        name: row[0] || "", // Col B
        reason: row[8] || "", // Col J
        duration: row[9] || "", // Col K
        dateOut: row[10] || "", // Col L
        timeOut: row[13] || "", // Col O
        dateIn: row[14] || "", // Col P
        timeIn: row[15] || "", // Col Q
        sortDate: parseDateForSort(row[10]),
      };
    })
    .filter((item) => item && item.name);
}

function combineAndSortData() {
  const combined = [...allData.info, ...allData.leave, ...allData.home];
  allData.combined = combined.sort((a, b) => b.sortDate - a.sortDate);
  checkNotReturnedStatus();
}

function parseProfileData(rows) {
  const profileMap = {};
  homeVerificationMap = {}; // Reset map
  const imageUrlRegex = /=IMAGE\("([^"]+)"/;

  rows.forEach((row) => {
    if (row && row[0] !== null && row[0] !== undefined && row[0] !== "") {
      const id = String(row[0]).trim(); // Col E (Index 0)

      // Home Verification Data
      const status = String(row[1] || "")
        .trim()
        .toUpperCase(); // Col F (Index 1)
      const verificationId = String(row[5] || "").trim(); // Col J (Index 5)

      if (verificationId) {
        homeVerificationMap[verificationId] = {
          status: status,
          mainId: id,
        };
      }

      let photoUrl = row[11] || ""; // Col P? No, wait. Range E9:W.
      const match = photoUrl.match(imageUrlRegex);
      if (match && match[1]) photoUrl = match[1];

      // Fix Telegram URL
      let telegramUrl = row[18] || "";
      if (telegramUrl && !telegramUrl.startsWith("http")) {
        telegramUrl = "https://" + telegramUrl;
      }

      profileMap[id] = {
        photo: photoUrl,
        department: row[14] || "",
        group: row[6] || "", // Column G (Index 2 in original range? Let's verify E9:W)
        // E(0), F(1), G(2)... W(18)
        // group: row[2] || '',
        telegram: telegramUrl, // Column W
      };

      // Re-verify group column index. User said 'G9:G'.
      // If Range E9:W -> E=0, F=1, G=2. Yes, index 2 is correct.
      profileMap[id].group = row[2] || "";
    }
  });
  return profileMap;
}

function showError(message) {
  let displayMessage = message;
  let showChangeKeyButton = false;
  if (message.includes("API key not valid")) {
    displayMessage =
      "API Key មិនត្រឹមត្រូវទេ។ សូមពិនិត្យ API Key របស់អ្នក រួចព្យាយាមម្តងទៀត។";
    showChangeKeyButton = true;
  } else if (message.includes("not found")) {
    displayMessage =
      "រកមិនឃើញ Sheet ដែលបានកំណត់ទេ។ សូមពិនិត្យឈ្មោះ Sheet ឡើងវិញ។";
  }
  errorText.textContent = displayMessage;
  errorMessage.classList.remove("hidden");
  loader.classList.add("hidden");
  changeApiKeyButton.classList.toggle("hidden", !showChangeKeyButton);
}

function hideError() {
  errorMessage.classList.add("hidden");
}

function getFilteredData() {
  const dataToFilter = allData[currentTab] || [];
  const searchTerm = searchInput.value.toLowerCase();
  const selectedYear = yearFilter.value;
  const selectedMonth = monthFilter.value;
  const start = startDateFilter.value
    ? new Date(startDateFilter.value)
    : null;
  const end = endDateFilter.value ? new Date(endDateFilter.value) : null;
  if (start) start.setHours(0, 0, 0, 0);
  if (end) end.setHours(23, 59, 59, 999);

  return dataToFilter.filter((item) => {
    const searchMatch =
      item.id.toLowerCase().includes(searchTerm) ||
      item.name.toLowerCase().includes(searchTerm);
    const itemDateStr = item.dateOut || item.date;
    if (!itemDateStr) return false;
    const itemDate = parseDateForSort(itemDateStr);
    itemDate.setHours(12, 0, 0, 0);

    let dateMatch = true;
    if (filterDate) {
      const filterD = new Date(filterDate);
      filterD.setHours(12, 0, 0, 0);
      dateMatch = itemDate.getTime() === filterD.getTime();
    } else if (start && end) {
      dateMatch = itemDate >= start && itemDate <= end;
    } else {
      dateMatch =
        itemDate.getFullYear() == selectedYear &&
        itemDate.getMonth() + 1 == selectedMonth;
    }
    return searchMatch && dateMatch;
  });
}

function resetFilters() {
  const now = new Date();
  filterDate = null;
  searchInput.value = "";
  startDateFilter.value = "";
  endDateFilter.value = "";
  yearFilter.value = now.getFullYear();
  monthFilter.value = now.getMonth() + 1;
  currentPage = 1;
  render();
}

function render() {
  hideError();
  if (currentTab === "settings") {
    dataView.classList.add("hidden");
    settingsPage.classList.remove("hidden");
  } else {
    settingsPage.classList.add("hidden");
    dataView.classList.remove("hidden");
    dataContainer.innerHTML = "";
    const filteredData = getFilteredData();

    const isFiltering =
      searchInput.value !== "" ||
      filterDate !== null ||
      (startDateFilter.value !== "" && endDateFilter.value !== "");
    activeFilterBadge.classList.toggle("hidden", !isFiltering);

    if (filterDate) filterBadgeText.textContent = "តម្រង: ថ្ងៃនេះ";
    else if (startDateFilter.value && endDateFilter.value)
      filterBadgeText.textContent = "តម្រង: ចន្លោះថ្ងៃ";
    else filterBadgeText.textContent = "កំពុងប្រើតម្រង";

    if (currentTab === "combined") renderCombinedView(filteredData);
    else renderStandardView(filteredData);
  }
  updateMobileNavState(currentTab);
  updateDesktopTabsState(currentTab);
}

function renderStandardView(filteredData) {
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  summaryText.textContent = `បង្ហាញ ${toKhmerNumber(
    paginatedData.length
  )} នៃ ${toKhmerNumber(filteredData.length)}`;

  if (filteredData.length === 0) {
    dataContainer.innerHTML = `<div class="col-span-full text-center p-10 bg-white rounded-2xl shadow-sm border border-dashed border-slate-200"><div class="text-slate-300 mb-3"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><p class="text-slate-500 font-medium">រកមិនឃើញទិន្នន័យទេ។</p></div>`;
  } else {
    paginatedData.forEach((item, index) => {
      const trimmedId = item.id.trim();
      const profile = profileData[trimmedId] || {
        photo: "",
        department: "",
      };
      const placeholderImg = `https://placehold.co/80x80/e2e8f0/64748b?text=${(
        item.name || "?"
      ).charAt(0)}`;
      const card = document.createElement("div");

      const isInfo = item.type === "info";
      const borderColor = isInfo ? "border-blue-100" : "border-green-100";
      const nameColor = isInfo ? "text-blue-700" : "text-green-700";
      const badgeBg = isInfo
        ? "bg-blue-100 text-blue-700"
        : "bg-green-100 text-green-700";
      const imageBorder = isInfo ? "border-blue-200" : "border-green-200";

      card.className = `card bg-white p-4 rounded-2xl shadow-sm border ${borderColor} flex flex-row gap-4 cursor-pointer hover:shadow-md transition-all duration-200 h-full items-start`;
      card.style.animationDelay = `${index * 0.03}s`;
      // DISABLED CLICK FOR STANDARD VIEW
      // card.onclick = () => showModal(item, profile);

      let contentHTML = `
                        <div class="flex-shrink-0">
                            <img src="${
                              profile.photo || placeholderImg
                            }" onerror="this.onerror=null;this.src='${placeholderImg}';" class="w-14 h-14 rounded-full object-cover border-2 ${imageBorder} shadow-sm">
                        </div>
                        <div class="flex-grow min-w-0">
                            <div class="flex justify-between items-start mb-1">
                                <div>
                                    <h3 class="font-bold text-base ${nameColor} truncate leading-tight">${
        item.name || "គ្មានឈ្មោះ"
      }</h3>
                                    <p class="text-xs text-slate-400 font-mono mt-0.5">${toKhmerNumber(
                                      item.id
                                    )}</p>
                                </div>
                                <span class="text-[10px] font-bold ${badgeBg} px-2.5 py-1 rounded-lg flex-shrink-0 whitespace-nowrap border border-opacity-20 border-current">${toKhmerNumber(
        item.duration
      )}</span>
                            </div>
                            <p class="text-xs text-slate-500 mb-2 truncate font-medium">${
                              profile.department || item.class || "គ្មានផ្នែក"
                            }</p>
                            <div class="text-xs text-slate-600 border-t border-dashed border-slate-200 pt-2 mt-2">
                                <p class="mb-1 truncate"><span class="text-slate-400">មូលហេតុ:</span> ${
                                  item.reason || "N/A"
                                }</p>
                    `;

      if (isInfo) {
        contentHTML += `
                                <div class="flex justify-between text-xs text-slate-500 font-medium">
                                    <span>ចេញ: ${toKhmerNumber(
                                      item.dateOut
                                    )} <span class="text-blue-600">${toKhmerNumber(
          item.timeOut
        )}</span></span>
                                </div>
                            </div>
                        </div>`;
      } else {
        const singleDayKeywords = [
          "មួយព្រឹក",
          "មួយរសៀល",
          "ពេលយប់",
          "មួយថ្ងៃ",
        ];
        const isSingleDay =
          !item.duration ||
          singleDayKeywords.some((keyword) =>
            (item.duration || "").includes(keyword)
          );
        const dateDisplay =
          isSingleDay || !item.dateEnd
            ? `<span>កាលបរិច្ឆេទ: ${toKhmerNumber(item.date)}</span>`
            : `<span>${toKhmerNumber(item.date)} - ${toKhmerNumber(
                item.dateEnd
              )}</span>`;
        contentHTML += `
                                <div class="flex justify-between text-xs text-slate-500 font-medium">
                                    ${dateDisplay}
                                </div>
                            </div>
                        </div>`;
      }
      card.innerHTML = contentHTML;
      dataContainer.appendChild(card);
    });
  }
  renderPagination(filteredData.length);
}

function renderCombinedView(filteredData) {
  const employeeSummary = filteredData.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        id: item.id,
        name: item.name,
        profile: profileData[item.id.trim()] || {
          photo: "",
          department: "",
        },
        infoCount: 0,
        leaveCount: 0,
        homeCount: 0,
      };
    }
    if (item.type === "info") acc[item.id].infoCount++;
    else if (item.type === "leave") acc[item.id].leaveCount++;
    else if (item.type === "home") acc[item.id].homeCount++;
    return acc;
  }, {});

  const summaryArray = Object.values(employeeSummary);
  summaryText.textContent = `បង្ហាញ ${toKhmerNumber(
    summaryArray.length
  )} នាក់`;

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const paginatedData = summaryArray.slice(startIndex, endIndex);

  if (summaryArray.length === 0) {
    dataContainer.innerHTML = `<div class="col-span-full text-center p-10 bg-white rounded-2xl shadow-sm border border-dashed border-slate-200"><p class="text-slate-500 font-medium">រកមិនឃើញទិន្នន័យសម្រាប់ខែនេះទេ។</p></div>`;
  } else {
    paginatedData.forEach((summary, index) => {
      const placeholderImg = `https://placehold.co/80x80/e2e8f0/64748b?text=${(
        summary.name || "?"
      ).charAt(0)}`;
      const card = document.createElement("div");
      // Changed: items-start instead of items-center, to handle taller content better
      card.className =
        "card bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 cursor-pointer hover:shadow-md transition-all duration-200";
      card.style.animationDelay = `${index * 0.03}s`;
      const originalItem = filteredData.find((i) => i.id === summary.id);
      card.onclick = () => showModal(originalItem, summary.profile);

      // **CHECK IF ID IS NUMERIC (Has only digits)**
      const isNumericId = /^\d+$/.test(summary.id.trim());

      card.innerHTML = `
            <img src="${
              summary.profile.photo || placeholderImg
            }" onerror="this.onerror=null;this.src='${placeholderImg}';" class="w-16 h-16 rounded-full object-cover border-2 border-slate-100 shadow-sm flex-shrink-0">
            
            <div class="flex-grow min-w-0 flex flex-col justify-between h-full">
                <div>
                    <h3 class="font-bold text-base text-slate-800 truncate">${
                      summary.name || "គ្មានឈ្មោះ"
                    }</h3>
                    <p class="text-xs text-slate-400 font-mono">${toKhmerNumber(
                      summary.id
                    )}</p>
                    <p class="text-sm text-slate-500 truncate mb-1">${
                      summary.profile.department || "គ្មានផ្នែក"
                    }</p>
                </div>
                
                <div class="flex flex-wrap gap-2 mt-2 w-full">
                     <div class="flex-1 min-w-[70px] text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-lg border border-blue-100 text-center whitespace-nowrap">
                        ចេញ: ${toKhmerNumber(summary.infoCount)}
                     </div>
                     ${ isNumericId ? `
                     <div class="flex-1 min-w-[70px] text-xs font-bold bg-green-50 text-green-600 px-2 py-1 rounded-lg border border-green-100 text-center whitespace-nowrap">
                        សម្រាក: ${toKhmerNumber(summary.leaveCount)}
                     </div>
                     <div class="flex-1 min-w-[70px] text-xs font-bold bg-purple-50 text-purple-600 px-2 py-1 rounded-lg border border-purple-100 text-center whitespace-nowrap">
                        ទៅផ្ទះ: ${toKhmerNumber(summary.homeCount)}
                     </div>` : '' }
                </div>
            </div>
            
            <div class="text-slate-300 self-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
            </div>
        `;
      dataContainer.appendChild(card);
    });
  }
  renderPagination(summaryArray.length);
}

function renderPagination(totalItems) {
  const paginationContainer = document.getElementById(
    "pagination-container"
  );
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(totalItems / cardsPerPage);
  if (totalPages <= 1) return;

  let paginationHTML = "";
  paginationHTML += `<button class="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition" onclick="changePage(${
    currentPage - 1
  })" ${
    currentPage === 1 ? "disabled" : ""
  }><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg></button>`;
  paginationHTML += `<span class="mx-4 text-sm font-bold text-slate-600">ទំព័រ ${toKhmerNumber(
    currentPage
  )} / ${toKhmerNumber(totalPages)}</span>`;
  paginationHTML += `<button class="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm text-slate-500 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition" onclick="changePage(${
    currentPage + 1
  })" ${
    currentPage === totalPages ? "disabled" : ""
  }><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg></button>`;
  paginationContainer.innerHTML = `<div class="flex items-center select-none">${paginationHTML}</div>`;
}

function changePage(page) {
  currentPage = page;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function populateDateFilters() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  yearFilter.innerHTML = "";
  for (let y = currentYear + 1; y >= 2020; y--) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = `ឆ្នាំ ${toKhmerNumber(y)}`;
    yearFilter.appendChild(option);
  }
  yearFilter.value = currentYear;

  monthFilter.innerHTML = "";
  const khmerMonths = [
    "មករា",
    "កុម្ភៈ",
    "មីនា",
    "មេសា",
    "ឧសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ",
  ];
  for (let m = 1; m <= 12; m++) {
    const option = document.createElement("option");
    option.value = m;
    option.textContent = `ខែ ${khmerMonths[m - 1]}`;
    monthFilter.appendChild(option);
  }
  monthFilter.value = currentMonth;
}

function switchTab(tabName) {
  currentTab = tabName;
  currentPage = 1;
  render();
}

function updateDesktopTabsState(tabName) {
  const tabs = [
    { el: tabInfo, name: "info" },
    { el: tabLeave, name: "leave" },
    { el: tabHome, name: "home" },
    { el: tabCombined, name: "combined" },
    { el: tabSettings, name: "settings" },
  ];

  tabs.forEach((tab) => {
    if (tab.name === tabName) {
      tab.el.classList.add("bg-primary-50", "text-primary-600");
      tab.el.classList.remove("text-slate-500");
    } else {
      tab.el.classList.remove("bg-primary-50", "text-primary-600");
      tab.el.classList.add("text-slate-500");
    }
  });
}

function updateMobileNavState(tabName) {
  const navButtons = [
    { btn: navBtnInfo, name: "info" },
    { btn: navBtnLeave, name: "leave" },
    { btn: navBtnHome, name: "home" },
    { btn: navBtnCombined, name: "combined" },
    { btn: navBtnSettings, name: "settings" },
  ];
  navButtons.forEach((item) => {
    const isActive = item.name === tabName;
    const svg = item.btn.querySelector("svg");
    const text = item.btn.querySelector("span");
    if (isActive) {
      item.btn.classList.add("nav-item-active");
      svg.classList.remove("text-slate-400");
      svg.classList.add("text-primary-600");
      text.classList.remove("text-slate-500");
      text.classList.add("text-primary-600");
    } else {
      item.btn.classList.remove("nav-item-active");
      svg.classList.add("text-slate-400");
      svg.classList.remove("text-primary-600");
      text.classList.add("text-slate-500");
      text.classList.remove("text-primary-600");
    }
  });
}

function checkNotReturnedStatus() {
  const now = new Date();
  const notReturnedList = allData.info.filter((item) => {
    if (item.timeIn && item.timeIn.trim() !== "") return false;
    const itemDate = parseDateForSort(item.dateOut);
    return (
      itemDate.getFullYear() == now.getFullYear() &&
      itemDate.getMonth() + 1 == now.getMonth() + 1
    );
  });
  notReturnedBadge.classList.toggle(
    "hidden",
    notReturnedList.length === 0
  );
}

function checkApiKey() {
  populateDateFilters();
  const savedKey = localStorage.getItem("googleApiKey");
  if (savedKey) GOOGLE_API_KEY = savedKey;
  if (GOOGLE_API_KEY) {
    apiKeySection.classList.add("hidden");
    mainContent.classList.remove("hidden");
    init();
  } else {
    apiKeySection.classList.remove("hidden");
    mainContent.classList.add("hidden");
  }
}

saveApiKeyButton.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (key) {
    localStorage.setItem("googleApiKey", key);
    GOOGLE_API_KEY = key;
    apiKeySection.classList.add("hidden");
    mainContent.classList.remove("hidden");
    init();
  } else {
    alert("សូមបញ្ចូល API Key ដែលត្រឹមត្រូវ");
  }
});

changeApiKeyButton.addEventListener("click", () => {
  localStorage.removeItem("googleApiKey");
  GOOGLE_API_KEY = "";
  mainContent.classList.add("hidden");
  errorMessage.classList.add("hidden");
  apiKeySection.classList.remove("hidden");
  apiKeyInput.value = "";
});

refreshButton.addEventListener("click", async () => {
  const icon = refreshButton.querySelector("svg");
  icon.classList.add("spinning");
  refreshButton.disabled = true;
  await init();
  setTimeout(() => {
    icon.classList.remove("spinning");
    refreshButton.disabled = false;
  }, 500);
});

todayButton.addEventListener("click", () => {
  const now = new Date();
  filterDate = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  startDateFilter.value = "";
  endDateFilter.value = "";
  searchInput.value = "";
  switchTab("info");
});

resetFilterButton.addEventListener("click", resetFilters);

applyFilterButton.addEventListener("click", () => {
  filterDate = null;
  switchTab("info");
});

notReturnedButton.addEventListener("click", showNotReturnedModal);
summaryButton.addEventListener("click", () => showSummaryModal(null));

tabInfo.addEventListener("click", () => switchTab("info"));
tabLeave.addEventListener("click", () => switchTab("leave"));
tabHome.addEventListener("click", () => switchTab("home"));
tabCombined.addEventListener("click", () => switchTab("combined"));
tabSettings.addEventListener("click", () => switchTab("settings"));

navBtnInfo.addEventListener("click", () => switchTab("info"));
navBtnLeave.addEventListener("click", () => switchTab("leave"));
navBtnHome.addEventListener("click", () => switchTab("home"));
navBtnCombined.addEventListener("click", () => switchTab("combined"));
navBtnSettings.addEventListener("click", () => switchTab("settings"));

modalContainer.addEventListener("click", (e) => {
  if (
    e.target === modalContainer ||
    e.target.closest(".modal-close-btn")
  ) {
    hideModal();
  }
});

function updateCardsPerPage() {
  cardsPerPage = window.innerWidth >= 1024 ? 14 : 14;
}

function handleSwipeGesture() {
  if (currentTab === "settings") return;
  const swipeThreshold = 50;
  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / cardsPerPage);
  if (touchEndX < touchStartX - swipeThreshold) {
    if (currentPage < totalPages) changePage(currentPage + 1);
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    if (currentPage > 1) changePage(currentPage - 1);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkApiKey();
  updateCardsPerPage();
});

window.addEventListener("resize", () => {
  updateCardsPerPage();
  render();
});
dataContainer.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);
dataContainer.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
});
