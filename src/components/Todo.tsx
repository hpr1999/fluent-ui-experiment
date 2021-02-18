import {
  ActionButton,
  Checkbox,
  getTheme,
  Icon,
  IconButton,
  List,
  Separator,
  StackItem,
  Text,
  TextField,
  TooltipHost,
} from "@fluentui/react";
import { NeutralColors } from "@fluentui/theme";
import React, { useState, ReactElement } from "react";
import Container from "./Container";

const theme = getTheme();

interface TodoItem {
  name: string;
  completed?: boolean;
}

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
  function setTodoCompleted(index: number, completed?: boolean): void {
    const newTodos = [...todos];
    const newTodo = { ...todos[index] };
    newTodo.completed = completed;
    newTodos[index] = newTodo;
    setTodos(newTodos);
  }

  function removeTodo(toRemove: TodoItem): void {
    setTodos(todos.filter((todo) => todo !== toRemove));
  }

  function renderTodo(todo?: TodoItem, index?: number): ReactElement {
    if (!todo || !index) return <></>;

    return (
      <Container
        horizontal
        depth={2}
        styles={
          todo.completed
            ? { root: { backgroundColor: theme.palette.themeLighterAlt } }
            : {}
        }
      >
        <StackItem align="center" verticalFill>
          <TooltipHost content="Delete To-Do">
            <IconButton
              onClick={() => removeTodo(todo)}
              iconProps={{ iconName: "RemoveFromShoppingList" }}
            ></IconButton>
          </TooltipHost>
        </StackItem>
        <StackItem align="center">
          <Checkbox
            checked={!!todo.completed}
            onChange={(_, checked) => setTodoCompleted(index, checked)}
          ></Checkbox>
        </StackItem>
        <StackItem grow={1} align="center" verticalFill>
          <Text block styles={{ root: { textAlign: "center" } }}>
            {todo?.name}
          </Text>
        </StackItem>
      </Container>
    );
  }

  return (
    <Container styles={{ root: { minHeight: "85vh" } }} depth={2}>
      <h1 style={{ textAlign: "center" }}>
        <Text variant="xLarge">To-Do-App</Text>
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <Container horizontal>
          <StackItem grow={3} verticalFill>
            <TextField
              label="Title"
              placeholder="Give your To-Do a name."
              value={newTodo.name}
              onChange={(_, newValue) => {
                setNewTodo({ name: newValue ? newValue : "" });
                setCanAddTodo(!!newValue);
              }}
            ></TextField>
          </StackItem>
          <StackItem grow={2} verticalFill align="end">
            <ActionButton
              type="submit"
              disabled={!canAddTodo}
              iconProps={{ iconName: "AddToShoppingList" }}
              style={{ gridColumn: 2, gridRow: "1", alignSelf: "end" }}
            >
              Add To-Do
            </ActionButton>
          </StackItem>
        </Container>
      </form>
      <Separator styles={separatorStyle}>
        <Icon
          styles={{ root: { backgroundColor: NeutralColors.gray20 } }}
          iconName="DoubleChevronDown12"
        ></Icon>
      </Separator>
      <div data-is-scrollable style={{ overflow: "auto", maxHeight: "70vh" }}>
        <List
          getPageHeight={(_index, rect) => (rect ? rect.height : 400) * 0.6}
          items={todos}
          onRenderCell={renderTodo}
        ></List>
      </div>
    </Container>
  );
}
