/* IndexedDB for evidence | LocalStorage for metadata */

const DB_NAME = "ssc_solo_images";
const DB_VER = 1;
let db;

function openDB() {
  return new Promise((resolve) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains("images")) {
        d.createObjectStore("images", { keyPath: "id", autoIncrement: true });
      }
    };
    req.onsuccess = e => {
      db = e.target.result;
      resolve();
    };
  });
}

function saveImage(blob) {
  const tx = db.transaction("images", "readwrite");
  tx.objectStore("images").add({ blob, ts: Date.now() });
}

function compressImage(file) {
  return new Promise(resolve => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const reader = new FileReader();

    reader.onload = e => {
      img.onload = () => {
        const max = 1024;
        let { width, height } = img;
        if (width > height && width > max) {
          height *= max / width;
          width = max;
        } else if (height > max) {
          width *= max / height;
          height = max;
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        canvas.toBlob(b => resolve(b), "image/webp", 0.65);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function meta(key, val) {
  if (val === undefined) return JSON.parse(localStorage.getItem(key));
  localStorage.setItem(key, JSON.stringify(val));
}
