import AWS from "aws-sdk";
import Quill from "quill";
import ImageResize from "quill-image-resize";
import "quill/dist/quill.bubble.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import axiosInstance from "../axiosInterceptor";
import { uploadTempToS3, uploadToS3, uploadfinalToS3 } from "../services/s3Service";
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

  // 오디오 URL 관련
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

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

    const jsonContent = {
      title: title,
      content: editorDelta, // Delta 형식의 콘텐츠 포함
    };

    try {
      const s3Url = await uploadTempToS3(jsonContent, uid);

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
  
    const accessToken = localStorage.getItem("accessToken");
  
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }
  
    // Quill 에디터의 내용을 HTML로 변환
    const editorHtml = quillRef.current.root.innerHTML;
  
    // 제목을 파일 이름으로 사용
    const fileTitle = title
      ? title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      : "untitled";
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const jsonFileName = `${fileTitle}_${timestamp}.json`;
  
    // JSON 파일에 title 값과 HTML 형식의 콘텐츠 저장
    const jsonContent = {
      title: title,
      content: editorHtml,
    };
  
    try {
      // 이미지 업로드를 제거하고, JSON 파일만 업로드
      const jsonBlob = new Blob([JSON.stringify(jsonContent, null, 2)], {
        type: "application/json",
      });
      const s3Url = await uploadfinalToS3(
        new File([jsonBlob], jsonFileName),
        uid
      );
      console.log("JSON 파일 업로드 성공:", s3Url);
  
      const postData = {
        title: title,
        content: editorHtml,
      };
  
      const response = await axiosInstance.post("/post", postData, {});
      console.log("응답 데이터:", response.data); // 응답 데이터
  
      if (response.status === 200) {
        alert("게시물이 성공적으로 저장되었습니다.");
        setAudioUrl(response.data.musicUrl); // musicUrl을 상태로 저장
        navigate("/myblog");
      }
    } catch (error) {
      console.error("JSON 파일을 S3에 업로드하는 중 에러 발생:", error);
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

  // audioUrl 자동 재생
  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }, [audioUrl]);

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
