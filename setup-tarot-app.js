// Node.js로 tarot-app 폴더 자동 생성
const fs = require('fs');
const path = require('path');

const structure = {
  'tarot-app': {
    'index.html': '',
    'manifest.json': '',
    'service-worker.js': '',
    'css': {
      'style.css': '',
    },
    'js': {
      'main.js': '',
      'ui.js': '',
      'cards.js': '',
    },
    'data': {
      'cards.json': '[]'
    },
    'cards': {
      'back.jpg': '', // 이미지는 수동 복사 필요
      'icon-192.png': '',
      'icon-512.png': '',
    },
  }
};

function createStructure(base, obj) {
  for (const name in obj) {
    const target = path.join(base, name);
    if (typeof obj[name] === 'object') {
      fs.mkdirSync(target, { recursive: true });
      createStructure(target, obj[name]);
    } else {
      fs.writeFileSync(target, obj[name]);
    }
  }
}

createStructure('.', structure);
console.log('✅ Tarot 앱 폴더 구조 생성 완료!');
