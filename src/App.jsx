import * as React from "react";

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const useStorageState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState,
    );

    // Custom hook should track value & key, otherwise it might run with outdated(stale) key/value values.
    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
  };

  // const initialSearchTerm = localStorage.getItem("search") || "React";
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} searchTerm={searchTerm} />

      <hr />
      <List list={searchedStories} />
    </div>
  );
};

const Search = ({ searchTerm, onSearch }) => (
  <>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={searchTerm} onChange={onSearch} />

    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </>
);

const List = ({ list }) => (
  <ul>
    {list.map(({ objectID, ...item }) => {
      return <Item key={objectID} {...item} />;
    })}
  </ul>
);

const Item = ({ title, url, author, num_comments, points }) => (
  <li>
    {title}
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);

export default App;
