import { useState, useEffect } from "react";
import { Input, Button, List, Typography, Checkbox } from "antd";

const { Text } = Typography;

function Todo() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem("todo")) || [];
    setTodos(storedTodo);
  }, []);

  useEffect(() => {
    if (!!todos) {
      localStorage.setItem("todo", JSON.stringify(todos));
    }
  }, [todos]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const submit = (e) => {
    if (value) {
      setTodos((prevTodo) => [
        ...prevTodo,
        { text: value, isDone: false, isEditing: false },
      ]);
      setValue("");
    }
  };

  const onDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const onEdit = (i) => {
    setTodos((prev) => [
      ...prev.map((item, index) => ({
        ...item,
        isEditing: index === i,
      })),
    ]);
  };

  const onEditEnd = (e) => {
    setTodos((prev) => [
      ...prev.map((item) => ({
        ...item,
        isEditing: false,
      })),
    ]);
  };

  const toggleState = (e, i) => {
    setTodos((prev) => [
      ...prev.map((item, index) => ({
        ...item,
        isDone: index === i ? e.target.checked : item.isDone,
      })),
    ]);
  };

  const onItemChange = (text, i) => {
    setTodos((prev) => [
      ...prev.map((item, index) => ({
        ...item,
        text: index === i ? text : item.text,
      })),
    ]);
  };

  return (
    <>
      <Text>What to do?</Text>
      <Input.Group compact>
        <Input
          value={value}
          onChange={onChange}
          onPressEnter={submit}
          placeholder="Type a to-do item and hit enter to add it to the list"
          style={{ width: "calc(100% - 60px)" }}
        />
        <Button onClick={submit} type="primary">
          Add
        </Button>
      </Input.Group>
      <List
        dataSource={todos || []}
        locale={{ emptyText: "No to-do items yet!" }}
        renderItem={(item, i) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => onEdit(i)}>
                Edit
              </Button>,
              <Button danger type="link" onClick={() => onDelete(i)}>
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <Checkbox
                  onChange={(e) => toggleState(e, i)}
                  checked={item.isDone}
                >
                  <Text
                    delete={item.isDone}
                    editable={{
                      onChange: (text) => onItemChange(text, i),
                      editing: item.isEditing,
                      onEnd: onEditEnd,
                      onCancel: onEditEnd,
                      icon: <></>,
                    }}
                    onBlur={onEditEnd}
                  >
                    {item.text}
                  </Text>
                </Checkbox>
              }
            />
          </List.Item>
        )}
      ></List>
    </>
  );
}

export default Todo;
