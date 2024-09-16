import React, { useState, ChangeEvent } from 'react';

import styles from '../../pages/TaskList/TaskList.module.css';

// Определяем типы для задач
interface SubTask {
  task: string;
}

interface Task {
  task: string;
  subTasks: SubTask[];
}

interface NoteRawProps {
  editIndex: number | null;
  taskData: Task;
  editTask: string;
  index: number;
  taskList: Task[];
  changePosition: (index: number, newIndex: number) => void;
  editSubIndex: [number | null, number | null];
  handleDeleteTask: (index: number) => void;
  handleEditTaskChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addSubTask: (index: number) => void;
  handleSaveEditSubTask: (index: number, subIndex: number) => void;
  handleEditSubTask: (index: number, subIndex: number ) => void;
  handleDeleteSubTask: (index: number, subIndex: number) => void;
  updateTaskList: (taskList: Task[]) => void;
  updateTask: (taskData: Task, index: number) => void;
  handleSaveEditTask: (index: number) => void; 
}

const NoteRaw: React.FC<NoteRawProps> = (props) => {
  const {
    editIndex,
    taskData,
    editTask,
    index,
    taskList,
    changePosition,
    editSubIndex,
    handleDeleteTask,
    handleEditTaskChange,
    addSubTask,
    handleSaveEditSubTask,
    handleEditSubTask,
    handleDeleteSubTask,
    updateTaskList,
    updateTask
  } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [task, setTask] = useState(taskData.task);

  const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const savedTasksHandler = () => {
    const updatedTask = { ...taskData, task };
    updateTask(updatedTask, index);
    setIsEdit(false);
  };

  const renderMoveTop = (index: number) => {
    if (index > 0) {
      return (
        <button
          className={styles.btn_arrow_top}
          onClick={() => changePosition(index, index - 1)}
        >
          ↑
        </button>
      );
    }

    return null;
  };

  const renderMoveBottom = (index: number) => {
    if (index < taskList.length - 1) {
      return (
        <button
          className={styles.btn_arrow_bottom}
          onClick={() => changePosition(index, index + 1)}
        >
          ↓
        </button>
      );
    }

    return null;
  };

  const renderEdit = (taskData: Task, index: number) => {
    if (isEdit) {
      return (
        <>
          <input
            type="text"
            value={task}
            onChange={changeTaskHandler}
            className={styles.input_area_small}
          />
          <button className={styles.btn_save} onClick={savedTasksHandler}>
            Save
          </button>
        </>
      );
    }

    return (
      <>
        {renderMoveTop(index)}
        {renderMoveBottom(index)}
        {taskData.task}
        <button onClick={() => setIsEdit(true)} className={styles.btn_edit}>
          Edit
        </button>
        <button
          onClick={() => handleDeleteTask(index)}
          className={styles.btn_delete}
        >
          Del
        </button>
        <button
          onClick={() => addSubTask(index)}
          className={styles.btn_subTitle}
        >
          +Sub
        </button>
      </>
    );
  };

  const renderSubEdit = (subTaskData: SubTask, subIndex: number, index: number) => {
    if (editSubIndex[0] === index && editSubIndex[1] === subIndex) {
      return (
        <>
          <input
            type="text"
            value={editTask}
            onChange={handleEditTaskChange}
            className={styles.input_area_small}
          />
          <button
            className={styles.btn_save}
            onClick={() => handleSaveEditSubTask(index, subIndex)}
          >
            Save
          </button>
        </>
      );
    }

    return (
      <>
        {renderMoveTopSub(index, subIndex)}
        {renderMoveBottomSub(index, subIndex)}
        {subTaskData.task}
        <button
          onClick={() => handleEditSubTask(index, subIndex)}
          className={styles.btn_edit}
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteSubTask(index, subIndex)}
          className={styles.btn_delete}
        >
          Del
        </button>
      </>
    );
  };

  const renderSubTask = (subTasks: SubTask[], index: number) => {
    if (!subTasks.length) return null;

    return subTasks.map((subTaskData, subIndex) => (
      <div className={styles.subtask} key={subIndex}>
        {renderSubEdit(subTaskData, subIndex, index)}
      </div>
    ));
  };

  const renderMoveTopSub = (index: number, subIndex: number) => {
    if (subIndex > 0) {
      return (
        <button
          className={styles.btn_arrow_sub_top}
          onClick={() => changePositionSub(index, subIndex, subIndex - 1)}
        >
          ↑
        </button>
      );
    }

    return null;
  };

  const renderMoveBottomSub = (index: number, subIndex: number) => {
    if (subIndex < taskList[index].subTasks.length - 1) {
      return (
        <button
          className={styles.btn_arrow_sub_bottom}
          onClick={() => changePositionSub(index, subIndex, subIndex + 1)}
        >
          ↓
        </button>
      );
    }

    return null;
  };

  const changePositionSub = (index: number, subIndex: number, newSubIndex: number) => {
    const newTaskList = [...taskList];
    [
      newTaskList[index].subTasks[subIndex],
      newTaskList[index].subTasks[newSubIndex],
    ] = [
      newTaskList[index].subTasks[newSubIndex],
      newTaskList[index].subTasks[subIndex],
    ];
    updateTaskList(newTaskList);
  };

  return (
    <div>
      {renderEdit(taskData, index)}
      {renderSubTask(taskData.subTasks, index)}
    </div>
  );
};

export default NoteRaw;
