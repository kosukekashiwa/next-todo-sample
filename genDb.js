const db = {
  todos: [],
  users: [],
  articles: [],
};

for (let i = 0; i < 5; i++) {
  db.todos.push({
    id: i,
    text: `todo-${i}`,
    done: i % 2 === 0,
  });
}

for (let i = 0; i < 5; i++) {
  db.users.push({
    id: `${i}`,
    name: `userName-${i}`,
  });
}

for (let i = 0; i < 5; i++) {
  db.articles.push({
    id: i,
    title: `articleTitle-${i}`,
    author: {
      id: `${i}`,
      name: `userNameHoge-${i}`,
    },
  });
}

console.log(JSON.stringify(db));
