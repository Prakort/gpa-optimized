import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './App.module.scss';
import logo from './logo.jpg';
import { subscribe } from 'react-contextual';
import {Button,Row, Form , Input,Table, Tag, Modal, message } from 'antd';
import 'antd/dist/antd.css';


const data = [
  {
    key: '1',
    description: 'Semester 1',
    gpa: 32,
    courses: 'New York No. 1 Lake Park',
  
  },
  {
    key: '2',
    description: 'Semester 2',
    gpa: 42,
    courses: 'London No. 1 Lake Park',
 
  },
  {
    key:"3",
    description: 'Joe Black',
    gpa: 32,
    courses: 'Sidney No. 1 Lake Park',

  },
];
const App = (props) => {
  console.log("props", props);
  
  const dataCourses = props.courses;
  const [list, setList] = useState([]);
  const [number , setNumber] = useState(0);
  const [modal, setModal] = useState(false);
  const [selected , setSelected] = useState('');
  const [courses, setCourses] = useState(props.courses);
 
  const sumbitCourse = e => {
    
    const { name , grade } = props.course;
    e.preventDefault();
    var temp = courses;
    temp.push({
      name,
      grade
    })
    setCourses(setCourses);
    props.addCourses(courses);
    console.log("prop222222", props);
  }

  const sumbit = e => {


    e.preventDefault();


    const error = validation({
      gpa: props.term.gpa,
      courses: props.term.courses
    });
    console.log("error", error );
    if( Object.keys(error).length === 0 ){
      const { gpa , courses } = props.term;
      const temp = list;
      temp.push({
        gpa,
        courses
      });
      setNumber(number+1);
      setList(temp);
      props.updateData(list);
      props.updateValue({
        gpa: '',
        courses: ''
      });
    } 
    else
    {
      if(error.gpa)  message.error(error.gpa);
      if(error.courses) message.error(error.courses);
    } 
  
  }

  const validation = (payload) => {
    const { gpa , courses } = payload;
  
    const error = {};
    if(!gpa) error.gpa ="Please enter GPA";
    if( gpa <= 0 || gpa > 100) error.gpa ="GPA must be in range(0-100)"
    if(!courses) error.courses = "Please enter number of courses";
    if(courses < 1 || courses > 7 ) error.courses = "Number of courses must be in range(1-6)"

    return error;

  }

  const triggerModal = (e) => {
    setModal(true);
    setSelected(e);
  }

  const triggerDelete = (description) => {
  
    props.deleteData(description);
  }
  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Term GPA',
      dataIndex: 'gpa',
      key: 'gpa',
    },
    {
      title: 'Number of Courses',
      dataIndex: 'courses',
      key: 'courses',
    },
   
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 , color: 'red'}} onClick={() => triggerModal(record.description)}> Edit </a>
          {/* <a onClick={() => triggerDelete(record.description)}>Delete</a> */}
        </span>
      ),
    },
  ];
  const payload = [
    {
      key: '1',
      name: 'Data structor',
      grade: 100
    }
  ];
  console.log("work ", payload, "not work", props.courses);
  const columnsClass = [
    {
      title: 'Course',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 , color: 'red'}} onClick={() => {}}> Edit </a>
          <a onClick={() => {}}>Delete</a>
        </span>
      ),
    },
  ];

  return (
    <>
    
    <div className={styles.root}>
    <div  className={styles.subsection} >
     </div>
     <span className={styles.span}>
       <h1 className={styles.title}> University of Windsor</h1>
       {/* <button className={styles.button}>Hello</button> */}
     </span>

    </div>

    <div className={styles.secondheading}>
      <p>GOAL</p>
       <h2 className={styles.h22}>Optimize your GPA </h2>
       <div className={styles.line}></div>

       <h2 className={styles.h22}>Current Semester</h2>
       <div className={styles.line}></div>


       <br/>
      <br/>
       <form onSubmit={sumbitCourse}>
        <input 
          value={props.course.name}
          placeholder="Class"
          className={styles.input}
          onChange={e => props.updateCourse({ name: e.target.value})}
        />
    
        <input 
          value={props.course.grade}
          placeholder="Grade"
          className={styles.input}
          onChange={e => props.updateCourse({ grade: e.target.value})}
        />
        <button 
          type="submit"
          className={styles.button2}  
        >
        Add a new class
        </button>
      
      </form>
      <br/>
      <br/>

      <Table columns={columnsClass} dataSource={props.courses} />


       <br/>
        <br/>
      
       <h2 className={styles.h22}>Past Semesters</h2>
       <div className={styles.line}></div>

      <br/>
      <br/>
  
      <form onSubmit={sumbit}>
        <input 
          value={props.term.gpa}
          required="true"
          placeholder="Term GPA"
          className={styles.input}
          onChange={e => props.updateValue({ gpa: e.target.value})}
        />
    
        <input 
          value={props.term.courses}
          required="true"
          placeholder="Number of courses"
          className={styles.input}
          onChange={e => props.updateValue({ courses: e.target.value})}
        />
        <button 
          type="submit"
          className={styles.button2}  
        >
        Add a new term
        </button>
      
      </form>

      <br/>
      <br/>
    

        <Table columns={columns} dataSource={props.data} />


        <Row style={{ top: '500px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
        <Modal
          className={styles.Modal}
          title={"Edit " + selected}
          visible={modal}
          onOk={()=> 
          {
              const error = validation({
              gpa: props.term.gpa,
              courses: props.term.courses
              });
              console.log("error", error);
              console.log("props", props);
              if( Object.keys(error).length === 0 ){    
                  props.editData(selected);
                  setModal(false);
                  props.updateValue({
                gpa: '',
                courses: ''
              });
              } 
              else
              {
                  if(error.gpa)   message.error(error.gpa);
                  if(error.courses) message.error(error.courses);
                  props.updateValue({
                gpa: '',
                courses: ''
              });
              } 
               
          }}
          onCancel={() => {
            setModal(false);
            props.updateValue({
                gpa: '',
                courses: ''});
                }}
         >
          <form>

            <input 
              value={props.term.gpa}
              required={"true"}
              placeholder="New Term GPA"
              className={styles.input2}
              onChange={e => props.updateValue({ gpa:  e.target.value})}
            />
            <div style={{height:"20px"}}></div>
            <input 
           value={props.term.courses}
              required={"true"}
              placeholder="New Number of Courses"
              className={styles.input2}
              onChange={e => props.updateValue({ courses: e.target.value})}
            />
            
          </form>
    
        </Modal>
        <br/>

        </Row>
     
        <button 
          type="submit"
          className={styles.button4}  
        >
        Click to see which option to take
        </button>
     </div>
     </>
  );
}

export default subscribe()(App);
