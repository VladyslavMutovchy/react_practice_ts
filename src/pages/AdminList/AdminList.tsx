import React, { useState, useEffect } from 'react';
import { RootState } from '../../store/store'; // Путь к файлу с типами состояния
import { connect } from 'react-redux';
import {
  saveValue,
  getData,
  cleanAll,
  deleteValue,
  editValue,
  saveSkillValue,
  deleteSkillValue,
  editSkillValue,
} from '../../store/storeAdminList';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import styles from './AdminList.module.css';

interface Props {
  dataList: any;
  getData: any;
  saveValue: any;
  cleanAll: any;
  deleteValue: any;
  editValue: any;
  saveSkillValue: any;
  deleteSkillValue: any;
  editSkillValue: any;
}

const AdminList: React.FC<Props> = (props) => {
  const {
    dataList,
    getData,
    saveValue,
    cleanAll,
    deleteValue,
    editValue,
    saveSkillValue,
    deleteSkillValue,
    editSkillValue,
  } = props;
  const [modalInputShown, setModalInputShown] = useState<any>(false);
  const [modalConfirmShown, setModalConfirmShown] = useState<any>(false);
  const [data, setData] = useState<any>('');
  const [currentDataList, setCurrentDataList] = useState<any>([]);
  const [age, setAge] = useState<any>('');
  const [skill, setSkill] = useState<any>('');
  const [currentId, setCurrentId] = useState<any>(null);
  const [skillId, setSkillId] = useState<any>(null);
  const [modalIsSaved, setModalIsSaved] = useState<any>(false);
  const [modalInputSkill, setModalInputSkill] = useState<any>(false);
  const [skillRedactionStatus, setSkillRedactionStatus] = useState<any>(false);
  const [currentIdForSkillSave, setCurrentIdForSkillSave] = useState<any>('');
  const [sortField, setSortField] = useState<any>();
  const [sortDirection, setSortDirection] = useState<any>();
  const [search, setSearch] = useState<any>('');
  const [searchOption, setSearchOption] = useState<any>('all');
  const [pageDataList, setPageDataList] = useState<any>([]);
  const [start, setStart] = useState<any>(0);
  const [limit, setLimit] = useState<any>(10);
  //console.log('===setLimit', setLimit);
  //console.log('===start', start);
  //console.log('===LENGTH', currentDataList.length);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if ((!sortDirection || !sortField) && !search) {
      setCurrentDataList([...dataList]);
      return;
    }

    const filtredDataList = filterData(dataList);

    const sortedDataList = filtredDataList.sort((firstData: any, secondData: any) => {
      const directionValue = sortDirection === 'desk' ? -1 : 1;

      const firstValue = getSortValue(firstData)?.toString().toLowerCase();
      const secondValue = getSortValue(secondData)?.toString().toLowerCase();

      if (firstValue > secondValue) {
        return directionValue;
      } else if (firstValue < secondValue) {
        return -directionValue;
      }
      return 0;
    });

    setCurrentDataList([...sortedDataList]);
  }, [dataList, sortField, sortDirection, search, searchOption]);

  useEffect(() => {
    const pageDataList = currentDataList.slice(start, start + limit);
    //console.log('===pageDataList', pageDataList);
    setPageDataList(pageDataList);
  }, [currentDataList, start, limit]);


  useEffect(() => {
    if (modalIsSaved) {
      const timer = setTimeout(() => {
        setModalIsSaved(false);
        setData('');
        setAge('');
        setSkill('');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [modalIsSaved]);

  const getSortValue = (dataItem: any) => {
    if (sortField === 'skills') {
      return dataItem.skills?.[0]?.skill || '';
    }
    return dataItem[sortField];
  };

  const filterData = (dataList: any) => {
    const filteredDataList = dataList.filter((item: any) => {
      const searchValue = search.toLowerCase();
      if (searchOption === 'all') {
        // eslint-disable-next-line
        // debugger;
        const nameMatch = item.name.toLowerCase().includes(searchValue);
        const ageMatch = item.age.toString().includes(searchValue);
        const idMatch = item.id.toString().includes(searchValue);
        const skillsMatch = item.skills.some((skill: any) =>
          skill.skill.toLowerCase().includes(searchValue),
        );
        return nameMatch || ageMatch || skillsMatch || idMatch;
      } else if (searchOption === 'id') {
        const idMatch = item.id.toString().includes(searchValue);
        return idMatch;
      } else if (searchOption === 'name') {
        const nameMatch = item.name.toLowerCase().includes(searchValue);
        return nameMatch;
      } else if (searchOption === 'age') {
        const ageMatch = item.age.toString().includes(searchValue);
        return ageMatch;
      } else {
        const skillsMatch = item.skills.some((skill: any) =>
          skill.skill.toLowerCase().includes(searchValue),
        );
        return skillsMatch;
      }
    });


    return filteredDataList;
  };

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const createRandomSkills = (dataItem: any) => {
    setCurrentId(dataItem.id);

    const skills = [
      'JavaScript',
      'Python',
      'Java',
      'C++',
      'SQL',
      'HTML',
      'CSS',
      'React',
      'Angular',
      'Vue.js',
      'Node.js',
      'Express.js',
      'Django',
      'Flask',
      'Ruby on Rails',
      'Swift',
      'Kotlin',
      'PHP',
      'Laravel',
      'ASP.NET',
      'C#',
      'Go',
      'Rust',
      'TypeScript',
      'Shell Scripting',
      'Perl',
      'R',
      'MATLAB',
      'Scala',
      'Elixir',
    ];

    function getRandomSkills() {
      const skill = skills[getRandomInt(0, skills.length - 1)];
      return skill;
    }

    function generateRandomSkills() {
      // Исправлено название функции
      const obj = {
        skill: getRandomSkills(),
        datum_id: dataItem.id, // Используем dataItem.id вместо currentId
      };
      return obj;
    }

    const obj = generateRandomSkills();
    saveSkillValue(obj);
    setCurrentId(null);
  };

  const createRundomList10 = () => {
    for (let i = 0; i < 10; i++) {
      createRundomList();
    }
    return;
  };
  const createMoreRundomSkills = (dataItem: any) => {
    for (let i = 0; i < getRandomInt(3,6); i++) {
      createRandomSkills(dataItem);
    }
    return;
  };

  const createRundomList = () => {
    function getRandomName() {
      const names = [
        'Sigurd',
        'Svend',
        'Erik',
        'Harald',
        'Niels',
        'Peder',
        'Jørgen',
        'Mads',
        'Søren',
        'Laurits',
        'Olav',
        'Bjørn',
        'John',
        'Eirik',
        'Ragnhild',
        'Håkon',
        'Torbjørn',
      ];
      return names[Math.floor(Math.random() * names.length)];
    }

    function generateRandomPerson() {
      const obj = {
        age: getRandomInt(18, 65),
        name: getRandomName(),
      };
      return obj;
    }

    const randomObjects = generateRandomPerson();
    saveValue(randomObjects);
  };

  const searchFilter = (value: string) => {
    setSearch(value);
    setStart(0);
  };

  const handleSaveValue = () => {
    if (data.trim()) {
      const dataItem: any = {
        name: data,
        age,
      };
      if (currentId !== null) {
        dataItem.id = currentId;
        editValue(dataItem);
      } else {
        saveValue(dataItem);
      }
      setData('');
      setAge('');
      setCurrentId(null);
      setModalInputShown(false);
      setModalIsSaved(true); // Открыть модальное окно сохранения
    }
  };

  const handleSaveSkill = () => {
    if (skill.trim()) {
      if (skillRedactionStatus === true) {
        const dataItem = {
          skill: skill,
          id: skillId,
          datum_id: currentIdForSkillSave,
        };
        //console.log('dataItem =>', dataItem);
        editSkillValue(dataItem);
      } else {
        const dataItem = {
          skill: skill,
          datum_id: currentId,
        };
        //console.log('===dataItem', dataItem);
        saveSkillValue(dataItem);
      }
      setSkill('');
      setCurrentIdForSkillSave('');
      setCurrentId(null);
      setModalIsSaved(true);
      setModalInputSkill(false);
      setSkillRedactionStatus(false);
    }
  };

  const handleSaveSkillValue = (dataItem: any) => {
    setCurrentId(dataItem.id);
    setModalInputSkill(true);
  };

  const handleEditValue = (dataItem: any) => {
    setData(dataItem.name);
    setAge(dataItem.age);
    setCurrentId(dataItem.id);
    setModalInputShown(true);
  };

  const handleEditSkillValue = (skill: any) => {
    // console.log('===EDIT SKILL', skill);
    setSkill(skill.skill);
    setSkillId(skill.id);
    setCurrentIdForSkillSave(skill.datum_id);
    setSkillRedactionStatus(true);
    setModalInputSkill(true);
  };

  const changeSortHandler = (field: string) => {
    setSortField(field);

    let newSortDirection;

    switch (sortDirection) {
      case 'desk':
        newSortDirection = 'ask';
        break;
      case 'ask':
        newSortDirection = '';
        break;
      default:
        newSortDirection = 'desk';
    }

    setSortDirection(newSortDirection);
    setStart(0);
  };

  const renderInput = () => {
    if (modalInputShown) {
      return (
        <div className={styles.modal}>
          <div>Enter your text</div>
          <label>
            <div>Name</div>
            <input
              value={data}
              onChange={(e) => setData(e.target.value)}
              type="text"
            />
          </label>
          <label>
            <div>Age</div>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
            />
          </label>
          <button className={styles.btn} onClick={handleSaveValue}>
            Save
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setModalInputShown(false);
              setData('');
              setAge('');
              setCurrentIdForSkillSave('');
            }}
          >
            Close
          </button>
        </div>
      );
    }
    return null;
  };

  const renderInputSkill = () => {
    if (modalInputSkill) {
      return (
        <div className={styles.modal}>
          <div>Enter Skill\s</div>
          <label>
            <div>Skill</div>
            <input
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              type="text"
            />
          </label>
          <button className={styles.btn} onClick={handleSaveSkill}>
            Save
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setModalInputSkill(false);
              setData('');
              setAge('');
              setSkill('');
            }}
          >
            Close
          </button>
        </div>
      );
    }
    return null;
  };

  const savedModal = () => {
    return null;
    // return (
    //   <Modal
    //     className={styles.customModalContent}
    //     isOpen={modalIsSaved}
    //     overlayClassName={styles.customOverlay}
    //     onRequestClose={() => setModalIsSaved(false)}
    //   >
    //     <h2>Saving completed</h2>
    //     <button
    //       className={styles.btnClose}
    //       onClick={() => {
    //         setModalIsSaved(false);
    //         setData('');
    //         setAge('');
    //         setSkill('');
    //       }}
    //     >
    //       Close
    //     </button>
    //   </Modal>
    // );
  };

  const renderConfirm = () => {
    if (modalConfirmShown) {
      return (
        <div className={styles.modal}>
          <div>Are you sure?</div>
          <button
            className={styles.btn}
            onClick={() => {
              cleanAll();
              setModalConfirmShown(false);
            }}
          >
            Yes
          </button>
          <button
            className={styles.btn}
            onClick={() => setModalConfirmShown(false)}
          >
            No
          </button>
        </div>
      );
    }
    return null;
  };

  const pagesNumber = Math.ceil(currentDataList.length / limit);
  const currentPage = start / limit + 1;
  const isLastPage = pagesNumber === currentPage;

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setModalInputShown(true)}
          >
            Add
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setModalConfirmShown(true)}
          >
            Clean
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => createRundomList()}
          >
            Random
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => createRundomList10()}
          >
            Random 10
          </button>
          
          <GoBackBtn />
        </div>
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => searchFilter(e.target.value)}
        />
        <select
          onChange={(event) => {
            setSearchOption(event.target.value);
            setStart(0);
          }}
          className={styles.option}
        >
          <option value="all">All</option>
          <option value="id">Id</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="skills">Skills</option>
        </select>

        {savedModal()}
        {renderInput()}
        {renderInputSkill()}
        {renderConfirm()}
        {pageDataList && pageDataList.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th
                  className={styles.sortable}
                  onClick={() => changeSortHandler('id')}
                >
                  Id
                </th>
                <th
                  className={styles.sortable}
                  onClick={() => changeSortHandler('name')}
                >
                  Name
                </th>
                <th>Age</th>
                <th
                  className={styles.sortable}
                  onClick={() => changeSortHandler('skills')}
                >
                  Skills
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageDataList?.map((dataItem: any) => (
                <tr key={dataItem.id}>
                  <td>{dataItem.id}</td>
                  <td>{dataItem.name}</td>
                  <td>{dataItem.age}</td>
                  <td className={styles.skill_area}>
                    {dataItem.skills.map((skill: any) => (
                      <div className={styles.skill_row} key={skill.id}>
                        {skill.skill}
                        <div>
                          <span
                            className={styles.deleteSkill}
                            onClick={() => deleteSkillValue(skill.id)}
                          >
                            x
                          </span>
                          <span
                            className={styles.deleteSkill}
                            onClick={() => handleEditSkillValue(skill)}
                          >
                            red
                          </span>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.btn}
                      onClick={() => deleteValue(dataItem.id)}
                    >
                      del
                    </button>
                    <button
                      type="button"
                      className={styles.btn}
                      onClick={() => handleEditValue(dataItem)}
                    >
                      edit
                    </button>
                    <button
                      type="button"
                      className={styles.btn}
                      onClick={() => handleSaveSkillValue(dataItem)}
                    >
                      skill
                    </button>
                    <button
                      type="button"
                      className={styles.btn}
                      onClick={() => createRandomSkills(dataItem)}
                    >
                      Random
                    </button>
                    <button
                      type="button"
                      className={styles.btn}
                      onClick={() => createMoreRundomSkills(dataItem)}
                    >
                      Random 3-6
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No data available</div>
        )}
        <div className={styles.paginator}>
          <button
            disabled={!start}
            className={styles.paginatorButton}
            onClick={() => setStart(start - limit)}
          >
            Prev
          </button>
          <button
            disabled={isLastPage}
            className={styles.paginatorButton}
            onClick={() => setStart(start + limit)}
          >
            Next
          </button>

          <select
            onChange={(event) => {
              setLimit(+event.target.value);
              setStart(0);
            }}
            className={styles.limitSelect}
            value={limit}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <GoBackBtn />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  saveValue,
  getData,
  cleanAll,
  deleteValue,
  editValue,
  saveSkillValue,
  deleteSkillValue,
  editSkillValue,
};

const mapStateToProps = (state: RootState) => ({
  dataList: state.storeAdminList.dataList,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminList);
