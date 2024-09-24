// TaskList/TaskList.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';

import { RootState } from './../../store/store'; // Путь к файлу с типами состояния

import { connect } from 'react-redux';

import {
  getTask,
  deleteTask,
  updateTaskList,
  addTask,
  updateTask,
} from '../../store/storeTaskList';

import styles from './TaskList.module.css';
import NoteRaw from '../../components/NoteRaw/NoteRaw';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';

// Типы для задачи и подзадачи
interface SubTask {
  task: string;
}

interface Task {
  task: string;
  subTasks: SubTask[];
}

interface Props {
  getTask: () => void;
  deleteTask: (index: number) => void;
  updateTaskList: (task: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskData: any) => void;
  // updateTask: (taskData: { index: number;  taskData: Task }) => void;
  taskList: Task[];
}

// interface Props {
//   getTask: () => void;
//   deleteTask: (index: number) => void;
//   updateTaskList: (task: Task[]) => void;
//   addTask: (task: Task) => void;
//   updateTask: (task: Task) => void;
//   taskList: Task[];
// }

const TaskList: React.FC<Props> = (props) => {
  const {
    getTask,
    deleteTask,
    updateTaskList,
    addTask,
    updateTask,
    taskList: propsTaskList,
  } = props;

  const [task, setTask] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>([]); // Состояние для списка задач
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editSubIndex, setEditSubIndex] = useState<
    [number | null, number | null]
  >([null, null]);
  // Индекс редактируемой задачи
  const [editTask, setEditTask] = useState<string>(''); // Текст редактируемой задачи

  useEffect(() => {
    getTask();
  }, [getTask]);

  useEffect(() => {
    setTaskList(propsTaskList);
  }, [propsTaskList]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim()) {
      const taskData: Task = {
        task,
        subTasks: [],
      };
      addTask(taskData);
      setTask('');
    }
  };

  const handleDeleteTask = (index: number) => {
    deleteTask(index);
  };

  const handleDeleteSubTask = (index: number, subIndex: number) => {
    const newTaskList = [...taskList];
    const updatedSubTasks = [...newTaskList[index].subTasks];
    updatedSubTasks.splice(subIndex, 1);
    newTaskList[index] = { ...newTaskList[index], subTasks: updatedSubTasks };
    updateTaskList(newTaskList);
  };

  const handleEditTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTask(e.target.value);
  };

  // const handleSaveEditTask = (index: number) => {
  //   const newTaskList = [...taskList];
  //   newTaskList[index].task = editTask;
  //   updateTaskList(newTaskList);
  //   setEditIndex(null);
  //   setEditTask('');
  // };

  const handleSaveEditTask = (index: number) => {
    console.log('Index:', index); // Логирование индекса
    console.log('Edit Task:', editTask); // Логирование задачи
  
    const updatedTask = { ...taskList[index], task: editTask };
  
    console.log('Updated Task:', updatedTask); // Логирование обновленной задачи
  
    updateTask({ index, taskData: updatedTask });
  
    setEditIndex(null);
    setEditTask('');
  };
  
  const handleEditTask = (index: number) => {
    setEditIndex(index)

  }
  const handleSaveEditSubTask = (index: number, subIndex: number) => {
    const newTaskList = [...taskList];
    const updatedSubTasks = [...newTaskList[index].subTasks];
    const updatedSubTask = { ...updatedSubTasks[subIndex], task: editTask };
    updatedSubTasks[subIndex] = updatedSubTask;
    newTaskList[index] = { ...newTaskList[index], subTasks: updatedSubTasks };

    updateTaskList(newTaskList);

    setEditSubIndex([null, null]);
    setEditTask('');
  };

  const handleEditSubTask = (index: number, subIndex: number) => {
    setEditSubIndex([index, subIndex]);
    setEditTask(taskList[index].subTasks[subIndex].task);
  };

  const cleanTaskList = () => {
    const newTaskList = taskList.filter((_, i) => i === editIndex);
    updateTaskList(newTaskList);
  };

  const addSubTask = (index: number) => {
    const newTaskList = [...taskList]; // Глубокая копия подзадач, чтобы избежать мутаций
    const updatedSubTasks = [...newTaskList[index].subTasks];

    const newSubTask: SubTask = {
      task: 'Subtask ' + (updatedSubTasks.length + 1), // Используем копию подзадач
    };

    updatedSubTasks.push(newSubTask);
    newTaskList[index] = {
      ...newTaskList[index], // Сохраняем остальные поля задачи
      subTasks: updatedSubTasks, // Обновляем подзадачи
    };

    updateTaskList(newTaskList);
  };

  // const addSubTask = (index: number) => {
  //   const newTaskList = [...taskList];
  //   const newSubTask: SubTask = {
  //     task: 'Subtask ' + (taskList[index].subTasks.length + 1),
  //   };
  //   newTaskList[index].subTasks.push(newSubTask);
  //   updateTaskList(newTaskList);
  // };

  const changePosition = (index: number, newIndex: number) => {
    const newTaskList = [...taskList];
    [newTaskList[index], newTaskList[newIndex]] = [
      newTaskList[newIndex],
      newTaskList[index],
    ];
    updateTaskList(newTaskList);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Vladushka's tasks</h1>
        <input
          placeholder="Enter task"
          type="text"
          value={task}
          onChange={handleInputChange}
          className={styles.input_area}
        />
        <button
          type="button"
          className={styles.btn}
          onClick={handleAddTask}
        ></button>
        <div className={styles.list}>
          {taskList.map((taskData, index) => (
            <div key={index}>
              <NoteRaw
                taskData={taskData}
                taskList={taskList}
                editIndex={editIndex}
                editTask={editTask}
                index={index}
                setEditIndex={setEditIndex}
                changePosition={changePosition}
                handleSaveEditTask={handleSaveEditTask}
                editSubIndex={editSubIndex}
                handleEditTask={handleEditTask}
                handleEditTaskChange={handleEditTaskChange}
                handleDeleteTask={handleDeleteTask}
                addSubTask={addSubTask}
                handleSaveEditSubTask={handleSaveEditSubTask}
                handleEditSubTask={handleEditSubTask}
                handleDeleteSubTask={handleDeleteSubTask}
                updateTaskList={updateTaskList}
                updateTask={updateTask}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={cleanTaskList}
          className={styles.delete_all}
        >
          Delete ALL
        </button>
      </div>
      <GoBackBtn />
    </div>
  );
};

const mapDispatchToProps = {
  getTask,
  deleteTask,
  updateTaskList,
  addTask,
  updateTask,
};

const mapStateToProps = (state: RootState) => ({
  taskList: state.storeTaskList.taskList,
});
// eslint-disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
