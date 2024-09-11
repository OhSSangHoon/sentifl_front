import AWS from "aws-sdk";
import JSZip from "jszip";
import Quill from "quill";
import ImageResize from "quill-image-resize";
import "quill/dist/quill.bubble.css";
import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import axiosInstance from "../axiosInterceptor";
import { uploadTempZipToS3, uploadToS3 } from "../services/s3Service";
import * as S from "./Styles/Editor.style";

Quill.register("modules/imageResize", ImageResize);

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

interface MarkdownEditorProps {
  loadFromTempSave: boolean;
  initialDelta?: any;
  title: string;
  setTitle: (title: string) => void;
  images: Array<{ imageName: string; imageUrl: string }>;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  loadFromTempSave,
  initialDelta,
  title,
  setTitle,
  images,
}) => {
  const quillRef = useRef<Quill | null>(null);
  const navigate = useNavigate();
  const { uid } = useAuth();

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        try {
          const s3Url = await uploadToS3(file, uid);
          const editor = quillRef.current;
          if (editor) {
            const range = editor.getSelection(true);
            if (range) {
              editor.insertEmbed(range.index, "image", s3Url); // S3 URL 삽입
              // editor.format('image', { width: '100%' });
            }
          } else {
            console.error("Quill editor is not initialized");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: 2 }],
          [{ header: 3 }],
          ["bold", "italic", "underline", "strike"],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        displayStyles: {
          backgroundColor: "black",
          border: "none",
          color: "white",
        },
        modules: ["Resize", "DisplaySize"],
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    }),
    [imageHandler]
  );

  const handleTemporarySave = async () => {
    if (!quillRef.current) {
      console.log("Quill editor is not initialized.");
      return;
    }

    if (!title || (quillRef.current?.getLength() || 0) <= 1) {
      alert("제목과 내용을 모두 입력해주세요."); // 경고 메시지 출력
      return;
    }

    const editorContent = quillRef.current.getContents(); // Delta 형식으로 콘텐츠 가져오기
    console.log("Editor content (Delta):", editorContent); // 디버깅: Delta 형식의 콘텐츠 확인
    const editorDelta = JSON.stringify(editorContent); // Delta 형식을 JSON으로 변환
    const zip = new JSZip();
    let imageCounter = 1;

    const jsonContent = {
      title: title,
      content: editorDelta, // Delta 형식의 콘텐츠 포함
    };

    console.log("JSON Content to be saved:", jsonContent); // 디버깅: JSON 형식의 콘텐츠 확인

    // JSON 형식으로 저장
    zip.file("content.json", JSON.stringify(jsonContent, null, 2));

    // 콘텐츠를 이미지 처리
    const imagePromises = editorContent.ops.map(async (op: any) => {
      if (op.insert && op.insert.image) {
        const imageUrl = op.insert.image;
        if (typeof imageUrl !== "string") {
          console.error("Unexpected image URL type:", typeof imageUrl);
          return;
        }

        const imageExtension = imageUrl.split(".").pop();
        const imageName = `image${imageCounter++}.${imageExtension}`;
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        zip.file(imageName, blob);
      }
    });

    await Promise.all(imagePromises);

    const zipBlob = await zip.generateAsync({ type: "blob" });

    try {
      const s3Url = await uploadTempZipToS3(
        new File([zipBlob], `tempSaved.zip`),
        uid
      );
      console.log("File uploaded to S3:", s3Url);

      navigate("/");
    } catch (error) {
      console.error("Error uploading zip file to S3:", error);
    }
  };

  const handleSave = async () => {
    if (!quillRef.current) {
      console.log("Quill 에디터가 초기화되지 않았습니다.");
      return;
    }

    if (!title || (quillRef.current?.getLength() || 0) <= 1) {
      alert("제목과 내용을 모두 입력해주세요."); // 경고 메시지 출력
      return;
    }

    // 제목과 시간을 파일 이름으로 사용
    const fileTitle = title
      ? title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      : "untitled";
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const fileName = `${fileTitle}_${timestamp}.zip`;
    const accessToken = localStorage.getItem("accessToken");

    console.log("Access Token:", accessToken);

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    // Quill 에디터의 내용을 HTML로 변환
    const editorHtml = quillRef.current.root.innerHTML;

    const zip = new JSZip();
    let imageCounter = 1;

    // JSON 파일에 title 값과 HTML 형식의 콘텐츠 저장
    const jsonContent = {
      title: title,
      content: editorHtml,
    };

    zip.file("content.json", JSON.stringify(jsonContent, null, 2)); // JSON 형식으로 저장

    // Quill 에디터의 Delta 내용 가져오기
    const editorContent = quillRef.current.getContents();
    const imagePromises = editorContent.ops.map(async (op: any) => {
      if (op.insert && op.insert.image) {
        const imageUrl = op.insert.image;

        // imageUrl이 문자열인지 확인
        if (typeof imageUrl !== "string") {
          console.error(
            "예상치 못한 이미지 URL 타입:",
            typeof imageUrl,
            imageUrl
          );
          return;
        }

        const imageExtension = imageUrl.split(".").pop();
        const imageName = `image${imageCounter++}.${imageExtension}`;

        try {
          // 이미지 URL에서 파일 데이터를 가져와 압축 파일에 추가
          const response = await fetch(imageUrl);
          if (!response.ok) {
            throw new Error("네트워크 응답이 정상적이지 않습니다.");
          }
          const blob = await response.blob();
          zip.file(imageName, blob);
        } catch (error) {
          console.error("이미지 가져오는 중 에러 발생:", error);
        }
      }
    });

    await Promise.all(imagePromises);

    try {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const s3Url = await uploadToS3(new File([zipBlob], fileName), uid);
      console.log("업로드 성공\n", s3Url);

      // 콘솔에 제목과 내용을 출력
      console.log("저장할 제목:", title);
      console.log("저장할 내용:", editorHtml);

      const postData = {
        title: title,
        content: editorHtml,
      };

      const response = await axiosInstance.post("/post", postData, {});
      console.log("Response Data:", response.data); // 응답 데이터

      if (response.status === 200) {
        alert("게시물이 성공적으로 저장되었습니다.");
        navigate("/myblog");
      }
    } catch (error) {
      console.error("ZIP 파일을 S3에 업로드하는 중 에러 발생:", error);
      alert("게시물 저장에 실패했습니다.");
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (!quillRef.current && isMounted) {
      const quill = new Quill("#editor", {
        theme: "bubble",
        modules: modules,
      });

      quillRef.current = quill;

      if (initialDelta && quill) {
        quill.setContents(initialDelta); // Delta 형식을 Quill 에디터에 적용
      }
    }

    return () => {
      isMounted = false;
    };
  }, [modules, initialDelta]);

  return (
    <S.EditorWrapper>
      <S.SaveBtn>
        <button onClick={handleSave}>작성완료</button>
        <button onClick={handleTemporarySave}>임시저장</button>
      </S.SaveBtn>
      <S.Title
        type="text"
        placeholder="제목을 작성해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <S.EditorContainer>
        <S.Editor id="editor" />
      </S.EditorContainer>
    </S.EditorWrapper>
  );
};

export default MarkdownEditor;
