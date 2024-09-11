import AWS from "aws-sdk";

export const uploadToS3 = async (file: File, uid: string): Promise<string> => {
  const s3 = new AWS.S3();
  const fileFormat = file.name.split(".").pop();
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: "sentifiimages",
      Key: `images/${uid}/post/${Date.now()}.${fileFormat}`,
      Body: file,
      ContentType: file.type,
      //ACL: 'public-read', // 파일을 공개적으로 읽을 수 있도록 설정
    },
  });

  try {
    const data = await upload.promise();
    return data.Location; // 업로드된 파일의 S3 URL 반환
  } catch (err) {
    console.error("Error uploading file to S3:", err);
    throw err;
  }
};

export const uploadTempZipToS3 = async (
  file: File,
  uid: string
): Promise<string> => {
  const s3 = new AWS.S3();
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: "sentifiimages",
      Key: `images/${uid}/tempSaved/tempSaved.zip`, // 임시 저장 파일 경로
      Body: file,
      ContentType: file.type,
    },
  });

  try {
    const data = await upload.promise();
    return data.Location; // 업로드된 파일의 S3 URL 반환
  } catch (err) {
    console.error("Error uploading temp zip file to S3:", err);
    throw err;
  }
};

export const downloadFromS3 = async (
  key: string,
  uid: string
): Promise<Blob | null> => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: "sentifiimages",
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    if (data.Body instanceof Uint8Array) {
      return new Blob([data.Body.buffer], { type: "application/zip" });
    } else {
      throw new Error("Unexpected data type from S3");
    }
  } catch (err: any) {
    if (err.code === "NoSuchKey") {
      console.warn(`File not found: ${key}`);
      return null; // 파일이 없으면 null 반환
    } else {
      console.error("Error downloading file from S3:", err);
      throw err;
    }
  }
};

export const deleteFromS3 = async (key: string): Promise<void> => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: "sentifiimages",
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (err) {
    console.log("Error deleting file from S3", err);
    throw err;
  }
};
