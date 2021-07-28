import { database } from "../firebase"

database.physics_assignments.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_users.doc('satyankar.lms@gmail.com').collection('assignments').doc(doc.id).set({
      assigned: doc.data().assigned,
      due: doc.data().due,
      name: doc.data().name,
      points: doc.data().points,
      handout: doc.data().handout,
      completed: 0,
      module: doc.data().module,
      problems: 12,
      submissions: 2,
      earned: 0,
    })
  })
})

database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_assignments.doc('jkNTrDLkd7o00WY8xXEl').collection('questions').doc('1').get().then((doc1) => {
      database.physics_users.doc(doc.id).collection('assignments').doc('jkNTrDLkd7o00WY8xXEl').collection('questions').doc('1').update({
        solution: doc1.data().solution,
      })
    })
  })
})

database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_users.doc(doc.id).collection('assignments').doc('oK4N0bhBAzosBw6ngmjM').update({
      points: 100,
    })
  })
})

database.physics_assignments.doc('oK4N0bhBAzosBw6ngmjM').collection('questions').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_users.get().then((querySnapshot1) => {
      querySnapshot1.forEach((doc1) => {
        database.physics_users.doc(doc1.id).collection('assignments').doc('oK4N0bhBAzosBw6ngmjM').collection('questions').doc(doc.id).set({
          answer: doc.data().answer,
          attempts: 2,
          completed: false,
          number: doc.data().number,
          points: doc.data().points,
          solution: doc.data().solution,
          status: doc.data().status,
          type: doc.data().type
        })
      })
    })
  })
})

database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_assignments.doc('Y3oz7TFtLqvPOcXuxOdB').get().then((doc1) => {
      database.physics_users.doc(doc.id).collection('assignments').doc('Y3oz7TFtLqvPOcXuxOdB').update({
        handout: '',
      })
    })
  })
})

database.physics_users.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    database.physics_users.doc(doc.id).collection('assignments').doc('oK4N0bhBAzosBw6ngmjM').get().then((doc1) => {
      if (doc1.exists === false) {
        database.physics_assignments.get().then((querySnapshot) => {
          querySnapshot.forEach((doc2) => {
            database.physics_users.doc(doc.id).collection('assignments').doc(doc2.id).set({
              assigned: doc2.data().assigned,
              due: doc2.data().due,
              name: doc2.data().name,
              points: doc2.data().points,
              disabled: doc2.data().disabled,
              handout: doc2.data().handout,
              completed: 0,
              module: doc2.data().module,
              problems: doc2.data().problems,
              submissions: 2,
              earned: 0,
            })
          })
        })
      }
    })
  })
})