import React from "react";
import './index.css';
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useState, useEffect} from "react";
import { v4 } from "uuid";
import "react-vertical-timeline-component/style.min.css";
import {VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import CheckIcon from "@atlaskit/icon/glyph/check";
import TodoList from "./components/Todolist";
const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(
    (e) => {
      // them text input vao danh sach todoList
      setTodoList([
        { id: v4(), name: textInput, isCompleted: false, },
        ...todoList,
      ]);

      setTextInput("");
    },
    [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);
  // hoàn thành mún xóa hoàn toàn.
  const onDelBtnClick = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield
        name='add-todo'
        placeholder='Thêm việc cần làm...'
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance='primary'
            onClick={onAddBtnClick}
          >
            Thêm
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
      <div style={{ backgroundColor: "rgb(72,61,139)" }}>
      <h3 style={{color: "white"}}> TodoApp Timeline</h3>
      <VerticalTimeline>
                {todoList.map((todo) => {
                    return (
                        <VerticalTimelineElement
                            key={todo.id}
                            className="vertical-timeline-element--work"
                            iconStyle={{ background: "rgb(33, 150, 243)", color: "white" }}
                            contentStyle={{ color: "rgb(0,0,0)", background: "#fff" }}
                            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
                            //icon={item.isCompleted ? <SchoolIcon /> : <WorkIcon />}
                        >
                            <h3 className="vertical-timeline-element-title">
                                {todo.name}
                            </h3>
                            {!todo.isCompleted && (
                                <Button
                                iconBefore={<CheckIcon primaryColor='#4fff4f' />}
                                style={{ padding: 9, backgroundColor: 'darksalmon', color: 'black',}} onClick={() => onCheckBtnClick(todo.id)}>
                                    Complete
                                </Button>
                            )}
                            {
                              <Button style={{ padding: 9, margin: 3, backgroundColor: 'lightblue', color: 'white' }} onClick={() => onDelBtnClick(todo.id)}>
                                Delete
                              </Button>
                            }
                        </VerticalTimelineElement>
                    )
                })}
            </VerticalTimeline>
      </div>
    </>
  );
}

export default App;