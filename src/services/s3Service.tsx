import AWS from 'aws-sdk';

export const uploadToS3 = async (file: File): Promise<string> => {
    const s3 = new AWS.S3();
    const fileFormat = file.name.split('.').pop();
    const upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: 'sentifiimages',
            Key: `images/${Date.now()}.${fileFormat}`, //추후에 images/닉네임/post/imageName으로 분류
            Body: file,
            ContentType: file.type,
            // ACL: 'public-read', // 파일을 공개적으로 읽을 수 있도록 설정
        },
    });

    try {
        const data = await upload.promise();
        return data.Location; // 업로드된 파일의 S3 URL 반환
    } catch (err) {
        console.error('Error uploading file to S3:', err);
        throw err;
    }
};
