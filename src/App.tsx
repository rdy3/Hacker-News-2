import { useEffect, useState } from "react";
import { CreateNews } from "./create-news";

export interface NewsResponse {
  hits: {
    title: string;
    url: string;
    author: string;
    points: number;
    story_text: null;
    comment_text: null;
    objectID: string;
    story_title: string;
    created_at: string;
    num_comments: number;
  }[];
}

export function App() {
  const [newResponse, setNewResponse] = useState<NewsResponse>();
  const [text, setText] = useState("");

  useEffect(() => {
    searchNews();
  }, []);

  async function searchNews() {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?query=${text}`
    );
    const news = await response.json();
    console.log(news);
    setNewResponse(news);
  }

  return (
    <div>
      <header className="flex justify-around mt-4">Hacker News</header>
      <div className="flex justify-center pt-10">Monday 5 September 2024</div>
      <div className="flex justify-center pt-10 space-x-5 ">
        <button>sort by date</button>
        <button>sort by relevance</button>
        <button>week</button>
        <button>month</button>
        <button>year</button>
        <button>all</button>
        <div className="flex justify-around ml-6 mt-5 space-x-5">
          <input
            onChange={(event) => setText(event.target.value)}
            value={text}
            className="grow rounded-sm border-2 border-slate-300 "
          ></input>
          <button
            onClick={() => searchNews()}
            className="rounded-full border-2 border-slate-300 pl-2 pr-2"
          >
            Search
          </button>
        </div>
      </div>
      <div className="className=" ml-6 mt-6>
        {newResponse?.hits.map((news) => {
          return <CreateNews news={news} key={news.objectID} />;
        })}
      </div>
    </div>
  );
}
