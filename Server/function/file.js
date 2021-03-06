const multer = require('multer')

const UploadImage = multer({
    storage: multer.memoryStorage(),
    limits: {
    fileSize: 10 * 1024 * 1024,  // 限制 2 MB
    },
    fileFilter (req, file, callback) {  // 限制檔案格式為 image
        if (!file.mimetype.match(/^image/)) 
        {
            callback(new Error().message = '檔案格式錯誤');
        } 
        else 
        {
            callback(null, true);
        }
    }
});

module.exports = {
    UploadImage
}