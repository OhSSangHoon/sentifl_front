import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get postId from URL
import Editor from "../../Editor/ModPost";
import axiosInstance from "../../axiosInterceptor";
import { downloadFromS3 } from "../../services/s3Service";
import * as S from "./Styles/Create.style"; // Adjust styles as needed

function ModifyPage() {
  const { postId } = useParams(); // Get the postId from the URL
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState<string>("");
  const [initialDelta, setInitialDelta] = useState<any>(null);
  const [images, setImages] = useState<
    Array<{ imageName: string; imageUrl: string }>
  >([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFileName, setAudioFileName] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // Fetch post data from backend using postId
        const response = await axiosInstance.get(`/post/${postId}`);
        const postData = response.data;

        // Extract relevant post data
        setTitle(postData.title); // Set post title

        // Parse content and convert it back to Delta for Quill Editor
        const editorDelta = postData.content;
        setInitialDelta(JSON.parse(editorDelta)); // Assuming content is stored in JSON format

        // Set the audio URL if available
        if (postData.audioUrl) {
          setAudioUrl(postData.audioUrl);
          setAudioFileName(postData.audioFileName); // Set file name if needed
        }

        // If there are any images in the content, handle them
        const imagesInPost = extractImagesFromContent(postData.content);
        setImages(imagesInPost);
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  // Utility function to extract image URLs from post content
  const extractImagesFromContent = (content: string) => {
    const imageRegex = /<img[^>]+src="([^">]+)"/g;
    const images: Array<{ imageName: string; imageUrl: string }> = [];
    let match;

    while ((match = imageRegex.exec(content)) !== null) {
      images.push({ imageName: "", imageUrl: match[1] });
    }

    return images;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <S.Main>
      <Editor />
    </S.Main>
  );
}

export default ModifyPage;
