// 글 선택하여 노래 제작하는 페이지

import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axiosInstance from "../../axiosInterceptor";
import * as S from "./Styles/ChoosePost.style";

export interface Post {
  postId: number;
  postUrl: string;
  thumbnailUrl: string;
  createdTime: string;
  modifiedTime: string;
}

export interface PostContent {
  title: string;
  content: string;
}

const ChoosePost = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [postContents, setPostContents] = useState<{
    [key: number]: PostContent;
  }>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const paginationSize = 5;
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [hashTags, setHashTags] = useState<{ [key: number]: string }>({});

  const { uid } = useAuth();
  const navigate = useNavigate();

  const totalPages = Math.ceil(allPosts.length / pageSize);
  const currentPaginationStart =
    Math.floor(page / paginationSize) * paginationSize;

  const handlePostClick = (postId: number) => {
    navigate(`/user/${uid}/post/${postId}`);
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const allFetchedPosts: Post[] = [];
        let currentPage = 0;
        let lastPage = false;

        while (!lastPage) {
          const response = await axiosInstance.get(`/api/v1/post/${uid}`, {
            params: {
              page: currentPage,
              size: pageSize,
            },
          });

          if (response.status === 200) {
            const data = response.data;

            if (Array.isArray(data.content)) {
              allFetchedPosts.push(...data.content);
              lastPage = data.last;
            } else {
              console.error("예상치 못한 데이터 구조:", data);
              break;
            }

            currentPage += 1;
          } else {
            console.log("게시물을 불러올 수 없습니다.");
            break;
          }
        }

        const sortedPosts = allFetchedPosts.sort(
          (a: Post, b: Post) =>
            new Date(b.createdTime).getTime() -
            new Date(a.createdTime).getTime()
        );

        setAllPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        console.log("게시물을 불러오는 중 오류 발생:", err);
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, [uid]);

  const fetchPostContent = async (postUrl: string, postId: number) => {
    try {
      const response = await axiosInstance.get(postUrl);
      if (response.status === 200) {
        const { title, content }: PostContent = response.data;
        setPostContents((prevContents) => ({
          ...prevContents,
          [postId]: { title, content },
        }));
      } else {
        console.log("게시물 내용을 불러올 수 없습니다.");
      }
    } catch (error) {
      // console.error("게시물 내용을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    allPosts.forEach((post) => {
      if (!postContents[post.postId]) {
        fetchPostContent(post.postUrl, post.postId);
      }
    });
  }, [allPosts]);

  const handlePrevPageGroup = () => {
    if (currentPaginationStart > 0) {
      setPage(currentPaginationStart - paginationSize);
    }
  };

  const handleNextPageGroup = () => {
    if (currentPaginationStart + paginationSize < totalPages) {
      setPage(currentPaginationStart + paginationSize);
    }
  };

  const handlePageClick = (pageIndex: number) => {
    setPage(pageIndex);
  };

  // 하나의 체크박스만 선택 가능하도록 설정
  const handleCheckboxChange = (postId: number) => {
    setSelectedPostId(postId); // 단일 선택
  };

  const sendToFastAPI = async (
    uid: string,
    postUrl: string,
    accessToken: string
  ): Promise<{
    musicUrl: string;
    emotion1: string;
    emotion2: string;
    title: string;
  } | null> => {
    try {
      const response = await axiosInstance.post(
        `/create/music`, // baseURL을 무시하고 수동으로 FastAPI의 URL을 사용
        {
          user_id: uid,
          post_url: postUrl,
          token: accessToken,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          baseURL: process.env.REACT_APP_FASTAPI_BASE_URL, // 여기서 baseURL을 덮어씌움
        }
      );

      if (response.status === 200) {
        const { url: musicUrl, emotion1, emotion2, title } = response.data;
        console.log("FastAPI 응답:", response.data);
        return { musicUrl, emotion1, emotion2, title }; // 필요한 데이터를 반환
      } else {
        console.error("FastAPI 응답 실패:", response.status, response.data);
        return null;
      }
    } catch (error) {
      console.error("FastAPI로 데이터 전송 실패:", error);

      return null;
    }
  };

  const handleCreateMusic = async () => {
    if (!selectedPostId) {
      alert("노래 제작을 위해 게시물을 선택해주세요.");
      return;
    }

    const post = allPosts.find((p) => p.postId === selectedPostId);

    if (post) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          alert("로그인이 필요합니다.");
          return;
        }

        const fastAPIResponse = await sendToFastAPI(
          uid,
          post.postUrl,
          accessToken
        );

        if (fastAPIResponse) {
          const { musicUrl, emotion1, emotion2, title } = fastAPIResponse;

          let hashTag = hashTags[post.postId] || "";
          hashTag = hashTag.replace(/#/g, "");

          // FastAPI에서 받아온 데이터를 스프링 백엔드로 전송
          const springResponse = await axiosInstance.post(
            `/api/v1/music/post/${post.postId}`,
            {
              musicUrl: musicUrl,
              title: title,
              hashTag: hashTag.trim().replace(/\s+/g, " "),
              emotion1: emotion1,
              emotion2: emotion2,
            }
          );

          if (springResponse.status === 204) {
            alert("노래 제작이 성공적으로 완료되었습니다!");

            // 해시태그 초기화
            setHashTags((prevHashTags) => ({
              ...prevHashTags,
              [selectedPostId as number]: "",
            }));

            navigate("/song-result", {
              state: {
                title,
                emotion1: emotion1,
                emotion2: emotion2,
                musicUrl,
              },
            });
          } else {
            console.error("노래 제작 실패:", springResponse);
            alert("노래 제작에 실패했습니다.");
          }
        } else {
          console.error("FastAPI로부터 데이터를 받아오지 못했습니다.");
          alert("노래 제작 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("노래 제작 중 오류 발생:", error);
        alert("노래 제작 중 오류가 발생했습니다.");
      }
    }
  };

  // 해시태그 입력 핸들러
  const handleHashTagChange = (postId: number, value: string) => {
    const processedValue = value
      .split(" ") // 공백을 기준으로 해시태그 분리
      .map((tag) => (tag.startsWith("#") || tag === "" ? tag : `#${tag}`)) // 각 태그에 #을 붙이지만 공백이면 #을 추가하지 않음
      .join(" "); // 다시 공백으로 연결

    setHashTags((prevHashTags) => ({
      ...prevHashTags,
      [postId]: processedValue,
    }));
  };

  // const handleHashTagChange = (postId: number, value: string) => {
  //   const processedValue = value
  //     .split(" ") // 공백을 기준으로 해시태그 분리
  //     .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`)) // 각 태그에 #을 붙임
  //     .join(" "); // 다시 공백으로 연결

  //   setHashTags((prevHashTags) => ({
  //     ...prevHashTags,
  //     [postId]: processedValue,
  //   }));
  // };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  const displayedPosts = allPosts.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <S.Content>
      <S.PostListWrapper>
        {displayedPosts.length === 0 ? (
          <p>게시물이 없습니다.</p>
        ) : (
          displayedPosts.map((post) => {
            const postContent = postContents[post.postId];
            const isChecked = selectedPostId === post.postId;
            return (
              <S.Post key={post.postId}>
                <S.PostContentWrapper isChecked={isChecked}>
                  <S.PostInfo>
                    <S.PostHeader>
                      <S.PostTitle onClick={() => handlePostClick(post.postId)}>
                        {postContent?.title || "제목 불러오는 중..."}
                      </S.PostTitle>
                      <S.PostDate>
                        {new Date(post.createdTime).toLocaleDateString()}
                      </S.PostDate>
                    </S.PostHeader>
                  </S.PostInfo>
                  <S.CheckBoxWrapper>
                    <S.CheckBox
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(post.postId)}
                    />
                  </S.CheckBoxWrapper>
                </S.PostContentWrapper>

                {isChecked && (
                  <S.HashTagInput
                    value={`#${hashTags[post.postId]?.replace(/^#/, "") || ""}`}
                    onChange={(e) =>
                      handleHashTagChange(
                        post.postId,
                        e.target.value.replace(/^#/, "")
                      )
                    }
                  />
                )}
              </S.Post>
            );
          })
        )}
        <S.PaginationWrapper>
          <S.PageButton
            onClick={handlePrevPageGroup}
            disabled={currentPaginationStart === 0}
          >
            &lt;
          </S.PageButton>
          {Array.from(
            {
              length: Math.min(
                paginationSize,
                totalPages - currentPaginationStart
              ),
            },
            (_, idx) => {
              const pageIndex = currentPaginationStart + idx;
              return (
                <S.PageButton
                  key={pageIndex}
                  onClick={() => handlePageClick(pageIndex)}
                  active={pageIndex === page}
                >
                  {pageIndex + 1}
                </S.PageButton>
              );
            }
          )}
          <S.PageButton
            onClick={handleNextPageGroup}
            disabled={currentPaginationStart + paginationSize >= totalPages}
          >
            &gt;
          </S.PageButton>
        </S.PaginationWrapper>
      </S.PostListWrapper>

      <S.PlaySection>
        <S.PlayButton>
          <FaPlay />
        </S.PlayButton>
        <S.CreateButton onClick={handleCreateMusic}>노래 제작</S.CreateButton>
      </S.PlaySection>
    </S.Content>
  );
};

export default ChoosePost;
