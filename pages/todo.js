import * as React from "react";

import { Collection, Document } from "firestorter";
import { observer } from "mobx-react";

const todos = new Collection("todos");
const user = new Document("users/8273872***");

const Todos = observer(function Todos() {
  return (
    <div>
      {todos.docs.map((doc) => (
        <TodoItem key={doc.id} doc={doc} />
      ))}
    </div>
  );
});

const TodoItem = observer(({ doc }) => {
  const { finished, text } = doc.data;
  return (
    <div>
      <input type="checkbox" checked={finished} />
      <input type="text" value={text} />
    </div>
  );
});
