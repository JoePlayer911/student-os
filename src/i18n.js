// src/i18n.js

export let currentLanguage = 'en';

export const translations = {
  en: {
    "sys-online": "ONLINE",
    "nav-orbit": "RETURN TO ORBIT",
    "title-welcome": "WELCOME TO INDONESIA",
    "press-to-soar": "Click Anywhere to Soar",
    "warning-rotate": "PLEASE ROTATE DEVICE",
    "warning-desc": "Nusantara Explorer requires Landscape mode.",
    "app-title": "NUSANTARA EXPLORER",
    "label-latlng": "LAT/LNG",
    "label-island-info": "ISLAND INFO",
    "label-awaiting": "Awaiting Input",
    "label-population": "POPULATION",
    "label-area": "AREA",
    "nc-header": "SELECT A GLOWING BOX, THEN SELECT AN ITEM",
    "nc-victory-title": "ISLAND RESTORED!",
    "btn-playagain": "PLAY AGAIN",
    "sh-target-header": "FIND THIS:",
    "sh-victory-title": "ALL TARGETS FOUND!",
    "fr-victory-title": "RECONSTRUCTION COMPLETE!",

    "panel-info": "INFO MODULE",
    "panel-settings": "SYSTEM SETTINGS",
    "label-sys-lang": "SYSTEM LANGUAGE",
    "label-disp-scale": "DISPLAY UI SCALE",
    "label-audio-output": "AUDIO OUTPUT",
    "label-globe-skin": "GLOBE SKIN",
    "opt-classic-blue": "Classic Blue Marble",
    "opt-bright-day": "Bright Daylight View",
    "label-disp-calib": "DISPLAY CALIBRATION",
    "btn-recalibrate": "Recalibrate Touchscreen",
    
    "panel-random": "RANDOM NUMBER PICKER",
    "panel-vocab": "VOCABULARY BOOK",
    "module-offline": "MODULE OFFLINE",
    "module-slated": "Slated for deployment in Milestone 2/3",
    "panel-games": "GAMES MODULE",
    "btn-nc-launch": "NUSANTACRAFT EXPEDITION",
    "desc-nc": "Restore the diorama by dragging the correct elements to their rightful places across the archipelago.",
    "title-nc": "NUSANTACRAFT",
    "title-sh": "SPRITE HUNTER",
    "desc-sh": "Identify the correct moving items by their cultural names. Do not hit the wrong targets!",
    "btn-sh-launch": "SPRITE HUNTER PROTOCOL",
    "btn-fr-launch": "FRAGMENT REASSEMBLER",
    "desc-fr": "Reconstruct shattered cultural data by reassembling the scattered fragments.",
    "title-fr": "FRAGMENT REASSEMBLER",
    "btn-mancala-launch": "MANCALA (CLASSIC)",
    "btn-exit-game": "EXIT GAME",
    "btn-how-to-play": "HOW TO PLAY",
    "btn-close-help": "GOT IT",
    "title-mancala": "TRADITIONAL MANCALA",
    "desc-mancala": "Play the classic board game of Mancala. Move your seeds around the board and collect more than your opponent.",
    "mancala-rule-1": "The game begins with seeds in each small hole.",
    "mancala-rule-2": "Players take turns picking up all seeds from one hole and sowing them one-by-one into subsequent holes.",
    "mancala-rule-3": "If your last seed lands in your Store (the large hole on your right), you get an extra turn.",
    "mancala-rule-4": "If your last seed lands in an empty hole on your side, you capture that seed and all seeds in the opposite hole.",
    "mancala-rule-5": "The game ends when all holes on one side are empty. The player with the most seeds wins.",

    "toast-empty-slot": "Select an empty slot in the diorama first!",
    "toast-wrong-item": "Hmm, that doesn't seem to belong there...",
    "toast-cooldown": "Incorrect! Module cooling down..."
  },
  id: {
    "sys-online": "DARING",
    "nav-orbit": "KEMBALI KE ORBIT",
    "title-welcome": "SELAMAT DATANG DI INDONESIA",
    "press-to-soar": "Klik Dimana Saja Untuk Terbang",
    "warning-rotate": "MOHON PUTAR PERANGKAT",
    "warning-desc": "Nusantara Explorer memerlukan mode Lanskap.",
    "app-title": "PENJELAJAH NUSANTARA",
    "label-latlng": "LINTANG/BUJUR",
    "label-island-info": "INFO PULAU",
    "label-awaiting": "Menunggu Masukan",
    "label-population": "POPULASI",
    "label-area": "LUAS",
    "nc-header": "PILIH KOTAK MENYALA, LALU PILIH ITEM",
    "nc-victory-title": "PULAU DIPULIHKAN!",
    "btn-playagain": "MAIN LAGI",
    "sh-target-header": "CARI INI:",
    "sh-victory-title": "SEMUA TARGET DITEMUKAN!",
    "fr-victory-title": "REKONSTRUKSI SELESAI!",

    "panel-info": "MODUL INFO",
    "panel-settings": "PENGATURAN SISTEM",
    "label-sys-lang": "BAHASA SISTEM",
    "label-disp-scale": "SKALA UI TAMPILAN",
    "label-audio-output": "KELUARAN AUDIO",
    "label-globe-skin": "TAMPILAN BUMI",
    "opt-classic-blue": "Biru Klasik",
    "opt-bright-day": "Siang Terang",
    "label-disp-calib": "KALIBRASI TAMPILAN",
    "btn-recalibrate": "Kalibrasi Layar Sentuh",
    
    "panel-random": "PENGACAK ANGKA",
    "panel-vocab": "BUKU KOSAKATA",
    "module-offline": "MODUL NONAKTIF",
    "module-slated": "Dijadwalkan untuk peluncuran di Milestone 2/3",
    "panel-games": "MODUL GAME",
    "btn-nc-launch": "EKSPEDISI NUSANTACRAFT",
    "desc-nc": "Pulihkan diorama dengan menempatkan elemen dengan benar di seluruh nusantara.",
    "title-nc": "NUSANTACRAFT",
    "title-sh": "PEMBURU SPRITE",
    "desc-sh": "Identifikasi item bergerak berdasarkan nama budayanya. Jangan sampai salah target!",
    "btn-sh-launch": "PROTOKOL PEMBURU SPRITE",
    "btn-fr-launch": "PENYUSUN SERPIHAN",
    "desc-fr": "Rekonstruksi data budaya yang hancur dengan menyusun kembali serpihan yang tersebar.",
    "title-fr": "PENYUSUN SERPIHAN",
    "btn-mancala-launch": "MANCALA (KLASIK)",
    "btn-exit-game": "KELUAR GAME",
    "btn-how-to-play": "CARA BERMAIN",
    "btn-close-help": "MENGERTI",
    "title-mancala": "MANCALA TRADISIONAL",
    "desc-mancala": "Mainkan permainan papan klasik Mancala. Pindahkan biji-bijian Anda di sekitar papan dan kumpulkan lebih banyak dari lawan Anda.",
    "mancala-rule-1": "Permainan dimulai dengan biji di setiap lubang kecil.",
    "mancala-rule-2": "Pemain bergiliran mengambil semua biji dari satu lubang dan menaburkannya satu per satu ke lubang berikutnya.",
    "mancala-rule-3": "Jika biji terakhir Anda mendarat di Lumbung Anda (lubang besar di sebelah kanan), Anda mendapat giliran tambahan.",
    "mancala-rule-4": "Jika biji terakhir Anda mendarat di lubang kosong di sisi Anda, Anda menangkap biji itu dan semua biji di lubang seberang.",
    "mancala-rule-5": "Permainan berakhir ketika semua lubang di satu sisi kosong. Pemain dengan biji terbanyak menang.",

    "toast-empty-slot": "Pilih efek menyala di diorama terlebih dahulu!",
    "toast-wrong-item": "Hmm, sepertinya itu bukan tempatnya...",
    "toast-cooldown": "Salah! Modul pendinginan..."
  },
  zh: {
    "sys-online": "在线",
    "nav-orbit": "返回轨道",
    "title-welcome": "欢迎来到印尼",
    "press-to-soar": "点击任意处起飞",
    "warning-rotate": "请旋转设备",
    "warning-desc": "Nusantara Explorer 需要横屏模式。",
    "app-title": "努山塔拉 探险家",
    "label-latlng": "经度/纬度",
    "label-island-info": "岛屿信息",
    "label-awaiting": "等待输入",
    "label-population": "人口",
    "label-area": "面积",
    "nc-header": "选择发光框，然后选择物品",
    "nc-victory-title": "岛屿已恢复！",
    "btn-playagain": "再玩一次",
    "sh-target-header": "寻找这个：",
    "sh-victory-title": "找到所有目标！",
    "fr-victory-title": "重建完成！",

    "panel-info": "信息模块",
    "panel-settings": "系统设置",
    "label-sys-lang": "系统语言",
    "label-disp-scale": "显示 UI 缩放",
    "label-audio-output": "音频输出",
    "label-globe-skin": "地球皮肤",
    "opt-classic-blue": "经典蓝色大理石",
    "opt-bright-day": "明亮白天视图",
    "label-disp-calib": "显示校准",
    "btn-recalibrate": "重新校准触摸屏",
    
    "panel-random": "随机数字选择器",
    "panel-vocab": "词汇本",
    "module-offline": "模块离线",
    "module-slated": "计划在里程碑 2/3 部署",
    "panel-games": "游戏模块",
    "btn-nc-launch": "Nusantacraft 探险",
    "desc-nc": "通过将正确的元素拖拽到群岛中对应的位置来恢复全景图。",
    "title-nc": "NUSANTACRAFT",
    "title-sh": "SPRITE HUNTER",
    "desc-sh": "根据文化名称识别正确的移动物品。请勿点击错误的目标！",
    "btn-sh-launch": "Sprite Hunter 协议",
    "btn-fr-launch": "碎片重组",
    "desc-fr": "通过重新组装分散的碎片来重建破碎的文化数据。",
    "title-fr": "碎片重组",

    "toast-empty-slot": "请先选择全景图中的空白位置！",
    "toast-wrong-item": "哎呀，这里似乎放错了……",
    "toast-cooldown": "错误！模块冷却中……"
  },
  "zh-tw": {
    "sys-online": "在線",
    "nav-orbit": "返回軌道",
    "title-welcome": "歡迎來到印尼",
    "press-to-soar": "點擊任意處起飛",
    "warning-rotate": "請旋轉設備",
    "warning-desc": "Nusantara Explorer 需要橫屏模式。",
    "app-title": "努山塔拉 探險家",
    "label-latlng": "經度/緯度",
    "label-island-info": "島嶼信息",
    "label-awaiting": "等待輸入",
    "label-population": "人口",
    "label-area": "面積",
    "nc-header": "選擇發光框，然後選擇物品",
    "nc-victory-title": "島嶼已恢復！",
    "btn-playagain": "再玩一次",
    "sh-target-header": "尋找這個：",
    "sh-victory-title": "找到所有目標！",
    "fr-victory-title": "重建完成！",

    "panel-info": "信息模塊",
    "panel-settings": "系統設置",
    "label-sys-lang": "系統語言",
    "label-disp-scale": "顯示 UI 縮放",
    "label-audio-output": "音頻輸出",
    "label-globe-skin": "地球皮膚",
    "opt-classic-blue": "經典藍色大理石",
    "opt-bright-day": "明亮白天視圖",
    "label-disp-calib": "顯示校準",
    "btn-recalibrate": "重新校準觸摸屏",
    
    "panel-random": "隨機數字選擇器",
    "panel-vocab": "詞彙本",
    "module-offline": "模塊離線",
    "module-slated": "計劃在里程碑 2/3 部署",
    "panel-games": "遊戲模塊",
    "btn-nc-launch": "Nusantacraft 探險",
    "desc-nc": "通過將正確的元素拖拽到群島中對應的位置來恢復全景圖。",
    "title-nc": "NUSANTACRAFT",
    "title-sh": "SPRITE HUNTER",
    "desc-sh": "根據文化名稱識別正確的移動物品。請勿點擊錯誤的目標！",
    "btn-sh-launch": "Sprite Hunter 協議",
    "btn-fr-launch": "碎片重組",
    "desc-fr": "通過重新組裝分散的碎片來重建破碎的文化數據。",
    "title-fr": "碎片重組",

    "toast-empty-slot": "請先選擇全景圖中的空白位置！",
    "toast-wrong-item": "哎呀，這裡似乎放錯了……",
    "toast-cooldown": "錯誤！模塊冷卻中……"
  }
};

export function t(key) {
  return translations[currentLanguage][key] || translations['en'][key] || key;
}

export function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLanguage = lang;
  updateDOMTranslations();
}

export function updateDOMTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      if (el.tagName === 'INPUT' && el.type === 'button') {
        el.value = t(key);
      } else {
        el.textContent = t(key);
      }
    }
  });
}
