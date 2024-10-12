import AWS from "aws-sdk";

export const uploadToS3 = async (file: File, uid: string): Promise<string> => {
  const s3 = new AWS.S3();
  const fileFormat = file.name.split(".").pop();
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: "sentifl-public",
      Key: `${uid}/images/${Date.now()}.${fileFormat}`,
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
    throw new Error("파일 업로드에 실패했습니다.");
  }
};

export const uploadfinalToS3 = async (
  file: File,
  uid: string
): Promise<string> => {
  const s3 = new AWS.S3();
  const fileFormat = file.name.split(".").pop();
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: "sentifl-public",
      Key: `${uid}/post/${Date.now()}.${fileFormat}`,
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
    throw new Error("파일 업로드에 실패했습니다.");
  }
};

export const uploadTempToS3 = async (
  jsonContent: any,
  uid: string
): Promise<string> => {
  const s3 = new AWS.S3();
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: "sentifl-public",
      Key: `${uid}/temp/tempSaved.json`, // 임시 저장 파일 경로
      Body: JSON.stringify(jsonContent, null, 2),
      ContentType: "application/json",
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

export const downloadFromS3 = async (key: string): Promise<Blob | null> => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: "sentifl-public",
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    if (data.Body instanceof Uint8Array) {
      return new Blob([data.Body.buffer], { type: "application/json" });
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

export const updateToS3 = async (
  file: File,
  postUrl: string
): Promise<string> => {
  const s3 = new AWS.S3();

  try {
    // URL 객체를 사용해 파일 경로 추출
    const url = new URL(postUrl);
    const fileKey = url.pathname.substring(1);
    if (!fileKey) {
      throw new Error("S3 파일 경로를 추출할 수 없습니다.");
    }

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "sentifl-public", // 버킷 이름
        Key: fileKey, // 추출된 파일 경로에 덮어쓰기
        Body: file,
        ContentType: file.type,
        // ACL: "public-read",
      },
    });

    const data = await upload.promise();
    console.log("S3 파일 덮어쓰기 성공: ", data.Location);
    return data.Location; // 덮어쓰기된 파일의 S3 URL 반환
  } catch (err) {
    console.error("Error updating file on S3:", err);
    throw new Error("파일 업데이트에 실패했습니다.");
  }
};

export const deleteFromS3 = async (key: string): Promise<void> => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: "sentifl-public",
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (err) {
    console.log("Error deleting file from S3", err);
    throw err;
  }
};
