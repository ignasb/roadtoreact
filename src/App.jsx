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

  const [searchTerm, setSearchTerm] = React.useState("");
  const [storiesList, setStories] = React.useState(stories);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    if (searchTerm) {
      const filteredStories = storiesList.filter((story) =>
        story.title
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()),
      );

      setStories(filteredStories);
    } else {
      setStories(stories);
    }
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} searchTerm={searchTerm} />

      <hr />
      <List list={storiesList} />
    </div>
  );
};

const Search = (props) => {
  const handleBlur = (event) => {
    console.log(event);
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        onChange={props.onSearch}
        onBlur={handleBlur}
      />

      <p>
        Searching for <strong>{props.searchTerm}</strong>
      </p>
    </div>
  );
};

const List = (props) => (
  <ul>
    {props.list.map((item, index) => {
      return <Item key={index} item={item} />;
    })}
  </ul>
);

const Item = (props) => (
  <li key={props.index}>
    {props.item.title}
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
);

export default App;
