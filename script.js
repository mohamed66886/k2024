const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

const frame = new Image();
frame.src = 'frame.png';  // تأكد من وضع صورة الفريم في نفس مجلد المشروع

upload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const aspectRatio = img.width / img.height;
            const frameAspectRatio = frame.width / frame.height;

            let finalWidth, finalHeight;
            if (aspectRatio > frameAspectRatio) {
                finalWidth = frame.width;
                finalHeight = frame.width / aspectRatio;
            } else {
                finalHeight = frame.height;
                finalWidth = frame.height * aspectRatio;
            }

            canvas.width = frame.width;
            canvas.height = frame.height;

            // قص الصورة لتناسب الإطار بالضبط
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, (canvas.width - finalWidth) / 2, (canvas.height - finalHeight) / 2, finalWidth, finalHeight);
            ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

            downloadBtn.style.display = 'block';  // إظهار زر التحميل بعد إضافة الفريم
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
});

downloadBtn.addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'framed_image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});