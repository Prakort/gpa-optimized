import { message } from "antd";

  
  export const validation = (props) => state => {
    const { gpa , courses } = props;
  
    const error = {};
    if(!gpa) error.gpa ="Please enter GPA";
    if( gpa <= 0 || gpa > 100) error.gpa ="GPA must be in range(0-100)"
    if(!courses) error.courses = "Please enter number of courses";
    if(courses < 1 || courses > 7 ) error.courses = "Number of courses must be in range(1-6)"

    if(error.gpa)
      message.error(error.gpa);
    if(error.courses)
      message.error(error.courses);
  }
  export const updateValue  = (key, value) => state => {
    let term = {};
    
    if (typeof key === 'object') {
      const dataToAppend = key;
      term= {
        ...state.term,
        ...dataToAppend
      };
    } else {
      term = {
        ...state.term,
        [key]: value
      };
    }
  
    return {
      term
    };
  };

  export const updateCourse = (key, value) => state => {
    let course = {};
    
    if (typeof key === 'object') {
      const dataToAppend = key;
      course = {
        ...state.course,
        ...dataToAppend
      };
    } else {
      course = {
        ...state.course,
        [key]: value
      };
    }
  
    return {
      course
    };
  };

  export const addCourses = (lists) => state => {
    const temp = [];
    lists.forEach((element, index) => { 
       temp.push({
         key: index+1,
         ...element
       });
    });

    return {
      courses: temp
    }
  };


  export const deleteCourse = (payload) => state => {
    let temp = state.courses.filter(e => e.name != payload);
    return {
      courses: temp
    }
  };


  export const editCourse = (payload) => state => {
    let index = state.courses.findIndex(e => e.name === payload.name);
    const temp = state.courses;
    temp[index].grade = payload.grade;
    return {
      courses: temp
    }
  };


  export const updateData = (lists) => state => {
   const temp = [];
   lists.forEach((element, index) => { 
      temp.push({
        key: index+1,
        description: `Semester ${index+1}`,
        ...element
      });
   });
  
   return {
     data: temp
   }
  };

  export const editData = (description) => state => {
    const index = state.data.findIndex( e=> e.description == description);
    const temp = state.data;
    temp[index].gpa = state.term.gpa;
    temp[index].courses = state.term.courses;
    return {
      data: temp
    }
  };
