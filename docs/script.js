// 计算恋爱天数
function calculateLoveDays() {
  const startDate = new Date('2024-09-14');
  const today = new Date();
  const diffTime = today - startDate;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// 更新页面显示
function updateLoveCounter() {
  const days = calculateLoveDays();
  const loveDaysElement = document.getElementById('loveDays');

  if (loveDaysElement) {
    loveDaysElement.textContent = days;
    loveDaysElement.style.animation = 'pulse 0.5s ease-in-out';

    // 添加特殊日期的样式
    if (days % 100 === 0) {
      loveDaysElement.style.color = '#ff6b6b';
      loveDaysElement.style.fontSize = '5rem';
    }
  }
}

// 加载照片墙
function loadPhotoGallery() {
  const photoGrid = document.getElementById('photoGrid');
  if (!photoGrid) return;

  // 示例照片数据 - 实际使用时替换为你们的照片
  const photos = [
    {
      src: 'assets/images/photo1.jpg',
      alt: '我们的第一张合照',
    },
    {
      src: 'assets/images/photo2.jpg',
      alt: '旅行记忆',
    },
    // 可以继续添加更多照片
  ];

  photos.forEach((photo) => {
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = 'lazy'; // 懒加载优化

    photoItem.appendChild(img);
    photoGrid.appendChild(photoItem);
  });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
  updateLoveCounter();
  loadPhotoGallery();

  // 每天更新天数（可选）
  setInterval(updateLoveCounter, 24 * 60 * 60 * 1000);
});

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
