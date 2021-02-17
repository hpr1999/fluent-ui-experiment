import {
  ActionButton,
  getTheme,
  Icon,
  List,
  Separator,
  Text,
  TextField,
} from "@fluentui/react";
import { NeutralColors } from "@fluentui/theme";
import React, { CSSProperties, Fragment, useState, ReactElement } from "react";

const theme = getTheme();

interface TodoItem {
  name: string;
}

const addTodoLayout: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "80% 20%",
  gap: 10,
  margin: 30,
};
const listLayout: CSSProperties = {};

const bodyStyle: CSSProperties = {
  margin: "20px 10px 10px 10px",
  height: "85vh",
  padding: "10px 20px 40px 20px",
  backgroundColor: NeutralColors.gray10,
  boxShadow: theme.effects.elevation8,
  boxSizing: "border-box",
};

const separatorStyle = {
  content: { backgroundColor: NeutralColors.gray10 },
  root: {
    selectors: {
      "::before": { backgroundColor: NeutralColors.gray100 },
    },
  },
};

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<TodoItem>({ name: "" });
  const [canAddTodo, setCanAddTodo] = useState(false);

  function addTodo(): void {
    setTodos([...todos, newTodo]);
    setNewTodo({
      name: "",
    });
    setCanAddTodo(false);
  }

  function removeTodo(toRemove: TodoItem): void {
    setTodos(todos.filter((todo) => todo !== toRemove));
  }

  function renderTodo(todo?: TodoItem): ReactElement {
    if (!todo) return <Fragment></Fragment>;
    return (
      <Fragment>
        <div
          style={{
            minHeight: 40,
            padding: 5,
            paddingLeft: 30,
          }}
        >
          <div style={{ lineHeight: "40px" }}>
            <ActionButton
              onClick={() => removeTodo(todo)}
              iconProps={{ iconName: "RemoveFromShoppingList" }}
            ></ActionButton>
            {todo?.name}
          </div>
        </div>
        <Separator styles={separatorStyle} />
      </Fragment>
    );
  }

  return (
    <div style={bodyStyle}>
      <h1 style={{ textAlign: "center" }}>
        <Text variant="xLarge">Todo-App</Text>
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
        style={addTodoLayout}
      >
        <TextField
          label="Title"
          placeholder="Give your Todo a name."
          value={newTodo.name}
          onChange={(_, newValue) => {
            setNewTodo({ name: newValue ? newValue : "" });
            setCanAddTodo(!!newValue);
          }}
        ></TextField>
        <ActionButton
          type="submit"
          disabled={!canAddTodo}
          iconProps={{ iconName: "AddToShoppingList" }}
          style={{ gridColumn: 2, gridRow: "1", alignSelf: "end" }}
        >
          Add Todo
        </ActionButton>
      </form>
      <Separator styles={separatorStyle}>
        <Icon
          styles={{ root: { backgroundColor: NeutralColors.gray20 } }}
          iconName="DoubleChevronDown12"
        ></Icon>
      </Separator>
      <section style={listLayout}>
        <List items={todos} onRenderCell={renderTodo}></List>
      </section>
    </div>
  );
}
