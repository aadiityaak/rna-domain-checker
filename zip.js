const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

// Tentukan folder output
const outputDir = path.join(__dirname, "dist");
const targetDir = path.join(outputDir, "rna-check-domain");

// Hapus folder 'rna-check-domain' jika ada
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}

// Buat folder 'rna-check-domain'
fs.mkdirSync(targetDir);

// Tentukan path untuk file ZIP
const zipFilePath = path.join(
  outputDir,
  `rna-check-domain-v-${require("./package.json").version}.zip`
);
const archive = archiver("zip", {
  zlib: { level: 9 },
});

// Event listener untuk menampilkan info saat ZIP selesai
archive.on("close", () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log("ZIP file has been created successfully.");
});

// Event listener untuk menangani error
archive.on("error", (err) => {
  throw err;
});

// Pipe output ke archive
archive.pipe(fs.createWriteStream(zipFilePath));

// Tambahkan folder dan file ke folder target, sambil mengabaikan folder dan file tertentu
const excludedFolders = ["node_modules", "dist", ".git", "src"];
const excludedFiles = [
  "package.json",
  "package-lock.json",
  "zip.js",
  "webpack.config.js",
  "postcss.config.js",
  "tailwind.config.js",
  "webpack.config.js",
  "README.md",
  ".babelrc",
  ".gitignore",
];

function addFilesToTargetDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!excludedFolders.includes(file)) {
        // Jika bukan folder yang dikecualikan, salin ke folder target
        const newDir = path.join(targetDir, file);
        fs.mkdirSync(newDir);
        addFilesToTargetDir(filePath); // Rekursi untuk isi folder
      }
    } else {
      // Salin file, kecuali jika berada di daftar yang dikecualikan
      if (!excludedFiles.includes(file)) {
        fs.copyFileSync(filePath, path.join(targetDir, file));
      }
    }
  });
}

// Mulai menyalin file dari direktori proyek (kecuali folder dan file yang dikecualikan)
addFilesToTargetDir(__dirname);

// Tambahkan folder 'rna-check-domain' ke archive
archive.directory(targetDir + "/", "rna-check-domain/");
archive.finalize();
