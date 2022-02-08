import { database } from "../../firebase"

const courseData = {
  'physics': {
    courseName: 'Physics Mechanics',
    userData: database.physics_users,
    assignmentData: database.physics_assignments
  }, 
  'biology': {
    courseName: 'Biology',
    userData: database.biology_users,
    assignmentData: database.biology_assignments
  }, 
  'math': {
    courseName: 'Math Competitions 1',
    userData: database.math_users,
    assignmentData: database.math_assignments
  }, 
  'astronomy': {
    courseName: 'Astronomy',
    userData: database.astronomy_users,
    assignmentData: database.astronomy_assignments
  }, 
}

export default courseData;