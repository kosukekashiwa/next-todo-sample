"use client";
import { useFetch } from "@/hooks";
import { NextPage } from "next";
import { useCallback, useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const API_TODO = "http://localhost:3001/todos";

const Home: NextPage = () => {
  const [text, setText] = useState<string>("");

  const { data, refetch } = useFetch<Todo[]>(API_TODO);

  const todos = data?.filter((item) => !item.done);
  const dones = data?.filter((item) => item.done);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    []
  );

  const handleAddButtonClick = useCallback(() => {
    if (!text.trim()) {
      return;
    }
    fetch(API_TODO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, done: false }),
    })
      .then((response) => {
        if (response.ok) {
          setText("");
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refetch, text]);

  const handleDoneButtonClick = useCallback(
    (item: Todo) => {
      fetch(`${API_TODO}/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item, done: true }),
      })
        .then((response) => {
          if (response.ok) {
            refetch();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [refetch]
  );

  const handleBackButtonClick = useCallback(
    (item: Todo) => {
      fetch(`${API_TODO}/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item, done: false }),
      })
        .then((response) => {
          if (response.ok) {
            refetch();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [refetch]
  );

  const handleDeleteButtonClick = useCallback(
    (item: Todo) => {
      fetch(`${API_TODO}/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            refetch();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [refetch]
  );

  return (
    <main className="flex flex-col items-center p-8 gap-8">
      <h1 className="font-bold">My Todo App</h1>
      <div className="flex gap-4">
        <input className="border" value={text} onChange={handleTextChange} />
        <button className="bg-gray-300" onClick={handleAddButtonClick}>
          Add
        </button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-bold">Todo</h2>
        {todos &&
          todos.map((item, idx) => {
            return (
              <div key={`todo-${idx}`} className="flex gap-2">
                <p>{item.text}</p>
                <button
                  className="bg-gray-300"
                  onClick={() => handleDoneButtonClick(item)}
                >
                  Done
                </button>
                <button
                  className="bg-gray-300"
                  onClick={() => handleDeleteButtonClick(item)}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-bold">Done</h2>
        {dones &&
          dones.map((item, idx) => {
            return (
              <div key={`done-${idx}`} className="flex gap-2">
                <p>{item.text}</p>
                <button
                  className="bg-gray-300"
                  onClick={() => handleBackButtonClick(item)}
                >
                  Back
                </button>
                <button
                  className="bg-gray-300"
                  onClick={() => handleDeleteButtonClick(item)}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default Home;
